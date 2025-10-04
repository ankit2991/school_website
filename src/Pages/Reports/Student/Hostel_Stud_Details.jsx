import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';
import CheckBox from '../../../Components/Page_Forms/CheckBox';

function Hostel_Stud_Details() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
        { header: "Mobile No.", shortHeader: "Mobile No.", accessor: "fno" },
        { header: "Address", shortHeader: "Address", accessor: "add",
            cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
        },    
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Room No.", shortHeader: "Room No.", accessor: "room" },
        { header: "Join Date", shortHeader: "Join Date", accessor: "jdate" },
        { header: "Amount", shortHeader: "Amount", accessor: "amount" },
        { header: "Remark", shortHeader: "Remark", accessor: "mark" },
    ];
    const data = [
        { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur",  fno: "1234567890", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", class: "Nur", room:"111",jdate: "26-may-2024", amount:"40,000", mark:"" },
        { id: 2, serial: "02", name: "Ajay", fname: "Rman", fno: "1234567540", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", class: "Nur", room:"111",jdate: "10-Dec-2023", amount:"40,000", mark:"" },
        { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla",  fno: "1234567890", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", class: "Nur", room:"111",jdate: "03-feb-2024", amount:"40,000", mark:"" },
        { id: 4, serial: "04", name: "anuj", fname: "aditya", fno: "1234567890", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", class: "Nur", room:"111",jdate: "10-Dec-2025", amount:"40,000", mark:"" },
        { id: 5, serial: "05", name: "somya", fname: "Devanh",  fno: "1234567867", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", class: "Nur",  room:"111",jdate: "01-jan-2024", amount:"40,000", mark:"" },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Transport Fee Details"} />
                <Buttons click={() => navigate("")} label={"Print"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                <Options label={"Options"} name={""} optionMsg="Select Option" options={["Name", "SR. No.",]}/>
                <FormInput label={"Search By"} placeholder={"Enter name, etc."} />
            </div>

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("")} label={"Search"} />                    
            </div>

            <Table 
                columns={columns} 
                data={data} 
                onRowSelect={() => {}} 
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>)}
            />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}


        </div>
    )
}

export default Hostel_Stud_Details