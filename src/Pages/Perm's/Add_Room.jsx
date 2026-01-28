// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';

// function Add_Room() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//         { header: "IsHostel", shortHeader: "IsHostel", accessor: "hos" },
//     ]
//     const data = [
//         { id: 1,  name: "Room 01", hos:"Yes", },
//         { id: 2,  name: "Room 02", hos:"No", },    
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Room Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Add-Room2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Room"} placeholder={"Enter Room No."} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Add-Room2")} label={"Search"} />                    
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

// export default Add_Room



import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Heading from "../../Components/Page_Forms/Heading"
import FormInput from "../../Components/Page_Forms/FormInput"
import Buttons from "../../Components/Page_Forms/Buttons"
import Table from "../../Components/Page_Forms/Table"
import Dialog from "../../Components/Page_Forms/Dialog"
import Loader from "../../Components/Page_Forms/Loader"
import CheckBox from "../../Components/Page_Forms/CheckBox"

function Add_Room() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [searched, setSearched] = useState(false)

    const [roomList, setRoomList] = useState([
        { Id: 1, Name: "Room 01", Total: 30, IsHostel: true },
        { Id: 2, Name: "Room 02", Total: 25, IsHostel: false },
    ])

    const [searchRoom, setSearchRoom] = useState("")
    const [editRoomId, setEditRoomId] = useState(0)

    const [roomName, setRoomName] = useState("")
    const [totalStudent, setTotalStudent] = useState("")
    const [isHostel, setIsHostel] = useState(false)
    const [roomError, setRoomError] = useState("")

    const columns = [
        { header: "Room Name", shortHeader: "Room", accessor: "Name" },
        { header: "Hostel", shortHeader: "Hostel", accessor: "IsHostel" },
    ]

    // =================== FILTER ===================
    const filteredRooms = roomList.filter(item =>
        item.Name?.toLowerCase().includes(searchRoom.toLowerCase())
    )

    // =================== EDIT ===================
    const handleEdit = (row) => {
        setEditRoomId(row.Id)
        setRoomName(row.Name)
        setTotalStudent(row.Total)
        setIsHostel(row.IsHostel)
        setDialogTitle("Edit")
        setOpen(true)
    }

    // =================== SAVE ===================
    const handleSave = () => {
        if (!roomName.trim()) {
            setRoomError("Room name is required")
            return
        }

        setSearched(true)

        setTimeout(() => {
            if (editRoomId) {
                setRoomList(prev =>
                    prev.map(item =>
                        item.Id === editRoomId
                            ? {
                                  ...item,
                                  Name: roomName,
                                  Total: totalStudent,
                                  IsHostel: isHostel,
                              }
                            : item
                    )
                )
            } else {
                setRoomList(prev => [
                    ...prev,
                    {
                        Id: Date.now(),
                        Name: roomName,
                        Total: totalStudent,
                        IsHostel: isHostel,
                    },
                ])
            }

            setOpen(false)
            setEditRoomId(0)
            setRoomName("")
            setTotalStudent("")
            setIsHostel(false)
            setRoomError("")
            setSearched(false)
        }, 500)
    }

    // =================== DELETE ===================
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this room?")
        if (!confirmDelete) return

        setRoomList(prev => prev.filter(item => item.Id !== id))
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">

            <Loader show={searched} />

            <div className="w-full flex justify-between mb-5">
                <Heading label={"Room Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        setRoomName("")
                        setTotalStudent("")
                        setIsHostel(false)
                        setEditRoomId(0)
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-3xl sm:h-[280px]"}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                    <FormInput
                        label={"Room No."}
                        placeholder={"Enter Room No."}
                        value={roomName}
                        error={roomError}
                        onChange={(e) => {
                            setRoomName(e.target.value)
                            if (roomError) setRoomError("")
                        }}
                    />

                    <FormInput
                        label={"Total Student"}
                        placeholder={"Enter Total Student"}
                        value={totalStudent}
                        onChange={(e) => setTotalStudent(e.target.value)}
                    />

                    <CheckBox
                        label={"Hostel Room"}
                        labelClass="text-[16px] "
                        checked={isHostel}
                        onChange={(e) => setIsHostel(e.target.checked)}
                    />
                </div>

                <div className="flex justify-end gap-3 ">
                    <Buttons label={"Cancel"} click={() => setOpen(false)} />
                    <Buttons label={"Save"} click={handleSave} />
                </div>
            </Dialog>

            {/* ================= SEARCH ================= */}
            <div className="w-full md:w-4xl">
                <FormInput
                    label={"Room"}
                    placeholder={"Search Room"}
                    value={searchRoom}
                    onChange={(e) => setSearchRoom(e.target.value)}
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
                        data={filteredRooms}
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

export default Add_Room
