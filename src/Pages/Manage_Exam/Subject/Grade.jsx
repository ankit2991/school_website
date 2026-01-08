// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading'
// import Buttons from '../../../Components/Page_Forms/Buttons'
// import Options from '../../../Components/Page_Forms/Options'
// import { useNavigate } from 'react-router-dom'
// import FormInput from '../../../Components/Page_Forms/FormInput'


// function Grade() {
//     const navigate = useNavigate()
//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//         <div className="flex justify-between items-center gap-x-4 mb-5">
//             <Heading label={"Exam Type Master"} style={"text-[22px] sm:text-3xl"} />
//             <Buttons click={() => navigate("")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//             <Options label={"Grade"} name={""} optionMsg="Select Grade" options={["A+", "A", "B+"]}/>
//             {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
//         </div>
//         <div className="flex justify-end mb-5">
//                 <Buttons label={"Search"} style='px-6 py-2'/>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//             <FormInput label={"Name"} placeholder={"Enter  Name "} />
//             <FormInput label={"Alias"} placeholder={"Enter Alias "} />
//             <FormInput label={"Minimum"} placeholder={"Enter Minimum "} />
//             <FormInput label={"Maximum"} placeholder={"Enter Maximum "} />
//             <FormInput label={"Remark"} placeholder={"Enter Remark "} />
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

// export default Grade


import React, { useEffect, useState } from 'react'
import Loader from '../../../Components/Page_Forms/Loader';
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';
import { getGradeDelete, getGradeList, getGradeWiseList, getSubjectDelete, getSubjectList } from '../../../services/api';
import Options from '../../../Components/Page_Forms/Options';

function Grade() {
    const navigate = useNavigate()
    const [searched, setSearched] = useState(false); 
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const [gradeList, setGradeList] = useState([]); 
    const [selectedGradeId, setSelectedGradeId] = useState("");
    const [gradewiseList, setGradeWiseList] = useState([]); 
    const [searchText, setSearchText] = useState(""); 
    const [filteredList, setFilteredList] = useState([]);
    const columns = [
        { header: "Grade Name", shortHeader: "Subject", accessor: "Name" },       
    ]


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

    // =================== SEARCH ====================== 
//         const handleSearch = async () => {
//     if (!selectedGradeId) return;

//     try {
//         setSearched(true);

//         const res = await getGradeWiseList(selectedGradeId, instId, sessId);

//         if (res?.Table) {
//             setGradeWiseList(res.Table); // show in table
//             setFilteredList(res.Table);
//         } else {
//             setGradeWiseList([]);
//             setFilteredList([]);
//         }

//     } catch (error) {
//         console.error("Grade Wise Error:", error);
//     } finally {
//         setSearched(false);
//     }
// };

const handleSearch = async () => {
    if (!selectedGradeId) return;

    try {
        setSearched(true);

        // 🔹 Clear typed search text
        setSearchText("");

        const res = await getGradeWiseList(
            selectedGradeId,
            instId,
            sessId
        );

        if (res?.Table) {
            setGradeWiseList(res.Table);
            setFilteredList(res.Table); // show all rows
        } else {
            setGradeWiseList([]);
            setFilteredList([]);
        }

    } catch (error) {
        console.error("Grade Wise Error:", error);
    } finally {
        setSearched(false);
    }
};


        // =================== FILTER ====================== 
        const handleFilter = (text) => { 
            const value = text.toLowerCase(); 
            if (!value) { 
                setFilteredList(gradewiseList); 
                return; 
            } 
            const filtered = gradewiseList.filter(item => 
                item.Name?.toLowerCase().includes(value) 
            ); 
            
            setFilteredList(filtered); 
        }; 
        
        
        

         // =================== DELETE ====================== 
                        const handleDelete = async (subgradeid) => {
                    if (!subgradeid) return;
                
                    try {
                        setSearched(true);
                        const res = await getGradeDelete(subgradeid);
                
                        if (res?.Table?.length) {
                            const msg = res.Table[0].Column1;
                
                            if (msg.startsWith("M103")) {
                
                                // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED)
                                setGradeWiseList(prev =>
                                    prev.filter(item => item.Id !== subgradeid)
                                );
                
                                setFilteredList(prev =>
                                    prev.filter(item => item.Id !== subgradeid)
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
                <Heading label={"Grade Master"} style={"text-[22px] sm:text-3xl"} />
                {/* <Buttons click={() => navigate("/Grade2")} label={"Add"} style='whitespace-nowrap h-10'/>  */}
                <Buttons
    label={"Add"}
    style="whitespace-nowrap h-10"
    click={() => {
        if (!selectedGradeId) {
            alert("Please select grade");
            return;
        }

        const selectedGrade = gradeList.find(
            g => g.Id == selectedGradeId
        );

        navigate("/Grade2", {
  state: {
    gradeSchemeId: selectedGradeId,   // ✅ SELECTED GRADE
    gradeName: selectedGrade?.Name || ""
  }
});

    }}
/>


            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                {/* <Options label={"Grade"} name={""} optionMsg="Select Grade" options={["A+", "A", "B+"]}/> */}
                <Options
    label="Grade"
    optionMsg="Select Grade"
    options={gradeList}     // 👈 full API array
    valueKey="Id"              // 👈 from API
    labelKey="Name"            // 👈 from API
    onChange={(e) => setSelectedGradeId(e.target.value)}
/>
                <FormInput 
                    label={"Grade"} placeholder={"Enter Grade"} value={searchText} 
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
                        <Buttons
  label={"Edit"}
  click={() =>
    navigate("/Grade2", {
      state: {
        gradeId: row.Id,
        gradeName: row.Name
      }
    })
  }
/>
{/* <Buttons label={"Edit"} click={() => navigate("/Grade2", { state: row.Id }) } style="hidden sm:inline" /> */}
                        <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button
  className="sm:hidden text-lg pt-2.5"
  onClick={() =>
    navigate("/Grade2", {
      state: {
        gradeId: row.Id,
        gradeName: row.Name
      }
    })
  }
>
✏️
</button>
{/* <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Grade2", { state: row.Id })} >✏️</button> */}
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )
}

export default Grade