// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading'
// import Buttons from '../../../Components/Page_Forms/Buttons'
// import { useNavigate } from 'react-router-dom'
// import Options from '../../../Components/Page_Forms/Options'
// import FormInput from '../../../Components/Page_Forms/FormInput'


// function Exam_Type() {
//     const navigate = useNavigate()
//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//         <div className="flex justify-between mb-5">
//             <Heading label={"Exam Type"} />
//             <Buttons click={() => navigate("")} label={"Add"} />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//             <Options label={"Exam"} name={""} optionMsg="Select Exam" options={["Oral", "Written", "Practical"]}/>
//             {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
//         </div>
//         <div className="flex justify-end mb-5">
//                 <Buttons label={"Search"} style='px-6 py-2'/>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">
//             <FormInput label={"Name"} placeholder={"Enter  Name "} />
//             <FormInput label={"Alias"} placeholder={"Enter Alias "} />
            
//         </div>
//         <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
//             <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
//                 <Buttons label={"Cancel"} style='px-6 py-2'/>
//                 <Buttons label={"Save"} style='px-6 py-2'/>
//             </div>
//             <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
//                 <Buttons label={"Delete"} style='px-6 py-2'/>
//                 <Buttons label={"Print"} style='px-6 py-2'/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Exam_Type


import React, { useEffect, useState } from 'react'
import Loader from '../../../Components/Page_Forms/Loader';
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';
import { getExamTypeDelete, getExamTypeList, getSubjectDelete,  } from '../../../services/api';

function Exam_Type() {
    const navigate = useNavigate()
    const [searched, setSearched] = useState(false); 
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const [examtypeList, setExamTypeList] = useState([]); 
    const [searchText, setSearchText] = useState(""); 
    const [filteredList, setFilteredList] = useState([]);
    const columns = [
        { header: "Subject Name", shortHeader: "Subject", accessor: "Name" },       
    ]


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
                setFilteredList(res.Table); // 👈 default table data 
            } 
        } catch (error) { 
            console.error("Stop API Error:", error); 
        } finally { 
            setSearched(false); 
        } 
    }; 
    
    // =================== FILTER ====================== 
    const handleFilter = (text) => { 
        const value = text.toLowerCase(); 
        if (!value) { 
            setFilteredList(examtypeList); 
            return; 
        } 
        const filtered = examtypeList.filter(item => 
            item.Name?.toLowerCase().includes(value) 
        ); 
        
        setFilteredList(filtered); 
    }; 
    
    // =================== BUTTON FILTER ====================== 
    const handleSearch = () => { 
        setSearched(true); 
        setTimeout(() => { 
            handleFilter(searchText); 
            setSearched(false); 
        }, 300); 
    };
    
    // =================== DELETE ====================== 
    const handleDelete = async (examtypeid) => { 
        if (!examtypeid) return; 
        
        try { 
            setSearched(true); 
            const res = await getExamTypeDelete(examtypeid); 
            
            if (res?.Table?.length) { 
                const msg = res.Table[0].Column1; 
                
                if (msg.startsWith("M103")) { 
                    // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED) 
                    setExamTypeList(prev => 
                        prev.filter(item => item.Id !== examtypeid) 
                    ); 
                    
                    setFilteredList(prev => 
                        prev.filter(item => item.Id !== examtypeid) 
                    ); 
                    
                    alert("Record Delete Successfully"); 
                } 
                else if (msg.startsWith("M200")) { 
                    alert("Can not delete reference exist"); 
                } 
                else { 
                    alert("Something went wrong"); 
                } 
            } 
        } catch (error) { 
            console.error("Delete Stop Error:", error); 
        } finally { 
            setSearched(false); 
        } 
    }; 
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched}/>
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Exam Type"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/Exam-Type2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <FormInput 
                    label={"Exam Type"} placeholder={"Enter Exam Type"} value={searchText} 
                    onChange={(e) => { 
                        const val = e.target.value; 
                        setSearchText(val); 
                        handleFilter(val); 
                    }} 
                /> 
            </div>
            
            <div className="flex justify-end">
                <Buttons click={handleSearch} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={filteredList} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => navigate("/Exam-Type2", { state: row.Id }) } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Exam-Type2", { state: row.Id })} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )
}

export default Exam_Type