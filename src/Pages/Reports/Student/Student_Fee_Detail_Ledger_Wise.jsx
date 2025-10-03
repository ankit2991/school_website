import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import { useNavigate } from 'react-router-dom'

function Student_Fee_Detail_Ledger_Wise() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    
    const columns = [
        { header: "Id", shortHeader: "Id", accessor: "iD" },
        { header: "Receipt No.", shortHeader: "Receipt No.", accessor: "receipt" },
        { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "rdate" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mobile No.", shortHeader: "Mobile No.", accessor: "fno" },
        { header: "Narration", shortHeader: "Narration", accessor: "nar" },    
        { header: "Total Amount", shortHeader: "Total Amount", accessor: "tot" },
    ];

    const data = [
        { id: 1, iD:"111", receipt:"221", rdate: "26-may-2024", class: "Nur", serial: "01", name: "Ajay", fname: "Rman Thakur",  fno: "1234567890", nar:"cash", tot:"40,000", },
        { id: 2, iD:"112", receipt:"222", rdate: "10-Dec-2023", class: "Nur", serial: "02", name: "Ajay", fname: "Rman", fno: "1234567540", nar:"cash", tot:"40,000", },
        { id: 3, iD:"113", receipt:"223", rdate: "03-feb-2024", class: "Nur", serial: "03", name: "Viren", fname: "Devanh Bhalla",  fno: "1234567890", nar:"cash", tot:"40,000", },
        { id: 4, iD:"114", receipt:"224", rdate: "10-Dec-2025", class: "Nur", serial: "04", name: "anuj", fname: "aditya", fno: "1234567890", nar:"cash", tot:"40,000", },
        { id: 5, iD:"115", receipt:"225", rdate: "01-jan-2024", class: "Nur", serial: "05", name: "somya", fname: "Devanh",  fno: "1234567867", nar:"cash", tot:"40,000", },
    ];

    // ✅ helper: remove commas before parsing
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;

    // 👉 Calculate totals here
    const totals = data.reduce(
        (acc, row) => {
            acc.tot += parseAmount(row.tot);            
            return acc;
        },
        { tot: 0, dis: 0, net: 0 }
    );

    // 👉 Add a footer row
    const dataWithFooter = [
        ...data,
        {
            id: "total-row",
            iD: "TOTAL",
            receipt: "",
            rdate: "",
            class: "",
            serial: "",
            name: "",
            fname: "",
            fno: "",
            nar: "",   // label in narration column
            tot: totals.tot.toLocaleString(),
            
            isFooter: true,
        },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Student Attendance Report"} />
                <Buttons click={""} label={"Print"} />
            </div>

            <div className="flex flex-col sm:flex-row gap-x-6 mb-5 w-full">
                <div className="w-full sm:flex-1">
                    <Options label={"Institute"} optionMsg="Select Option" options={["Kesharam Memorial Manakchand Public School", "KMMPS",]} />
                </div>
                <div className="w-full sm:w-80">
                    <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Ledger"} optionMsg="Select Month" options={["Tution Fee", "Bus Fee", "Addmission Fee", "Hostel Fee",]}/>
                <FormInput label={"From"} type='date' />
                <FormInput label={"To"} type='date' />
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={""} label={"Search"} />
            </div>

            <Table columns={columns} data={dataWithFooter} onRowSelect={() => {}} disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
                actions={(row) => 
                    !row.isFooter && ( // 🚫 hide checkbox for total row
                        <CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    )
                }
            />
            
            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Student_Fee_Detail_Ledger_Wise