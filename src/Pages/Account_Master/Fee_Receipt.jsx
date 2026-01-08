// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Options from "../../Components/Page_Forms/Options";
// import { getclass } from "../../services/api";

// function Fee_Receipt() {
//   const navigate = useNavigate();
//   const [classList, setClassList] = useState([]);

//   // useEffect(() => {
//   //     const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
//   //     if (!instId) return;

//   //     async function fetchClasses() {
//   //         try {
//   //             const res = await getclass(instId);  // ✅ Pass selected Institute ID
//   //             setClassList(res.Table || []);
//   //         } catch (error) {
//   //             console.log("Class API Error:", error);
//   //         }
//   //     }

//   //     fetchClasses();
//   // }, []);

//   useEffect(() => {
//     const instId = localStorage.getItem("InstituteID");
//     if (!instId) return;

//     async function fetchClasses() {
//       try {
//         const res = await getclass(instId);
//         // ✅ check API success
//         if (res?.Table?.[0]?.ResultCode === "R100") {
//           setClassList(res.Table1 || []);
//         } else {
//           setClassList([]);
//         }
//       } catch (error) {
//         console.log("Class API Error:", error);
//         setClassList([]);
//       }
//     }

//     fetchClasses();
//   }, []);

//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <div className="flex justify-between mb-5">
//         <Heading label={"Pay School Fees"} />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//         <Options
//           label={"Class"}
//           name={""}
//           optionMsg="Select Class"
//           options={classList.map((item) => item.ClassName)}
//         />
//         <Options
//           label={"Student Name"}
//           name={""}
//           optionMsg="Select Student Name"
//           options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}
//         />
//         <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
//         <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
//         <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
//       </div>

//       <div className="flex justify-end">
//         <Buttons click={() => navigate("/Fees-Receipt")} label={"Search"} />
//       </div>
//     </div>
//   );
// }

// export default Fee_Receipt;

import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import { getFeesDetails, getClassWiseStudents, getStudentDetails } from "../../services/api";

function Fee_Receipt() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [student,setStudent] = useState(null);

  // ✅ STORE ONLY IDs
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  /* ---------------- FETCH CLASS LIST ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");
    if (!instId) return;

    async function fetchClasses() {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res.Table || []);
      } catch (error) {
        console.log("FeesDetails API Error:", error);
        setClassList([]);
      }
    }

    fetchClasses();
  }, []);
  
  /* ---------------- FETCH STUDENT LIST ---------------- */
 useEffect(() => {
  const instId = localStorage.getItem("InstituteID");
  const sessionId = localStorage.getItem("SessionID");

  if (!instId || !selectedStudentId || !selectedClassId) return;

  async function fetchStudent() {
    try {
      const res = await getStudentDetails(
        instId,
        selectedStudentId,
        sessionId,
        selectedClassId
      );

      // ✅ TAKE FIRST OBJECT FROM ARRAY
      setStudent(res?.Table?.[0] || null);

    } catch (error) {
      console.log("StudentDetails API Error:", error);
      setStudent(null);
    }
  }
  fetchStudent();
}, [selectedClassId, selectedStudentId]);

  /* ---------------- FETCH STUDENTS WHEN CLASS CHANGES ---------------- */
  const handleClassChange = async (e) => {
    const classId = e.target.value;

    setSelectedClassId(classId);
    setSelectedStudentId("");
    setStudentList([]);

    if (!classId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getClassWiseStudents(instId, sessionId, classId);
      setStudentList(res.Table || []);
    } catch (error) {
      console.log("Student API Error:", error);
      setStudentList([]);
    }
  };

  /* ---------------- GO TO NEXT PAGE ---------------- */
  const handleSearch = () => {
    if (!selectedClassId || !selectedStudentId) {
      alert("Please select Class and Student");
      return;
    }

    navigate("/Fees-Receipt", {
      state: {
        classId: selectedClassId,
        studentId: selectedStudentId,
      },
    });
  };

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Heading label="Pay School Fees" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        {/* Class */}
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={handleClassChange}
        />

        {/* Student */}
        <Options
          label="Student Name"
          optionMsg="Select Student"
          options={studentList}
          valueKey="Id"
          labelKey="Name"
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />

       <FormInput label="Sr. No." value={student?.OldSrno || ""} />
<FormInput label="Father Name" value={student?.FatherName || ""} />
<FormInput label="Mother Name" value={student?.MotherName || ""} />

      </div>

      <div className="flex justify-end">
        <Buttons label="Search" click={handleSearch} />
      </div>
    </div>
  );
}

export default Fee_Receipt;

