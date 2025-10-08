import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import Heading2 from '../../../Components/Page_Forms/Heading2'
import FaceUploader from '../../../Components/Page_Forms/FaceUploader'
import CheckBox from '../../../Components/Page_Forms/CheckBox'


function Manage_Attendance() {
    const  [agree, setAgree] = useState(false)

    return (
        <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
            <Heading label={"Manage Attendance"}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 w-full">
                <FormInput label={"Employee Code"} placeholder={"Enter Employee Code"} />
            </div>
            
            <div className="flex justify-end  mt-5 ">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Employee Name"} placeholder={"Enter Employee Name"} />
                <FormInput label={"Login Date"} type='date' />
            </div>
            
            <FormInput label={"Remark"} placeholder={"Enter Remark"}  as="textarea" rows={5} inputStyle="text-start align-top" />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Logout"}/>
            </div>
        </div>
    )
}

export default Manage_Attendance