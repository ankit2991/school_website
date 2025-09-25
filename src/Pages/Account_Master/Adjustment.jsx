import React from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'

function Adjustment() {
    const navigate = useNavigate()
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <div className="flex justify-between mb-5">
                <Heading label={"Bank Adjustment Entry"} />
            </div>
            
            <div className="mb-5 w-full">
                <Options label={"Voucher Number"} name={""} optionMsg="Select Voucher Number" options={["2", "3", "7"]}/>
            </div>
            
            <div className="flex justify-between mb-5">
                <Buttons click={() => navigate("/")} label={"Add"} />
                <Buttons click={() => navigate("/")} label={"Search"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Receipt Date"} type='date'/>
                <Options label={"Ledger (Dr.)"} name={""} optionMsg="Select Ledger (Dr.)" options={["Addmission Fees", "Tution Fee", "Exam Fee"]}/>               
                <Options label={"Ledger (Cr.)"} name={""} optionMsg="Select Ledger (Cr.)" options={["Addmission Fees", "Tution Fee", "Exam Fee"]}/>               
                <FormInput label={"Amount"} placeholder={" Enter Amount"}/>
                <FormInput label={"Narration"} placeholder={" Enter Narration"}/>
            </div>
            
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"} style='px-6 py-2'/>
                <Buttons label={"Delete"} style='px-6 py-2'/>
                <Buttons label={"Save"} style='px-6 py-2'/>               
            </div>
        </div>
    )
}

export default Adjustment