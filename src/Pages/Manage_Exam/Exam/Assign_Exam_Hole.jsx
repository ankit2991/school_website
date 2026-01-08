// import React, { useEffect, useState } from "react";
// import Heading from "../../../Components/Page_Forms/Heading";
// import Options from "../../../Components/Page_Forms/Options";
// import FormInput from "../../../Components/Page_Forms/FormInput";
// import Table from "../../../Components/Page_Forms/Table";
// import Dialog from "../../../Components/Page_Forms/Dialog";
// import Heading2 from "../../../Components/Page_Forms/Heading2";
// import FaceUploader from "../../../Components/Page_Forms/FaceUploader";
// import Buttons from "../../../Components/Page_Forms/Buttons";
// import { getclass, getRoomList } from "../../../services/api";
// import useClassList from "../../../hooks/useClassList";
// import Loader from "../../../Components/Page_Forms/Loader";
// import CheckBox from "../../../Components/Page_Forms/CheckBox";

// function Assign_Exam_Hole() {
//   const [searchText, setSearchText] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const { classList } = useClassList(); 
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [roomList, setRoomList] = useState([]);
//   const [selectedRoomId, setSelectedRoomId] = useState("");
//    const [searched, setSearched] = useState(false);
//     const instId = localStorage.getItem("InstituteID");
//   const sessId = localStorage.getItem("SessionID");
//   const [selectAll, setSelectAll] = useState(false); 
//     const [selectedStudents, setSelectedStudents] = useState([]); 
//     const [tableData, setTableData] = useState([]); 

//   const columns = [
//     {
//     header: (
//       <CheckBox
//         checked={selectAll}
//         onChange={(e) => handleSelectAll(e.target.checked)}
//       />
//     ),
//     shortHeader: (
//       <CheckBox
//         checked={selectAll}
//         onChange={(e) => handleSelectAll(e.target.checked)}
//       />
//     ),
//     accessor: "select",
//     cell: (row) => (
//   <div
//     onClick={(e) => e.stopPropagation()}
//     onDoubleClick={(e) => e.stopPropagation()}
//   >
//     <CheckBox
//       checked={selectedStudents.includes(row.EnrollmentNo)}
//       onChange={() => handleRowSelect(row.EnrollmentNo)}
//     />
//   </div>
// ),
//   },
//     { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
//     { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
//     { header: "Name", shortHeader: "Name", accessor: "name" },
//     { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
//     { header: "Class", shortHeader: "Class", accessor: "class" },
//     { header: "D.O.B.", shortHeader: "D.O.B.", accessor: "dob" },
//     {
//       header: "Address",
//       shortHeader: "Address",
//       accessor: "add",
//       cellStyle:
//         "max-w-[160px] truncate sm:whitespace-normal sm:break-words sm:max-w-xs sm:line-clamp-2 md:max-w-md",
//     },
//     { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
//     { header: "Category", shortHeader: "Category", accessor: "cat" },
//   ];

//   const handleRowDoubleClick = (row) => {
//   setSelectedRow(row);
//   setOpenDialog(true);
// };

// // Row click handler for dialog (double-tap)
// const clickTimer = React.useRef(null);

// const handleRowClick = (row) => {
//   if (clickTimer.current) {
//     clearTimeout(clickTimer.current);
//     clickTimer.current = null;
//     // DOUBLE TAP detected → open dialog
//     setSelectedRow(row);
//     setOpenDialog(true);
//   } else {
//     // First tap → start timer
//     clickTimer.current = setTimeout(() => {
//       clickTimer.current = null; // reset after 250ms
//     }, 250); // 250ms threshold for double-tap
//   }
// };
//   // =================== CHECK BOX (ALL) ====================== 
//     const handleSelectAll = (checked) => { 
//       setSelectAll(checked); 
      
//       if (checked) { 
//         // select all students 
//         const allIds = tableData.map((item) => item.EnrollmentNo); 
//         setSelectedStudents(allIds); 
//       } else { 
//         // unselect all 
//         setSelectedStudents([]); 
//       } 
//     }; 
    
//     useEffect(() => { 
//       if (tableData.length > 0 && selectedStudents.length === tableData.length) { 
//         setSelectAll(true); 
//       } else { 
//         setSelectAll(false); 
//       } 
//     }, [selectedStudents, tableData]); 
    
