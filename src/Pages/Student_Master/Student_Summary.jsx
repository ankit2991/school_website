// import React from 'react'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { useNavigate } from 'react-router-dom'
// import Heading2 from '../../Components/Page_Forms/Heading2';

// function Student_Summary() {
//     const navigate = useNavigate();
//   return (
//     <div className='w-full h-full px-4 py-2 bg-white flex flex-col '>
//         <FormInput inputStyle='w-full sm:w-md' label={"Sr. No."} placeholder={"Enter Serial Number"} />
//         <div className='flex justify-end py-5'>
//             <Buttons click={() => navigate("/")} label={"Search"}/>
//         </div>
//         <Heading2 label={"Student Details"}/>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4">
//             <FormInput label={"Student ID"} placeholder={"Enter Student ID"} />
//             <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
//             <FormInput label={"Father Name"} placeholder={"Enter Father Name"} />
//             <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"} />
//             <FormInput label={"Date Of Birth"} type='date' placeholder={"Select Date Of Birth"} />
//             <FormInput label={"Mobile Number"} placeholder={"Enter Mobile Number"} />
//             <FormInput label={"Caste"} placeholder={"Enter Caste"} />
//             <FormInput label={"Student Type"} placeholder={"Enter Student Type"} />
//             <FormInput label={"Addmission Date"} type='date' placeholder={" Date"} />
//             <FormInput label={"Class"} placeholder={"Enter Class"} />
//             <FormInput label={"Gender"} placeholder={"Enter Gender"} />
//             <FormInput label={"Aadhar Card Number"} placeholder={"Enter Aadhar Card Number"} />
            
//         </div>
//         <div className="gap-y-4">
//             <FormInput label={"Address"} placeholder={"Enter Address"} inputStyle='mb-4' />
//             <FormInput label={"Remark"} placeholder={"Enter Remark"} inputStyle='mb-4' />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4">
//             <FormInput label={"Fee Calculation Date"} type='date' placeholder={"Enter Fee Calculation Date"} />
//             <FormInput label={"Total Fees"} placeholder={"Enter Total Fees"} />
//             <FormInput label={"Paid Fees"} placeholder={"Enter Paid Fees"} />
//             <FormInput label={"Transport Calculation Date"} type='date' placeholder={"Enter Fee Calculation Date"} />
//             <FormInput label={"Total Fees"} placeholder={"Enter Total Fees"} />
//             <FormInput label={"Paid Fees"} placeholder={"Enter Paid Fees"} />
//         </div>
//     </div>
//   )
// }

// export default Student_Summary

import React, { useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Heading2 from "../../Components/Page_Forms/Heading2";
import Dialog from "../../Components/Page_Forms/Dialog";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";

function Student_Summary() {
  const [srNo, setSrNo] = useState("");       // track Sr. No input
  const [showDetails, setShowDetails] = useState(false); // control visibility
  const [error, setError] = useState("");     // validation error
  const [open, setOpen] = useState(false);  

  const handleSearch = () => {
    if (srNo.trim() === "") {
      setError("Please enter Sr. No.");   // show error
      setShowDetails(false);              // hide details
    } else {
      setError("");                       // clear error
      setShowDetails(true);               // show details
    }
  };
  const columns = [
    { header: "Serial Number", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Name ",  shortHeader: "Name", accessor: "name" },
    { header: "Father Name ",  shortHeader: "Father Name", accessor: "fname" },
    { header: "Mother Name ",  shortHeader: "Mother Name", accessor: "mname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "Father Mobile Number", shortHeader: "Father No.", accessor: "fno" },
    ]

    const data = [
        { id: 2, serial: "01", name: "Ajay",  fname:"Rman Thakur", mname:"Seema Thakur", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
        { id: 3, serial: "02", name: "Viren",  fname:"Devanh Bhalla", mname:"Aradhya Bhalla.", class:"Nur", fno:"1234567890", },
       
    ];

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Heading label={"Student Summary"} style={"mb-5"}/>
      {/* Sr. No. Input */}
      <div>
        <FormInput inputStyle="w-full sm:w-md" label={"Sr. No."} placeholder={"Enter Serial Number"} value={srNo} onChange={(e) => setSrNo(e.target.value)}/>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5">
         <Buttons click={() => setOpen(true)} label={"Search"} />
      </div>
            <Dialog open={open} title={"Student List"} dialogstyle={"sm:mx-5 h-[660px] sm:h-[710px]"} children={<>
                <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                  <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                  <Options label={"Search By"} name={""} optionMsg="Select Option" options={["Serial Number", "Name", "Father Name", "Mobile Number"]}/>
                  <FormInput label={"Enter"} placeholder={"Enter"} />
                </div>
                <div className="flex justify-end py-5">
                  <Buttons click={() => setOpen(false)} label={"Search"} />                    
                </div>
                <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md '>
                  <Table columns={columns} data={data} style={"max-h-[38vh] sm:max-h-[42vh]"}/>
                </div>
                <div className="flex justify-end mt-5">
                  <Buttons click={() => setOpen(false)} label={"Select"} />                    
                </div>
              </>}/>

      {/* Show details only if searched */}
      {showDetails && (
        <>
          <Heading2 label={"Student Details"} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4">
            <FormInput label={"Student ID"} placeholder={"Enter Student ID"} />
            <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
            <FormInput label={"Father Name"} placeholder={"Enter Father Name"} />
            <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"} />
            <FormInput label={"Date Of Birth"} type="date" placeholder={"Select Date Of Birth"} />
            <FormInput label={"Mobile Number"} placeholder={"Enter Mobile Number"} />
            <FormInput label={"Caste"} placeholder={"Enter Caste"} />
            <FormInput label={"Student Type"} placeholder={"Enter Student Type"} />
            <FormInput label={"Admission Date"} type="date" placeholder={"Date"} />
            <FormInput label={"Class"} placeholder={"Enter Class"} />
            <FormInput label={"Gender"} placeholder={"Enter Gender"} />
            <FormInput label={"Aadhar Card Number"} placeholder={"Enter Aadhar Card Number"} />
          </div>

          <div className="gap-y-4">
            <FormInput label={"Address"} placeholder={"Enter Address"} inputStyle="mb-4" />
            <FormInput label={"Remark"} placeholder={"Enter Remark"} inputStyle="mb-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4">
            <FormInput label={"Fee Calculation Date"} type="date" placeholder={"Enter Fee Calculation Date"} />
            <FormInput label={"Total Fees"} placeholder={"Enter Total Fees"} />
            <FormInput label={"Paid Fees"} placeholder={"Enter Paid Fees"} />
            <FormInput label={"Transport Calculation Date"} type="date" placeholder={"Enter Fee Calculation Date"} />
            <FormInput label={"Total Fees"} placeholder={"Enter Total Fees"} />
            <FormInput label={"Paid Fees"} placeholder={"Enter Paid Fees"} />
          </div>
        </>
      )}
    </div>
  );
}

export default Student_Summary;
