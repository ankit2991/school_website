import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options';
import Table from '../../Components/Page_Forms/Table';
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';

function Assign_Other_Income() {
    const navigate = useNavigate()
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Serial No.", shortHeader: "Sr No.", accessor: "sr" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mobile No.", shortHeader: "Mobile No.", accessor: "no" },
        { header: "Amount", shortHeader: "Amount", accessor: "amt" },
    ]
    const data = [
        { id: 1, sr:"01", name: "Anshika", fname:"Dependra", no:"1234567890", amt:"1000" },
        { id: 2, sr:"02", name: "Happy", fname:"Rinku", no:"1234567890", amt:"1000" },    
    ];

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Other Income Assign"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
             <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px_1fr] gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"Date"} type='date' />
                <Options label={"Ledger"} name={""} optionMsg="Select Ledger" options={["Tour And Travel", "Impress Money",]} />
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <FormInput label={"Amount"} placeholder={"Enter Amount"} />
            </div>
            
            <div className="flex justify-end">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} 
                    onRowSelect={() => {}} 
                    disableFloatingRow={false}
                    onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
                />
            </div>

            <div className="flex justify-center sm:justify-end space-x-5 sm:space-x-10 mt-5">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mt-5"> */}
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Assign_Other_Income