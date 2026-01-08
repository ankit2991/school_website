// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Options from '../../Components/Page_Forms/Options'
// import RadioButton from '../../Components/Page_Forms/RadioButton'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { useLocation, useNavigate } from 'react-router-dom'
// import Table from '../../Components/Page_Forms/Table'
// import Dialog from '../../Components/Page_Forms/Dialog'
// import Heading2 from "../../Components/Page_Forms/Heading2";
// import { getGradeList } from '../../services/api'

// function Marks_entry2() {
//     const navigate = useNavigate()
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID");
//     const [searched, setSearched] = useState(false);
//     const  [agree, setAgree] = useState(false)
//     const [gradeList, setGradeList] = useState([]); 
//     const [selectedGradeId, setSelectedGradeId] = useState("");
//     const [selected, setSelected] = useState("attend1");
//     const [selectedStudent, setSelectedStudent] = useState(null); 
//     const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//     const [tableData, setTableData] = useState([]); 
//     const location = useLocation(); 
//     const { 
//         students = [], className = "", examName = "", subjectName = "", 
//         minMarks = "", maxMarks = "", marksType = "1", 
//     } = location.state || {}; 
    
//     const columns = [ 
//         { header: "Student Name", accessor: "name" }, 
//         { header: "Env. No.", accessor: "serial" }, 
//         { header: "Roll No.", accessor: "roll" }, 
//         ...(marksType !== "2" ? [{ header: "Marks Obt.", accessor: "mark" }] : []), 
//         ...(marksType !== "1" ? [{ header: "Grade", accessor: "grade" }] : []), 
//         { header: "Att. Type", accessor: "attTypeText" }, 
//     ]; 

    
//     // =================== TABLE ====================== 
//     useEffect(() => { 
//         const mapped = students.map((s, index) => { 
//             const apiAtt = s.AttType; 
//             const attType = apiAtt === "P" ? "attend1" : apiAtt === "L" ? "attend2" : apiAtt === "A" ? "attend3" : "attend1"; 
//             return { 
//                 id: s.Id || index, name: s.Name, serial: s.EnvNo, roll: s.RollNo, 
//                 mark: s.MarksObt || "", grade: s.F_GradeMaster === -1 ? "" : s.F_GradeMaster, 
//                 // internal value (radio buttons use this) 
//                 type: attType,  
//                 // value shown in table  
//                 attTypeText: attType === "attend1" ? "P" : attType === "attend2" ? "L" : attType === "attend3" ? "A" : "", 
//             }; 
//         }); 
        
//         setTableData(mapped); 
//     }, [students]); 
    
//     console.log("NAV STATE 👉", location.state); 

//     // =================== GRADE LIST ====================== 
//     useEffect(() => { 
//         fetchGradeList(); 
//     }, []); 
    
//     const fetchGradeList = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getGradeList(instId, sessId); 
            
//             if (res?.Table) { 
//                 setGradeList(res.Table); 
//             } 
//         } catch (error) { 
//             console.error("Stop API Error:", error); 
//         } finally { 
//             setSearched(false); 
//         } 
//     }; 
    
//     const handleRowClick = (row) => { 
//         const index = tableData.findIndex( 
//             (item) => item.id === row.id 
//         ); 
        
//         setSelectedStudent({ ...row }); 
//         setSelectedRowIndex(index); 
        
//         // Sync Attendance Radio 
//         setSelected(row.type || "attend1"); 
        
//         // Sync Grade 
//         setSelectedGradeId(row.grade || ""); 
//     };

//     const getAttText = (type) => { 
//         if (type === "attend1") return "P"; 
//         if (type === "attend2") return "L"; 
//         if (type === "attend3") return "A"; 
//         return ""; 
//     };

//     const getGradeByAttendance = (type) => {
//   if (type === "attend2") return "L";   // Leave
//   if (type === "attend3") return "AB";  // Absent
//   return "";
// };

