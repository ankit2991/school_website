import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'

function Global_Perameters() {
    const  [agree, setAgree] = useState(false)
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"School Perameter"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <Options label={"T.C. Pattern"} name={""} optionMsg="Select T.C. Pattern" options={["T.C. CBSCE", "T.C. RBSCE",]} />
                <Options label={"Receipt Format"} name={""} optionMsg="Select Receipt Format" options={["Receipt A4", "Receipt 3 by 4",]} />
                <Options label={"Fee Mode"} name={""} optionMsg="Select Fee Mode" options={["D", "S",]} />
                <FormInput label={"Enquiry Frm Fees"} placeholder={"Enter Enquiry Frm Fees"} />
                <FormInput label={"T.C. Fees"} placeholder={"Enter T.C. Fees"} />
                <FormInput label={"Bus Fee Month"} placeholder={"Enter Bus Fee Month"} />
                <FormInput label={"Fee Cal Month"} placeholder={"Enter Fee Cal Month"} />
                <Options label={"Print Setting"} name={""} optionMsg="Select Print Setting" options={["RPT", "PDF Download",]} />
                <Options label={"Fee Mode"} name={""} optionMsg="Select Fee Mode" options={["Yearly", "Monthly",]} />
                <FormInput label={"Hostel Fee Month"} placeholder={"Enter Hostel Fee Month"} />
                <Options label={"Hostel Fee Mode"} name={""} optionMsg="Select Hostel Fee Mode" options={["2", "5",]} />
                <CheckBox label={"Hostel Room"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <Options label={"Exam Time Table"} name={""} optionMsg="Select Exam Time Table" options={["Exam Admit Card", "Exam Admit Card With Remarks",]} />
                <Options label={"Character Print Format"} name={""} optionMsg="Select Character Print Format" options={["CCReport_MBVM", "CCReport_Cjds",]} />
                <Options label={"ID Card Format"} name={""} optionMsg="Select ID Card Format" options={["ID Card", "ID Card Vertical",]} />
                <Options label={"Marksheet Format"} name={""} optionMsg="Select Marksheet Format" options={["Marksheet", "Marksheet2",]} />
            </div>
        </div>
    )
}

export default Global_Perameters