// import React, { useEffect, useState } from 'react'
// import Loader from '../../../Components/Page_Forms/Loader';
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';
// import { getSubjectDelete, getSubjectList } from '../../../services/api';

// function Subject() {
//     const navigate = useNavigate()
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [subjectList, setSubjectList] = useState([]); 
//     const [searchText, setSearchText] = useState(""); 
//     const [filteredList, setFilteredList] = useState([]);
//     const columns = [
//         { header: "Subject Name", shortHeader: "Subject", accessor: "Name" },       
//     ]


//     // =================== SUBJECT LIST ====================== 
//     useEffect(() => { 
//         fetchSubjectList(); 
//     }, []); 
    
//     const fetchSubjectList = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getSubjectList(instId, sessId); 
            
//             if (res?.Table) { 
//                 setSubjectList(res.Table); 
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
//             setFilteredList(subjectList); 
//             return; 
//         } 
//         const filtered = subjectList.filter(item => 
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
//     const handleDelete = async (subid) => { 
//         if (!subid) return; 
        
//         try { 
//             setSearched(true); 
//             const res = await getSubjectDelete(subid); 
            
//             if (res?.Table?.length) { 
//                 const msg = res.Table[0].Column1; 
                
//                 if (msg.startsWith("M103")) { 
//                     // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED) 
//                     setSubjectList(prev => 
//                         prev.filter(item => item.Id !== subid) 
//                     ); 
                    
//                     setFilteredList(prev => 
//                         prev.filter(item => item.Id !== subid) 
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
//                 <Heading label={"Subject Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Subject2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 <FormInput 
//                     label={"Subject"} placeholder={"Enter Subject"} value={searchText} 
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
//                         <Buttons label={"Edit"} click={() => navigate("/Subject2", { state: row.Id }) } style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Subject2", { state: row.Id })} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//         </div>
//     )
// }

// export default Subject


import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import Loader from '../../../Components/Page_Forms/Loader'
import Dialog from '../../../Components/Page_Forms/Dialog'
import {
    getSubjectList,
    getSubjectDelete,
    getSubjectDetail,
    getSubjectInsertUpdate
} from '../../../services/api'

function Subject() {

    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [searched, setSearched] = useState(false)
    const [subjectList, setSubjectList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [subjectName, setSubjectName] = useState("")

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [editSubjectId, setEditSubjectId] = useState(0)

    const [form, setForm] = useState({
        name: "",
        alias: "",
        orderno: ""
    })

    const [errors, setErrors] = useState({})

    const columns = [
        { header: "Subject Name", shortHeader: "Subject", accessor: "Name" }
    ]

    // ================= LOAD LIST =================
    useEffect(() => {
        fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
        try {
            setSearched(true)
            const res = await getSubjectList(instId, sessId)
            if (res?.Table) {
                setSubjectList(res.Table)
                setFilteredList(res.Table)
            }
        } catch (error) {
            console.error("Subject List Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= FILTER =================
    useEffect(() => {
        if (!subjectName.trim()) {
            setFilteredList(subjectList)
        } else {
            const filtered = subjectList.filter(item =>
                item.Name?.toLowerCase().includes(subjectName.toLowerCase())
            )
            setFilteredList(filtered)
        }
    }, [subjectName, subjectList])

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
            const res = await getSubjectDetail(id, instId, sessId)
            if (res?.Table?.length) {
                const data = res.Table[0]
                setEditSubjectId(id)
                setDialogTitle("Edit")
                setForm({
                    name: data.Name || "",
                    alias: data.Alias || "",
                    orderno: data.OrderNo || ""
                })
            }
        } catch (error) {
            console.error("Subject Detail Error:", error)
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
            const res = await getSubjectInsertUpdate(
                editSubjectId,
                form.name,
                form.alias,
                form.orderno,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|")

            if (code === "M101" || code === "M102") {
                alert(text)
                fetchSubjects()
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
            const res = await getSubjectDelete(id)
            const msg = res?.Table?.[0]?.Column1 || ""

            if (msg.startsWith("M103")) {
                alert("Subject Deleted Successfully")
                setSubjectList(prev => prev.filter(item => item.Id !== id))
                setFilteredList(prev => prev.filter(item => item.Id !== id))
            } else if (msg.startsWith("M200")) {
                alert("Reference exists, cannot delete")
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
            name: "",
            alias: "",
            orderno: ""
        })
        setErrors({})
        setEditSubjectId(0)
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Subject Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        clearForm()
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[320px]"}
            >
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                        <FormInput
                            label="Name"
                            value={form.name}
                            error={errors.name}
                            onChange={(e) => {
                                setForm(prev => ({ ...prev, name: e.target.value }))
                                if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                            }}
                        />

                        <FormInput
                            label="Alias"
                            value={form.alias}
                            onChange={(e) =>
                                setForm(prev => ({ ...prev, alias: e.target.value }))
                            }
                        />
                    </div>

                    <FormInput
                        label="Order No"
                        value={form.orderno}
                        onChange={(e) =>
                            setForm(prev => ({ ...prev, orderno: e.target.value }))
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
                    label="Subject"
                    placeholder="Enter Subject"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Buttons label="Search" />
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

export default Subject
