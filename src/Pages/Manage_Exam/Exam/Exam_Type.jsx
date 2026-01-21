// import React, { useEffect, useState } from 'react'
// import Loader from '../../../Components/Page_Forms/Loader';
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';
// import { getExamTypeDelete, getExamTypeList, } from '../../../services/api';

// function Exam_Type() {
//     const navigate = useNavigate()
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [examtypeList, setExamTypeList] = useState([]); 
//     const [searchText, setSearchText] = useState(""); 
//     const [filteredList, setFilteredList] = useState([]);
//     const columns = [
//         { header: "Subject Name", shortHeader: "Subject", accessor: "Name" },       
//     ]


//     // =================== EXAM TYPE LIST ====================== 
//     useEffect(() => { 
//         fetchExamTypeList(); 
//     }, []); 
    
//     const fetchExamTypeList = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getExamTypeList(instId, sessId); 
            
//             if (res?.Table) { 
//                 setExamTypeList(res.Table); 
//                 setFilteredList(res.Table); // 👈 default table data 
//             } 
//         } catch (error) { 
//             console.error("Stop API Error:", error); 
//         } finally { 
//             setSearched(false); 
//         } 
//     }; 
    
//     // =================== FILTER ====================== 
//     const handleFilter = (text) => { 
//         const value = text.toLowerCase(); 
//         if (!value) { 
//             setFilteredList(examtypeList); 
//             return; 
//         } 
//         const filtered = examtypeList.filter(item => 
//             item.Name?.toLowerCase().includes(value) 
//         ); 
        
//         setFilteredList(filtered); 
//     }; 
    
//     // =================== BUTTON FILTER ====================== 
//     const handleSearch = () => { 
//         setSearched(true); 
//         setTimeout(() => { 
//             handleFilter(searchText); 
//             setSearched(false); 
//         }, 300); 
//     };
    
//     // =================== DELETE ====================== 
//     const handleDelete = async (examtypeid) => { 
//         if (!examtypeid) return; 
        
//         try { 
//             setSearched(true); 
//             const res = await getExamTypeDelete(examtypeid); 
            
//             if (res?.Table?.length) { 
//                 const msg = res.Table[0].Column1; 
                
//                 if (msg.startsWith("M103")) { 
//                     // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED) 
//                     setExamTypeList(prev => 
//                         prev.filter(item => item.Id !== examtypeid) 
//                     ); 
                    
//                     setFilteredList(prev => 
//                         prev.filter(item => item.Id !== examtypeid) 
//                     ); 
                    
//                     alert("Record Delete Successfully"); 
//                 } 
//                 else if (msg.startsWith("M200")) { 
//                     alert("Can not delete reference exist"); 
//                 } 
//                 else { 
//                     alert("Something went wrong"); 
//                 } 
//             } 
//         } catch (error) { 
//             console.error("Delete Stop Error:", error); 
//         } finally { 
//             setSearched(false); 
//         } 
//     }; 
    
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched}/>
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Exam Type"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Exam-Type2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 <FormInput 
//                     label={"Exam Type"} placeholder={"Enter Exam Type"} value={searchText} 
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
            
//             <div className="mt-5">
//                 <Table columns={columns} data={filteredList} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => navigate("/Exam-Type2", { state: row.Id }) } style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Exam-Type2", { state: row.Id })} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//         </div>
//     )
// }

// export default Exam_Type




import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import Loader from '../../../Components/Page_Forms/Loader'
import Dialog from '../../../Components/Page_Forms/Dialog'
import {
    getExamTypeList,
    getExamTypeDelete,
    getExamTypeDetail,
    getExamTypeInsertUpdate
} from '../../../services/api'

