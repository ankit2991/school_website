import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'


function Shift2() {
    const navigate = useNavigate()
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Shift Master"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-5 w-full">
                <FormInput label={"Shift Name"} placeholder={"Enter Shift Name"} />
                <FormInput label={"Effective Date"} type='date' />
            </div>
            <FormInput label={"Discription"} placeholder={"Enter Discription"}  as="textarea" rows={5} inputStyle="text-start align-top" />
            
            {/* Login / Logout Time Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 mb-5 w-full">

  {/* Login Time */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Login Time</label>
    <div className="flex items-center gap-2">
      <FormInput
        type="time"
        inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-lg font-bold">:</span>
      <FormInput
        type="time"
        inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>

  {/* Logout Time */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">Logout Time</label>
    <div className="flex items-center gap-2">
      <FormInput
        type="time"
        inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <span className="text-lg font-bold">:</span>
      <FormInput
        type="time"
        inputStyle="w-28 p-1 border border-gray-400 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>

</div>

            
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Shift2