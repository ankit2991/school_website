import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import Table from '../../Components/Page_Forms/Table';
import { getStudentHostelList } from '../../services/api';
import useClassList from '../../hooks/useClassList';
import Loader from '../../Components/Page_Forms/Loader';

function Assign_Hostel() {
  const { classList } = useClassList(); // 👈 only use classList
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [srNoText, setSrNoText] = useState("");
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");
  const navigate = useNavigate()
  const columns = [ 
    { header: "Enrollment No.", shortHeader: "En. No.", accessor: "EnrollmentNo" }, 
    { header: "Name", shortHeader: "Name", accessor: "Name" }, 
    { header: "Status", shortHeader: "Status", accessor: "SStatus" }, 
  ]

  // =================== Student Hostel LIST ====================== 
  const handleSearch = async () => { 
    if (!selectedClassId) { 
      alert("Please select class"); 
      return; 
    } 
    
    try { 
      setSearched(true); 
      
      const res = await getStudentHostelList(instId, sessId, selectedClassId); 
      
      if (res?.Table) { 
        setStudentList(res.Table); 
        setFilteredList(res.Table); 
      } 
    } catch (error) { 
      console.error("API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== FILTER ======================  
  useEffect(() => { 
    let filtered = studentList; 
    
    if (searchText.trim()) { 
      filtered = filtered.filter(item => 
        item.Name?.toLowerCase().includes(searchText.toLowerCase()) 
      ); 
    } 
    
    if (srNoText.trim()) { 
      filtered = filtered.filter(item => 
        item.EnrollmentNo?.toLowerCase().includes(srNoText.toLowerCase()) 
      ); 
    } 
    
    setFilteredList(filtered); 
  }, [searchText, srNoText, studentList]); 
  
  return ( 
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
      <Loader show={searched}/> 
      <div className="flex justify-between mb-5"> 
        <Heading label={"Assign Hostel"} /> 
        <Buttons click={() => navigate("/Assign-Hostel")} label={"Add"} /> 
      </div> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full"> 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
          labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        <FormInput 
          label={"Student Name"} placeholder={"Enter Student Name"} 
          value={searchText} onChange={(e) => setSearchText(e.target.value)} 
        /> 
        <FormInput 
          label={"Sr. No."} placeholder={"Enter Serial No."} 
          value={srNoText} onChange={(e) => setSrNoText(e.target.value)} 
        /> 
      </div> 
      <div className="flex justify-end"> 
        <Buttons 
          click={handleSearch} label={"Search"} 
        /> 
      </div> 
      <div className="mt-5"> 
        <Table 
          columns={columns} data={filteredList} actions={(row) => { 
          const isAssigned = row.SStatus === "Yes"; 
          return(
            <> 
            <Buttons 
              label={"Add"} 
              click={() => { if (!isAssigned) 
                {navigate("/Assign-Hostel", { state: row.Id, });} 
              }} 
              disabled={isAssigned} 
              style={`hidden sm:inline ${isAssigned ? "opacity-50 cursor-not-allowed" : ""}`} 
            /> 
            <Buttons 
              label={"Edit"} click={() => { if (isAssigned) 
                {navigate("/Assign-Hostel", { state: row.Id }); } 
              }} 
              disabled={!isAssigned} 
              style={`hidden sm:inline ${!isAssigned ? "opacity-50 cursor-not-allowed" : ""}`} 
            />
            
           
            {/* Mobile icons */} 
            <button 
              className={`sm:hidden text-xl pt-2.5 ${isAssigned ? "opacity-50 cursor-not-allowed" : ""}`} 
              disabled={isAssigned} 
              onClick={() => !isAssigned && navigate("/Assign-Hostel", {state: row.Id,}) } 
            > 
              ➕ 
            </button> 
            
            <button 
              className={`sm:hidden text-lg pt-2.5 ${!isAssigned ? "opacity-50 cursor-not-allowed" : ""}`} 
              disabled={!isAssigned} 
              onClick={() => isAssigned && navigate("/Assign-Hostel", {state: row.Id ,}) } 
            > 
              ✏️ 
            </button> 
             
          </> 
          );
          // <>
          //               <Buttons label={"Add"} click={() => navigate("/Assign-Hostel", {state: row.Id ,})} style="hidden sm:inline" />
          //               <Buttons label={"Edit"} click={() => navigate("/Assign-Hostel", {state: row.Id ,}) } style="hidden sm:inline" />
                        {/* Mobile icons */}
                    //     <button className="sm:hidden text-xl pt-2.5"  onClick={() => navigate("/Assign-Hostel", {state: row.Id ,})} >➕</button>
                    //     <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Assign-Hostel", {state: row.Id ,})} >✏️</button>
                    // </>
          
          }}/> 
      </div> 
    </div> 
  ) 
} 

export default Assign_Hostel