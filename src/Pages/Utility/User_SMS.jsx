import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Page_Forms/Table";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import { getclass, getSmsBalance, getSmsTemplete, getStudentUserPass } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function User_SMS() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID");
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectAll, setSelectAll] = useState(false); 
    const [selectedStudents, setSelectedStudents] = useState([]); 
    const [tableData, setTableData] = useState([]); 
  const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
  const [agree, setAgree] = useState(false);
  const [searchSrNo, setSearchSrNo] = useState("");
const [searchName, setSearchName] = useState("");
const [searched, setSearched] = useState("");

const [templateList, setTemplateList] = useState([]);
const [selectedTemplateId, setSelectedTemplateId] = useState("");
const [templateMessage, setTemplateMessage] = useState("");
  const [smsBalance, setSmsBalance] = useState("0");
const columns = [
    {
    header: ( 
        <CheckBox 
          checked={selectAll} onChange={(e) => handleSelectAll(e.target.checked)} 
        /> 
      ), 
     
      accessor: "select", 
      cell: (row) => ( 
        <CheckBox 
          checked={selectedStudents.includes(row.EnrollmentNo)} 
          onChange={() => handleRowSelect(row.EnrollmentNo)} 
        /> 
      ), 
    }, 
    { header: "Id", accessor: "ident" },
    { header: "Sr. No.", accessor: "sr" },
    { header: "Name", accessor: "name" },
    { header: "Father Name", accessor: "fname" },
    { header: "Mother Name", accessor: "mname" },
    { header: "Class", accessor: "class" },
    { header: "User Id", accessor: "user" },
    { header: "User Pass", accessor: "pass" },
    {header: "Addmission Date", accessor: "date", },
    { header: "Father Mobile No.", shortHeader: "Mobile No.", accessor: "no" },
  ];
  const data = [
    {
      id: 1,
      ident: "10",
      sr: "5",
      name: "Akash Singh Chopra",
      fname: "Devandu",
      mname: "Shreya",
      class: "Nur",
      user: "1",
      pass: "123456",
      date: "11/03/2025",
      no: "1234567890",
    },
    {
      id: 2,
      ident: "5",
      sr: "9",
      name: "Rahul Citra",
      fname: "Sanjay",
      mname: "Priya",
      class: "Nur",
      user: "3",
      pass: "123456",
      date: "13/04/2025",
      no: "1234567890",
    },
    {
      id: 3,
      ident: "8",
      sr: "2",
      name: "Amar Singh",
      fname: "Devender",
      mname: "Kiya",
      class: "Nur",
      user: "6",
      pass: "123456",
      date: "20/04/2025",
      no: "1234567890",
    },
    {
      id: 4,
      ident: "2",
      sr: "25",
      name: "Devender tripathi",
      fname: "Rahul",
      mname: "Teena",
      class: "Nur",
      user: "2",
      pass: "123456",
      date: "25/05/2025",
      no: "1234567890",
    },
    {
      id: 5,
      ident: "6",
      sr: "36",
      name: "Devandu upadhya",
      fname: "Amar",
      mname: "Shalini",
      class: "Nur",
      user: "7",
      pass: "123456",
      date: "29/05/2025",
      no: "1234567890",
    },
    {
      id: 6,
      ident: "7",
      sr: "12",
      name: "Sanjay",
      fname: "Akash",
      mname: "Sonam",
      class: "Nur",
      user: "9",
      pass: "123456",
      date: "04/07/2025",
      no: "1234567890",
    },
  ];

  // =================== CHECK BOX (ALL) ====================== 
    const handleSelectAll = (checked) => { 
      setSelectAll(checked); 
      
      if (checked) { 
        // select all students 
        const allIds = tableData.map((item) => item.EnrollmentNo); 
        setSelectedStudents(allIds); 
      } else { 
        // unselect all 
        setSelectedStudents([]); 
      } 
    }; 
    
    useEffect(() => { 
      if (tableData.length > 0 && selectedStudents.length === tableData.length) { 
        setSelectAll(true); 
      } else { 
        setSelectAll(false); 
      } 
    }, [selectedStudents, tableData]); 
    
    // =================== CHECK BOX (SELECTED) ====================== 
    const handleRowSelect = (enrollmentNo) => { 
      setSelectedStudents((prev) => { 
        if (prev.includes(enrollmentNo)) { 
          return prev.filter((id) => id !== enrollmentNo); 
        } else { 
          return [...prev, enrollmentNo]; 
        } 
      }); 
    }; 


//     const handleSearch = async () => {
//   if (!selectedClassId) {
//     alert("Please select class");
//     return;
//   }

//   try {
//     const res = await getStudentUserPass(instId, sessId, selectedClassId);

