import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Table from '../../../Components/Page_Forms/Table'

function Hostel_Due_Fees() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
        { header: "Room No.", shortHeader: "Room No.", accessor: "no" },
        { header: "Total Fees", shortHeader: "Total Fees", accessor: "tot" },
        { header: "Deposit Fees", shortHeader: "Deposit Fees", accessor: "dep" },
        { header: "Due Fees", shortHeader: "Due Fees", accessor: "due" },
    ];
    const data = [
        { id: 1, serial: "01", name: "Ajay", class: "Nur", fname: "Rman Thakur",  fno: "1234567890", no:"2", tot:"1400", dep:"100", due:"300" },
        { id: 2, serial: "02", name: "Ajay", class: "Nur", fname: "Rman", fno: "1234567540", no:"1", tot:"1000", dep:"500", due:"500" },
        { id: 3, serial: "03", name: "Viren", class: "Nur", fname: "Devanh Bhalla",  fno: "1234567890", no:"5", tot:"1800", dep:"600", due:"200" },
        { id: 4, serial: "04", name: "anuj", class: "Nur", fname: "aditya", fno: "1234567890", no:"6", tot:"1000", dep:"500", due:"500" },
        { id: 5, serial: "05", name: "somya", class: "Nur", fname: "Devanh",  fno: "1234567867", no:"7", tot:"1900", dep:"500", due:"400" },
    ];
    // ✅ helper: remove commas before parsing
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;
        
    // 👉 Calculate totals here
    const totals = data.reduce(
        (acc, row) => {
            acc.due += parseAmount(row.due);
            return acc;
        },
        { due: 0 }
    );
    
    // 👉 Add a footer row
    const dataWithFooter = [
        ...data,
        {
            serial: "TOTAL",
            due: totals.due.toLocaleString(),
            isFooter: true,
        },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Hostel Due Report"}  />
                <Buttons click={""} label={"Send SMS"} style='whitespace-nowrap h-10'/>
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full ">
                <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <Options label={"Month"} optionMsg="Select Month" options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
            </div>
            
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
                <Buttons click={""} label={"Clear"} />
                <Buttons click={""} label={"Search"} />
            </div>

            <Table columns={columns} data={dataWithFooter} onRowSelect={() => {}} disableFloatingRow={false} 
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

export default Hostel_Due_Fees