//     // =================== CHECK BOX (SELECTED) ====================== 
// const handleRowSelect = (enrollmentNo) => {
//   // SINGLE ROW SELECTION: only select this, unselect others
//   if (selectedStudents.includes(enrollmentNo)) {
//     // if already selected, unselect it
//     setSelectedStudents([]);
//   } else {
//     setSelectedStudents([enrollmentNo]);
//   }
//   // set selected row for dialog as well
//   const row = tableData.find((r) => r.EnrollmentNo === enrollmentNo);
//   if (row) {
//     setSelectedRow(row);
//   }
// };

//   const allData = [
//     {
//       id: 1,
//       serial: "01",
//       roll: "11",
//       name: "Ajay",
//       fname: "Rman Thakur",
//       class: "Nur",
//       dob: "10-Dec-2022",
//       add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012",
//       fno: "1234567890",
//       cat: "sc",
//     },
//     {
//       id: 2,
//       serial: "02",
//       roll: "12",
//       name: "Ajay",
//       fname: "Rman",
//       class: "Nur",
//       dob: "01-jan-2021",
//       add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021",
//       fno: "1234567540",
//       cat: "gen",
//     },
//     {
//       id: 3,
//       serial: "03",
//       roll: "13",
//       name: "Viren",
//       fname: "Devanh Bhalla",
//       class: "Nur",
//       dob: "31-sep-2023",
//       add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066",
//       fno: "1234567890",
//       cat: "st",
//     },
//     {
//       id: 4,
//       serial: "04",
//       roll: "14",
//       name: "anuj",
//       fname: "aditya",
//       class: "Nur",
//       dob: "26-may-2023",
//       add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019",
//       fno: "1234567890",
//       cat: "obc",
//     },
//     {
//       id: 5,
//       serial: "05",
//       roll: "15",
//       name: "somya",
//       fname: "Devanh",
//       class: "Nur",
//       dob: "03-feb-2022",
//       add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007",
//       fno: "1234567867",
//       cat: "sc",
//     },
//   ];

//   // initialize filteredData
//   React.useEffect(() => setFilteredData(allData), []);

//   const handleSearch = () => {
//     if (!searchText.trim()) {
//       setFilteredData(allData);
//       return;
//     }
//     const lower = searchText.toLowerCase();
//     const results = allData.filter((row) =>
//       Object.values(row).some((v) => String(v).toLowerCase().includes(lower))
//     );
//     setFilteredData(results);
//   };

//   // // Row click handler for dialog
//   // const handleRowClick = (row) => {
//   //   setSelectedRow(row);
//   //   setOpenDialog(true);
//   // };

//   // =================== ROOM LIST ======================
//     useEffect(() => {
//       async function fetchRoom() {
//         try {
//           setSearched(true);
//           const res = await getRoomList();
//           if (res?.Table) {
//             setRoomList(res.Table || []);
//           }
//         } catch (error) {
//           console.log("Class API Error:", error);
//         } finally {
//           setSearched(false);
//         }
//       }
//       fetchRoom();
//     }, []);


//   return (
//     <div className="w-full h-full px-4 py-2 bg-white flex flex-col"> 
//       <Loader show={searched}/>
//       <Heading label={"Student Details"} style={"mb-5"} />

//       {/* Filters */}
//       <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
//         <Options 
//           label="Class" optionMsg="Select Class" options={classList} 
//           valueKey="Id" labelKey="ClassName" value={selectedClassId} 
//           onChange={(e) => setSelectedClassId(e.target.value)} 
//         /> 
//         <Options
//           label="Room Number"
//           name="roomno"
//           value={selectedRoomId}
//           options={roomList}
//           valueKey="Id"
//           labelKey="Name"
//           onChange={(e) => setSelectedRoomId(e.target.value)}
//         />
//         <Options
//           label={"Search By"}
//           optionMsg="Select Option"
//           options={["Name", "Serial No."]}
//         />
//         <FormInput
//           label={"Enter"}
//           placeholder={"Enter name, etc."}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>

//       {/* Search Button */}
//       <div className="flex justify-end py-5">
//         <Buttons click={handleSearch} label={"Search"} />
//       </div>

