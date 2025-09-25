import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';

function Vehicle_Provider() {
    const navigate = useNavigate()
    const columns = [
        { header: "Provider Name", shortHeader: "Provider", accessor: "provider" },       
    ]
    const data = [
        { id: 1, provider: "Jain Travels", },
        { id: 2, provider: "Mewara Travels", },
        { id: 3, provider: "Chandra Travels", },
       
    ];
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Provider Master"} />
                <Buttons click={() => navigate("/Vehicle-Provider")} label={"Add"} />                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <Options label={"Provider"} name={""} optionMsg="Select Provider" options={["Jain Travels", "Mewara Travels", "Chandra Travels"]}/>
                {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("/")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => navigate("/Vehicle-Provider") } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Vehicle-Provider")} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )
}

export default Vehicle_Provider