//     const rows = res?.Table?.map((item, index) => ({
//       Id: item.Id,
//       EnrollmentNo: item.EnrollmentNo,   // 🔑 used for checkbox
//       ident: item.Id,
//       sr: index + 1,
//       name: item.Name,
//       fname: item.FatherName,
//       mname: item.MotherName,
//       class: item.Class,
//       user: item.UserId,
//       pass: item.UserPass,
//       date: item.AdmissionDate,
//       no: item.FMobileNo,
//     })) || [];

//     setTableData(rows);
//     setSelectedStudents([]);
//     setSelectAll(false);

//   } catch (error) {
//     console.error("API Error:", error);
//   }
// };


const handleSearch = async () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  try {
    setSearched(true);
    const res = await getStudentUserPass(instId, sessId, selectedClassId);

    let rows = res?.Table?.map((item, index) => ({
      Id: item.Id,
      EnrollmentNo: item.EnrollmentNo,
      ident: item.Id,
      sr: index + 1,
      name: item.Name,
      fname: item.FatherName,
      mname: item.MotherName,
      class: item.Class,
      user: item.UserId,
      pass: item.UserPass,
      date: item.AdmissionDate,
      no: item.FMobileNo,
    })) || [];

    // 🔍 FILTER BY SERIAL NO
    if (searchSrNo) {
      rows = rows.filter(
        (item) => String(item.sr) === String(searchSrNo)
      );
    }

    // 🔍 FILTER BY NAME
    if (searchName) {
      rows = rows.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setTableData(rows);
    setSelectedStudents([]);
    setSelectAll(false);

  } catch (error) {
    console.error("API Error:", error);
  } finally{
    setSearched(false);
  }
};



useEffect(() => {
  fetchSmsTemplates();
}, []);

const fetchSmsTemplates = async () => {
  try {
    const res = await getSmsTemplete("0"); // ALWAYS 0
    if (res?.Table) {
      setTemplateList(res.Table);
    } else {
      setTemplateList([]);
    }
  } catch (error) {
    console.error("Template API Error", error);
  }
};


const handleTemplateChange = (e) => {
  const id = e.target.value;
  setSelectedTemplateId(id);

  const selectedTemp = templateList.find(
    (item) => item.Id.toString() === id
  );

  // Fill message but allow editing later
  setTemplateMessage(selectedTemp?.SMSMessage || "");
};


const fetchSmsBalance = async () => {
  try {
    const res = await getSmsBalance();

    if (res?.Table?.length > 0) {
      const balance = res.Table[0].SMSBalanceApi;

      // If balance is empty OR is a URL → show 0
      if (
        !balance ||
        (typeof balance === "string" && balance.startsWith("http"))
      ) {
        setSmsBalance("0");
      } else {
        setSmsBalance(balance.toString());
      }
    } else {
      setSmsBalance("0");
    }
  } catch (error) {
    console.error("SMS Balance API Error", error);
    setSmsBalance("0");
  }
};

useEffect(() => {
  fetchSmsTemplates();
  fetchSmsBalance();
}, []);




  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
      <Loader show={searched}/>
      <div className="flex justify-between mb-5">
        <Heading label={"User SMS Sending"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
        <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" value={selectedClassId} 
          onChange={(e) => setSelectedClassId(e.target.value)} 
        />
        {/* <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} /> */}
        <FormInput
  label={"Sr. No."}
  placeholder={"Enter Serial No"}
  value={searchSrNo}
  onChange={(e) => setSearchSrNo(e.target.value)}
/>

        {/* <FormInput label={"Name"} placeholder={"Enter Name "} /> */}
        <FormInput
  label={"Name"}
  placeholder={"Enter Name"}
  value={searchName}
  onChange={(e) => setSearchName(e.target.value)}
/>
<Options
  label={"Template"}
  optionMsg="Select Template"
  options={templateList}
  valueKey="Id"
  labelKey="SMSTemplate"
  value={selectedTemplateId}
  onChange={handleTemplateChange}
/>


        <div className="flex sm:mt-9">
  <h2 className="cursor-default text-md font-medium mb-1 text-gray-700">
    SMS Balance :
  </h2>
  <div className="pl-2 font-semibold">
    {smsBalance}
  </div>
</div>

      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3 mb-5 w-full">
        {/* <FormInput label={"Message"} placeholder={"Enter Message "} /> */}
        <FormInput
  label={"Template"}
  value={templateMessage}
  onChange={(e) => setTemplateMessage(e.target.value)}
  placeholder="Edit SMS Template"
/>

      </div>

      <div className="flex justify-end mb-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      <Table
  columns={columns}
  data={tableData}
  disableFloatingRow={false}
  onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
/>
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mt-5">
        <Buttons label={"Cancel"} />
        <Buttons label={"Send"} />
      </div>
      {/* ✅ Dynamic div for spacing */}
      {/* {rowDetailOpen && <div className='h-100'></div>} */}
      {rowDetailOpen && window.innerWidth < 768 && (
        <div className="h-100"></div>
      )}
    </div>
  );
}

export default User_SMS;
