// import React, { useEffect, useState } from "react";
// import Heading from "../../../Components/Page_Forms/Heading";
// import Options from "../../../Components/Page_Forms/Options";
// import Buttons from "../../../Components/Page_Forms/Buttons";
// import Table from "../../../Components/Page_Forms/Table";
// import { useNavigate } from "react-router-dom";
// import {
//   getclass,
//   getClassWiseStudents,
//   getStudentSiblingReport,
// } from "../../../services/api";

// function Sibling_Details() {
//   const navigate = useNavigate();

//   const [classList, setClassList] = useState([]);
//   const [studentList, setStudentList] = useState([]);
//   const [siblingData, setSiblingData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [selectedStudentId, setSelectedStudentId] = useState("");

//   const [rowDetailOpen, setRowDetailOpen] = useState(false);

//   /* ---------------- TABLE COLUMNS ---------------- */
//   const columns = [
//     { header: "Serial No.", accessor: "serial" },
//     { header: "Name", accessor: "name" },
//     { header: "Father Name", accessor: "fname" },
//     { header: "Mother Name", accessor: "mname" },
//     { header: "Class", accessor: "class" },
//     { header: "D.O.B.", accessor: "dob" },
//     { header: "Admission Date", accessor: "addate" },
//     {
//       header: "Address",
//       accessor: "add",
//       cellStyle:
//         "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md",
//     },
//     { header: "Father No.", accessor: "fno" },
//     { header: "Mother No.", accessor: "mno" },
//   ];

//   /* ---------------- FETCH CLASS LIST ---------------- */
//   useEffect(() => {
//     const instId = localStorage.getItem("InstituteID");
//     if (!instId) return;

//     async function fetchClasses() {
//       try {
//         const res = await getclass(instId);
//         if (res?.Table?.[0]?.ResultCode === "R100") {
//           setClassList(res.Table1 || []);
//         } else {
//           setClassList([]);
//         }
//       } catch (err) {
//         console.log("Class API Error:", err);
//         setClassList([]);
//       }
//     }

//     fetchClasses();
//   }, []);

//   /* ---------------- CLASS CHANGE ---------------- */
//   const handleClassChange = async (e) => {
//     const classId = e.target.value;

//     setSelectedClassId(classId);
//     setSelectedStudentId("");
//     setStudentList([]);
//     setSiblingData([]);

//     if (!classId) return;

//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//     try {
//       const res = await getClassWiseStudents(instId, sessionId, classId);
//       setStudentList(res?.Table || []);
//     } catch (err) {
//       console.log("Student API Error:", err);
//       setStudentList([]);
//     }
//   };

//   /* ---------------- SEARCH (Sibling API) ---------------- */
//   const handleSearch = async () => {
//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//     if (!selectedClassId || !selectedStudentId) {
//       alert("Please select Class and Student");
//       return;
//     }

//     try {
//       setLoading(true);
//       setSiblingData([]);

//       const res = await getStudentSiblingReport(
//         instId,
//         sessionId,
//         selectedStudentId
//       );

//       if (Array.isArray(res?.Table)) {
//         const mapped = res.Table.map((item, index) => ({
//           id: item.ID,
//           serial: index + 1,
//           name: item.Name,
//           fname: item.FatherName,
//           mname: item.MotherName,
//           class: item.Class,
//           dob: item.DOB,
//           addate: item.AdmissionDate,
//           add: item.Address1,
//           fno: item.FMobileNo,
//           mno: item.MMobileNo,
//         }));

//         setSiblingData(mapped);
//       } else {
//         setSiblingData([]);
//       }
//     } catch (err) {
//       console.log("Sibling API Error:", err);
//       setSiblingData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-5">
//         <Heading label="Sibling Details" style="text-[22px] sm:text-3xl" />
//         <Buttons label="Print" click={() => navigate("")} />
//       </div>

//       {/* FILTERS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
//         <Options
//           label="Class"
//           optionMsg="Select Class"
//           options={classList}
//           valueKey="Id"
//           labelKey="ClassName"
//           onChange={handleClassChange}
//         />

