import React, { useEffect, useState } from "react";
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
  const [showTable, setShowTable] = useState(false);

  const columns = [ { header: "Exam Name", accessor: "Name" }, ]; 
  
  // =================== EXAM TIME TABLE LIST ====================== 
  const fetchExamSchedule = async (classId) => {
  if (!classId) return;

  try {
    setSearched(true);
    setShowTable(false); // hide table before fetch

    const res = await getExamTimeTableList(
      instId,
      sessId,
      classId
    );

    setTableData(res?.Table || []);
    setShowTable(true);
  } catch (err) {
    console.error("Exam Schedule Error:", err);
    setTableData([]);
    setShowTable(false);
  } finally {
    setSearched(false);
  }
};

useEffect(() => {
  if (selectedClassId) {
    fetchExamSchedule(selectedClassId);
  }
}, [selectedClassId]);


  // =================== SEARCH ====================== 
  
//   const handleSearch = async () => {
//   if (!selectedClassId) {
//     alert("Please select class");
//     return;
//   }

//   try {
//     setSearched(true);
//     setShowTable(false); // hide before new search

//     const res = await getExamTimeTableList(
//       instId,
//       sessId,
//       selectedClassId
//     );

//     setTableData(res?.Table || []);
//     setShowTable(true); // show after search
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setSearched(false);
//   }
// };

const handleSearch = () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  fetchExamSchedule(selectedClassId);
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
      {showTable && (
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
      )}
    </div> 
  ); 
} 

export default Exam_Schedule;

