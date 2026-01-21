import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Page_Forms/Table";
import Options from "../../Components/Page_Forms/Options";
import Loader from "../../Components/Page_Forms/Loader";
import { getStudentList } from "../../services/api";
import useClassList from "../../hooks/useClassList";

function Create_Student() {
  const navigate = useNavigate();
  const columns = [
    { header: "Student Id", shortHeader: "Stud. Id", accessor: "id" },
    { header: "Name", accessor: "name" },
  ];
  const { classList } = useClassList(); // 👈 only use classList
  const [selectedClassId, setSelectedClassId] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [searched, setSearched] = useState(false);

  // ======================= ENQUIRY ======================= 
  const fetchStudents = async (classId) => {
  const instId = localStorage.getItem("InstituteID");
  const sesId = localStorage.getItem("SessionID");

  if (!classId) return;

  try {
    setLoading(true);
    setSearched(true);

    const res = await getStudentList(instId, sesId, classId);

    if (Array.isArray(res?.Table)) {
      const mappedData = res.Table.map((item) => ({
        id: item.Id,
        name: item.Name,
      }));

      setStudentList(mappedData);
      setFilteredList(mappedData);
    } else {
      setStudentList([]);
      setFilteredList([]);
    }
  } catch (error) {
    console.log("Student API Error:", error);
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



  // ======================= SEARCH ENQUIRY =======================
  // const handleSearch = async () => {
  //   const instId = localStorage.getItem("InstituteID");
  //   const sesId = localStorage.getItem("SessionID");

  //   if (!selectedClassId) {
  //     alert("Please select class");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setSearched(true);

  //     const res = await getStudentList(instId, sesId, selectedClassId);

  //     // ✅ API returns data directly in Table
  //     if (Array.isArray(res?.Table)) {
  //       const mappedData = res.Table.map((item) => ({
  //         id: item.Id,
  //         name: item.Name,
  //       }));

  //       setStudentList(mappedData);
  //       setFilteredList(mappedData);
  //     } else {
  //       setStudentList([]);
  //       setFilteredList([]);
  //     }
  //   } catch (error) {
  //     console.log("Student API Error:", error);
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


  // ======================= NAME FILTER =======================
  useEffect(() => {
    const searchText = studentName?.toLowerCase() || "";

    if (!searchText) {
      setFilteredList(studentList);
      return;
    }

    const filtered = studentList.filter((item) => {
      const name = item?.name ? item.name.toLowerCase() : "";
      return name.includes(searchText);
    });

    setFilteredList(filtered);
  }, [studentName, studentList]);

  return (
    <div className="w-full h-full bg-white px-4 py-2">
      {/* LOADER */}
      <Loader show={loading} />

      {/* HEADER */}
      <div className="flex justify-between mb-5">
        <Heading label="Create Student" />
        <Buttons click={() => navigate("/Create-Student", { replace: true })} label="Add" />
      </div>

      {/* FILTERS */}
      <div className="grid sm:grid-cols-2 gap-6 mb-5">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <FormInput
          label="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      {/* SEARCH BUTTON */}
      <div className="flex justify-end">
        <Buttons click={handleSearch} label="Search" />
      </div>

      {/* TABLE */}
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
          {/* Desktop buttons */}
          <Buttons
            label="Edit"
            style="hidden sm:inline"
            click={() =>
              navigate("/Create-Student", {
                state: { studId: row.id, classId: selectedClassId }, 
                replace: true, 
              })
            }
          />

          <Buttons
            label="Print"
            style="hidden sm:inline"
            click={() => { window.open("/pdf/2AddReportViewer.pdf", "_blank"); }}
          />

          {/* Mobile icons */}
          <button
            className="sm:hidden text-lg"
            onClick={() =>
              navigate("/Create-Student", {
                state: { studId: row.id, classId: selectedClassId }, 
                replace: true, 
              })
            }
          >
            ✏️
          </button>

          <button
            className="sm:hidden text-xl"
            onClick={() => { window.open("/pdf/2AddReportViewer.pdf", "_blank"); }}
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

export default Create_Student;
