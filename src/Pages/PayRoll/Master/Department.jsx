import React from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';


function Department() {
    const navigate = useNavigate()
    const columns = [
        { header: "Department", shortHeader: "Department", accessor: "name" },
    ]
    const data = [
        { id: 1,  name: "Accounts", },
        { id: 2,  name: "Teacher", },    
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Department Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/Department2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput label={"Department"} placeholder={"Enter Department Name"} />
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("/Department2")} label={"Search"} />
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg" onClick={() => console.log("Edit:", row)} >✏️</button>
                        <button className="sm:hidden text-xl" onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )
}

export default Department