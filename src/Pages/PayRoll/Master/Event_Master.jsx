// import React from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Options from '../../../Components/Page_Forms/Options';
// import FormInput from '../../../Components/Page_Forms/FormInput'
// import Table from '../../../Components/Page_Forms/Table';

// function Event_Master() {
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
//                 <Heading label={"Event Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Event2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//                 <Options label={"Month"} optionMsg="Select Month" options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
//                 <Options label={"Year"} optionMsg="Select Year" options={["2022", "2023", "2024", "2025"]} />
//                 <FormInput label={"Event"} placeholder={"Enter Event Name"} />
//             </div>
            
//             <div className="flex justify-end mb-5">
//                 <Buttons click={() => navigate("/Event2")} label={"Search"} />
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

// export default Event_Master



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

function Event_Master() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [eventList, setEventList] = useState([
        {
            Id: 1,
            Name: "Annual Function",
            FromDate: "2025-01-10",
            ToDate: "2025-01-10",
            Description: "School Annual Function",
            Audience: "All",
            IsHoliday: true,
        },
        {
            Id: 2,
            Name: "Sports Day",
            FromDate: "2025-02-05",
            ToDate: "2025-02-05",
            Description: "Sports Event",
            Audience: "Student",
            IsHoliday: false,
        },
    ])

    const [searchEvent, setSearchEvent] = useState("")
    const [editEventId, setEditEventId] = useState(0)

    const [eventName, setEventName] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [description, setDescription] = useState("")
    const [audience, setAudience] = useState("")
    const [isHoliday, setIsHoliday] = useState(false)
    const [eventError, setEventError] = useState("")

    const columns = [
        { header: "Event", shortHeader: "Event", accessor: "Name" },
    ]

    // =================== FILTER ===================
    const filteredEvents = eventList.filter(item =>
        item.Name?.toLowerCase().includes(searchEvent.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditEventId(row.Id)
        setEventName(row.Name)
        setFromDate(row.FromDate)
        setToDate(row.ToDate)
        setDescription(row.Description)
        setAudience(row.Audience)
        setIsHoliday(row.IsHoliday)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!eventName.trim()) {
            setEventError("Event name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editEventId) {
                setEventList(prev =>
                    prev.map(item =>
                        item.Id === editEventId
                            ? {
                                  ...item,
                                  Name: eventName,
                                  FromDate: fromDate,
                                  ToDate: toDate,
                                  Description: description,
                                  Audience: audience,
                                  IsHoliday: isHoliday,
                              }
                            : item
                    )
                )
            } else {
                setEventList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: eventName,
                        FromDate: fromDate,
                        ToDate: toDate,
                        Description: description,
                        Audience: audience,
                        IsHoliday: isHoliday,
                    },
                ])
            }

            setOpen(false)
            setEditEventId(0)
            setEventName("")
            setFromDate("")
            setToDate("")
            setDescription("")
            setAudience("")
            setIsHoliday(false)
            setEventError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        )
        if (!confirmDelete) return

        setEventList(prev =>
            prev.filter(item => item.Id !== id)
        )
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            {/* ================= HEADER ================= */}
            <div className="w-full flex justify-between mb-5">
                <Heading label={"Event Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setEventName("")
                        setFromDate("")
                        setToDate("")
                        setDescription("")
                        setAudience("")
                        setIsHoliday(false)
                        setEditEventId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[300px]"}
                children={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-5 w-full">
                            <FormInput
                                label={"Event"}
                                placeholder={"Enter Event Name"}
                                value={eventName}
                                error={eventError}
                                onChange={(e) => {
                                    setEventName(e.target.value)
                                    if (eventError) setEventError("")
                                }}
                            />

                            <FormInput
                                label={"From"}
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />

                            <FormInput
                                label={"To"}
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />

                            <FormInput
                                label={"Description"}
                                placeholder={"Enter Description"}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <Options
                                label={"Audience"}
                                optionMsg="Select Audience"
                                options={["All", "Student", "Class"]}
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                            />

                            <CheckBox
                                label={"Is Holiday"}
                                labelClass="text-[16px] md:mt-8"
                                checkstyle="md:mt-8"
                                checked={isHoliday}
                                onChange={(e) => setIsHoliday(e.target.checked)}
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
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"Event"}
                    placeholder={"Search Event"}
                    value={searchEvent}
                    onChange={(e) => setSearchEvent(e.target.value)}
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
                        data={filteredEvents}
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

export default Event_Master
