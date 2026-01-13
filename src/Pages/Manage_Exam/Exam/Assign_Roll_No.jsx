import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Table from "../../../Components/Page_Forms/Table";
import { getclass, getRollNoInsertUpdate, getStudentRollList } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from '../../../Components/Page_Forms/Loader';

function Assign_Roll_No() { 
  const navigate = useNavigate(); 
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const [selectAll, setSelectAll] = useState(false); 
  const [selectedStudents, setSelectedStudents] = useState([]); 
  const [searched, setSearched] = useState(false); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [tableData, setTableData] = useState([]); 
  const [startRollNo, setStartRollNo] = useState(""); 
  const [allocateSerial, setAllocateSerial] = useState(false); 
  const [showTable, setShowTable] = useState(false);

  const inputRefs = useRef({}); 
  const columns = [ 
    { 
      header: ( 
        <CheckBox 
          checked={selectAll} onChange={(e) => handleSelectAll(e.target.checked)} 
        /> 
      ), 
     
      accessor: "select", 
      cell: (row) => ( 
        <CheckBox 
          checked={selectedStudents.includes(row.EnrollmentNo)} 
          onChange={() => handleRowSelect(row.EnrollmentNo)} 
        /> 
      ), 
    }, 
    { header: "Enrollment Number", shortHeader: "Enrollment No.", accessor: "EnrollmentNo", }, 
    { header: "Name", shortHeader: "Name", accessor: "Name" }, 
    { header: "Father Name", shortHeader: "Father Name", accessor: "FatherName" }, 
    { header: "Mobile Number", shortHeader: "Mobile", accessor: "FMobileNo" }, 
    { 
      header: "Roll Number", shortHeader: "Roll No.", accessor: "RollNo", 
      cell: (row) => ( 
        <input 
          ref={(el) => (inputRefs.current[row.EnrollmentNo] = el)} 
          type="text" inputMode="numeric" pattern="[0-9]*" value={row.RollNo} 
          disabled={!selectedStudents.includes(row.EnrollmentNo)} 
          onChange={(e) => handleRollNoChange(row.EnrollmentNo, e.target.value)} 
          // onKeyDown={(e) => handleRollNoKeyDown(e, row.EnrollmentNo)} 
          onClick={(e) => e.stopPropagation()} 
          // className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 spinner" 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner" 
        /> 
      ), 
    }, 
  ]; 
  
  // =================== STUDENT ROLL LIST ====================== 
  const fetchStudentRollList = async (classId) => {
  if (!classId) return;

  try {
    setSearched(true);
    setShowTable(false); // hide table before fetch

    const res = await getStudentRollList(instId, sessId, classId);

    if (res?.Table && res.Table.length > 0) {
      const updated = res.Table.map((r) => ({
        ...r,
        RollNo: r.RollNo || "",
      }));

      setTableData(updated);
      setShowTable(true);
    } else {
      setTableData([]);
      setShowTable(false);
    }
  } catch (error) {
    console.error("Student Roll API Error:", error);
    setTableData([]);
    setShowTable(false);
  } finally {
    setSearched(false);
  }
};

useEffect(() => {
  if (selectedClassId) {
    fetchStudentRollList(selectedClassId);
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
//     setShowTable(false); // 🔹 hide before search

//     const res = await getStudentRollList(instId, sessId, selectedClassId);

//     if (res?.Table && res.Table.length > 0) {
//       const updated = res.Table.map((r) => ({
//         ...r,
//         RollNo: r.RollNo || "",
//       }));

//       setTableData(updated);
//       setShowTable(true); // ✅ SHOW table
//     } else {
//       setTableData([]);
//       setShowTable(false);
//     }
//   } catch (error) {
//     console.error("Student Roll API Error:", error);
//     setTableData([]);
//     setShowTable(false);
//   } finally {
//     setSearched(false);
//   }
// };

const handleSearch = () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  fetchStudentRollList(selectedClassId);
};


  
  // =================== CHECK BOX (ALL) ====================== 
  const handleSelectAll = (checked) => { 
    setSelectAll(checked); 
    
    if (checked) { 
      // select all students 
      const allIds = tableData.map((item) => item.EnrollmentNo); 
      setSelectedStudents(allIds); 
    } else { 
      // unselect all 
      setSelectedStudents([]); 
    } 
  }; 
  
  useEffect(() => { 
    if (tableData.length > 0 && selectedStudents.length === tableData.length) { 
      setSelectAll(true); 
    } else { 
      setSelectAll(false); 
    } 
  }, [selectedStudents, tableData]); 
  
  // =================== CHECK BOX (SELECTED) ====================== 
  const handleRowSelect = (enrollmentNo) => { 
    setSelectedStudents((prev) => { 
      if (prev.includes(enrollmentNo)) { 
        return prev.filter((id) => id !== enrollmentNo); 
      } else { 
        return [...prev, enrollmentNo]; 
      } 
    }); 
  }; 
  
  // =================== ROLL NO. CHANGE ====================== 
  const handleRollNoChange = (enrollmentNo, value) => { 
    if (!/^\d*$/.test(value)) return; // numeric only 

    setTableData((prev) => prev.map((row) => 
      row.EnrollmentNo === enrollmentNo ? { ...row, RollNo: value } : row 
    ) ); 
  }; 
  
  // =================== ROLL NO. JSON ====================== 
  const rollJson = React.useMemo(() => { 
    const details = tableData.filter((r) => 
      selectedStudents.includes(r.EnrollmentNo) && 
      r.RollNo !== "" && r.RollNo !== null 
    ).map((r) => ({ 
      RollNo: Number(r.RollNo), StId: Number(r.Id), 
      InstId: Number(instId), SessionId: String(sessId), 
      ClassId: String(selectedClassId), 
    })); 
    
    return details; 
  }, [tableData, selectedStudents, instId, sessId, selectedClassId]); 
  
  // =================== SAVE / UPDATE ====================== 
  const handleSave = async () => { 
    if (rollJson.length === 0) { 
      alert("Please enter roll number for at least one student"); 
      return; 
    } 
    
    try { 
      setSearched(true); 
      for (const item of rollJson) { 
        await getRollNoInsertUpdate( 
          item.RollNo, item.StId, item.InstId, 
          item.SessionId, item.ClassId 
        ); 
      } 
      
      alert("Roll numbers saved successfully"); 
      handleSearch(); // reload data 
    } catch (error) { 
      console.error("Roll No Save Error:", error); 
      alert("Error while saving roll numbers"); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== ROLL NO. SET BY INPUTFIELD AND CHECK BOX ====================== 
  const handleAllocateSerial = (checked) => { 
    setAllocateSerial(checked); 
    if (!checked) return; 
    
    if (!startRollNo) { 
      alert("Please enter start roll number"); 
      return; 
    } 
    
    let roll = Number(startRollNo); 
    const updatedData = tableData.map((row) => { 
      const updatedRow = { 
        ...row, RollNo: roll.toString(), 
      }; 
      roll += 1; 
      return updatedRow; 
    }); 

    setTableData(updatedData); 
    // auto-select all students 
    const allIds = updatedData.map((r) => r.EnrollmentNo); 
    setSelectedStudents(allIds); 
  };


  
  return ( 
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 

      <Loader show={searched}/> 

      <Heading label={"Exam Master"} style={"mb-5"} /> 

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full"> 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" 
          onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        <FormInput
  label={"Start Number"}
  placeholder={"Enter Start No."}
  value={startRollNo}
  onChange={(e) => {
    if (/^\d*$/.test(e.target.value)) {
      setStartRollNo(e.target.value);
    }
  }}
/>
      </div> 

      <div className="w-full gap-6 mb-5 grid grid-cols-1 "> 
       <CheckBox
  label={"Allocate Serial No. Wise"}
  checked={allocateSerial}
  onChange={(e) => handleAllocateSerial(e.target.checked)}
/>
      </div> 

      <div className="flex justify-end mb-5"> 
        <Buttons 
          click={handleSearch} label={"Search"} 
        /> 
      </div> 

      {/* <div className="flex items-center mb-5"> 
               <Table 
          columns={columns} data={tableData} style={"max-h-[35vh] sm:max-h-[57vh]"} 
        /> 
      </div> 

      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 "> 
        <Buttons label={"Cancel"} /> 
        <Buttons label={"Save"} click={handleSave} /> 
      </div>  */}

      {showTable && (
  <>
    <div className="flex items-center mb-5">
      <Table
        columns={columns}
        data={tableData}
        style={"max-h-[35vh] sm:max-h-[57vh]"}
      />
    </div>

    <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
      <Buttons label={"Cancel"} />
      <Buttons label={"Save"} click={handleSave} />
    </div>
  </>
)}


    </div> 
  ); 
} 

export default Assign_Roll_No;


