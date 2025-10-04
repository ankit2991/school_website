import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import FormInput from '../../../Components/Page_Forms/FormInput';
import CheckBox from '../../../Components/Page_Forms/CheckBox';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Components/Page_Forms/Table';

function Profit_And_Loss() {
    const navigate = useNavigate()    
    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Debit", shortHeader: "Debit", accessor: "dr" },
        { header: "Debit Amount", shortHeader: "Debit Amount", accessor: "dramt" },
        { header: "Credit", shortHeader: "Credit", accessor: "cr" },
        { header: "Credit Amount", shortHeader: "Credit Amount", accessor: "cramt" },
    ];
            
    const data = [
        { id: 1, dr:"Addmission Fee", dramt:"35,000", cr:"Food Fee", cramt:"5000" },
        { id: 2, dr:"Hostel Fee", dramt:"25,000", cr:"Addmission Fee", cramt:"2000" },
        { id: 3, dr:"Tution Fee", dramt:"135,000", cr:"Book Fee", cramt:"1000" },
        { id: 4, dr:"Food Fee", dramt:"35,000", cr:"Tution Fee", cramt:"135,000" },
        { id: 5, dr:"Book Fee", dramt:"43,000", cr:"Hostel Fee", cramt:"35,000" },
    ];
            
    // ✅ helper: remove commas before parsing
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;
            
    // 👉 Calculate totals here
    const totals = data.reduce(
        (acc, row) => {
            acc.dramt += parseAmount(row.dramt);
            acc.cramt += parseAmount(row.cramt);
            return acc;
        },
        { dramt: 0, cramt: 0, }
    );
            
    // 👉 Add a footer row
    const dataWithFooter = [
        ...data,
        {
            dr: "TOTAL",
            dramt: totals.dramt.toLocaleString(),
            cramt: totals.cramt.toLocaleString(),
            isFooter: true,
        },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Profit And Loss"}  />
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full ">
                <FormInput label={"Date"} type='date' />
                <div className="flex mt-8">
                    <CheckBox label={"Consolated"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
            </div>
            
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
                <Buttons click={""} label={"Clear"} />
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

export default Profit_And_Loss