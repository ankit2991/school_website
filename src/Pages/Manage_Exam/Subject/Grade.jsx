// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ====================================== Navigate to Grade2 page code for Add grade And Edit Grade code Start ==================================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useEffect, useState } from 'react'
// import Loader from '../../../Components/Page_Forms/Loader';
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';
// import { getGradeDelete, getGradeList, getGradeWiseList, } from '../../../services/api';
// import Options from '../../../Components/Page_Forms/Options';

// function Grade() {
//     const navigate = useNavigate()
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [gradeList, setGradeList] = useState([]); 
//     const [selectedGradeId, setSelectedGradeId] = useState("");
//     const [gradewiseList, setGradeWiseList] = useState([]); 
//     const [searchText, setSearchText] = useState(""); 
//     const [filteredList, setFilteredList] = useState([]);
//     const [showTable, setShowTable] = useState(false);
//     const columns = [
//         { header: "Grade Name", shortHeader: "Subject", accessor: "Name" },       
//     ]


//     // =================== GRADE LIST ====================== 
//         useEffect(() => { 
//             fetchGradeList(); 
//         }, []); 
        
//         const fetchGradeList = async () => { 
//             try { 
//                 setSearched(true); 
//                 const res = await getGradeList(instId, sessId); 
                
//                 if (res?.Table) { 
//                     setGradeList(res.Table); 
//                 } 
//             } catch (error) { 
//                 console.error("Stop API Error:", error); 
//             } finally { 
//                 setSearched(false); 
//             } 
//         };

//     // =================== GRADE WISE LIST ====================== 
//     const fetchGradeWiseData = async (gradeId) => {
//   if (!gradeId) return;

//   try {
//     setSearched(true);
//     setShowTable(false);

//     // Clear typed filter text
//     setSearchText("");

//     const res = await getGradeWiseList(
//       gradeId,
//       instId,
//       sessId
//     );

//     if (res?.Table) {
//       setGradeWiseList(res.Table);
//       setFilteredList(res.Table);
//       setShowTable(true);
//     } else {
//       setGradeWiseList([]);
//       setFilteredList([]);
//       setShowTable(false);
//     }
//   } catch (error) {
//     console.error("Grade Wise Error:", error);
//     setShowTable(false);
//   } finally {
//     setSearched(false);
//   }
// };

// useEffect(() => {
//   if (selectedGradeId) {
//     fetchGradeWiseData(selectedGradeId);
//   }
// }, [selectedGradeId]);

//     // =================== SEARCH ====================== 


// // const handleSearch = async () => {
// //     if (!selectedGradeId) return;

// //     try {
// //         setSearched(true);
// //         setShowTable(false);

// //         // 🔹 Clear typed search text
// //         setSearchText("");

// //         const res = await getGradeWiseList(
// //             selectedGradeId,
// //             instId,
// //             sessId
// //         );

// //         if (res?.Table) {
// //             setGradeWiseList(res.Table);
// //             setFilteredList(res.Table); // show all rows
// //             setShowTable(true);
// //         } else {
// //             setGradeWiseList([]);
// //             setFilteredList([]);
// //             setShowTable(false);
// //         }

// //     } catch (error) {
// //         console.error("Grade Wise Error:", error);
// //         setShowTable(false);
// //     } finally {
// //         setSearched(false);
// //     }
// // };

// const handleSearch = () => {
//   if (!selectedGradeId) {
//     alert("Please select grade");
//     return;
//   }

//   fetchGradeWiseData(selectedGradeId);
// };

//         // =================== FILTER ====================== 
//         const handleFilter = (text) => { 
//             const value = text.toLowerCase(); 
//             if (!value) { 
//                 setFilteredList(gradewiseList); 
//                 return; 
//             } 
//             const filtered = gradewiseList.filter(item => 
//                 item.Name?.toLowerCase().includes(value) 
//             ); 
            
//             setFilteredList(filtered); 
//         }; 
        
        
        

//          // =================== DELETE ====================== 
//                         const handleDelete = async (subgradeid) => {
//                     if (!subgradeid) return;
                
//                     try {
//                         setSearched(true);
//                         const res = await getGradeDelete(subgradeid);
                
