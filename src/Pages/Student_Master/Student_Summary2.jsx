import React from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Heading2 from "../../Components/Page_Forms/Heading2";

function Student_Summary2() { 
  const location = useLocation(); 
  const student = location.state?.student || {}; 
  
  return ( 
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col"> 
      <Heading label={"Student Summary"} style={"mb-5"} /> 
      <Heading2 label={"Student Details"} /> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4"> 
        <FormInput 
          label="Student ID" value={student.Id || ""} disabled 
        /> 
        <FormInput 
          label="Student Name" value={student.Name || ""} 
        /> 
        <FormInput 
          label="Father Name" value={student.FatherName || ""} 
        /> 
        <FormInput 
          label="Mother Name" value={student.MotherName || ""} 
        /> 
        <FormInput 
          label="Date Of Birth" value={student.DOB || ""} 
        /> 
        <FormInput 
          label="Mobile Number" value={student.FMobileNo || ""} 
        /> 
        <FormInput 
          label="Caste" value={student.Caste || ""} 
        /> 
        <FormInput 
          label="Student Type" value={student.StudentType || ""} 
        /> 
        <FormInput 
          label="Admission Date" value={student.AdmissionDate || ""} 
        /> 
        <FormInput 
          label="Class" value={student.Class || ""} 
        /> 
        <FormInput 
          label="Gender" value={student.Gender || ""} 
        /> 
        <FormInput 
          label="Aadhar Card Number" value={student.STIdCardNo || ""} 
        /> 
      </div> 
      
      <div className="gap-y-4"> 
        <FormInput 
          label="Address" value={student.Address1 || ""} 
        /> 
        <FormInput 
          label="Remark" value={student.Remarks || ""} 
        /> 
      </div> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-4"> 
        <FormInput 
          label="Fee Calculation Date" value={student.FeeCalDate || ""} 
        /> 
        <FormInput 
          label="Total Fees" value={student.TotalFee || ""} 
        /> 
        <FormInput 
          label="Paid Fees" value={student.PaidFee || ""} 
        /> 
        <FormInput 
          label="Transport Calculation Date" value={student.TranCalDate || ""} 
        /> 
        <FormInput 
          label="Total Fees" value={student.TotalFeeTran || ""} 
        /> 
        <FormInput 
          label="Paid Fees" value={student.PaidFeeTran || ""} 
        /> 
      </div> 
    </div> 
  ); 
} 

export default Student_Summary2;
