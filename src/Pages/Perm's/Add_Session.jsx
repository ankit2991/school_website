// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';

// function Add_Session() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "2024-2025", },
//         { id: 2,  name: "2026-2027", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Session Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Add-Session2")} label={"Add"} style='whitespace-nowrap h-10'/>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Session"} placeholder={"Enter Session"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Add-Session2")} label={"Search"} />                    
//             </div>
            
//             <div className="mt-5">
//                 <Table columns={columns} data={data} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg" onClick={() => console.log("Edit:", row)} >✏️</button>
//                         <button className="sm:hidden text-xl" onClick={() => console.log("Print:", row)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//         </div>
//     )
// }

// export default Add_Session




import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../Components/Page_Forms/Heading"
import FormInput from "../../Components/Page_Forms/FormInput"
import Buttons from "../../Components/Page_Forms/Buttons"
import Table from "../../Components/Page_Forms/Table"
import Dialog from "../../Components/Page_Forms/Dialog"
import Loader from "../../Components/Page_Forms/Loader"

function Session_Master() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [sessionList, setSessionList] = useState([
        { Id: 1, Name: "2024-2025", Description: "Academic Year", StartDate: "2024-04-01", EndDate: "2025-03-31" },
        { Id: 2, Name: "2026-2027", Description: "Academic Year", StartDate: "2026-04-01", EndDate: "2027-03-31" },
    ])

    const [searchSession, setSearchSession] = useState("")
    const [editSessionId, setEditSessionId] = useState(0)

    const [sessionName, setSessionName] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [sessionError, setSessionError] = useState("")

    const columns = [
        { header: "Session", shortHeader: "Session", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredSessions = sessionList.filter(item =>
        item.Name?.toLowerCase().includes(searchSession.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditSessionId(row.Id)
        setSessionName(row.Name)
        setDescription(row.Description)
        setStartDate(row.StartDate)
        setEndDate(row.EndDate)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!sessionName.trim()) {
            setSessionError("Session name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editSessionId) {
                setSessionList(prev =>
                    prev.map(item =>
                        item.Id === editSessionId
                            ? { ...item, Name: sessionName, Description: description, StartDate: startDate, EndDate: endDate }
                            : item
                    )
                )
            } else {
                setSessionList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: sessionName,
                        Description: description,
                        StartDate: startDate,
                        EndDate: endDate,
                    },
                ])
            }

            setOpen(false)
            setEditSessionId(0)
            setSessionName("")
            setDescription("")
            setStartDate("")
            setEndDate("")
            setSessionError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this session?")
        if (!confirmDelete) return

        setSessionList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"Session Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setSessionName("")
                        setDescription("")
                        setStartDate("")
                        setEndDate("")
                        setEditSessionId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[350px]"}
                children={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full"> 
                            <FormInput 
                                label={"Session"} placeholder={"Enter Session"} 
                                value={sessionName} error={sessionError} 
                                onChange={(e) => { 
                                    setSessionName(e.target.value) 
                                    if (sessionError) setSessionError("") 
                                }} 
                            /> 
                            
                            <FormInput 
                                label={"Description"} placeholder={"Enter Description"} 
                                value={description} onChange={(e) => setDescription(e.target.value)} 
                            /> 
                            
                            <FormInput 
                                label={"Start Date"} type="date" value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                            /> 
                            
                            <FormInput 
                                label={"End Date"} type="date" value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                            /> 
                        </div> 
                        
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
                    label={"Session"}
                    placeholder={"Search Session"}
                    value={searchSession}
                    onChange={(e) => setSearchSession(e.target.value)}
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
                        data={filteredSessions}
                        actions={(row) => (
                            <>
                                <Buttons
                                    label={"Edit"}
                                    click={() => handleEdit(row)}
                                    style="hidden sm:inline"
                                />
                                <Buttons
                                    label={"Delete"}
                                    click={() => handleDelete(row.Id)}
                                    style="hidden sm:inline"
                                />

                                <button
                                    className="sm:hidden text-lg pt-2.5"
                                    onClick={() => handleEdit(row)}
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

export default Session_Master
