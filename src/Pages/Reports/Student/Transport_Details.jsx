import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Buttons from '../../../Components/Page_Forms/Buttons';
import Table from '../../../Components/Page_Forms/Table';
import { useNavigate } from 'react-router-dom';



function Transport_Details() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mobile No.", shortHeader: "Mobile No.", accessor: "fno" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Route Name", shortHeader: "Route Name", accessor: "route" },    
        { header: "Vehicle Stop", shortHeader: "Vehicle Stop", accessor: "stop" },
        { header: "Amount", shortHeader: "Amount", accessor: "amount" },
        { header: "Vehicle Type", shortHeader: "Vehicle Type", accessor: "type" },
        { header: "Vehicle No.", shortHeader: "Vehicle No.", accessor: "no" },
        { header: "Join Date", shortHeader: "Join Date", accessor: "jdate" },
    ];
    const data = [
        { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur",  fno: "1234567890", class: "Nur", route:"Jal Jog Circle", stop:"School", amount:"40,000", type:"Taxi", no:"RJ 19 ED 2534", jdate: "26-may-2024", },
        { id: 2, serial: "02", name: "Ajay", fname: "Rman", fno: "1234567540", class: "Nur", route:"Shastri Nagar", stop:"School", amount:"40,000", type:"Van", no:"RJ 19 FY 7856", jdate: "10-Dec-2023", },
        { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla",  fno: "1234567890", class: "Nur", route:"Sardarpura", stop:"School", amount:"40,000", type:"Tata Magic", no:"RJ 19 SC 9078", jdate: "03-feb-2024", },
        { id: 4, serial: "04", name: "anuj", fname: "aditya", fno: "1234567890", class: "Nur", route:"Ratanada", stop:"School", amount:"40,000", type:"Bus", no:"RJ 19 RG 3244", jdate: "10-Dec-2025", },
        { id: 5, serial: "05", name: "somya", fname: "Devanh",  fno: "1234567867", class: "Nur", route:"Paota", stop:"School", amount:"40,000", type:"Taxi", no:"RJ 19 HR 8654", jdate: "01-jan-2024", },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Transport Details"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <Options label="Vehicle Number" name="" optionMsg="Select Vehicle No." options={["RJ19 DF 1245", "RJ19 SE 7309", "RJ19 YD 6010"]}/>
                <Options label="Search By" name="" optionMsg="Select name, etc." options={["Name", "Sr. No.", ]}/>
                <FormInput label={"From"} placeholder={"Enter Option"} />
            </div>

           
            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
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

export default Transport_Details