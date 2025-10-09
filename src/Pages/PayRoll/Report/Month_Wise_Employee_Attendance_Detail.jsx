 import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput'

function Month_Wise_Employee_Attendance_Detail() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Attendance Time", shortHeader: "Attendance Time", accessor: "time" },
        { header: "Login1 Time", shortHeader: "Login1 Time", accessor: "login" },
        { header: "Logout2 Time", shortHeader: "Logout2 Time", accessor: "logout" },
        { header: "Total Work", shortHeader: "Total Work", accessor: "tot" },
        { header: "Days Name", shortHeader: "Days Name", accessor: "day" },
    ]
    const data = [
        { id: 1, time:"01-sep-2025", login:"10:00 A.M.", logout:"07:00 P.M.", tot:"09 Hours", day:"Thrusday" },
        { id: 2, time:"01-sep-2025", login:"10:00 A.M.", logout:"07:00 P.M.", tot:"09 Hours", day:"Thrusday" },
    ];
        return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Employee Month Wise Attendance Report"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Employee"} optionMsg="Select Employee Name" options={["Varun Yadav", "Arush"]} />
                <FormInput label={"Month"} type='month' />
            </div>
            
            {/* <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("/")} label={"Search"} />
            </div> */}

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Clear"}/>
            <Buttons click={() => navigate("/")} label={"Search"} /></div>
        </div>
    )
}

export default Month_Wise_Employee_Attendance_Detail