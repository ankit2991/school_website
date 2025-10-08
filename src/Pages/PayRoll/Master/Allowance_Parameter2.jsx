import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'


function Allowance_Parameter2() {
    const navigate = useNavigate()
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Allowance Parameter Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-5 w-full">
                <FormInput label={"Effective Date"} type='date' />
            </div>
            <FormInput label={"Discription"} placeholder={"Enter Discription"}  as="textarea" rows={5} inputStyle="text-start align-top" />
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-5 mb-5 w-full">
                <FormInput label={"DA"} placeholder={"Enter DA"} />
                <FormInput label={"HRA"} placeholder={"Enter HRA"} />
            </div>
            
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Allowance_Parameter2