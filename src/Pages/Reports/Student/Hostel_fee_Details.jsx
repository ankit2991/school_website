import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import {
   getClassWiseStudents,
   getFeesDetails,
   getHostelFeeReport,
} from "../../../services/api";

function Hostel_fee_Details() {
   const navigate = useNavigate();

   const [agree, setAgree] = useState(false);
   const [agree2, setAgree2] = useState(false);
   const [rowDetailOpen, setRowDetailOpen] = useState(false);

   const [classList, setClassList] = useState([]);
   const [studentList, setStudentList] = useState([]);

   const [selectedClassId, setSelectedClassId] = useState("");
   const [selectedStudentId, setSelectedStudentId] = useState("");

   const [paymentModes, setPaymentModes] = useState([]);
   const [paymentModeId, setPaymentModeId] = useState("");

   const [fromDate, setFromDate] = useState("");
   const [endDate, setEndDate] = useState("");

   const [receiptNo, setReceiptNo] = useState("");

   const [feeData, setFeeData] = useState([]);
   const [selectedRows, setSelectedRows] = useState([]);
   const [loading, setLoading] = useState(false);

   /* ---------------- TABLE SELECTION ---------------- */
   const isAllSelected =
      feeData.length > 0 && selectedRows.length === feeData.length;

   const toggleSelectAll = () => {
      setSelectedRows(isAllSelected ? [] : feeData.map((r) => r.id));
   };

   const toggleRow = (id) => {
      setSelectedRows((prev) =>
         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
   };

   /* ---------------- TABLE COLUMNS ---------------- */
   const columns = [
      {
         header: (
            <CheckBox checked={isAllSelected} onChange={toggleSelectAll} />
         ),
         accessor: "checkbox",
      },
      { header: "Receipt No.", accessor: "receipt" },
      { header: "Receipt Date", accessor: "rdate" },
      { header: "Class", accessor: "class" },
      { header: "Serial No.", accessor: "serial" },
      { header: "Name", accessor: "name" },
      { header: "Father Name", accessor: "fname" },
      { header: "Mobile No.", accessor: "fno" },
      { header: "Narration", accessor: "nar" },
      { header: "Total Amount", accessor: "tot" },
      { header: "Discount Amount", accessor: "dis" },
      { header: "Net Amount", accessor: "net" },
   ];

   /* ---------------- HELPERS ---------------- */
   const parseAmount = (val) =>
      parseFloat((val || "0").toString().replace(/,/g, "")) || 0;

   /* ---------------- TOTALS ---------------- */
   const totals = feeData.reduce(
      (acc, row) => {
         acc.tot += parseAmount(row.tot);
         acc.dis += parseAmount(row.dis);
         acc.net += parseAmount(row.net);
         return acc;
      },
      { tot: 0, dis: 0, net: 0 }
   );

   const dataWithFooter =
      feeData.length > 0
         ? [
              ...feeData,
              {
                 id: "total-row",
                 nar: "TOTAL",
                 tot: totals.tot.toLocaleString(),
                 dis: totals.dis.toLocaleString(),
                 net: totals.net.toLocaleString(),
                 isFooter: true,
              },
           ]
         : [];

   const formatDateForApi = (dateStr) => {
      if (!dateStr) return "";

      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, "0");

      const monthNames = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ];

      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
   };

   /* ---------------- FETCH CLASSES ---------------- */
   useEffect(() => {
      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");

      async function fetchClasses() {
         try {
            const res = await getFeesDetails(instId, sessionId);
            setClassList(res.Table || []);
            setPaymentModes(res.Table2 || []);
         } catch {
            setClassList([]);
            setPaymentModes([]);
         }
      }

      fetchClasses();
   }, []);

   /* ---------------- CLASS CHANGE ---------------- */
   const handleClassChange = async (e) => {
      const classId = e.target.value;

      setSelectedClassId(classId);
      setSelectedStudentId("");
      setStudentList([]);
      setFeeData([]);

      if (!classId) return;

      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");

      try {
         const res = await getClassWiseStudents(instId, sessionId, classId);
         setStudentList(res.Table || []);
      } catch {
         setStudentList([]);
      }
   };

   /* ---------------- SEARCH (ONLY HERE API CALL) ---------------- */
   const handleSearch = async () => {
      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");

      try {
         setLoading(true);
         setFeeData([]);
         setSelectedRows([]);

         const res = await getHostelFeeReport(
            instId,
            sessionId,
            selectedClassId,
            selectedStudentId || "",
            paymentModeId || "",
            receiptNo || "",
            formatDateForApi(fromDate),
            formatDateForApi(endDate)
         );

         if (Array.isArray(res?.Table)) {
            setFeeData(
               res.Table.map((r) => ({
                  id: r.Id,
                  receipt: r.ReceiptNo,
                  rdate: r.ReceiptDate,
                  class: r.Class,
                  serial: r.SRNo,
                  name: r.Name,
                  fname: r.FatherName,
                  fno: r.MobileNo,
                  nar: r.Narration || "-",
                  tot: r.TotalAmount ?? 0,
                  dis: r.DiscountAmount ?? 0,
                  net: r.NetAmount ?? 0,
               }))
            );
         }
      } catch {
         setFeeData([]);
      } finally {
         setLoading(false);
      }
   };

   /* ---------------- UI ---------------- */
   return (
      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
         <div className="flex justify-between items-center mb-5">
            <Heading label="Hostel Fee Details" />
            {/* <Buttons 
          label="Print" 
          click={() => { window.open("/pdf/5HostelReportViewer.pdf", "_blank"); }} 
        /> */}
        <Buttons
  label="Print"
  click={() => {
    if (selectedRows.length === 0) {
      alert("Please select at least one receipt");
      return;
    }

    const selectedData = feeData.filter(r =>
      selectedRows.includes(r.id)
    );

    navigate("/Hostel-Receipt-Print", {
      state: { receipts: selectedData },
    });
  }}
/>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px_1fr] gap-6 mb-5">
            <Options
               label="Class"
               optionMsg="Select Class"
               options={classList}
               valueKey="Id"
               labelKey="ClassName"
               onChange={handleClassChange}
            />

            <div>
               <label className="text-lg font-medium mb-1 flex gap-2">
                  Student Name
                  <CheckBox
                     checked={agree}
                     onChange={(e) => setAgree(e.target.checked)}
                  />
               </label>
               <Options
                  optionMsg="Select Student"
                  options={studentList}
                  valueKey="Id"
                  labelKey="Name"
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
               />
            </div>

            <FormInput
               label="Receipt No."
               value={receiptNo}
               onChange={(e) => setReceiptNo(e.target.value)}
            />

            <Options
               label="Payment Mode"
               optionMsg="Select Payment Mode"
               options={paymentModes}
               valueKey="Id"
               labelKey="Name"
               onChange={(e) => setPaymentModeId(e.target.value)}
            />
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
            <FormInput
               label="From"
               type="date"
               value={fromDate}
               onChange={(e) => setFromDate(e.target.value)}
            />
            <FormInput
               label="To"
               type="date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="mt-8">
               <CheckBox
                  label="Other Fee"
                  checked={agree2}
                  onChange={(e) => setAgree2(e.target.checked)}
               />
            </div>
         </div>

         <div className="flex justify-end mb-5">
            <Buttons label="Search" click={handleSearch} />
         </div>

         <Table
            columns={columns}
            data={dataWithFooter}
            loading={loading}
            onOverlayToggle={setRowDetailOpen}
            actions={(row) =>
               !row.isFooter && (
                  <CheckBox
                     checked={selectedRows.includes(row.id)}
                     onChange={() => toggleRow(row.id)}
                  />
               )
            }
         />

         {rowDetailOpen && window.innerWidth < 768 && <div className="h-140" />}
      </div>
   );
}

export default Hostel_fee_Details;
