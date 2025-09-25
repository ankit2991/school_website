// import React from "react";
// import FormInput from "../../Components/Page_Forms/FormInput";


// function Enquiry() {
//   return (
//     <div className="w-full px-4 py-2 h-full bg-amber-50 flex flex-col items-start">
//       <div className="text-3xl text-[#CC3015] font-bold flex mb-5">Enquiry Master</div>

//       {/* Enquiry Details */}
//       <div className="grid grid-cols-3 mb-5 gap-15">
//         <FormInput label="Enquiry Number" placeholder="Enquiry No." />
//         <FormInput label="Enquiry Date" type="date" placeholder="Select Date" />
//         <FormInput label="Form Fees" placeholder="Form Fees" />
//       </div>

//       <div className="text-xl font-semibold mb-2">Student Details</div>

//       <div className="grid grid-cols-5 mb-5 gap-10">
//         <FormInput label="First Name" placeholder="Enter Name" />
//         <FormInput label="Last Name" placeholder="Enter Class" />
//         <FormInput label="Gender" placeholder="Enter Contact" />
//         <FormInput label="DOB" placeholder="Enter Email" />
//         <FormInput label="Category" placeholder="Enter Address" className="w-70" />
//       </div>

//       <div className="text-xl font-semibold">Personal Details</div>

//       <div className="grid grid-cols-3 mb-2 space-x-10 space-y-5 w-full ">
//         <FormInput label="Father's Name" placeholder="Enter Father's Name" inputStyle="w-xl" />
//         <FormInput label="Occupation" placeholder="Enter Father's Occupation" inputStyle="w-md" />
//         <FormInput label="Mobile No." placeholder="Enter Father's Mobile No." inputStyle="w-sm"/>
//         <FormInput label="Mother's Name" placeholder="Enter Mother's Name" inputStyle="w-xl" /> 
//         <FormInput label="Occupation" placeholder="Enter Mother's Occupation" inputStyle="w-md" />
//         <FormInput label="Mobile No." placeholder="Enter Mother's Mobile No." inputStyle="w-sm" />
//         <FormInput label="Gaurdian's Name" placeholder="Enter Gaurdian's Name" inputStyle="w-xl" />
//         <FormInput label="Occupation" placeholder="Enter Gaurdian's Occupation" inputStyle="w-md" />
//         <FormInput label="Mobile No." placeholder="Enter Gaurdian's Mobile No." inputStyle="w-sm" />
//         <FormInput label="Gaurdian Relation" placeholder="Enter Gaurdian Relation" inputStyle="w-md" />
//         <FormInput label="Phone No." placeholder="Enter Phone No." inputStyle="w-sm" />
//         <FormInput label="Father's Income" placeholder="Enter Father's Income" inputStyle="w-sm" />
//         <FormInput label="Birth Place" placeholder="Enter Birth Place" inputStyle="w-xs" />
//         <FormInput label="Blood Group" placeholder="Enter Blood Group" inputStyle="w-xs" />
//         <FormInput label="Body Sign" placeholder="Enter Body Sign" inputStyle="w-xs" />
          
//       </div>
//       <div className="space-y-5 w-full mb-6">
//         <FormInput label="Address" placeholder="Enter Address" inputStyle="w-full" />
//         <FormInput label="Address2" placeholder="Enter Address2" inputStyle="w-full" />
//        <div className="grid grid-cols-2">
//          <FormInput label="Email" placeholder="Enter Email" inputStyle="w-3xl" />
//         <FormInput label="Addhar Card No." placeholder="Enter Addhar Card No." inputStyle="w-xs" />
//        </div>
//       <FormInput className="w-7xl  mb-5" placeholder="Enter Your Remarks" label="Remarks"/> 
//       </div>
      
//       <div className="text-xl font-semibold mb-2">Last School</div>

//       <div className="grid grid-cols-3 mb-5 space-x-20">
//         <FormInput label="Last School" placeholder="Enter School Name" inputStyle="w-lg" />
//         <FormInput label="Last Class" placeholder="Enter Class" inputStyle="w-xs" />
//         <FormInput label="Percentage" placeholder="Enter Percentage" inputStyle="w-xs" />       
//       </div>

//     </div>
//   );
// }

// export default Enquiry;

import React from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Heading from "../../Components/Page_Forms/Heading";
import Heading2 from "../../Components/Page_Forms/Heading2";
import Options from "../../Components/Page_Forms/Options";

function Add_Enquiry() {
  return (
    <div className="w-full h-full px-4 py-6 bg-white flex flex-col ">
      <Heading style={"mb-5"} label={"Enquiry Master"}/> 
      

      {/* Enquiry Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput label={"Enquiry Number" }placeholder={"Enquiry No."} />
        <FormInput label={"Enquiry Date"} type="date" placeholder={"Select Date"} />
        <FormInput label={"Form Fees"} placeholder={"Form Fees"} />
      </div>

      <Heading2 label={"Student Details"}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 w-full">
        <FormInput label={"First Name"} placeholder={"Enter Name"} />
        <FormInput label={"Last Name"} placeholder={"Enter Class"} />
        <Options label={"Gender"} name={""} optionMsg="Select Gender" options={["Boy", "Girl"]}/>
        <FormInput label={"DOB"} type="date" placeholder={"Enter DOB"} />
        <Options label={"Category"} name={""} optionMsg="Select Category" options={["Gen", "OBC", "ST", "SC", "MIN", "SBC"]}/>
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

      <div className="space-y-5 w-full mb-6">
        <FormInput label={"Address"} placeholder={"Enter Address"} />
        <FormInput label={"Address2"} placeholder={"Enter Address2"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput label={"Email"} placeholder={"Enter Email"} />
          <FormInput label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} />
        </div>
        <FormInput label={"Remarks"} placeholder="Enter Your Remarks" />
      </div>

      <Heading2 label={"Last School"}/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput label={"Last School"} placeholder={"Enter School Name"} />
        <FormInput label={"Last Class"} placeholder={"Enter Class"} />
        <FormInput label={"Percentage"} placeholder={"Enter Percentage"} />
      </div>
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
        <Buttons label={"Cancel"}/>
        <Buttons label={"Save"}/>
      </div>
    </div>
  );
}

export default Add_Enquiry;

