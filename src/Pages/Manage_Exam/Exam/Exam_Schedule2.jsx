// import React, { useEffect, useState } from "react";
// import Heading from "../../../Components/Page_Forms/Heading";
// import CheckBox from "../../../Components/Page_Forms/CheckBox";
// import Options from "../../../Components/Page_Forms/Options";
// import FormInput from "../../../Components/Page_Forms/FormInput";
// import Table from "../../../Components/Page_Forms/Table";
// import Buttons from "../../../Components/Page_Forms/Buttons";
// import { useLocation } from "react-router-dom";
// import { getExamTimeTableDetail, getExamList } from "../../../services/api";
// import useClassList from "../../../hooks/useClassList";

// function Exam_Schedule2() { 
//   const location = useLocation(); 
//   const { listId, examId, classId } = location.state || {}; 
//   const { classList } = useClassList(); 
//   const instId = localStorage.getItem("InstituteID"); 
//   const sessId = localStorage.getItem("SessionID"); 
//   const [searched, setSearched] = useState(false); 
//   const [tableData, setTableData] = useState([]); 
//   const [examList, setExamList] = useState([]); 
  
//   const [formData, setFormData] = useState({ 
//     exam: "", classId: "", startDate: "", endDate: "", 
//     remark: "", isSupplementary: false, 
//   }); 
  
//   // const columns = [ 
//   //   { header: "Subject", accessor: "sub" }, 
//   //   { header: "Exam Type", accessor: "exam" }, 
//   //   { header: "Exam Date", accessor: "date" }, 
//   //   { header: "Start Time", accessor: "start" }, 
//   //   { header: "End Time", accessor: "end" }, 
//   // ]; 

//   const handleTableChange = (rowId, key, value) => {
//   setTableData((prev) =>
//     prev.map((row) =>
//       row.id === rowId ? { ...row, [key]: value } : row
//     )
//   );
// };

// const columns = [
//   {
//     header: "Subject",
//     accessor: "sub",
//     cell: (row) => (
//       <input
//         type="text"
//         value={row.sub || ""}
//         onChange={(e) =>
//           handleTableChange(row.id, "sub", e.target.value)
//         }
//         onClick={(e) => e.stopPropagation()}
//         className="w-full border border-orange-200 rounded text-center text-black outline-orange-500"
//       />
//     ),
//   },
//   {
//     header: "Exam Type",
//     accessor: "exam",
//     cell: (row) => (
//       <input
//         type="text"
//         value={row.exam || ""}
//         onChange={(e) =>
//           handleTableChange(row.id, "exam", e.target.value)
//         }
//         onClick={(e) => e.stopPropagation()}
//         className="w-full border border-orange-200 rounded text-center text-black outline-orange-500"
//       />
//     ),
//   },
//   {
//     header: "Exam Date",
//     accessor: "date",
//     cell: (row) => (
//       <input
//         type="date"
//         value={row.date || ""}
//         onChange={(e) =>
//           handleTableChange(row.id, "date", e.target.value)
//         }
//         onClick={(e) => e.stopPropagation()}
//         className="w-full border border-orange-200 rounded text-center text-black outline-orange-500"
//       />
//     ),
//   },
//   {
//     header: "Start Time",
//     accessor: "start",
//     cell: (row) => (
//       <input
//         type="time"
//         value={row.start || ""}
//         onChange={(e) =>
//           handleTableChange(row.id, "start", e.target.value)
//         }
//         onClick={(e) => e.stopPropagation()}
//         className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner"
//       />
//     ),
//   },
//   {
//     header: "End Time",
//     accessor: "end",
//     cell: (row) => (
//       <input
//         type="time"
//         value={row.end || ""}
//         onChange={(e) =>
//           handleTableChange(row.id, "end", e.target.value)
//         }
//         onClick={(e) => e.stopPropagation()}
//         className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner"
//       />
//     ),
//   },
// ];



  
//   // =================== DATE ====================== 
//   const apiDateToInput = (apiDate) => { 
//     if (!apiDate) return ""; 
//     const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//     const d = new Date(timestamp); 
//     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; 
//   }; 
  