//                         if (res?.Table?.length) {
//                             const msg = res.Table[0].Column1;
                
//                             if (msg.startsWith("M103")) {
                
//                                 // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED)
//                                 setGradeWiseList(prev =>
//                                     prev.filter(item => item.Id !== subgradeid)
//                                 );
                
//                                 setFilteredList(prev =>
//                                     prev.filter(item => item.Id !== subgradeid)
//                                 );
                
//                                 alert("Record Delete Successfully");
//                             } 
//                             else if (msg.startsWith("M200")) {
//                                 alert("Can not delete reference exist");
//                             } 
//                             else {
//                                 alert("Something went wrong");
//                             }
//                         }
//                     } catch (error) {
//                         console.error("Delete Stop Error:", error);
//                     } finally {
//                         setSearched(false);
//                     }
//                 };
    



    
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched}/>
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Grade Master"} style={"text-[22px] sm:text-3xl"} />
//                 {/* <Buttons click={() => navigate("/Grade2")} label={"Add"} style='whitespace-nowrap h-10'/>  */}
//                 <Buttons
//     label={"Add"}
//     style="whitespace-nowrap h-10"
//     click={() => {
//         if (!selectedGradeId) {
//             alert("Please select grade");
//             return;
//         }

//         const selectedGrade = gradeList.find(
//             g => g.Id == selectedGradeId
//         );

//         navigate("/Grade2", {
//   state: {
//     gradeSchemeId: selectedGradeId,   // ✅ SELECTED GRADE
//     gradeName: selectedGrade?.Name || ""
//   }
// });

//     }}
// />


//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 {/* <Options label={"Grade"} name={""} optionMsg="Select Grade" options={["A+", "A", "B+"]}/> */}
//                 <Options
//     label="Grade"
//     optionMsg="Select Grade"
//     options={gradeList}     // 👈 full API array
//     valueKey="Id"              // 👈 from API
//     labelKey="Name"            // 👈 from API
//     onChange={(e) => setSelectedGradeId(e.target.value)}
// />
//                 <FormInput 
//                     label={"Grade"} placeholder={"Enter Grade"} value={searchText} 
//                     onChange={(e) => { 
//                         const val = e.target.value; 
//                         setSearchText(val); 
//                         handleFilter(val); 
//                     }} 
//                 /> 
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={handleSearch} label={"Search"} />                    
//             </div>
            
//             {showTable && (
//             <div className="mt-5">
//                 <Table columns={columns} data={filteredList} actions={(row) => (
//                     <>
//                         <Buttons
//   label={"Edit"}
//   click={() =>
//     navigate("/Grade2", {
//       state: {
//         gradeId: row.Id,
//         gradeName: row.Name
//       }
//     })
//   }
// />
// {/* <Buttons label={"Edit"} click={() => navigate("/Grade2", { state: row.Id }) } style="hidden sm:inline" /> */}
//                         <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button
//   className="sm:hidden text-lg pt-2.5"
//   onClick={() =>
//     navigate("/Grade2", {
//       state: {
//         gradeId: row.Id,
//         gradeName: row.Name
//       }
//     })
//   }
// >
// ✏️
// </button>
// {/* <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Grade2", { state: row.Id })} >✏️</button> */}
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
//                     </>
//                 )}/>
//             </div> )}
//         </div>
//     )
// }

// export default Grade

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ====================================== Navigate to Grade2 page code for Add grade And Edit Grade code End ==================================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ====================================== Without select grade dialog box open code Start ==================================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useEffect, useState } from 'react'
// import Heading from '../../../Components/Page_Forms/Heading'
// import Buttons from '../../../Components/Page_Forms/Buttons'
// import FormInput from '../../../Components/Page_Forms/FormInput'
// import Table from '../../../Components/Page_Forms/Table'
// import Loader from '../../../Components/Page_Forms/Loader'
// import Dialog from '../../../Components/Page_Forms/Dialog'
// import Options from '../../../Components/Page_Forms/Options'
// import {
//     getGradeList,
//     getGradeWiseList,
//     getGradeDelete,
//     getGradeDetail,
//     getGradeInsertUpdate
// } from '../../../services/api'

