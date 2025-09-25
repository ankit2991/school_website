import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'

function Add_Stop2() {
    const [agree, setAgree] = useState(false)
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Heading label={"Stop Master"} style={"mb-5"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Destination"} placeholder={"Enter Destination"}/>
                <FormInput label={"Cost"} placeholder={" Enter Cost"}/>
                <Options label="Route" name="paymentMode" optionMsg="Select Route" options={["Shastri Nagar", "Jalori Gate", "Pratap Nagar"]}/>
                <div className="flex flex-col space-y-2">
                    <FormInput label={"Route Order No."} placeholder={" Enter Route Order No."}/>
                    <CheckBox label={"Is All Institute"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                        
                </div>
            </div>
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Add_Stop2