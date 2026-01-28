// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Options from '../../../Components/Page_Forms/Options';
// import FormInput from '../../../Components/Page_Forms/FormInput'
// import Table from '../../../Components/Page_Forms/Table';

// function Allowance_Parameter() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Date", shortHeader: "Date", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "22/jun/2022", },
//         { id: 2,  name: "22/jun/2022", },    
//     ];
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Allowance Parameter Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Allowance-Parameter2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//                 <Options label={"Designation"} optionMsg="Select Designation" options={["Accountant", "Teacher"]} />
//                 <FormInput label={"Allowance Parameter"} placeholder={"Enter Allowance Parameter"} />
//             </div>
            
//             <div className="flex justify-end mb-5">
//                 <Buttons click={() => navigate("/Allowance-Parameter2")} label={"Search"} />
//             </div>

//             <Table columns={columns} data={data} actions={(row) => (
//                 <>
//                     <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
//                     <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
//                     {/* Mobile icons */}
//                     <button className="sm:hidden text-lg" onClick={() => console.log("Edit:", row)} >✏️</button>
//                     <button className="sm:hidden text-xl" onClick={() => console.log("Print:", row)} >🗑️</button>
//                 </>
//             )}/>
//         </div>
//     )
// }

// export default Allowance_Parameter



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../../Components/Page_Forms/Heading"
import FormInput from "../../../Components/Page_Forms/FormInput"
import Buttons from "../../../Components/Page_Forms/Buttons"
import Table from "../../../Components/Page_Forms/Table"
import Dialog from "../../../Components/Page_Forms/Dialog"
import Loader from "../../../Components/Page_Forms/Loader"
import Options from "../../../Components/Page_Forms/Options"

function Allowance_Parameter() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [allowanceList, setAllowanceList] = useState([
        { Id: 1, Date: "2022-06-22", DA: "10%", HRA: "15%" },
        { Id: 2, Date: "2023-01-01", DA: "12%", HRA: "18%" },
    ])

    const [searchText, setSearchText] = useState("")
    const [editId, setEditId] = useState(0)

    const [effectiveDate, setEffectiveDate] = useState("")
    const [description, setDescription] = useState("")
    const [da, setDa] = useState("")
    const [hra, setHra] = useState("")
    const [error, setError] = useState("")

    const columns = [
        { header: "Effective Date", shortHeader: "Date", accessor: "Date" },
        { header: "DA", shortHeader: "DA", accessor: "DA" },
        { header: "HRA", shortHeader: "HRA", accessor: "HRA" },
    ]

    // =================== FILTER ===================
    const filteredAllowance = allowanceList.filter(item =>
        item.Date?.toLowerCase().includes(searchText.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditId(row.Id)
        setEffectiveDate(row.Date)
        setDa(row.DA)
        setHra(row.HRA)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!effectiveDate) {
            setError("Effective date is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editId) {
                setAllowanceList(prev =>
                    prev.map(item =>
                        item.Id === editId
                            ? {
                                ...item,
                                Date: effectiveDate,
                                DA: da,
                                HRA: hra,
                            }
                            : item
                    )
                )
            } else {
                setAllowanceList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Date: effectiveDate,
                        DA: da,
                        HRA: hra,
                    },
                ])
            }

            setOpen(false)
            setEditId(0)
            setEffectiveDate("")
            setDescription("")
            setDa("")
            setHra("")
            setError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this allowance parameter?"
        )
        if (!confirmDelete) return

        setAllowanceList(prev =>
            prev.filter(item => item.Id !== id)
        )
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Allowance Parameter Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setEffectiveDate("")
                        setDescription("")
                        setDa("")
                        setHra("")
                        setEditId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[450px]"}
                children={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                            <FormInput
                                label={"Effective Date"}
                                type="date"
                                value={effectiveDate}
                                error={error}
                                onChange={(e) => {
                                    setEffectiveDate(e.target.value)
                                    if (error) setError("")
                                }}
                            />
                        </div>

                        <FormInput
                            label={"Description"}
                            as="textarea"
                            rows={3}
                            placeholder={"Enter Description"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <FormInput
                                label={"DA"}
                                placeholder={"Enter DA"}
                                value={da}
                                onChange={(e) => setDa(e.target.value)}
                            />
                            <FormInput
                                label={"HRA"}
                                placeholder={"Enter HRA"}
                                value={hra}
                                onChange={(e) => setHra(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Buttons label={"Cancel"} click={() => setOpen(false)} />
                            <Buttons label={"Save"} click={handleSave} />
                        </div>
                    </>
                }
            />

            {/* ================= SEARCH ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <Options
                    label={"Designation"}
                    optionMsg="Select Designation"
                    options={["Accountant", "Teacher"]}
                />

                <FormInput
                    label={"Allowance Parameter"}
                    placeholder={"Search by Date"}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
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
                        data={filteredAllowance}
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

export default Allowance_Parameter
