import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'

function Add_Bank2() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Bank Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Bank"} placeholder={"Enter Bank Name"} />
                <FormInput label={"Alias"} placeholder={"Enter Alias Name"} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"IFSC Code"} placeholder={"Enter IFSC Code"} />
                <FormInput label={"Branch"} placeholder={"Enter Branch Name"} />
                <CheckBox label={"Is Primary"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
            </div>
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Add_Bank2