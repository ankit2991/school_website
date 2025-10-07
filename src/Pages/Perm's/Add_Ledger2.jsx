import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'

function Add_Ledger2() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Ledger Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <Options label={"Ledger Group"} name={""} optionMsg="Select Ledger Group" options={["Sales Account", "Secured Loans",]} />
                <FormInput label={"Name"} placeholder={"Enter Name"} />
            </div>

            <FormInput label={"Remarks"} placeholder={"Enter Remarks"} />

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Add_Ledger2