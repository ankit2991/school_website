import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Options from '../../Components/Page_Forms/Options'
import RadioButton from '../../Components/Page_Forms/RadioButton'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Table from '../../Components/Page_Forms/Table'
import Dialog from '../../Components/Page_Forms/Dialog'

function Marks_entry2() {
    const  [agree, setAgree] = useState(false)
    const navigate = useNavigate()
    const [selected, setSelected] = useState("option1");
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const  [sure, setSure] = useState(false)

    const columns = [
        { header: "Student Name", shortHeader: "Student Name", accessor: "name" },
        { header: "Env. No.", shortHeader: "Env. No.", accessor: "serial" },
        { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
        { header: "Marks Obt.", shortHeader: "Marks Obt.", accessor: "mark" },
        { header: "Grade", shortHeader: "Grade", accessor: "grade" },
        { header: "Att. Type", shortHeader: "Att. Type", accessor: "type" },
        
    ];

    const data = [
        { id: 1,  name: "Ajay", serial: "01", roll: "11", mark:"10", grade:"A", type:"P" },
        { id: 2,  name: "Ajay", serial: "02", roll: "12", mark:"10", grade:"A", type:"P" },
    ];

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setOpenDialog(true);
    };

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Marks Entry"} style={"text-[22px] sm:text-3xl"} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Class"} placeholder={"Enter Class"} />                
                <FormInput label={"Exam"} placeholder={"Enter Exam"} />                
                <FormInput label={"Month"} placeholder={"Enter Month"} />                
            </div>

            {/* --- Large Screens Only --- */}
            <div className="hidden lg:flex gap-6 mb-5 w-full">
                {/* Left Side: Table */}
                <div className="flex-[2]">
                    <Table columns={columns} data={data} />
                </div>
                
                {/* Right Side: Form Section */}
                <div className="flex-[1]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                        <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
                        <FormInput label={"Env. No."} placeholder={"Enter Env. No."} />
                        <FormInput label={"Roll No."} placeholder={"Enter Roll No."} />
                        <FormInput label={"Total Attendance"} placeholder={"Enter Total Attendance"} />
                        <FormInput label={"Attendance Number"} placeholder={"Enter Attendance No."} />
                        <Options label={"Grade"} optionMsg="Select Grade" options={["A", "B"]} />
                        <RadioButton label="Present" name="example" value="option1" checked={selected === "option1"} onChange={(e) => setSelected(e.target.value)} />
                        <RadioButton label="Leave" name="example" value="option2" checked={selected === "option2"} onChange={(e) => setSelected(e.target.value)} />
                        <RadioButton label="Absent" name="example" value="option3" checked={selected === "option3"} onChange={(e) => setSelected(e.target.value)} />                            
                    </div>
                    <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5">
                        <Buttons label={"Previous"} />
                        <Buttons click={() => navigate("/Marks-Entry2")} label={"Next"} />                            
                    </div>
                </div>
            </div>
            
            {/* --- Small & Medium Screens Only --- */}
            <div className="block lg:hidden">
                <Table columns={columns} data={data} selectable={false} disableFloatingRow={true} onRowSelect={handleRowClick} />

                {/* Dialog */}
                <Dialog open={openDialog} title="Student Attendance" dialogstyle={"sm:w-5xl h-[600px] sm:h-[330px] sm:mx-5"}>
                    {selectedRow && (
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                                <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
                                <FormInput label={"Env. No."} placeholder={"Enter Env. No."} />
                                <FormInput label={"Roll No."} placeholder={"Enter Roll No."} />
                                <FormInput label={"Total Attendance"} placeholder={"Enter Total Attendance"} />
                                <FormInput label={"Attendance Number"} placeholder={"Enter Attendance No."} />
                                <Options label={"Grade"} optionMsg="Select Grade" options={["A", "B"]} />
                                <RadioButton label="Present" name="example" value="option1" checked={selected === "option1"} onChange={(e) => setSelected(e.target.value)} />
                                <RadioButton label="Leave" name="example" value="option2" checked={selected === "option2"} onChange={(e) => setSelected(e.target.value)} />
                                <RadioButton label="Absent" name="example" value="option3" checked={selected === "option3"} onChange={(e) => setSelected(e.target.value)} /> 
                            </div>
                            <div className="flex justify-between space-x-0 sm:space-x-10 pt-2 mt-5">
                                <Buttons label={"Previous"} />
                                <Buttons click={() => navigate("/Marks-Entry2")} label={"Next"} />                            
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center mt-4">
                        <Buttons label="Close" click={() => setOpenDialog(false)} />
                    </div>
                </Dialog>
            </div>
            <CheckBox label={"Send SMS all Student"} labelClass='text-[20px] mt-5 ' checkstyle={"mt-5"} name={""} 
                checked={agree} onChange={(e) => setAgree(e.target.checked)}
            />
            <FormInput label={"Message"} placeholder={"Enter Message"} labelStyle="mt-2" />
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Marks_entry2