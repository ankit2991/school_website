import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'
import { useNavigate } from 'react-router-dom'

function Exam_Admit_Card() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
    { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
    { header: "Room No.", shortHeader: "Room No.", accessor: "room" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
    { header: "Addmission Date", shortHeader: "Addmission Date", accessor: "addate" },
    { 
      header: "Address", 
      shortHeader: "Address", 
      accessor: "add",
      cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
    },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
    { header: "Category", shortHeader: "Category", accessor: "cat" },
  ];

  const data = [
    { id: 1, roll: "01", room:"8", name: "Ajay", fname: "Rman Thakur",  mname:"Shreya", class: "Nur", dob: "10-Dec-2022", addate: "26-may-2024", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", fno: "1234567890", cat: "sc", },
    { id: 2, roll: "02", room:"9", name: "Ajay", fname: "Rman", mname:"Priya", class: "Nur", dob: "01-jan-2021", addate: "10-Dec-2023", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", fno: "1234567540", cat: "gen", },
    { id: 3, roll: "03", room:"3", name: "Viren", fname: "Devanh Bhalla",  mname:"Kiya", class: "Nur", dob: "31-sep-2023", addate: "03-feb-2024", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", fno: "1234567890", cat: "st", },
    { id: 4, roll: "04", room:"5", name: "anuj", fname: "aditya", mname:"Teena", class: "Nur", dob: "26-may-2023", addate: "10-Dec-2025", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", fno: "1234567890", cat: "obc", },
    { id: 5, roll: "05", room:"7", name: "somya", fname: "Devanh",  mname:"Shalini", class: "Nur", dob: "03-feb-2022", addate: "01-jan-2024", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", fno: "1234567867", cat: "sc", },
  ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Exam Admit Card"} />
                <Buttons click={() => navigate("")} label={"Print"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label="Exam" name="" optionMsg="Select Vehicle No." options={["Unit Test", "Yearly Test", "Annual Exam"]}/>
                <FormInput label={"Search By"} placeholder={"Enter name, Sr. No., etc."} />
                <FormInput label={"Search"} placeholder={"Enter Name, etc."}/>
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
           
             <div className="flex justify-center sm:justify-end mt-5">
                <Buttons click={""} label={"Clear"} />
            </div>

              {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

        </div>
    )
}

export default Exam_Admit_Card