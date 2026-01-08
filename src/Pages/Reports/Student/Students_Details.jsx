import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import { getFeesDetails, getStudentReportDetail } from "../../../services/api";

function Students_Details() {
    const navigate = useNavigate();
    const [classList, setClassList] = useState([]);
   const [agree, setAgree] = useState(false);
//    const [agree2, setAgree2] = useState(false);
   // eslint-disable-next-line no-unused-vars
   const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/
   const [classId, setClassId] = useState("");
   const [searchType, setSearchType] = useState("");
   const [search, setSearch] = useState("");
   const [studentData, setStudentData] = useState([]);
const [selectedRows, setSelectedRows] = useState([]);

   // close
  const isAllSelected =
   studentData.length > 0 &&
   selectedRows.length === studentData.length;

const toggleSelectAll = () => {
   if (isAllSelected) {
      setSelectedRows([]);
   } else {
      setSelectedRows(studentData.map((row) => row.Id));
   }
};

const toggleRow = (id) => {
   setSelectedRows((prev) =>    
      prev.includes(id)
         ? prev.filter((rowId) => rowId !== id)
         : [...prev, id]
   );
};

   const columns = [
   {
      header: (
         <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleSelectAll}
         />
      ),
      shortHeader: "",
      accessor: "select",
      cell: (row) => (
         <input
            type="checkbox"
            checked={selectedRows.includes(row.Id)}
            onChange={() => toggleRow(row.Id)}
         />
      ),
   },
   { header: "Serial No.", accessor: "SrNo" },
   { header: "Name", accessor: "Name" },
   { header: "Father Name", accessor: "FatherName" },
   { header: "Mother Name", accessor: "MotherName" },
   { header: "Class", accessor: "ClassName" },
   { header: "D.O.B.", accessor: "Column1" },
   { header: "Admission Date", accessor: "Column2" },
   {
      header: "Address",
      accessor: "Address1",
      cellStyle:
         "max-w-[160px] truncate sm:whitespace-normal sm:break-words",
   },
   { header: "Father No.", accessor: "FMobileNo" },
   { header: "Mother No.", accessor: "MMobileNo" },
];

   const searchTypeList = [
      { Id: "1", Name: "SR. No." },
      { Id: "2", Name: "Name" },
      { Id: "3", Name: "New Student" },
      { Id: "4", Name: "StudentType" },
      { Id: "5", Name: "NSO Student" },
      { Id: "6", Name: "Leave Student" },
   ];

   


//    const data = [
//       {
//          id: 1,
//          serial: "01",
//          name: "Ajay",
//          fname: "Rman Thakur",
//          mname: "Shreya",
//          class: "Nur",
//          dob: "10-Dec-2022",
//          addate: "26-may-2024",
//          add: "221, Shanti Nagar, Near Hanuman Mandir, Jaipur, Rajasthan – 302012",
//          fno: "1234567890",
//          mno: "1234567890",
//          cat: "sc",
//          gen: "Boy",
//       },
//       {
//          id: 2,
//          serial: "02",
//          name: "Ajay",
//          fname: "Rman",
//          mname: "Priya",
//          class: "Nur",
//          dob: "01-jan-2021",
//          addate: "10-Dec-2023",
//          add: "Flat No. 14, Green Valley Apartments, Sector 21, Gandhinagar, Gujarat – 382021",
//          fno: "1234567540",
//          mno: "1234567890",
//          cat: "gen",
//          gen: "Boy",
//       },
//       {
//          id: 3,
//          serial: "03",
//          name: "Viren",
//          fname: "Devanh Bhalla",
//          mname: "Kiya",
//          class: "Nur",
//          dob: "31-sep-2023",
//          addate: "03-feb-2024",
//          add: "3rd Floor, Lakeview Residency, Green Valley Apartments, Sector 21, Gandhinagar Whitefield, Bengaluru, Karnataka – 560066",
//          fno: "1234567890",
//          mno: "1234567890",
//          cat: "st",
//          gen: "Boy",
//       },
//       {
//          id: 4,
//          serial: "04",
//          name: "anuj",
//          fname: "aditya",
//          mname: "Teena",
//          class: "Nur",
//          dob: "26-may-2023",
//          addate: "10-Dec-2025",
//          add: "House No. 77, Palm Avenue, Vyttila, Kochi, Kerala – 682019",
//          fno: "1234567890",
//          mno: "1234567890",
//          cat: "obc",
//          gen: "Boy",
//       },
//       {
//          id: 5,
//          serial: "05",
//          name: "somya",
//          fname: "Devanh",
//          mname: "Shalini",
//          class: "Nur",
//          dob: "03-feb-2022",
//          addate: "01-jan-2024",
//          add: "Plot No. 9, Palm Avenue, Vyttila, Ocean Pearl Apartments, Juhu, Near Hanuman Mandir, Jaipur, Rose Garden Society, Alkapuri, Vadodara, Gujarat – 390007",
//          fno: "1234567867",
//          mno: "1234567890",
//          cat: "sc",
//          gen: "Boy",
//       },
//    ];

   // useEffect(() => {
   //     const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
   //     if (!instId) return;

   //     async function fetchClasses() {
   //         try {
   //             const res = await getclass(instId);  // ✅ Pass selected Institute ID
   //             setClassList(res.Table || []);
   //         } catch (error) {
   //             console.log("Class API Error:", error);
   //         }
   //     }
   //     fetchClasses();
   // }, []);

  useEffect(() => {
      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");
      if (!instId) return;
  
      (async () => {
        try {
          const res = await getFeesDetails(instId, sessionId);
          setClassList(res.Table || []);
        } catch (err) {
          console.log("FeesDetails API Error:", err);
          setClassList([]);
        }
      })();
    }, []);

