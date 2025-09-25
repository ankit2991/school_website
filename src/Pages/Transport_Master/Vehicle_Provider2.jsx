import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'

function Vehicle_Provider2() {    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Heading label={"Provider Master"} style={"mb-5"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Contact Number"} placeholder={" Enter Contact No."}/>                
            </div>
            <FormInput label={"Address"} placeholder={" Enter Address"} inputStyle='mb-5'/>                
            <FormInput label={"Email"} placeholder={" Enter Email"} inputStyle='mb-5'/>                
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Vehicle_Provider2