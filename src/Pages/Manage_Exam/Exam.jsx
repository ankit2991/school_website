import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import { useNavigate } from 'react-router-dom'

function Exam() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
        <div className="flex justify-between mb-5">
            <Heading label={"Exam Master"} />
            <Buttons click={() => navigate("")} label={"Add"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
            <Options label={"Exam"} name={""} optionMsg="Select Exam" options={["Yearly", "Unit Test", "Annual Exam"]}/>
            {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
        </div>
        <div className="flex justify-end mb-5">
                <Buttons label={"Search"} style='px-6 py-2'/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
            <FormInput label={"Name"} placeholder={"Enter  Name "} />
            <FormInput label={"Alias"} placeholder={"Enter Alias "} />
            <Options label={"Exam Group"} name={""} optionMsg="Select Exam Group" options={["Group1", "Group2", "Group3"]}/>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 mb-5 w-full">
            <CheckBox label={"Final Exam"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
            <CheckBox label={"Suppli. Exam"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
            <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"} style='px-6 py-2'/>
                <Buttons label={"Save"} style='px-6 py-2'/>
            </div>
            <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Delete"} style='px-6 py-2'/>
                <Buttons label={"Print"} style='px-6 py-2'/>
            </div>
        </div>
    </div>
  )
}

export default Exam