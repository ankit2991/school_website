// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Heading2 from '../../Components/Page_Forms/Heading2'

// function Student_Summary2() {
//   return (
//     <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
//         <Heading label={"Student Summary"} style={"mb-5"} />

//         {/* Show details only if row selected and Select pressed */}
      
//      
//     </div>
//   )
// }

// export default Student_Summary2

import React from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Heading2 from "../../Components/Page_Forms/Heading2";

function Student_Summary2() {
  const location = useLocation();
  const student = location.state?.student || null;

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Heading label={"Student Summary"} style={"mb-5"} />

      <Heading2 label={"Student Details"} />
      
      {student ? (
        <>
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
      ) : (
        <p className="text-red-500">No student found for this search.</p>
      )}
    </div>
  );
}

export default Student_Summary2;