// function Grade() {

//     const instId = localStorage.getItem("InstituteID")
//     const sessId = localStorage.getItem("SessionID")
//     const userId = localStorage.getItem("UserId")

//     const [searched, setSearched] = useState(false)

//     const [gradeList, setGradeList] = useState([])
//     const [selectedGradeId, setSelectedGradeId] = useState("")

//     const [gradeWiseList, setGradeWiseList] = useState([])
//     const [filteredList, setFilteredList] = useState([])
//     const [gradeName, setGradeName] = useState("")

//     const [open, setOpen] = useState(false)
//     const [dialogTitle, setDialogTitle] = useState("")
//     const [editId, setEditId] = useState(0) 
//     const [errors, setErrors] = useState({});


//     const [form, setForm] = useState({
//         gradeSchemeId: "",
//         name: "",
//         alias: "",
//         min: "",
//         max: "",
//         remark: ""
//     })

//     const columns = [
//         { header: "Grade Name", shortHeader: "Grade", accessor: "Name" }
//     ]

//     // ================= LOAD GRADE MASTER =================
//     useEffect(() => {
//         fetchGradeList()
//     }, [])

//     const fetchGradeList = async () => {
//         try {
//             setSearched(true)
//             const res = await getGradeList(instId, sessId)
//             if (res?.Table) setGradeList(res.Table)
//         } catch (error) {
//             console.error("Grade List Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     }

//     // ================= VALIDATION ================= 
//     const validateForm = () => {
//   const newErrors = {};

//   if (!form.name.trim()) {
//     newErrors.name = "Grade name is required";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

//     // ================= LOAD GRADE WISE =================
//     useEffect(() => {
//         if (!selectedGradeId) {
//             setGradeWiseList([])
//             setFilteredList([])
//             return
//         }
//         fetchGradeWise()
//     }, [selectedGradeId])

//     const fetchGradeWise = async () => {
//         try {
//             setSearched(true)
//             setGradeName("")
//             const res = await getGradeWiseList(selectedGradeId, instId, sessId)
//             if (res?.Table) {
//                 setGradeWiseList(res.Table)
//                 setFilteredList(res.Table)
//             }
//         } catch (error) {
//             console.error("Grade Wise Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     }

//     // ================= FILTER =================
//     useEffect(() => {
//         if (!gradeName.trim()) {
//             setFilteredList(gradeWiseList)
//         } else {
//             const filtered = gradeWiseList.filter(item =>
//                 item.Name?.toLowerCase().includes(gradeName.toLowerCase())
//             )
//             setFilteredList(filtered)
//         }
//     }, [gradeName, gradeWiseList])

//     // ================= ADD =================
//     const handleAdd = () => {
//         // if (!selectedGradeId) {
//         //     alert("Please select grade")
//         //     return
//         // }

//         clearForm()
//         setDialogTitle("Add")
//         // setForm(prev => ({
//         //     ...prev,
//         //     gradeSchemeId: selectedGradeId
//         // }))
//         setOpen(true)
//     }

//     // ================= EDIT =================
//     const handleEdit = async (id) => {
//         try {
//             setSearched(true)
//             const res = await getGradeDetail(id, instId, sessId)
//             if (res?.Table?.length) {
//                 const d = res.Table[0]
//                 setEditId(id)
//                 setDialogTitle("Edit")
//                 setForm({
//                     gradeSchemeId: d.F_GradeSchemeMaster,
//                     name: d.Name || "",
//                     alias: d.Alias || "",
//                     min: d.MinNum || "",
//                     max: d.MaxNum || "",
//                     remark: d.Remarks || ""
//                 })
//                 setOpen(true)
//             }
//         } catch (error) {
//             console.error("Grade Detail Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     }

//     // ================= SAVE / UPDATE =================
//     const handleSave = async () => {
//          if (!validateForm()) return;

//         try {
//             setSearched(true)
//             const res = await getGradeInsertUpdate(
//                 editId,
//                 form.gradeSchemeId,
//                 form.name,
//                 form.alias,
//                 form.min,
//                 form.max,
//                 form.remark,
//                 userId,
//                 instId,
//                 sessId
//             )

