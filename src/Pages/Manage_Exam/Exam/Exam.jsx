// import React, { useEffect, useState } from 'react'
// import Loader from '../../../Components/Page_Forms/Loader';
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';
// import { getExamDelete, getExamList, getExamTypeDelete, getExamTypeList, getSubjectDelete,  } from '../../../services/api';

// function Exam_Type() {
//     const navigate = useNavigate()
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [examList, setExamList] = useState([]); 
//     const [searchText, setSearchText] = useState(""); 
//     const [filteredList, setFilteredList] = useState([]);
//     const columns = [
//         { header: "Subject Name", shortHeader: "Subject", accessor: "Name" },       
//     ]


//     // =================== EXAM LIST ====================== 
//     useEffect(() => { 
//         fetchexamList(); 
//     }, []); 
    
//     const fetchexamList = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getExamList(instId, sessId); 
            
//             if (res?.Table) { 
//                 setExamList(res.Table); 
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
//             setFilteredList(examList); 
//             return; 
//         } 
//         const filtered = examList.filter(item => 
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
//     const handleDelete = async (examid) => { 
//         if (!examid) return; 
        
//         try { 
//             setSearched(true); 
//             const res = await getExamDelete(examid); 
            
//             if (res?.Table?.length) { 
//                 const msg = res.Table[0].Column1; 
                
//                 if (msg.startsWith("M103")) { 
//                     // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED) 
//                     setExamList(prev => 
//                         prev.filter(item => item.Id !== examid) 
//                     ); 
                    
//                     setFilteredList(prev => 
//                         prev.filter(item => item.Id !== examid) 
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
//                 <Heading label={"Exam Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Exam2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 <FormInput 
//                     label={"Exam"} placeholder={"Enter Exam"} value={searchText} 
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
//                         <Buttons label={"Edit"} click={() => navigate("/Exam2", { state: row.Id }) } style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Exam2", { state: row.Id })} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//         </div>
//     )
// }

// export default Exam_Type




import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"

import {
    getExamList,
    getExamDelete,
    getExamInsertUpdate,
    getExamDetail,
} from "../../../services/api"

function Exam_Type() {
    const navigate = useNavigate()

    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [examList, setExamList] = useState([])
    const [searchExam, setSearchExam] = useState("")

    const [examName, setExamName] = useState("")
    const [examAlias, setExamAlias] = useState("")
    const [editExamId, setEditExamId] = useState(0)
    const [errors, setErrors] = useState({});


    const columns = [
        { header: "Exam Name", shortHeader: "Exam", accessor: "Name" },
    ]

    // =================== FETCH EXAM LIST ===================
    useEffect(() => {
        fetchExamList()
    }, [])

    const fetchExamList = async () => {
        try {
            setSearched(true)
            const res = await getExamList(instId, sessId)
            if (res?.Table) {
                setExamList(res.Table.filter(item => item.Name))
            }
        } catch (error) {
            console.error("Exam List Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // =================== VALIDATION =================== 
    const validateForm = () => {
    const newErrors = {};

    if (!examName.trim()) {
        newErrors.examName = "Exam name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    // =================== FILTER ===================
    const filteredExams = examList.filter(exam =>
        exam.Name?.toLowerCase().includes(searchExam.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = async (examId) => {
        try {
            setSearched(true)
            const res = await getExamDetail(examId, instId, sessId)
            if (res?.Table?.length) {
                const data = res.Table[0]
                setEditExamId(examId)
                setExamName(data.Name || "")
                setExamAlias(data.Alias || "")
                setDialogTitle("Edit")
                setOpen(true)
            }
        } catch (error) {
            console.error("Exam Detail Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // =================== SAVE ===================
    const handleSave = async () => {
        // if (!examName.trim()) return
        if (!validateForm()) return;

        try {
            setSearched(true)
            const res = await getExamInsertUpdate(
                editExamId,
                examName,
                examAlias,
                userId,
                instId,
                sessId
            )

            if (res?.Table?.length) {
                const msg = res.Table[0].Column1
                alert(msg.split("|")[1] || "Saved")
            }

            setOpen(false)
            setExamName("")
            setExamAlias("")
            setEditExamId(0)
            fetchExamList()
        } catch (error) {
            console.error("Save Exam Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // =================== DELETE ===================
    const handleDelete = async (examId) => {
        if (!examId) return

        const confirmDelete = window.confirm("Are you sure you want to delete this exam?")
        if (!confirmDelete) return

        try {
            setSearched(true)
            const res = await getExamDelete(examId)

            if (res?.Table?.length) {
                const msg = res.Table[0].Column1
                if (msg.startsWith("M103")) {
                    setExamList(prev => prev.filter(e => e.Id !== examId))
                } else {
                    alert("Cannot delete, reference exists")
                }
            }
        } catch (error) {
            console.error("Delete Exam Error:", error)
        } finally {
            setSearched(false)
        }
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"Exam Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setExamName("")
                        setExamAlias("")
                        setEditExamId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-xl sm:h-[280px]"}
                children={
                    <>
                        <FormInput
                            label={"Exam Name"}
                            placeholder={"Enter Exam Name"}
                            value={examName}
                            // onChange={(e) => setExamName(e.target.value)}
                            error={errors.examName}
    onChange={(e) => {
        setExamName(e.target.value);

        // clear error while typing
        if (errors.examName) {
            setErrors(prev => ({ ...prev, examName: "" }));
        }
    }}
                        />

                        <FormInput
                            label={"Alias"}
                            placeholder={"Enter Alias"}
                            value={examAlias}
                            onChange={(e) => setExamAlias(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 mt-5">
                            <Buttons label={"Cancel"} click={() => setOpen(false)} />
                            <Buttons label={"Save"} click={handleSave} />
                        </div>
                    </>
                }
            />

            {/* ================= SEARCH ================= */}
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"Exam"}
                    placeholder={"Search Exam"}
                    value={searchExam}
                    onChange={(e) => setSearchExam(e.target.value)}
                />
            </div>

            <div className="w-full flex justify-end mt-4">
                <Buttons label={"Search"} />
            </div>

            {/* ================= TABLE ================= */}
            <div className="w-full flex justify-center">
                <div className="w-6xl mt-5">
                    <Table
                        columns={columns}
                        data={filteredExams}
                        actions={(row) => (
                            <>
                                <Buttons
                                    label={"Edit"}
                                    click={() => handleEdit(row.Id)}
                                    style="hidden sm:inline"
                                />
                                <Buttons
                                    label={"Delete"}
                                    click={() => handleDelete(row.Id)}
                                    style="hidden sm:inline"
                                />

                                <button
                                    className="sm:hidden text-lg pt-2.5"
                                    onClick={() => handleEdit(row.Id)}
                                >
                                    ✏️
                                </button>
                                <button
                                    className="sm:hidden text-xl pt-2.5"
                                    onClick={() => handleDelete(row.Id)}
                                >
                                    🗑️
                                </button>
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Exam_Type