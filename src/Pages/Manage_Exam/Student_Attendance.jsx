// import React, { useEffect, useState } from "react";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import Options from "../../Components/Page_Forms/Options";
// import Heading from "../../Components/Page_Forms/Heading";
// import Table from "../../Components/Page_Forms/Table";
// import Dialog from "../../Components/Page_Forms/Dialog";
// import CheckBox from "../../Components/Page_Forms/CheckBox";
// import RadioButton from "../../Components/Page_Forms/RadioButton";
// import { useNavigate } from "react-router-dom";
// import { getclass, getExamList, getMonthList, getStudentAttList } from "../../services/api";
// import useClassList from "../../hooks/useClassList";
// import Loader from "../../Components/Page_Forms/Loader";

// function Student_Attendance() {
//   const [agree, setAgree] = useState(false);
//   const [sure, setSure] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selected, setSelected] = useState("");
//    const { classList } = useClassList(); 
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [examList, setExamList] = useState([]); 
//   const [selectedExamId, setSelectedExamId] = useState("");
//   const [monthList, setMonthList] = useState([]); 
//   const [selectedMonthId, setSelectedMonthId] = useState("");
//   const [searched, setSearched] = useState(false); 
//   const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [tableData, setTableData] = useState([]); 
//   const navigate = useNavigate();

//   const columns = [
//     { header: "Student Name", accessor: "Name" },
//     { header: "Env. No.", accessor: "EnvNo" },
//     { header: "Roll No.", accessor: "RollNo" },
//     { header: "Total Attendance", accessor: "TotalAtt" },
//     { header: "Attendance No.", accessor: "NoOfAtt" },
//   ];

//   const allData = [
//     { id: 1, name: "Ajay", env: "11", roll: "11", tot: "50", att: "65" },
//     { id: 2, name: "Ravi", env: "12", roll: "12", tot: "64", att: "05" },
//     { id: 3, name: "Viren", env: "13", roll: "13", tot: "23", att: "10" },
//     { id: 4, name: "Anuj", env: "14", roll: "14", tot: "65", att: "16" },
//     { id: 5, name: "Somya", env: "15", roll: "15", tot: "21", att: "12" },
//   ];

//   React.useEffect(() => setFilteredData(allData), []);

  

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setOpenDialog(true);
//   };

//   // =================== EXAM LIST ====================== 
//       useEffect(() => { 
//           fetchexamList(); 
//       }, []); 
      
//       const fetchexamList = async () => { 
//           try { 
//               setSearched(true); 
//               const res = await getExamList(instId, sessId); 
              
//               if (res?.Table) { 
//                   setExamList(res.Table); 
//                   // setFilteredList(res.Table); // 👈 default table data 
//               } 
//           } catch (error) { 
//               console.error("Stop API Error:", error); 
//           } finally { 
//               setSearched(false); 
//           } 
//       };

//       // =================== MONTH LIST ====================== 
//       useEffect(() => { 
//           fetchMonthList(); 
//       }, []); 
      
//       const fetchMonthList = async () => { 
//           try { 
//               setSearched(true); 
//               const res = await getMonthList(); 
              
//               if (res?.Table) { 
//                   setMonthList(res.Table); 
//                   // setFilteredList(res.Table); // 👈 default table data 
//               } 
//           } catch (error) { 
//               console.error("Stop API Error:", error); 
//           } finally { 
//               setSearched(false); 
//           } 
//       };


//       // =================== STUDENT ATTENDANCE LIST ====================== 
//         const handleSearch = async () => { 
//           if (!selectedMonthId && !selectedClassId && !selectedExamId) { 
//             alert("Please select class"); 
//             return; 
//           } 
          
//           try { 
//             setSearched(true); 
            
//             const res = await getStudentAttList(selectedMonthId, sessId, selectedClassId, selectedExamId); 
            
//             if (res?.Table) {              
//               setTableData(res.Table); 
//             } else { 
//               setTableData([]); 
//             } 
//           } catch (error) { 
//             console.error("Student Attendance API Error:", error); 
//           } finally { 
//             setSearched(false); 
//           } 
//         }; 

  

//   return (
//     <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
//       <Loader show={searched}/>
//       <Heading label={"Student Attendance"} style={"mb-5"} />