//    const handleAttendanceChange = (value) => {
//   setSelected(value);

//   setSelectedStudent((prev) => {
//     if (!prev) return prev;

//     // Leave or Absent
//     if (value === "attend2" || value === "attend3") {
//       return {
//         ...prev,
//         type: value,
//         attTypeText: getAttText(value),
//         mark: 0,
//         grade: getGradeByAttendance(value),
//       };
//     }

//     // Present
//     return {
//       ...prev,
//       type: value,
//       attTypeText: getAttText(value),
//       grade: prev.grade || "",
//     };
//   });

//   // reset grade dropdown UI when not Present
//   if (value !== "attend1") {
//     setSelectedGradeId("");
//   }
// };

// const saveCurrentRow = () => {
//   if (selectedRowIndex === null || !selectedStudent) return;

//   setTableData((prev) => {
//     const updated = [...prev];
//     updated[selectedRowIndex] = {
//       ...selectedStudent,
//       attTypeText: getAttText(selectedStudent.type),
//     };
//     return updated;
//   });
// };



    
//     return ( 
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
//             <div className="flex justify-between items-center gap-x-4 mb-5"> 
//                 <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} /> 
//             </div> 
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
//                 <FormInput 
//                     label="Class" value={className} readOnly 
//                 /> 
//                 <FormInput 
//                     label="Subject" value={subjectName} readOnly 
//                 /> 
//                 <FormInput 
//                     label="Exam" value={examName} readOnly 
//                 /> 
//             </div> 
//             {(marksType === "1" || marksType === "3") && ( 
//                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
//                     <FormInput 
//                         label="Min. Marks" value={minMarks} 
//                     /> 
//                     <FormInput 
//                         label="Max. Marks" value={maxMarks} 
//                     /> 
//                 </div> 
//             )} 
            
//             <div className="flex flex-col lg:flex-row gap-6 mb-5 w-full"> 
//                 {/* Left Side: Table */} 
//                 <div className="flex-[2]"> 
//                     <Table 
//                         columns={columns} data={tableData} onRowClick={handleRowClick} 
//                     /> 
//                 </div>  
                
//                 {/* Right Side: Form Section */} 
//                 <div className="flex-[1]"> 
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full"> 
//                         <FormInput 
//                             label="Student Name" value={selectedStudent?.name || ""} readOnly 
//                         /> 
                        
//                         <FormInput 
//                             label="Env. No." value={selectedStudent?.serial || ""} readOnly 
//                         /> 
                        
//                         <FormInput 
//                             label="Roll No." value={selectedStudent?.roll || ""} readOnly 
//                         /> 
                        
//                         {/* {(marksType === "1" || marksType === "3") && ( 
//                             <FormInput 
//                                 label="Marks" placeholder="Enter Marks" 
//                                 value={selectedStudent?.mark || ""} 
//                                 onChange={(e) => setSelectedStudent((prev) => ({ 
//                                     ...prev, mark: e.target.value, 
//                                 })) } 
//                             /> 
//                         )}  */}
                        
//                         {/* GRADE FIELD → only for Graded & Number Graded */} 
//                         {/* {(marksType === "2" || marksType === "3") && ( 
//                             <Options 
//                                 label="Grade" optionMsg="Select Grade" options={gradeList} 
//                                 valueKey="Id" labelKey="Name" value={selectedGradeId} 
//                                 onChange={(e) => { 
//                                     setSelectedGradeId(e.target.value); 
//                                     setSelectedStudent((prev) => ({
//                                         ...prev, grade: e.target.value, 
//                                     })); 
//                                 }} 
//                             /> 
//                         )} */}

//                         {/* MARKS */}
// {(marksType === "1" || marksType === "3") &&
//  selectedStudent?.type === "attend1" && (
//   <FormInput
//     label="Marks"
//     placeholder="Enter Marks"
//     value={selectedStudent?.mark || ""}
//     onChange={(e) =>
//       setSelectedStudent((prev) => ({
//         ...prev,
//         mark: e.target.value,
//       }))
//     }
//   />
// )}

