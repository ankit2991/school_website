import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import CheckBox from '../../../Components/Page_Forms/CheckBox'

function Student_TC_Details() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Sr. No.", shortHeader: "Sr. No.", accessor: "sr" },
        { header: "T.C. No.", shortHeader: "T.C. No.", accessor: "tc" },
        { header: "Issue Date", shortHeader: "Issue Date", accessor: "date" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
        { header: "Caste", shortHeader: "Caste", accessor: "caste" },
        { header: "Addmission Date", shortHeader: "Addmission Date", accessor: "adate" },
        { header: "Address", shortHeader: "Address", accessor: "add",
            cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
        },
        { header: "Father No.", shortHeader: "Father No", accessor: "fno" },
    ];
    const data = [
        { id: 1, sr: "01", tc:"121", date: "26-may-2024", name: "Ajay", fname: "Rman Thakur", class: "Nur", dob:"12-feb-2021", caste:"Gen", adate:"11-june-2023", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", fno: "1234567890", },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Student T.C. Details"} />
                <Buttons click={() => navigate("")} label={"Print"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <FormInput label={"Serial No."} placeholder={"Enter Serial No."} />
                <FormInput label={"Name"} placeholder={"Enter Name"} />
            </div>

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>)}
            />

            

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Student_TC_Details