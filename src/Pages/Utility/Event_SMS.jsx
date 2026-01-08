import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import RadioButton from "../../Components/Page_Forms/RadioButton";
import Options from "../../Components/Page_Forms/Options";
import FormInput from "../../Components/Page_Forms/FormInput";
import Table from "../../Components/Page_Forms/Table";
import Buttons from "../../Components/Page_Forms/Buttons";
import { getclass, getSmsBalance, getSmsTemplete, getStudentEvent } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Page_Forms/Loader";

function Event_SMS() {  
  const [searched, setSearched] = useState(false); 
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID");
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selected, setSelected] = useState("0");
  const navigate = useNavigate();

  const [templateList, setTemplateList] = useState([]);
const [selectedTemplateId, setSelectedTemplateId] = useState("");
const [templateMessage, setTemplateMessage] = useState("");

const [tableData, setTableData] = useState([]);
const [loading, setLoading] = useState(false);
const [smsBalance, setSmsBalance] = useState("0");

  const columns = [
    { header: "Employee Code", shortHeader: "Employee Code", accessor: "emp" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
    { header: "Join Date", shortHeader: "Join Date", accessor: "join" },
    { header: "Address", shortHeader: "Address", accessor: "add" },
    { header: "Mobile Number", shortHeader: "Mobile Number", accessor: "num" },
  ];

  /* ================= DATE FORMATTER FOR TABLE ================= */
const formatDateForTable = (value) => {
  if (!value) return "-";

  // Case 1: .NET Date format (Teacher)
  if (typeof value === "string" && value.includes("/Date")) {
    const timestamp = parseInt(value.match(/\d+/)[0], 10);
    const d = new Date(timestamp);
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  }

  // Case 2: Normal string date (Student)
  const d = new Date(value);
  if (!isNaN(d)) {
    return d.toLocaleDateString("en-GB");
  }

  // Fallback
  return value;
};


  const handleSearch = async () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  try {
    setSearched(true);

    const response = await getStudentEvent(
      instId,
      sessId,
      selectedClassId,
      selected // "0" for student, "1" for teacher
    );

    if (response?.Table) {
      const mappedData = response.Table.map((item, index) => ({
        id: index + 1,
        emp: item.EnrollmentNo || "-",
        name: item.Name || "-",
        fname: item.FatherName || "-",
        mname: item.MotherName || "-",
        class: item.Class || "-",
        dob: formatDateForTable(item.DOB), 
        join: formatDateForTable(item.AdmissionDate),
        add: item.Address1 || "-",
        num: item.FMobileNo || "-",
      }));

      setTableData(mappedData);
    } else {
      setTableData([]);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to load data");
  } finally {
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
    <div className="w-full h-full bg-white  px-4 py-2 flex flex-col">
      <Loader show={searched}/>
      <Heading style={"mb-5"} label={"Pay Fees"} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-5 w-full">
        <RadioButton
          label="Student"
          name="example"
          value="0"
          checked={selected === "0"}
          onChange={(e) => setSelected(e.target.value)}
          className="cursor-default text-md font-medium mb-1 text-gray-700"
        />
        <RadioButton
          label="Teacher"
          name="example"
          value="1"
          checked={selected === "1"}
          onChange={(e) => setSelected(e.target.value)}
          className="cursor-default text-md font-medium mb-1 text-gray-700"
        />
        <div className="flex">
  <h2 className="cursor-default text-md font-medium mb-1 text-gray-700">
    SMS Balance :
  </h2>
  <div className="pl-2 font-semibold">
    {smsBalance}
  </div>
</div>

        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
       <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" value={selectedClassId} 
          onChange={(e) => setSelectedClassId(e.target.value)} 
        />
        <FormInput
          label={"Serial Number"}
          placeholder={" Enter Serial Number"}
        />
        <FormInput label={"Name"} placeholder={"Enter Name"} />
        <Options
  label={"Template"}
  optionMsg="Select Template"
  options={templateList}
  valueKey="Id"
  labelKey="SMSTemplate"
  value={selectedTemplateId}
  onChange={handleTemplateChange}
/>

      </div>

      <FormInput
  label={"Template"}
  value={templateMessage}
  onChange={(e) => setTemplateMessage(e.target.value)}
  placeholder="Edit SMS Template"
/>


      <div className="flex justify-end mt-4">
        <Buttons click={handleSearch} label={loading ? "Loading..." : "Search"} />

      </div>
      <div className="mt-5">
        <Table columns={columns} data={tableData} />
      </div>
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 mt-5">
        <Buttons label={"Cancel"} />
        <Buttons label={"Send SMS"} />
      </div>
    </div>
  );
}

export default Event_SMS;
