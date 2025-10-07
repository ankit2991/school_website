import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'

function Event_Master2() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Event Master"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"Event"} placeholder={"Enter Event Name"} />
                <FormInput label={"From"} type='date' />
                <FormInput label={"To"} type='date' />
                <FormInput label={"Discription"} placeholder={"Enter Discription"} />
                <Options label={"AD Type"} optionMsg="Select AD Type" options={["All", "Student", "Class",]} />
                <CheckBox label={"Is Holiday"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
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

export default Event_Master2