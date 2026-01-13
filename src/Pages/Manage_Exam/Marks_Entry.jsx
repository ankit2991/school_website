import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import RadioButton from "../../Components/Page_Forms/RadioButton";
import { getExamList, getExamTypeList, getStudentMarksList, getSubjectList } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Marks_Entry() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [selected, setSelected] = useState("1");
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
  const [selectedDate, setSelectedDate] = useState("");
  const [minMarks, setMinMarks] = useState(""); 
  const [maxMarks, setMaxMarks] = useState("");
  const [marksType, setMarksType] = useState("1");

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
  
  // =================== STUDENT MARK LIST ON (NEXT BUTTON) ====================== 
  const handleNext = async () => { 
    try { 
      setSearched(true); 
      const res = await getStudentMarksList( sessId, selectedClassId, selectedExamId, selectedExamTypeId, selectedSubjectId, ); 
      const getClassName = (id) => classList.find(c => c.Id == id)?.ClassName || ""; 
      const getExamName = (id) => examList.find(e => e.Id == id)?.Name || ""; 
      const getSubjectName = (id) => subjectList.find(s => s.Id == id)?.Name || ""; 
      navigate("/Marks-Entry2", { 
        state: { 
          students: res?.Table || [], classId: selectedClassId, 
          examId: selectedExamId, subjectId: selectedSubjectId, 
          className: getClassName(selectedClassId), 
          examName: getExamName(selectedExamId), 
          subjectName: getSubjectName(selectedSubjectId), 
          minMarks, maxMarks, marksType,
        }, 
      }); 
    } catch (err) { 
      console.error("Marks list error:", err); 
    } finally{
      setSearched(false);
    }
  }; 
  
  /* ================= DATE FORMATTER ================= */ 
  // // INPUT → API 
  // const formatDateForApi = (dateStr) => { 
  //   if (!dateStr) return null; 
  //   const d = new Date(dateStr); 
  //   if (isNaN(d)) return null; 
  //   const day = d.getDate().toString().padStart(2, "0"); 
  //   const month = d.toLocaleString("en-GB", { month: "short" }); 
  //   const year = d.getFullYear(); 
  //   return `${day}/${month}/${year}`; // 07/Jan/2026 
  // }; 
  
  // // API → INPUT 
  // const apiDateToInput = (apiDate) => { 
  //   if (!apiDate) return ""; 
  //   const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
  //   const d = new Date(timestamp); 
  //   const year = d.getFullYear(); 
  //   const month = String(d.getMonth() + 1).padStart(2, "0"); 
  //   const day = String(d.getDate()).padStart(2, "0"); 
  //   return `${year}-${month}-${day}`; 
  // };



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
          onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        
        <Options 
          label="Exam" optionMsg="Select Exam" options={examList} 
          valueKey="Id" labelKey="Name" value={selectedExamId} 
          onChange={(e) => setSelectedExamId(e.target.value)} 
        /> 
        
        <Options 
          label="Sub-Exam" optionMsg="Select Sub-Exam" options={examtypeList} 
          valueKey="Id" labelKey="Name" value={selectedExamTypeId} 
          onChange={(e) => setSelectedExamTypeId(e.target.value)} 
        /> 
        
        {/* <FormInput 
          label="Date" type="date" value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        /> */} 
        
        <Options 
          label="Subject" optionMsg="Select Subject" options={subjectList} 
          valueKey="Id" labelKey="Name" 
          onChange={(e) => setSelectedSubjectId(e.target.value)} 
        /> 
        
        {/* ✅ Radio buttons */} 
        <div className="col-span-1 [@media(min-width:456px)]:col-span-2 [@media(min-width:800px)]:col-span-3 " > 
          {/* <div className="grid grid-cols-3 gap-4"> 
            <RadioButton label="Number" name="example" value="1" /> 
            <RadioButton label="Graded" name="example" value="2" /> 
            <RadioButton label="Number Graded" name="example" value="3" /> 
          </div>  */}

          <div className="grid grid-cols-3 gap-4">
  <RadioButton
    label="Number"
    name="marksType"
    value="1"
    checked={marksType === "1"}
    onChange={(e) => setMarksType(e.target.value)}
  />

  <RadioButton
    label="Graded"
    name="marksType"
    value="2"
    checked={marksType === "2"}
    onChange={(e) => setMarksType(e.target.value)}
  />

  <RadioButton
    label="Number Graded"
    name="marksType"
    value="3"
    checked={marksType === "3"}
    onChange={(e) => setMarksType(e.target.value)}
  />
</div>
          {(marksType === "1" || marksType === "3") && (
          <div className="grid grid-cols-2 gap-4 mt-3"> 
            <FormInput 
              placeholder="Enter Minimum Marks" value={minMarks} 
              onChange={(e) => setMinMarks(e.target.value)} 
            /> 
            
            <FormInput 
              placeholder="Enter Maximum Marks" value={maxMarks} 
              onChange={(e) => setMaxMarks(e.target.value)} 
            /> 
          </div> )}
        </div> 
      </div> 
      
      {/* <div className="grid grid-cols-1 [@media(min-width:456px)]:grid-cols-2 [@media(min-width:750px)]:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full"> 
        <CheckBox 
          label={"Include in Grand Total"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
          name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
        /> 
        
        <CheckBox 
          label={"Saved"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
          name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
        /> 
        
        <CheckBox 
          label={"Import"} labelClass="text-[20px] sm:mt-8" checkstyle={"sm:mt-8"} 
          name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} 
        /> 
      </div>  */}
      
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 "> 
        <Buttons 
          label={"Close"} 
        /> 
        <Buttons 
          click={handleNext} label={"Next"} 
        /> 
      </div> 
    </div> 
  ); 
} 

export default Marks_Entry;
