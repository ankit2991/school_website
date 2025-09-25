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

function Student_Summary() {
  const [srNo, setSrNo] = useState("");       // track Sr. No input
  const [showDetails, setShowDetails] = useState(false); // control visibility
  const [error, setError] = useState("");     // validation error

  const handleSearch = () => {
    if (srNo.trim() === "") {
      setError("Please enter Sr. No.");   // show error
      setShowDetails(false);              // hide details
    } else {
      setError("");                       // clear error
      setShowDetails(true);               // show details
    }
  };

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      {/* Sr. No. Input */}
      <div>
        <FormInput
          inputStyle="w-full sm:w-md"
          label={"Sr. No."}
          placeholder={"Enter Serial Number"}
          value={srNo}
          onChange={(e) => setSrNo(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

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
