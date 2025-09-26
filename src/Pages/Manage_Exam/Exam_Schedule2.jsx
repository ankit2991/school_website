import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function Exam_Schedule2() {
    const  [agree, setAgree] = useState(false)
    const columns = [
        { header: "Subject",  shortHeader: "Subject", accessor: "sub" },
        { header: "Exam Type",  shortHeader: "Exam Type", accessor: "exam" },
        { header: "Exam Date", shortHeader: "Exam Date", accessor: "date" },
        { header: "Start Time", shortHeader: "Start Time", accessor: "start" },
        { header: "End Time", shortHeader: "End Time", accessor: "end" },
        
    ]
    const data = [
        { id: 1, sub: "Hindi", exam: "Unit Test", date: "01/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
        { id: 2, sub: "English", exam: "Unit Test", date: "05/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
        { id: 3, sub: "Envirolment Studies", exam: "Unit Test", date: "10/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
        { id: 4, sub: "General Knowledge", exam: "Unit Test", date: "15/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
        { id: 5, sub: "Maths", exam: "Unit Test", date: "18/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
        { id: 6, sub: "Science", exam: "Unit Test", date: "20/09/2025", start: "08:30 A.M.", end: "01:00 P.M." },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Heading style={"mb-5"} label={
                <>
                    <span className="block sm:hidden">Exam Schedule</span>
                    <span className="hidden sm:block">Exam Schedule (Exam Time Table)</span>
                </>
            }/>
            <div className="w-full mb-5">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-2 md:gap-x-6 items-center mb-6">
                    {/* Fixed first column */}
                    <CheckBox label={"Supplementary"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                         checked={agree} onChange={(e) => setAgree(e.target.checked)}
                    />
                    {/* Second column: takes full remaining space */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                        <Options label={"Exam"} name={""} optionMsg="Select Exam" options={["Unit Test", "Yearly Exam", "Annual Exam"]}/>
                        <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-6 mb-5">
                    {/* First two columns = Start Date + End Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormInput label={"Start Date"} type="date" />
                        <FormInput label={"End Date"} type="date" />
                    </div>
                    {/* Last column expands */}
                    <FormInput label={"Remark"} placeholder={"Enter Remark"} />
                </div>
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

export default Exam_Schedule2