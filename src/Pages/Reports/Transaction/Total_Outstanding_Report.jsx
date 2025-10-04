import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Options from '../../../Components/Page_Forms/Options'
import Table from '../../../Components/Page_Forms/Table'
import CheckBox from '../../../Components/Page_Forms/CheckBox'

function Total_Outstanding_Report() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
        { header: "School Fees", shortHeader: "School Fees", accessor: "tot" },
        { header: "Deposit Fees", shortHeader: "Deposit Fees", accessor: "dep" },
        { header: "Due Fees", shortHeader: "Due Fees", accessor: "due" },
        { header: "Transport Fees", shortHeader: "Transport Fees", accessor: "trans" },
        { header: "Deposit Transport", shortHeader: "Deposit Transport", accessor: "deptrans" },
        { header: "Transport Due", shortHeader: "Transport Due", accessor: "transdue" },
        { header: "Total Fees", shortHeader: "Total Fees", accessor: "totfee" },
        { header: "Total Due", shortHeader: "Total Due", accessor: "totdue" },
    ];
    const data = [
        { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur",  fno: "1234567890", tot:"10,000", dep:"1000", due:"9000", trans:"1000", deptrans:"500", transdue:"500", totfee:"11,000", totdue:"9500" },
        { id: 2, serial: "02", name: "Ajay", fname: "Rman", fno: "1234567540", tot:"10,000", dep:"500", due:"9500", trans:"1000", deptrans:"500", transdue:"500", totfee:"11,000", totdue:"10,000" },
        { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla",  fno: "1234567890", tot:"10,000", dep:"600", due:"9400", trans:"1000", deptrans:"500", transdue:"500", totfee:"11,000", totdue:"10,100" },
        { id: 4, serial: "04", name: "anuj", fname: "aditya", fno: "1234567890", tot:"10,000", dep:"500", due:"9500", trans:"1000", deptrans:"500", transdue:"500", totfee:"11,000", totdue:"10,000" },
        { id: 5, serial: "05", name: "somya", fname: "Devanh",  fno: "1234567867", tot:"10,000", dep:"500", due:"9500", trans:"1000", deptrans:"500", transdue:"500", totfee:"11,000", totdue:"10,000" },
    ];
    // ✅ helper: remove commas before parsing
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;
        
    // 👉 Calculate totals here
    const totals = data.reduce(
        (acc, row) => {
            acc.tot += parseAmount(row.tot);
            acc.dep += parseAmount(row.dep);
            acc.due += parseAmount(row.due);
            acc.trans += parseAmount(row.trans);
            acc.deptrans += parseAmount(row.deptrans);
            acc.transdue += parseAmount(row.transdue);
            acc.totfee += parseAmount(row.totfee);
            acc.totdue += parseAmount(row.totdue);
            return acc;
        },
        { tot: 0, dep: 0, due: 0, trans: 0, deptrans: 0, transdue: 0, totfee: 0, totdue: 0 }
    );
    
    // 👉 Add a footer row
    const dataWithFooter = [
        ...data,
        {
            serial: "TOTAL",
            tot: totals.tot.toLocaleString(),
            dep: totals.dep.toLocaleString(),
            due: totals.due.toLocaleString(),
            trans: totals.trans.toLocaleString(),
            deptrans: totals.deptrans.toLocaleString(),
            transdue: totals.transdue.toLocaleString(),
            totfee: totals.totfee.toLocaleString(),
            totdue: totals.totdue.toLocaleString(),
            isFooter: true,
        },
    ];
    return (
         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Total Outstanding Report"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={""} label={"Send SMS"} style='whitespace-nowrap h-10'/>
            </div>
            
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
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

export default Total_Outstanding_Report