// {/* GRADE */}
// {(marksType === "2" || marksType === "3") &&
//  selectedStudent?.type === "attend1" && (
//   <Options
//     label="Grade"
//     optionMsg="Select Grade"
//     options={gradeList}
//     valueKey="Id"
//     labelKey="Name"
//     value={selectedGradeId}
//     onChange={(e) => {
//       setSelectedGradeId(e.target.value);
//       setSelectedStudent((prev) => ({
//         ...prev,
//         grade: e.target.value,
//       }));
//     }}
//   />
// )}

//                     </div> 
                    
//                     <div className="grid grid-cols-3 gap-6 w-full"> 
//                         <h2 className="cursor-default text-md font-medium mb-1 text-gray-700"> 
//                             Attendance 
//                         </h2> 
//                     </div> 
                    
//                     <div className="grid grid-cols-3 gap-6 mb-5 w-full"> 
//                         {/* <RadioButton 
//                             label="Present" name="example" value="attend1" 
//                             checked={selected === "attend1"} 
//                             onChange={(e) => 
//                                 { const value = e.target.value; 
//                                     setSelected(value);                                     
//                                     setSelectedStudent((prev) => ({ ...prev, type: value, attTypeText: getAttText(value),})); 
//                                     setTableData((prev) => { 
//                                         if (selectedRowIndex === null) return prev; 
//                                         const updated = [...prev]; 
//                                         updated[selectedRowIndex] = { 
//                                             ...updated[selectedRowIndex], type: value, attTypeText: getAttText(value), 
//                                         }; 
//                                         return updated; 
//                                     }); 
//                                 } 
//                             } 
//                         /> 

//                         <RadioButton 
//                             label="Leave" name="example" value="attend2" 
//                             checked={selected === "attend2"} 
//                             onChange={(e) => 
//                                 { const value = e.target.value; 
//                                     setSelected(value);                                     
//                                     setSelectedStudent((prev) => ({ ...prev, type: value, attTypeText: getAttText(value),})); 
//                                     setTableData((prev) => { 
//                                         if (selectedRowIndex === null) return prev; 
//                                         const updated = [...prev]; 
//                                         updated[selectedRowIndex] = { 
//                                             ...updated[selectedRowIndex], type: value, attTypeText: getAttText(value), 
//                                         }; 
//                                         return updated; 
//                                     }); 
//                                 } 
//                             } 
//                         /> 

//                         <RadioButton 
//                             label="Absent" name="example" value="attend3" 
//                             checked={selected === "attend3"} 
//                             onChange={(e) => 
//                                 { const value = e.target.value; 
//                                     setSelected(value);                                     
//                                     setSelectedStudent((prev) => ({ ...prev, type: value, attTypeText: getAttText(value),})); 
//                                     setTableData((prev) => { 
//                                         if (selectedRowIndex === null) return prev; 
//                                         const updated = [...prev]; 
//                                         updated[selectedRowIndex] = { 
//                                             ...updated[selectedRowIndex], type: value, attTypeText: getAttText(value), 
//                                         }; 
//                                         return updated; 
//                                     }); 
//                                 } 
//                             } 
//                         /> */}

//                         <RadioButton
//   label="Present"
//   name="example"
//   value="attend1"
//   checked={selected === "attend1"}
//   onChange={(e) => handleAttendanceChange(e.target.value)}
// />

// <RadioButton
//   label="Leave"
//   name="example"
//   value="attend2"
//   checked={selected === "attend2"}
//   onChange={(e) => handleAttendanceChange(e.target.value)}
// />

// <RadioButton
//   label="Absent"
//   name="example"
//   value="attend3"
//   checked={selected === "attend3"}
//   onChange={(e) => handleAttendanceChange(e.target.value)}
// />


//                     </div> 
                    
