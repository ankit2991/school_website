import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import Options from '../../Components/Page_Forms/Options'
import Table from '../../Components/Page_Forms/Table'
import Dialog from '../../Components/Page_Forms/Dialog'

function Route_Master() {
    const navigate = useNavigate
    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const columns = [
        { header: "Route Name", shortHeader: "Route", accessor: "name" },
    ]
    const data = [
        { id: 1, name: "Shastri Nagar", },
        { id: 2, name: "Sardarpura", },
    ];
    return (
        <div className='w-full h-full bg-white flex flex-col px-4 py-2'>
            <div className="w-full sm:w-4xl flex justify-between mb-5">
                <Heading label={"Route Master"}/>
                <Buttons click={() => {setDialogTitle("Add"); setOpen(true)}} label={"Add"} />
            </div>
            <Dialog open={open} title={dialogTitle} >
                <FormInput label={"Route"} placeholder={"Enter Route"}/>
                <div className="flex justify-end gap-3 mt-5">
                    <Buttons click={() => setOpen(false)} label={"Cancel"}/>
                    <Buttons click={() => setOpen(false)} label={"Save"}/>
                </div>                
            </Dialog>

            
            <div className='w-full md:w-4xl'>
                <Options label={"Route"} name={""} optionMsg="Select Route" options={["Shastri Nagar", "Sardarpura"]} style={"mb-5"}/>
            </div>
            
            <div className="w-full md:w-4xl flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />
            </div>
            
            <div className="w-full sm:w-4xl mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => {setDialogTitle("Edit"); setOpen(true)}} style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => {setDialogTitle("Edit"); setOpen(true)}} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5" onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
                
               
            </div>
            
        </div>
        
    ) 
}

export default Route_Master