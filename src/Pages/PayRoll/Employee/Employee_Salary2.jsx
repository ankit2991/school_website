import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import Heading2 from '../../../Components/Page_Forms/Heading2'
import FaceUploader from '../../../Components/Page_Forms/FaceUploader'
import CheckBox from '../../../Components/Page_Forms/CheckBox'


function Employee_Salary2() {
    const  [agree, setAgree] = useState(false)

    return (
        <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
            <Heading label={"Employee Basic Salary Master"}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 w-full">
                <FormInput label={"Employee Code"} placeholder={"Enter Employee Code"} />
            </div>
            
            <div className="flex justify-end  mt-5 ">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>
            
            <Heading2 label={"Employee's Detail"} style={"mt-5"} />            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Employee Name"} />
            </div>
            
            <div className="space-y-5 w-full mb-6">
                {/* lg and above: keep your nested structure */}
                <div className=" flex flex-col md:flex-row gap-6 w-full">
                    {/* Email - takes remaining space */}
                    <div className="flex-1">
                        <FormInput label={"Email"} placeholder={"Enter Email"} />
                    </div>
                    {/* Contact No. - fixed width */}
                    <div className="w-full sm:w-1/2 md:w-50 lg:w-100 flex-shrink-0">
                        <FormInput label={"Contact No."} placeholder={"Enter Contact No."} />
                    </div>
                </div>
                
                <FormInput label={"Address"} placeholder={"Enter Address"} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormInput label={"PAN No."} placeholder={"Enter PAN No."} />
                    <FormInput label={"Aadhar No."} placeholder={"Enter Aadhar No."} />
                </div>
            </div>
            
            <Heading2 label={"Basic Salary"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Basic Salary"} placeholder={"Enter Basic Salary"} />
                <FormInput label={"Effect. Date"} type='date' />
            </div>
            
            <Heading2 label={"Addition"} />
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <FormInput label={"HRA"} placeholder={"Enter HRA"} />
                <FormInput label={"DA"} placeholder={"Enter DA"} />
                <FormInput label={"TA"} placeholder={"Enter TA"} />
                <FormInput label={"Incentive"} placeholder={"Enter Incentive"} />
            </div>

            <Heading2 label={"Deducation"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"PF"} placeholder={"Enter PF"} />
                <FormInput label={"ESI"} placeholder={"Enter ESI"} />
            </div>

            <Heading2 label={"Gross Salary"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Gross Salary"} placeholder={"Enter Gross Salary"} />
            </div>

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Employee_Salary2