import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'


function Allowance_Deducation2() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Allowance Deducation Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Name"} />
                <Options label={"AD Type"} name={""} optionMsg="Select AD Type" options={["Allowance", "Deducation",]}/>
                <CheckBox label={"Is Active"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
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

export default Allowance_Deducation2