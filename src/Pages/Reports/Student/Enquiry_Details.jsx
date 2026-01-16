import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import {
   getclass,
   getEnquiryReportDetail,
   getEnquiryTypeList,
} from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

function Enquiry_Details() {
   /* ---------------- STATE ---------------- */
   const [classList, setClassList] = useState([]);
   const [enquiryTypeList, setEnquiryTypeList] = useState([]);

   const [selectedClassId, setSelectedClassId] = useState("");
   const [selectedSearchType, setSelectedSearchType] = useState("");
   const [srNo, setSrNo] = useState("");
   const [name, setName] = useState("");

   const [tableData, setTableData] = useState([]);
   const [searched, setSearched] = useState(false);
   const [rowDetailOpen, setRowDetailOpen] = useState(false);
   const [showTable, setShowTable] = useState(false);

   /* ---------------- TABLE COLUMNS ---------------- */
   const columns = [
      { header: "Enquiry No.", shortHeader: "Enquiry No.", accessor: "en" },
      { header: "Name", shortHeader: "Name", accessor: "name" },
      { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
      { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
      { header: "Class", shortHeader: "Class", accessor: "className" },
      { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
      {
         header: "Address",
         shortHeader: "Address",
         accessor: "address",
         cellStyle:
            "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md",
      },
      { header: "Father No.", shortHeader: "Father No", accessor: "fno" },
   ];

   /* ---------------- DATE FORMAT ---------------- */
   const formatDotNetDate = (dotNetDate) => {
      if (!dotNetDate) return "-";
      const ts = Number(dotNetDate.match(/\d+/)?.[0]);
      return ts ? new Date(ts).toLocaleDateString("en-GB") : "-";
   };

   /* ---------------- FETCH CLASS LIST (same as previous pages) ---------------- */
   useEffect(() => {
      const instId = localStorage.getItem("InstituteID");
      if (!instId) return;

      async function fetchClasses() {
         try {
            const res = await getclass(instId);
            if (res?.Table?.[0]?.ResultCode === "R100") {
               setClassList(res.Table1 || []);
            } else {
               setClassList([]);
            }
         } catch (error) {
            console.log("Class API Error:", error);
            setClassList([]);
         }
      }

      fetchClasses();
   }, []);

   /* ---------------- FETCH ENQUIRY TYPE LIST ---------------- */
   useEffect(() => {
      async function fetchEnquiryTypes() {
         try {
            const res = await getEnquiryTypeList();
            if (res?.Table?.[0]?.ResultCode === "R100") {
               setEnquiryTypeList(res.Table1 || []);
            } else {
               setEnquiryTypeList([]);
            }
         } catch (error) {
            console.log("Enquiry Type API Error:", error);
            setEnquiryTypeList([]);
         }
      }

      fetchEnquiryTypes();
   }, []);

   /* ---------------- SEARCH ---------------- */
   const handleSearch = async () => {
      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");

      try {
         setSearched(true);
         setShowTable(false);
         setTableData([]);

         const res = await getEnquiryReportDetail(
            instId,
            sessionId,
            selectedClassId,
            selectedSearchType,
            srNo,
            name
         );

         if (Array.isArray(res?.Table)) {
            setTableData(
               res.Table.map((r) => ({
                  id: r.Id,
                  en: r.EnquireNo,
                  name: r.Name,
                  fname: r.FatherName,
                  mname: r.MotherName,
                  className: r.ClassName,
                  dob: formatDotNetDate(r.DOB),
                  address: r.Address1,
                  fno: r.FMobileNo,
               }))
            );
         }
         setShowTable(true);
      } catch (error) {
         console.log("Enquiry Report API Error:", error);
         setTableData([]);
         setShowTable(false);
      } finally {
         setSearched(false);
      }
   };

   useEffect(() => {
   if (selectedClassId) {
      handleSearch();
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClassId]);

   /* ---------------- UI ---------------- */
   return (
      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
         <Loader show={searched} />
         <div className="flex justify-between mb-5">
            <Heading label="Enquiry Details" />
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
            <Options
               label="Class"
               optionMsg="Select Class"
               options={classList}
               valueKey="Id"
               labelKey="ClassName"
               onChange={(e) => setSelectedClassId(e.target.value)}
            />

            <Options
               label="Search By"
               optionMsg="Select Option"
               options={enquiryTypeList}
               valueKey="Id"
               labelKey="UserType"
               onChange={(e) => setSelectedSearchType(e.target.value)}
            />
            <FormInput
               label="Sr No"
               value={srNo}
               onChange={(e) => setSrNo(e.target.value)}
            />
            <FormInput
               label="Name"
               placeholder="Enter Name"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="flex justify-end mb-5">
            <Buttons label="Search" click={handleSearch} />
         </div>

         {showTable && (
            <>
         <Table
            columns={columns}
            data={tableData}
            loading={searched}
            onRowSelect={() => {}}
            disableFloatingRow={false}
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
         />

         <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
            <Buttons
               label="Clear"
               click={() => {
                  setSelectedClassId("");
                  setSelectedSearchType("");
                  setName("");
                  setTableData([]);
               }}
            />
         </div>
         </>
            )}

         {rowDetailOpen && window.innerWidth < 768 && <div className="h-140" />}
      </div>
   );
}

export default Enquiry_Details;
