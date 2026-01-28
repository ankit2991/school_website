import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";
import { getFeesDetails, getStudentReportDetail } from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

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
const [searched, setSearched] = useState(false);
const [showTable, setShowTable] = useState(false);

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

   const handleSearch = async () => {
   const instId = localStorage.getItem("InstituteID");
   const sessionId = localStorage.getItem("SessionID");

   if (!instId || !sessionId || !classId ) {
      alert("Please select Class and Option");
      return;
   }

   try {
      setSearched(true);
      setShowTable(false);
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
   setShowTable(true);
} else {
   setStudentData([]);
   setShowTable(false);
}

   } catch (err) {
      console.log("Student Report Error:", err);
      setStudentData([]);
      setShowTable(false);
   } finally { 
      setSearched(false); 
    }
};

useEffect(() => {
  if (classId) {
    handleSearch();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [classId]);


   return (
      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
         <Loader show={searched} />
         <div className="flex justify-between items-center gap-x-4 mb-5">
            <Heading
               label={"Student Details"}
               style={"text-[22px] sm:text-3xl"}
            />
{showTable && (
            <Buttons 
          label="Print" 
          click={() => { window.open("/pdf/2AddReportViewer.pdf", "_blank"); }} 
        /> )}
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

{showTable && (
   <>
      <Table
   columns={columns}
   data={studentData}
   disableFloatingRow={false}
   colStyle="sm:min-w-[135px]  text-[12px]  whitespace-nowrap"
/>



         <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-5">
               <Buttons label={"Clear"} />
            </div>
            {/* <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10  ">
               <Buttons label={"Parent Signature"} />
               <Buttons label={"Addmission Form"} />
            </div> */}
            <div className="flex flex-col [@media(min-width:370px)]:flex-row justify-around sm:justify-end gap-3 sm:gap-10 sm:mt-5">
  <Buttons label={"Parent Signature"} />
  <Buttons label={"Admission Form"} />
</div>

         </div> </> )}
         {/* ✅ Dynamic div for spacing */}
         {/* {rowDetailOpen && <div className='h-100'></div>} */}
         {rowDetailOpen && window.innerWidth < 768 && (
            <div className="h-140"></div>
         )}
      </div>
   );
}

export default Students_Details;


