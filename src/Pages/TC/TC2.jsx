import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function TC2() {
    const [agree, setAgree] = useState(false)
    const [paymentMode, setPaymentMode] = useState("");
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Class",  shortHeader: "Class", accessor: "class" },
        { header: "Addmission Date",  shortHeader: "Addmission", accessor: "adate" },
        { header: "Passing Date",  shortHeader: "Passing ", accessor: "pdate" },
        { header: "No of School Meeting", shortHeader: "School Meeting", accessor: "meeting" },
        { header: "No of Present", shortHeader: "Present", accessor: "present" },
        { header: "No of Student", shortHeader: "Student", accessor: "student" },
        { header: "Subject",  shortHeader: "Subject", accessor: "subject" },
        { header: "Result",  shortHeader: "Result", accessor: "result" },
        { header: "Session",  shortHeader: "Session", accessor: "session" },
    ]
    const data = [
        { id: 1, class: "10", adate: "11/03/2025", pdate: "06/02/2026", meeting: "5", present:"23", student:"35", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
        { id: 2, class: "5", adate: "13/04/2025", pdate: "16/06/2026", meeting: "9", present:"22", student:"32", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
        { id: 3, class: "8", adate: "20/04/2025", pdate: "10/07/2026", meeting: "2", present:"35", student:"43", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
        { id: 4, class: "2", adate: "25/05/2025", pdate: "23/06/2026", meeting: "25", present:"36", student:"37", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
        { id: 5, class: "Nur", adate: "29/05/2025", pdate: "02/04/2026", meeting: "36", present:"21", student:"32", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
        { id: 6, class: "prep", adate: "04/07/2025", pdate: "25/08/2026", meeting: "12", present:"12", student:"23", subject:"ALL SUBJECT", result:"PASS", session:"2021-2022", },
    ];
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"Transfer Certificate (T.C.)"}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"T.C. No."} placeholder={" Enter T.C. No."}/>
                <FormInput label={"Application Date"} type='date'/>
                <FormInput label={"Enrollment Number"} placeholder={"Enter Enrollment No."}/>
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"}/>
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6 mb-5">
                {/* First two columns = Start Date + End Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput label={"Date Of Birth"} type='date'/>
                    <FormInput label={"Admission Date"} type='date'/>
                </div>
                {/* Last column expands */}
                <FormInput label={"Last School"} placeholder={"Enter Last School Name"}/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Last Class"} placeholder={"Enter Last Class"}/>
                <FormInput label={"T.C. Date"} type='date'/>
                <Options label={"Promotion Higher Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Next Class"} placeholder={"Enter Next Class"}/>
                <Options label={"Religion"} name={""} optionMsg="Select Religion" options={["Hindu", "Christan", "Muslim"]}/>
                <FormInput label={"Caste"} placeholder={" Enter Caste"}/>
            </div>

            <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
                <FormInput label={"Other Remarks"} placeholder={" Enter Other Remarks"}/>
                <FormInput label={"Reason Of T.C."} placeholder={" Enter Reason"}/>
            </div>
            
            {/* <Table columns={columns} data={data}/> */}

             <Table 
                columns={columns} 
                data={data} 
                onRowSelect={() => {}} 
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
            />

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
             {/* ✅ Dynamic div for spacing */}
            {/* {rowDetailOpen && <div className='h-100'></div>} */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-100'></div>}

        </div>
    )
}

export default TC2