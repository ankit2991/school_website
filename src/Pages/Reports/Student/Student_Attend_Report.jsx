// import React, { useState } from 'react'
// import Heading from '../../../Components/Page_Forms/Heading'
// import Options from '../../../Components/Page_Forms/Options'
// import FormInput from '../../../Components/Page_Forms/FormInput'
// import Buttons from '../../../Components/Page_Forms/Buttons'
// import { useNavigate } from 'react-router-dom'
// import Table from '../../../Components/Page_Forms/Table'

// function Student_Attend_Report() {
//     const navigate = useNavigate()
//     const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    
    // const columns = [
    //     { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
    //     { header: "Name", shortHeader: "Name", accessor: "name" },
    //     { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    //     { header: "Total Attendance", shortHeader: "Total Attendance", accessor: "tot" },
    //     { header: "Leave", shortHeader: "Leave", accessor: "leave" },
    //     { header: "Leave1", shortHeader: "Leave1", accessor: "leave1" },
    // ];
    
    // const data = [
    //     { id: 1,  serial: "01", name: "Ajay", fname: "Rman Thakur",  tot:"30", leave:"5", leave1:"3" },
    //     { id: 2,  serial: "02", name: "Ajay", fname: "Rman", tot:"30", leave:"5", leave1:"3" },
    //     { id: 3,  serial: "03", name: "Viren", fname: "Devanh Bhalla",  tot:"30", leave:"5", leave1:"3" },
    //     { id: 4,  serial: "04", name: "anuj", fname: "aditya", tot:"30", leave:"5", leave1:"3" },
    //     { id: 5,  serial: "05", name: "somya", fname: "Devanh",  tot:"30", leave:"5", leave1:"3" },
    // ];

//     const columns = [
//         { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//         { header: "Gender", shortHeader: "Gender", accessor: "gen" },
//         { header: "Caste", shortHeader: "Caste", accessor: "caste" },
//         { header: "Total P", shortHeader: "Total P", accessor: "totp" },
//         { header: "Total AB", shortHeader: "Total AB", accessor: "tota" },
//         { header: "Till Date P", shortHeader: "Till Date P", accessor: "tillp" },
//         { header: "Till Date AB", shortHeader: "Till Date P", accessor: "tillab" },
//     ];
    
//     const data = [
//         { id: 1,  serial: "01", name: "Ajay", gen:"Boy", caste:"Gen",  totp:"30",tota:"0", tillp:"5", tillab:"3" },
//         { id: 2,  serial: "02", name: "Ajay", gen:"Boy", caste:"St", totp:"30",tota:"0", tillp:"5", tillab:"3" },
//         { id: 3,  serial: "03", name: "Viren", gen:"Boy", caste:"SC",  totp:"30",tota:"0", tillp:"5", tillab:"3" },
//         { id: 4,  serial: "04", name: "anuj", gen:"Boy", caste:"Min", totp:"30",tota:"0", tillp:"5", tillab:"3" },
//         { id: 5,  serial: "05", name: "somya", gen:"Girl", caste:"Jain",  totp:"30",tota:"0", tillp:"5", tillab:"3" },
//     ];

//     return (
//          <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between mb-5">
//                 <Heading label={"Student Attendance Report"} />                                   
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//                 <Options label={"Search"} name={""} optionMsg="Select Option" options={["Summary", "Details", "Class wise Summary", "Date wise"]}/>
//                 <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
//                 <FormInput label={"Month"} type='month' />
//                 <FormInput label={"Year"} type='year' />
//                 <FormInput label={"Date"} type='date' />
//             </div>           

//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/Hostel-fee")} label={"Search"} />
//             </div>

//             <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false}
//                 onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
//             />

//             <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
//                 <Buttons label={"Clear"}/>
//             </div>

//             {/* ✅ Dynamic div for spacing */}
//             {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
           
//         </div>
//     )
// }

// export default Student_Attend_Report
import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'