//       {/* Filters */}
//       <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
//         <Options
//       label="Class"
//       optionMsg="Select Class"
//       options={classList}
//       valueKey="Id"          // 👈 keep as per your API
//       labelKey="ClassName"
//       onChange={(e) => setSelectedClassId(e.target.value)}
//     />
       
//         <Options
//       label="Exam"
//       optionMsg="Select Exam"
//       options={examList}
//       valueKey="Id"          // 👈 keep as per your API
//       labelKey="Name"
//       onChange={(e) => setSelectedExamId(e.target.value)}
//     />
//     <Options
//       label="Month"
//       optionMsg="Select Month"
//       options={monthList}
//       valueKey="ID"          // 👈 keep as per your API
//       labelKey="MonthName"
//       onChange={(e) => setSelectedMonthId(e.target.value)}
//     />
       
//       </div>
      

//       {/* Search Button */}
//       <div className="flex justify-end py-5">
//         <Buttons click={handleSearch} label={"Search"} />
//       </div>

//       {/* --- LARGE SCREENS --- */}
//       <div className="hidden lg:flex gap-6 mb-5 w-full">
//         {/* Left Table */}
//         <div className="flex-[2]">
//           <Table columns={columns} data={tableData} />
//         </div>

//         {/* Right Form Section */}
//         <div className="flex-[1]">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//             <FormInput
//               label={"Student Name"}
//               placeholder={"Enter Student Name"}
//             />
//             <FormInput label={"Env. No."} placeholder={"Enter Env. No."} />
//             <FormInput label={"Roll No."} placeholder={"Enter Roll No."} />
//             <FormInput
//               label={"Total Attendance"}
//               placeholder={"Enter Total Attendance"}
//             />
//             <FormInput
//               label={"Attendance Number"}
//               placeholder={"Enter Attendance No."}
//             />
//             <CheckBox
//               label={"Copy to all Student"}
//               labelClass="text-[20px] md:mt-8"
//               checkstyle={"md:mt-8"}
//               name={""}
//               checked={sure}
//               onChange={(e) => setSure(e.target.checked)}
//             />
//           </div>

//           <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5">
//             <Buttons label={"Previous"} />
//             <Buttons click={() => navigate("/Marks-Entry2")} label={"Next"} />
//           </div>
//         </div>
//       </div>

//       {/* --- SMALL & MEDIUM SCREENS --- */}
//       <div className="block lg:hidden">
//         <Table
//           columns={columns}
//           data={tableData}
//           selectable={false}
//           disableFloatingRow={true}
//           onRowSelect={handleRowClick}
//         />

//         {/* Dialog */}
//         <Dialog
//           open={openDialog}
//           title="Student Attendance"
//           dialogstyle={"sm:w-5xl h-[600px] sm:h-[330px] sm:mx-5"}
//         >
//           {selectedRow && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//               <FormInput
//                 label={"Student Name"}
//                 placeholder={"Enter Student Name"}
//               />
//               <FormInput label={"Env. No."} placeholder={"Enter Env. No."} />
//               <FormInput label={"Roll No."} placeholder={"Enter Roll No."} />
//               <FormInput
//                 label={"Total Attendance"}
//                 placeholder={"Enter Total Attendance"}
//               />
//               <FormInput
//                 label={"Attendance Number"}
//                 placeholder={"Enter Attendance No."}
//               />
//               <CheckBox
//                 label={"Copy to all Student"}
//                 labelClass="text-[20px] md:mt-8"
//                 checkstyle={"md:mt-8"}
//                 name={""}
//                 checked={sure}
//                 onChange={(e) => setSure(e.target.checked)}
//               />
//             </div>
//           )}
//           <div className="flex justify-end mt-4">
//             <Buttons label="Close" click={() => setOpenDialog(false)} />
//           </div>
//         </Dialog>
//       </div>
//       <CheckBox
//         label={"Send SMS all Student"}
//         labelClass="text-[20px] mt-5"
//         checkstyle={"mt-5"}
//         name={""}
//         checked={agree}
//         onChange={(e) => setAgree(e.target.checked)}
//       />

//       <FormInput
//         label={"Message"}
//         placeholder={"Enter Message"}
//         labelStyle="mt-2"
//       />

