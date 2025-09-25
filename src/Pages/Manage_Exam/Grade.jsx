import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'

function Grade() {
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
        <div className="flex justify-between mb-5">
            <Heading label={"Exam_Type Master"} />
            <Buttons click={() => navigate("")} label={"Add"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
            <Options label={"Grade"} name={""} optionMsg="Select Grade" options={["A+", "A", "B+"]}/>
            {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
        </div>
        <div className="flex justify-end mb-5">
                <Buttons label={"Search"} style='px-6 py-2'/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
            <FormInput label={"Name"} placeholder={"Enter  Name "} />
            <FormInput label={"Alias"} placeholder={"Enter Alias "} />
            <FormInput label={"Minimum"} placeholder={"Enter Minimum "} />
            <FormInput label={"Maximum"} placeholder={"Enter Maximum "} />
            <FormInput label={"Remark"} placeholder={"Enter Remark "} />
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

export default Grade