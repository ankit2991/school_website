// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import { useLocation, useNavigate } from "react-router-dom";
// import Options from "../../Components/Page_Forms/Options";
// import {
//   getSiblingDelete,
//   getSiblingDetails,
//   getSiblingInsert,
//   getStudentList,
// } from "../../services/api";
// import Table from "../../Components/Page_Forms/Table";
// import useClassList from "../../hooks/useClassList";
// import Loader from "../../Components/Page_Forms/Loader";

// function Add_Sibling2() {
//   const instId = localStorage.getItem("InstituteID");
//   const userId = localStorage.getItem("UserId");
//   const sessId = localStorage.getItem("SessionID");
//   const location = useLocation();
//   const editStudId = location.state?.studId || null;
//   const navigate = useNavigate();
//   const [siblings, setSiblings] = useState([]);
//   const columns = [
//     { header: "S.No.", shortHeader: "No", accessor: "sno" },
//     { header: "Student", shortHeader: "Student", accessor: "StudentName" },
//     { header: "Class", shortHeader: "Class", accessor: "ClassName" },
//   ];
//   const { classList } = useClassList();
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [studentList, setStudentList] = useState([]);
//   const [selectedStudentId, setSelectedStudentId] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [deletedSiblingIds, setDeletedSiblingIds] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const siblingTableData = siblings
//     .filter(Boolean) // 🔴 removes undefined/null rows
//     .map((s, index) => ({
//       ...s,
//       sno: index + 1,
//     }));

//   const fetchSiblingDetails = async () => {
//     if (!editStudId || !instId || !sessId) return;

//     try {
//       setLoading(true);
//       const res = await getSiblingDetails(instId, editStudId, sessId);
//       const d = res?.Table?.[0];
//       if (d) {
//         setFormData({
//           enrollno: d.EnrollmentNo || "",
//           name: d.Name || "",
//           fName: d.FatherName || "",
//           mNane: d.MotherName || "",
//           dob: apiDateToInput(d.DOB),
//           joinDate: apiDateToInput(d.JoinDate),
//         });
//       }
//       // ✅ IMPORTANT CHANGE IS HERE
//       setSiblings(
//         Array.isArray(res?.Table1)
//           ? res.Table1.map((s) => ({ ...s, isNew: false }))
//           : []
//       );
//     } catch (err) {
//       console.error("Sibling Details Error:", err);
//     } finally { 
//       setLoading(false); 
//     } 
//   };

//   useEffect(() => {
//     fetchSiblingDetails();
//   }, [editStudId, instId, sessId]);

//   const [formData, setFormData] = useState({
//     enrollno: "",
//     name: "",
//     fName: "",
//     mNane: "",
//     dob: "",
//     joinDate: "",
//   });

