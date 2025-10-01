import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Table from '../../Components/Page_Forms/Table'
import CheckBox from '../../Components/Page_Forms/CheckBox'

function User_SMS() {
    const navigate = useNavigate()
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const [agree, setAgree] = useState(false)
    const columns = [
        { header: "Id",  shortHeader: "Id", accessor: "ident" },
        { header: "Sr. No.",  shortHeader: "Sr. No.", accessor: "sr" },
        { header: "Name",  shortHeader: "Name ", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "User Id",  shortHeader: "User Id", accessor: "user" },
        { header: "User Pass",  shortHeader: "User Pass", accessor: "pass" },
        { header: "Addmission Date",  shortHeader: "Addmission Date", accessor: "date" },
        { header: "Father Mobile No.",  shortHeader: "Mobile No.", accessor: "no" },
    ]
    const data = [
        { id: 1, ident: "10", sr: "5",name:"Akash Singh Chopra", fname:"Devandu", mname:"Shreya", class:"Nur", user:"1", pass:"123456", date: "11/03/2025", no:"1234567890"},
        { id: 2, ident: "5", sr: "9",name:"Rahul Citra", fname:"Sanjay", mname:"Priya", class:"Nur", user:"3", pass:"123456", date: "13/04/2025", no:"1234567890"},
        { id: 3, ident: "8", sr: "2", name:"Amar Singh", fname:"Devender", mname:"Kiya", class:"Nur", user:"6", pass:"123456", date: "20/04/2025", no:"1234567890"},
        { id: 4, ident: "2", sr: "25", name:"Devender tripathi", fname:"Rahul", mname:"Teena", class:"Nur", user:"2", pass:"123456", date: "25/05/2025", no:"1234567890"},
        { id: 5, ident: "6", sr: "36", name:"Devandu upadhya", fname:"Amar", mname:"Shalini", class:"Nur", user:"7", pass:"123456", date: "29/05/2025", no:"1234567890"},
        { id: 6, ident: "7", sr: "12", name:"Sanjay", fname:"Akash", mname:"Sonam", class:"Nur", user:"9", pass:"123456", date: "04/07/2025", no:"1234567890"},
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"User SMS Sending"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
                <div className="flex sm:mt-9">
                    <h2 className="cursor-default text-md font-medium mb-1 text-gray-700">SMS Balance :</h2>
                    <div className="pl-2">0</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-3 mb-5 w-full"><FormInput label={"Message"} placeholder={"Enter Message "} /></div>

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table 
                columns={columns} 
                data={data} 
                onRowSelect={() => {}} 
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>)}
            />
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Send"}/>
            </div>
             {/* ✅ Dynamic div for spacing */}
            {/* {rowDetailOpen && <div className='h-100'></div>} */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-100'></div>}

        </div>
    )
}

export default User_SMS