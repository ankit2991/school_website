// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import CheckBox from "../../Components/Page_Forms/CheckBox";
// import Options from "../../Components/Page_Forms/Options";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import { useNavigate } from "react-router-dom";
// import RadioButton from "../../Components/Page_Forms/RadioButton";
// import { getExamList, getExamTypeList, getStudentMarksList, getSubjectList } from "../../services/api";
// import useClassList from "../../hooks/useClassList";
// import Loader from "../../Components/Page_Forms/Loader";

// function Marks_Entry() {
//   const navigate = useNavigate();
//   const [searched, setSearched] = useState(false); 
//   const instId = localStorage.getItem("InstituteID"); 
//   const sessId = localStorage.getItem("SessionID"); 
//   const { classList } = useClassList(); 
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [examList, setExamList] = useState([]); 
//   const [selectedExamId, setSelectedExamId] = useState("");
//   const [examtypeList, setExamTypeList] = useState([]);
//   const [selectedExamTypeId, setSelectedExamTypeId] = useState("");
//   const [subjectList, setSubjectList] = useState([]); 
//   const [selectedSubjectId, setSelectedSubjectId] = useState("");
//   const [minMarks, setMinMarks] = useState(""); 
//   const [maxMarks, setMaxMarks] = useState("");
//   const [marksType, setMarksType] = useState("1");

//   // =================== EXAM LIST ====================== 
//   useEffect(() => { 
//     fetchexamList(); 
//   }, []); 
  
//   const fetchexamList = async () => { 
//     try { 
//       setSearched(true); 
//       const res = await getExamList(instId, sessId); 
//       if (res?.Table) { 
//         setExamList(res.Table); 
//       } 
//     } catch (error) { 
//       console.error("Stop API Error:", error); 
//     } finally { 
//       setSearched(false); 
//     } 
//   }; 
  
//   // =================== EXAM TYPE LIST ====================== 
//   useEffect(() => { 
//     fetchExamTypeList(); 
//   }, []); 
  
//   const fetchExamTypeList = async () => { 
//     try { 
//       setSearched(true); 
//       const res = await getExamTypeList(instId, sessId); 
//       if (res?.Table) { 
//         setExamTypeList(res.Table); 
//       } 
//     } catch (error) { 
//       console.error("Stop API Error:", error); 
//     } finally { 
//       setSearched(false); 
//     } 
//   }; 
  
//   // =================== SUBJECT LIST ====================== 
//   useEffect(() => { 
//     fetchSubjectList(); 
//   }, []); 
  
//   const fetchSubjectList = async () => { 
//     try { 
//       setSearched(true); 
//       const res = await getSubjectList(instId, sessId); 
//       if (res?.Table) { 
//         setSubjectList(res.Table); 
//       } 
//     } catch (error) { 
//       console.error("Stop API Error:", error); 
//     } finally { 
//       setSearched(false); 
//     } 
//   }; 
  
//   // =================== STUDENT MARK LIST ON (NEXT BUTTON) ====================== 
//   const handleNext = async () => { 
//     try { 
//       setSearched(true); 
//       const res = await getStudentMarksList( sessId, selectedClassId, selectedExamId, selectedExamTypeId, selectedSubjectId, ); 
//       const getClassName = (id) => classList.find(c => c.Id == id)?.ClassName || ""; 
//       const getExamName = (id) => examList.find(e => e.Id == id)?.Name || ""; 
//       const getSubjectName = (id) => subjectList.find(s => s.Id == id)?.Name || ""; 
//       navigate("/Marks-Entry2", { 
//         state: { 
//           students: res?.Table || [], classId: selectedClassId, 
//           examId: selectedExamId, subjectId: selectedSubjectId, 
//           className: getClassName(selectedClassId), 
//           examName: getExamName(selectedExamId), 
//           subjectName: getSubjectName(selectedSubjectId), 
//           minMarks, maxMarks, marksType,
//         }, 
//       }); 
//     } catch (err) { 
//       console.error("Marks list error:", err); 
//     } finally{
//       setSearched(false);
//     }
//   }; 
  
//   /* ================= DATE FORMATTER ================= */ 
//   // // INPUT → API 
//   // const formatDateForApi = (dateStr) => { 
//   //   if (!dateStr) return null; 
//   //   const d = new Date(dateStr); 
//   //   if (isNaN(d)) return null; 
//   //   const day = d.getDate().toString().padStart(2, "0"); 
//   //   const month = d.toLocaleString("en-GB", { month: "short" }); 
//   //   const year = d.getFullYear(); 
//   //   return `${day}/${month}/${year}`; // 07/Jan/2026 
//   // }; 
  
