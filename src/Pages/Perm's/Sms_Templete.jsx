// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';

// function Sms_Templete() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1,  name: "Absent", },
//         { id: 2,  name: "Half Day", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"SMS Templete"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/SMS-Templete2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"SMS Templete"} placeholder={"Enter SMS Templete"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/SMS-Templete2")} label={"Search"} />                    
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

// export default Sms_Templete



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../Components/Page_Forms/Heading"
import FormInput from "../../Components/Page_Forms/FormInput"
import Buttons from "../../Components/Page_Forms/Buttons"
import Table from "../../Components/Page_Forms/Table"
import Dialog from "../../Components/Page_Forms/Dialog"
import Loader from "../../Components/Page_Forms/Loader"
import CheckBox from "../../Components/Page_Forms/CheckBox"

function Sms_Templete() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [smsList, setSmsList] = useState([
        {
            Id: 1,
            Name: "Absent",
            Message: "Student is absent today",
            WordCount: 4,
            IsEnable: true,
        },
        {
            Id: 2,
            Name: "Half Day",
            Message: "Student present for half day",
            WordCount: 5,
            IsEnable: false,
        },
    ])

    const [searchSms, setSearchSms] = useState("")
    const [editSmsId, setEditSmsId] = useState(0)

    const [smsName, setSmsName] = useState("")
    const [smsMessage, setSmsMessage] = useState("")
    const [smsWord, setSmsWord] = useState("")
    const [isEnable, setIsEnable] = useState(false)
    const [smsError, setSmsError] = useState("")

    const columns = [
        { header: "Template Name", shortHeader: "Template", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredSms = smsList.filter(item =>
        item.Name?.toLowerCase().includes(searchSms.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditSmsId(row.Id)
        setSmsName(row.Name)
        setSmsMessage(row.Message)
        setSmsWord(row.WordCount)
        setIsEnable(row.IsEnable)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!smsName.trim()) {
            setSmsError("SMS template name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editSmsId) {
                setSmsList(prev =>
                    prev.map(item =>
                        item.Id === editSmsId
                            ? {
                                  ...item,
                                  Name: smsName,
                                  Message: smsMessage,
                                  WordCount: smsWord,
                                  IsEnable: isEnable,
                              }
                            : item
                    )
                )
            } else {
                setSmsList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: smsName,
                        Message: smsMessage,
                        WordCount: smsWord,
                        IsEnable: isEnable,
                    },
                ])
            }

            setOpen(false)
            setEditSmsId(0)
            setSmsName("")
            setSmsMessage("")
            setSmsWord("")
            setIsEnable(false)
            setSmsError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this SMS template?"
        )
        if (!confirmDelete) return

        setSmsList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"SMS Template"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setSmsName("")
                        setSmsMessage("")
                        setSmsWord("")
                        setIsEnable(false)
                        setEditSmsId(0)
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
                    <FormInput
                        label={"SMS Template"}
                        placeholder={"Enter SMS Template"}
                        value={smsName}
                        error={smsError}
                        onChange={(e) => {
                            setSmsName(e.target.value)
                            if (smsError) setSmsError("")
                        }}
                    />

                    <FormInput
                        label={"SMS Message"}
                        placeholder={"Enter SMS Message"}
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                    />

                    <FormInput
                        label={"SMS Message Word"}
                        placeholder={"Enter SMS Message Word"}
                        value={smsWord}
                        onChange={(e) => setSmsWord(e.target.value)}
                    />

                    <CheckBox 
                        label={"Is Enable"} labelClass='text-[20px] sm:mt-8' 
                        checkstyle={"sm:mt-8"} name={""} checked={isEnable} 
                        onChange={(e) => setIsEnable(e.target.checked)} 
                    />

                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Buttons label={"Cancel"} click={() => setOpen(false)} />
                    <Buttons label={"Save"} click={handleSave} />
                </div>
            </Dialog>

            {/* ================= SEARCH ================= */}
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"SMS Template"}
                    placeholder={"Search SMS Template"}
                    value={searchSms}
                    onChange={(e) => setSearchSms(e.target.value)}
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
                        data={filteredSms}
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

export default Sms_Templete
