// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Options from "../../Components/Page_Forms/Options";
// import {
//   getClassWiseStudents,
//   getFeesDetails,
//   getStudentDetails,
//   getVehicleWiseStudent,
// } from "../../services/api";

// function Transport_Fee() {
//   const navigate = useNavigate();

//   const [classList, setClassList] = useState([]);
//   const [studentList, setStudentList] = useState([]);
//   const [vehicleList, setVehicleList] = useState([]);
//   const [student, setStudent] = useState(null);

//   // ✅ Selected IDs
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [selectedVehicleId, setSelectedVehicleId] = useState("");
//   const [selectedStudentId, setSelectedStudentId] = useState("");

//   /* ---------------- FETCH CLASS & VEHICLE LIST ---------------- */
//   useEffect(() => {
//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");
//     if (!instId) return;

//     async function fetchData() {
//       try {
//         const res = await getFeesDetails(instId, sessionId);
//         setClassList(res.Table || []);
//         setVehicleList(res.Table3 || []);
//       } catch (error) {
//         console.log("FeesDetails API Error:", error);
//         setClassList([]);
//         setVehicleList([]);
//       }
//     }

//     fetchData();
//   }, []);

//   /* ---------------- FETCH STUDENT DETAILS ---------------- */
//   useEffect(() => {
//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//     if (!instId || !selectedStudentId || !selectedClassId) {
//       setStudent(null);
//       return;
//     }

//     async function fetchStudent() {
//       try {
//         const res = await getStudentDetails(
//           instId,
//           selectedStudentId,
//           sessionId,
//           selectedClassId
//         );
//         setStudent(res?.Table?.[0] || null);
//       } catch (error) {
//         console.log("StudentDetails API Error:", error);
//         setStudent(null);
//       }
//     }

//     fetchStudent();
//   }, [selectedClassId, selectedStudentId]);

//   /* ---------------- CLASS CHANGE ---------------- */
//   const handleClassChange = async (e) => {
//     const classId = e.target.value;

//     // 🔁 RESET VEHICLE & STUDENT
//     setSelectedClassId(classId);
//     setSelectedVehicleId("");
//     setSelectedStudentId("");
//     setStudentList([]);
//     setStudent(null);

//     if (!classId) return;

//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//     try {
//       const res = await getClassWiseStudents(instId, sessionId, classId);
//       setStudentList(res.Table || []);
//     } catch (error) {
//       console.log("Student API Error:", error);
//       setStudentList([]);
//     }
//   };

//   /* ---------------- VEHICLE CHANGE ---------------- */
//   const handleVehicleChange = async (e) => {
//     const vehicleId = e.target.value;

//     // 🔁 RESET CLASS & STUDENT
//     setSelectedVehicleId(vehicleId);
//     setSelectedClassId("");
//     setSelectedStudentId("");
//     setStudentList([]);
//     setStudent(null);

//     if (!vehicleId) return;

//     const instId = localStorage.getItem("InstituteID");
//     const sessionId = localStorage.getItem("SessionID");

//     try {
//       const res = await getVehicleWiseStudent(instId, sessionId, vehicleId);
//       setStudentList(res.Table || []);
//     } catch (error) {
//       console.log("Student API Error:", error);
//       setStudentList([]);
//     }
//   };


//   /* ---------------- SEARCH ---------------- */
//   const handleSearch = () => {
//     if (!selectedStudentId) {
//       alert("Please select Student");
//       return;
//     }

//     navigate("/Transport-Fee", {
//       state: {
//         classId: selectedClassId,
//         studentId: selectedStudentId,
//         vehicleId: selectedVehicleId,
//       },
//     });
//   };

  
//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <div className="flex justify-between mb-5">
//         <Heading label="Pay Transport Fees" />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//         {/* Class */}
//         <Options
//           label="Class"
//           optionMsg="Select Class"
//           options={classList}
//           valueKey="Id"
//           labelKey="ClassName"
//           value={selectedClassId}
//           onChange={handleClassChange}
//         />

//         {/* Student */}
//         <Options
//           label="Student Name"
//           optionMsg="Select Student"
//           options={studentList}
//           valueKey="Id"
//           labelKey="Name"
//           value={selectedStudentId}
//           onChange={(e) => setSelectedStudentId(e.target.value)}
//         />