//       <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
//         <Buttons label={"Cancel"} />
//         <Buttons label={"Save"} />
//       </div>
//     </div>
//   );
// }

// export default Student_Attendance;






import React, { useEffect, useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import { useNavigate } from "react-router-dom";
import { getExamList, getMonthList, getStudentAttInsertUpdate, getStudentAttList } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Student_Attendance() {
  const [agree, setAgree] = useState(false);
  const [sure, setSure] = useState(false);
   const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState("");
  const [examList, setExamList] = useState([]); 
  const [selectedExamId, setSelectedExamId] = useState("");
  const [monthList, setMonthList] = useState([]); 
  const [selectedMonthId, setSelectedMonthId] = useState("");
  const [searched, setSearched] = useState(false); 
  const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const [tableData, setTableData] = useState([]); 
    const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [editedRows, setEditedRows] = useState({});

  const columns = [
    { header: "Student Name", accessor: "Name" },
    { header: "Env. No.", accessor: "EnvNo" },
    { header: "Roll No.", accessor: "RollNo" },
    { header: "Total Attendance", accessor: "TotalAtt" },
    { header: "Attendance No.", accessor: "NoOfAtt" },
  ];
  
  // =================== EXAM LIST ====================== 
      useEffect(() => { 
          fetchexamList(); 
      }, []); 
      
      const fetchexamList = async () => { 
          try { 
              setSearched(true); 
              const res = await getExamList(instId, sessId); 
              
              if (res?.Table) { 
                  setExamList(res.Table); 
                  // setFilteredList(res.Table); // 👈 default table data 
              } 
          } catch (error) { 
              console.error("Stop API Error:", error); 
          } finally { 
              setSearched(false); 
          } 
      };

      // =================== MONTH LIST ====================== 
      useEffect(() => { 
          fetchMonthList(); 
      }, []); 
      
      const fetchMonthList = async () => { 
          try { 
              setSearched(true); 
              const res = await getMonthList(); 
              
              if (res?.Table) { 
                  setMonthList(res.Table); 
                  // setFilteredList(res.Table); // 👈 default table data 
              } 
          } catch (error) { 
              console.error("Stop API Error:", error); 
          } finally { 
              setSearched(false); 
          } 
      };


      // =================== STUDENT ATTENDANCE LIST ====================== 
      // const handleSearch = async () => { 
      //   if (!selectedMonthId && !selectedClassId && !selectedExamId) { 
      //     alert("Please select class"); 
      //     return; 
      //   } 
        
      //   try { 
      //     setSearched(true); 
          
      //     const res = await getStudentAttList(selectedMonthId, sessId, selectedClassId, selectedExamId); 
          
      //     if (res?.Table) {              
      //       setTableData(res.Table); 
      //     } else { 
      //       setTableData([]); 
      //     } 
      //   } catch (error) { 
      //     console.error("Student Attendance API Error:", error); 
      //   } finally { 
      //     setSearched(false); 
      //   } 
      // }; 

      const handleSearch = async () => {
  if (!selectedMonthId || !selectedClassId || !selectedExamId) {
    alert("Please select Class, Exam and Month");
    return;
  }

  try {
    setSearched(true);
    setShowResult(false); // hide before new search

    const res = await getStudentAttList(
      selectedMonthId,
      sessId,
      selectedClassId,
      selectedExamId
    );

    if (res?.Table && res.Table.length > 0) {
      setTableData(res.Table);
      setShowResult(true); // ✅ SHOW section
    } else {
      setTableData([]);
      setShowResult(false); // ❌ hide if no data
    }
  } catch (error) {
    console.error("Student Attendance API Error:", error);
    setShowResult(false);
  } finally {
    setSearched(false);
  }
};







     const tableDisplayData = tableData.map((student) => {
  const committed = editedRows[student.Id];

  if (!committed) return student;

  return {
    ...student,
    TotalAtt: committed.TotalAtt,
    NoOfAtt: committed.NoOfAtt,
  };
});

      
      // =================== ROW SELECTION ====================== 
      // const handleRowClick = (row) => {
      //   const index = tableData.findIndex(
      //     (item) => item.EnvNo === row.EnvNo   // or unique ID if available
      //   );
        
      //   setSelectedStudent({ ...row });
      //   setSelectedRowIndex(index);
      // };

      const handleRowClick = (row) => {
  const index = tableData.findIndex(
    (item) => item.EnvNo === row.EnvNo
  );

  setSelectedStudent(getStudentWithEdits(row));
  setSelectedRowIndex(index);
};

      
      // =================== COPY ALL STUDENT ====================== 


// const handleCopyToAll = (checked) => {
//   setSure(checked);

//   if (!checked || !selectedStudent) return;

//   setTableData((prev) =>
//     prev.map((item) => {
//       const updated = {
//         ...item,
//         TotalAtt: selectedStudent.TotalAtt,
//       };

//       setEditedRows((prevEdited) => ({
//         ...prevEdited,
//         [item.Id]: {
//           Id: item.Id,
//           TotalAtt: selectedStudent.TotalAtt,
//           NoOfAtt: item.NoOfAtt,
//         },
//       }));

//       return updated;
//     })
//   );
// };

const handleCopyToAll = (checked) => {
  setSure(checked);
  if (!checked || !selectedStudent) return;

  setTableData((prev) =>
    prev.map((item) => ({
      ...item,
      TotalAtt: selectedStudent.TotalAtt,
    }))
  );

  const newEdited = {};
  tableData.forEach((item) => {
    newEdited[item.Id] = {
      Id: item.Id,
      TotalAtt: selectedStudent.TotalAtt,
      NoOfAtt: item.NoOfAtt,
    };
  });

  setEditedRows(newEdited);
};


// =================== SAVE / UPDATE ====================== 
// const handleSave = async () => {
//   if (Object.keys(editedRows).length === 0) {
//     alert("No changes to save");
//     return;
//   }

//   const studAttendDetails = Object.values(editedRows).map((item) => ({
//     Id: item.Id,
//     TotalAtt: item.TotalAtt,
//     NoOfAtt: item.NoOfAtt,
//   }));

//   try {
//     setSearched(true);

//     const res = await getStudentAttInsertUpdate(
//       selectedMonthId,
//       instId,
//       sessId,
//       selectedClassId,
//       selectedExamId,
//       studAttendDetails,
//       localStorage.getItem("UserId")
//     );

//     if (res?.Table?.[0]?.Column1) {
//       alert(res.Table[0].Column1);
//       setEditedRows({}); // clear after success
//     }
//   } catch (error) {
//     console.error("Save Attendance Error:", error);
//   } finally {
//     setSearched(false);
//   }
// };

const handleSave = async () => {
  if (!tableData.length) return;

  // Build full payload (edited + unedited students)
  const studAttendDetails = tableData.map((student) => {
    const edited = editedRows[student.Id];

    return {
      Id: student.Id,
      TotalAtt: edited ? edited.TotalAtt : student.TotalAtt,
      NoOfAtt: edited ? edited.NoOfAtt : student.NoOfAtt,
    };
  });

  try {
    setSearched(true);

    const res = await getStudentAttInsertUpdate(
      selectedMonthId,
      instId,
      sessId,
      selectedClassId,
      selectedExamId,
      studAttendDetails,
      localStorage.getItem("UserId")
    );

    if (res?.Table?.[0]?.Column1) {
      alert(res.Table[0].Column1);

      // 🔹 CLEAR LOCAL EDITS
      setEditedRows({});
      setSelectedStudent(null);
      setSelectedRowIndex(null);

      // 🔹 RELOAD TABLE FROM API
      await handleSearch(); // <-- THIS IS THE KEY
    }
  } catch (error) {
    console.error("Save Attendance Error:", error);
  } finally {
    setSearched(false);
  }
};


// const handleSave = async () => {
//   if (!tableData.length) return;

//   // 🔹 Build full list
//   const studAttendDetails = tableData.map((student) => {
//     const edited = editedRows[student.Id];

//     return {
//       Id: student.Id,
//       TotalAtt: edited ? edited.TotalAtt : student.TotalAtt,
//       NoOfAtt: edited ? edited.NoOfAtt : student.NoOfAtt,
//     };
//   });

//   try {
//     setSearched(true);

//     const res = await getStudentAttInsertUpdate(
//       selectedMonthId,
//       instId,
//       sessId,
//       selectedClassId,
//       selectedExamId,
//       studAttendDetails,
//       localStorage.getItem("UserId")
//     );

//     if (res?.Table?.[0]?.Column1) {
//       alert(res.Table[0].Column1);
//       setEditedRows({});
//     }
//   } catch (error) {
//     console.error("Save Attendance Error:", error);
//   } finally {
//     setSearched(false);
//   }
// };



const getStudentWithEdits = (student) => {
  const edited = editedRows[student.Id];

  if (!edited) return { ...student };

  return {
    ...student,
    TotalAtt: edited.TotalAtt ?? student.TotalAtt,
    NoOfAtt: edited.NoOfAtt ?? student.NoOfAtt,
  };
};


const commitCurrentStudent = () => {
  if (!selectedStudent) return;

  setEditedRows((prev) => ({
    ...prev,
    [selectedStudent.Id]: {
      Id: selectedStudent.Id,
      TotalAtt: selectedStudent.TotalAtt,
      NoOfAtt: selectedStudent.NoOfAtt,
    },
  }));
};



  

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Loader show={searched}/>
      <Heading label={"Student Attendance"} style={"mb-5"} />

      {/* Filters */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        <Options
      label="Class"
      optionMsg="Select Class"
      options={classList}
      valueKey="Id"          // 👈 keep as per your API
      labelKey="ClassName"
      onChange={(e) => setSelectedClassId(e.target.value)}
    />
       
        <Options
      label="Exam"
      optionMsg="Select Exam"
      options={examList}
      valueKey="Id"          // 👈 keep as per your API
      labelKey="Name"
      onChange={(e) => setSelectedExamId(e.target.value)}
    />
    <Options
      label="Month"
      optionMsg="Select Month"
      options={monthList}
      valueKey="ID"          // 👈 keep as per your API
      labelKey="MonthName"
      onChange={(e) => setSelectedMonthId(e.target.value)}
    />
       
      </div>
      

      {/* Search Button */}
      <div className="flex justify-end py-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      {/* --- LARGE SCREENS --- */}
      {/* <div className="flex flex-col lg:flex-row gap-6 mb-5 w-full"> */}
        {/* Left Table */}
        {/* <div className="flex-[2]">
          <Table columns={columns} data={tableDisplayData} onRowClick={handleRowClick} />
        </div> */}

        {/* Right Form Section */}
        {/* <div className="flex-[1]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
          
            <FormInput
  label="Student Name"
  placeholder="Enter Student Name"
  value={selectedStudent?.Name || ""}
/>

<FormInput
  label="Env. No."
  placeholder="Enter Env. No."
  value={selectedStudent?.EnvNo || ""}
/>

<FormInput
  label="Roll No."
  placeholder="Enter Roll No."
  value={selectedStudent?.RollNo || ""}
/>

 <div className="flex flex-col flex-1">
 

<FormInput
  label="Total Attendance"
  value={selectedStudent?.TotalAtt || ""}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedStudent((prev) => ({
      ...prev,
      TotalAtt: value,
    }));
  }}
/>
          <CheckBox
              label={"Copy to all Student"}
              labelClass=" mt-2"
              checkstyle={"mt-2"}
              name={""}
              checked={sure}
              onChange={(e) => handleCopyToAll(e.target.checked)}
            /> 
            </div>


<FormInput
  label="Attendance Number"
  value={selectedStudent?.NoOfAtt || ""}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedStudent((prev) => ({
      ...prev,
      NoOfAtt: value,
    }));
  }}
/>
          </div>

          <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5">
          

<Buttons
  label="Previous"
  click={() => {
    if (selectedRowIndex === null || selectedRowIndex === 0) return;

    // 🔹 Commit before moving
    commitCurrentStudent();

    const prevIndex = selectedRowIndex - 1;
    setSelectedStudent({ ...tableData[prevIndex] });
    setSelectedRowIndex(prevIndex);
  }}
/> */}






            {/* <Buttons
  label="Next"
  click={() => {
    if (selectedRowIndex === null) return;

    // 🔹 Update table data
    setTableData((prev) => {
      const updated = [...prev];
      // updated[selectedRowIndex] = selectedStudent;
      updated[selectedRowIndex] = {
  ...updated[selectedRowIndex],   // keep old data
  ...selectedStudent              // overwrite only changed fields
};
      return updated;
    });

    // 🔹 Move to next row
    const nextIndex = selectedRowIndex + 1;

    if (nextIndex < tableData.length) {
      setSelectedStudent({ ...tableData[nextIndex] });
      setSelectedRowIndex(nextIndex);
    } else {
      // Optional: end of list
      setSelectedStudent(null);
      setSelectedRowIndex(null);
    }
  }}
/> */}

{/* <Buttons
  label="Next"
  click={() => {
    if (selectedRowIndex === null) return;

    // 🔹 Commit before moving
    commitCurrentStudent();

    const nextIndex = selectedRowIndex + 1;
    if (nextIndex < tableData.length) {
      setSelectedStudent({ ...tableData[nextIndex] });
      setSelectedRowIndex(nextIndex);
    }
  }}
/>






          </div>
        </div>
      </div> */}

{/*       
      <CheckBox
        label={"Send SMS all Student"}
        labelClass="text-[20px] mt-5"
        checkstyle={"mt-5"}
        name={""}
        checked={agree}
        onChange={(e) => setAgree(e.target.checked)}
      />

      <FormInput
        label={"Message"}
        placeholder={"Enter Message"}
        labelStyle="mt-2"
      />

      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
        <Buttons label={"Cancel"} />
        
        <Buttons label={"Save"} click={handleSave} />
      </div> */}

      {showResult && (
  <>
    {/* --- LARGE SCREENS --- */}
    <div className="flex flex-col lg:flex-row gap-6 mb-5 w-full">
      {/* Left Table */}
      <div className="flex-[2]">
        <Table
          columns={columns}
          data={tableDisplayData}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-[1]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
          
            <FormInput
  label="Student Name"
  placeholder="Enter Student Name"
  value={selectedStudent?.Name || ""}
/>

<FormInput
  label="Env. No."
  placeholder="Enter Env. No."
  value={selectedStudent?.EnvNo || ""}
/>

<FormInput
  label="Roll No."
  placeholder="Enter Roll No."
  value={selectedStudent?.RollNo || ""}
/>

 <div className="flex flex-col flex-1">
 

<FormInput
  label="Total Attendance"
  value={selectedStudent?.TotalAtt || ""}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedStudent((prev) => ({
      ...prev,
      TotalAtt: value,
    }));
  }}
/>
          <CheckBox
              label={"Copy to all Student"}
              labelClass=" mt-2"
              checkstyle={"mt-2"}
              name={""}
              checked={sure}
              onChange={(e) => handleCopyToAll(e.target.checked)}
            /> 
            </div>


<FormInput
  label="Attendance Number"
  value={selectedStudent?.NoOfAtt || ""}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedStudent((prev) => ({
      ...prev,
      NoOfAtt: value,
    }));
  }}
/>
          </div>

          <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5">
          

<Buttons
  label="Previous"
  click={() => {
    if (selectedRowIndex === null || selectedRowIndex === 0) return;

    // 🔹 Commit before moving
    commitCurrentStudent();

    const prevIndex = selectedRowIndex - 1;
    setSelectedStudent({ ...tableData[prevIndex] });
    setSelectedRowIndex(prevIndex);
  }}
/>






     

<Buttons
  label="Next"
  click={() => {
    if (selectedRowIndex === null) return;

    // 🔹 Commit before moving
    commitCurrentStudent();

    const nextIndex = selectedRowIndex + 1;
    if (nextIndex < tableData.length) {
      setSelectedStudent({ ...tableData[nextIndex] });
      setSelectedRowIndex(nextIndex);
    }
  }}
/>






          </div>
        </div>
      </div>


    <CheckBox
      label={"Send SMS all Student"}
      labelClass="text-[20px] mt-5"
      checkstyle={"mt-5"}
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
    />

    <FormInput
      label={"Message"}
      placeholder={"Enter Message"}
      labelStyle="mt-2"
    />

    <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
      <Buttons label={"Cancel"} />
      <Buttons label={"Save"} click={handleSave} />
    </div>
  </>
)}

    </div>
  );
}

export default Student_Attendance;






