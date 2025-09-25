import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'


function Vehicle_Master2() {
     return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Heading label={"Vechile Master"} style={"mb-5"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <Options label={"Provider"} name={""} optionMsg="Select Provider" options={["Jain Travels", "Mewara Travels", "Chandra Travels"]}/>
                <Options label={"Vechile Type"} name={""} optionMsg="Select Vechile Type" options={["Bus", "Taxi", "Van"]}/>
                <Options label={"Route"} name={""} optionMsg="Select Route" options={["Shastri Nagar", "Jalori Gate", "Pratap Nagar"]}/>
                <FormInput label={"Vechile Number"} placeholder={"Enter Vechile No."}/>
                <FormInput label={"Number Of Seat"} placeholder={" Enter Number Of Seat"}/>
                <FormInput label={"Strength"} placeholder={" Enter Strength"}/>
                <FormInput label={"Purchase Date"} type='date'/>
                <FormInput label={"Insurance Date"} type='date'/>
                <FormInput label={"Tns. Expire Date"} type='date'/>
                <FormInput label={"Driver Name"} placeholder={" Enter Driver Name"}/>
                <FormInput label={"Contact Number"} placeholder={" Enter Contact No."}/>
                <FormInput label={"Driver License Number"} placeholder={" Enter Driver License No."}/>
            </div>
            <FormInput label={"Address"} placeholder={" Enter Address"} inputStyle='mb-5'/>                
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Vehicle_Master2