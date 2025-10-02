import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import { useNavigate } from 'react-router-dom'

function Transport_Fee_Details() {
        const navigate = useNavigate()    
        const [agree, setAgree] = useState(false)
        const [agree2, setAgree2] = useState(false)
        const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    
        const columns = [
            { header: "Id", shortHeader: "Id", accessor: "iD" },
            { header: "Receipt No.", shortHeader: "Receipt No.", accessor: "receipt" },
            { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "rdate" },
            { header: "Class", shortHeader: "Class", accessor: "class" },
            { header: "Vechile No.", shortHeader: "Vechile No.", accessor: "no" },
            { header: "Stop name", shortHeader: "Stop name", accessor: "stop" },
            { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
            { header: "Name", shortHeader: "Name", accessor: "name" },
            { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
            { header: "Mobile No.", shortHeader: "Mobile No.", accessor: "fno" },
            { header: "Total Amount", shortHeader: "Total Amount", accessor: "tot" },
            { header: "Discount Amount", shortHeader: "Discount Amount", accessor: "dis" },
            { header: "Net Amount", shortHeader: "Net Amount", accessor: "net" },
        ];
    
        const data = [
            { id: 1, iD:"111", receipt:"221", rdate: "26-may-2024", class: "Nur", no:"RJ19 CZ 2634", stop:"School", serial: "01", name: "Ajay", fname: "Rman Thakur",  fno: "1234567890", tot:"40,000", dis:"5,000", net:"35,000" },
            { id: 2, iD:"112", receipt:"222", rdate: "10-Dec-2023", class: "Nur", no:"RJ19 XZ 2874", stop:"School", serial: "02", name: "Ajay", fname: "Rman", fno: "1234567540", tot:"40,000", dis:"5,000", net:"35,000" },
            { id: 3, iD:"113", receipt:"223", rdate: "03-feb-2024", class: "Nur", no:"RJ19 AD 4655", stop:"School", serial: "03", name: "Viren", fname: "Devanh Bhalla",  fno: "1234567890", tot:"40,000", dis:"5,000", net:"35,000" },
            { id: 4, iD:"114", receipt:"224", rdate: "10-Dec-2025", class: "Nur", no:"RJ19 UB 2358", stop:"School", serial: "04", name: "anuj", fname: "aditya", fno: "1234567890", tot:"40,000", dis:"5,000", net:"35,000" },
            { id: 5, iD:"115", receipt:"225", rdate: "01-jan-2024", class: "Nur", no:"RJ19 KH 8756", stop:"School", serial: "05", name: "somya", fname: "Devanh",  fno: "1234567867", tot:"40,000", dis:"5,000", net:"35,000" },
        ];
    
        // ✅ helper: remove commas before parsing
        const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0;
    
        // 👉 Calculate totals here
        const totals = data.reduce(
            (acc, row) => {
                acc.tot += parseAmount(row.tot);
                acc.dis += parseAmount(row.dis);
                acc.net += parseAmount(row.net);
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
                dis: totals.dis.toLocaleString(),
                net: totals.net.toLocaleString(),
                isFooter: true,
            },
        ];
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Transport Fee Details"} />
                <Buttons click={() => navigate("")} label={"Print"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <div className="flex flex-col flex-1">
                    <label className="text-lg font-medium text-gray-700  mb-1 flex items-center gap-2">
                        Student Name
                        <CheckBox label={""} name={""} checkstyle={"mt-2"} checked={agree} onChange={(e) => setAgree(e.target.checked)} />                            
                    </label>
                    <Options label={""} name={""} optionMsg="Select Student Name" options={["Ajay", "Somya", "Anuj"]} />
                </div>
                <Options label="Vehicle Type" name="paymentMode" optionMsg="Select Vehicle Type" options={["Bus", "Taxi", "Van"]}/>
                <FormInput label={"Receipt No."} placeholder={"Enter Receipt No."} />
                <FormInput label={"From"} type="date" />
                <FormInput label={"To"} type="date" />
            </div>

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table
                columns={columns}
                data={dataWithFooter}
                onRowSelect={() => {}}
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
                actions={(row) =>
                    !row.isFooter && ( // 🚫 hide checkbox for total row
                        <CheckBox
                            label={""}
                            name={""}
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />
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

export default Transport_Fee_Details