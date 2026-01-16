// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Options from "../../Components/Page_Forms/Options";
// import Table from "../../Components/Page_Forms/Table";
// import { useNavigate } from "react-router-dom";
// import {getFeesDetails, getHostelStudents, getStudentDetails,} from "../../services/api";

// function Hostel_Fee() {
//   const navigate = useNavigate();
//    const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//   const [classList, setClassList] = useState([]);
//   const [studentList, setStudentList] = useState([]);
//   const [student, setStudent] = useState(null);

//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [selectedStudentId, setSelectedStudentId] = useState("");

//   /* ---------------- FETCH CLASS LIST ---------------- */
//   useEffect(() => {
   
//     if (!instId) return;

//     (async () => {
//       try {
//         const res = await getFeesDetails(instId, sessionId);
//         setClassList(res.Table || []);
//       } catch (err) {
//         console.log("FeesDetails API Error:", err);
//         setClassList([]);
//       }
//     })();
//   }, []);

//   /* ---------------- FETCH STUDENTS WHEN CLASS CHANGES ---------------- */
//   const handleClassChange = async (e) => {
//     const classId = e.target.value;

//     setSelectedClassId(classId);
//     setSelectedStudentId("");
//     setStudent(null);
//     setStudentList([]);

//     if (!classId) return;

//     try {
//       const res = await getHostelStudents(instId, sessionId, classId);
//       // ✅ NO FILTER — show all students
//       setStudentList(res.Table || []);
//     } catch (err) {
//       console.log("HostelStudents API Error:", err);
//       setStudentList([]);
//     }
//   };

//   /* ---------------- FETCH STUDENT DETAILS ---------------- */
//   useEffect(() => {
//     if (!instId || !selectedStudentId || !selectedClassId) return;

//     (async () => {
//       try {
//         const res = await getStudentDetails(
//           instId,
//           selectedStudentId,
//           sessionId,
//           selectedClassId
//         );
//         setStudent(res?.Table?.[0] || null);
//       } catch (err) {
//         console.log("StudentDetails API Error:", err);
//         setStudent(null);
//       }
//     })();
//   }, [selectedClassId, selectedStudentId]);

//   /* ---------------- TABLE COLUMNS ---------------- */
//   const studentColumns = [
//     { header: "Er No",  accessor: "EnrollmentNo" },
//     { header: "Student Name",  accessor: "Name" },
//     { header: "Status", accessor: "SStatus" },
//   ];

//   /* ---------------- SEARCH ---------------- */
//  const handleSearch = () => {
//   if (!selectedClassId || !selectedStudentId) {
//     alert("Please select Class and Student");
//     return;
//   }

//   // 🔍 find selected student from table list
//   const selectedStudent = studentList.find(
//     (s) => String(s.Id) === String(selectedStudentId)
//   );

//   // ❌ safety check
//   if (!selectedStudent) {
//     alert("No Information Available");
//     return;
//   }

//   // ✅ check hostel status
//   if (selectedStudent.SStatus === "Yes") {
//     navigate("/Hostel-fee", {
//       state: {
//         classId: selectedClassId,
//         studentId: selectedStudentId,
//       },
//     });
//   } else {
//     alert("No Information Available");
//   }
// };


//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <div className="flex justify-between mb-5">
//         <Heading label="Hostel Fees" />
//       </div>

//       {/* 🔹 CLASS SELECTION */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
//         <Options
//           label="Class"
//           optionMsg="Select Class"
//           options={classList}
//           valueKey="Id"
//           labelKey="ClassName"
//           onChange={handleClassChange}
//         />

//         <Options
//           label="Student"
//           optionMsg="Select Student"
//           options={""}          
//         />
        
//         {/* 🔹 SELECTED STUDENT DETAILS */}
//         <FormInput label="Sr. No." value={student?.OldSrno || ""} />
//         <FormInput label="Father Name" value={student?.FatherName || ""} />
//         <FormInput label="Mother Name" value={student?.MotherName || ""} />
//       </div>

