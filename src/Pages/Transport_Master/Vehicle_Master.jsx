import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';

function Vehicle_Master() {
    const navigate = useNavigate()
    const columns = [
        { header: "Vehicle Number", shortHeader: "Vehicle No.", accessor: "Vehicle" },       
    ]
    const data = [
        { id: 1, Vehicle: "RJ19 DF 1245", },
        { id: 2, Vehicle: "RJ19 SE 7309", },
        { id: 3, Vehicle: "RJ19 YD 6010", },
       
    ];
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Vehicle Master"} />
                <Buttons click={() => navigate("/Vehicle-Master")} label={"Add"} />                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <Options label={"Vehicle No."} name={""} optionMsg="Select Vehicle No." options={["RJ19 DF 1245", "RJ19 SE 7309", "RJ19 YD 6010"]}/>
                {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("/")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => navigate("/Add-Stop") } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Vehicle-Master")} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )
}

export default Vehicle_Master