//   // // API → INPUT 
//   // const apiDateToInput = (apiDate) => { 
//   //   if (!apiDate) return ""; 
//   //   const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//   //   const d = new Date(timestamp); 
//   //   const year = d.getFullYear(); 
//   //   const month = String(d.getMonth() + 1).padStart(2, "0"); 
//   //   const day = String(d.getDate()).padStart(2, "0"); 
//   //   return `${year}-${month}-${day}`; 
//   // };



//   return ( 
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
//       <Loader show={searched} /> 
//       <div className="flex justify-between items-center gap-x-4 mb-5"> 
//         <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} /> 
//       </div> 
      
//       <div className="grid grid-cols-1 [@media(min-width:456px)]:grid-cols-2 [@media(min-width:800px)]:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full"> 
//         <Options 
//           label="Class" optionMsg="Select Class" options={classList} 
//           valueKey="Id" labelKey="ClassName" value={selectedClassId} 
//           onChange={(e) => setSelectedClassId(e.target.value)} 
//         /> 
        
//         <Options 
//           label="Exam" optionMsg="Select Exam" options={examList} 
//           valueKey="Id" labelKey="Name" value={selectedExamId} 
//           onChange={(e) => setSelectedExamId(e.target.value)} 
//         /> 
        
//         <Options 
//           label="Sub-Exam" optionMsg="Select Sub-Exam" options={examtypeList} 
//           valueKey="Id" labelKey="Name" value={selectedExamTypeId} 
//           onChange={(e) => setSelectedExamTypeId(e.target.value)} 
//         /> 
        
//         {/* <FormInput 
//           label="Date" type="date" value={selectedDate} 
//           onChange={(e) => setSelectedDate(e.target.value)} 
//         /> */} 
        
//         <Options 
//           label="Subject" optionMsg="Select Subject" options={subjectList} 
//           valueKey="Id" labelKey="Name" 
//           onChange={(e) => setSelectedSubjectId(e.target.value)} 
//         /> 
        
//         {/* ✅ Radio buttons */} 
//         <div className="col-span-1 [@media(min-width:456px)]:col-span-2 [@media(min-width:800px)]:col-span-3 " > 
//           {/* <div className="grid grid-cols-3 gap-4"> 
//             <RadioButton label="Number" name="example" value="1" /> 
//             <RadioButton label="Graded" name="example" value="2" /> 
//             <RadioButton label="Number Graded" name="example" value="3" /> 
//           </div>  */}

//           <div className="grid grid-cols-3 gap-4">
//   <RadioButton
//     label="Number"
//     name="marksType"
//     value="1"
//     checked={marksType === "1"}
//     onChange={(e) => setMarksType(e.target.value)}
//   />

//   <RadioButton
//     label="Graded"
//     name="marksType"
//     value="2"
//     checked={marksType === "2"}
//     onChange={(e) => setMarksType(e.target.value)}
//   />

//   <RadioButton
//     label="Number Graded"
//     name="marksType"
//     value="3"
//     checked={marksType === "3"}
//     onChange={(e) => setMarksType(e.target.value)}
//   />
// </div>
//           {(marksType === "1" || marksType === "3") && (
//           <div className="grid grid-cols-2 gap-4 mt-3"> 
//             <FormInput 
//               placeholder="Enter Minimum Marks" value={minMarks} 
//               onChange={(e) => setMinMarks(e.target.value)} 
//             /> 
            
//             <FormInput 
//               placeholder="Enter Maximum Marks" value={maxMarks} 
//               onChange={(e) => setMaxMarks(e.target.value)} 
//             /> 
//           </div> )}
//         </div> 
//       </div> 
      
//       {/* <div className="grid grid-cols-1 [@media(min-width:456px)]:grid-cols-2 [@media(min-width:750px)]:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full"> 
//         <CheckBox 
//           label={"Include in Grand Total"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
//           name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
//         /> 
        
//         <CheckBox 
//           label={"Saved"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
//           name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
//         /> 
        
//         <CheckBox 
//           label={"Import"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
//           name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
//         /> 
//       </div>  */}
      
//       <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 "> 
//         <Buttons 
//           label={"Close"} 
//         /> 
//         <Buttons 
//           click={handleNext} label={"Next"} 
//         /> 
//       </div> 
//     </div> 
//   ); 
// } 

