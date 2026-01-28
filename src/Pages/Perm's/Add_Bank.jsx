// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';

// function Add_Bank() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "BOB", },
//         { id: 2,  name: "SBI", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Bank Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Add-Bank2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Bank"} placeholder={"Enter Bank Name"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Add-Bank2")} label={"Search"} />
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

// export default Add_Bank



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../Components/Page_Forms/Heading"
import FormInput from "../../Components/Page_Forms/FormInput"
import Buttons from "../../Components/Page_Forms/Buttons"
import Table from "../../Components/Page_Forms/Table"
import Dialog from "../../Components/Page_Forms/Dialog"
import Loader from "../../Components/Page_Forms/Loader"
import CheckBox from "../../Components/Page_Forms/CheckBox"

function Bank_Master() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [bankList, setBankList] = useState([
        { Id: 1, Name: "BOB", Alias: "Bank of Baroda", IFSC: "BARB0001", Branch: "Main", IsPrimary: true },
        { Id: 2, Name: "SBI", Alias: "State Bank", IFSC: "SBIN0001", Branch: "City", IsPrimary: false },
    ])

    const [searchBank, setSearchBank] = useState("")
    const [editBankId, setEditBankId] = useState(0)

    const [bankName, setBankName] = useState("")
    const [alias, setAlias] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [branch, setBranch] = useState("")
    const [isPrimary, setIsPrimary] = useState(false)
    const [bankError, setBankError] = useState("")

    const columns = [
        { header: "Bank Name", shortHeader: "Bank", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredBanks = bankList.filter(item =>
        item.Name?.toLowerCase().includes(searchBank.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditBankId(row.Id)
        setBankName(row.Name)
        setAlias(row.Alias)
        setIfsc(row.IFSC)
        setBranch(row.Branch)
        setIsPrimary(row.IsPrimary)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!bankName.trim()) {
            setBankError("Bank name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editBankId) {
                setBankList(prev =>
                    prev.map(item =>
                        item.Id === editBankId
                            ? {
                                ...item,
                                Name: bankName,
                                Alias: alias,
                                IFSC: ifsc,
                                Branch: branch,
                                IsPrimary: isPrimary,
                            }
                            : item
                    )
                )
            } else {
                setBankList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: bankName,
                        Alias: alias,
                        IFSC: ifsc,
                        Branch: branch,
                        IsPrimary: isPrimary,
                    },
                ])
            }

            setOpen(false)
            setEditBankId(0)
            setBankName("")
            setAlias("")
            setIfsc("")
            setBranch("")
            setIsPrimary(false)
            setBankError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bank?")
        if (!confirmDelete) return

        setBankList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"Bank Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setBankName("")
                        setAlias("")
                        setIfsc("")
                        setBranch("")
                        setIsPrimary(false)
                        setEditBankId(0)
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
                                label={"Bank"}
                                placeholder={"Enter Bank Name"}
                                value={bankName}
                                error={bankError}
                                onChange={(e) => {
                                    setBankName(e.target.value)
                                    if (bankError) setBankError("")
                                }}
                            />

                            <FormInput
                                label={"Alias"}
                                placeholder={"Enter Alias Name"}
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5 w-full">
                            <FormInput
                                label={"IFSC Code"}
                                placeholder={"Enter IFSC Code"}
                                value={ifsc}
                                onChange={(e) => setIfsc(e.target.value)}
                            />

                            <FormInput
                                label={"Branch"}
                                placeholder={"Enter Branch Name"}
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            />

                            <CheckBox
                                label={"Is Primary"}
                                labelClass="text-[16px] md:mt-8"
                                checkstyle="md:mt-8"
                                checked={isPrimary}
                                onChange={(e) => setIsPrimary(e.target.checked)}
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
                    label={"Bank"}
                    placeholder={"Search Bank"}
                    value={searchBank}
                    onChange={(e) => setSearchBank(e.target.value)}
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
                        data={filteredBanks}
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

export default Bank_Master
