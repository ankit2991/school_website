// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';

// function Add_Ledger() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "PNB", },
//         { id: 2,  name: "PAYTM", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Ledger Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Add-Ledger2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Ledger"} placeholder={"Enter Ledger Name"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Add-Ledger2")} label={"Search"} />                    
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

// export default Add_Ledger




import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../Components/Page_Forms/Heading"
import FormInput from "../../Components/Page_Forms/FormInput"
import Buttons from "../../Components/Page_Forms/Buttons"
import Table from "../../Components/Page_Forms/Table"
import Dialog from "../../Components/Page_Forms/Dialog"
import Loader from "../../Components/Page_Forms/Loader"
import Options from "../../Components/Page_Forms/Options"

function Add_Ledger() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [ledgerList, setLedgerList] = useState([
        { Id: 1, Name: "PNB", Group: "Secured Loans", Remarks: "" },
        { Id: 2, Name: "PAYTM", Group: "Sales Account", Remarks: "" },
    ])

    const [searchLedger, setSearchLedger] = useState("")
    const [editLedgerId, setEditLedgerId] = useState(0)

    const [ledgerName, setLedgerName] = useState("")
    const [ledgerGroup, setLedgerGroup] = useState("")
    const [remarks, setRemarks] = useState("")
    const [ledgerError, setLedgerError] = useState("")

    const columns = [
        { header: "Ledger Name", shortHeader: "Ledger", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredLedgers = ledgerList.filter(item =>
        item.Name?.toLowerCase().includes(searchLedger.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditLedgerId(row.Id)
        setLedgerName(row.Name)
        setLedgerGroup(row.Group)
        setRemarks(row.Remarks)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!ledgerName.trim()) {
            setLedgerError("Ledger name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editLedgerId) {
                setLedgerList(prev =>
                    prev.map(item =>
                        item.Id === editLedgerId
                            ? {
                                  ...item,
                                  Name: ledgerName,
                                  Group: ledgerGroup,
                                  Remarks: remarks,
                              }
                            : item
                    )
                )
            } else {
                setLedgerList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: ledgerName,
                        Group: ledgerGroup,
                        Remarks: remarks,
                    },
                ])
            }

            setOpen(false)
            setEditLedgerId(0)
            setLedgerName("")
            setLedgerGroup("")
            setRemarks("")
            setLedgerError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ledger?")
        if (!confirmDelete) return

        setLedgerList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"Ledger Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setLedgerName("")
                        setLedgerGroup("")
                        setRemarks("")
                        setEditLedgerId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-3xl sm:h-[310px]"}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                    <Options
                        label={"Ledger Group"}
                        optionMsg="Select Ledger Group"
                        options={[
                            "Sales Account",
                            "Secured Loans",
                            "Unsecured Loans",
                            "Capital Account",
                        ]}
                        value={ledgerGroup}
                        onChange={(e) => setLedgerGroup(e.target.value)}
                    />

                    <FormInput
                        label={"Name"}
                        placeholder={"Enter Ledger Name"}
                        value={ledgerName}
                        error={ledgerError}
                        onChange={(e) => {
                            setLedgerName(e.target.value)
                            if (ledgerError) setLedgerError("")
                        }}
                    />
                </div>

                <FormInput
                    label={"Remarks"}
                    placeholder={"Enter Remarks"}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />

                <div className="flex justify-end gap-3 mt-4">
                    <Buttons label={"Cancel"} click={() => setOpen(false)} />
                    <Buttons label={"Save"} click={handleSave} />
                </div>
            </Dialog>

            {/* ================= SEARCH ================= */}
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"Ledger"}
                    placeholder={"Search Ledger"}
                    value={searchLedger}
                    onChange={(e) => setSearchLedger(e.target.value)}
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
                        data={filteredLedgers}
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

export default Add_Ledger
