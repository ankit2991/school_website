import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Page_Forms/Table'

function Day_Summary_Book() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "date" },
        { header: "Fee Type", shortHeader: "Fee Type", accessor: "fee" },
        { header: "Amount", shortHeader: "Amount", accessor: "amt" },
    ];

    const data = [
        { id: 1, date: "01/04/2024", fee:"Addmission Fee", amt:"30,000", },
        { id: 2, date: "12/02/2025", fee:"Hostel Fee", amt:"30,000", },
        { id: 3, date: "03/06/2024", fee:"Transport Fee", amt:"30,000", },
        { id: 4, date: "04/03/2023", fee:"Tution Fee", amt:"30,000", },
        { id: 5, date: "05/11/2024", fee:"Hostel Fee", amt:"30,000", },
    ];
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Day Summary Report"} />
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"From"} type="date" />
                <FormInput label={"To"} type="date" />
                <div className="flex sm:mt-8">
                    <CheckBox label={"Consolated"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={""} label={"Search"} />
            </div>

            <Table
                columns={columns}
                data={data}
                onRowSelect={() => {}}
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}                
            />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
  )
}

export default Day_Summary_Book