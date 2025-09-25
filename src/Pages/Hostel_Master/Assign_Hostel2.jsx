import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function Assign_Hostel2() {
    const  [agree, setAgree] = useState(false)
    const columns = [
        { header: "Name ",  shortHeader: "Name", accessor: "name" },
        { header: "Serial Number", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Room Number", shortHeader: "Room No.", accessor: "room" },
        { header: "Amount", shortHeader: "Amount", accessor: "amount" },
        { header: "Join Date", shortHeader: "Join Date", accessor: "join" },
        { header: "Stop Date", shortHeader: "Stop Date", accessor: "stop" },
        { header: "Is Active", shortHeader: "Is Active", accessor: "active" },
        { header: "Hostel Provider", shortHeader: "Hostel Provider", accessor: "provider" },
    ]

    const data = [
        { id: 2, name: "Ajay", serial: "23", room:"1", amount:"5000 Rs.", join:"01/05/2025", stop:"01/05/2026", active:"Yes", provider:"Apna Ghar", },
        { id: 3, name: "Viren", serial: "02", room:"2", amount:"5000 Rs.", join:"01/06/2025", stop:"01/05/2026", active:"Yes", provider:"Baba Boys Hostel", },
       
    ];
    
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"Assign Hostel"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Sr. No."} placeholder={" Enter Serial No."}/>
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"}/>
                <FormInput label={"Join Date"} type='date'/>
                <FormInput label={"Room Number"} placeholder={" Enter Room Number"}/>
                <Options label={"Hostel Provider"} name={""} optionMsg="Select Hostel Provider" options={["Apna Ghar", "Radha Girls Hostel", "Baba Boys Hostel"]}/>
                <FormInput label={"Stop Date"} type='date'/>                
                <FormInput label={"Previous Due"} placeholder={"Enter Previous Due"}/>
                <FormInput label={"Discount"} placeholder={"Enter Discount"}/>
                <FormInput label={"Cost"} placeholder={"Enter Cost"}/>                
            </div>
            <div className="w-full gap-6 mb-5 grid grid-cols-1 ">                
                <CheckBox label={"Is Active"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                    
                <FormInput label={"Remark"} placeholder={"Enter Remark"}/>                
            </div>
            <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '>
                <Table columns={columns} data={data}/>               
            </div>           
        
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Assign_Hostel2