//    useEffect(() => {
//       const instId = localStorage.getItem("InstituteID");
//       const sessionId = localStorage.getItem("SessionID");

//       if (!instId) return;
//       async function fetchStudentReport() {
//          try {
//             const res = await getStudentReportDetail(
//                instId,
//                sessionId,
//                classId,
//                searchType,
//                search
//             );
//             // ✅ check API success
//             if (res?.Table?.[0]?.ResultCode === "R100") {
//                setClassList(res.Table1 || []);
//             } else {
//                setClassList([]);
//             }
//          } catch (error) {
//             console.log("Class API Error:", error);
//             setClassList([]);
//          }
//       }

//       fetchStudentReport();
//    }, []);

   const handleSearch = async () => {
   const instId = localStorage.getItem("InstituteID");
   const sessionId = localStorage.getItem("SessionID");

   if (!instId || !sessionId || !classId ) {
      alert("Please select Class and Option");
      return;
   }

   try {
      const res = await getStudentReportDetail(
         instId,
         sessionId,
         classId,
         searchType,
         search
      );

      if (Array.isArray(res?.Table)) {
   setStudentData(res.Table);
   setSelectedRows([]); // reset checkbox selection
} else {
   setStudentData([]);
}

   } catch (err) {
      console.log("Student Report Error:", err);
      setStudentData([]);
   }
};

   return (
      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
         <div className="flex justify-between items-center gap-x-4 mb-5">
            <Heading
               label={"Student Details"}
               style={"text-[22px] sm:text-3xl"}
            />
            <Buttons
               click={() => navigate("")}
               label={"Print"}
               style="whitespace-nowrap h-10"
            />
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
            <Options
               label="Class"
               optionMsg="Select Class"
               options={classList}
               valueKey="Id"
               labelKey="ClassName"
               value={classId}
               onChange={(e) => setClassId(e.target.value)}
            />

            <Options
               label="Options"
               optionMsg="Select Option"
               options={searchTypeList}
               valueKey="Id"
               labelKey="Name"
               value={searchType}
               onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearch(""); // reset search text
               }}
            />

            {searchType &&
   searchType !== "5" &&
   searchType !== "6" && (
      <FormInput
         label="Search By"
         placeholder="Enter name, Sr. No., etc."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
      />
)}


{searchType &&
   searchType !== "5" &&
   searchType !== "6" && (
            <div className="sm:mt-11">
               <CheckBox
                  label={""}
                  name={""}
                  checked={agree}
                  checkstyle={""}
                  onChange={(e) => setAgree(e.target.checked)}
               />
            </div>
            )}
         </div>

 <div className="flex justify-end mb-5">
        <Buttons click={handleSearch} label="Search"  style=""  />
                                    
            </div>

      <Table
   columns={columns}
   data={studentData}
   disableFloatingRow={false}
   colStyle="sm:min-w-[135px]  text-[12px]  whitespace-nowrap"
/>



         <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-5">
               <Buttons label={"Clear"} style="px-6 py-2" />
            </div>
            <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 mt-5 ">
               <Buttons label={"Parent Signature"} style="px-6 py-2" />
               <Buttons label={"Addmission Form"} style="px-6 py-2" />
            </div>
         </div>
         {/* ✅ Dynamic div for spacing */}
         {/* {rowDetailOpen && <div className='h-100'></div>} */}
         {rowDetailOpen && window.innerWidth < 768 && (
            <div className="h-140"></div>
         )}
      </div>
   );
}

export default Students_Details;



{/* */}
