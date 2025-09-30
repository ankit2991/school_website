// import React from "react";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import Options from "../../Components/Page_Forms/Options";
// import Heading from "../../Components/Page_Forms/Heading";
// import Table from "../../Components/Page_Forms/Table";
// import { useNavigate } from "react-router-dom"

// function Student_Details() {
//     const navigate = useNavigate()
     
//     const columns = [
//         { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
//         { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//         { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
//         { header: "Class", shortHeader: "Class", accessor: "class" },
//         { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
//         { header: "Address", shortHeader: "Address", accessor: "add" },
//         { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
//         { header: "Category", shortHeader: "Category", accessor: "cat" },
//     ];
    
//     const data = [
//         { id: 1, serial: "01", roll: "11", name: "Ajay", fname: "Rman Thakur",  class: "Nur", dob: "10-Dec-2022", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", fno: "1234567890", cat: "sc", },
//         { id: 2, serial: "02", roll: "12", name: "Ajay", fname: "Rman",  class: "Nur", dob: "01-jan-2021", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021 ", fno: "1234567540", cat: "gen", },
//         { id: 3, serial: "03", roll: "13", name: "Viren", fname: "Devanh Bhalla",  class: "Nur", dob: "31-sep-2023", add: "3rd Floor, Lakeview Residency,  Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", fno: "1234567890", cat: "st", },
//         { id: 3, serial: "04", roll: "14", name: "anuj", fname: "aditya ",  class: "Nur", dob: "26-may-2023", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", fno: "1234567890", cat: "obc", },
//         { id: 3, serial: "05", roll: "15", name: "somya", fname: "Devanh ",  class: "Nur", dob: "03-feb-2022", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", fno: "1234567867", cat: "sc", },
//     ];
    
//    return (
//     <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
//       <Heading label={"Student Details"} style={"mb-5"} />

//       {/* Filters */}
//       <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
//         {/* Class */}
//         <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>

//         {/* Room */}
//         <Options label={"Room"} optionMsg="Select Option" options={["Room1", "Room2", "Room3", "Room4"]}/>

//         {/* Name */}
//         <Options label={"Room"} optionMsg="Select Option" options={["Name", "Serial No.",]}/>

//         {/* Enter */}
//         <FormInput label={"Enter"} placeholder={"Enter"} />
//       </div>

//       {/* Search Button */}
//       <div className="flex justify-end py-5">
//         <Buttons click={() => navigate("")} label={"Search"} />
//       </div>

//       {/* Table */}
//       <Table columns={columns} data={data}/>
      
//     </div>
//   );
// }

// export default Student_Details



