import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { getMonthList, getStudentAttReport, getYearList } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Student_Attend_Report() { 
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const [columns, setColumns] = useState([]); 
  const [data, setData] = useState([]); 
  const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [monthList, setMonthList] = useState([]); 
  const [selectedMonthId, setSelectedMonthId] = useState(""); 
  const [yearList, setYearList] = useState([]); 
  const [selectedYearId, setSelectedYearId] = useState(""); 
  const [searched, setSearched] = useState(false); 
  const [searchType, setSearchType] = useState(""); 
  const [selectedYearName, setSelectedYearName] = useState(""); 
  const [selectedDate, setSelectedDate] = useState(""); 

  const SummaryList=[ 
    {Id: 1, Name:"Summary"}, {Id:2 ,Name:"Details"}, 
    {Id:3,Name:"Class wise Summary"},
  ] 
     
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
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  };
  
  // =================== YEAR LIST ====================== 
  useEffect(() => { 
    fetchYearList(); 
  }, []); 
  
  const fetchYearList = async () => { 
    try { 
      setSearched(true); 
      const res = await getYearList(); 
      if (res?.Table) { 
        setYearList(res.Table); 
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== SUMMARY TABLE ====================== 
  const summaryColumns = [ 
    { header: "Sr No", accessor: "SrNo" }, 
    { header: "Student Name", accessor: "Student" }, 
    { header: "Father Name", accessor: "FatherName" }, 
    { header: "Total Attendance", accessor: "TotalAtt" }, 
    { header: "Leave", accessor: "Leave" }, 
    { header: "Leave1", accessor: "Leave1" }, 
  ]; 

  // =================== DETAIL TABLE ====================== 
  const generateDetailsColumnsFromApi = (year, month) => { 
    const daysInMonth = new Date(year, month, 0).getDate(); 
    const baseCols = [ 
      { header: "S.No", accessor: "SNo" }, 
      { header: "Student", accessor: "Student" }, 
      { header: "Gender", accessor: "Gender" }, 
      { header: "Caste", accessor: "Caste" }, 
    ]; 
    
    const dateCols = Array.from({ length: daysInMonth }, (_, i) => ({ 
      header: `${i + 1}`, accessor: `${i + 1}`, 
    })); 
    
    const endCols = [ 
      { header: "Total P", accessor: "TotalP" }, 
      { header: "Total AB", accessor: "TotalAb" }, 
      { header: "Till Date P", accessor: "TillDateP" }, 
      { header: "Till Date AB", accessor: "TillDateAb" }, 
    ]; 
    
    return [...baseCols, ...dateCols, ...endCols]; 
  }; 
  
  // =================== CLASS WISE SUMMARY TABLE ====================== 
  const classWiseColumns = [ 
    { header: "Class", accessor: "Class" }, 
    { header: "Students", accessor: "Student" }, 
    { header: "Present", accessor: "Present" }, 
    { header: "Leave", accessor: "Leave" }, 
  ]; 
  
  /* ================= DATE FORMATTER ================= */ 
  // INPUT → API 
  const formatDateForApi = (dateStr) => { 
    if (!dateStr) return null; 
    const d = new Date(dateStr); 
    if (isNaN(d)) return null; 
    const day = d.getDate().toString().padStart(2, "0"); 
    const month = d.toLocaleString("en-GB", { month: "short" }); 
    const year = d.getFullYear(); 
    return `${day}/${month}/${year}`; 
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
  
  /* ================= STUDENT ATTENDANCE REPORT ================= */
  const handleSearch = async () => { 
    try { 
      setSearched(true); 
      
      // ================= SUMMARY ================= 
      if (searchType === "1") { 
        if (!selectedClassId || !selectedMonthId || !selectedYearName) { 
          alert("Please select all fields"); 
          return; 
        } 
        const res = await getStudentAttReport( instId, sessId, selectedClassId, selectedMonthId, selectedYearName, 1 ); 
        
        if (res?.Table) { 
          setColumns(summaryColumns); 
          setData(res.Table); 
        } 
      } 
      
      // ================= DETAILS ================= 
      if (searchType === "2") { 
        if (!selectedClassId || !selectedMonthId || !selectedYearName) { 
          alert("Please select all fields"); 
          return; 
        } 
        
        const res = await getStudentAttReport( instId, sessId, selectedClassId, selectedMonthId, selectedYearName, 2 ); 
        
        if (res?.Table) { 
          const cols = generateDetailsColumnsFromApi( selectedYearId, selectedMonthId ); 
          setColumns(cols); 
          setData(res.Table); 
        } 
      } 
      
      // ================= CLASS WISE SUMMARY ================= 
      if (searchType === "3") { 
        if (!selectedDate) { 
          alert("Please select date"); 
          return; 
        } 
        
        const formattedDate = formatDateForApi(selectedDate); 
        const res = await getStudentAttReport( instId, sessId, 0, 0, 0, 3, formattedDate ); 
        
        if (res?.Table) { 
          setColumns(classWiseColumns); 
          setData(res.Table); 
        } 
      } 
    } catch (error) { 
      console.error("Attendance Report Error", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  return ( 
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
      <Loader show={searched}/> 
      <div className="flex justify-between mb-5"> 
        <Heading label={"Student Attendance Report"} /> 
      </div> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full"> 
        {/* SEARCH TYPE */} 
        <Options 
          label="Search" optionMsg="Select Option" options={SummaryList} 
          valueKey="Id" labelKey="Name" 
          onChange={(e) => { 
            setSearchType(e.target.value); 
            setColumns([]); 
            setData([]); 
          }} 
        /> 
        {/* SHOW ONLY FOR SUMMARY & DETAILS */} 
        {(searchType === "1" || searchType === "2") && ( 
          <> 
            <Options 
              label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
              labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
            /> 
            
            <Options 
              label="Month" optionMsg="Select Month" options={monthList} valueKey="ID" 
              labelKey="MonthName" onChange={(e) => setSelectedMonthId(e.target.value)} 
            /> 
            
            <Options 
              label="Year" optionMsg="Select Year" options={yearList} valueKey="ID" 
              labelKey="MonthName" 
              onChange={(e) => { 
                const yearId = e.target.value; 
                setSelectedYearId(yearId); 
                const yearObj = yearList.find(y => y.ID == yearId); 
                setSelectedYearName(yearObj?.MonthName || ""); 
              }} 
            /> 
          </> 
        )} 
        
        {/* SHOW ONLY FOR CLASS WISE SUMMARY */} 
        {searchType === "3" && ( 
          <FormInput 
            label="Date" type="date" name="date" value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          /> 
        )} 
      </div> 
      
      <div className="flex justify-end mb-5"> 
        <Buttons click={handleSearch} label={"Search"} /> 
      </div> 
      
      {columns.length > 0 && ( 
        <Table 
          columns={columns} data={data} disableFloatingRow={false} 
          onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
        /> 
      )} 
      
      {columns.length > 0 && ( 
        <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5"> 
          <Buttons 
            label={"Clear"} click={() => {setColumns([]); setData([]); }} 
          /> 
        </div> 
      )} 
      
      {/* ✅ Dynamic div for spacing */} 
      {rowDetailOpen && window.innerWidth < 768 && ( 
        <div className="h-140"></div> 
      )} 
    </div> 
  ); 
} 

export default Student_Attend_Report;