function Exam_Type() {

    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [searched, setSearched] = useState(false)

    const [examTypeList, setExamTypeList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [examTypeName, setExamTypeName] = useState("")

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [editExamTypeId, setEditExamTypeId] = useState(0)

    const [form, setForm] = useState({
        name: "",
        alias: ""
    })

    const [errors, setErrors] = useState({})

    const columns = [
        { header: "Exam Type", shortHeader: "Exam", accessor: "Name" }
    ]

    // ================= LOAD LIST =================
    useEffect(() => {
        fetchExamTypes()
    }, [])

    const fetchExamTypes = async () => {
        try {
            setSearched(true)
            const res = await getExamTypeList(instId, sessId)
            if (res?.Table) {
                setExamTypeList(res.Table)
                setFilteredList(res.Table)
            }
        } catch (error) {
            console.error("Exam Type List Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= FILTER (SEARCH BUTTON BASED) =================
    const handleSearch = () => {
        if (!examTypeName.trim()) {
            setFilteredList(examTypeList)
            return
        }

        const filtered = examTypeList.filter(item =>
            item.Name?.toLowerCase().includes(examTypeName.toLowerCase())
        )
        setFilteredList(filtered)
    }

    // ================= VALIDATION =================
    const validateForm = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = "Required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // ================= EDIT =================
    const handleEdit = async (id) => {
        try {
            setSearched(true)
            const res = await getExamTypeDetail(id, instId, sessId)
            if (res?.Table?.length) {
                const data = res.Table[0]
                setEditExamTypeId(id)
                setDialogTitle("Edit")
                setForm({
                    name: data.Name || "",
                    alias: data.Alias || ""
                })
            }
        } catch (error) {
            console.error("Exam Type Detail Error:", error)
        } finally {
            setSearched(false)
            setOpen(true)
        }
    }

    // ================= SAVE / UPDATE =================
    const handleSave = async () => {
        if (!validateForm()) return

        try {
            setSearched(true)
            const res = await getExamTypeInsertUpdate(
                editExamTypeId,
                form.name,
                form.alias,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|")

            if (code === "M101" || code === "M102") {
                alert(text)
                fetchExamTypes()
                clearForm()
                setOpen(false)
            } else if (code === "M200") {
                alert(text)
            } else {
                alert("Something went wrong")
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
            const res = await getExamTypeDelete(id)
            const msg = res?.Table?.[0]?.Column1 || ""
            if (msg.startsWith("M103")) {
                alert("Exam Type Deleted")
                fetchExamTypes()
            } else if (msg.startsWith("M200")) {
                alert("Record Exists")
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
        setForm({ name: "", alias: "" })
        setErrors({})
        setEditExamTypeId(0)
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Exam Type"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        clearForm()
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            <Dialog open={open} title={dialogTitle} dialogstyle={"sm:w-xl sm:h-[300px]"}>
                <>
                        <FormInput
                            label="Name"
                            placeholder={"Enter Exam Type Name "}
                            value={form.name}
                            error={errors.name}
                            onChange={(e) => {
                                setForm(prev => ({ ...prev, name: e.target.value }))
                                if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                            }}
                        />

                        <FormInput
                            label="Alias"
                            placeholder={"Enter Alias "} 
                            value={form.alias}
                            onChange={(e) =>
                                setForm(prev => ({ ...prev, alias: e.target.value }))
                            }
                        />

                    <div className="flex justify-end gap-3 mt-5">
                        <Buttons label="Cancel" click={() => { setOpen(false); clearForm() }} />
                        <Buttons label="Save" click={handleSave} />
                    </div>
                </>
            </Dialog>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <FormInput
                    label="Exam Type"
                    placeholder="Enter Exam Type"
                    value={examTypeName}
                    onChange={(e) => setExamTypeName(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Buttons label="Search" click={handleSearch} />
            </div>

            <div className="mt-5">
                <Table
                    columns={columns}
                    data={filteredList}
                    actions={(row) => (
                        <>
                            <Buttons
                                label="Edit"
                                style="hidden sm:inline"
                                click={() => handleEdit(row.Id)}
                            />
                            <Buttons
                                label="Delete"
                                style="hidden sm:inline"
                                click={() => handleDelete(row.Id)}
                            />
                            <button className="sm:hidden text-lg pt-2.5" onClick={() => handleEdit(row.Id)}>✏️</button>
                            <button className="sm:hidden text-xl pt-2.5" onClick={() => handleDelete(row.Id)}>🗑️</button>
                        </>
                    )}
                />
            </div>
        </div>
    )
}

export default Exam_Type
