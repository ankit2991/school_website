import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import RadioButton from '../../Components/Page_Forms/RadioButton'

function Marks_Entry() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [selected, setSelected] = useState("option1");
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <CheckBox label={"Supplementry"} labelClass='text-[20px] sm:mt-8' checkstyle={"sm:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <Options label={"Class"} optionMsg="Select Class" options={["Nur", "First"]} />
                <Options label={"Exam"} optionMsg="Select Exam" options={["Unit Test", "Yearly"]} />
                <Options label={"Sub-Exam"} optionMsg="Select Sub-Exam" options={["Written", "Oral"]} />
                <FormInput label={"Date"} type='date' />
                <Options label={"Subject"} optionMsg="Select Subject" options={["Hindi", "English"]} />
                <RadioButton label="Number" name="example" value="option1" checked={selected === "option1"} 
                    onChange={(e) => setSelected(e.target.value)}
                />
                <RadioButton label="Graded" name="example" value="option2" checked={selected === "option2"}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <RadioButton label="Number Graded" name="example" value="option2" checked={selected === "option2"}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <FormInput label={""} placeholder={"Enter Minimum Marks"} />
                <FormInput label={""} placeholder={"Enter Maximum Marks"} />
                
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <CheckBox label={"Include in Grand Total"} labelClass='text-[20px] sm:mt-8' checkstyle={"sm:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <CheckBox label={"Saved"} labelClass='text-[20px] sm:mt-8' checkstyle={"sm:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <CheckBox label={"Import"} labelClass='text-[20px] sm:mt-8' checkstyle={"sm:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
            </div>
            
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Close"}/>
                <Buttons click={() => navigate("/Marks-Entry2")} label={"Next"} />
            </div>
        </div>
    )
}

export default Marks_Entry