import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table';
import CheckBox from '../../../Components/Page_Forms/CheckBox';

function Salary_Process() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Code", shortHeader: "Code", accessor: "code" },
        { header: "Employee", shortHeader: "Employee", accessor: "name" },
        { header: "Mobile", shortHeader: "Mobile", accessor: "no" },
        { header: "Basic Salary", shortHeader: "Basic Salary", accessor: "bsal" },
        { header: "Leave", shortHeader: "Leave", accessor: "leave" },
        { header: "Holidays", shortHeader: "Holidays", accessor: "holi" },
        { header: "Total Days", shortHeader: "Total Days", accessor: "tot" },
        { header: "Emp Work Day", shortHeader: "Emp Work Day", accessor: "emp" },
        { header: "Month Salary", shortHeader: "Month Salary", accessor: "mon" },
        { header: "Late Deducation", shortHeader: "Late Deducation", accessor: "late" },
        { header: "G Salary", shortHeader: "G Salary", accessor: "gsal" },
        { header: "HRA", shortHeader: "HRA", accessor: "hra" },
        { header: "TA", shortHeader: "TA", accessor: "ta" },
        { header: "DA", shortHeader: "DA", accessor: "da" },
        { header: "Incentive", shortHeader: "Incentive", accessor: "inc" },
        { header: "PF", shortHeader: "PF", accessor: "pf" },
        { header: "ESI Employee", shortHeader: "ESI Employee", accessor: "esi" },
        { header: "ESI Employer", shortHeader: "ESI Employer", accessor: "esiemp" },
        { header: "Salary", shortHeader: "Salary", accessor: "sal" },
    ]
    const data = [
        { id: 1, code:"01", name: "KA", no:"1234567890", bsal:"10,000", leave:"10", hol:"7", tot:"30", emp:"26", mon:"5000", late:"200", gsal:"4000", hra:"2", ta:"3", da:"5", inc:"400", pf:"", esi:"", esiemp:"", sal:"30000" },
        { id: 2, code:"02", name: "KA", no:"1234567890", bsal:"10,000", leave:"10", hol:"7", tot:"30", emp:"26", mon:"5000", late:"200", gsal:"4000", hra:"2", ta:"3", da:"5", inc:"400", pf:"", esi:"", esiemp:"", sal:"30000" },
    ];
        return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Basic Salary Process Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/")} label={"Add"} style='whitespace-nowrap h-10'/>                    
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
        </div>
    )
}

export default Salary_Process