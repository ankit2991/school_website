import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import Heading2 from '../../../Components/Page_Forms/Heading2'
import FaceUploader from '../../../Components/Page_Forms/FaceUploader'
import CheckBox from '../../../Components/Page_Forms/CheckBox'


function Update_Attendance() {
    const  [agree, setAgree] = useState(false)

    return (
        <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
            <Heading label={"Update Attendance"} style={"mb-5"}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <Options label={"Employee Code"} name={""} optionMsg="Select Employee Code" options={["5", "8",]}/>
                <FormInput label={"Login Date"} type='date' />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5 mb-5 w-full"> 
                {/* Login Time */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Login Time</label>
                    <div className="flex items-center gap-2">
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span className="text-lg font-bold">:</span>
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>
                
                {/* Logout Time */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Logout Time</label>
                    <div className="flex items-center gap-2">
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <span className="text-lg font-bold">:</span>
                        <FormInput type="time" inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                </div>

                <CheckBox label={"Is First Time Login"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
            </div>
            
            <FormInput label={"Remark"} placeholder={"Enter Remark"}  as="textarea" rows={5} inputStyle="text-start align-top" />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Submit"}/>
            </div>
        </div>
    )
}

export default Update_Attendance