// export default Marks_Entry;



import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import RadioButton from "../../Components/Page_Forms/RadioButton";
import { getExamList, getExamTypeList, getGradeList, getStudentMarksList, getSubjectList, insertMarks } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";
import Table from "../../Components/Page_Forms/Table";

function Marks_Entry() {
  const [searched, setSearched] = useState(false); 
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [examList, setExamList] = useState([]); 
  const [selectedExamId, setSelectedExamId] = useState(""); 
  const [examtypeList, setExamTypeList] = useState([]); 
  const [selectedExamTypeId, setSelectedExamTypeId] = useState(""); 
  const [subjectList, setSubjectList] = useState([]);  
  const [selectedSubjectId, setSelectedSubjectId] = useState(""); 
  const [minMarks, setMinMarks] = useState(""); 
  const [maxMarks, setMaxMarks] = useState(""); 
  const [marksType, setMarksType] = useState("1"); 
  
  const  [agree, setAgree] = useState(false); 
  const [gradeList, setGradeList] = useState([]); 
  const [selectedGradeId, setSelectedGradeId] = useState(""); 
  const [selected, setSelected] = useState("attend1"); 
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); 
  const [tableData, setTableData] = useState([]); 
  const [showEntrySection, setShowEntrySection] = useState(false); 
  
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
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== EXAM TYPE LIST ====================== 
  useEffect(() => { 
    fetchExamTypeList(); 
  }, []); 
  
  const fetchExamTypeList = async () => { 
    try { 
      setSearched(true); 
      const res = await getExamTypeList(instId, sessId); 
      if (res?.Table) { 
        setExamTypeList(res.Table); 
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== SUBJECT LIST ====================== 
  useEffect(() => { 
    fetchSubjectList(); 
  }, []); 
  
  const fetchSubjectList = async () => { 
    try { 
      setSearched(true); 
      const res = await getSubjectList(instId, sessId); 
      if (res?.Table) { 
        setSubjectList(res.Table); 
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== VALIDATION ====================== 
  const isFormComplete = () => { 
    if ( 
      !selectedClassId || !selectedExamId || 
      !selectedExamTypeId || !selectedSubjectId || !marksType 
    ) { 
      return false; 
    } 
    
    // If marks type needs min/max 
    if ((marksType === "1" || marksType === "3")) { 
      if (!minMarks || !maxMarks) { 
        return false; 
      } 
    } 
    
    return true; 
  };

  // =================== STUDENT MARK LIST ON (NEXT BUTTON) ====================== 
  // const handleNext = async () => { 
  //   try { 
  //     setSearched(true); 
  //     const res = await getStudentMarksList( sessId, selectedClassId, selectedExamId, selectedExamTypeId, selectedSubjectId, ); 
  //     const students= res?.Table || []; 
  //     const mapped = students.map((s, index) => { 
  //       const apiAtt = s.AttType; 
  //       const attType = apiAtt === "P" ? "attend1" : apiAtt === "L" ? "attend2" : apiAtt === "A" ? "attend3" : "attend1"; 
  //       return { 
  //         id: s.Id || index, name: s.Name, serial: s.EnvNo, roll: s.RollNo, 
  //         mark: s.MarksObt || "", grade: s.F_GradeMaster === -1 ? "" : s.F_GradeMaster, 
  //         // internal value (radio buttons use this) 
  //         type: attType, 
  //         // value shown in table 
  //         attTypeText: attType === "attend1" ? "P" : attType === "attend2" ? "L" : attType === "attend3" ? "A" : "", 
  //       }; 
  //     }); 
      
  //     setTableData(mapped); 
      
  //     if (mapped.length > 0) { 
  //       setSelectedStudent(mapped[0]); 
  //       setSelectedRowIndex(0); 
  //       setSelected(mapped[0].type || "attend1"); 
  //       setSelectedGradeId(mapped[0].grade || ""); 
  //     } 
  //   } catch (err) { 
  //     console.error("Marks list error:", err); 
  //   } finally{ 
  //     setSearched(false); 
  //   } 
  // }; 

  const handleNext = async () => { 
    if (!isFormComplete()) { 
      alert("Please select all fields before proceeding"); 
      setShowEntrySection(false); 
      return; 
    } 
    
    setShowEntrySection(true); 
    
    try { 
      setSearched(true); 
      const res = await getStudentMarksList( sessId, selectedClassId, selectedExamId, selectedExamTypeId, selectedSubjectId ); 
      const students = res?.Table || []; 
      const mapped = students.map((s, index) => { 
        const apiAtt = s.AttType; 
        const attType = apiAtt === "P" ? "attend1" : apiAtt === "L" ? "attend2" : apiAtt === "A" ? "attend3" : "attend1"; 
        return { 
          id: s.Id || index, name: s.Name, serial: s.EnvNo, roll: s.RollNo, mark: s.MarksObt || "", 
          grade: s.F_GradeMaster === -1 ? "" : s.F_GradeMaster, type: attType, 
          attTypeText: attType === "attend1" ? "P" : attType === "attend2" ? "L" : attType === "attend3" ? "AB" : "", 
        }; 
      }); 
      
      setTableData(mapped); 
      if (mapped.length > 0) { 
        setSelectedStudent(mapped[0]); 
        setSelectedRowIndex(0); 
        setSelected(mapped[0].type); 
        setSelectedGradeId(mapped[0].grade || ""); 
      } 
    } catch (err) { 
      console.error("Marks list error:", err); 
    } finally { 
      setSearched(false); 
    } 
  }; 

  // =================== DATA CLEAR ====================== 
  const resetEntrySection = () => { 
    setShowEntrySection(false); 
    setTableData([]); 
    setSelectedStudent(null); 
    setSelectedRowIndex(null); 
    setSelected("attend1"); 
    setSelectedGradeId(""); 
    setAgree(false); 
  };
  // =================== TABLE (COLUMNS) ====================== 
  const columns = [ 
    { header: "Student Name", accessor: "name" }, 
    { header: "Env. No.", accessor: "serial" }, 
    { header: "Roll No.", accessor: "roll" }, 
    ...(marksType !== "2" ? [{ header: "Marks Obt.", accessor: "mark" }] : []), 
    ...(marksType !== "1" ? [{ header: "Grade", accessor: "grade" }] : []), 
    { header: "Att. Type", accessor: "attTypeText" }, 
  ]; 
  
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

  // =================== ON ROW CLICK IN TABLE ====================== 
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
  
  // =================== ATTENDANCE TYPE (NAME) ====================== 
  const getAttText = (type) => { 
    if (type === "attend1") return "P"; 
    if (type === "attend2") return "L"; 
    if (type === "attend3") return "AB"; 
    return ""; 
  };
  
  // =================== GRADE BY ATENDANCE TYPE (NAME) ====================== 
  const getGradeByAttendance = (type) => { 
    if (type === "attend2") return "L";   // Leave 
    if (type === "attend3") return "AB";  // Absent 
    return ""; 
  }; 
  
  // =================== ATTENDANCE CHANGE ====================== 
  const handleAttendanceChange = (value) => { 
    setSelected(value); 
    setSelectedStudent((prev) => { 
      if (!prev) return prev; 
      
      // Leave or Absent 
      if (value === "attend2" || value === "attend3") { 
        return { 
          ...prev, type: value, attTypeText: getAttText(value), 
          mark: 0, grade: getGradeByAttendance(value), 
        }; 
      } 
      
      // Present 
      return { 
        ...prev, type: value, attTypeText: getAttText(value), 
        grade: prev.grade || "", 
      }; 
    }); 
    
    // reset grade dropdown UI when not Present 
    if (value !== "attend1") { 
      setSelectedGradeId(""); 
    } 
  }; 
  
  // =================== CURRENT ROW DATA UPDATE ====================== 
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
  
  // =================== ATTENDANCE TYPE (VALUE) ====================== 
  const getAttendanceForApi = (type) => { 
    if (type === "attend1") return "0"; // Present 
    if (type === "attend2") return "1"; // Leave 
    if (type === "attend3") return "2"; // Absent 
    return "0"; 
  }; 
  
  // =================== PAYLOAD ====================== 
  const buildMarksPayload = () => { 
    const isMarks = marksType === "1"; 
    const isGrade = marksType === "2"; 
    const isBoth  = marksType === "3"; 
    
  
    // ================= MARKS MODEL ================= 
    const marksModel = { 
      "1": { 
        F_SessionMaster: Number(sessId), 
        F_ClassSection: selectedClassId?.toString(), 
        F_ExamMaster: selectedExamId?.toString(), 
        F_SubExamMaster: selectedExamTypeId?.toString() || "1", 
        F_SubjectGroupMaster: 0, 
        F_SubjectMaster: selectedSubjectId?.toString(), 
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
  
  
  // =================== SAVE MARKS ====================== 
  const handleSaveMarks = async () => { 
    try { 
      setSearched(true); 
      // Save currently edited row before submit 
      saveCurrentRow(); 
      
      const { marksModel, marksTrans } = buildMarksPayload(); 
      const res = await insertMarks({ marksModel, marksTrans, schId: "VSS", }); 
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
      <Loader show={searched} /> 
      <div className="flex justify-between items-center gap-x-4 mb-5"> 
        <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} /> 
      </div> 
      
      <div className="grid grid-cols-1 [@media(min-width:456px)]:grid-cols-2 [@media(min-width:800px)]:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full"> 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" value={selectedClassId} 
          onChange={(e) => { 
            setSelectedClassId(e.target.value); 
            resetEntrySection(); 
          }} 
        /> 
        
        <Options 
          label="Exam" optionMsg="Select Exam" options={examList} 
          valueKey="Id" labelKey="Name" value={selectedExamId} 
          onChange={(e) => { 
            setSelectedExamId(e.target.value); 
            resetEntrySection(); 
          }} 
        /> 
        
        <Options 
          label="Sub-Exam" optionMsg="Select Sub-Exam" options={examtypeList} 
          valueKey="Id" labelKey="Name" value={selectedExamTypeId} 
          onChange={(e) => { 
            setSelectedExamTypeId(e.target.value); 
            resetEntrySection();
          }} 
        /> 
        
        <Options 
          label="Subject" optionMsg="Select Subject" options={subjectList} 
          valueKey="Id" labelKey="Name" value={selectedSubjectId} 
          onChange={(e) => { 
            setSelectedSubjectId(e.target.value); 
            resetEntrySection(); 
          }} 
        /> 
        
        {/* ✅ Radio buttons */} 
        <div className="col-span-1 [@media(min-width:456px)]:col-span-2 [@media(min-width:800px)]:col-span-3 " > 
          <div className="grid grid-cols-3 gap-4"> 
            <RadioButton 
              label="Number" name="marksType" value="1" checked={marksType === "1"} 
              onChange={(e) => { 
                setMarksType(e.target.value); 
                resetEntrySection(); 
              }} 
            /> 
            
            <RadioButton 
              label="Graded" name="marksType" value="2" checked={marksType === "2"} 
              onChange={(e) => { 
                setMarksType(e.target.value); 
                resetEntrySection(); 
              }} 
            /> 
            
            <RadioButton 
              label="Number Graded" name="marksType" value="3" 
              checked={marksType === "3"} 
              onChange={(e) => { 
                setMarksType(e.target.value); 
                resetEntrySection(); 
              }} 
            /> 
          </div> 
          
          {(marksType === "1" || marksType === "3") && ( 
            <div className="grid grid-cols-2 gap-4 mt-3"> 
              <FormInput 
                placeholder="Enter Minimum Marks" value={minMarks} 
                onChange={(e) => { 
                  setMinMarks(e.target.value); 
                  resetEntrySection();
                }} 
              /> 
              
              <FormInput 
                placeholder="Enter Maximum Marks" value={maxMarks} 
                onChange={(e) => {
                  setMaxMarks(e.target.value); 
                  resetEntrySection(); 
                }} 
              /> 
            </div> 
          )} 
        </div> 
      </div> 
      
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mb-5 "> 
        <Buttons 
          label={"Close"} click={resetEntrySection} 
        /> 
        
        <Buttons 
          click={handleNext} label={"Next"} 
        /> 
      </div> 
      
      {showEntrySection && (
        <> 
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
                  label="Previous" click={() => { 
                    if (selectedRowIndex === null || selectedRowIndex === 0) return; 
                    saveCurrentRow(); 
                    const prevIndex = selectedRowIndex - 1; 
                    const prevRow = tableData[prevIndex]; 
                    setSelectedStudent({ ...prevRow }); 
                    setSelectedRowIndex(prevIndex); 
                    setSelected(prevRow.type || "attend1"); 
                    setSelectedGradeId(prevRow.grade || ""); 
                  } } 
                /> 
                
                <Buttons 
                  label="Next" click={() => { 
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
                  } } 
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
            <Buttons 
              label={"Cancel"} click={resetEntrySection} 
            /> 
            <Buttons 
              label={"Save"} click={handleSaveMarks} 
            /> 
          </div> 
        </>
      )}
    </div>  
  ); 
} 

export default Marks_Entry;
