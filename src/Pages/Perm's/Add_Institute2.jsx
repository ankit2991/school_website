import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';
import CheckBox from '../../Components/Page_Forms/CheckBox';
import FaceUploader from '../../Components/Page_Forms/FaceUploader';


function Add_Institute2() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Institute Master"} style={"text-[22px] sm:text-3xl"} />
            </div>
            <div className="flex justify-center items-center gap-x-4 mb-5">
                <div className="flex justify-center">
                    <FaceUploader/>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Institute Name"} />
                <FormInput label={"Alias"} placeholder={"Enter Alias"} />
            </div>
            <FormInput label={"Address"} placeholder={"Enter Address"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5 w-full">
                <FormInput label={"Piun No."} placeholder={"Enter Institute Name"} />
                <FormInput label={"Contact No."} placeholder={"Enter Alias"} />
                <FormInput label={"Mobile No."} placeholder={"Enter Alias"} />
                <FormInput label={"Email Id"} placeholder={"Enter Alias"} />
                <FormInput label={"Fax No."} placeholder={"Enter Alias"} />
                <FormInput label={"Registration No."} placeholder={"Enter Alias"} />
                <FormInput label={"Tin No."} placeholder={"Enter Alias"} />
                <FormInput label={"Pan No."} placeholder={"Enter Alias"} />
                <FormInput label={"Header Info"} placeholder={"Enter Alias"} />
                <FormInput label={"Website"} placeholder={"Enter Alias"} />
                <FormInput label={"Start Year"} placeholder={"Enter Alias"} />
                <FormInput label={"Dies Code"} placeholder={"Enter Alias"} />
                <FormInput label={"Effilation No."} placeholder={"Enter Alias"} />
                <FormInput label={"Effilated To"} placeholder={"Enter Alias"} />
                <FormInput label={"Name Of Report"} placeholder={"Enter Alias"} />
                <CheckBox label={"Is Block"} name={""} checked={agree} />
            </div>
            <FormInput label={"Remark"} placeholder={"Enter Remark"} />

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>

        </div>
    )

}

export default Add_Institute2