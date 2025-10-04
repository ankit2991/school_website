import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'

function Marksheet() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "ID", shortHeader: "ID", accessor: "iD" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Enrollment No.", shortHeader: "Enrollment No.", accessor: "enroll" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
        { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
        { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
        { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },       
        { header: "Room No.", shortHeader: "Room No.", accessor: "room" },       
    ];
    const data = [
        { id: 1, iD: "01", name: "Ajay", enroll:"111", fname: "Rman Thakur",  mname:"Shreya", dob: "10-Dec-2022",fno: "1234567890", room:"5", roll:"101" },
        { id: 2, iD: "02", name: "Ajay", enroll:"112", fname: "Rman", mname:"Priya", dob: "01-jan-2021", fno: "1234567540", room:"6", roll:"102" },
        { id: 3, iD: "03", name: "Viren", enroll:"113", fname: "Devanh Bhalla",  mname:"Kiya", dob: "31-sep-2023", fno: "1234567890", room:"5", roll:"103" },
        { id: 4, iD: "04", name: "anuj", enroll:"115", fname: "aditya", mname:"Teena", dob: "26-may-2023", fno: "1234567890", room:"7", roll:"104" },
        { id: 5, iD: "05", name: "somya", enroll:"116", fname: "Devanh",  mname:"Shalini", dob: "03-feb-2022", fno: "1234567867", room:"2", roll:"105" },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Due Report"} />
                <Buttons click={""} label={"Clear"} />
            </div>
            {/* Ledger + Dates */}
            <div className="flex flex-col gap-y-3 mb-5 w-full">
                <CheckBox label={"Exam"} labelClass='text-[20px] ' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 ">
                    <CheckBox label={"Formative Assignment I"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment II"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment III"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"HalfYearly"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Yearly"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment IV"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Suppli. Exam"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"1st Semester"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full ">
                <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <div className="flex sm:mt-8">
                    <CheckBox label={"with Practical"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
                <FormInput label={"Date"} type='date' />
            </div>
            </div>
            
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
                <Buttons click={""} label={"Show"} />
                <Buttons click={""} label={"Show Marks"} />
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} actions={(row) => 
                    !row.isFooter && (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                )}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label={"Print"} />
                    <Buttons label={"Final Marks Sheet"} />
                </div>
                <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label={"Green Sheet Download"} />
                </div>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

        </div>
    )
}

export default Marksheet