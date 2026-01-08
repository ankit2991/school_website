import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table'
import CheckBox from '../../Components/Page_Forms/CheckBox'

function Delete_Receipt() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close

    const columns = [
        { header: "Receipt No.", shortHeader: "Receipt No.", accessor: "receipt" },
        { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "rdate" },
        { header: "Voucher Type", shortHeader: "Voucher Type", accessor: "type" },
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Student", shortHeader: "Student", accessor: "name" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Amount", shortHeader: "Amount", accessor: "amt" },
        { header: "Date Of Delete", shortHeader: "Date Of Delete", accessor: "del" },
    ];
    const data = [
        { id: 1,  receipt:"221", rdate: "26-may-2024", type:"School Fee", serial: "01", name: "Ajay", class: "Nur", amt:"40,000", del:"26-may-2024" },
        { id: 2,  receipt:"222", rdate: "10-Dec-2023", type:"School Fee", serial: "02", name: "Ajay", class: "Nur", amt:"40,000", del:"26-may-2024" },
        { id: 3,  receipt:"223", rdate: "03-feb-2024", type:"School Fee", serial: "03", name: "Viren", class: "Nur", amt:"40,000", del:"26-may-2024" },
        { id: 4,  receipt:"224", rdate: "10-Dec-2025", type:"School Fee", serial: "04", name: "anuj", class: "Nur", amt:"40,000", del:"26-may-2024" },
        { id: 5,  receipt:"225", rdate: "01-jan-2024", type:"School Fee", serial: "05", name: "somya", class: "Nur", amt:"40,000", del:"26-may-2024" },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Delete Receipt"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => { window.open("/pdf/6ExapenReportViewerpdf.pdf", "_blank"); }} label={"Print"} style='whitespace-nowrap h-10'/>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"From"} type='date' />
                <FormInput label={"To"} type='date' />
            </div>
            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} actions={(row) => 
                    !row.isFooter && (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                )}
            />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Delete_Receipt