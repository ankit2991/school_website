import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import Heading2 from '../../../Components/Page_Forms/Heading2'
import FaceUploader from '../../../Components/Page_Forms/FaceUploader'
import CheckBox from '../../../Components/Page_Forms/CheckBox'


function Employee2() {
    const  [agree, setAgree] = useState(false)

    return (
        <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
            <Heading label={"Employee Master"}/>
            
            <Heading2 label={"Employee's Detail"} style={"mt-5"} />
            <div className="flex justify-center mb-5">
                <FaceUploader />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 w-full">
                <FormInput label={"Employee Code"} placeholder={"Enter Employee Code"} />
                <FormInput label={"Name"} placeholder={"Enter Employee Name"} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"} />
                <FormInput label={"Date Of Birth"} type='date' />
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
            
            <Heading2 label={"Employee Master"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Join Date"} type='date' />
                <FormInput label={"Promotion"} type='date' />
                <Options label={"Department"} name={""} optionMsg="Select Department" options={["Teacher", "Accounts",]}/>
                <Options label={"Designation"} name={""} optionMsg="Select Designation" options={["Teacher", "Accountant",]}/>
                <FormInput label={"Account No"} placeholder={"Enter Account No"} />
                <Options label={"Bank Name"} name={""} optionMsg="Select Bank Name" options={["Hdfc", "PNB",]}/>
            </div>
            
            <Heading2 label={"#"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <Options label={"Shifting"} name={""} optionMsg="Select Shift" options={["Morning", "Evening",]}/>
                <CheckBox label={"Over Time Apply"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <CheckBox label={"Is Active"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                {/* Login Time */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Full Day Max Hours</label>
                    <div className="flex items-center gap-2">
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span className="text-lg font-bold">:</span>
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>
                
                {/* Logout Time */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Half Day Max Hours</label>
                    <div className="flex items-center gap-2">
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span className="text-lg font-bold">:</span>
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>
                <CheckBox label={"Half Day Applay"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <FormInput label={"PL(Per Month)"} placeholder={"Enter PL"} />
                <FormInput label={"CL(Per Month)"} placeholder={"Enter CL"} />
                <FormInput label={"Medical Leave"} placeholder={"Enter Medical Leave"} />
                <FormInput label={"TDS Deducation"} placeholder={"Enter TDS Deducation"} />
            </div>

            <CheckBox label={"ESi Applicable"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                checked={agree} onChange={(e) => setAgree(e.target.checked)}
            />
            <Heading2 label={"#"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"ESI No."} placeholder={"Enter ESI No."} />
                <FormInput label={"Join Date"} type='date' />
                <CheckBox label={"Old ESI Employee"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />                
            </div>

            <CheckBox label={"PF Applicable"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                checked={agree} onChange={(e) => setAgree(e.target.checked)}
            />

            <Heading2 label={"#"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"PF No."} placeholder={"Enter PF No."} />
                <FormInput label={"Join Date"} type='date' />
                <CheckBox label={"Pension"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
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

export default Employee2