//         <Options
//           label="Student Name"
//           optionMsg="Select Student"
//           options={studentList}
//           valueKey="Id"
//           labelKey="Name"
//           value={selectedStudentId}
//           onChange={(e) => {
//             setSelectedStudentId(e.target.value);
//             setSiblingData([]);
//           }}
//         />
//       </div>

//       {/* SEARCH BUTTON */}
//       <div className="flex justify-end mb-5">
//         <Buttons label="Search" click={handleSearch} />
//       </div>

//       {/* TABLE */}
//       <Table
//         columns={columns}
//         data={siblingData}
//         loading={loading}
//         disableFloatingRow={false}
//         onOverlayToggle={setRowDetailOpen}
//       />

//       {/* FOOTER */}
//       <div className="flex justify-end mt-5">
//         <Buttons label="Clear" click={() => setSiblingData([])} />
//       </div>

//       {rowDetailOpen && window.innerWidth < 768 && (
//         <div className="h-140"></div>
//       )}
//     </div>
//   );
// }

// export default Sibling_Details;





import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import {
  getclass,
  getClassWiseStudents,
  getStudentSiblingReport,
} from "../../../services/api";

function Sibling_Details() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [siblingData, setSiblingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [rowDetailOpen, setRowDetailOpen] = useState(false);

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { header: "Serial No.", accessor: "serial" },
    { header: "Name", accessor: "name" },
    { header: "Father Name", accessor: "fname" },
    { header: "Mother Name", accessor: "mname" },
    { header: "Class", accessor: "class" },
    { header: "D.O.B.", accessor: "dob" },
    { header: "Admission Date", accessor: "addate" },
    {
      header: "Address",
      accessor: "add",
      cellStyle:
        "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md",
    },
    { header: "Father No.", accessor: "fno" },
    { header: "Mother No.", accessor: "mno" },
  ];

  /* ---------------- FETCH CLASS LIST ---------------- */
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
      } catch (err) {
        console.log("Class API Error:", err);
        setClassList([]);
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
    setSiblingData([]);

    if (!classId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getClassWiseStudents(instId, sessionId, classId);
      setStudentList(res?.Table || []);
    } catch (err) {
      console.log("Student API Error:", err);
      setStudentList([]);
    }
  };

  /* ---------------- SEARCH (Sibling API) ---------------- */
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    if (!selectedClassId || !selectedStudentId) {
      alert("Please select Class and Student");
      return;
    }

    try {
      setLoading(true);
      setSiblingData([]);

      const res = await getStudentSiblingReport(
        instId,
        sessionId,
        selectedStudentId
      );

      if (Array.isArray(res?.Table)) {
        const mapped = res.Table.map((item, index) => ({
          id: item.ID,
          serial: index + 1,
          name: item.Name,
          fname: item.FatherName,
          mname: item.MotherName,
          class: item.Class,
          dob: item.DOB,
          addate: item.AdmissionDate,
          add: item.Address1,
          fno: item.FMobileNo,
          mno: item.MMobileNo,
        }));

        setSiblingData(mapped);
      } else {
        setSiblingData([]);
      }
    } catch (err) {
      console.log("Sibling API Error:", err);
      setSiblingData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <Heading label="Sibling Details" style="text-[22px] sm:text-3xl" />
        <Buttons 
          label="Print" 
          click={() => { window.open("/pdf/2AddReportViewer.pdf", "_blank"); }} 
        />
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={handleClassChange}
        />

        <Options
          label="Student Name"
          optionMsg="Select Student"
          options={studentList}
          valueKey="Id"
          labelKey="Name"
          value={selectedStudentId}
          onChange={(e) => {
            setSelectedStudentId(e.target.value);
            setSiblingData([]);
          }}
        />
      </div>

      {/* SEARCH BUTTON */}
      <div className="flex justify-end mb-5">
        <Buttons label="Search" click={handleSearch} />
      </div>

      {/* TABLE */}
      <Table
        columns={columns}
        data={siblingData}
        loading={loading}
        disableFloatingRow={false}
        onOverlayToggle={setRowDetailOpen}
      />

      {/* FOOTER */}
      <div className="flex justify-end mt-5">
        <Buttons label="Clear" click={() => setSiblingData([])} />
      </div>

      {rowDetailOpen && window.innerWidth < 768 && (
        <div className="h-140"></div>
      )}
    </div>
  );
}

export default Sibling_Details;