//         {/* Vehicle */}
//         <Options
//           label="Vehicle"
//           optionMsg="Select Vehicle"
//           options={vehicleList}
//           valueKey="Id"
//           labelKey="VehicleNo"
//           value={selectedVehicleId}
//           onChange={handleVehicleChange}
//         />

//         <FormInput label="Sr. No." value={student?.OldSrno || ""} />
//         <FormInput label="Father Name" value={student?.FatherName || ""} />
//         <FormInput label="Mother Name" value={student?.MotherName || ""} />
//       </div>

//       <div className="flex justify-end">
//         <Buttons label="Search" click={handleSearch} />
//       </div>
//     </div>
//   );
// }

// export default Transport_Fee;




import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import {
  deleteTransportReceipt,
  getClassWiseStudents,
  getFeesDetails,
  getNewReceiptNumber,
  getStudentDetails,
  getTransportFeesDetails,
  getVehicleWiseStudent,
  transportFeesInsert,
} from "../../services/api";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Table from "../../Components/Page_Forms/Table";
import { IoIosAdd, IoMdRemove } from "react-icons/io";
import Loader from "../../Components/Page_Forms/Loader";

function Transport_Fee() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [student, setStudent] = useState(null);

  // ✅ Selected IDs
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [searched, setSearched] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


  /* ---------------- FETCH CLASS & VEHICLE LIST ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");
    if (!instId) return;

    async function fetchData() {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res.Table || []);
        setVehicleList(res.Table3 || []);
      } catch (error) {
        console.log("FeesDetails API Error:", error);
        setClassList([]);
        setVehicleList([]);
      }
    }

    fetchData();
  }, []);

  /* ---------------- FETCH STUDENT DETAILS ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    if (!instId || !selectedStudentId || !selectedClassId) {
      setStudent(null);
      return;
    }

    async function fetchStudent() {
      try {
        const res = await getStudentDetails(
          instId,
          selectedStudentId,
          sessionId,
          selectedClassId
        );
        setStudent(res?.Table?.[0] || null);
      } catch (error) {
        console.log("StudentDetails API Error:", error);
        setStudent(null);
      }
    }

    fetchStudent();
  }, [selectedClassId, selectedStudentId]);

  /* ---------------- CLASS CHANGE ---------------- */
  const handleClassChange = async (e) => {
    const classId = e.target.value;

    // 🔁 RESET VEHICLE & STUDENT
    setSelectedClassId(classId);
    setSelectedVehicleId("");
    setSelectedStudentId("");
    setStudentList([]);
    setStudent(null);

    if (!classId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getClassWiseStudents(instId, sessionId, classId);
      setStudentList(res.Table || []);
    } catch (error) {
      console.log("Student API Error:", error);
      setStudentList([]);
    }
  };

  /* ---------------- VEHICLE CHANGE ---------------- */
  const handleVehicleChange = async (e) => {
    const vehicleId = e.target.value;

    // 🔁 RESET CLASS & STUDENT
    setSelectedVehicleId(vehicleId);
    setSelectedClassId("");
    setSelectedStudentId("");
    setStudentList([]);
    setStudent(null);

    if (!vehicleId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getVehicleWiseStudent(instId, sessionId, vehicleId);
      setStudentList(res.Table || []);
    } catch (error) {
      console.log("Student API Error:", error);
      setStudentList([]);
    }
  };


  // /* ---------------- SEARCH ---------------- */
  // const handleSearch = () => {
  //   if (!selectedStudentId) {
  //     alert("Please select Student");
  //     return;
  //   }

  //   navigate("/Transport-Fee", {
  //     state: {
  //       classId: selectedClassId,
  //       studentId: selectedStudentId,
  //       vehicleId: selectedVehicleId,
  //     },
  //   });
  // };

  const handleSearch = async () => {
  if (!selectedStudentId) {
    alert("Please select Student");
    return;
  }

  if (!selectedClassId && !selectedVehicleId) {
    alert("Please select Class or Vehicle");
    return;
  }

  // 🔵 START loader
  setSearched(true);
  setShowDetails(false);

  try {
    // Small delay so loader is visible even if API is fast
    await new Promise((resolve) => setTimeout(resolve, 500));

    // ✅ Show details
    setShowDetails(true);
  } finally {
    // 🔴 STOP loader
    setSearched(false);
  }
};


