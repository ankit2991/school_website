import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Page_Forms/Table";
import Options from "../../Components/Page_Forms/Options";
import { getStudentList } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Add_Sibling() {
  const { classList } = useClassList();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [srNo, setSrNo] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { header: "Serial No.", shortHeader: "Sr. No.", accessor: "SrNo" },
    { header: "Name", accessor: "Name" },
  ];

  /* ================= STUDENT LIST ================= */ 
  const fetchStudents = async (classId) => {
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");

  if (!classId) return;

  try {
    setLoading(true);
    setSearched(true);

    const res = await getStudentList(instId, sessId, classId);

    if (Array.isArray(res?.Table)) {
      setStudentList(res.Table);       // keep original keys
      setFilteredList(res.Table);      // show immediately
    } else {
      setStudentList([]);
      setFilteredList([]);
    }
  } catch (err) {
    console.log("Student List Error:", err);
    setStudentList([]);
    setFilteredList([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (selectedClassId) {
    fetchStudents(selectedClassId);
  }
}, [selectedClassId]);


  /* ================= SEARCH ================= */
  // const handleSearch = async () => {
  //   const instId = localStorage.getItem("InstituteID");
  //   const sessId = localStorage.getItem("SessionID");

  //   if (!selectedClassId) {
  //     alert("Please select class");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setSearched(true);
  //     const res = await getStudentList(instId, sessId, selectedClassId);

  //     if (Array.isArray(res?.Table)) {
  //       setStudentList(res.Table); // ✅ keep original keys
  //       setFilteredList(res.Table); // ✅ show immediately
  //     } else {
  //       setStudentList([]);
  //       setFilteredList([]);
  //     }
  //   } catch (err) {
  //     console.log("Student List Error:", err);
  //     setStudentList([]);
  //     setFilteredList([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSearch = () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  fetchStudents(selectedClassId);
};




  /* ================= FILTTER ================= */
  useEffect(() => {
    let result = studentList;
    if (studentName) {
      result = result.filter((item) =>
        item.Name?.toLowerCase().includes(studentName.toLowerCase())
      );
    }

    if (srNo) {
      result = result.filter((item) => item.SrNo?.toString().includes(srNo));
    }

    setFilteredList(result);
  }, [studentName, srNo, studentList]);

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={loading} />
      <div className="flex justify-between mb-5">
        <Heading label={"Add Sibling"} />
        <Buttons click={() => navigate("/AddSibling", { replace: true })} label={"Add"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <FormInput
          label={"Student Name"}
          placeholder={"Enter Student Name"}
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <FormInput
          label={"Sr. No."}
          placeholder={"Enter Serial No."}
          value={srNo}
          onChange={(e) => setSrNo(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Buttons label={"Search"} click={handleSearch} />
      </div>

      {/* ===== Result Section ===== */}
{searched && !loading && filteredList.length === 0 && (
  <p className="text-center text-gray-500 mt-4">
    No records found
  </p>
)}

{searched && filteredList.length > 0 && (
  <div className="mt-5">
    <Table
      columns={columns}
      data={filteredList}
      actions={(row) => (
        <>
          <Buttons
            label="Edit"
            style="hidden sm:inline"
            click={() =>
              navigate("/AddSibling", {
                state: { studId: row.Id }, 
                replace: true,
              })
            }
          />

          <Buttons
            label="Print"
            style="hidden sm:inline"
            click={() => console.log("Print:", row)}
          />

          {/* Mobile */}
          <button
            className="sm:hidden text-lg"
            onClick={() =>
              navigate("/AddSibling", {
                state: { studId: row.Id }, 
                replace: true,
              })
            }
          >
            ✏️
          </button>

          <button
            className="sm:hidden text-xl pt-2.5"
            onClick={() => console.log("Print:", row)}
          >
            🖨️
          </button>
        </>
      )}
    />
  </div>
)}

    </div>
  );
}

export default Add_Sibling;
