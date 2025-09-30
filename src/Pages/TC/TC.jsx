import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import Table from '../../Components/Page_Forms/Table';

function TC() {
    const navigate = useNavigate()
     const columns = [        
        { header: "Enrollment Number",  shortHeader: "Enrollment No.", accessor: "enroll" },
        { header: "Name",  shortHeader: "Name", accessor: "name" },
    ]
    const data = [
        { id: 1, enroll:"123", name:"Akash Singh Chopra", },
        { id: 2, enroll:"1234", name:"Rahul Citra", },
        { id: 3, enroll:"123456", name:"Amar Singh", },
        { id: 4, enroll:"123456789", name:"Devender tripathi", },
        { id: 5, enroll:"554", name:"Devandu upadhya", },
    ];

   return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Transfer Certificate (T.C.)"} />                                   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
            </div>           

            <div className="flex justify-end">
                <Buttons click={() => navigate("/TC2")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
                        <Buttons label={"Print"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => console.log("Edit:", row)} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5" onClick={() => console.log("Print:", row)} >🖨️</button>
                    </>
                )}/>
            </div>
           
        </div>
    )
}

export default TC