import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table';
import CheckBox from '../../../Components/Page_Forms/CheckBox';

function Employee_Detail() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Code", shortHeader: "Code", accessor: "code" },
        { header: "Employee", shortHeader: "Employee", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Address", shortHeader: "Address", accessor: "add", 
            cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
        },
        { header: "Mobile", shortHeader: "Mobile", accessor: "no" },
        { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
        { header: "Join Date", shortHeader: "Join Date", accessor: "date" },
        { header: "Department", shortHeader: "Department", accessor: "dep" },
    ]
    const data = [
        { id: 1, code:"01", name: "KA", no:"1234567890", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", dob:"12-jun-2025", date:"15-aug-2025", dep:"Employee" },
        { id: 2, code:"02", name: "KA", no:"1234567890", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", dob:"12-jun-2025", date:"15-aug-2025", dep:"Employee" },
    ];
        return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Basic Salary Process Master"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Month"} optionMsg="Select Month" options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
                <Options label={"Year"} optionMsg="Select Year" options={["2022", "2023", "2024", "2025"]} />
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("/")} label={"Search"} />
            </div>

            <Table 
                columns={columns} 
                data={data} 
                onRowSelect={() => {}} 
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>)}
            />
             <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Clear"}/>
            </div>
        </div>
    )
}

export default Employee_Detail