//                     <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5"> 
//                         <Buttons 
//                             label="Previous" 
//                             // click={() => 
//                             //     { if (selectedRowIndex === null || selectedRowIndex === 0) return; 
                                    
//                             //         // 🔹 Save current edits into table 
//                             //         setTableData((prev) => { 
//                             //             const updated = [...prev]; 
//                             //             updated[selectedRowIndex] = selectedStudent; 
//                             //             return updated; 
//                             //         }); 
//                             //         const prevIndex = selectedRowIndex - 1; 
//                             //         const prevRow = tableData[prevIndex]; 
//                             //         setSelectedStudent({ ...prevRow }); 
//                             //         setSelectedRowIndex(prevIndex); 
                                    
//                             //         setSelected(prevRow.type || "attend1"); 
//                             //         setSelectedGradeId(prevRow.grade || ""); 
//                             //     } 
//                             // } 

//                             click={() => {
//   if (selectedRowIndex === null || selectedRowIndex === 0) return;

//   saveCurrentRow();

//   const prevIndex = selectedRowIndex - 1;
//   const prevRow = tableData[prevIndex];
//   setSelectedStudent({ ...prevRow });
//   setSelectedRowIndex(prevIndex);
//   setSelected(prevRow.type || "attend1");
//   setSelectedGradeId(prevRow.grade || "");
// }}
//                         /> 
//                         <Buttons 
//                             label="Next" 
//                             // click={() => 
//                             //     { if (selectedRowIndex === null) return; 
                                    
//                             //         // 🔹 Save current edits into table  
//                             //         setTableData((prev) => { 
//                             //             const updated = [...prev]; 
//                             //             updated[selectedRowIndex] = selectedStudent; 
//                             //             return updated; 
//                             //         }); 
//                             //         const nextIndex = selectedRowIndex + 1; 
//                             //         if (nextIndex < tableData.length) { 
//                             //             const nextRow = tableData[nextIndex]; 
//                             //             setSelectedStudent({ ...nextRow }); 
//                             //             setSelectedRowIndex(nextIndex); 
                                        
//                             //             setSelected(nextRow.type || "attend1"); 
//                             //             setSelectedGradeId(nextRow.grade || ""); 
//                             //         } 
//                             //     } 
//                             // } 

//                             click={() => {
//   if (selectedRowIndex === null) return;

//   saveCurrentRow();

//   const nextIndex = selectedRowIndex + 1;
//   if (nextIndex < tableData.length) {
//     const nextRow = tableData[nextIndex];
//     setSelectedStudent({ ...nextRow });
//     setSelectedRowIndex(nextIndex);
//     setSelected(nextRow.type || "attend1");
//     setSelectedGradeId(nextRow.grade || "");
//   }
// }}

//                         /> 
                        
//                     </div> 
//                 </div> 
//             </div> 
            
//             <CheckBox 
//                 label={"Send SMS all Student"} labelClass='text-[20px] mt-5 ' 
//                 checkstyle={"mt-5"} name={""} checked={agree} 
//                 onChange={(e) => setAgree(e.target.checked)} 
//             /> 
//             <FormInput 
//                 label={"Message"} placeholder={"Enter Message"} labelStyle="mt-2" 
//             />
//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
//                 <Buttons label={"Cancel"}/>
//                 <Buttons label={"Save"}/>
//             </div>
//         </div>
//     )
// }

// export default Marks_entry2



import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Options from '../../Components/Page_Forms/Options'
import RadioButton from '../../Components/Page_Forms/RadioButton'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useLocation, useNavigate } from 'react-router-dom'
import Table from '../../Components/Page_Forms/Table'
import Dialog from '../../Components/Page_Forms/Dialog'
import Heading2 from "../../Components/Page_Forms/Heading2";
import { getGradeList, insertMarks } from '../../services/api'
import Loader from '../../Components/Page_Forms/Loader'

