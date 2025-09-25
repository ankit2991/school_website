import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function Assign_Vehicle2() {
    const  [agree, setAgree] = useState(false)
    const columns = [
        { header: "Join Date",  shortHeader: "Join", accessor: "join" },
        { header: "Pickup Time", shortHeader: "Pickup", accessor: "pickup" },
        { header: "Return Time", shortHeader: "Return", accessor: "return" },
        { header: "Route Name", shortHeader: "Route", accessor: "route" },
        { header: "Vehicle Stop", shortHeader: "Vehicle", accessor: "vehicle" },
        { header: "Vechile Type", shortHeader: "Type", accessor: "type" },
        { header: "Vechile Number", shortHeader: "Number", accessor: "no" },
    ]

    const data = [
        { id: 2, join: "20/02/2025", pickup: "07:00 A.M.", return:"01:00 P.M.", route:"Medical", vehicle:"Medical", type:"Bus", no:"RJ19 CZ 2634", },
        { id: 3, join: "13/04/2025", pickup: "07:15 A.M.", return:"12:50 P.M.", route:"Temple", vehicle:"Temple", type:"Van", no:"RJ19 XZ 2874", },
        { id: 4, join: "02/05/2025", pickup: "08:00 A.M.", return:"01:00 P.M.", route:"Street Corner", vehicle:"Street Corner", type:"Taxi", no:"RJ19 AD 4655", },
        { id: 5, join: "15/05/2025", pickup: "07:45 A.M.", return:"01:10 P.M.", route:"Near by House", vehicle:"Near by House", type:"Bus", no:"RJ19 UB 2358", },
        { id: 6, join: "01/07/2025", pickup: "07:15 A.M.", return:"01:30 P.M.", route:"Home", vehicle:"Home", type:"Van", no:"RJ19 KH 8756", },
    ];
    
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"Sibling Fees"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Sr. No."} placeholder={" Enter Serial No."}/>
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"}/>
                <FormInput label={"Join Date"} type='date'/>
                <FormInput label={"Route"} placeholder={" Enter Route"}/>
                <FormInput label={"Pickup Time"} placeholder={" Enter Pickup Time"}/>
                <FormInput label={"Return Time"} placeholder={" Enter Return Time"}/>
                <Options label="Stop" name="paymentMode" optionMsg="Select Stop" options={["Outside", "Near by House",]}/>
                <Options label="Vehicle Type" name="paymentMode" optionMsg="Select Vehicle Type" options={["Bus", "Taxi", "Van"]}/>
                <Options label="Vehicle Number" name="paymentMode" optionMsg="Select Vehicle No." options={["RJ19 DF 1245", "RJ19 SE 7309", "RJ19 YD 6010"]}/>
                <FormInput label={"Stop Date"} type='date'/>
            </div>
            <div className="w-full gap-6 mb-5 grid grid-cols-1 ">                
                <CheckBox label={"Is Active"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                    
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

export default Assign_Vehicle2