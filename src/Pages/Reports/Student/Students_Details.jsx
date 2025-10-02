import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'
import { useNavigate } from 'react-router-dom'

function Students_Details() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
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
    { header: "Mother No.", shortHeader: "Mother No.", accessor: "mno" },
    { header: "Category", shortHeader: "Category", accessor: "cat" },
    { header: "Gender", shortHeader: "Gender", accessor: "gen" },
  ];

  const data = [
    { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur",  mname:"Shreya", class: "Nur", dob: "10-Dec-2022", addate: "26-may-2024", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", fno: "1234567890", mno: "1234567890", cat: "sc", gen:"Boy" },
    { id: 2, serial: "02", name: "Ajay", fname: "Rman", mname:"Priya", class: "Nur", dob: "01-jan-2021", addate: "10-Dec-2023", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", fno: "1234567540", mno: "1234567890", cat: "gen", gen:"Boy" },
    { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla",  mname:"Kiya", class: "Nur", dob: "31-sep-2023", addate: "03-feb-2024", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", fno: "1234567890", mno: "1234567890", cat: "st", gen:"Boy" },
    { id: 4, serial: "04", name: "anuj", fname: "aditya", mname:"Teena", class: "Nur", dob: "26-may-2023", addate: "10-Dec-2025", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", fno: "1234567890", mno: "1234567890", cat: "obc", gen:"Boy" },
    { id: 5, serial: "05", name: "somya", fname: "Devanh",  mname:"Shalini", class: "Nur", dob: "03-feb-2022", addate: "01-jan-2024", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", fno: "1234567867", mno: "1234567890", cat: "sc", gen:"Boy" },
  ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Student Details"} />
                <Buttons click={() => navigate("")} label={"Print"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <Options label={"Options"} name={""} optionMsg="Select Option" options={["Name", "SR. No.", "New Student"]}/>
                <FormInput label={"Search By"} placeholder={"Enter name, Sr. No., etc."} />
                <Options label={"Subject"} name={""} optionMsg="Select Subject" options={["Hindi", "English", "Science"]}/>
                <div className="sm:mt-11"><CheckBox label={""} name={""} checked={agree} checkstyle={""} onChange={(e) => setAgree(e.target.checked)}/></div>
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
           
            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
                <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-5">
                    <Buttons label={"Clear"} style='px-6 py-2'/>
                    
                </div>
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 ">
                   <Buttons label={"Parent Signature"} style='px-6 py-3'/>
                <Buttons label={"Addmission Form"} style='px-6 py-3'/>
                </div>
            </div>
              {/* ✅ Dynamic div for spacing */}
            {/* {rowDetailOpen && <div className='h-100'></div>} */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

        </div>
    )
}

export default Students_Details