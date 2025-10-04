import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Options from '../../../Components/Page_Forms/Options';
import Table from '../../../Components/Page_Forms/Table';

function Ledger_Details() {
    const navigate = useNavigate()    
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "rdate" },
        { header: "Receipt No.", shortHeader: "Receipt No.", accessor: "receipt" },
        { header: "Voucher Type", shortHeader: "Voucher Type", accessor: "type" },
        { header: "Particular/Narration", shortHeader: "Narration", accessor: "nar" },
        { header: "Debit", shortHeader: "Debit", accessor: "tot" },
        { header: "Credit", shortHeader: "Credit", accessor: "dis" },
        { header: " Balance", shortHeader: "Balance", accessor: "net" },
    ];
            
    const data = [
        { id: 1, rdate: "26-may-2024", receipt:"221", type:"111",nar:"Cash", tot:"40,000", dis:"5,000", net:"35,000" },
        { id: 2, rdate: "10-Dec-2023", receipt:"222", type:"112",nar:"Cash", tot:"40,000", dis:"5,000", net:"35,000" },
        { id: 3, rdate: "03-feb-2024", receipt:"223", type:"113",nar:"Cash", tot:"40,000", dis:"5,000", net:"35,000" },
        { id: 4, rdate: "10-Dec-2025", receipt:"224", type:"114",nar:"Cash", tot:"40,000", dis:"5,000", net:"35,000" },
        { id: 5, rdate: "01-jan-2024", receipt:"225", type:"115",nar:"Cash", tot:"40,000", dis:"5,000", net:"35,000" },
    ];
            
    // ✅ helper: remove commas before parsing
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;
            
    // 👉 Calculate totals here
    const totals = data.reduce(
        (acc, row) => {
            acc.tot += parseAmount(row.tot);
            acc.dis += parseAmount(row.dis);
            return acc;
        },
        { tot: 0, dis: 0, }
    );
            
    // 👉 Add a footer row
    const dataWithFooter = [
        ...data,
        {
            rdate: "TOTAL",
            tot: totals.tot.toLocaleString(),
            dis: totals.dis.toLocaleString(),
            isFooter: true,
        },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Due Report"} />
                <Buttons click={""} label={"Send SMS"} />
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"Ledger Name"} type='Enter Ledger Name' />
                <Options label={"Ledger"} optionMsg="Select Month" options={["Tution Fee", "Bus Fee", "Addmission Fee", "Hostel Fee",]}/>
                <FormInput label={"From"} type='date' />
                <FormInput label={"To"} type='date' />
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={""} label={"Search"} />
            </div>

            <Table columns={columns} data={dataWithFooter} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
            />

            <div className="flex justify-center sm:justify-end mt-5">
                <Buttons click={""} label={"Clear"} />
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Ledger_Details