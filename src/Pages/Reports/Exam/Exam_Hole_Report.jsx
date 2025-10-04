import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Components/Page_Forms/Table';

function Exam_Hole_Report() {
    const navigate = useNavigate()    
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Room No.", shortHeader: "Room No.", accessor: "room" },
        { header: "Total Sheet", shortHeader: "Total Sheet", accessor: "tot" },
        { header: "Allocate Sheet", shortHeader: "Allocate Sheet", accessor: "allo" },
        { header: "Pending", shortHeader: "Pending", accessor: "pen" },
    ];
    const data = [
        { id: 1, room:"111", tot:"10", allo:"5", pen:"1" },
        { id: 2, room:"112", tot:"10", allo:"6", pen:"2" },
        { id: 3, room:"113", tot:"10", allo:"5", pen:"3" },
        { id: 4, room:"115", tot:"10", allo:"7", pen:"4" },
        { id: 5, room:"116", tot:"10", allo:"2", pen:"5" },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Exam Hole Report"}  />
            </div>
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Buttons click={""} label={"Clear"}/>
                <Buttons click={""} label={"Search"}/>
            </div>

            <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
            />

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

        </div>
    )
}

export default Exam_Hole_Report