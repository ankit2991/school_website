import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';

function Enquiry_Details() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Enquiry No.", shortHeader: "Enquiry No.", accessor: "en" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
        { header: "Address", shortHeader: "Address", accessor: "add",
                cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
            },
        { header: "Father No.", shortHeader: "Father No", accessor: "fno" },
    ];
    const data = [
        { id: 1, en: "01", name: "Ajay", fname: "Rman Thakur", mname:"Aradhya", class: "Nur", dob:"12-feb-2021", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", fno: "1234567890", },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Enquiry Details"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <Options label={"Search By"} name={""} optionMsg="Select Option" options={["Registered", "UnRegistered", "All"]} />
                <FormInput label={"Name"} placeholder={"Enter Name"} />
            </div>

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
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

export default Enquiry_Details