import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import {
  getBankChallanReport,
  getclass,
  getMonthList,
} from "../../../services/api";

function Bank_Challan() {
  const navigate = useNavigate();

  const [selectedMonthId, setSelectedMonthId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [marksData, setMarksData] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [rowDetailOpen, setRowDetailOpen] = useState(false);

  // 🔍 Search states
  const [searchBy, setSearchBy] = useState("");
  const [searchText, setSearchText] = useState("");

  // ✅ TABLE COLUMNS (API MAPPED)
  const columns = [
    { header: "Roll No.", accessor: "RollNo" },
    { header: "Name", accessor: "Name" },
    { header: "Father Name", accessor: "FatherName" },
    { header: "Mother Name", accessor: "MotherName" },
    { header: "Class", accessor: "Class" },
    { header: "Admission Date", accessor: "AdmissionDate" },
    {
      header: "Address",
      accessor: "Address1",
      cellStyle:
        "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs",
    },
    { header: "Father Mobile", accessor: "FMobileNo" },
  ];

  // ✅ FETCH CLASSES
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
      } catch {
        setClassList([]);
      }
    }

    fetchClasses();
  }, []);

  // ✅ FETCH MONTH LIST
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    if (!instId) return;

    async function fetchMonth() {
      try {
        const res = await getMonthList(instId);
        setMonthList(res?.Table || []);
      } catch {
        setMonthList([]);
      }
    }

    fetchMonth();
  }, []);

  // ✅ SEARCH API CALL
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    if (!instId || !sessionId || !selectedClassId || !selectedMonthId) {
      alert("Please select Class and Month");
      return;
    }

    try {
      setLoading(true);
      const res = await getBankChallanReport(
        instId,
        sessionId,
        selectedClassId,
        selectedMonthId
      );

      setMarksData(res?.Table || []);
    } catch (error) {
      console.log("Error:", error);
      setMarksData([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER DATA (NAME / ROLL NO)
  const filteredData = marksData.filter((row) => {
    if (!searchText) return true;

    const text = searchText.toLowerCase();

    if (searchBy === "Name") {
      return row?.Name?.toLowerCase().includes(text);
    }

    if (searchBy === "Roll No") {
      return row?.RollNo?.toString().includes(text);
    }

    return true;
  });

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between items-center mb-5">
        <Heading label="Bank Challan" style="text-[22px] sm:text-3xl" />
        <Buttons label="Print Challan" click={() => { window.open("/pdf/challan.pdf", "_blank"); }} />
      </div>

      {/* 🔽 FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <Options
          label="Month"
          optionMsg="Select Month"
          options={monthList}
          valueKey="ID"
          labelKey="MonthName"
          onChange={(e) => setSelectedMonthId(e.target.value)}
        />

        <Options
          label="Search By"
          optionMsg="Select"
          options={["Name", "Roll No"]}
          value={searchBy}
          onChange={(e) => {
            setSearchBy(e.target.value);
            setSearchText("");
          }}
        />

        {/* 🔍 CONDITIONAL INPUT */}
        {searchBy && (
          <FormInput
            label={`Search By ${searchBy}`}
            placeholder={`Enter ${searchBy}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-end mb-5">
        <Buttons label={loading ? "Loading..." : "Search"} click={handleSearch} />
      </div>

      {/* 📊 TABLE */}
      <Table
        columns={columns}
        data={filteredData}
        disableFloatingRow={false}
        onOverlayToggle={(open) => setRowDetailOpen(open)}
         colStyle="sm:min-w-[135px]  text-[12px]  whitespace-nowrap"
      />

      <div className="flex justify-end mt-5">
        <Buttons label="Clear" click={() => setMarksData([])} />
      </div>

      {rowDetailOpen && window.innerWidth < 768 && <div className="h-140"></div>}
    </div>
  );
}

export default Bank_Challan;