function Student_Attend_Report() {
    const [searchType, setSearchType] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close

    // ✅ Summary columns
    const summaryColumns = [
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Total Attendance", shortHeader: "Total Attendance", accessor: "tot" },
        { header: "Leave", shortHeader: "Leave", accessor: "leave" },
        { header: "Leave1", shortHeader: "Leave1", accessor: "leave1" },
    ];

    const summaryData = [
        { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur", tot:"30", leave:"5", leave1:"3" },
        { id: 2, serial: "02", name: "Ajay", fname: "Rman", tot:"30", leave:"5", leave1:"3" },
        { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla", tot:"30", leave:"5", leave1:"3" },
        { id: 4, serial: "04", name: "Anuj", fname: "Aditya", tot:"30", leave:"5", leave1:"3" },
        { id: 5, serial: "05", name: "Somya", fname: "Devanh", tot:"30", leave:"5", leave1:"3" },
    ];

    // ✅ Generate Details columns dynamically (with dates)
    const generateDetailsColumns = (month, year) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const baseCols = [
            { header: "Serial No.", accessor: "serial" },
            { header: "Name", accessor: "name" },
            { header: "Gender", accessor: "gen" },
            { header: "Caste", accessor: "caste" },
        ];
        const dateCols = Array.from({ length: daysInMonth }, (_, i) => ({
            header: `${i + 1}`,
            accessor: `d${i + 1}`,
        }));
        const endCols = [
            { header: "Total P", accessor: "totp" },
            { header: "Total AB", accessor: "tota" },
            { header: "Till Date P", accessor: "tillp" },
            { header: "Till Date AB", accessor: "tillab" },
        ];
        return [...baseCols, ...dateCols, ...endCols];
    };
    
    // ✅ Generate Details data
    const generateDetailsData = (month, year) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return [
            { id: 1, serial: "01", name: "Ajay", gen: "Boy", caste: "Gen", 
                ...Object.fromEntries( Array.from({ length: daysInMonth }, (_, i) => [`d${i + 1}`, i % 2 === 0 ? "P" : "AB"])),
                totp: "20", tota: "10", tillp: "15", tillab: "5",
            },
            { id: 2, serial: "02", name: "Somya", gen: "Girl", caste: "SC", 
                ...Object.fromEntries( Array.from({ length: daysInMonth }, (_, i) => [`d${i + 1}`, i % 3 === 0 ? "AB" : "P"])), 
                totp: "25", tota: "5", tillp: "20", tillab: "5", 
            },
        ];
    };

    const handleSearch = () => {
        if (searchType === "Summary") {
            setColumns(summaryColumns);
            setData(summaryData);
        }
        else if (searchType === "Details" && selectedClass && selectedMonth && selectedYear) {
            const monthIndex = new Date(Date.parse(`${selectedMonth} 1, ${selectedYear}`)).getMonth() + 1;
            setColumns(generateDetailsColumns(monthIndex, selectedYear));
            setData(generateDetailsData(monthIndex, selectedYear));
        }
    };

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Student Attendance Report"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Search"} optionMsg="Select Option" options={["Summary", "Details", "Class wise Summary", "Date wise"]} 
                    onChange={(e) => setSearchType(e.target.value)}
                />
                <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} onChange={(e) => setSelectedClass(e.target.value)} />
                <Options label={"Month"} optionMsg="Select Month" options={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                /><Options label={"Year"} optionMsg="Select Year" options={["2022", "2023", "2024", "2025"]} onChange={(e) => setSelectedYear(e.target.value)}/>
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={handleSearch} label={"Search"} />
            </div>
            
            {columns.length > 0 && <Table
                columns={columns} 
                data={data} 
                onRowSelect={() => {}}
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
            />}
            {columns.length > 0 && (<div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"} click={() => { setColumns([]); setData([]); }} />
            </div>)}

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
  );
}

export default Student_Attend_Report;
