import React, { useEffect, useState } from "react";

import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import Table from "../../../Components/Page_Forms/Table";

import { getclass, getStudentAgeWiseReport } from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

function Student_Age_Wise() {
   const [rowDetailOpen, setRowDetailOpen] = useState(false);
   const [classList, setClassList] = useState([]);
   const [selectedClass, setSelectedClass] = useState("");
   const [tableData, setTableData] = useState([]);
   const [searched, setSearched] = useState(false);
   const [showTable, setShowTable] = useState(false);

   // ===================== TABLE =====================

   const columns = [
      { header: "Class", accessor: "class" },
      { header: "Age", accessor: "age" },
      { header: "Boy", accessor: "boy" },
      { header: "Girl", accessor: "girl" },
      { header: "Total", accessor: "tot" },
   ];

   // ===================== FETCH CLASS LIST =====================

   useEffect(() => {
      const instId = localStorage.getItem("InstituteID");
      if (!instId) return;

      async function fetchClasses() {
         try {
            const res = await getclass(instId);
            if (res?.Table?.[0]?.ResultCode === "R100") {
               setClassList(res.Table1 || []);
            } else {
               setClassList([]);
            }
         } catch (error) {
            console.log("Class API Error:", error);
            setClassList([]);
         }
      }

      fetchClasses();
   }, []);

   // ===================== AGE WISE API =====================

   const fetchAgeWiseReport = async (className = "") => {
      const instId = localStorage.getItem("InstituteID");
      const sessionId = localStorage.getItem("SessionID");

      if (!instId || !sessionId) return;

      setSearched(true);
      setShowTable(false);
      setTableData([]);

      try {
         const res = await getStudentAgeWiseReport(
            instId,
            sessionId,
            className
         );

         if (!res?.Table) return;

         const formatted = res.Table.map((row) => ({
            class: row.ClassName,
            age: row.Age,
            boy: row.Boy,
            girl: row.Girl,
            tot: row.Total,
         }));
         setShowTable(true);

         setTableData(formatted);
      } finally {
         setSearched(false);
      }
   };

   useEffect(() => {
   if (selectedClass) {
      fetchAgeWiseReport(selectedClass);
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClass]);

   // ===================== AUTO LOAD ON PAGE RELOAD =====================

   // useEffect(() => {
   //    fetchAgeWiseReport(""); // load all classes initially
   // }, []);

   // ===================== SEARCH =====================

   const handleSearch = () => {
      fetchAgeWiseReport(selectedClass);
   };

   // ===================== CLEAR =====================

   const handleClear = () => {
      setSelectedClass("");
      setTableData([]);
      setShowTable(false); 
   };

   // ===================== UI =====================

   return (
      <div className="w-full h-full bg-white flex flex-col px-4 py-2">
         <Loader show={searched} />
         <div className="flex justify-between mb-5">
            <Heading label={"Student Age Wise Report"} />
         </div>

         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 w-full">
            <div className="sm:w-1/3 mb-5 sm:mb-0">
               <Options
                  label="Class"
                  optionMsg="Select Class"
                  options={classList}
                  valueKey="Id"
                  labelKey="ClassName"
                  onChange={(e) => setSelectedClass(e.target.value)}
               />
            </div>

            <div className="flex justify-end items-center">
               <Buttons
                  click={handleSearch}
                  label={"Search"}
               />
            </div>
         </div>

         {showTable && (
            <>
            <Table
            columns={columns}
            data={tableData}
            onRowSelect={() => {}}
            disableFloatingRow={false}
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
         />

         <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
            <Buttons label={"Clear"} click={handleClear} />
         </div>
         </>
         )}

         {rowDetailOpen && window.innerWidth < 768 && (
            <div className="h-140"></div>
         )}
      </div>
   );
}

export default Student_Age_Wise;
