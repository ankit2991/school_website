// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import FormInput from '../../../Components/Page_Forms/FormInput';
// import Table from '../../../Components/Page_Forms/Table';


// function Shift() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "Morning", },
//         { id: 2,  name: "Evening", },
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Shift Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Shift2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Shift"} placeholder={"Enter Shift Name"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Shift2")} label={"Search"} />                    
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

// export default Shift



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"

function Shift() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [shiftList, setShiftList] = useState([
        { Id: 1, Name: "Morning" },
        { Id: 2, Name: "Evening" },
    ])

    const [searchShift, setSearchShift] = useState("")
    const [editShiftId, setEditShiftId] = useState(0)

    const [shiftName, setShiftName] = useState("")
    const [effectiveDate, setEffectiveDate] = useState("")
    const [description, setDescription] = useState("")
    const [shiftError, setShiftError] = useState("")

    const columns = [
        { header: "Shift Name", shortHeader: "Shift", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredShifts = shiftList.filter(item =>
        item.Name?.toLowerCase().includes(searchShift.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditShiftId(row.Id)
        setShiftName(row.Name)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!shiftName.trim()) {
            setShiftError("Shift name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editShiftId) {
                setShiftList(prev =>
                    prev.map(item =>
                        item.Id === editShiftId
                            ? { ...item, Name: shiftName }
                            : item
                    )
                )
            } else {
                setShiftList(prev => [
                    ...prev,
                    { Id: Date.now(), Name: shiftName },
                ])
            }

            setOpen(false)
            setEditShiftId(0)
            setShiftName("")
            setEffectiveDate("")
            setDescription("")
            setShiftError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this shift?"
        )
        if (!confirmDelete) return

        setShiftList(prev =>
            prev.filter(item => item.Id !== id)
        )
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Shift Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setShiftName("")
                        setEffectiveDate("")
                        setDescription("")
                        setEditShiftId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[470px]"}
                children={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormInput
                                label={"Shift Name"}
                                placeholder={"Enter Shift Name"}
                                value={shiftName}
                                error={shiftError}
                                onChange={(e) => {
                                    setShiftName(e.target.value)
                                    if (shiftError) setShiftError("")
                                }}
                            />

                            <FormInput
                                label={"Effective Date"}
                                type="date"
                                value={effectiveDate}
                                onChange={(e) => setEffectiveDate(e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <FormInput
                                label={"Description"}
                                as="textarea"
                                rows={4}
                                placeholder={"Enter Description"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Login / Logout Time Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 mb-5 w-full">
        {/* Login Time */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Login Time</label>
          <div className="flex items-center gap-2">
            <FormInput type="time" 
              inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            <span className="text-lg font-bold">:</span>
            <FormInput type="time" 
              inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
        </div>
        {/* Logout Time */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Logout Time</label>
          <div className="flex items-center gap-2">
            <FormInput type="time" 
              inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            <span className="text-lg font-bold">:</span>
            <FormInput type="time" 
              inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
        </div>
      </div>

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
                    label={"Shift"}
                    placeholder={"Search Shift"}
                    value={searchShift}
                    onChange={(e) => setSearchShift(e.target.value)}
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
                        data={filteredShifts}
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

export default Shift