//   /* ================= EXAM LIST API ================= */ 
//   useEffect(() => { 
//     const fetchExamList = async () => { 
//       try { 
//         const res = await getExamList(instId, sessId); 
//         if (res?.Table) { 
//           setExamList(res.Table); 
//         } 
//       } catch (err) { 
//         console.error("Exam List API Error", err); 
//       } 
//     }; 
    
//     fetchExamList(); 
//   }, [instId, sessId]); 
  
//   /* ================= EDIT DETAIL API ================= */ 
//   useEffect(() => { 
//     if (!listId || !examId || !classId) return; 
    
//     const fetchDetail = async () => { 
//       try { 
//         setSearched(true); 
        
//         const res = await getExamTimeTableDetail(listId, examId, instId, sessId, classId); 
        
//         // ===== FORM DATA ===== 
//         if (res?.Table?.length) { 
//           const first = res.Table[0]; 
          
//           setFormData({ 
//             exam: Number(first.F_ExamMaster), 
//             classId: Number(first.F_ClassMaster), 
//             startDate: apiDateToInput(first.StartDate), 
//             endDate: apiDateToInput(first.EndDate), 
//             remark: first.Remarks || "", 
//             isSupplementary: first.IsSupplementary, 
//           }); 
//         } 
        
//         // ===== TABLE DATA ===== 
//         if (res?.Table1) { 
//           const mapped = res.Table1.map((item, i) => ({ 
//             id: i + 1, sub: item.Subject, exam: item.ExamType, 
//             date: apiDateToInput(item.ExamDate), 
//             start: item.StartTime, end: item.EndTime, 
//           })); 
//           setTableData(mapped); 
//         } 
//       } catch (err) { 
//         console.error("Detail API Error", err); 
//       } finally { 
//         setSearched(false); 
//       } 
//     }; 
    
//     fetchDetail(); 
//   }, [listId, examId, classId, instId, sessId]); 
  
//   return ( 
//     <div className="w-full h-full bg-white px-4 py-2"> 
//       <Heading label="Exam Schedule (Exam Time Table)" style="mb-5" /> 
//       <div className="mb-6"> 
//         <CheckBox 
//           label="Supplementary" checked={formData.isSupplementary} 
//           onChange={(e) => setFormData({ ...formData, isSupplementary: e.target.checked, })} 
//         /> 
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"> 
//           <Options 
//             label="Exam" optionMsg="Select Exam" options={examList} 
//             valueKey="Id" labelKey="Name" value={formData.exam} 
//             onChange={(e) => setFormData({ ...formData, exam: Number(e.target.value), })} 
//           /> 
//           <Options 
//             label="Class" optionMsg="Select Class" options={classList} 
//             valueKey="Id" labelKey="ClassName" value={formData.classId} 
//             onChange={(e) => setFormData({ ...formData, classId: Number(e.target.value), })} 
//           /> 
//         </div> 
//       </div> 
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6"> 
//         <FormInput 
//           label="Start Date" type="date" value={formData.startDate} 
//         /> 
//         <FormInput 
//           label="End Date" type="date" value={formData.endDate} 
//         /> 
//       </div> 
      
//       <FormInput 
//         label="Remark" value={formData.remark} 
//         onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
//       /> 
      
//       <div className="mt-6"> 
//         <Table 
//           columns={columns} data={tableData} 
//         /> 
//       </div> 
      
//       <div className="flex justify-end gap-6 mt-6"> 
//         <Buttons label="Cancel" /> 
//         <Buttons label="Save" /> 
//       </div> 
//     </div> 
//   ); 
// } 

// export default Exam_Schedule2; 