const handleClear = () => {
  setSelectedClassId("");
  setSelectedVehicleId("");
  setSelectedStudentId("");

  setStudentList([]);
  setStudent(null);

  setFeePendingList([]);
  setFeePaidHistory([]);

  setTotalAmount(0);
  setDiscountAmount(0);
  setFineAmount(0);

  setPaymentMode("");
  setPaymentModeId(null);
  setBankId("");
  setChqNo("");
  setChqDate("");
  setChqBankId("");

  setShowDetails(false); // 🔴 HIDE DETAILS
  setSearched(false);    // 🔴 HIDE LOADER
};









  
     const instId = localStorage.getItem("InstituteID");
     const sessionId = localStorage.getItem("SessionID");
     const sessionName = localStorage.getItem("SessionName");
  
  
     const [agree, setAgree] = useState(false);
     const [paymentMode, setPaymentMode] = useState("");
     const [paymentModeId, setPaymentModeId] = useState(null);
  
  
  
     const [bankList, setBankList] = useState([]);
     const [receipt, setReceipt] = useState(null);
     const [paymentModes, setPaymentModes] = useState([]);
     const [bankId, setBankId] = useState("");
     const [chqNo, setChqNo] = useState("");
     const [chqDate, setChqDate] = useState("");
     const [chqBankId, setChqBankId] = useState("");
  
     const [feePendingList, setFeePendingList] = useState([]);
     const [feePaidHistory, setFeePaidHistory] = useState([]);
     const [discountAmount, setDiscountAmount] = useState(0);
     const [fineAmount, setFineAmount] = useState(0);
     const [loading, setLoading] = useState(false);
     const isRefreshingRef = React.useRef(false);
     const [totalAmount, setTotalAmount] = useState(0);
     const [autoAdjust, setAutoAdjust] = useState(true);
  
     const receiptCurrentDate = new Date()
        .toLocaleDateString("en-GB", { 
           day: "2-digit", month: "short", year: "numeric", 
        }).replace(/ /g, "/"); 
        
        /* ---------------- TABLE COLUMNS ---------------- */ 
        const columns = [
        { header: "Month", accessor: "month" },
        { header: "Category", accessor: "category" },
        { header: "Amount", accessor: "amount" },
        {
           header: "Paid Amount", accessor: "paidAmount",
           cell: (row) => (
              <input
                 type="number"
                 value={row.paidAmount}
                 // FIX: Disable row input if Auto Adjust is ON to prevent logic crash
                 disabled={autoAdjust}
                 onChange={(e) => {
                    handleManualAmountChange(row.uiId, e.target.value);
                 }}
                 className={`max-w-full border border-orange-200 rounded text-center ring-amber-700 text-black outline-orange-500 spinner ${
                    autoAdjust ? "" : ""
                 }`}
                 onClick={(e) => e.stopPropagation()}
              />
           ),
        },
     ];
  
     const columns2 = [
        { header: "Date", accessor: "date" },
        { header: "Category", accessor: "category" },
        { header: "Month", accessor: "month" },
        { header: "Receipt No.", accessor: "receipt" },
        { header: "Amount", accessor: "amount" },
     ];
     const feeActions = (row) => (
        <>
           <div className="cursor-default flex justify-center gap-1 w-full">
              <button
                 // FIX: Disable button if Auto Adjust is ON
                 disabled={autoAdjust}
                 onClick={(e) => {
                    e.stopPropagation();
                    handleAddFee(row);
                 }}
                 className={`rounded text-white w-6 flex justify-center text-xl cursor-pointer ${
                    autoAdjust ? "bg-gray-400" : "bg-green-500 hover:bg-green-700"
                 }`}
              >
                 <IoIosAdd />
              </button>
  
              <button
                 // FIX: Disable button if Auto Adjust is ON
                 disabled={autoAdjust}
                 onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFee(row);
                 }}
                 className={`rounded text-white w-6 flex justify-center text-xl cursor-pointer ${
                    autoAdjust ? "bg-gray-400" : "bg-[#e4321b] hover:bg-red-700"
                 }`}
              >
                 <IoMdRemove />
              </button>
           </div>
        </>
     );
     const PaidFeeActions = (row) => (
        <div className="flex justify-center">
           <button
              onClick={(e) => {
                 e.stopPropagation();
                 handleDeletePaidFee(row);
              }}
              className="rounded bg-red-600 hover:bg-red-700 text-white w-6 flex justify-center"
           >
              <IoMdRemove />
           </button>
        </div>
     );
     const handleDeletePaidFee = async (row) => {
        const rcID = Number(row.backendId);
        if (!rcID) return;
  
        const confirmDelete = window.confirm(
           `Are you sure you want to delete receipt no. ${rcID}? This action cannot be undone.`
        );
        if (!confirmDelete) return;
  
        // 1. Keep a backup of the current state in case we need to roll back
        const previousHistory = [...feePaidHistory];
  
        try {
           setLoading(true);
  
           // 2. Optimistic UI update: Remove all rows with this receipt number immediately
           setFeePaidHistory((prev) =>
              prev.filter((r) => Number(r.backendId) !== rcID)
           );
  
           // 3. Call the API
           const res = await deleteTransportReceipt(rcID);
  
           // The API returns a string like "M101|Record Deleted Successfully"
           const raw = res?.Table?.[0]?.Column1 || "";
           const [code, message] = raw.split("|");
  
           if (code === "M101" || code === "M103") {
              alert(message || "Receipt deleted successfully.");
  
              // 4. Crucial: Refresh the pending list since deleting a receipt
              // makes those fees "pending" again in the other table.
              await refreshStudentFees();
           } else {
              // 5. Rollback on application-level error
              setFeePaidHistory(previousHistory);
              alert(message || "Delete failed: Server returned an error.");
           }
        } catch (err) {
           // 6. Rollback on network/server-level error
           setFeePaidHistory(previousHistory);
           console.error("Delete Error:", err);
           alert(
              "Server error while deleting receipt. Please check your connection."
           );
        } finally {
           setLoading(false);
        }
     };
  
     const refreshStudentFees = async () => {
        try {
           isRefreshingRef.current = true;
           setLoading(true); // Show spinner during refresh
  
           const res = await getTransportFeesDetails(
              instId,
              sessionId,
              selectedClassId,
              selectedStudentId
           );
  
           setFeePendingList(
              res.Table?.map((i, index) => ({
                 uiId: `row-${index}`,
                 backendId: i.ID,
                 feeTypeId: i.FeeTypeID,
                 month: i.MonthName,
                 category: i.categoryName,
                 amount: Number(i.Amount),
                 paidAmount: 0,
                 isAdded: false,
              })) || []
           );
  
           setFeePaidHistory(
              res.Table1?.map((i) => ({
                 date: i.ReceiptDate,
                 backendId: i.ID,
                 category: i.CategoryName,
                 month: i.MonthName,
                 receipt: Number(i.RecipetNo),
                 amount: Number(i.Amount),
              })) || []
           );
           setTotalAmount(0); // Reset the input fields
           setDiscountAmount(0);
           setFineAmount(0);
        } finally {
           isRefreshingRef.current = false;
           setLoading(false);
        }
     };
  
     /* ---------------- FETCH DROPDOWNS ---------------- */
     useEffect(() => {
        if (!instId || !sessionId) return;
  
        async function fetchFeesData() {
           try {
              const res2 = await getNewReceiptNumber();
              const res = await getFeesDetails(instId, sessionId);
              setBankList(res.Table1 || []);
              setPaymentModes(res.Table2 || []);
              //    setFeeTypes(res.Table4 || []);
              setReceipt(res2?.Table1?.[0] || null);
           } catch (err) {
              console.log("FeesDetails API Error:", err);
           }
        }
  
        fetchFeesData();
     }, [instId, sessionId]);
  
     /* ---------------- FETCH STUDENT DETAILS ---------------- */
     useEffect(() => {
        if (!instId || !sessionId || !selectedClassId || !selectedStudentId) return;
  
        async function fetchStudent() {
           try {
              const res = await getStudentDetails(
                 instId,
                 selectedStudentId,
                 sessionId,
                 selectedClassId
              );
              setStudent(res?.Table?.[0] || null);
           } catch (err) {
              console.log("StudentDetails API Error:", err);
              setStudent(null);
           }
        }
  
        fetchStudent();
     }, [instId, sessionId, selectedClassId, selectedStudentId]);
  
     /* ---------------- FETCH STUDENT FEES ---------------- */
     useEffect(() => {
        if (!instId || !sessionId || !selectedClassId || !selectedStudentId) return;
  
        async function fetchStudentFees() {
           try {
              setLoading(true);
              const res = await getTransportFeesDetails(
                 instId,
                 sessionId,
                 selectedClassId,
                 selectedStudentId
              );
  
              // Inside fetchStudentFees useEffect
              const pending = res.Table?.map((i, index) => ({
                 uiId: `row-${index}`, // only for React rendering
                 backendId: i.ID, // REAL ID from API
                 feeTypeId: i.FeeTypeID,
                 month: i.MonthName,
                 category: i.categoryName,
                 amount: Number(i.Amount),
                 paidAmount: 0,
                 isAdded: false,
              }));
  
              const paid =
                 res.Table1?.map((i) => ({
                    backendId: i.ID,
                    date: i.ReceiptDate,
                    category: i.CategoryName,
                    month: i.MonthName,
                    receipt: i.RecipetNo,
                    amount: i.Amount,
                 })) || [];
  
              setFeePendingList(pending);
              setFeePaidHistory(paid);
           } catch (err) {
              console.log("StudentFeesDetails API Error:", err);
           } finally {
              setLoading(false);
           }
        }
  
        fetchStudentFees();
     }, [instId, sessionId, selectedClassId, selectedStudentId]);
  
     const handleManualAmountChange = (uiId, value) => {
        const numValue = Number(value) || 0;
  
        setFeePendingList((prev) =>
           prev.map((r) =>
              r.uiId === uiId
                 ? {
                      ...r,
                      paidAmount: Math.min(numValue, r.amount),
                      isAdded: numValue > 0,
                   }
                 : r
           )
        );
     };
  
     const handleAddFee = (row) => {
        setFeePendingList((prev) =>
           prev.map((r) =>
              r.uiId === row.uiId
                 ? { ...r, isAdded: true, paidAmount: r.amount }
                 : r
           )
        );
     };
  
     const handleRemoveFee = (row) => {
        setFeePendingList((prev) =>
           prev.map((r) =>
              r.uiId === row.uiId ? { ...r, isAdded: false, paidAmount: 0 } : r
           )
        );
     };
  
     // 4. Simplify distributedFees (it's no longer distributing, just providing data)
    const feeJson = React.useMemo(() => {
        const details = feePendingList
           .filter((r) => Number(r.paidAmount) > 0)
           .map((r) => ({
              Id: String(r.backendId), // ✅ REAL ID
              FeeTypeID: String(r.feeTypeId),
              categoryName: r.category,
              Amount: String(r.amount),
              PaidAmount: String(r.paidAmount),
              Session: String(sessionId),
           }));
  
        return JSON.stringify({ FeesDetails: details });
     }, [feePendingList, sessionId]);
  
     const netAmount = React.useMemo(() => {
        return Math.max(0, totalAmount - discountAmount + fineAmount);
     }, [totalAmount, discountAmount, fineAmount]);
  
     const maxDueAmount = React.useMemo(() => {
        return feePendingList.reduce((sum, r) => sum + r.amount, 0);
     }, [feePendingList]);
  
     /* ---------------- 1. AUTO ADJUST DISTRIBUTION (Total -> Rows) ---------------- */
     useEffect(() => {
        if (!autoAdjust) return;
        if (feePendingList.length === 0) return;
  
        let remaining = totalAmount;
  
        const updatedList = feePendingList.map((row) => {
           if (remaining <= 0) {
              return { ...row, paidAmount: 0, isAdded: false };
           }
  
           const take = Math.min(row.amount, remaining);
           remaining -= take;
  
           return {
              ...row,
              paidAmount: take,
              isAdded: take > 0,
           };
        });
  
        setFeePendingList(updatedList);
     }, [totalAmount, autoAdjust]);
  
     /* ---------------- 2. SUMMATION LOGIC (Rows -> Total) ---------------- */
     useEffect(() => {
        if (autoAdjust) return;
  
        const sum = feePendingList.reduce(
           (acc, r) => acc + (Number(r.paidAmount) || 0),
           0
        );
  
        setTotalAmount(sum);
     }, [feePendingList, autoAdjust]);
  
     const handleSave = async () => {
        if (!paymentMode) {
           alert("Please select payment mode");
           return;
        }
  
        if (
           paymentMode === "Cheque" ||
           paymentMode === "Online Payment" ||
           paymentMode === "Paytm"
        ) {
           if (!bankId) {
              alert("Please select bank");
              return;
           }
  
           if (!chqNo || !chqDate || !chqBankId) {
              alert("Cheque / Transaction details are required");
              return;
           }
        }
  
        if (feeJson === '{"FeesDetails":[]}') {
           alert("Please add at least one fee");
           return;
        }
  
        const payload = {
           instId: Number(instId),
           sessionId: String(sessionId),
           classId: String(selectedClassId),
           studentId: Number(selectedStudentId),
  
           receiptNo: String(receipt?.MaxRcptno),
           receiptDate: new Date()
              .toLocaleDateString("en-GB", {
                 day: "2-digit",
                 month: "short",
                 year: "numeric",
              })
              .replace(/ /g, "/"),
  
           netAmount: String(netAmount),
           totalAmount: String(totalAmount),
           discountAmount: String(discountAmount || 0),
           fineAmount: String(fineAmount || 0),
  
         paymentMode: Number(paymentModeId),
           bankId: String(bankId),
  
           ChqNo: chqNo,
          ChqDate: chqDate
           ? new Date(chqDate)
               .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
         .replace(/ /g, "/")  : "",
  
           ChqBankId: chqBankId,
  
           feeJson, // ✅ already stringified
        };
  
        try {
           let res = await transportFeesInsert(payload);
  
           const raw = res?.Table?.[0]?.Column1 || "";
           const [code, message] = raw.split("|");
  
           if (code === "M101") {
              alert("Fees saved successfully");
              return;
           }
  
           if (code === "M200") {
              const rcRes = await getNewReceiptNumber();
              const newrcID = rcRes?.Table1?.[0]?.MaxRcptno;
  
              if (!newrcID) {
                 alert("Failed to generate receipt number");
                 return;
              }
  
              payload.receiptNo = newrcID;
  
              const retryRes = await transportFeesInsert(payload);
              const retryRaw = retryRes?.Table?.[0]?.Column1 || "";
              const [retryCode, retryMsg] = retryRaw.split("|");
  
              if (retryCode === "M101") {
                 alert("Fees saved successfully (new receipt)");
              } else {
                 alert(retryMsg || "Retry failed");
              }
              return;
           }
  
           alert(message || "Save failed");
        } catch (err) {
           console.error(err);
           alert("Server error while saving fees");
        }
     };
  



  
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />
      <div className="flex justify-between mb-5">
        <Heading label="Pay Transport Fees" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
        {/* Class */}
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          value={selectedClassId}
          onChange={handleClassChange}
        />

        {/* Student */}
        <Options
          label="Student Name"
          optionMsg="Select Student"
          options={studentList}
          valueKey="Id"
          labelKey="Name"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />

        {/* Vehicle */}
        <Options
          label="Vehicle"
          optionMsg="Select Vehicle"
          options={vehicleList}
          valueKey="Id"
          labelKey="VehicleNo"
          value={selectedVehicleId}
          onChange={handleVehicleChange}
        />

        <FormInput label="Sr. No." value={student?.OldSrno || ""} />
        <FormInput label="Father Name" value={student?.FatherName || ""} />
        <FormInput label="Mother Name" value={student?.MotherName || ""} />
      </div>

      <div className="flex justify-end gap-5">
        <Buttons label="Clear" click={handleClear} />
        <Buttons label="Search" click={handleSearch} />
      </div>

