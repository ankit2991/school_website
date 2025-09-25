import React from 'react'
import FormInput from '../../Components/Page_Forms/FormInput'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import Heading2 from '../../Components/Page_Forms/Heading2'
import FaceUploader from '../../Components/Page_Forms/FaceUploader'
import Options from '../../Components/Page_Forms/Options'

function Create_Student2() {
  return (
    <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
        <Heading label={"Student Master"}/>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-50 gap-y-5 sm:gap-y-0 my-5 w-full sm:w-6xl">
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
  )
}

export default Create_Student2