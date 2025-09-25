import React from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'

function Sibling_Fees() {
    const navigate = useNavigate()
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Sibling Fees"} />                                   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <Options label={"Vehicle"} name={""} optionMsg="Select Vehicle" options={["Bus", "Taxi", "Van"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
            </div>           

            <div className="flex justify-end">
                <Buttons click={() => navigate("/Sibling-Fee2")} label={"Search"} />                    
            </div>
           
        </div>
    )
}

export default Sibling_Fees