//   // API → INPUT
//   const apiDateToInput = (apiDate) => {
//     if (!apiDate) return "";
//     const timestamp = parseInt(apiDate.match(/\d+/)[0], 10);
//     const d = new Date(timestamp);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0");
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     if (!selectedClassId || !instId || !sessId) {
//       setStudentList([]);
//       return;
//     }

//     async function fetchStudents() {
//       try {
//         setLoading(true); 
//         const res = await getStudentList(instId, sessId, selectedClassId);
//         if (Array.isArray(res?.Table)) {
//           setStudentList(res.Table);
//         } else {
//           setStudentList([]);
//         }
//       } catch (err) {
//         console.error("Student List Error:", err);
//         setStudentList([]);
//       } finally { 
//         setLoading(false); 
//       }
//     }

//     fetchStudents();
//   }, [selectedClassId, instId, sessId]);

//   const handleAddSibling = () => {
//     if (!selectedClassId || !selectedStudentId) {
//       setErrorMsg("Please select both class and student");
//       return;
//     }

//     const selectedClass = classList.find(
//       (c) => String(c.Id) === String(selectedClassId)
//     );

//     const selectedStudent = studentList.find(
//       (s) => String(s.Id) === String(selectedStudentId)
//     );

//     if (!selectedClass || !selectedStudent) return;
//     // 🔴 DUPLICATE CHECK
//     const alreadyExists = siblings.some(
//       (s) => String(s.StudentId) === String(selectedStudent.Id)
//     );

//     if (alreadyExists) {
//       setErrorMsg("Student already added");
//       return;
//     }

//     const newSibling = {
//       StudentId: selectedStudent.Id,
//       StudentName: selectedStudent.Name,
//       ClassId: selectedClass.Id,
//       ClassName: selectedClass.ClassName,
//       isNew: true, // 🔴 IMPORTANT
//     };

//     setSiblings((prev) => [...prev, newSibling]);

//     // clear only error message
//     setErrorMsg("");
//   };

//   const handleDeleteSibling = (row) => {
//     // Track deleted student id
//     setDeletedSiblingIds((prev) =>
//       prev.includes(row.StudentId) ? prev : [...prev, row.StudentId]
//     );

//     // Remove row from table
//     setSiblings((prev) =>
//       prev.filter((s) => String(s.StudentId) !== String(row.StudentId))
//     );
//   };

//   const handleSaveSiblings = async () => {
//     if (!editStudId) {
//       setErrorMsg("Main student not found");
//       return;
//     }

//     try {
//       setLoading(true);
//       /* 🔴 DELETE ONLY REMOVED */
//       for (const sid of deletedSiblingIds) {
//         await getSiblingDelete(sid);
//       }

//       /* 🟢 INSERT ONLY NEW SIBLINGS */
//       const newSiblings = siblings.filter((s) => s.isNew);

//       for (const s of newSiblings) {
//         await getSiblingInsert(editStudId, s.StudentId, userId);
//       }

//       // 🔄 Reload fresh data
//       await fetchSiblingDetails();
//       setDeletedSiblingIds([]);
//       setErrorMsg("");

//       alert("Sibling details saved successfully");
//     } catch (err) {
//       console.error("Save Error:", err);
//       setErrorMsg("Failed to save sibling details");
//     } finally { 
//       setLoading(false); 
//     } 
//   };

//   return (
//     <div className="w-full min-w-sm h-full px-4 py-2 bg-white flex flex-col ">
//       <Loader show={loading} />
//       <div className="flex justify-between mb-5">
//         <Heading label={"Add Sibling"} />
//         <Buttons click={() => navigate("")} label={"Edit"} />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//         <FormInput
//           label={"Enrollment Number"}
//           placeholder={"Enter Enrollment No."}
//           name="enrollno"
//           value={formData.enrollno}
//         />
//         <FormInput
//           label={"Name"}
//           placeholder={"Enter Student Name"}
//           name="name"
//           value={formData.name}
//         />
//         <FormInput
//           label={"Father Name"}
//           placeholder={"Enter Father Name"}
//           name="fName"
//           value={formData.fName}
//         />
//         <FormInput
//           label={"Mother Name"}
//           placeholder={"Enter Mother Name"}
//           name="mNane"
//           value={formData.mNane}
//         />
//         <FormInput
//           label={"Date Of Birth"}
//           type="date"
//           placeholder={"Select Date"}
//           name="dob"
//           value={formData.dob}
//         />
//         <FormInput
//           label={"Date Of Joining"}
//           type="date"
//           placeholder={"Select Date"}
//           name="joinDate"
//           value={formData.joinDate}
//         />
//       </div>

//       <div className="self-center p-3 bg-[#fcf8e5] border border-gray-400 shadow-lg rounded-md w-full lg:w-5xl">
//         <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-5">
//           <Options
//             label="Class"
//             optionMsg="Select Class"
//             options={classList}
//             valueKey="Id"
//             labelKey="ClassName"
//             onChange={(e) => setSelectedClassId(e.target.value)}
//           />

//           <Options
//             label="Student"
//             optionMsg="Select Student"
//             options={studentList}
//             valueKey="Id"
//             labelKey="Name"
//             onChange={(e) => setSelectedStudentId(e.target.value)}
//           />
//         </div>

//         {/* 🔴 Error Message */}
//         {errorMsg && (
//           <div className="text-red-600 text-sm mb-3 text-center font-medium">
//             {errorMsg}
//           </div>
//         )}

//         <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
//           <Table
//             columns={columns}
//             data={siblingTableData}
//             actions={(row) => (
//               <>
//                 {/* Desktop button */}
//                 <Buttons
//                   label="Delete"
//                   style="hidden sm:inline"
//                   click={() => handleDeleteSibling(row)}
//                 />

//                 {/* Mobile icon */}
//                 <button
//                   className="sm:hidden text-lg pt-2.5"
//                   onClick={() => handleDeleteSibling(row)}
//                 >
//                   🗑️
//                 </button>
//               </>
//             )}
//           />
//         </div>

//         <div className="flex justify-center mt-4">
//           <Buttons label="Add" click={handleAddSibling} />
//         </div>
//       </div>

//       <div className="flex justify-between sm:justify-end py-5 space-x-10">
//         <Buttons click={() => navigate("")} label={"Cancel"} />
//         <Buttons click={handleSaveSiblings} label={"Save"} disabled={loading} />
//       </div>
//     </div>
//   );
// }

// export default Add_Sibling2;


import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import {
  getSiblingDelete,
  getSiblingDetails,
  getSiblingInsert,
  getStudentList,
} from "../../services/api";
import Table from "../../Components/Page_Forms/Table";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";
import Dialog from "../../Components/Page_Forms/Dialog";

function Add_Sibling2() {
  const instId = localStorage.getItem("InstituteID");
  const userId = localStorage.getItem("UserId");
  const sessId = localStorage.getItem("SessionID");
  const location = useLocation();
  const editStudId = location.state?.studId || null;
  const navigate = useNavigate();
  const [siblings, setSiblings] = useState([]);
  const columns = [
    { header: "S.No.", shortHeader: "No", accessor: "sno" },
    { header: "Student", shortHeader: "Student", accessor: "StudentName" },
    { header: "Class", shortHeader: "Class", accessor: "ClassName" },
  ];
  const { classList } = useClassList();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [deletedSiblingIds, setDeletedSiblingIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNoStudentDialog, setShowNoStudentDialog] = useState(false); 

  const siblingTableData = siblings
    .filter(Boolean) // 🔴 removes undefined/null rows
    .map((s, index) => ({
      ...s,
      sno: index + 1,
    }));

    useEffect(() => {
    fetchSiblingDetails();
  }, [editStudId, instId, sessId]);

  const [formData, setFormData] = useState({
    enrollno: "", name: "", fName: "", mNane: "", 
    dob: "", joinDate: "", 
  });

  const fetchSiblingDetails = async () => {
    if (!editStudId || !instId || !sessId) return;

    try {
      setLoading(true);
      const res = await getSiblingDetails(instId, editStudId, sessId);
      const d = res?.Table?.[0];
      if (d) {
        setFormData({
          enrollno: d.EnrollmentNo || "",
          name: d.Name || "",
          fName: d.FatherName || "",
          mNane: d.MotherName || "",
          dob: apiDateToInput(d.DOB),
          joinDate: apiDateToInput(d.JoinDate),
        });
      }
      // ✅ IMPORTANT CHANGE IS HERE
      setSiblings(
        Array.isArray(res?.Table1)
          ? res.Table1.map((s) => ({ ...s, isNew: false }))
          : []
      );
    } catch (err) {
      console.error("Sibling Details Error:", err);
    } finally { 
      setLoading(false); 
    } 
  };

  

  // API → INPUT
  const apiDateToInput = (apiDate) => {
    if (!apiDate) return "";
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10);
    const d = new Date(timestamp);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // useEffect(() => {
  //   if (!selectedClassId || !instId || !sessId) {
  //     setStudentList([]);
  //     return;
  //   }

  //   async function fetchStudents() {
  //     try {
  //       setLoading(true); 
  //       const res = await getStudentList(instId, sessId, selectedClassId);
  //       if (Array.isArray(res?.Table)) {
  //         setStudentList(res.Table);
  //       } else {
  //         setStudentList([]);
  //       }
  //     } catch (err) {
  //       console.error("Student List Error:", err);
  //       setStudentList([]);
  //     } finally { 
  //       setLoading(false); 
  //     }
  //   }

  //   fetchStudents();
  // }, [selectedClassId, instId, sessId]);

  useEffect(() => {
  if (!selectedClassId || !instId || !sessId) {
    setStudentList([]);
    return;
  }

  async function fetchStudents() {
    try {
      setLoading(true);
      const res = await getStudentList(instId, sessId, selectedClassId);

      if (Array.isArray(res?.Table) && res.Table.length > 0) {
        setStudentList(res.Table);
      } else {
        // 🔴 NO STUDENTS CASE
        setStudentList([]);
        setShowNoStudentDialog(true);
      }
    } catch (err) {
      console.error("Student List Error:", err);
      setStudentList([]);
    } finally {
      setLoading(false);
    }
  }

  fetchStudents();
}, [selectedClassId, instId, sessId]);

const handleNoStudentDialogClose = () => {
  setShowNoStudentDialog(false);
  setSelectedClassId("");
  setSelectedStudentId("");
  setStudentList([]);
};


  const handleAddSibling = () => {
    if (!selectedClassId || !selectedStudentId) {
      setErrorMsg("Please select both class and student");
      return;
    }

    const selectedClass = classList.find(
      (c) => String(c.Id) === String(selectedClassId)
    );

    const selectedStudent = studentList.find(
      (s) => String(s.Id) === String(selectedStudentId)
    );

    if (!selectedClass || !selectedStudent) return;
    // 🔴 DUPLICATE CHECK
    const alreadyExists = siblings.some(
      (s) => String(s.StudentId) === String(selectedStudent.Id)
    );

    if (alreadyExists) {
      setErrorMsg("Student already added");
      return;
    }

    const newSibling = {
      StudentId: selectedStudent.Id,
      StudentName: selectedStudent.Name,
      ClassId: selectedClass.Id,
      ClassName: selectedClass.ClassName,
      isNew: true, // 🔴 IMPORTANT
    };

    setSiblings((prev) => [...prev, newSibling]);

    // clear only error message
    setErrorMsg("");
  };

  const handleDeleteSibling = (row) => {
    // Track deleted student id
    setDeletedSiblingIds((prev) =>
      prev.includes(row.StudentId) ? prev : [...prev, row.StudentId]
    );

    // Remove row from table
    setSiblings((prev) =>
      prev.filter((s) => String(s.StudentId) !== String(row.StudentId))
    );
  };

  const handleSaveSiblings = async () => {
    if (!editStudId) {
      setErrorMsg("Main student not found");
      return;
    }

    try {
      setLoading(true);
      /* 🔴 DELETE ONLY REMOVED */
      for (const sid of deletedSiblingIds) {
        await getSiblingDelete(sid);
      }

      /* 🟢 INSERT ONLY NEW SIBLINGS */
      const newSiblings = siblings.filter((s) => s.isNew);

      for (const s of newSiblings) {
        await getSiblingInsert(editStudId, s.StudentId, userId);
      }

      // 🔄 Reload fresh data
      await fetchSiblingDetails();
      setDeletedSiblingIds([]);
      setErrorMsg("");

      alert("Sibling details saved successfully");
    } catch (err) {
      console.error("Save Error:", err);
      setErrorMsg("Failed to save sibling details");
    } finally { 
      setLoading(false); 
    } 
  };

  return (
    <div className="w-full min-w-sm h-full px-4 py-2 bg-white flex flex-col ">
      <Loader show={loading} />
      <div className="flex justify-between mb-5">
        <Heading label={"Add Sibling"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput
          label={"Enrollment Number"}
          placeholder={"Enter Enrollment No."}
          name="enrollno"
          value={formData.enrollno}
        />
        <FormInput
          label={"Name"}
          placeholder={"Enter Student Name"}
          name="name"
          value={formData.name}
        />
        <FormInput
          label={"Father Name"}
          placeholder={"Enter Father Name"}
          name="fName"
          value={formData.fName}
        />
        <FormInput
          label={"Mother Name"}
          placeholder={"Enter Mother Name"}
          name="mNane"
          value={formData.mNane}
        />
        <FormInput
          label={"Date Of Birth"}
          type="date"
          placeholder={"Select Date"}
          name="dob"
          value={formData.dob}
        />
        <FormInput
          label={"Date Of Joining"}
          type="date"
          placeholder={"Select Date"}
          name="joinDate"
          value={formData.joinDate}
        />
      </div>

      <div className="self-center p-3 bg-[#fcf8e5] border border-gray-400 shadow-lg rounded-md w-full lg:w-5xl">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-5">
          {/* <Options
            label="Class"
            optionMsg="Select Class"
            options={classList}
            valueKey="Id"
            labelKey="ClassName"
            onChange={(e) => setSelectedClassId(e.target.value)}
          /> */}

          <Options
  label="Class"
  optionMsg="Select Class"
  options={classList}
  valueKey="Id"
  labelKey="ClassName"
  value={selectedClassId}   // ✅ REQUIRED
  onChange={(e) => setSelectedClassId(e.target.value)}
/>


          <Options
            label="Student"
            optionMsg="Select Student"
            options={studentList}
            valueKey="Id"
            labelKey="Name"
            onChange={(e) => setSelectedStudentId(e.target.value)}
          />
        </div>

        {/* 🔴 Error Message */}
        {errorMsg && (
          <div className="text-red-600 text-sm mb-3 text-center font-medium">
            {errorMsg}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md">
          <Table
            columns={columns}
            data={siblingTableData}
            actions={(row) => (
              <>
                {/* Desktop button */}
                <Buttons
                  label="Delete"
                  style="hidden sm:inline"
                  click={() => handleDeleteSibling(row)}
                />

                {/* Mobile icon */}
                <button
                  className="sm:hidden text-lg pt-2.5"
                  onClick={() => handleDeleteSibling(row)}
                >
                  🗑️
                </button>
              </>
            )}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Buttons label="Add" click={handleAddSibling} />
        </div>
      </div>

      <div className="flex justify-between sm:justify-end py-5 space-x-10">
        <Buttons click={() => navigate("")} label={"Cancel"} />
        <Buttons click={handleSaveSiblings} label={"Save"} disabled={loading} />
      </div>
      <Dialog
  open={showNoStudentDialog}
  title="No Students Found"
  dialogstyle="sm:w-md sm:h-[200px]"
>
  <p className="text-center text-gray-700 text-lg">
    No students are available in the selected class.
  </p>

  <div className="flex justify-center mt-6">
    <Buttons
      label="OK"
      click={handleNoStudentDialogClose}
    />
  </div>
</Dialog>

    </div>
  );
}

export default Add_Sibling2;