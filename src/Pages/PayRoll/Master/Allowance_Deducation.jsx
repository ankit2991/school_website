// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Table from '../../../Components/Page_Forms/Table';


// function Allowance_Deducation() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "KA", },
//         { id: 2,  name: "KA", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Allowance Deducation Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Allowance-Deducation2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
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

// export default Allowance_Deducation





import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"
import Options from "../../../Components/Page_Forms/Options"
import CheckBox from "../../../Components/Page_Forms/CheckBox"

function Allowance_Deducation() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [adList, setAdList] = useState([
        { Id: 1, Name: "KA", Type: "Allowance", IsActive: true },
        { Id: 2, Name: "TA", Type: "Deducation", IsActive: false },
    ])

    const [editAdId, setEditAdId] = useState(0)

    const [name, setName] = useState("")
    const [adType, setAdType] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [nameError, setNameError] = useState("")

    const columns = [
        { header: "Name", shortHeader: "Name", accessor: "Name" },
    ]

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditAdId(row.Id)
        setName(row.Name)
        setAdType(row.Type)
        setIsActive(row.IsActive)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!name.trim()) {
            setNameError("Name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editAdId) {
                setAdList(prev =>
                    prev.map(item =>
                        item.Id === editAdId
                            ? {
                                  ...item,
                                  Name: name,
                                  Type: adType,
                                  IsActive: isActive,
                              }
                            : item
                    )
                )
            } else {
                setAdList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: name,
                        Type: adType,
                        IsActive: isActive,
                    },
                ])
            }

            setOpen(false)
            setEditAdId(0)
            setName("")
            setAdType("")
            setIsActive(false)
            setNameError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this record?"
        )
        if (!confirmDelete) return

        setAdList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Allowance Deducation Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setName("")
                        setAdType("")
                        setIsActive(false)
                        setEditAdId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-3xl sm:h-[300px]"}
                children={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                            <FormInput
                                label={"Name"}
                                placeholder={"Enter Name"}
                                value={name}
                                error={nameError}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    if (nameError) setNameError("")
                                }}
                            />

                            <Options
                                label={"AD Type"}
                                optionMsg="Select AD Type"
                                options={["Allowance", "Deducation"]}
                                value={adType}
                                onChange={(e) => setAdType(e.target.value)}
                            />

                            <CheckBox
                                label={"Is Active"}
                                labelClass="text-[16px]"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Buttons label={"Cancel"} click={() => setOpen(false)} />
                            <Buttons label={"Save"} click={handleSave} />
                        </div>
                    </>
                }
            />

            {/* ================= TABLE ================= */}
            <div className="w-full flex justify-center">
                <div className="w-6xl mt-5">
                    <Table
                        columns={columns}
                        data={adList}
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

export default Allowance_Deducation
