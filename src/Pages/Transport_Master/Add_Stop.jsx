import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';


function Add_Stop() { 
    const navigate = useNavigate()
    const columns = [
        { header: "Destination", shortHeader: "Destination", accessor: "destination" },
        { header: "Cost", shortHeader: "Cost", accessor: "Cost" },
        { header: "Order", shortHeader: "Order", accessor: "Order" },
        { header: "Route Name", shortHeader: "Route", accessor: "Route" },
    ]
    const data = [
        { id: 1, destination: "Banad", Cost: "Aarav Sharma", Order: "11", Route: "Shastri Nagar" },
        { id: 2, destination: "Kudi", Cost: "Ishita Kapoor", Order: "5", Route: "Jalori Gate" },
        { id: 3, destination: "Sardarpura", Cost: "Rohan Mehta", Order: "2", Route: "Pratap Nagar" },
       
    ];
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Stop Master"} />
                <Buttons click={() => navigate("/Add-Stop")} label={"Add"} />                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <Options label={"Destination"} name={""} optionMsg="Destination" options={["Shastri Nagar", "Jalori Gate", "Pratap Nagar"]}/>
                {/* <FormInput label={"Destination"} placeholder={"Enter Destination"} /> */}
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
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Add-Stop")} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => console.log("Print:", row)} >🗑️</button>
                    </>
                )}/>
            </div>
        </div>
    )

}

export default Add_Stop