//             const msg = res?.Table?.[0]?.Column1 || ""
//             const [code, text] = msg.split("|")

//             if (code === "M101" || code === "M102") {
//                 alert(text)
//                 fetchGradeWise()
//                 clearForm()
//                 setOpen(false)
//             } else {
//                 alert(text || "Something went wrong")
//             }
//         } catch (error) {
//             console.error("Save Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     }

//     // ================= DELETE =================
//     const handleDelete = async (id) => {
//         if (!id) return
//         try {
//             setSearched(true)
//             const res = await getGradeDelete(id)
//             const msg = res?.Table?.[0]?.Column1 || ""

//             if (msg.startsWith("M103")) {
//                 alert("Grade Deleted")
//                 setGradeWiseList(prev => prev.filter(i => i.Id !== id))
//                 setFilteredList(prev => prev.filter(i => i.Id !== id))
//             } else if (msg.startsWith("M200")) {
//                 alert("Reference exists")
//             } else {
//                 alert("Something went wrong")
//             }
//         } catch (error) {
//             console.error("Delete Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     }

//     // ================= CLEAR =================
//     const clearForm = () => {
//         setForm({
//             gradeSchemeId: "",
//             name: "",
//             alias: "",
//             min: "",
//             max: "",
//             remark: ""
//         })
//         setEditId(0)
//     }

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched} />

//             <div className="flex justify-between mb-5">
//                 <Heading label={"Grade Master"} />
//                 <Buttons label="Add" click={handleAdd} />
//             </div>

//             <Dialog open={open} title={dialogTitle} dialogstyle="sm:w-5xl sm:h-[400px]">
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5">
//                         <FormInput label="Name" value={form.name} placeholder="Enter Grade"
//                             // onChange={e => setForm({ ...form, name: e.target.value })} 
//                             error={errors.name}
//   onChange={(e) => {
//     setForm({ ...form, name: e.target.value });

//     // clear error while typing
//     if (errors.name) {
//       setErrors((prev) => ({ ...prev, name: "" }));
//     }
//   }}
//                         />
//                         <FormInput label="Alias" value={form.alias} placeholder="Enter Alias"
//                             onChange={e => setForm({ ...form, alias: e.target.value })} />
//                         <FormInput label="Minimum" value={form.min} placeholder="Enter Minimum"
//                             onChange={e => setForm({ ...form, min: e.target.value })} />
//                         <FormInput label="Maximum" value={form.max} placeholder="Enter Maximum"
//                             onChange={e => setForm({ ...form, max: e.target.value })} />
//                     </div>
//                         <FormInput label="Remark" value={form.remark} placeholder="Enter Remark"
//                             onChange={e => setForm({ ...form, remark: e.target.value })} />

//                     <div className="flex justify-end gap-3 mt-5">
//                         <Buttons label="Cancel" click={() => { setOpen(false); clearForm() }} />
//                         <Buttons label="Save" click={handleSave} />
//                     </div>
//                 </>
//             </Dialog>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
//                 <Options
//                     label="Grade"
//                     optionMsg="Select Grade"
//                     options={gradeList}
//                     valueKey="Id"
//                     labelKey="Name"
//                     onChange={(e) => setSelectedGradeId(e.target.value)}
//                 />
//                 <FormInput
//                     label="Grade"
//                     placeholder="Enter Grade"
//                     value={gradeName}
//                     onChange={(e) => setGradeName(e.target.value)}
//                 />
//             </div>

//             <div className="mt-5">
//                 <Table
//                     columns={columns}
//                     data={filteredList}
//                     actions={(row) => (
//                         <>
//                             <Buttons label="Edit" style="hidden sm:inline" click={() => handleEdit(row.Id)} />
//                             <Buttons label="Delete" style="hidden sm:inline" click={() => handleDelete(row.Id)} />
//                             <button className="sm:hidden text-lg" onClick={() => handleEdit(row.Id)}>✏️</button>
//                             <button className="sm:hidden text-xl" onClick={() => handleDelete(row.Id)}>🗑️</button>
//                         </>
//                     )}
//                 />
//             </div>
//         </div>
//     )
// }