{showDetails && (
  <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
            {/* <FormInput label="Name" value={student?.Name || ""} />
            <FormInput label="Sr. No." value={student?.OldSrno || ""} />
            <FormInput label="Father Name" value={student?.FatherName || ""} />
            <FormInput label="Mother Name" value={student?.MotherName || ""} /> */}
            <FormInput label="Session" value={sessionName || ""} />
            <FormInput label={"Route Name"} placeholder={" Enter Route Name"} />
            <FormInput
               label={"Vehicle Stop"}
               placeholder={" Enter Vehicle Stop"}
            />
            <FormInput
               label={"Vehicle Number"}
               placeholder={" Enter Vehicle Number"}
            />
            <FormInput
               label="Receipt Number"
               value={receipt?.MaxRcptno || ""}
            />
            <FormInput
               label="Receipt Date"
               value={receiptCurrentDate}
               disabled
            />
         </div>
         <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
            <FormInput label={"Remarks"} placeholder={" Enter Remarks"} />
            <CheckBox
               label={"Receipt Print"}
               name={""}
               checked={agree}
               onChange={(e) => setAgree(e.target.checked)}
            />
         </div>
         <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 ">
            <div className="flex flex-col items-center">
               <h2 className="cursor-default text-md font-semibold mb-2 text-gray-700">
                  Pending Fees
               </h2>
               <Table
                  columns={columns}
                  data={feePendingList} // Use the direct list, not the distribution logic
                  actions={feeActions}
                  loading={loading}
               />
            </div>
            <div className="flex flex-col items-center">
               <h2 className="cursor-default text-md font-semibold mb-2 text-gray-700">
                  Paid Fees
               </h2>
               <Table
                  columns={columns2}
                  data={feePaidHistory}
                  actions={PaidFeeActions}
                  loading={loading}
               />
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
              <FormInput
               label="Pending Amount"
               value={maxDueAmount}
               disabled={true}
               readOnly
            />
            <FormInput label="Deposit Amount" value={0} disabled={true}  readOnly/>

      
            <Options
               label="Payment Mode"
               optionMsg="Select Payment Mode"
               options={paymentModes}
               valueKey="Id"
               labelKey="Name"
               onChange={(e) => {
                  const selectedId = Number(e.target.value);
                  const selectedObj = paymentModes.find(
                     (i) => i.Id === selectedId
                  );

                  setPaymentMode(selectedObj?.Name || "");
                  setPaymentModeId(selectedId);
               }}
               required
            />


            {(paymentMode === "Cheque" ||
               paymentMode === "Online Payment" ||
               paymentMode === "Paytm") && (
             <Options
                  label="Deposit In Bank"
                  optionMsg="Select Bank"
                  options={bankList}
                  valueKey="Id"
                  labelKey="Name"
                  onChange={(e) => setBankId(Number(e.target.value))}
                  required
               />
            )}

            {paymentMode === "Cheque" && (
               <>
                  <FormInput
                     label="Cheque Number"
                     value={chqNo}
                     onChange={(e) => setChqNo(e.target.value)}
                  />

                  <FormInput
                     label="Cheque Date"
                     type="date"
                     value={chqDate}
                     onChange={(e) => setChqDate(e.target.value)}
                  />
               </>
            )}

          

            {(paymentMode === "Cheque" ||
               paymentMode === "Online Payment" ||
               paymentMode === "Paytm") && (
               <Options
                  label="Cheque Bank"
                  optionMsg="Select Bank"
                  options={bankList}
                  valueKey="Id"
                  labelKey="Name"
                  onChange={(e) => setChqBankId(Number(e.target.value))}
                  required
               />
            )}

            <div className="flex flex-col space-y-2">
               <FormInput
                  label="Total Amount"
                  value={totalAmount || ""}
                  disabled={!autoAdjust}
                  onChange={(e) => {
                     const value = Number(e.target.value) || 0;

                     if (value > maxDueAmount) {
                        alert("Cannot exceed pending balance!");
                        setTotalAmount(0);
                     } else {
                        setTotalAmount(value);
                     }
                  }}
               />
               <CheckBox
                  label="Auto Adjust (Waterfall Mode)"
                  checked={autoAdjust}
                  onChange={(e) => {
                     const isChecked = e.target.checked;
                     setAutoAdjust(isChecked);

                

                     if (isChecked) {
                        // Optional: Clear rows when switching to Auto mode so user starts fresh
                        setTotalAmount(0);
                     }
                  }}
               />
            </div>
            <FormInput
               label="Fine"
               value={fineAmount}
               onChange={(e) => setFineAmount(Number(e.target.value) || 0)}
            />

            <FormInput
               label="Discount Amount"
               value={discountAmount}
               onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
            />
            <FormInput label="Net Amount" value={netAmount} readOnly />
         </div>
         <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
            <CheckBox
               label={"Is SMS Send"}
               name={""}
               checked={agree}
               onChange={(e) => setAgree(e.target.checked)}
            />
         </div>

         <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
            <Buttons label={"Cancel"} />
            <Buttons label={"Save"} click={handleSave} />
         </div>
         </>
)}
    </div>
  );
}

export default Transport_Fee;