//       {/* Table */}
//       {/* <Table
//         columns={columns}
//         data={filteredData}
//         selectable={false}
//         disableFloatingRow={true}
//         onRowSelect={handleRowClick}
//       /> */}
//       <Table
//   columns={columns}
//   data={filteredData}
//   selectable={false}
//   disableFloatingRow={true}
//   onRowSelect={handleRowClick} // <-- double-tap logic now
// />
//       <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
//         <Buttons label={"Clear"} />
//         <Buttons label={"Process"} />
//       </div>

//       {/* Dialog */}
//       <Dialog
//         open={openDialog}
//         title="Student Details"
//         dialogstyle={"sm:w-5xl h-[600px] sm:h-[550px] sm:mx-5"}
//       >
//         {selectedRow && (
//           <div>
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-x-5 gap-y-5 sm:gap-y-0 my-5 w-full ">
//               <FormInput
//                 label={"Enquiry Number"}
//                 placeholder={"Enter Enquiry Number"}
//               />
//               <FormInput
//                 label={"Aadhar Card"}
//                 placeholder={"Enter Aadhar Card"}
//               />
//             </div>
//             <div className="flex justify-end">
//               <Buttons label={"Search"} />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//               <FormInput
//                 label={"Student ID"}
//                 placeholder={"Enter Student ID"}
//               />
//               <FormInput
//                 label={"Sr. No."}
//                 placeholder={"Enter Serial Number"}
//               />
//               <FormInput
//                 label={"Enrollment No."}
//                 placeholder={"Enter Enrollment No."}
//               />
//               <FormInput
//                 label={"First Name"}
//                 placeholder={"Enter First Name"}
//               />
//               <Options
//                 label={"Gender"}
//                 name={""}
//                 optionMsg="Select Gender"
//                 options={["Boy", "Girl"]}
//               />
//               <FormInput label={"Date Of Birth"} type="date" />
//               <Options
//                 label={"Student Type"}
//                 name={""}
//                 optionMsg="Select Student Type"
//                 options={["Paid", "Free", "RTE"]}
//               />
//               <Options
//                 label={"Category"}
//                 name={""}
//                 optionMsg="Select Category"
//                 options={["Gen", "OBC", "ST", "SC", "MIN", "SBC"]}
//               />
//               <FormInput label={"Caste"} placeholder={"Enter Caste"} />
//               <FormInput label={"Addmission Date"} type="date" />
//               <FormInput label={"Join Date"} type="date" />
//               <FormInput label={"Fee Calculate Date"} type="date" />
//             </div>
//             <Heading2 label={"Last School"} />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//               <FormInput
//                 label={"Last School"}
//                 placeholder={"Enter Last School"}
//               />
//               <Options
//                 label={"Last Class"}
//                 name={""}
//                 optionMsg="Select Last Class"
//                 options={["Nur", "K.G.", "Prep"]}
//               />
//               <FormInput label={"T.C. No."} placeholder={"Enter T.C. Number"} />
//               <FormInput label={"T.C. Date"} type="date" />
//               <FormInput
//                 label={"Addmission Session"}
//                 placeholder={"Enter Addmission Session"}
//               />
//               <FormInput
//                 label={"Addmission In Class"}
//                 placeholder={"Enter Addmission In Class"}
//               />
//             </div>
//             <Heading2 label={"Assign Class"} />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//               <Options
//                 label={"New Student"}
//                 name={""}
//                 optionMsg="Select New Student"
//                 options={["Yes", "No"]}
//               />
//               <Options
//                 label={"Last Class"}
//                 name={""}
//                 optionMsg="Select Last Class"
//                 options={["Nur", "K.G.", "Prep"]}
//               />
//               <FormInput
//                 label={"Nationality"}
//                 placeholder={"Enter Nationality"}
//               />
//             </div>

