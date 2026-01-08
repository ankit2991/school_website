import React, { useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Options from "../../../Components/Page_Forms/Options";
import Table from "../../../Components/Page_Forms/Table";
import useClassList from "../../../hooks/useClassList";
import { getExamTimeTableList } from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

function Exam_Schedule() { 
  const navigate = useNavigate(); 
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [tableData, setTableData] = useState([]); 
  const [searched, setSearched] = useState(false); 
  const columns = [ { header: "Exam Name", accessor: "Name" }, ]; 
  
  // =================== SEARCH ====================== 
  const handleSearch = async () => { 
    if (!selectedClassId) { 
      alert("Please select class"); 
      return; 
    } 
    
    try { 
      setSearched(true); 
      
      const res = await getExamTimeTableList(instId, sessId, selectedClassId); 
      setTableData(res?.Table || []); 
    } catch (err) { 
      console.error(err); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  return ( 
    <div className="w-full h-full bg-white px-4 py-2"> 
      <Loader show={searched} /> 
      <div className="flex justify-between mb-5"> 
        <Heading label="Exam Schedule" /> 
        <Buttons 
          label="Add" click={() => navigate("/Exam-Schedule")} 
        /> 
      </div> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full"> 
        {/* CLASS DROPDOWN */} 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" value={selectedClassId} 
          onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
      </div> 
      
      <div className="flex justify-end mt-4"> 
        <Buttons 
          label="Search" click={handleSearch} 
        /> 
      </div> 
      
      <div className="mt-5"> 
        <Table 
          columns={columns} data={tableData} 
          actions={(row) => ( 
            <> 
              <Buttons 
                style="hidden sm:inline" label={"Edit"} 
                click={() => navigate("/Exam-Schedule", { 
                  state: { 
                    listId: row.Id, examId: row.F_ExamMaster, 
                    classId: selectedClassId, 
                  }, 
                }) } 
              /> 
              <Buttons 
                label={"Delete"} style="hidden sm:inline"
                click={() => console.log("Print:", row)} 
              />
              
              {/* Mobile icons */} 
              <button 
                onClick={() => navigate("/Exam-Schedule", { 
                  state: { 
                    listId: row.Id, examId: row.F_ExamMaster, 
                    classId: selectedClassId, 
                  }, 
                }) } 
                className="sm:hidden text-lg pt-2.5" 
              > 
                ✏️ 
              </button> 
              <button 
                className="sm:hidden text-xl pt-2.5" 
                onClick={() => console.log("Print:", row)} 
              > 
                🗑️ 
              </button> 
            </> 
          )} 
        /> 
      </div> 
    </div> 
  ); 
} 

export default Exam_Schedule;