// export default Grade

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ====================================== Without select grade dialog box open code End==================================
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import Loader from '../../../Components/Page_Forms/Loader'
import Dialog from '../../../Components/Page_Forms/Dialog'
import Options from '../../../Components/Page_Forms/Options'
import {
    getGradeList,
    getGradeWiseList,
    getGradeDelete,
    getGradeDetail,
    getGradeInsertUpdate
} from '../../../services/api'

function Grade() {

    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [searched, setSearched] = useState(false)

    const [gradeList, setGradeList] = useState([])
    const [selectedGradeId, setSelectedGradeId] = useState("")

    const [gradeWiseList, setGradeWiseList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [gradeName, setGradeName] = useState("")

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [editId, setEditId] = useState(0) 
    const [errors, setErrors] = useState({});


    const [form, setForm] = useState({
        gradeSchemeId: "",
        name: "",
        alias: "",
        min: "",
        max: "",
        remark: ""
    })

    const columns = [
        { header: "Grade Name", shortHeader: "Grade", accessor: "Name" }
    ]

    // ================= LOAD GRADE MASTER =================
    useEffect(() => {
        fetchGradeList()
    }, [])

    const fetchGradeList = async () => {
        try {
            setSearched(true)
            const res = await getGradeList(instId, sessId)
            if (res?.Table) setGradeList(res.Table)
        } catch (error) {
            console.error("Grade List Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= VALIDATION =================
    const validateForm = () => {
    const newErrors = {};

    if (!form.alias.trim()) {
        newErrors.alias = "Alias is required";
    }

    if (!form.min.toString().trim()) {
        newErrors.min = "Minimum value is required";
    } else if (isNaN(form.min)) {
        newErrors.min = "Minimum must be a number";
    }

    if (!form.max.toString().trim()) {
        newErrors.max = "Maximum value is required";
    } else if (isNaN(form.max)) {
        newErrors.max = "Maximum must be a number";
    } else if (
        !isNaN(form.min) &&
        Number(form.max) < Number(form.min)
    ) {
        newErrors.max = "Maximum must be greater than Minimum";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    // ================= LOAD GRADE WISE =================
    useEffect(() => {
        if (!selectedGradeId) {
            setGradeWiseList([])
            setFilteredList([])
            return
        }
        fetchGradeWise()
    }, [selectedGradeId])

    const fetchGradeWise = async () => {
        try {
            setSearched(true)
            setGradeName("")
            const res = await getGradeWiseList(selectedGradeId, instId, sessId)
            if (res?.Table) {
                setGradeWiseList(res.Table)
                setFilteredList(res.Table)
            }
        } catch (error) {
            console.error("Grade Wise Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= FILTER =================
    useEffect(() => {
        if (!gradeName.trim()) {
            setFilteredList(gradeWiseList)
        } else {
            const filtered = gradeWiseList.filter(item =>
                item.Name?.toLowerCase().includes(gradeName.toLowerCase())
            )
            setFilteredList(filtered)
        }
    }, [gradeName, gradeWiseList])

    // ================= ADD =================
    const handleAdd = () => {
    if (!selectedGradeId) {
        alert("Please select grade")
        return
    }

    const selectedGrade = gradeList.find(
        g => g.Id === Number(selectedGradeId)
    )

    clearForm()
    setDialogTitle("Add")

    setForm(prev => ({
        ...prev,
        gradeSchemeId: selectedGradeId,
        name: selectedGrade?.Name || ""   // 👈 SET NAME HERE
    }))

    setOpen(true)
}


    // ================= EDIT =================
    const handleEdit = async (id) => {
        try {
            setSearched(true)
            const res = await getGradeDetail(id, instId, sessId)
            if (res?.Table?.length) {
                const d = res.Table[0]
                setEditId(id)
                setDialogTitle("Edit")
                setForm({
                    gradeSchemeId: d.F_GradeSchemeMaster,
                    name: d.Name || "",
                    alias: d.Alias || "",
                    min: d.MinNum || "",
                    max: d.MaxNum || "",
                    remark: d.Remarks || ""
                })
                setOpen(true)
            }
        } catch (error) {
            console.error("Grade Detail Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= SAVE / UPDATE =================
    const handleSave = async () => {
        if (!validateForm()) return; 

        try {
            setSearched(true)
            const res = await getGradeInsertUpdate(
                editId,
                form.gradeSchemeId,
                form.name,
                form.alias,
                form.min,
                form.max,
                form.remark,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|")

            if (code === "M101" || code === "M102") {
                alert(text)
                fetchGradeWise()
                clearForm()
                setOpen(false)
            } else {
                alert(text || "Something went wrong")
            }
        } catch (error) {
            console.error("Save Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!id) return
        try {
            setSearched(true)
            const res = await getGradeDelete(id)
            const msg = res?.Table?.[0]?.Column1 || ""

            if (msg.startsWith("M103")) {
                alert("Grade Deleted")
                setGradeWiseList(prev => prev.filter(i => i.Id !== id))
                setFilteredList(prev => prev.filter(i => i.Id !== id))
            } else if (msg.startsWith("M200")) {
                alert("Reference exists")
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.error("Delete Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= CLEAR =================
    const clearForm = () => {
        setForm({
            gradeSchemeId: "",
            name: "",
            alias: "",
            min: "",
            max: "",
            remark: ""
        })
        setEditId(0)
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Grade Master"} />
                <Buttons label="Add" click={handleAdd} />
            </div>

            <Dialog open={open} title={dialogTitle} dialogstyle="sm:w-5xl sm:h-[400px]">
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5">
                        <FormInput label="Name" value={form.name} placeholder="Enter Grade"
                            onChange={e => setForm({ ...form, name: e.target.value })} />
                        <FormInput label="Alias" value={form.alias} placeholder="Enter Alias"
                            // onChange={e => setForm({ ...form, alias: e.target.value })} 
                            error={errors.alias}
    onChange={(e) => {
        setForm({ ...form, alias: e.target.value });

        if (errors.alias) {
            setErrors(prev => ({ ...prev, alias: "" }));
        }
    }}
                            />
                        <FormInput label="Minimum" value={form.min} placeholder="Enter Minimum"
                            // onChange={e => setForm({ ...form, min: e.target.value })} 
                            error={errors.min}
    onChange={(e) => {
        setForm({ ...form, min: e.target.value });

        if (errors.min) {
            setErrors(prev => ({ ...prev, min: "" }));
        }
    }}
                            />
                        <FormInput label="Maximum" value={form.max} placeholder="Enter Maximum"
                            // onChange={e => setForm({ ...form, max: e.target.value })} 
                             error={errors.max}
    onChange={(e) => {
        setForm({ ...form, max: e.target.value });

        if (errors.max) {
            setErrors(prev => ({ ...prev, max: "" }));
        }
    }}
                            />
                    </div>
                        <FormInput label="Remark" value={form.remark} placeholder="Enter Remark"
                            onChange={e => setForm({ ...form, remark: e.target.value })} />

                    <div className="flex justify-end gap-3 mt-5">
                        <Buttons label="Cancel" click={() => { setOpen(false); clearForm() }} />
                        <Buttons label="Save" click={handleSave} />
                    </div>
                </>
            </Dialog>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <Options
                    label="Grade"
                    optionMsg="Select Grade"
                    options={gradeList}
                    valueKey="Id"
                    labelKey="Name"
                    onChange={(e) => setSelectedGradeId(e.target.value)}
                />
                <FormInput
                    label="Grade"
                    placeholder="Enter Grade"
                    value={gradeName}
                    onChange={(e) => setGradeName(e.target.value)}
                />
            </div>

            <div className="mt-5">
                <Table
                    columns={columns}
                    data={filteredList}
                    actions={(row) => (
                        <>
                            <Buttons label="Edit" style="hidden sm:inline" click={() => handleEdit(row.Id)} />
                            <Buttons label="Delete" style="hidden sm:inline" click={() => handleDelete(row.Id)} />
                            <button className="sm:hidden text-lg" onClick={() => handleEdit(row.Id)}>✏️</button>
                            <button className="sm:hidden text-xl" onClick={() => handleDelete(row.Id)}>🗑️</button>
                        </>
                    )}
                />
            </div>
        </div>
    )
}

export default Grade

