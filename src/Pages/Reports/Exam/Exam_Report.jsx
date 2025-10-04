import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Table from '../../../Components/Page_Forms/Table'

function Exam_Report() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "ID", shortHeader: "ID", accessor: "iD" },
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "English", shortHeader: "English", accessor: "eng" },
        { header: "Hindi", shortHeader: "Hindi", accessor: "hin" },
        { header: "Maths", shortHeader: "Maths", accessor: "mat" },
        { header: "Drawing", shortHeader: "Drawing", accessor: "dra" },
        { header: "Total Marks", shortHeader: "Total Marks", accessor: "tot" },
        { header: "Maximum Marks", shortHeader: "Maximum Marks", accessor: "max" },
        { header: "Per Marks", shortHeader: "Per Marks", accessor: "mks" },
        { header: "Grade", shortHeader: "Grade", accessor: "grd" },
        { header: "Remarks", shortHeader: "Remarks", accessor: "rmk" },
    ];
    const data = [
        { id: 1, iD:"111", serial: "01", name: "Ajay", eng:"5", hin:"7", mat:"9", dra:"3",tot:"24", max:"40", mks:"50", grd:"A+", rmk:"abcdfs"},
        { id: 2, iD:"112", serial: "02", name: "Ajay", eng:"5", hin:"7", mat:"9", dra:"3",tot:"24", max:"40", mks:"50", grd:"A+", rmk:"abcdfs"},
        { id: 3, iD:"113", serial: "03", name: "Viren", eng:"5", hin:"7", mat:"9", dra:"3",tot:"24", max:"40", mks:"50", grd:"A+", rmk:"abcdfs"},
        { id: 4, iD:"114", serial: "04", name: "anuj", eng:"5", hin:"7", mat:"9", dra:"3",tot:"24", max:"40", mks:"50", grd:"A+", rmk:"abcdfs"},
        { id: 5, iD:"116", serial: "05", name: "somya", eng:"5", hin:"7", mat:"9", dra:"3",tot:"24", max:"40", mks:"50", grd:"A+", rmk:"abcdfs"},
    ];
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Exam Report"}  />
                <Buttons click={""} label={"Print"} style='whitespace-nowrap h-10'/>
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full ">
                <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <Options label="Exam" name="" optionMsg="Select Vehicle No." options={["Unit Test", "Yearly Test", "Annual Exam"]}/>
                <div className="flex sm:mt-8">
                    <CheckBox label={"with Practical"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
            </div>
            
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
                <Buttons click={""} label={"Clear"} />
                <Buttons click={""} label={"Search"} />
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} actions={(row) => 
                    !row.isFooter && (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                )}
            />

            <div className="flex justify-between sm:justify-end sm:gap-x-5 mt-5">
                <Buttons click={""} label={"Summary Print"} />
                <Buttons click={""} label={"Print"} />
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

        </div>
    )
}

export default Exam_Report