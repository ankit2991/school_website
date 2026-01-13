import React, { useEffect, useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import { getStudentSearch, getStudentSummary } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Student_Summary() {
  const navigate = useNavigate();
  // 🔹 localStorage values
  const instId = localStorage.getItem("InstituteID");
  const sesId = localStorage.getItem("SessionID");
  // 🔹 State
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const { classList } = useClassList();
  const [allData, setAllData] = useState([]);
  const [searched, setSearched] = useState(false); 
  // Search type map
  const SEARCH_TYPE_MAP = {
    "Serial Number": "1",
    "Name": "2",
    "Father Name": "3",
    "Mobile Number": "4",
  };

  // 👇 default first option
const searchKeys = Object.keys(SEARCH_TYPE_MAP);

// 👇 UI selected value
const [searchBy, setSearchBy] = useState(searchKeys[0]);  

// 👇 API value
const [searchType, setSearchType] = useState(
  SEARCH_TYPE_MAP[searchKeys[0]]
);
  // Table columns
  const columns = [
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
  ];

  // ======================= STUDENT LIST ======================= 
  const fetchStudents = async (classId, type) => {
  if (!type) return;

  setLoading(true);
  setSearched(true);

  try {
    const res = await getStudentSearch({
      instId,
      sessionId: sesId,
      classId: classId || "",
      searchType: type,
      search: "", // client-side filtering
    });

    const tableData = (res?.Table || []).map((item) => ({
      id: item.Id,
      serial: item.SrNo,
      name: item.Name,
      fname: item.FatherName,
      mname: item.MotherName,
      class: item.ClassName,
      fno: item.FMobileNo,
    }));

    setAllData(tableData);
    setFilteredData(tableData);
  } catch (err) {
    console.error("Search API Error:", err);
    setAllData([]);
    setFilteredData([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (selectedClassId && searchType) {
    fetchStudents(selectedClassId, searchType);
  }
}, [selectedClassId, searchType]);

  // ======================= SEARCH =======================
  // const handleSearch = async () => {
  //   if (!searchType) {
  //     alert("Please select search type");
  //     return;
  //   }

  //   setLoading(true);
  //   setSearched(true);
  //   try {
  //     const res = await getStudentSearch({
  //       instId,
  //       sessionId: sesId,
  //       classId: selectedClassId,
  //       searchType,
  //       search: "", // 🔹 empty, filtering is client-side
  //     });

  //     const tableData = (res?.Table || []).map((item) => ({
  //       id: item.Id,
  //       serial: item.SrNo,
  //       name: item.Name,
  //       fname: item.FatherName,
  //       mname: item.MotherName,
  //       class: item.ClassName,
  //       fno: item.FMobileNo,
  //     }));

  //     setAllData(tableData); // 👈 store full data
  //     setFilteredData(tableData); // 👈 show all initially
  //   } catch (err) {
  //     console.error("Search API Error:", err);
  //     alert("Search failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = () => {
  if (!searchType) {
    alert("Please select search type");
    return;
  }

  fetchStudents(selectedClassId, searchType);
};


  // ======================= SEARCH FILTTER =======================
  const handleFilter = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredData(allData);
      return;
    }

    const v = value.toLowerCase();
    const filtered = allData.filter((item) => {
      switch (searchType) {
        case "1": // Serial Number
          return item.serial?.toLowerCase().includes(v);

        case "2": // Name
          return item.name?.toLowerCase().includes(v);

        case "3": // Father Name
          return item.fname?.toLowerCase().includes(v);

        case "4": // Mobile Number
          return item.fno?.toLowerCase().includes(v);

        default:
          return true;
      }
    });

    setFilteredData(filtered);
  };

  // ======================= SELECT STUDENT =======================
  const handleSelectStudent = async () => {
    if (!selectedRow) {
      alert("Please select a student");
      return;
    }

    try {
      setLoading(true);
      const res = await getStudentSummary({
        instId,
        sessionId: sesId,
        studId: selectedRow.id,
      });
      const student = res?.Table?.[0];
      if (!student) {
        alert("Student details not found");
        return;
      }

      navigate("/Student-Summary", {
        state: { student },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load student summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col"> 
      <Loader show={loading} /> 
      <Heading label="Student Summary" style="mb-5" />
      {/* Filters */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
        {/* Class */}
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        {/* Search By */}
        {/* <Options
          label="Search By"
          optionMsg="Select Option"
          options={Object.keys(SEARCH_TYPE_MAP)}
          onChange={(e) => setSearchType(SEARCH_TYPE_MAP[e.target.value])}
        /> */}

       <Options
  label="Search By"
  optionMsg="Select Option"
  options={searchKeys}
  value={searchBy}   // ✅ controlled by state
  onChange={(e) => {
    const selected = e.target.value;
    setSearchBy(selected);                 // UI update
    setSearchType(SEARCH_TYPE_MAP[selected]); // API ID
  }}
/>



        {/* Enter */}
        <FormInput
          label="Enter"
          placeholder="Enter name, father name, etc."
          value={searchText}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5"> 
        <Buttons 
          label="Search" click={handleSearch} 
        /> 
      </div>

      {/* Table */}
      

      {/* ===== Result Section ===== */}
{searched && !loading && filteredData.length === 0 && (
  <p className="text-center text-gray-500 mt-4">
    No students found
  </p>
)}

{searched && filteredData.length > 0 && (
  <>
    <Table
      columns={columns}
      data={filteredData}
      selectable
      selectedRow={selectedRow}
      onRowSelect={setSelectedRow}
      style="max-h-[33vh] sm:max-h-[50vh]"
    />

    <div className="flex justify-end py-3">
      <Buttons
        label="Select"
        click={handleSelectStudent}
        disabled={!selectedRow}
      />
    </div>
  </>
)}


    </div>
  );
}

export default Student_Summary;