//       {/* 🔹 STUDENT TABLE */}
//       <Table
//         columns={studentColumns}
//         data={studentList}
//         selectable
//         selectedRow={studentList.find(
//           (s) => String(s.Id) === String(selectedStudentId)
//         )}
//         onRowSelect={(row) => setSelectedStudentId(row.Id)}
//         className="mb-5 "
//       />

      

//       <div className="flex justify-end">
//         <Buttons label="Search" click={handleSearch} />
//       </div>
//     </div>
//   );
// }

// export default Hostel_Fee;



import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import Options from "../../Components/Page_Forms/Options";
import Table from "../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import {
  getFeesDetails,
  getHostelStudents,
  getStudentDetails,
} from "../../services/api";

function Hostel_Fee() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID");
  const sessionId = localStorage.getItem("SessionID");

  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [student, setStudent] = useState(null);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  /* ---------------- FETCH CLASS LIST ---------------- */
  useEffect(() => {
    if (!instId) return;

    (async () => {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res.Table || []);
      } catch (err) {
        console.log("FeesDetails API Error:", err);
        setClassList([]);
      }
    })();
  }, []);

  /* ---------------- FETCH STUDENTS WHEN CLASS CHANGES ---------------- */
  const handleClassChange = async (e) => {
    const classId = e.target.value;

    setSelectedClassId(classId);
    setSelectedStudentId("");
    setStudent(null);
    setStudentList([]);

    if (!classId) return;

    try {
      const res = await getHostelStudents(instId, sessionId, classId);
      setStudentList(res.Table || []); // ✅ keep all students
    } catch (err) {
      console.log("HostelStudents API Error:", err);
      setStudentList([]);
    }
  };

  /* ---------------- FETCH STUDENT DETAILS ---------------- */
  useEffect(() => {
    if (!instId || !selectedStudentId || !selectedClassId) return;

    (async () => {
      try {
        const res = await getStudentDetails(
          instId,
          selectedStudentId,
          sessionId,
          selectedClassId
        );
        setStudent(res?.Table?.[0] || null);
      } catch (err) {
        console.log("StudentDetails API Error:", err);
        setStudent(null);
      }
    })();
  }, [selectedClassId, selectedStudentId]);

  /* ---------------- ONLY HOSTEL STUDENTS (FOR DROPDOWN) ---------------- */
  const hostelStudents = studentList.filter(
    (s) => s.SStatus === "Yes"
  );

  /* ---------------- TABLE COLUMNS ---------------- */
  const studentColumns = [
    { header: "Er No", accessor: "EnrollmentNo" },
    { header: "Student Name", accessor: "Name" },
    { header: "Status", accessor: "SStatus" },
  ];

  /* ---------------- SEARCH ---------------- */
  const handleSearch = () => {
    if (!selectedClassId || !selectedStudentId) {
      alert("Please select Class and Student");
      return;
    }

    const selectedStudent = studentList.find(
      (s) => String(s.Id) === String(selectedStudentId)
    );

    if (!selectedStudent || selectedStudent.SStatus !== "Yes") {
      alert("No Information Available");
      return;
    }

    navigate("/Hostel-fee", {
      state: {
        classId: selectedClassId,
        studentId: selectedStudentId,
      },
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between mb-5">
        <Heading label="Hostel Fees" />
      </div>

      {/* 🔹 CLASS SELECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-4">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={handleClassChange}
        />

        {/* 🔹 ONLY HOSTEL STUDENTS */}
        <Options
          label="Student"
          optionMsg="Select Student"
          options={hostelStudents}
          valueKey="Id"
          labelKey="Name"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />

        <FormInput label="Sr. No." value={student?.OldSrno || ""} />
        <FormInput label="Father Name" value={student?.FatherName || ""} />
        <FormInput label="Mother Name" value={student?.MotherName || ""} />
      </div>

      {/* 🔹 STUDENT TABLE (ALL STUDENTS) */}
      <Table
        columns={studentColumns}
        data={studentList}
        selectable
        selectedRow={studentList.find(
          (s) => String(s.Id) === String(selectedStudentId)
        )}
        onRowSelect={(row) => setSelectedStudentId(row.Id)}
        className="mb-5"
      />

      <div className="flex justify-end">
        <Buttons label="Search" click={handleSearch} />
      </div>
    </div>
  );
}

export default Hostel_Fee;
