import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import RadioButton from '../../Components/Page_Forms/RadioButton'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function Event_SMS() {
    const [selected, setSelected] = useState("option1");
    const columns = [        
        { header: "Employee Code",  shortHeader: "Employee Code", accessor: "emp" },
        { header: "Name",  shortHeader: "Name", accessor: "name" },
        { header: "Father Name",  shortHeader: "Father Name", accessor: "fname" },
        { header: "Mother Name",  shortHeader: "Mother Name", accessor: "mname" },
        { header: "Class",  shortHeader: "Class", accessor: "class" },
        { header: "D.O.B.",  shortHeader: "D.O.B.", accessor: "dob" },
        { header: "Join Date",  shortHeader: "Join Date", accessor: "join" },
        { header: "Address",  shortHeader: "Address", accessor: "add" },
        { header: "Mobile Number",  shortHeader: "Mobile Number", accessor: "num" },
    ]
    const data = [
        { id: 1, emp:"123", name:"Akash Singh Chopra", fname:"Ajay Singh", mname:"Divya", class:"Nur", dob:"10/05/2020", join:"13/09/2021", add:"adffg", num:"1234567890" },
        { id: 2, emp:"1234", name:"Rahul Citra", fname:"Devesh", mname:"Kavita", class:"Nur", dob:"13/09/2021", join:"24/11/2022", add:"gfhgf", num:"1234567890" },
        { id: 3, emp:"123456", name:"Amar Singh", fname:"Kartik", mname:"Sreya", class:"Nur", dob:"10/05/2020", join:"13/09/2021", add:"ghcng", num:"1234567890" },
        { id: 4, emp:"123456789", name:"Devender tripathi", fname:"Lokesh", mname:"Deepa", class:"Nur", dob:"24/04/2023", join:"13/09/2024", add:"hgvcj", num:"1234567890" },
        { id: 5, emp:"554", name:"Devandu upadhya", fname:"Shubhash", mname:"Jaya", class:"Nur", dob:"10/05/2020", join:"15/07/22", add:"cfhgrd", num:"1234567890" },
    ];
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"Pay Fees"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <RadioButton label="Student" name="example" value="option1" checked={selected === "option1"} 
                    onChange={(e) => setSelected(e.target.value)}
                />
                <RadioButton label="Teacher" name="example" value="option2" checked={selected === "option2"}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <div className="flex">
                    <h2 className="cursor-default text-md font-medium mb-1 text-gray-700">SMS Balance :</h2>
                    <div className="pl-2">0</div>
                </div>
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Serial Number"} placeholder={" Enter Serial Number"}/>
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <Options label={"Template"} name={""} optionMsg="Select Template" options={["Leave1", "Leave2", "Leave3"]}/>
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>
            <div className='mt-5'>
                <Table columns={columns} data={data} />
            </div>
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Send SMS"}/>
            </div>
        </div>
    )
}

export default Event_SMS