import React, { useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";
import Dialog from "../../Components/Page_Forms/Dialog"; // import your dialog
import Heading2 from "../../Components/Page_Forms/Heading2";
import FaceUploader from "../../Components/Page_Forms/FaceUploader";

function Student_Details() {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = [
    { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
    { 
      header: "Address", 
      shortHeader: "Address", 
      accessor: "add",
      cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md"
    },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
    { header: "Category", shortHeader: "Category", accessor: "cat" },
  ];

  const allData = [
    { id: 1, serial: "01", roll: "11", name: "Ajay", fname: "Rman Thakur", class: "Nur", dob: "10-Dec-2022", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", fno: "1234567890", cat: "sc" },
    { id: 2, serial: "02", roll: "12", name: "Ajay", fname: "Rman", class: "Nur", dob: "01-jan-2021", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021", fno: "1234567540", cat: "gen" },
    { id: 3, serial: "03", roll: "13", name: "Viren", fname: "Devanh Bhalla", class: "Nur", dob: "31-sep-2023", add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", fno: "1234567890", cat: "st" },
    { id: 4, serial: "04", roll: "14", name: "anuj", fname: "aditya", class: "Nur", dob: "26-may-2023", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", fno: "1234567890", cat: "obc" },
    { id: 5, serial: "05", roll: "15", name: "somya", fname: "Devanh", class: "Nur", dob: "03-feb-2022", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", fno: "1234567867", cat: "sc" },
  ];

  // initialize filteredData
  React.useEffect(() => setFilteredData(allData), []);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredData(allData);
      return;
    }

    const lower = searchText.toLowerCase();
    const results = allData.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(lower))
    );
    setFilteredData(results);
  };

  // Row click handler for dialog
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Heading label={"Student Details"} style={"mb-5"} />

      {/* Filters */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
        <Options label={"Room"} optionMsg="Select Room" options={["Room1", "Room2", "Room3", "Room4"]} />
        <Options label={"Search By"} optionMsg="Select Option" options={["Name", "Serial No."]} />
        <FormInput label={"Enter"} placeholder={"Enter name, etc."} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      {/* Table */}
      {/* <Table columns={columns} data={filteredData} selectable={false} onRowSelect={handleRowClick} /> */}

      <Table
  columns={columns}
  data={filteredData}
  selectable={false}
  disableFloatingRow={true} // disable mobile overlay
  onRowSelect={handleRowClick}
/>
 

      {/* Dialog */}
      <Dialog open={openDialog} title="Student Details" dialogstyle={"sm:w-5xl h-[600px] sm:h-[550px] sm:mx-5"}>
        {selectedRow && (
         <div >
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-5 gap-y-5 sm:gap-y-0 my-5 w-full ">
          <FormInput label={"Enquiry Number"} placeholder={"Enter Enquiry Number"}/>
          <FormInput label={"Aadhar Card"} placeholder={"Enter Aadhar Card"}/>
        </div>
        <div className='flex justify-end'>
            <Buttons label={"Search"}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <FormInput label={"Student ID"} placeholder={"Enter Student ID"} />
          <FormInput label={"Sr. No."} placeholder={"Enter Serial Number"} />
          <FormInput label={"Enrollment No."} placeholder={"Enter Enrollment No."} />
          <FormInput label={"First Name"} placeholder={"Enter First Name"} />
          <Options label={"Gender"} name={""} optionMsg="Select Gender" options={["Boy", "Girl"]}/>
          <FormInput label={"Date Of Birth"} type='date' />
          <Options label={"Student Type"} name={""} optionMsg="Select Student Type" options={["Paid", "Free", "RTE",]}/>
          <Options label={"Category"} name={""} optionMsg="Select Category" options={["Gen", "OBC", "ST", "SC", "MIN", "SBC"]}/>
          <FormInput label={"Caste"} placeholder={"Enter Caste"} />
          <FormInput label={"Addmission Date"} type='date' />
          <FormInput label={"Join Date"} type='date' />
          <FormInput label={"Fee Calculate Date"} type='date' />            
        </div>
        <Heading2 label={"Last School"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <FormInput label={"Last School"} placeholder={"Enter Last School"} />
          <Options label={"Last Class"} name={""} optionMsg="Select Last Class" options={["Nur", "K.G.", "Prep"]}/>
          <FormInput label={"T.C. No."} placeholder={"Enter T.C. Number"} />
          <FormInput label={"T.C. Date"} type='date' />
          <FormInput label={"Addmission Session"} placeholder={"Enter Addmission Session"} />
          <FormInput label={"Addmission In Class"} placeholder={"Enter Addmission In Class"} />
        </div>
        <Heading2 label={"Assign Class"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <Options label={"New Student"} name={""} optionMsg="Select New Student" options={["Yes", "No",]}/>
          <Options label={"Last Class"} name={""} optionMsg="Select Last Class" options={["Nur", "K.G.", "Prep"]}/>
          <FormInput label={"Nationality"} placeholder={"Enter Nationality"} />          
        </div>
         <Heading2 label={"Personal Details"}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
        <FormInput label={"Father's Name"} placeholder={"Enter Father's Name"} />
        <FormInput label={"Occupation"} placeholder={"Enter Father's Occupation"} />
        <FormInput label={"Mobile No."} placeholder={"Enter Father's Mobile No."} />
        <FormInput label={"Mother's Name"} placeholder={"Enter Mother's Name"} />
        <FormInput label={"Occupation"} placeholder={"Enter Mother's Occupation"} />
        <FormInput label={"Mobile No."} placeholder={"Enter Mother's Mobile No."} />
        <FormInput label={"Father Aadhar No."} placeholder={"Enter Father Aadhar No."} />
        <FormInput label={"Mother Aadhar No."} placeholder={"Enter Mother Aadhar No."} />
        <FormInput label={"JAN Aadhar No."} placeholder={"Enter JAN Aadhar No."} />
        <FormInput label={"Guardian's Name"} placeholder={"Enter Guardian's Name"} />
        <FormInput label={"Occupation"} placeholder={"Enter Guardian's Occupation"} />
        <FormInput label={"Mobile No."} placeholder={"Enter Guardian's Mobile No."} />
        <FormInput label={"Guardian Relation"} placeholder={"Enter Guardian Relation" }/>
        <FormInput label={"Phone No."} placeholder={"Enter Phone No." }/>
        <FormInput label={"Father's Income"} placeholder={"Enter Father's Income"} />
        <FormInput label={"Birth Place"} placeholder={"Enter Birth Place" }/>
        <FormInput label={"Blood Group"} placeholder={"Enter Blood Group" }/>
        <FormInput label={"Body Sign"} placeholder={"Enter Body Sign" }/>
      </div>
      <div className="flex justify-center">
        <FaceUploader/>
      </div>

      <div className="space-y-5 w-full mb-6">
        <FormInput label={"Address"} placeholder={"Enter Address"} />
        <FormInput label={"Address2"} placeholder={"Enter Address2"} />
        {/* Before lg layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {/* Email full width */}
          <div className="col-span-1 sm:col-span-2">
            <FormInput label={"Email"} placeholder={"Enter Email"} />
          </div>
          {/* Aadhar + Last Balance side by side */}
          <FormInput label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} />
          <FormInput label={"Last Balance"} placeholder={"Enter Last Balance"} />
        </div>
        {/* lg and above: keep your nested structure */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput label={"Email"} placeholder={"Enter Email"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} />
            <FormInput label={"Last Balance"} placeholder={"Enter Last Balance"} />
          </div>
        </div>
        {/* Before lg layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {/* Row 1 */}
          <FormInput label={"Transport Last Balance"} placeholder={"Enter Transport Last Balance"} />
          <FormInput label={"Fee Discount"} placeholder={"Enter Fee Discount"} />
          {/* Row 2 */}
          <FormInput label={"Addmission Fee"} placeholder={"Enter Addmission Fee"} />
          <FormInput label={"Question Money"} placeholder={"Enter Question Money"} />
          {/* Row 3 */}
          <div className="col-span-1 sm:col-span-2">
            <FormInput label={"Remarks"} placeholder={"Enter Your Remarks"} />
          </div>
        </div>
        {/* On lg and above: keep original structure */}
        <div className="hidden lg:block w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
            <FormInput label={"Transport Last Balance"} placeholder={"Enter Transport Last Balance"} />
            <FormInput label={"Fee Discount"} placeholder={"Enter Fee Discount"} />
            <FormInput label={"Addmission Fee"} placeholder={"Enter Addmission Fee"} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <FormInput label={"Question Money"} placeholder={"Enter Question Money"} />
            <FormInput label={"Remarks"} placeholder={"Enter Your Remarks"} />
          </div>
        </div>
      </div>

       <Heading2 label={"Left Info"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <Options label={"Left"} name={""} optionMsg="Select Left" options={["Yes", "No",]}/>
          <FormInput label={"N.S.O Date"} type='date' />
          <FormInput label={"Reason"} placeholder={"Enter Reason"} />
        </div>
    </div>
        )}
        <div className="flex justify-end mt-4">
          <Buttons label="Close" click={() => setOpenDialog(false)} />
        </div>
      </Dialog>
    </div>
  );
}

export default Student_Details;




// import React, { useState } from "react";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import Options from "../../Components/Page_Forms/Options";
// import Heading from "../../Components/Page_Forms/Heading";
// import Table from "../../Components/Page_Forms/Table";
// import { useNavigate } from "react-router-dom";

// function Student_Details() {
//     const navigate = useNavigate();
    
//     const columns = [
//         { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
//         { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
//         { header: "Name", shortHeader: "Name", accessor: "name" },
//         { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
//         { header: "Class", shortHeader: "Class", accessor: "class" },
//         { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
//         { header: "Address", shortHeader: "Address", accessor: "add",
//             cellStyle: "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md",
//         },
//         { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
//         { header: "Category", shortHeader: "Category", accessor: "cat" },
//     ];

//     const allData = [
//         { id: 1, serial: "01", roll: "11", name: "Ajay", fname: "Rman Thakur", class: "Nur", dob: "10-Dec-2022", add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012", fno: "1234567890", cat: "sc", },
//         { id: 2, serial: "02", roll: "12", name: "Ajay", fname: "Rman", class: "Nur", dob: "01-jan-2021", add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021 ", fno: "1234567540", cat: "gen", },
//         { id: 3, serial: "03", roll: "13", name: "Viren", fname: "Devanh Bhalla", class: "Nur", dob: "31-sep-2023", add: "3rd Floor, Lakeview Residency,  Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066", fno: "1234567890", cat: "st", },
//         { id: 4, serial: "04", roll: "14", name: "anuj", fname: "aditya", class: "Nur", dob: "26-may-2023", add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019", fno: "1234567890", cat: "obc", },
//         { id: 5, serial: "05", roll: "15", name: "somya", fname: "Devanh", class: "Nur", dob: "03-feb-2022", add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007", fno: "1234567867", cat: "sc", },
//     ];

//     const [searchText, setSearchText] = useState("");
//     const [filteredData, setFilteredData] = useState(allData);

//     // ✅ Handle search
//     const handleSearch = () => {
//         if (!searchText.trim()) {
//             setFilteredData(allData); // if empty, show all
//             return;
//         }
        
//         const lowerSearch = searchText.toLowerCase();
//         const results = allData.filter((row) =>
//             Object.values(row).some((value) => String(value).toLowerCase().includes(lowerSearch)
//         ));
        
//         setFilteredData(results);
//     };
    
//     return (
//         <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
//             <Heading label={"Student Details"} style={"mb-5"} />
            
//             {/* Filters */}
//             <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
//                 {/* Class */}
//                 <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
//                 {/* Room */}
//                 <Options label={"Room"} optionMsg="Select Room" options={["Room1", "Room2", "Room3", "Room4"]} />
//                 {/* Name/Serial */}
//                 <Options label={"Search By"} optionMsg="Select Option" options={["Name", "Serial No."]} />
//                 {/* Enter */}
//                 <FormInput label={"Enter"} placeholder={"Enter name, etc."} value={searchText} onChange={(e) => setSearchText(e.target.value)} />                    
//             </div>
            
//             {/* Search Button */}
//             <div className="flex justify-end py-5">
//                 <Buttons click={handleSearch} label={"Search"} />
//             </div>

//             {/* Table */}
//             <Table columns={columns} data={filteredData} />
//         </div>
//     );
// }

// export default Student_Details;
