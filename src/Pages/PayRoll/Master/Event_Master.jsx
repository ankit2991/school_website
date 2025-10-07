import React from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table';

function Event_Master() {
    const navigate = useNavigate()
    const columns = [
        { header: "Name", shortHeader: "Name", accessor: "name" },
    ]
    const data = [
        { id: 1,  name: "KA", },
        { id: 2,  name: "KA", },    
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Event Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/Event2")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Month"} optionMsg="Select Month" options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} />
                <Options label={"Year"} optionMsg="Select Year" options={["2022", "2023", "2024", "2025"]} />
                <FormInput label={"Event"} placeholder={"Enter Event Name"} />
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("/Event2")} label={"Search"} />
            </div>

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
    )
}

export default Event_Master