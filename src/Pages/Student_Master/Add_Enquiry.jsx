import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Heading from "../../Components/Page_Forms/Heading";
import Heading2 from "../../Components/Page_Forms/Heading2";
import Options from "../../Components/Page_Forms/Options";
import { getcaste, getEnquiryInsert, getEnquiryNo, getEnquiryDetail, } from "../../services/api";
import useClassList from "../../hooks/useClassList";

function Add_Enquiry() {
  const location = useLocation();
  const editEqId = location.state?.eqid || 0; // ✅ ADDED
  const instId = localStorage.getItem("InstituteID");
  const userId = localStorage.getItem("UserId");
  const sessId = localStorage.getItem("SessionID");
  const { classList } = useClassList(); // 👈 only use classList
  // const [selectedClassId, setSelectedClassId] = useState("");
  const [casteList, setCasteList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [EnqNo, setEnqNo] = useState(null);

  const [formData, setFormData] = useState({ 
    eqid: 0, eqno: 0, enqDate: "", ffees: "", classId: "", casteId: "", name: "", gender: "", dob: "", father: "", fatherOcc: "", 
    fatherMobile: "", mother: "", motherOcc: "", motherMobile: "", guardian: "", guardianOcc: "", guardianMobile: "", guardianRel: "", 
    phone: "", fatherInc: "", birthplace: "", bloodgroup: "", bodysign: "", address: "", address2: "", AadharNo: "", remark: "", 
    lastschool: "", lastclass: "", percent: "", 
  }); 
  
  /* ================= CHANGE HANDLER ================= */ 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData((p) => ({ ...p, [name]: value })); 
  }; 
  
  /* ================= CLEAR FORM ================= */ 
  const clearForm = () => { 
    setFormData({ 
      eqid: 0, eqno: 0, enqDate: "", ffees: "", classId: "", casteId: "", name: "", gender: "", dob: "", father: "", fatherOcc: "", 
      fatherMobile: "", mother: "", motherOcc: "", motherMobile: "", guardian: "", guardianOcc: "", guardianMobile: "", guardianRel: "", 
      phone: "", fatherInc: "", birthplace: "", bloodgroup: "", bodysign: "", address: "", address2: "", AadharNo: "", remark: "", 
      lastschool: "", lastclass: "", percent: "", 
    }); 
  }; 
  
  /* ================= FETCH CASTE ================= */ 
  useEffect(() => { 
    getcaste().then((res) => { 
      if (res?.Table?.[0]?.ResultCode === "R100") { 
        setCasteList(res.Table1 || []); 
      } 
    }); 
  }, []); 
  
  /* ================= FETCH ENQUIRY NO (ONLY ADD MODE) ================= */ 
  useEffect(() => { 
    if (!instId || editEqId) return; 

    getEnquiryNo(instId).then((res) => { 
      if (res?.Table?.[0]?.ResultCode === "R100") { 
        const row = res.Table1?.[0]; 
        setEnqNo(row); 
        setFormData((p) => ({ 
          ...p, 
          eqno: row?.MaxEnquireNo || 0, 
        })); 
      } 
    }); 
  }, [instId, editEqId]); 
  
  /* ================= FETCH ENQUIRY DETAIL (EDIT MODE) ================= */ 
  useEffect(() => { 
    if (!editEqId) return; 
    setPageLoading(true); 
    getEnquiryDetail(editEqId).then((res) => { 
      const d = res?.Table1?.[0]; 
      if (!d) return; 
      setFormData({ 
        eqid: d.Id, eqno: d.EnquireNo, enqDate: apiDateToInput(d.EnquireDate), ffees: d.FormFees || "", classId: d.F_ClassMaster, 
        casteId: d.F_CastMaster, name: d.Name, gender: d.Gender, dob: apiDateToInput(d.DOB), father: d.FatherName, 
        fatherOcc: d.Foccupation, fatherMobile: d.FMobileNo, mother: d.MotherName, motherOcc: d.Moccupation, motherMobile: d.MMobileNo, 
        guardian: d.GaurdianName, guardianOcc: d.Goccupation, guardianMobile: d.GMobileNo, guardianRel: d.Grelation, phone: d.Phoneno, 
        fatherInc: d.FatherIncome || "0", birthplace: d.BirthPlace, bloodgroup: d.BloodGroup, bodysign: d.BodySign, address: d.Address1, 
        address2: d.Address2, AadharNo: d.STIdCardNo || "0", remark: d.Remarks, lastschool: d.LastSchool, lastclass: d.F_LastClass, 
        percent: d.SPercentage, 
      }); 
      
      setEnqNo({ MaxEnquireNo: d.EnquireNo }); // ✅ SHOW OLD ENQ NO 
    }).finally(() => setPageLoading(false)); 
  }, [editEqId]); 
  
  /* ================= DATE FORMATTER ================= */ 
  // INPUT → API 
  const formatDateForApi = (dateStr) => { 
    if (!dateStr) return ""; 
    const d = new Date(dateStr); 
    if (isNaN(d)) return ""; 
    const day = d.getDate().toString().padStart(2, "0"); 
    const month = d.toLocaleString("en-GB", { month: "short" }).toLowerCase(); 
    const year = d.getFullYear(); 
    return `${day}/${month}/${year}`; 
  }; 
  
  // API → INPUT 
  const apiDateToInput = (apiDate) => { 
    if (!apiDate) return ""; 
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
    const d = new Date(timestamp); 
    const year = d.getFullYear(); 
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate()).padStart(2, "0"); 
    return `${year}-${month}-${day}`; 
  }; 
  
  /* ================= SAVE ================= */ 
  const handleSave = async () => { 
    if (!instId || !userId || !sessId) { 
      alert("Session expired"); 
      return; 
    } 
    
    setPageLoading(true); 
    try { 
      const res = await getEnquiryInsert({ 
        instId, 
        sessId, 
        userId, 
        ...formData, 
        enqDate: formatDateForApi(formData.enqDate), 
        dob: formatDateForApi(formData.dob), 
      }); 
      
      const msg = res?.Table?.[0]?.Msg || ""; 
      if (msg.startsWith("M101")) { 
        alert( 
          formData.eqid ? "Enquiry updated successfully ✅" 
          : "Enquiry inserted successfully ✅" 
        ); 
        clearForm(); 
      } else { 
        alert(msg || "Failed"); 
      } 
    } finally { 
      setPageLoading(false); 
    } 
  }; 
  
  return ( 
    <> 
      {pageLoading && ( 
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50"> 
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div> 
        </div> 
      )} 
      
      <div className="w-full h-full px-4 py-6 bg-white flex flex-col"> 
        <Heading label="Enquiry Master" style="mb-5" /> 
        
        {/* ================= ENQUIRY DETAILS ================= */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5"> 
          {/* <Options 
            label="Class" optionMsg="Select Class" value={formData.classId} 
            options={classList} valueKey="Id" labelKey="ClassName" 
            onChange={(e) => setSelectedClassId(e.target.value)} 
          />  */}

          <Options 
            label="Class" optionMsg="Select Class" value={formData.classId} 
            options={classList} valueKey="Id" labelKey="ClassName" 
            onChange={(e) => setFormData(p => ({ ...p, classId: e.target.value })) } 
          /> 
          
          <FormInput 
            label="Enquiry Number" value={EnqNo?.MaxEnquireNo || ""} disabled 
          /> 
          
          <FormInput 
            label="Enquiry Date" type="date" name="enqDate" 
            value={formData.enqDate} onChange={handleChange} 
          /> 
          
          <FormInput 
            label="Form Fees" name="ffees" 
            value={formData.ffees} onChange={handleChange} 
          /> 
        </div> 
        {/* ================= ENQUIRY DETAILS END ================= */} 
        
        {/* ================= STUDENT DETAILS ================= */} 
        <Heading2 label="Student Details" /> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5"> 
          <FormInput 
            label="First Name" name={"name"} 
            value={formData.name} onChange={handleChange} 
          /> 
          
          <Options 
            label="Gender" name="gender" value={formData.gender} 
            optionMsg="Select Gender" options={["Boy", "Girl"]} 
            onChange={handleChange} 
          /> 
          
          <FormInput 
            label="DOB" type="date" name="dob" 
            value={formData.dob} onChange={handleChange} 
          /> 
          
          <Options 
            label="Category" name="casteId" value={formData.casteId} 
            optionMsg="Select Category" options={casteList} optionLabel="Name" 
            optionValue="Id" onChange={handleChange} 
          /> 
        </div> 
        {/* ================= STUDENT DETAILS END ================= */} 
        
        {/* ================= PERSONAL DETAILS ================= */} 
        <Heading2 label={"Personal Details"} /> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full"> 
          <FormInput 
            label={"Father's Name"} placeholder={"Enter Father's Name"} 
            name={"father"} value={formData.father} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Occupation"} placeholder={"Enter Father's Occupation"} 
            name={"fatherOcc"} value={formData.fatherOcc} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Mobile No."} placeholder={"Enter Father's Mobile No."} 
            name={"fatherMobile"} value={formData.fatherMobile} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Mother's Name"} placeholder={"Enter Mother's Name"} 
            name={"mother"} value={formData.mother} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Occupation"} name={"motherOcc"} 
            value={formData.motherOcc} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Mobile No."} placeholder={"Enter Mother's Mobile No."} 
            name={"motherMobile"} value={formData.motherMobile} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Guardian's Name"} name={"guardian"} 
            value={formData.guardian} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Occupation"} name={"guardianOcc"} 
            value={formData.guardianOcc} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Mobile No."} name={"guardianMobile"} 
            value={formData.guardianMobile} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Guardian Relation"} name={"guardianRel"} 
            value={formData.guardianRel} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Phone No."} placeholder={"Enter Phone No."} 
            name={"phone"} value={formData.phone} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Father's Income"} name={"fatherInc"} 
            value={formData.fatherInc} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Birth Place"} placeholder={"Enter Birth Place"} name={"birthplace"} 
            value={formData.birthplace} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Blood Group"} placeholder={"Enter Blood Group"} name={"bloodgroup"} 
            value={formData.bloodgroup} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Body Sign"} placeholder={"Enter Body Sign"} name={"bodysign"} 
            value={formData.bodysign} onChange={handleChange} 
          /> 
        </div> 
        {/* ================= PERSONAL DETAILS END ================= */} 
        
        {/* ================= ADDRESS AND IDENTITY DETAILS ================= */} 
        <div className="space-y-5 w-full mb-6"> 
          <FormInput 
            label={"Address"} placeholder={"Enter Address"} name={"address"} 
            value={formData.address} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Address2"} placeholder={"Enter Address2"} name={"address2"} 
            value={formData.address2} onChange={handleChange} 
          /> 
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
            {/* <FormInput label={"Email"} placeholder={"Enter Email"} /> */} 
            
            <FormInput 
              label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} 
              name={"AadharNo"} value={formData.AadharNo} onChange={handleChange} 
            /> 
            
            <FormInput 
              label={"Remarks"} placeholder="Enter Your Remarks" name={"remark"} 
              value={formData.remark} onChange={handleChange} 
            /> 
          </div> 
          
          {/* <FormInput 
            label={"Remarks"} placeholder="Enter Your Remarks" name={"remark"} 
            value={formData.remark} onChange={handleChange} 
          /> */} 
        </div> 
        {/* ================= ADDRESS AND IDENTITY DETAILS END ================= */} 
        
        {/* ================= LAST SCHOOL DETAILS ================= */} 
        <Heading2 label={"Last School"} /> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
          <FormInput 
            label={"Last School"} placeholder={"Enter School Name"} name={"lastschool"} 
            value={formData.lastschool} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Last Class"} placeholder={"Enter Class"} name={"lastclass"} 
            value={formData.lastclass} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Percentage"} placeholder={"Enter Percentage"} 
            name={"percent"} value={formData.percent} onChange={handleChange} 
          /> 
        </div> 
        {/* ================= LAST SCHOOL DETAILS END ================= */} 
        
        {/* ================= BUTTONS ================= */} 
        <div className="flex justify-end space-x-6"> 
          <Buttons label="Cancel" click={clearForm} /> 
          <Buttons label="Save" click={handleSave} /> 
        </div> 
        {/* ================= BUTTONS END ================= */} 
      </div> 
    </> 
  ); 
} 

export default Add_Enquiry;
