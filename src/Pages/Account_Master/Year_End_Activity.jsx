import React from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import Table from '../../Components/Page_Forms/Table';

function Year_End_Activity() {
    const navigate = useNavigate()
    
    const columns = [
        { header: "Ledger",  shortHeader: "Ledger", accessor: "fee" },
        { header: "Amount", shortHeader: "Amount", accessor: "amount" },
        { header: "Type", shortHeader: "Type", accessor: "type" },
    ]
    
    const data = [
        { id: 1, fee: "Salary", amount: "1000", type: "Dr" },
        { id: 2, fee: "Hostel Fee", amount: "1000", type: "Dr" },
        { id: 3, fee: "Tution Fee", amount: "1000", type: "Cr" },
        { id: 4, fee: "Bus Fee", amount: "1000", type: "Cr" },
        { id: 5, fee: "Form Fee", amount: "1000", type: "Cr" },
        { id: 6, fee: "Addmission Fee", amount: "1000", type: "Dr" },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Year End Activity"} />                                   
                <Buttons click={() => navigate("/")} label={"Refresh"} />                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"Year End On"} type='date' />
                <Options label={"Institute Name"} name={""} optionMsg="Select Institute Name" options={["Institute1", "Institute2", "Institute3"]}/>
            </div>           

            <div className="flex justify-between mb-5">
                <Buttons click={() => navigate("/")} label={"Process Year End"} />                    
                <Buttons click={() => navigate("/")} label={"Search"} />                    
            </div>

            <Table columns={columns} data={data}/>

            <div className="flex justify-center mt-5">
                <Buttons click={() => navigate("/")} label={"Clear"} style='px-8 py-2' />                    
            </div>
           
        </div>
    )
}

export default Year_End_Activity