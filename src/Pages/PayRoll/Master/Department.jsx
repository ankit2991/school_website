// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';


// function Department() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Department", shortHeader: "Department", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "Accounts", },
//         { id: 2,  name: "Teacher", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Department Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Department2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Department"} placeholder={"Enter Department Name"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Department2")} label={"Search"} />
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

// export default Department



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"

function Department() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [departmentList, setDepartmentList] = useState([
        { Id: 1, Name: "Accounts" },
        { Id: 2, Name: "Teacher" },
    ])

    const [searchDepartment, setSearchDepartment] = useState("")
    const [editDepartmentId, setEditDepartmentId] = useState(0)

    const [departmentName, setDepartmentName] = useState("")
    const [departmentError, setDepartmentError] = useState("")

    const columns = [
        { header: "Department", shortHeader: "Department", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredDepartments = departmentList.filter(item =>
        item.Name?.toLowerCase().includes(searchDepartment.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditDepartmentId(row.Id)
        setDepartmentName(row.Name)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!departmentName.trim()) {
            setDepartmentError("Department name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editDepartmentId) {
                setDepartmentList(prev =>
                    prev.map(item =>
                        item.Id === editDepartmentId
                            ? { ...item, Name: departmentName }
                            : item
                    )
                )
            } else {
                setDepartmentList(prev => [
                    ...prev,
                    { Id: Date.now(), Name: departmentName },
                ])
            }

            setOpen(false)
            setEditDepartmentId(0)
            setDepartmentName("")
            setDepartmentError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this department?"
        )
        if (!confirmDelete) return

        setDepartmentList(prev =>
            prev.filter(item => item.Id !== id)
        )
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Department Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setDepartmentName("")
                        setEditDepartmentId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-xl sm:h-[260px]"}
                children={
                    <>
                        <FormInput
                            label={"Department"}
                            placeholder={"Enter Department Name"}
                            value={departmentName}
                            error={departmentError}
                            onChange={(e) => {
                                setDepartmentName(e.target.value)
                                if (departmentError) setDepartmentError("")
                            }}
                        />

                        <div className="flex justify-end gap-3 mt-6">
                            <Buttons label={"Cancel"} click={() => setOpen(false)} />
                            <Buttons label={"Save"} click={handleSave} />
                        </div>
                    </>
                }
            />

            {/* ================= SEARCH ================= */}
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"Department"}
                    placeholder={"Search Department"}
                    value={searchDepartment}
                    onChange={(e) => setSearchDepartment(e.target.value)}
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
                        data={filteredDepartments}
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

                                {/* Mobile icons */}
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

export default Department
