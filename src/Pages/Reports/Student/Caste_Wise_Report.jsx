// import React, { useState } from 'react'
// import Heading from '../../../Components/Page_Forms/Heading';
// import CheckBox from '../../../Components/Page_Forms/CheckBox';
// import Buttons from '../../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Table from '../../../Components/Page_Forms/Table';

// function Caste_Wise_Report() {
//     const navigate = useNavigate()    
//     const [agree, setAgree] = useState(false)
//     const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
        
//     const columns = [
//         { header: "Class", shortHeader: "Class", accessor: "class" },
//         { header: "OBC Boy", shortHeader: "OBC Boy", accessor: "oboy" },
//         { header: "OBC Girl", shortHeader: "OBC Girl", accessor: "ogirl" },
//         { header: "Gen Boy", shortHeader: "Gen Boy", accessor: "gboy" },
//         { header: "Gen Girl", shortHeader: "Gen Girl", accessor: "ggirl" },
//         { header: "SC Boy", shortHeader: "SC Boy", accessor: "sboy" },
//         { header: "SC Girl", shortHeader: "SC Girl", accessor: "sgirl" },
//         { header: "ST Boy", shortHeader: "ST Boy", accessor: "stboy" },
//         { header: "ST Girl", shortHeader: "ST Girl", accessor: "stgirl" },
//         { header: "SBC Boy", shortHeader: "SBC Boy", accessor: "sbboy" },
//         { header: "SBC Girl", shortHeader: "SBC Girl", accessor: "sbgirl" },
//         { header: "MIN Boy", shortHeader: "MIN Boy", accessor: "mboy" },
//         { header: "MIN Girl", shortHeader: "MIN Girl", accessor: "mgirl" },
//         { header: "Jain Boy", shortHeader: "Jain Boy", accessor: "jboy" },
//         { header: "Jain Girl", shortHeader: "Jain Girl", accessor: "jgirl" },
//         { header: "Christian Boy", shortHeader: "Christian Boy", accessor: "cboy" },
//         { header: "Christian Girl", shortHeader: "Christian Girl", accessor: "cgirl" },
//         { header: "Total", shortHeader: "Total", accessor: "tot" },
//     ];
        
//     const data = [
//         { id: 1, class: "Nur", oboy:"5", ogirl:"2", gboy:"3", ggirl:"5", sboy:"1", sgirl:"2", stboy:"6", stgirl:"2", sbboy:"2", sbgirl:"4", mboy:"5", mgirl:"6", jboy:"2", jgirl:"2", cboy:"3", cgirl:"2", tot:"30", },
//     ];

//     const columns2 = [
//         { header: "Class", shortHeader: "Class", accessor: "class" },
//         { header: " Boy", shortHeader: " Boy", accessor: "boy" },
//         { header: " Girl", shortHeader: " Girl", accessor: "girl" },
//     ];
        
//     const data2 = [
//         { id: 1, class: "Nur", boy:"5", girl:"2", tot:"7", },
//     ];

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between mb-5">
//                 <Heading label={"Caste Wise Report"} />
//             </div>
            
//             <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">
//                 <CheckBox label={"Boy And Girl"} labelClass='text-[20px]' name={""}
//                     checked={agree} onChange={(e) => setAgree(e.target.checked)}
//                 />
//                 <div className="flex justify-end">
//                     <Buttons click={() => navigate("")} label={"Search"} />                        
//                 </div>
//             </div>

//             <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
//                 onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
//             />

//             <Table columns={columns2} data={data2} onRowSelect={() => {}} disableFloatingRow={false} 
//                 onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
//             />
            
//             <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
//                 <Buttons label={"Clear"}/>
//             </div>

//             {/* ✅ Dynamic div for spacing */}
//             {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
//         </div>
//   )
// }

// export default Caste_Wise_Report



import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import CheckBox from '../../../Components/Page_Forms/CheckBox';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Components/Page_Forms/Table';

function Caste_Wise_Report() {
    const navigate = useNavigate()    
    const [agree, setAgree] = useState(false);   // checkbox state
    const [showTable2, setShowTable2] = useState(false); // ✅ controls which table to show
    const [rowDetailOpen, setRowDetailOpen] = useState(false); 
        
    const columns = [
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "OBC Boy", shortHeader: "OBC Boy", accessor: "oboy" },
        { header: "OBC Girl", shortHeader: "OBC Girl", accessor: "ogirl" },
        { header: "Gen Boy", shortHeader: "Gen Boy", accessor: "gboy" },
        { header: "Gen Girl", shortHeader: "Gen Girl", accessor: "ggirl" },
        { header: "SC Boy", shortHeader: "SC Boy", accessor: "sboy" },
        { header: "SC Girl", shortHeader: "SC Girl", accessor: "sgirl" },
        { header: "ST Boy", shortHeader: "ST Boy", accessor: "stboy" },
        { header: "ST Girl", shortHeader: "ST Girl", accessor: "stgirl" },
        { header: "SBC Boy", shortHeader: "SBC Boy", accessor: "sbboy" },
        { header: "SBC Girl", shortHeader: "SBC Girl", accessor: "sbgirl" },
        { header: "MIN Boy", shortHeader: "MIN Boy", accessor: "mboy" },
        { header: "MIN Girl", shortHeader: "MIN Girl", accessor: "mgirl" },
        { header: "Jain Boy", shortHeader: "Jain Boy", accessor: "jboy" },
        { header: "Jain Girl", shortHeader: "Jain Girl", accessor: "jgirl" },
        { header: "Christian Boy", shortHeader: "Christian Boy", accessor: "cboy" },
        { header: "Christian Girl", shortHeader: "Christian Girl", accessor: "cgirl" },
        { header: "Total", shortHeader: "Total", accessor: "tot" },
    ];
        
    const data = [
        { id: 1, class: "Nur", oboy:"5", ogirl:"2", gboy:"3", ggirl:"5", sboy:"1", sgirl:"2", stboy:"6", stgirl:"2", sbboy:"2", sbgirl:"4", mboy:"5", mgirl:"6", jboy:"2", jgirl:"2", cboy:"3", cgirl:"2", tot:"30", },
    ];

    const columns2 = [
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: " Boy", shortHeader: " Boy", accessor: "boy" },
        { header: " Girl", shortHeader: " Girl", accessor: "girl" },
        { header: "Total", shortHeader: "Total", accessor: "tot" },
    ];
        
    const data2 = [
        { id: 1, class: "Nur", boy:"5", girl:"2", tot:"7", },
    ];

    const handleSearch = () => {
        if (agree) {
            setShowTable2(true);  // show Table2 if checkbox is checked
        } else {
            setShowTable2(false); // otherwise show Table1
        }
    };

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Caste Wise Report"} />
            </div>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">
                <CheckBox 
                    label={"Boy And Girl"} 
                    labelClass='text-[20px]' 
                    name={""}
                    checked={agree} 
                    onChange={(e) => setAgree(e.target.checked)}
                />
                <div className="flex justify-end">
                    <Buttons click={handleSearch} label={"Search"} />                        
                </div>
            </div>

            {/* ✅ Conditional rendering for tables */}
            {!showTable2 && (
                <Table 
                    columns={columns} 
                    data={data} 
                    onRowSelect={() => {}} 
                    disableFloatingRow={false} 
                    onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                />
            )}

            {showTable2 && (
                <Table 
                    columns={columns2} 
                    data={data2} 
                    onRowSelect={() => {}} 
                    disableFloatingRow={false} 
                    onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                />
            )}
            
            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Caste_Wise_Report
