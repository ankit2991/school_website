import React, { useEffect, useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import Heading2 from "../../Components/Page_Forms/Heading2";
import FaceUploader from "../../Components/Page_Forms/FaceUploader";
import Options from "../../Components/Page_Forms/Options";
import {
  getcaste,
  getCreateStudent,
  getSerialNo,
  getTypeList,
  getEnquiryNoDetails,
  getStudentDetails,
} from "../../services/api";
import { useLocation } from "react-router-dom";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Create_Student2() {
  const instId = localStorage.getItem("InstituteID");
  const userId = localStorage.getItem("UserId");
  const sessId = localStorage.getItem("SessionID");
  const location = useLocation();
  const editStudId = location.state?.studId || null;
  const editClassId = location.state?.classId || null;
  const { classList } = useClassList();
  const [lastClassId, setLastClassId] = useState("");
  const [currentClassId, setCurrentClassId] = useState("");
  const [serialNo, setSerialNo] = useState({ 
    srno: "", enrollNo: "", 
  });
  const [typelist, setTypeList] = useState([]);
  const [casteList, setCasteList] = useState([]);
  const [selectetypeId, setSelectedTypeId] = useState("");
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState({}); 
  
  /* ================= STUDENT DETAIL ================= */ 
  useEffect(() => { 
    if (!editStudId || !instId || !sessId || !editClassId) return; 
    
    async function fetchStudentDetails() { 
      try { 
        setSearched(true); 
        const res = await getStudentDetails( instId, editStudId, sessId, editClassId ); 
        const d = res?.Table?.[0]; 
        if (!d) return; 
        setSerialNo({  
          srno: d.OldSrno || "", enrollNo: d.EnrollmentNo || "", 
        }); 
        
        setFormData((prev) => ({ 
          ...prev, studId: d.Id || "", eqno: d.OldSrno || "", name: d.Name || "", gen: d.Gender || "", dob: apiDateToInput(d.DOB), 
          studtype: d.F_StudntType?.toString() || "", casteId: d.F_CastMaster?.toString() || "", caste: d.Caste || "", 
          addDate: apiDateToInput(d.AdmissionDate), joinDate: apiDateToInput(d.JoinDate), feeCalDate: apiDateToInput(d.FeeCalDate), 
          lstSchl: d.LastSchool || "", lstsess: d.LastPassoutSession || "", fName: d.FatherName || "", fOcc: d.Foccupation || "", 
          fNum: d.FMobileNo || "", mNane: d.MotherName || "", mOcc: d.Moccupation || "", mNum: d.MMobileNo || "", 
          guardian: d.GaurdianName || "", guardianOcc: d.Goccupation || "", guardianNum: d.GMobileNo || "", guardianRel: d.Grelation || "", 
          phone: d.Phoneno || "", fatherInc: d.FatherIncome?.toString() || "", birthplace: d.BirthPlace || "", bloodgroup: d.BloodGroup || "", 
          bodysign: d.BodySign || "", address: d.Address1 || "", address2: d.Address2 || "", mail: d.EmailId || "", 
          lastBal: d.LastBalance?.toString() || "", translastbal: d.TransportLastBalance?.toString() || "", 
          feeDis: d.FeeDiscount?.toString() || "", addFee: d.AdmissionFee?.toString() || "", quesMoney: d.QuestionMoney?.toString() || "", 
          remark: d.Remarks || "", left: d.Leave ? "1" : "0", leaveRes: d.LeaveReason || "", NsoDate: apiDateToInput(d.NSODate), 
          isNew: "0", tcNo: d.TcNo || "", tcDate: apiDateToInput(d.TcDate), nation: d.Nationality || "", aadharNo: d.STIdCardNo || "", 
          fAadhar: d.FatherAadharNo || "", mAadhar: d.MotherAadharNo || "", jAadhar: d.JanaadharNo || "", panNum: d.PEN || "", 
          ApparId: d.ApparId || "", 
        })); 
        
        setLastClassId(d.F_LastClass?.toString() || ""); 
        setCurrentClassId(d.F_ClassMaster?.toString() || ""); 
      } catch (err) { 
        console.error("Student Details Error:", err); 
      } finally { 
        setSearched(false); 
      } 
    } 
    
    fetchStudentDetails(); 
  }, [editStudId, instId, sessId, editClassId]); 

  /* ================= VALIDATION ================= */ 
  const validateForm = () => { 
    const newErrors = {}; 
    
    if (!formData.name.trim()) newErrors.name = "First name is required"; 
    if (!formData.gen) newErrors.gen = "Gender is required"; 
    if (!formData.studtype) newErrors.studtype = "Student type is required"; 
    if (!formData.casteId) newErrors.casteId = "Category is required"; 
    
    if (!formData.lstSchl.trim()) newErrors.lstSchl = "Last school is required"; 
    if (!lastClassId) newErrors.lastClassId = "Last class is required"; 
    if (!currentClassId) newErrors.currentClassId = "Class is required"; 
    
    if (!formData.fName.trim()) newErrors.fName = "Father's name is required"; 
    
    if (!formData.fNum.trim()) { 
      newErrors.fNum = "Mobile number is required"; 
    } else if (!/^[6-9]\d{9}$/.test(formData.fNum)) { 
      newErrors.fNum = "Enter valid 10-digit mobile number"; 
    } 
    
    if (!formData.mNane.trim()) newErrors.mNane = "Mother's name is required"; 
    if (!formData.address.trim()) newErrors.address = "Address is required"; 
    
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  }; 

  /* ================= FORM DATA ================= */ 
  const [formData, setFormData] = useState({ 
    studId: "", eqno: "", enroNo: "", name: "", gen: "", dob: "", studtype: "", casteId: "", caste: "", addDate: "", joinDate: "", 
    feeCalDate: "", lstSchl: "", lstclId: "", tcNo: "", tcDate: "", lstsess: "", isNew: "1", clid: "", nation: "", fName: "", fOcc: "", 
    fNum: "", mNane: "", mOcc: "", mNum: "", fAadhar: "", mAadhar: "", jAadhar: "", guardian: "", guardianOcc: "", guardianNum: "", 
    guardianRel: "", phone: "", fatherInc: "", birthplace: "", bloodgroup: "", bodysign: "", panNum: "", ApparId: "", address: "", 
    address2: "", mail: "", aadharNo: "", lastBal: "", translastbal: "", feeDis: "", addFee: "", quesMoney: "", remark: "", left: "0", 
    NsoDate: "", leaveRes: "", 
  }); 
  
  /* ================= ON CHANGE ================= */ 
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData((prev) => ({ 
      ...prev, [name]: value, 
    })); 
    // ✅ Clear error when user starts typing/selecting 
    if (errors[name]) { 
      setErrors((prev) => ({ 
        ...prev, [name]: "", 
      })); 
    } 
  }; 
  
  /* ================= FETCH CASTE ================= */ 
  useEffect(() => { 
    getcaste().then((res) => { 
      if (res?.Table?.[0]?.ResultCode === "R100") { 
        setCasteList(res.Table1 || []); 
      } 
    }); 
  }, []); 
  
  /* ================= FETCH SERIAL NO (ONLY ADD MODE) ================= */ 
  useEffect(() => { 
    // ❌ Do not run in edit mode 
    if (!instId || editStudId) return; 
    
    getSerialNo(instId).then((res) => { 
      if (res?.Table?.[0]?.ResultCode === "R100") { 
        const row = res.Table1?.[0]; 
        setSerialNo({ 
          srno: row?.MaxSrNo || "", 
          enrollNo: row?.MaxSrNo || "", 
        }); 
      } 
    }); 
  }, [instId, editStudId]); 
  
  // ================= TYPE LIST =================  
  useEffect(() => { 
    async function fetchType() { 
      try { 
        const res = await getTypeList(); 
        if (res?.Table?.[0]?.ResultCode === "R100") { 
          setTypeList(res.Table1 || []); 
        } 
      } catch (error) { 
        console.log("Class API Error:", error); 
      } 
    } 
    
    fetchType(); 
  }, []); 
  
  /* ================= EMPTY ================= */ 
  const numOrZero = (v) => { 
    if (v === "" || v === null || v === undefined) return "0"; 
    return String(v).trim(); 
  };
  
  // ✅ For string fields → always "" 
  const strOrEmpty = (v) => { 
    if (v === null || v === undefined) return ""; 
    return String(v); 
  }; 
  
  // ✅ For dates → "" if empty 
  const dateOrEmpty = (dateStr) => { 
    if (!dateStr) return ""; 
    const d = new Date(dateStr); 
    if (isNaN(d)) return ""; 
    const day = d.getDate().toString().padStart(2, "0"); 
    const month = d.toLocaleString("en-GB", { month: "short" }); 
    const year = d.getFullYear(); 
    return `${day}/${month}/${year}`; 
  }; 
  
  const getStudentIdForApi = () => { 
    return formData.isNew === "1" ? "0" : numOrZero(formData.studId); 
  }; 
  
  /* ================= SAVE ================= */ 
  const handleSave = async () => { 
    if (!validateForm()) { 
      window.scrollTo({ top: 0, behavior: "smooth" }); 
      return; 
    } 
    
    if (!instId || !userId || !sessId) { 
      alert("Session expired"); 
      return; 
    } 
    
    const payload = { 
      instId: numOrZero(instId), sessId: numOrZero(sessId), userId: numOrZero(userId), studId: getStudentIdForApi(), 
      eqno: numOrZero(formData.eqno), srno: numOrZero(serialNo.srno), enroNo: numOrZero(serialNo.enrollNo), 
      name: strOrEmpty(formData.name), gen: strOrEmpty(formData.gen), dob: dateOrEmpty(formData.dob), 
      addDate: dateOrEmpty(formData.addDate), joinDate: dateOrEmpty(formData.joinDate), feeCalDate: dateOrEmpty(formData.feeCalDate), 
      tcNo: strOrEmpty(formData.tcNo), tcDate: dateOrEmpty(formData.tcDate), NsoDate: formData.NsoDate ? dateOrEmpty(formData.NsoDate) : "", 
      studtype: numOrZero(formData.studtype), casteId: numOrZero(formData.casteId), caste: strOrEmpty(formData.caste), 
      lstSchl: strOrEmpty(formData.lstSchl), lstclId: numOrZero(lastClassId), clid: numOrZero(currentClassId), 
      lstsess: strOrEmpty(formData.lstsess), isNew: numOrZero(formData.isNew), nation: strOrEmpty(formData.nation), 
      fName: strOrEmpty(formData.fName), fOcc: strOrEmpty(formData.fOcc), fNum: strOrEmpty(formData.fNum), 
      mNane: strOrEmpty(formData.mNane), mOcc: strOrEmpty(formData.mOcc), mNum: strOrEmpty(formData.mNum), 
      fAadhar: strOrEmpty(formData.fAadhar), mAadhar: strOrEmpty(formData.mAadhar), jAadhar: strOrEmpty(formData.jAadhar), 
      guardian: strOrEmpty(formData.guardian), guardianOcc: strOrEmpty(formData.guardianOcc), guardianNum: strOrEmpty(formData.guardianNum), 
      guardianRel: strOrEmpty(formData.guardianRel), phone: strOrEmpty(formData.phone), fatherInc: numOrZero(formData.fatherInc), 
      birthplace: strOrEmpty(formData.birthplace), bloodgroup: strOrEmpty(formData.bloodgroup), bodysign: strOrEmpty(formData.bodysign), 
      panNum: strOrEmpty(formData.panNum), ApparId: strOrEmpty(formData.ApparId), address: strOrEmpty(formData.address), 
      address2: strOrEmpty(formData.address2), mail: strOrEmpty(formData.mail), aadharNo: strOrEmpty(formData.aadharNo), 
      lastBal: formData.lastBal?.trim() || "0", translastbal: formData.translastbal?.trim() || "0", feeDis: formData.feeDis?.trim() || "0", 
      addFee: formData.addFee?.trim() || "0", quesMoney: formData.quesMoney?.trim() || "0", remark: strOrEmpty(formData.remark), 
      left: numOrZero(formData.left), leaveRes: strOrEmpty(formData.leaveRes), 
    }; 
    
    Object.entries(payload).forEach(([k, v]) => { 
      if (typeof v === "number" && isNaN(v)) { 
        console.error("NaN field:", k); 
      } 
    }); 
    console.log("PAYLOAD", payload); 
    const res = await getCreateStudent(payload); 
    alert(res?.Table?.[0]?.Column1 || "Saved"); 
  }; 
  
  /* ================= DATE FORMATTER ================= */ 
  // INPUT → API 
  const formatDateForApi = (dateStr) => { 
    if (!dateStr) return null; // IMPORTANT 
    const d = new Date(dateStr); 
    if (isNaN(d)) return null; 
    const day = d.getDate().toString().padStart(2, "0"); 
    // const month = d.toLocaleString("en-GB", { month: "short" }).toLowerCase(); 
    const month = d.toLocaleString("en-GB", { month: "short" }); 
    const year = d.getFullYear(); 
    return `${day}/${month}/${year}`; 
  }; 
  
  // API → INPUT 
  const apiDateToInput = (apiDate) => { 
    if (!apiDate) return ""; 
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
    const d = new Date(timestamp); 
    const year = d.getFullYear(); const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate()).padStart(2, "0"); 
    return `${year}-${month}-${day}`; 
  }; 
  
  /* ================= SEARCH ================= */ 
  const handleSearch = async () => { 
    if (!formData.eqno) { 
      alert("Please enter Enquiry No"); 
      return; 
    } 
    
    try { 
      setSearched(true); 
      const res = await getEnquiryNoDetails(Number(formData.eqno)); 
      if (res?.Table?.[0]?.ResultCode !== "R100") { 
        alert("Enquiry not found"); 
        return; 
      } 
      
      const d = res.Table1?.[0]; 
      if (!d) return; 
      
      // 🔹 Set main form data 
      setFormData((prev) => ({ 
        ...prev, fAadhar: d.FAaNo || "", mAadhar: d.MAaNo || "", panNum: d.Pen || "", ApparId: d.AppId || "", studId: d.Id || "", 
        name: d.Name || "", gen: d.Gender || "", dob: apiDateToInput(d.DOB), casteId: d.F_CastMaster || "", lstSchl: d.LastSchool || "", 
        lstsess: d.LastPassoutSession || "", fName: d.FatherName || "", fOcc: d.Foccupation || "", fNum: d.FMobileNo || "", 
        mNane: d.MotherName || "", mOcc: d.Moccupation || "", mNum: d.MMobileNo || "", guardian: d.GaurdianName || "", 
        guardianOcc: d.Goccupation || "", guardianNum: d.GMobileNo || "", guardianRel: d.Grelation || "", phone: d.Phoneno || "", 
        fatherInc: d.fatherInc ?? "", birthplace: d.BirthPlace || "", bloodgroup: d.BloodGroup || "", bodysign: d.BodySign || "", 
        address: d.Address1 || "", address2: d.Address2 || "", mail: d.EmailId || "", aadharNo: d.AaNo || "", remark: d.Remarks || "", 
        translastbal: d.TLBala || "", addFee: d.AdmissionFee || "", quesMoney: d.QuestionMoney || "", NsoDate: apiDateToInput(d.NSODate), 
      })); 
      
      // 🔹 Set dropdown-controlled states 
      setLastClassId(d.F_LastClass?.toString() || ""); 
      setCurrentClassId(d.F_ClassMaster?.toString() || ""); 
    } catch (err) { 
      console.error("Enquiry Search Error:", err); 
      alert("Something went wrong"); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  return ( 
    <div className="w-full h-full flex flex-col px-4 py-2 bg-white"> 
    <Loader show={searched}/> 
    <Heading label={"Create Student"} /> 
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:gap-x-50 gap-y-5 sm:gap-y-0 my-5 w-full xl:w-6xl"> 
      <FormInput 
        label={"Enquiry Number"} placeholder={"Enter Enquiry Number"} name="eqno" 
        value={formData.eqno} onChange={handleChange} 
      /> 
      
      <FormInput 
        label={"Aadhar Card"} placeholder={"Enter Aadhar Card"} 
        name="aadharNo" onChange={handleChange} 
      /> 
    </div> 
    
    <div className="flex justify-end"> 
      <Buttons 
        label={"Search"} click={handleSearch} />  
      </div> 
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
        <FormInput 
          label={"Student ID"} placeholder={"Enter Student ID"} name="studId" 
          value={formData.studId} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Sr. No."} value={serialNo.srno} disabled 
        /> 
        
        <FormInput 
          label={"Enrollment No."} value={serialNo.enrollNo} disabled 
        /> 
        
        <FormInput 
          label={"First Name"} placeholder={"Enter First Name"} 
          name="name" value={formData.name} onChange={handleChange} 
          error={errors.name} 
        /> 
        
        <Options 
          label="Gender" name="gen" value={formData.gen} optionMsg="Select Gender" 
          options={[ { label: "Boy", value: "Boy" }, { label: "Girl", value: "Girl" }, ]} 
          valueKey="value" labelKey="label" onChange={handleChange} error={errors.gen}  
        /> 
        
        <FormInput 
          label={"Date Of Birth"} type="date" name="dob" value={formData.dob} 
          onChange={handleChange} 
        /> 
        
        <Options 
          label="Student Type" name="studtype" value={formData.studtype} options={typelist} 
          valueKey="Id" labelKey="Type" onChange={handleChange} error={errors.studtype} 
        /> 
        
        <Options 
          label="Category" name="casteId" value={formData.casteId} optionMsg="Select Category" 
          options={casteList} labelKey="Name" valueKey="Id" onChange={handleChange} error={errors.casteId}  
        /> 
        
        <FormInput 
          label={"Caste"} placeholder={"Enter Caste"} name="caste" value={formData.caste} 
          onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Addmission Date"} type="date" name="addDate" 
          value={formData.addDate} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Join Date"} type="date" name="joinDate" 
          value={formData.joinDate} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Fee Calculate Date"} type="date" name="feeCalDate" 
          value={formData.feeCalDate} onChange={handleChange} 
        /> 
      </div> 
      
      <Heading2 label={"Last School"} /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
        <FormInput 
          label={"Last School"} placeholder={"Enter Last School"} name="lstSchl" 
          value={formData.lstSchl} onChange={handleChange} error={errors.lstSchl} 
        /> 
        
        <Options 
          label="Last Class" optionMsg="Select Last Class" 
          options={classList} valueKey="Id" labelKey="ClassName" 
          value={lastClassId} name={"lstclId"} error={errors.lastClassId} 
          onChange={(e) => {
            setLastClassId(e.target.value); 
            if (errors.lastClassId) { 
              setErrors((prev) => ({ 
                ...prev, lastClassId: "", 
              })); 
            } 
          }} 
        /> 
        
        <FormInput 
          label={"T.C. No."} placeholder={"Enter T.C. Number"} name="tcNo" 
          value={formData.tcNo} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"T.C. Date"} type="date" name="tcDate" value={formData.tcDate} 
          onChange={handleChange} 
        /> 

        <FormInput 
          label={"Addmission Session"} placeholder={"Enter Addmission Session"} 
          name="lstsess" value={formData.lstsess} onChange={handleChange} 
        /> 
        
        {/* <FormInput 
          label={"Addmission In Class"} placeholder={"Enter Addmission In Class"} 
        /> */} 
      </div> 
      
      <Heading2 label={"Assign Class"} /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
        <Options 
          label="New Student" name="isNew" optionMsg="Select New Student" 
          options={[ { label: "Yes", value: "1" }, { label: "No", value: "0" }, ]} 
          valueKey="value" labelKey="label" value={formData.isNew} 
          onChange={handleChange} 
        /> 
        
        <Options 
          label="Class" optionMsg="Select Class" options={classList} valueKey="Id" name={"clid"}
          labelKey="ClassName" value={currentClassId} error={errors.currentClassId} 
          onChange={(e) => { 
            setCurrentClassId(e.target.value); 
            if (errors.currentClassId) { 
              setErrors((prev) => ({ 
                ...prev, currentClassId: "", 
              })); 
            }
          }} 
        /> 
        
        <FormInput 
          label={"Nationality"} placeholder={"Enter Nationality"} name="nation" 
          value={formData.nation} onChange={handleChange} 
        /> 
      </div> 
      
      <Heading2 label={"Personal Details"} /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full"> 
        <FormInput 
          label={"Father's Name"} placeholder={"Enter Father's Name"} name="fName" 
          value={formData.fName} onChange={handleChange} error={errors.fName} 
        /> 
        
        <FormInput 
          label={"Occupation"} placeholder={"Enter Father's Occupation"} name="fOcc" 
          value={formData.fOcc} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Mobile No."} placeholder={"Enter Father's Mobile No."} name="fNum" 
          value={formData.fNum} onChange={handleChange} error={errors.fNum} 
        /> 
        
        <FormInput 
          label={"Mother's Name"} placeholder={"Enter Mother's Name"} name="mNane" 
          value={formData.mNane} onChange={handleChange} error={errors.mNane} 
        /> 
        
        <FormInput 
          label={"Occupation"} placeholder={"Enter Mother's Occupation"} name="mOcc" 
          value={formData.mOcc} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Mobile No."} placeholder={"Enter Mother's Mobile No."} name="mNum" 
          value={formData.mNum} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Father Aadhar No."} placeholder={"Enter Father Aadhar No."} name="fAadhar" 
          value={formData.fAadhar} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Mother Aadhar No."} placeholder={"Enter Mother Aadhar No."} name="mAadhar" 
          value={formData.mAadhar} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"JAN Aadhar No."} placeholder={"Enter JAN Aadhar No."} name="jAadhar" 
          value={formData.jAadhar} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Guardian's Name"} placeholder={"Enter Guardian's Name"} name="guardian" 
          value={formData.guardian} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Occupation"} placeholder={"Enter Guardian's Occupation"} name="guardianOcc" 
          value={formData.guardianOcc} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Mobile No."} placeholder={"Enter Guardian's Mobile No."} name="guardianNum" 
          value={formData.guardianNum} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Guardian Relation"} placeholder={"Enter Guardian Relation"} name="guardianRel" 
          value={formData.guardianRel} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Phone No."} placeholder={"Enter Phone No."} name="phone" 
          value={formData.phone} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Father's Income"} placeholder={"Enter Father's Income"} name="fatherInc" 
          value={formData.fatherInc} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Birth Place"} placeholder={"Enter Birth Place"} name="birthplace" 
          value={formData.birthplace} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Blood Group"} placeholder={"Enter Blood Group"} name="bloodgroup" 
          value={formData.bloodgroup} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Body Sign"} placeholder={"Enter Body Sign"} name="bodysign" 
          value={formData.bodysign} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"PAN Card No."} placeholder={"Enter PAN Card No."} name="panNum" 
          value={formData.panNum} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"APPAR ID"} placeholder={"Enter APPAR ID"} name="ApparId" 
          value={formData.ApparId} onChange={handleChange} 
        /> 
      </div> 
      
      <div className="flex justify-center"> 
        <FaceUploader /> 
      </div> 
      
      <div className="space-y-5 w-full mb-6"> 
        <FormInput 
          label={"Address"} placeholder={"Enter Address"} name="address" 
          value={formData.address} onChange={handleChange} error={errors.address} 
        /> 
        
        <FormInput 
          label={"Address2"} placeholder={"Enter Address2"} name="address2" 
          value={formData.address2} onChange={handleChange} 
        /> 
        
        {/* Before lg layout */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden"> 
          {/* Email full width */} 
          <div className="col-span-1 sm:col-span-2"> 
            <FormInput 
              label={"Email"} placeholder={"Enter Email"} name="mail" 
              value={formData.mail} onChange={handleChange} 
            /> 
          </div> 
          
          {/* Aadhar + Last Balance side by side */} 
          <FormInput 
            label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} 
            name="aadharNo" value={formData.aadharNo} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Last Balance"} placeholder={"Enter Last Balance"} name="lastBal" 
            value={formData.lastBal} onChange={handleChange} 
          /> 
        </div> 
        
        {/* lg and above: keep your nested structure */} 
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-6"> 
          <FormInput 
            label={"Email"} placeholder={"Enter Email"} name="mail" 
            value={formData.mail} onChange={handleChange} 
          /> 
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"> 
            <FormInput 
              label={"Aadhar Card No."} placeholder={"Enter Aadhar Card No."} 
              name="aadharNo" value={formData.aadharNo} onChange={handleChange} 
            /> 
            
            <FormInput 
              label={"Last Balance"} placeholder={"Enter Last Balance"} 
              name="lastBal" value={formData.lastBal} onChange={handleChange} 
            /> 
          </div> 
        </div> 
        
        {/* Before lg layout */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden"> 
          {/* Row 1 */} 
          <FormInput 
            label={"Transport Last Balance"} placeholder={"Enter Transport Last Balance"} 
            name="translastbal" value={formData.translastbal} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Fee Discount"} placeholder={"Enter Fee Discount"} name="feeDis" 
            value={formData.feeDis} onChange={handleChange} 
          /> 
          
          {/* Row 2 */} 
          <FormInput 
            label={"Addmission Fee"} placeholder={"Enter Addmission Fee"} name="addFee" 
            value={formData.addFee} onChange={handleChange} 
          /> 
          
          <FormInput 
            label={"Question Money"} placeholder={"Enter Question Money"} name="quesMoney" 
            value={formData.quesMoney} onChange={handleChange} 
          /> 
          
          {/* Row 3 */} 
          <div className="col-span-1 sm:col-span-2"> 
            <FormInput 
              label={"Remarks"} placeholder={"Enter Your Remarks"} name="remark" 
              value={formData.remark} onChange={handleChange} 
            /> 
          </div> 
        </div> 
        
        {/* On lg and above: keep original structure */} 
        <div className="hidden lg:block w-full"> 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full"> 
            <FormInput 
              label={"Transport Last Balance"} placeholder={"Enter Transport Last Balance"} 
              name="translastbal" value={formData.translastbal} onChange={handleChange} 
            /> 
            
            <FormInput 
              label={"Fee Discount"} placeholder={"Enter Fee Discount"} name="feeDis" 
              value={formData.feeDis} onChange={handleChange} 
            /> 
            
            <FormInput 
              label={"Addmission Fee"} placeholder={"Enter Addmission Fee"} name="addFee" 
              value={formData.addFee} onChange={handleChange} 
            /> 
          </div> 
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6"> 
            <FormInput 
              label={"Question Money"} placeholder={"Enter Question Money"} 
              name="quesMoney" value={formData.quesMoney} onChange={handleChange} 
            /> 
            
            <FormInput 
              label={"Remarks"} placeholder={"Enter Your Remarks"} name="remark" 
              value={formData.remark} onChange={handleChange} 
            /> 
          </div> 
        </div> 
      </div> 
      
      <Heading2 label={"Left Info"} /> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
        <Options 
          label="Left" name="left" optionMsg="Select Left" 
          options={[ { label: "Yes", value: "1" }, { label: "No", value: "0" }, ]} 
          valueKey="value" labelKey="label" value={formData.left} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"N.S.O Date"} type="date" name="NsoDate" 
          value={formData.NsoDate} onChange={handleChange} 
        /> 
        
        <FormInput 
          label={"Reason"} placeholder={"Enter Reason"} name="leaveRes" 
          value={formData.leaveRes} onChange={handleChange} 
        /> 
      </div> 
      
      <div className="flex justify-end space-x-6"> 
        <Buttons label="Cancel" /> 
        <Buttons label="Save" click={handleSave} /> 
      </div> 
    </div> 
  ); 
} 

export default Create_Student2;
