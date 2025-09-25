import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';

function Hostel_Fee() {
  const navigate = useNavigate()    
   
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Hostel Fees"} />                                   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
            </div>           

            <div className="flex justify-end">
                <Buttons click={() => navigate("/Hostel-fee")} label={"Search"} />                    
            </div>
           
        </div>
    )
}

export default Hostel_Fee