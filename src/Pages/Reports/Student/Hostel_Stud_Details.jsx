import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { getFeesDetails, getHostelReportDetail } from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

function Hostel_Stud_Details() {
  /* ---------------- STATE ---------------- */
  const [classList, setClassList] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  const [searchBy, setSearchBy] = useState("");
  const [srNo, setSrNo] = useState("");
  const [name, setName] = useState("");

  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [rowDetailOpen, setRowDetailOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { header: "Sr No.", accessor: "serial" },
    { header: "Name", accessor: "name" },
    { header: "Father Name", accessor: "fname" },
    { header: "Mobile No.", accessor: "mobile" },
    { header: "Class", accessor: "className" },
    { header: "Room No.", accessor: "roomNo" },
    { header: "Amount", accessor: "amount" },
    { header: "Discount", accessor: "discount" },
    { header: "Previous Due", accessor: "previousDue" },
    { header: "Join Date", accessor: "joinDate" },
  ];

  /* ---------------- DATE FORMAT ---------------- */
  const formatDotNetDate = (dotNetDate) => {
    if (!dotNetDate) return "-";
    const ts = Number(dotNetDate.match(/\d+/)?.[0]);
    return ts ? new Date(ts).toLocaleDateString("en-GB") : "-";
  };

  /* ---------------- FETCH CLASS LIST ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    async function fetchClasses() {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res?.Table || []);
      } catch {
        setClassList([]);
      }
    }

    fetchClasses();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      setSearched(true);
      setShowTable(false); 
      setTableData([]);

      const res = await getHostelReportDetail(
        instId,
        sessionId,
        selectedClassId,
        searchBy === "Sr. No." ? srNo : "",
        searchBy === "Name" ? name : ""
      );

      if (Array.isArray(res?.Table)) {
        setTableData(
          res.Table.map((r, index) => ({
            id: r.Id,
            serial: r.OldSrno || index + 1,
            name: r.Name,
            fname: r.FatherName,
            mobile: r.FMobileNo,
            className: r.ClassName,
            roomNo: r.RoomNo,
            amount: r.Amount,
            discount: r.HostelDiscount,
            previousDue: r.HostelPreviousDue,
            joinDate: formatDotNetDate(r.JoinDate),
          }))
        );
        setShowTable(true);
      }
    } catch (err) {
      console.error("Hostel API Error:", err);
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
      <Heading label="Hostel Student Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
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
          optionMsg="Select"
          options={["Name", "Sr. No."]}
          value={searchBy}
          onChange={(e) => {
            setSearchBy(e.target.value);
            setSrNo("");
            setName("");
          }}
        />

        {searchBy === "Sr. No." && (
          <FormInput
            label="Sr No"
            value={srNo}
            onChange={(e) => setSrNo(e.target.value)}
          />
        )}

        {searchBy === "Name" && (
          <FormInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-end mb-5">
        <Buttons label="Search" click={handleSearch} />
      </div>

{showTable && (
      <Table
        columns={columns}
        data={tableData}
        loading={searched}
        onOverlayToggle={setRowDetailOpen}
      />
)}

      {rowDetailOpen && window.innerWidth < 768 && <div className="h-140" />}
    </div>
  );
}

export default Hostel_Stud_Details;
