import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table';

function Exam_Schedule() {
    const navigate = useNavigate()
    const columns = [
        { header: "Exam Name", shortHeader: "Exam Name", accessor: "exam" },       
    ]
    const data = [
        { id: 1, exam: "Unit Test", },
        { id: 2, exam: "Yearly Exam", },
        { id: 3, exam: "Annual Exam", },       
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={
                    <>
                        <span className="block sm:hidden">Exam Schedule</span>
                        <span className="hidden sm:block">Exam Schedule (Exam Time Table)</span>
                    </>
                }/>
                <Buttons click={() => navigate("/Exam-Schedule")} label={"Add"} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
            </div>

            <div className="flex justify-end">
                <Buttons click={() => navigate("/")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => navigate("/Exam-Schedule") } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Exam-Schedule")} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
  )
}

export default Exam_Schedule