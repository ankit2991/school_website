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
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";

function Student_Summary() {
  const navigate = useNavigate()
  const [classValue, setClassValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [enterValue, setEnterValue] = useState("");
  const [errors, setErrors] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const data = [
    { id: 1, serial: "01", name: "Ajay", fname: "Rman Thakur", mname: "Seema Thakur", class: "Nur", fno: "1234567890" },
    { id: 2, serial: "02", name: "Ajay", fname: "Rman", mname: "Divya", class: "Nur", fno: "1234567540" },
    { id: 3, serial: "03", name: "Viren", fname: "Devanh Bhalla", mname: "Aradhya Bhalla.", class: "Nur", fno: "1234567890" },
    
  ];

  const columns = [
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Mother Name", shortHeader: "Mother Name", accessor: "mname" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
  ];

//   const handleSearch = () => {
//   const newErrors = {};
//   if (!classValue) newErrors.classValue = "Please select a class.";
//   if (!searchBy) newErrors.searchBy = "Please select search option.";
//   if (!enterValue.trim()) newErrors.enterValue = "Please enter a value.";
//   setErrors(newErrors);

//   if (Object.keys(newErrors).length === 0) {
//     const search = enterValue.toLowerCase().trim();

//     let filtered = data.filter((item) => {
//       switch (searchBy.toLowerCase()) {
//         case "serial number":
//           return item.serial.toLowerCase().includes(search);
//         case "name":
//           // Partial match on any word in name
//           return item.name
//             .toLowerCase()
//             .split(" ")
//             .some((word) => word.includes(search));
//         case "father name":
//           // Partial match on any word in father name
//           return item.fname
//             .toLowerCase()
//             .split(" ")
//             .some((word) => word.includes(search));
//         case "mobile number":
//           return item.fno.includes(search);
//         default:
//           return false;
//       }
//     });

//     if (filtered.length === 1) {
//       setSelectedRow(filtered[0]);
//       setShowDetails(true);
//       setFilteredData([]);
//     } else if (filtered.length > 1) {
//       setFilteredData(filtered);
//       setShowDetails(false);
//       setSelectedRow(null);
//     } else {
//       setFilteredData([]);
//       setShowDetails(false);
//       setSelectedRow(null);
//     }
//   }
// };

const handleSearch = () => {
  const newErrors = {};
  if (!classValue) newErrors.classValue = "Please select a class.";
  if (!searchBy) newErrors.searchBy = "Please select search option.";
  if (!enterValue.trim()) newErrors.enterValue = "Please enter a value.";
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const search = enterValue.toLowerCase().trim();

    let filtered = data.filter((item) => {
      switch (searchBy.toLowerCase()) {
        case "serial number":
          return item.serial.toLowerCase().includes(search);
        case "name":
          return item.name.toLowerCase().includes(search);
        case "father name":
          return item.fname.toLowerCase().includes(search);
        case "mobile number":
          return item.fno.includes(search);
        default:
          return false;
      }
    });

    if (filtered.length === 1) {
      // ✅ Direct navigation with single result
      navigate("/Student-Summary2", { state: { student: filtered[0] } });
    } else if (filtered.length > 1) {
      // ✅ Show table for multiple matches
      setFilteredData(filtered);
      setSelectedRow(null);
    } else {
      // ✅ No match → navigate directly with empty student
      navigate("/Student-Summary2", { state: { student: null } });
    }
  }
};

const handleSelect = () => {
  if (selectedRow) {
    // ✅ Navigate with selected row
    navigate("/Student-Summary2", { state: { student: selectedRow } });
  }
};



  // const handleSelect = () => {
  //   if (selectedRow) {
  //     setShowDetails(true);
  //     navigate("/Student-Summary")
  //   }
  // };

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Heading label={"Student Summary"} style={"mb-5"} />

      {/* Filters */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
        {/* Class */}
        <div>
          <Options
            label={"Class"}
            optionMsg="Select Class"
            options={["Nur", "K.G.", "Prep"]}
            value={classValue}
            onChange={(e) => setClassValue(e.target.value)}
          />
          {errors.classValue && <p className="text-red-500 text-sm mt-1">{errors.classValue}</p>}
        </div>

        {/* Search By */}
        <div>
          <Options
            label={"Search By"}
            optionMsg="Select Option"
            options={["Serial Number", "Name", "Father Name", "Mobile Number"]}
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
          {errors.searchBy && <p className="text-red-500 text-sm mt-1">{errors.searchBy}</p>}
        </div>

        {/* Enter */}
        <div>
          <FormInput
            label={"Enter"}
            placeholder={"Enter"}
            value={enterValue}
            onChange={(e) => setEnterValue(e.target.value)}
          />
          {errors.enterValue && <p className="text-red-500 text-sm mt-1">{errors.enterValue}</p>}
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      {/* Filtered Table */}
      {filteredData.length > 0 && (
        <>
          <Table
            columns={columns}
            data={filteredData}
            selectable={true}                // ✅ make rows selectable
            selectedRow={selectedRow}        // ✅ pass selected row
            onRowSelect={setSelectedRow}     // ✅ update when row clicked
            style={"max-h-[33vh] sm:max-h-[50vh]"}
          />

          <div className="flex justify-end py-3">
            <Buttons click={handleSelect} label={"Select"} />
          </div>
        </>
      )}

      
    </div>
  );
}

export default Student_Summary;