//             <Heading2 label={"Personal Details"} />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
//               <FormInput
//                 label={"Father's Name"}
//                 placeholder={"Enter Father's Name"}
//               />
//               <FormInput
//                 label={"Occupation"}
//                 placeholder={"Enter Father's Occupation"}
//               />
//               <FormInput
//                 label={"Mobile No."}
//                 placeholder={"Enter Father's Mobile No."}
//               />
//               <FormInput
//                 label={"Mother's Name"}
//                 placeholder={"Enter Mother's Name"}
//               />
//               <FormInput
//                 label={"Occupation"}
//                 placeholder={"Enter Mother's Occupation"}
//               />
//               <FormInput
//                 label={"Mobile No."}
//                 placeholder={"Enter Mother's Mobile No."}
//               />
//               <FormInput
//                 label={"Father Aadhar No."}
//                 placeholder={"Enter Father Aadhar No."}
//               />
//               <FormInput
//                 label={"Mother Aadhar No."}
//                 placeholder={"Enter Mother Aadhar No."}
//               />
//               <FormInput
//                 label={"JAN Aadhar No."}
//                 placeholder={"Enter JAN Aadhar No."}
//               />
//               <FormInput
//                 label={"Guardian's Name"}
//                 placeholder={"Enter Guardian's Name"}
//               />
//               <FormInput
//                 label={"Occupation"}
//                 placeholder={"Enter Guardian's Occupation"}
//               />
//               <FormInput
//                 label={"Mobile No."}
//                 placeholder={"Enter Guardian's Mobile No."}
//               />
//               <FormInput
//                 label={"Guardian Relation"}
//                 placeholder={"Enter Guardian Relation"}
//               />
//               <FormInput label={"Phone No."} placeholder={"Enter Phone No."} />
//               <FormInput
//                 label={"Father's Income"}
//                 placeholder={"Enter Father's Income"}
//               />
//               <FormInput
//                 label={"Birth Place"}
//                 placeholder={"Enter Birth Place"}
//               />
//               <FormInput
//                 label={"Blood Group"}
//                 placeholder={"Enter Blood Group"}
//               />
//               <FormInput label={"Body Sign"} placeholder={"Enter Body Sign"} />
//             </div>
//             <div className="flex justify-center">
//               <FaceUploader />
//             </div>

//             <div className="space-y-5 w-full mb-6">
//               <FormInput label={"Address"} placeholder={"Enter Address"} />
//               <FormInput label={"Address2"} placeholder={"Enter Address2"} />
//               {/* Before lg layout */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
//                 {/* Email full width */}
//                 <div className="col-span-1 sm:col-span-2">
//                   <FormInput label={"Email"} placeholder={"Enter Email"} />
//                 </div>
//                 {/* Aadhar + Last Balance side by side */}
//                 <FormInput
//                   label={"Aadhar Card No."}
//                   placeholder={"Enter Aadhar Card No."}
//                 />
//                 <FormInput
//                   label={"Last Balance"}
//                   placeholder={"Enter Last Balance"}
//                 />
//               </div>
//               {/* lg and above: keep your nested structure */}
//               <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <FormInput label={"Email"} placeholder={"Enter Email"} />
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <FormInput
//                     label={"Aadhar Card No."}
//                     placeholder={"Enter Aadhar Card No."}
//                   />
//                   <FormInput
//                     label={"Last Balance"}
//                     placeholder={"Enter Last Balance"}
//                   />
//                 </div>
//               </div>

//               {/* Before lg layout */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
//                 {/* Row 1 */}
//                 <FormInput
//                   label={"Transport Last Balance"}
//                   placeholder={"Enter Transport Last Balance"}
//                 />
//                 <FormInput
//                   label={"Fee Discount"}
//                   placeholder={"Enter Fee Discount"}
//                 />
//                 {/* Row 2 */}
//                 <FormInput
//                   label={"Addmission Fee"}
//                   placeholder={"Enter Addmission Fee"}
//                 />
//                 <FormInput
//                   label={"Question Money"}
//                   placeholder={"Enter Question Money"}
//                 />
//                 {/* Row 3 */}
//                 <div className="col-span-1 sm:col-span-2">
//                   <FormInput
//                     label={"Remarks"}
//                     placeholder={"Enter Your Remarks"}
//                   />
//                 </div>
//               </div>
//               {/* On lg and above: keep original structure */}
//               <div className="hidden lg:block w-full">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
//                   <FormInput
//                     label={"Transport Last Balance"}
//                     placeholder={"Enter Transport Last Balance"}
//                   />
//                   <FormInput
//                     label={"Fee Discount"}
//                     placeholder={"Enter Fee Discount"}
//                   />
//                   <FormInput
//                     label={"Addmission Fee"}
//                     placeholder={"Enter Addmission Fee"}
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
//                   <FormInput
//                     label={"Question Money"}
//                     placeholder={"Enter Question Money"}
//                   />
//                   <FormInput
//                     label={"Remarks"}
//                     placeholder={"Enter Your Remarks"}
//                   />
//                 </div>
//               </div>
//             </div>