function Marks_entry2() {
    const navigate = useNavigate()
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID");
    const [searched, setSearched] = useState(false);
    const  [agree, setAgree] = useState(false)
    const [gradeList, setGradeList] = useState([]); 
    const [selectedGradeId, setSelectedGradeId] = useState("");
    const [selected, setSelected] = useState("attend1");
    const [selectedStudent, setSelectedStudent] = useState(null); 
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [tableData, setTableData] = useState([]); 
    const location = useLocation(); 
    const { 
        students = [], className = "", examName = "", subjectName = "", 
        minMarks = "", maxMarks = "", marksType = "1", 
    } = location.state || {}; 
    
    const columns = [ 
        { header: "Student Name", accessor: "name" }, 
        { header: "Env. No.", accessor: "serial" }, 
        { header: "Roll No.", accessor: "roll" }, 
        ...(marksType !== "2" ? [{ header: "Marks Obt.", accessor: "mark" }] : []), 
        ...(marksType !== "1" ? [{ header: "Grade", accessor: "grade" }] : []), 
        { header: "Att. Type", accessor: "attTypeText" }, 
    ]; 

    
    // =================== TABLE ====================== 
    useEffect(() => { 
        const mapped = students.map((s, index) => { 
            const apiAtt = s.AttType; 
            const attType = apiAtt === "P" ? "attend1" : apiAtt === "L" ? "attend2" : apiAtt === "A" ? "attend3" : "attend1"; 
            return { 
                id: s.Id || index, name: s.Name, serial: s.EnvNo, roll: s.RollNo, 
                mark: s.MarksObt || "", grade: s.F_GradeMaster === -1 ? "" : s.F_GradeMaster, 
                // internal value (radio buttons use this) 
                type: attType,  
                // value shown in table  
                attTypeText: attType === "attend1" ? "P" : attType === "attend2" ? "L" : attType === "attend3" ? "A" : "", 
            }; 
        }); 
        
        setTableData(mapped); 
    }, [students]); 
    

    // =================== GRADE LIST ====================== 
    useEffect(() => { 
        fetchGradeList(); 
    }, []); 
    
    const fetchGradeList = async () => { 
        try { 
            setSearched(true); 
            const res = await getGradeList(instId, sessId); 
            
            if (res?.Table) { 
                setGradeList(res.Table); 
            } 
        } catch (error) { 
            console.error("Stop API Error:", error); 
        } finally { 
            setSearched(false); 
        } 
    }; 
    
    const handleRowClick = (row) => { 
        const index = tableData.findIndex( 
            (item) => item.id === row.id 
        ); 
        
        setSelectedStudent({ ...row }); 
        setSelectedRowIndex(index); 
        
        // Sync Attendance Radio 
        setSelected(row.type || "attend1"); 
        
        // Sync Grade 
        setSelectedGradeId(row.grade || ""); 
    };

    const getAttText = (type) => { 
        if (type === "attend1") return "P"; 
        if (type === "attend2") return "L"; 
        if (type === "attend3") return "A"; 
        return ""; 
    };

    const getGradeByAttendance = (type) => {
  if (type === "attend2") return "L";   // Leave
  if (type === "attend3") return "AB";  // Absent
  return "";
};

   const handleAttendanceChange = (value) => {
  setSelected(value);

  setSelectedStudent((prev) => {
    if (!prev) return prev;

    // Leave or Absent
    if (value === "attend2" || value === "attend3") {
      return {
        ...prev,
        type: value,
        attTypeText: getAttText(value),
        mark: 0,
        grade: getGradeByAttendance(value),
      };
    }

    // Present
    return {
      ...prev,
      type: value,
      attTypeText: getAttText(value),
      grade: prev.grade || "",
    };
  });

  // reset grade dropdown UI when not Present
  if (value !== "attend1") {
    setSelectedGradeId("");
  }
};

const saveCurrentRow = () => {
  if (selectedRowIndex === null || !selectedStudent) return;

  setTableData((prev) => {
    const updated = [...prev];
    updated[selectedRowIndex] = {
      ...selectedStudent,
      attTypeText: getAttText(selectedStudent.type),
    };
    return updated;
  });
};

const getAttendanceForApi = (type) => {
  if (type === "attend1") return "0"; // Present
  if (type === "attend2") return "1"; // Leave
  if (type === "attend3") return "2"; // Absent
  return "0";
};

const buildMarksPayload = () => {
  const isMarks = marksType === "1";
  const isGrade = marksType === "2";
  const isBoth  = marksType === "3";

  // ================= MARKS MODEL =================
  const marksModel = {
    "1": {
      F_SessionMaster: Number(sessId),
      F_ClassSection: location.state?.classId?.toString(),
      F_ExamMaster: location.state?.examId?.toString(),
      F_SubExamMaster: location.state?.subExamId?.toString() || "1",
      F_SubjectGroupMaster: 0,
      F_SubjectMaster: location.state?.subjectId?.toString(),
      IncludeInGrandTotal: false,
      Locked: false,
      MarkingType: Number(marksType),

      // ✅ Marks vs Grade logic
      MaximumMarks: isGrade ? "0" : maxMarks.toString(),
      MinimumMarks: isGrade ? "0" : minMarks.toString(),

      F_InstId: Number(instId),
      F_UserId: Number(localStorage.getItem("UserId")),
    },
  };

  // ================= MARKS TRANS =================
  const marksTrans = {};

  tableData.forEach((row, index) => {
    const isPresent = row.type === "attend1";

    marksTrans[index + 1] = {
        // ✅ Attendance
      Attendance: getAttendanceForApi(row.type),
      // ✅ Grade logic
      F_GradeMaster: isGrade && isPresent ? row.grade || "-1" : "-1", 
      F_StudentMaster: row.id.toString(),
      IsSuppliExam: false,
      // ✅ Marks logic
      Marks: isMarks && isPresent ? row.mark?.toString() || "0" : "0", 
      Studentid: row.id.toString(),
    };
  });

  return { marksModel, marksTrans };
};



const handleSaveMarks = async () => {
  try {
    setSearched(true);
    // Save currently edited row before submit
    saveCurrentRow();

    const { marksModel, marksTrans } = buildMarksPayload();

    const res = await insertMarks({
      marksModel,
      marksTrans,
      schId: "VSS",
    });

    if (Array.isArray(res) && res[0]?.Msg) {
      const [, message] = res[0].Msg.split("|");
      alert(message); // ✅ Successfully Submit Your Marks
    }
  } catch (err) {
    console.log("NAV STATE 👉", location.state); 

    console.error(err);
    alert("Failed to submit marks");
  } finally{
    setSearched(false);
  }
};




    
    return ( 
        <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
            <Loader show={searched}/>
            <div className="flex justify-between items-center gap-x-4 mb-5"> 
                <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} /> 
            </div> 
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
                <FormInput 
                    label="Class" value={className} readOnly 
                /> 
                <FormInput 
                    label="Subject" value={subjectName} readOnly 
                /> 
                <FormInput 
                    label="Exam" value={examName} readOnly 
                /> 
            </div> 
            {(marksType === "1" || marksType === "3") && ( 
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
                    <FormInput 
                        label="Min. Marks" value={minMarks} 
                    /> 
                    <FormInput 
                        label="Max. Marks" value={maxMarks} 
                    /> 
                </div> 
            )} 
            
            <div className="flex flex-col lg:flex-row gap-6 mb-5 w-full"> 
                {/* Left Side: Table */} 
                <div className="flex-[2]"> 
                    <Table 
                        columns={columns} data={tableData} onRowClick={handleRowClick} 
                    /> 
                </div>  
                
                {/* Right Side: Form Section */} 
                <div className="flex-[1]"> 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full"> 
                        <FormInput 
                            label="Student Name" value={selectedStudent?.name || ""} readOnly 
                        /> 
                        
                        <FormInput 
                            label="Env. No." value={selectedStudent?.serial || ""} readOnly 
                        /> 
                        
                        <FormInput 
                            label="Roll No." value={selectedStudent?.roll || ""} readOnly 
                        /> 
                      

                        {/* MARKS */} 
                        {(marksType === "1" || marksType === "3") && selectedStudent?.type === "attend1" && ( 
                            <FormInput 
                                label="Marks" placeholder="Enter Marks" value={selectedStudent?.mark || ""} 
                                onChange={(e) => setSelectedStudent((prev) => ({ ...prev, mark: e.target.value,}))} 
                            /> 
                        )} 
                        
                        {/* GRADE */} 
                        {(marksType === "2" || marksType === "3") && selectedStudent?.type === "attend1" && ( 
                            <Options 
                                label="Grade" optionMsg="Select Grade" options={gradeList} 
                                valueKey="Id" labelKey="Name" value={selectedGradeId} 
                                onChange={(e) => { 
                                    setSelectedGradeId(e.target.value); 
                                    setSelectedStudent((prev) => ({ 
                                        ...prev, grade: e.target.value, 
                                    })); 
                                }} 
                            /> 
                        )}

                    </div> 
                    
                    <div className="grid grid-cols-3 gap-6 w-full"> 
                        <h2 className="cursor-default text-md font-medium mb-1 text-gray-700"> 
                            Attendance 
                        </h2> 
                    </div> 
                    
                    <div className="grid grid-cols-3 gap-6 mb-5 w-full"> 
                        <RadioButton 
                            label="Present" name="example" value="attend1" 
                            checked={selected === "attend1"} 
                            onChange={(e) => handleAttendanceChange(e.target.value)} 
                        /> 
                        <RadioButton 
                            label="Leave" name="example" value="attend2" 
                            checked={selected === "attend2"} 
                            onChange={(e) => handleAttendanceChange(e.target.value)} 
                        />                         
                        <RadioButton 
                            label="Absent" name="example" value="attend3" 
                            checked={selected === "attend3"} 
                            onChange={(e) => handleAttendanceChange(e.target.value)} 
                        />


                    </div> 
                    
                    <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5"> 
                        <Buttons 
                            label="Previous" click={() => 
                                { if (selectedRowIndex === null || selectedRowIndex === 0) return;
                                    saveCurrentRow();
                                    const prevIndex = selectedRowIndex - 1;
                                    const prevRow = tableData[prevIndex];
                                    setSelectedStudent({ ...prevRow });
                                    setSelectedRowIndex(prevIndex);
                                    setSelected(prevRow.type || "attend1");
                                    setSelectedGradeId(prevRow.grade || "");
                                }
                            }
                        /> 
                        <Buttons 
                            label="Next" click={() => 
                                { 
                                    if (selectedRowIndex === null) return; 
                                    saveCurrentRow(); 
                                    const nextIndex = selectedRowIndex + 1; 
                                    if (nextIndex < tableData.length) { 
                                        const nextRow = tableData[nextIndex];
                                        setSelectedStudent({ ...nextRow }); 
                                        setSelectedRowIndex(nextIndex); 
                                        setSelected(nextRow.type || "attend1");
                                        setSelectedGradeId(nextRow.grade || ""); 
                                    } 
                                }
                            }
                        /> 
                        
                    </div> 
                </div> 
            </div> 
            
            <CheckBox 
                label={"Send SMS all Student"} labelClass='text-[20px] mt-5 ' 
                checkstyle={"mt-5"} name={""} checked={agree} 
                onChange={(e) => setAgree(e.target.checked)} 
            /> 
            <FormInput 
                label={"Message"} placeholder={"Enter Message"} labelStyle="mt-2" 
            />
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"} click={handleSaveMarks} />
            </div>
        </div>
    )
}

export default Marks_entry2