import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useLocation } from "react-router-dom";
import { getExamTimeTableDetail, getExamList, getExamTimeTableInsertUpdate } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Exam_Schedule2() {
  const location = useLocation();
  const { listId, examId, classId } = location.state || {};
  const { classList } = useClassList();
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");
  const [searched, setSearched] = useState(false);
  const [examList, setExamList] = useState([]);

  const createEmptyRow = (id) => ({ 
    id, sub: "", exam: "", date: "", start: "", end: "", 
  }); 
  
  const isRowFilled = (row) => row.sub && row.exam && row.date && row.start && row.end; 
  
  const [tableData, setTableData] = useState([createEmptyRow(1)]); 

  const [formData, setFormData] = useState({ 
    exam: "", classId: "", startDate: "", endDate: "", 
    remark: "", isSupplementary: false, 
  }); 

  // =================== DATE FUNCTIONS ======================
  // INPUT → API
  const formatDateForApi = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d)) return null;
    const day = d.getUTCDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // API → INPUT(EXAM DATE WHICH IS IN TABLE)
  const ExamDateToInput = (apiDate) => {
    if (!apiDate) return "";
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10);
    const d = new Date(timestamp);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // API → INPUT(START AND END DATE)
  const apiDateToInput = (apiDate) => {
  if (!apiDate) return "";

  const match = apiDate.match(/Date\((\d+)/);
  if (!match) return "";

  const d = new Date(Number(match[1]));

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


  // =================== TIME ======================
  const apiTimeToInput = (time) => {
    if (!time) return "";
    time = time.replace(/\s+/g, "").toUpperCase();
    if (/^\d{1,2}:\d{2}$/.test(time)) {
      const [h, m] = time.split(":");
      return `${h.padStart(2, "0")}:${m}`;
    }
    const match = time.match(/(\d{1,2}):(\d{2})(AM|PM)/);
    if (!match) return "";
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    const period = match[3];
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${minute}`;
  };

  // =================== TABLE ======================
  const handleTableChange = (rowId, key, value) => { 
    setTableData((prev) => { 
      const updated = prev.map((row) => 
        row.id === rowId ? { ...row, [key]: value } : row 
      ); 
      
      const lastRow = updated[updated.length - 1]; 
      if (isRowFilled(lastRow)) { 
        return [...updated, createEmptyRow(updated.length + 1)]; 
      } 
      
      return updated; 
    }); 
  }; 

  const columns = [ 
    { 
      header: "Subject", accessor: "sub", 
      cell: (row) => ( 
        <input 
          type="text" value={row.sub || ""} placeholder="Enter Subject" 
          onChange={(e) => handleTableChange(row.id, "sub", e.target.value) } 
          onClick={(e) => e.stopPropagation()} 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
        /> 
      ), 
    }, 
    { 
      header: "Exam Type", accessor: "exam", 
      cell: (row) => ( 
        <input 
          type="text" value={row.exam || ""} placeholder="Enter Exam" 
          onChange={(e) => handleTableChange(row.id, "exam", e.target.value) } 
          onClick={(e) => e.stopPropagation()} 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
        /> 
      ), 
    }, 
    { 
      header: "Exam Date", accessor: "date", 
      cell: (row) => ( 
        <input 
          type="date" value={row.date || ""} onChange={(e) => handleTableChange(row.id, "date", e.target.value) } 
          onClick={(e) => e.stopPropagation()} 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
        /> 
      ), 
    }, 
    { 
      header: "Start Time", accessor: "start", 
      cell: (row) => ( 
        <input 
          type="time" value={row.start || ""} onChange={(e) => handleTableChange(row.id, "start", e.target.value) } 
          onClick={(e) => e.stopPropagation()} 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner" 
        /> 
      ), 
    }, 
    { 
      header: "End Time", accessor: "end", 
      cell: (row) => ( 
        <input 
          type="time" value={row.end || ""} onChange={(e) => handleTableChange(row.id, "end", e.target.value) } 
          onClick={(e) => e.stopPropagation()} 
          className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner" 
        /> 
      ), 
    }, 
  ]; 

  // =================== EXAM LIST ====================== 
  useEffect(() => { 
    const fetchExamList = async () => { 
      try { 
        const res = await getExamList(instId, sessId); 
        if (res?.Table) { 
          setExamList(res.Table); 
        } 
      } catch (err) { 
        console.error("Exam List API Error", err); 
      } 
    }; 
    fetchExamList(); 
  }, [instId, sessId]); 

  // =================== EXAM TIME TABLE DETAIL ====================== 
  useEffect(() => { 
    if (!listId || !examId || !classId) return; 
    const fetchDetail = async () => { 
      try { 
        setSearched(true); 
        const res = await getExamTimeTableDetail(listId, examId, instId, sessId, classId); 
        
        if (res?.Table?.length) { 
          const first = res.Table[0]; 
          setFormData({ 
            exam: Number(first.F_ExamMaster), 
            classId: Number(first.F_ClassMaster), 
            startDate: apiDateToInput(first.StartDate), 
            endDate: apiDateToInput(first.EndDate), 
            remark: first.Remarks || "", 
          }); 
        } 
        
        if (res?.Table1) { 
          const mapped = res.Table1.map((item, i) => ({ 
            id: i + 1, 
            sub: item.Subject || "", 
            exam: item.ExamType || "", 
            date: ExamDateToInput(item.ExamDate), 
            start: apiTimeToInput(item.StartTime), 
            end: apiTimeToInput(item.EndTime), 
          })); 
          
          setTableData([ 
            ...mapped, createEmptyRow(mapped.length + 1), 
          ]); 
        } 
      } catch (err) { 
        console.error("Detail API Error", err); 
      } finally { 
        setSearched(false); 
      } 
    }; 
    fetchDetail(); 
  }, [listId, examId, classId, instId, sessId]); 

  // =================== SAVE / UPDATE ====================== 
  const handleSave = async () => { 
    try { 
      setSearched(true) 
      const validRows = tableData.filter( 
        (row) => row.sub && row.exam && row.date && row.start && row.end 
      ); 
      if (!validRows.length) { 
        alert("Please enter at least one subject"); 
        return; 
      } 
      const timeTableData = validRows.map((row) => ({ 
        Subject: row.sub, 
        ExamType: row.exam, 
        ExamDate: formatDateForApi(row.date), // ✅ use UTC-safe formatting
        StartTime: row.start, 
        EndTime: row.end, 
      })); 
      
      const res = await getExamTimeTableInsertUpdate( 
        listId || 0, 
        formData.exam, 
        instId, sessId, 
        formData.classId, 
        formatDateForApi(formData.startDate), 
        formatDateForApi(formData.endDate), 
        timeTableData, 
        formData.remark 
      ); 
      
      if (res?.Table?.[0]?.Column1) { 
        alert(res.Table[0].Column1); 
      } 
    } catch (error) { 
      console.error("Save Error", error); 
      alert("Something went wrong while saving"); 
    } finally{
      setSearched(false) 
    } 
  }; 

  return (
    <div className="w-full h-full bg-white px-4 py-2"> 
      <Loader show={searched}/>
      <Heading label="Exam Schedule (Exam Time Table)" style="mb-5" />
      <div className="mb-6">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <Options
            label="Exam"
            optionMsg="Select Exam"
            options={examList}
            valueKey="Id"
            labelKey="Name"
            value={formData.exam}
            onChange={(e) =>
              setFormData({ ...formData, exam: Number(e.target.value) })
            }
          />
          <Options
            label="Class"
            optionMsg="Select Class"
            options={classList}
            valueKey="Id"
            labelKey="ClassName"
            value={formData.classId}
            onChange={(e) =>
              setFormData({ ...formData, classId: Number(e.target.value) })
            }
          />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <FormInput label="Start Date" type="date" value={formData.startDate} />
        <FormInput label="End Date" type="date" value={formData.endDate} />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
  <FormInput
    label="Start Date"
    type="date"
    value={formData.startDate}
    onChange={(e) =>
      setFormData({ ...formData, startDate: e.target.value })
    }
  />

  <FormInput
    label="End Date"
    type="date"
    value={formData.endDate}
    onChange={(e) =>
      setFormData({ ...formData, endDate: e.target.value })
    }
  />
</div>


      <FormInput
        label="Remark"
        value={formData.remark}
        onChange={(e) =>
          setFormData({ ...formData, remark: e.target.value })
        }
      />

      <div className="mt-6">
        <Table columns={columns} data={tableData} />
      </div>

      <div className="flex justify-end gap-6 mt-6">
        <Buttons label="Cancel" />
        <Buttons label="Save" click={handleSave} />
      </div>
    </div>
  );
}

export default Exam_Schedule2;




// import React, { useEffect, useState } from "react";
// import Heading from "../../../Components/Page_Forms/Heading";
// import CheckBox from "../../../Components/Page_Forms/CheckBox";
// import Options from "../../../Components/Page_Forms/Options";
// import FormInput from "../../../Components/Page_Forms/FormInput";
// import Table from "../../../Components/Page_Forms/Table";
// import Buttons from "../../../Components/Page_Forms/Buttons";
// import { useLocation } from "react-router-dom";
// import { getExamTimeTableDetail, getExamList, getExamTimeTableInsertUpdate } from "../../../services/api";
// import useClassList from "../../../hooks/useClassList";

// function Exam_Schedule2() {
//   const location = useLocation();
//   const { listId, examId, classId } = location.state || {};
//   const { classList } = useClassList();
//   const instId = localStorage.getItem("InstituteID");
//   const sessId = localStorage.getItem("SessionID");
//   const [searched, setSearched] = useState(false);
//   const [examList, setExamList] = useState([]);

//   const createEmptyRow = (id) => ({ 
//     id, sub: "", exam: "", date: "", start: "", end: "", 
//   }); 
  
//   const isRowFilled = (row) => row.sub && row.exam && row.date && row.start && row.end; 
  
//   const [tableData, setTableData] = useState([createEmptyRow(1)]); 

//   const [formData, setFormData] = useState({ 
//     exam: "", classId: "", startDate: "", endDate: "", 
//     remark: "", isSupplementary: false, 
//   }); 
  
//   // =================== TABLE ====================== 
//   const handleTableChange = (rowId, key, value) => { 
//     setTableData((prev) => { 
//       const updated = prev.map((row) => 
//         row.id === rowId ? { ...row, [key]: value } : row 
//       ); 
      
//       const lastRow = updated[updated.length - 1]; 
//       if (isRowFilled(lastRow)) { 
//         return [...updated, createEmptyRow(updated.length + 1)]; 
//       } 
      
//       return updated; 
//     }); 
//   }; 

//   // =================== TABLE COLUMN ====================== 
//   const columns = [ 
//     { 
//       header: "Subject", accessor: "sub", 
//       cell: (row) => ( 
//         <input 
//           type="text" value={row.sub || ""} placeholder="Enter Subject" 
//           onChange={(e) => handleTableChange(row.id, "sub", e.target.value) } 
//           onClick={(e) => e.stopPropagation()} 
//           className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
//         /> 
//       ), 
//     }, 
    
//     { 
//       header: "Exam Type", accessor: "exam", 
//       cell: (row) => ( 
//         <input 
//           type="text" value={row.exam || ""} placeholder="Enter Exam" 
//           onChange={(e) => handleTableChange(row.id, "exam", e.target.value) } 
//           onClick={(e) => e.stopPropagation()} 
//           className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
//         /> 
//       ), 
//     }, 
    
//     { 
//       header: "Exam Date", accessor: "date", 
//       cell: (row) => ( 
//         <input 
//           type="date" value={row.date || ""} onChange={(e) => handleTableChange(row.id, "date", e.target.value) } 
//           onClick={(e) => e.stopPropagation()} 
//           className="w-full border border-orange-200 rounded text-center text-black outline-orange-500" 
//         /> 
//       ), 
//     }, 
    
//     { 
//       header: "Start Time", accessor: "start", 
//       cell: (row) => ( 
//         <input 
//           type="time" value={row.start || ""} onChange={(e) => handleTableChange(row.id, "start", e.target.value) } 
//           onClick={(e) => e.stopPropagation()} 
//           className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner" 
//         /> 
//       ), 
//     }, 
    
//     { 
//       header: "End Time", accessor: "end", 
//       cell: (row) => ( 
//         <input 
//           type="time" value={row.end || ""} onChange={(e) => handleTableChange(row.id, "end", e.target.value) } 
//           onClick={(e) => e.stopPropagation()} 
//           className="w-full border border-orange-200 rounded text-center text-black outline-orange-500 no-spinner" 
//         /> 
//       ), 
//     }, 
//   ]; 
  
//   // =================== DATE ====================== 
//   const apiDateToInput = (apiDate) => { 
//     if (!apiDate) return ""; 
//     const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//     const d = new Date(timestamp); 
//     return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; 
//   }; 
  
//   // =================== TIME ====================== 
//   // const apiTimeToInput = (time) => { 
//   //   if (!time) return ""; 
    
//   //   // Example: "08:00AM" 
//   //   const match = time.match(/(\d+):(\d+)(AM|PM)/i); 
//   //   if (!match) return ""; 
//   //   let hour = parseInt(match[1], 10); 
//   //   const minute = match[2]; 
//   //   const period = match[3].toUpperCase(); 
//   //   if (period === "PM" && hour !== 12) hour += 12; 
//   //   if (period === "AM" && hour === 12) hour = 0; 
//   //   return `${String(hour).padStart(2, "0")}:${minute}`; 
//   // }; 
//   const apiTimeToInput = (time) => {
//   if (!time) return "";

//   // Clean spaces
//   time = time.replace(/\s+/g, "").toUpperCase();

//   // Case 1: already 24-hour format (13:34)
//   if (/^\d{1,2}:\d{2}$/.test(time)) {
//     const [h, m] = time.split(":");
//     return `${h.padStart(2, "0")}:${m}`;
//   }

//   // Case 2: 12-hour format (10:00AM, 01:00PM)
//   const match = time.match(/(\d{1,2}):(\d{2})(AM|PM)/);
//   if (!match) return "";

//   let hour = parseInt(match[1], 10);
//   const minute = match[2];
//   const period = match[3];

//   if (period === "PM" && hour !== 12) hour += 12;
//   if (period === "AM" && hour === 12) hour = 0;

//   return `${String(hour).padStart(2, "0")}:${minute}`;
// };

  
  
//   // =================== EXAM LIST ====================== 
//   useEffect(() => { 
//     const fetchExamList = async () => { 
//       try { 
//         const res = await getExamList(instId, sessId); 
//         if (res?.Table) { 
//           setExamList(res.Table); 
//         } 
//       } catch (err) { 
//         console.error("Exam List API Error", err); 
//       } 
//     }; 
    
//     fetchExamList(); 
//   }, [instId, sessId]); 
  
//   // =================== EXAM TIME TABLE DETAIL ====================== 
//   useEffect(() => { 
//     if (!listId || !examId || !classId) return; 
    
//     const fetchDetail = async () => { 
//       try { 
//         setSearched(true); 
        
//         const res = await getExamTimeTableDetail(listId, examId, instId, sessId, classId); 
        
//         if (res?.Table?.length) { 
//           const first = res.Table[0]; 
          
//           setFormData({ 
//             exam: Number(first.F_ExamMaster), 
//             classId: Number(first.F_ClassMaster), 
//             startDate: apiDateToInput(first.StartDate), 
//             endDate: apiDateToInput(first.EndDate), 
//             remark: first.Remarks || "", 
//             isSupplementary: first.IsSupplementary, 
//           }); 
//         } 
        
//         if (res?.Table1) { 
//           const mapped = res.Table1.map((item, i) => ({ 
//             id: i + 1, 
//             sub: item.Subject || "", 
//             exam: item.ExamType || "", 
//             date: apiDateToInput(item.ExamDate), 
//             start: apiTimeToInput(item.StartTime), 
//             end: apiTimeToInput(item.EndTime), 
//           })); 
          
//           setTableData([ 
//             ...mapped, createEmptyRow(mapped.length + 1), 
//           ]); 
//         } 
//       } catch (err) { 
//         console.error("Detail API Error", err); 
//       } finally { 
//         setSearched(false); 
//       } 
//     }; 
    
//     fetchDetail(); 
//   }, [listId, examId, classId, instId, sessId]); 
  
//   // =================== SAVE / UPDATE ====================== 
//   const handleSave = async () => { 
//     try { 
//       // remove last empty row 
//       const validRows = tableData.filter( 
//         (row) => row.sub && row.exam && row.date && row.start && row.end 
//       ); 
      
//       if (!validRows.length) { 
//         alert("Please enter at least one subject"); 
//         return; 
//       } 
      
//       const timeTableData = validRows.map((row) => ({ 
//         Subject: row.sub, ExamType: row.exam, ExamDate: row.date 
//         ? new Date(row.date).toLocaleDateString("en-GB", { 
//           day: "2-digit", month: "short", year: "numeric", 
//         }).replace(/ /g, "/") : "", 
//         StartTime: row.start, 
//         EndTime: row.end, 
//       })); 
      
//       const res = await getExamTimeTableInsertUpdate( 
//         listId || 0, 
//         formData.exam, 
//         instId, sessId, 
//         formData.classId, 
//         formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-GB", { 
//           day: "2-digit", 
//           month: "short", 
//           year: "numeric", 
//         }).replace(/ /g, "/") : "", 
//         formData.endDate ? new Date(formData.endDate).toLocaleDateString("en-GB", { 
//           day: "2-digit", 
//           month: "short", 
//           year: "numeric", 
//         }).replace(/ /g, "/") : "", 
//         timeTableData, 
//         formData.remark || "Ok" 
//       ); 
      
//       if (res?.Table?.[0]?.Column1) { 
//         alert(res.Table[0].Column1); // 👉 "Record Insert Successfully" 
//       } 
//     } catch (error) { 
//       console.error("Save Error", error); 
//       alert("Something went wrong while saving"); 
//     } 
//   }; 
  
//   return (
//     <div className="w-full h-full bg-white px-4 py-2">
//       <Heading label="Exam Schedule (Exam Time Table)" style="mb-5" />

//       <div className="mb-6">
//         <CheckBox
//           label="Supplementary"
//           checked={formData.isSupplementary}
//           onChange={(e) =>
//             setFormData({
//               ...formData,
//               isSupplementary: e.target.checked,
//             })
//           }
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
//           <Options
//             label="Exam"
//             optionMsg="Select Exam"
//             options={examList}
//             valueKey="Id"
//             labelKey="Name"
//             value={formData.exam}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 exam: Number(e.target.value),
//               })
//             }
//           />
//           <Options
//             label="Class"
//             optionMsg="Select Class"
//             options={classList}
//             valueKey="Id"
//             labelKey="ClassName"
//             value={formData.classId}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 classId: Number(e.target.value),
//               })
//             }
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//         <FormInput label="Start Date" type="date" value={formData.startDate} />
//         <FormInput label="End Date" type="date" value={formData.endDate} />
//       </div>

//       <FormInput
//         label="Remark"
//         value={formData.remark}
//         onChange={(e) =>
//           setFormData({ ...formData, remark: e.target.value })
//         }
//       />

//       <div className="mt-6">
//         <Table columns={columns} data={tableData} />
//       </div>

//       <div className="flex justify-end gap-6 mt-6">
//         <Buttons label="Cancel" />
//         <Buttons label="Save" click={handleSave} />
//       </div>
//     </div>
//   );
// }

// export default Exam_Schedule2;