//             <Heading2 label={"Left Info"} />
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//               <Options
//                 label={"Left"}
//                 name={""}
//                 optionMsg="Select Left"
//                 options={["Yes", "No"]}
//               />
//               <FormInput label={"N.S.O Date"} type="date" />
//               <FormInput label={"Reason"} placeholder={"Enter Reason"} />
//             </div>
//           </div>
//         )}
//         <div className="flex justify-end mt-4">
//           <Buttons label="Close" click={() => setOpenDialog(false)} />
//         </div>
//       </Dialog>
//     </div>
//   );
// }

// export default Assign_Exam_Hole;

import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import Dialog from "../../../Components/Page_Forms/Dialog";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Loader from "../../../Components/Page_Forms/Loader";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import useClassList from "../../../hooks/useClassList";
import { getExamAssignHole, getRoomList, getStudentRollList } from "../../../services/api";

function Assign_Exam_Hole() {
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");
  const { classList } = useClassList();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searched, setSearched] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

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
          checked={selectedStudents.includes(row.id)} 
          onChange={() => handleRowSelect(row.id)} 
        /> 
      ), 
    }, 
    { header: "Roll No.", accessor: "roll" }, 
    { header: "Serial No.", accessor: "serial" }, 
    { header: "Name", accessor: "name" }, 
    { header: "Father Name", accessor: "fname" }, 
    { header: "D.O.B.", accessor: "dob" }, 
    { header: "Father No.", accessor: "fno" }, 
  ]; 
  
  // ================= CHECKBOX LOGIC ================= 
  const handleSelectAll = (checked) => { 
    setSelectAll(checked); 
    setSelectedStudents(checked ? filteredData.map((x) => x.id) : []); 
  }; 
  
  // =================== ROW SELECTION ======================
  const handleRowSelect = (id) => { 
    setSelectedStudents((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id] 
    ); 
  }; 
  
  useEffect(() => { 
    setSelectAll( 
      filteredData.length > 0 && 
      selectedStudents.length === filteredData.length 
    ); 
  }, [selectedStudents, filteredData]); 
  
  // =================STUDENT ROLL LIST ON SEARCH BUTTON ================= 
  const handleSearch = async () => { 
    if (!selectedClassId) return; 
    
    try { 
      setSearched(true); 
      const res = await getStudentRollList(instId, sessId, selectedClassId); 
      const apiData = res?.Table?.map((item) => ({ 
        id: item.Id, roll: item.RollNo, serial: item.EnrollmentNo, 
        name: item.Name, fname: item.FatherName, dob: item.DOB, 
        fno: item.FMobileNo, 
      })) || []; 
      
      setTableData(apiData); 
      // =================== FILTRATION WORK ====================== 
      if (!searchText.trim() || !searchBy) { 
        setFilteredData(apiData); 
        return; 
      } 
      
      const lower = searchText.toLowerCase(); 
      const filtered = apiData.filter((row) => { 
        if (searchBy === "Name") { 
          return row.name.toLowerCase().includes(lower); 
        } 
        if (searchBy === "Serial No.") { 
          return String(row.serial).includes(searchText); 
        } 
        return true; 
      }); 
      
      setFilteredData(filtered); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  // =================== ROOM LIST ====================== 
  useEffect(() => { 
    async function fetchRoom() { 
      try { 
        setSearched(true); 
        const res = await getRoomList(); 
        if (res?.Table) setRoomList(res.Table); 
      } finally { 
        setSearched(false); 
      } 
    } 
    fetchRoom(); 
  }, []); 
  
  // =================== EXAM ASSIGN HOLE ====================== 
  const handleClear = async () => { 
    if (!selectedRoomId) { 
      alert("Please select room"); 
      return; 
    } 
    
    if (selectedStudents.length === 0) { 
      alert("Please select at least one student"); 
      return; 
    } 
    const studentIds = selectedStudents.join(","); 
    try { 
      setSearched(true); 
      const res = await getExamAssignHole(instId, studentIds, sessId, selectedRoomId); 
      const msg = res?.Table?.[0]?.Error; 
      if (msg) alert(msg); 
      
      // Optional reset 
      setSelectedStudents([]); 
      setSelectAll(false); 
    } catch (err) { 
      console.error(err); 
      alert("API failed"); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  
  return ( 
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col"> 
      <Loader show={searched} /> 
      <Heading label="Student Details" /> 
      
      <div className="grid md:grid-cols-4 gap-3 mb-2"> 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} 
          valueKey="Id" labelKey="ClassName" value={selectedClassId} 
          onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        <Options 
          label="Room Number" name="roomno" value={selectedRoomId} 
          options={roomList} valueKey="Id" labelKey="Name" 
          onChange={(e) => setSelectedRoomId(e.target.value)} 
        /> 
        <Options 
          label="Search By" optionMsg="Select Option" 
          options={["Name", "Serial No."]} value={searchBy} 
          onChange={(e) => setSearchBy(e.target.value)} 
        /> 
        
        <FormInput 
          label="Enter" placeholder={searchBy === "Serial No." ? "Enter Serial No." : "Enter Name" } 
          value={searchText} onChange={(e) => setSearchText(e.target.value)} 
        /> 
      </div> 
      
      <div className="flex justify-end py-5"> 
        <Buttons click={handleSearch} label="Search" /> 
      </div> 
      
      <Table 
        columns={columns} data={filteredData} 
        selectable={false} disableFloatingRow 
      /> 
      
      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
        <Buttons label={"Clear"} click={handleClear} /> 
        <Buttons label={"Print"} /> 
      </div> 
      
    </div> 
  ); 
} 

export default Assign_Exam_Hole;


// import React, { useEffect, useState } from "react";
// import Heading from "../../../Components/Page_Forms/Heading";
// import Options from "../../../Components/Page_Forms/Options";
// import FormInput from "../../../Components/Page_Forms/FormInput";
// import Table from "../../../Components/Page_Forms/Table";
// import Dialog from "../../../Components/Page_Forms/Dialog";
// import Heading2 from "../../../Components/Page_Forms/Heading2";
// import FaceUploader from "../../../Components/Page_Forms/FaceUploader";
// import Buttons from "../../../Components/Page_Forms/Buttons";
// import { getRoomList } from "../../../services/api";
// import useClassList from "../../../hooks/useClassList";
// import Loader from "../../../Components/Page_Forms/Loader";
// import CheckBox from "../../../Components/Page_Forms/CheckBox";

// function Assign_Exam_Hole() {
//   const instId = localStorage.getItem("InstituteID"); 
//   const sessId = localStorage.getItem("SessionID"); 
//   const [searchText, setSearchText] = useState("");
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const { classList } = useClassList();
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [roomList, setRoomList] = useState([]);
//   const [selectedRoomId, setSelectedRoomId] = useState("");
//   const [searched, setSearched] = useState(false);
//   const [tableData, setTableData] = useState([]);     // full API data
// const [filteredData, setFilteredData] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const columns = [
//     {
//       header: (
//         <CheckBox
//           checked={selectAll}
//           onChange={(e) => handleSelectAll(e.target.checked)}
//         />
//       ),
//       shortHeader: (
//         <CheckBox
//           checked={selectAll}
//           onChange={(e) => handleSelectAll(e.target.checked)}
//         />
//       ),
//       accessor: "select",
//       cell: (row) => (
//         <div onClick={(e) => e.stopPropagation()}>
//           <CheckBox
//             checked={selectedStudents.includes(row.id)}
//             onChange={() => handleRowSelect(row.id)}
//           />
//         </div>
//       ),
//     },
//     { header: "Roll No.", accessor: "roll" },
//     { header: "Serial No.", accessor: "serial" },
//     { header: "Name", accessor: "name" },
//     { header: "Father Name", accessor: "fname" },
//     { header: "D.O.B.", accessor: "dob" },
//     { header: "Father No.", accessor: "fno" },
//   ];

//   const clickTimer = React.useRef(null);

//   const handleRowClick = (row) => {
//     if (clickTimer.current) {
//       clearTimeout(clickTimer.current);
//       clickTimer.current = null;
//       setSelectedRow(row);
//       setOpenDialog(true);
//     } else {
//       clickTimer.current = setTimeout(() => {
//         clickTimer.current = null;
//       }, 250);
//     }
//   };

//   // =================== CHECK BOX (ALL) ======================
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//       const allIds = filteredData.map((row) => row.id);
//       setSelectedStudents(allIds);
//     } else {
//       setSelectedStudents([]);
//     }
//   };

//   useEffect(() => {
//     if (
//       filteredData.length > 0 &&
//       selectedStudents.length === filteredData.length
//     ) {
//       setSelectAll(true);
//     } else {
//       setSelectAll(false);
//     }
//   }, [selectedStudents, filteredData]);

//   // =================== CHECK BOX (ROW) ======================
//   const handleRowSelect = (id) => {
//     setSelectedStudents((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const allData = [
//     {
//       id: 1,
//       serial: "01",
//       roll: "11",
//       name: "Ajay",
//       fname: "Rman Thakur",
//       class: "Nur",
//       dob: "10-Dec-2022",
//       add: "221, Shanti Nagar, Jaipur",
//       fno: "1234567890",
//       cat: "sc",
//     },
//     {
//       id: 2,
//       serial: "02",
//       roll: "12",
//       name: "Ajay",
//       fname: "Rman",
//       class: "Nur",
//       dob: "01-jan-2021",
//       add: "Gandhinagar, Gujarat",
//       fno: "1234567540",
//       cat: "gen",
//     },
//     {
//       id: 3,
//       serial: "03",
//       roll: "13",
//       name: "Viren",
//       fname: "Devanh Bhalla",
//       class: "Nur",
//       dob: "31-sep-2023",
//       add: "Bengaluru",
//       fno: "1234567890",
//       cat: "st",
//     },
//   ];

//   useEffect(() => {
//     setFilteredData(allData);
//   }, []);

//   const handleSearch = () => {
//     if (!searchText.trim()) {
//       setFilteredData(allData);
//       return;
//     }
//     const lower = searchText.toLowerCase();
//     setFilteredData(
//       allData.filter((row) =>
//         Object.values(row).some((v) =>
//           String(v).toLowerCase().includes(lower)
//         )
//       )
//     );
//   };

//   useEffect(() => {
//     async function fetchRoom() {
//       try {
//         setSearched(true);
//         const res = await getRoomList();
//         if (res?.Table) setRoomList(res.Table);
//       } finally {
//         setSearched(false);
//       }
//     }
//     fetchRoom();
//   }, []);

//   return (
//     <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
//       <Loader show={searched} />
//       <Heading label={"Student Details"} />

//       <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
//         <Options 
//           label="Class" optionMsg="Select Class" options={classList} 
//           valueKey="Id" labelKey="ClassName" value={selectedClassId} 
//           onChange={(e) => setSelectedClassId(e.target.value)} 
//         /> 
//         <Options
//           label="Room Number"
//           name="roomno"
//           value={selectedRoomId}
//           options={roomList}
//           valueKey="Id"
//           labelKey="Name"
//           onChange={(e) => setSelectedRoomId(e.target.value)}
//         />
//         <Options
//           label={"Search By"}
//           optionMsg="Select Option"
//           options={["Name", "Serial No."]}
//         />
//         <FormInput
//           label={"Enter"}
//           placeholder={"Enter name, etc."}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>

//       {/* Search Button */}
//       <div className="flex justify-end py-5">
//         <Buttons click={handleSearch} label={"Search"} />
//       </div>

//       <Table
//         columns={columns}
//         data={filteredData}
//         selectable={false}
//         disableFloatingRow
//         onRowSelect={handleRowClick}
//       />

//       <Dialog open={openDialog} title="Student Details">
//         <Buttons label="Close" click={() => setOpenDialog(false)} />
//       </Dialog>
//     </div>
//   );
// }

// export default Assign_Exam_Hole;

