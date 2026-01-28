// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Table from '../../../Components/Page_Forms/Table';


// function Designation() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Designation", shortHeader: "Designation", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "Accountant", },
//         { id: 2,  name: "Teacher", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Designation Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Designation2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
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

// export default Designation




import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"

function Designation() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [designationList, setDesignationList] = useState([
        { Id: 1, Name: "Accountant" },
        { Id: 2, Name: "Teacher" },
    ])

    const [searchDesignation, setSearchDesignation] = useState("")
    const [editDesignationId, setEditDesignationId] = useState(0)

    const [designationName, setDesignationName] = useState("")
    const [designationError, setDesignationError] = useState("")

    const columns = [
        { header: "Designation", shortHeader: "Designation", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredDesignations = designationList.filter(item =>
        item.Name?.toLowerCase().includes(searchDesignation.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditDesignationId(row.Id)
        setDesignationName(row.Name)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!designationName.trim()) {
            setDesignationError("Designation name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editDesignationId) {
                setDesignationList(prev =>
                    prev.map(item =>
                        item.Id === editDesignationId
                            ? { ...item, Name: designationName }
                            : item
                    )
                )
            } else {
                setDesignationList(prev => [
                    ...prev,
                    { Id: Date.now(), Name: designationName },
                ])
            }

            setOpen(false)
            setEditDesignationId(0)
            setDesignationName("")
            setDesignationError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this designation?"
        )
        if (!confirmDelete) return

        setDesignationList(prev =>
            prev.filter(item => item.Id !== id)
        )
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Designation Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setDesignationName("")
                        setEditDesignationId(0)
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
                            label={"Designation"}
                            placeholder={"Enter Designation Name"}
                            value={designationName}
                            error={designationError}
                            onChange={(e) => {
                                setDesignationName(e.target.value)
                                if (designationError) setDesignationError("")
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
                    label={"Designation"}
                    placeholder={"Search Designation"}
                    value={searchDesignation}
                    onChange={(e) => setSearchDesignation(e.target.value)}
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
                        data={filteredDesignations}
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

export default Designation
