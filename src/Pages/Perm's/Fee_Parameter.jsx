import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import CheckBox from '../../Components/Page_Forms/CheckBox';
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table';

function Fee_Parameter() {
    const navigate = useNavigate()
    const  [agree, setAgree] = useState(false)
    const columns = [
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Fee Type", shortHeader: "Fee Type", accessor: "fee" },
        { header: "Apply To", shortHeader: "Apply To", accessor: "apply" },
        { header: "Fee Mode", shortHeader: "Fee Mode", accessor: "mode" },
        { header: "Amount", shortHeader: "Amount", accessor: "amt" },
        { header: "Fine", shortHeader: "Fine", accessor: "fine" },
        { header: "Grace Period", shortHeader: "Grace Period", accessor: "grace" },
        { header: "Apply Date", shortHeader: "Apply Date", accessor: "date" },
        { header: "Ledger Name", shortHeader: "Ledger Name", accessor: "led" },
    ]
    const data = [
        { id: 1, class: "Nue", fee:"Tution Fee", apply:"All Student", mode:"Yearly", amt:"10,000", fine:"200", grace:"02", date:"01-March-2025", led:"Tution Fee" },
        { id: 2, class: "Prep", fee:"Tution Fee", apply:"All Student", mode:"Yearly", amt:"10,000", fine:"200", grace:"02", date:"01-March-2025", led:"Tution Fee" },
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Ledger Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 w-full">
                <Options label={"Ledger"} name={""} optionMsg="Select Ledger" options={["Sales Account", "Secured Loans",]} />
                <CheckBox label={"Is Special Case"} labelClass='text-[20px] sm:mt-8' checkstyle={"sm:mt-8"} name={""}
                    checked={agree} onChange={(e) => setAgree(e.target.checked)}
                />
                <FormInput label={"Fee Type"} placeholder={"Enter Fee Type"} />
                <Options label={"Apply To"} name={""} optionMsg="Select Apply" options={["All Student", "New Student",]} />
                <Options label={"Fees Mode"} name={""} optionMsg="Select Fees Mode" options={["Yearly", "Monthly",]} />
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "Prep",]} />
                <FormInput label={"Fee Amount"} placeholder={"Enter Fee Amount"} />
                <FormInput label={"Fine Apply(%)"} placeholder={"Enter Fine"} />
                <FormInput label={"Grace Period(In Days)"} placeholder={"Grace Period"} />
                <FormInput label={"Apply Date"} type='date' />
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("/Add-Ledger2")} label={"Search"} />                    
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

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Fee_Parameter