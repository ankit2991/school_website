import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Table from '../../Components/Page_Forms/Table'

function Assign_Roll_No() {    
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)    
    const columns = [
        { header: "Enrollment Number",  shortHeader: "Enrollment No.", accessor: "enroll" },
        { header: "Name",  shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mobile Number", shortHeader: "Mobile", accessor: "mobile" },
        { header: "Roll Number", shortHeader: "Roll No.", accessor: "roll" },
        
    ]
    const data = [
        { id: 1, enroll: "001", name: "Naman Dhir", fname: "Rakesh Dhir", mobile: "1234567890", roll: "1" },
        { id: 2, enroll: "002", name: "Rajeev Sukhla", fname: "Mohan Sukhla", mobile: "1234567890", roll: "2" },
        { id: 3, enroll: "003", name: "Goutam Gandhi", fname: "Vaibhan Gandhi", mobile: "1234567890", roll: "3" },
        { id: 4, enroll: "004", name: "Vishal Mishra", fname: "Shorya Mishra", mobile: "1234567890", roll: "4" },
        { id: 5, enroll: "005", name: "Ajay Dev", fname: "Prem Dev", mobile: "1234567890", roll: "5" },
        { id: 6, enroll: "005", name: "Priya Iyer", fname: "Sreyas Iyer", mobile: "1234567890", roll: "6" },
    ];
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
        <Heading label={"Exam Master"} style={"mb-5"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">
            <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
            <FormInput label={"Start Number"} placeholder={"Enter  Start No. "} />
        </div>
        <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
            <CheckBox label={"Allocate Serial No. Wise"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                    
        </div>
        <div className="flex justify-end mb-5">
            <Buttons click={() => navigate("")} label={"Search"} />
        </div>
        <div className="flex items-center mb-5">
            <Table columns={columns} data={data}/>
        </div>
        <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 ">
            <Buttons label={"Cancel"}/>
            <Buttons label={"Save"}/>
        </div>
    </div>
  )
}

export default Assign_Roll_No