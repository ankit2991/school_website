// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import Options from "../../Components/Page_Forms/Options";
// import CheckBox from "../../Components/Page_Forms/CheckBox";
// import Table from "../../Components/Page_Forms/Table";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import { getbank } from "../../services/api";

// function Fee_Receipt2() {
//   const [agree, setAgree] = useState(false);
//   const [paymentMode, setPaymentMode] = useState("");

//   const columns = [
//     { header: "Month Name", shortHeader: "Month", accessor: "month" },
//     { header: "Category Name", shortHeader: "Category", accessor: "category" },
//     { header: "Amount", accessor: "amount" },
//     { header: "Paid Amount", accessor: "paid" },
//   ];
//   const data = [
//     {
//       id: 1,
//       month: "January",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//     {
//       id: 2,
//       month: "Febraruy",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//     {
//       id: 3,
//       month: "March",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//     {
//       id: 4,
//       month: "April",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//     {
//       id: 5,
//       month: "May",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//     {
//       id: 6,
//       month: "June",
//       category: "Addmission Fee",
//       amount: "1000",
//       paid: "500",
//     },
//   ];
//   const columns2 = [
//     { header: "Date", shortHeader: "Date", accessor: "date" },
//     { header: "Category Name", shortHeader: "Category", accessor: "category" },
//     { header: "Month Name", shortHeader: "Month", accessor: "month" },
//     { header: "Receipt No.", shortHeader: "Receipt", accessor: "receipt" },
//     { header: "Amount", accessor: "amount" },
//   ];
//   const data2 = [
//     {
//       id: 1,
//       date: "11/03/2025",
//       category: "Addmission Fee",
//       month: "January",
//       receipt: "001",
//       amount: "1000",
//     },
//     {
//       id: 2,
//       date: "13/04/2025",
//       category: "Addmission Fee",
//       month: "Febraruy",
//       receipt: "002",
//       amount: "1000",
//     },
//     {
//       id: 3,
//       date: "20/04/2025",
//       category: "Addmission Fee",
//       month: "March",
//       receipt: "003",
//       amount: "1000",
//     },
//     {
//       id: 4,
//       date: "25/05/2025",
//       category: "Addmission Fee",
//       month: "April",
//       receipt: "004",
//       amount: "1000",
//     },
//     {
//       id: 5,
//       date: "29/05/2025",
//       category: "Addmission Fee",
//       month: "May",
//       receipt: "005",
//       amount: "1000",
//     },
//     {
//       id: 6,
//       date: "04/07/2025",
//       category: "Addmission Fee",
//       month: "June",
//       receipt: "006",
//       amount: "1000",
//     },
//   ];

//   const [banklist, setBanklist] = useState([]);
//   useEffect(() => {
//     const instId = localStorage.getItem("InstituteID");
//     if (!instId) return;

//     async function fetchBank() {
//       try {
//         const res = await getbank(instId);
//         if (res?.Table?.[0]?.ResultCode === "R100") {
//           setBanklist(res.Table1 || []);
//         } else {
//           setBanklist([]);
//         }
//       } catch (error) {
//         console.log("Bank API Error:", error);
//         setBanklist([]);
//       }
//     }

//     fetchBank();
//   }, []);

//   return (
//     <div className="w-full h-full bg-white  px-4 py-2 flex flex-col">
//       <Heading style={"mb-5"} label={"Pay School Fees"} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//         <FormInput label={"Name"} placeholder={"Enter Name"} />
//         <FormInput label={"Sr. No."} placeholder={" Enter Serial No."} />
//         <Options
//           label={"Class"}
//           name={""}
//           optionMsg="Select Class"
//           options={["Nur", "K.G.", "Prep"]}
//         />
//         <FormInput label={"Father Name"} placeholder={"Enter Father Name"} />
//         <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"} />
//         <FormInput label={"Session"} placeholder={" Enter Session"} />
//         <FormInput label={"Receipt Number"} placeholder={" Enter Session"} />
//         <FormInput label={"Receipt Date"} type="date" />
//         <Options
//           label={"Fee Selection"}
//           name={""}
//           optionMsg="Select Fee Selection"
//           options={["Tution Fee", "Other Fee"]}
//         />
//       </div>
//       <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
//         <FormInput label={"Remarks"} placeholder={" Enter Remarks"} />
//         <CheckBox
//           label={"Receipt Print"}
//           name={""}
//           checked={agree}
//           onChange={(e) => setAgree(e.target.checked)}
//         />
//       </div>
//       <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 ">
//         <div className="flex flex-col items-center">
//           <h2 className="cursor-default text-md font-semibold mb-2 text-gray-700">
//             Pending Fees
//           </h2>
//           <Table columns={columns} data={data} />
//         </div>
//         <div className="flex flex-col items-center">
//           <h2 className="cursor-default text-md font-semibold mb-2 text-gray-700">
//             Paid Fees
//           </h2>
//           <Table columns={columns2} data={data2} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//         <FormInput
//           label={"Pending Amount"}
//           placeholder={"Enter Pending Amount"}
//         />
//         <FormInput
//           label={"Deposit Amount"}
//           placeholder={" Enter Deposit Amount"}
//         />
//         <Options
//           label="Payment Mode"
//           name="paymentMode"
//           optionMsg="Select Payment Mode"
//           options={["Cash", "Cheque", "Online Payment", "Paytm"]}
//           onChange={(e) => setPaymentMode(e.target.value)}
//         />
//         {(paymentMode === "Cheque" ||
//           paymentMode === "Online Payment" ||
//           paymentMode === "Paytm") && (
//           <Options
//             label="Deposit In Bank"
//             name="depositBank"
//             optionMsg="Select Deposit In Bank"
//             options={banklist.map((item) => item.Name)}
//           />
//         )}

//         {/* If Cheque → show Cheque fields */}
//         {paymentMode === "Cheque" && (
//           <>
//             <FormInput
//               label="Cheque Number"
//               placeholder="Enter Cheque Number"
//             />
//             <FormInput label="Cheque Date" type="date" />
//             <Options
//               label={"Cheque Bank"}
//               name={""}
//               optionMsg="Select Cheque Bank"
//               options={[
//                 "Punjab National Bank",
//                 "Bank Of Baroda",
//                 "State Bank Of India",
//               ]}
//             />
//           </>
//         )}

//         {/* If Online/Paytm → show Transaction fields */}
//         {(paymentMode === "Online Payment" || paymentMode === "Paytm") && (
//           <>
//             <FormInput
//               label="Transaction Number"
//               placeholder="Enter Transaction Number"
//             />
//             <FormInput label="Transaction Date" type="date" />
//           </>
//         )}

//         <div className="flex flex-col space-y-2">
//           <FormInput
//             label={"Total Amount"}
//             placeholder={" Enter Total Amount"}
//           />
//           <CheckBox
//             label={"Auto Adjust"}
//             name={""}
//             checked={agree}
//             onChange={(e) => setAgree(e.target.checked)}
//           />
//         </div>
//         <FormInput label={"Net Amount"} placeholder={" Enter Net Amount"} />
//         <FormInput
//           label={"Discount Amount"}
//           placeholder={" Enter Discount Amount"}
//         />
//         <FormInput label={"Fine"} placeholder={" Enter Fine"} />
//       </div>
//       <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
//         <CheckBox
//           label={"Is SMS Send"}
//           name={""}
//           checked={agree}
//           onChange={(e) => setAgree(e.target.checked)}
//         />
//       </div>

//       <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
//         <Buttons label={"Cancel"} />
//         <Buttons label={"Save"} />
//       </div>
//     </div>
//   );
// }

// export default Fee_Receipt2;



import {
   IoIosAdd,
   IoIosAddCircle,
   IoMdRemove,
   IoMdRemoveCircle,
} from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Options from "../../Components/Page_Forms/Options";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Table from "../../Components/Page_Forms/Table";
import Buttons from "../../Components/Page_Forms/Buttons";
import {
   getFeesDetails,
   getNewReceiptNumber,
   getStudentDetails,
   getStudentFeesDetails,
   studentFeesInsert,
} from "../../services/api";

function Fee_Receipt2() {
   const { state } = useLocation();

   const instId = localStorage.getItem("InstituteID");
   const sessionId = localStorage.getItem("SessionID");
   const sessionName = localStorage.getItem("SessionName");

   const classId = state?.classId;
   const studentId = state?.studentId;

   const [agree, setAgree] = useState(false);
   const [paymentMode, setPaymentMode] = useState("");

   const [student, setStudent] = useState(null);

   const [bankList, setBankList] = useState([]);
   const [receipt, setReceipt] = useState(null);
   const [paymentModes, setPaymentModes] = useState([]);
   const [feeTypes, setFeeTypes] = useState([]);

   const [feePendingList, setFeePendingList] = useState([]);
   const [feePaidHistory, setFeePaidHistory] = useState([]);
   const [discountAmount, setDiscountAmount] = useState(0);
   const [fineAmount, setFineAmount] = useState(0);
   const [loading, setLoading] = useState(false);

   const [paymentSource, setPaymentSource] = useState("button");
   // "button" | "manual"
   const [totalAmount, setTotalAmount] = useState(0);
   const [autoAdjust, setAutoAdjust] = useState(true);

   /* ---------------- TABLE COLUMNS ---------------- */
   const columns = [
      { header: "Month", accessor: "month" },
      { header: "Category", accessor: "category" },
      { header: "Amount", accessor: "amount" },
      {
         header: "Paid Amount",
         accessor: "paidAmount",
         cell: (row) => (
            <input
               type="number"
               value={row.paidAmount}
               // FIX: Disable row input if Auto Adjust is ON to prevent logic crash
               disabled={autoAdjust}
               onChange={(e) => {
                  setPaymentSource("button");
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

   /* ---------------- FETCH DROPDOWNS ---------------- */
   useEffect(() => {
      if (!instId || !sessionId) return;

      async function fetchFeesData() {
         try {
            const res2 = await getNewReceiptNumber();
            const res = await getFeesDetails(instId, sessionId);
            setBankList(res.Table1 || []);
            setPaymentModes(res.Table2 || []);
            setFeeTypes(res.Table4 || []);
            setReceipt(res2?.Table1?.[0] || null);
         } catch (err) {
            console.log("FeesDetails API Error:", err);
         }
      }

      fetchFeesData();
   }, [instId, sessionId]);

   /* ---------------- FETCH STUDENT DETAILS ---------------- */
   useEffect(() => {
      if (!instId || !sessionId || !classId || !studentId) return;

      async function fetchStudent() {
         try {
            const res = await getStudentDetails(
               instId,
               studentId,
               sessionId,
               classId
            );
            setStudent(res?.Table?.[0] || null);
         } catch (err) {
            console.log("StudentDetails API Error:", err);
            setStudent(null);
         }
      }

      fetchStudent();
   }, [instId, sessionId, classId, studentId]);

   /* ---------------- FETCH STUDENT FEES ---------------- */
   useEffect(() => {
      if (!instId || !sessionId || !classId || !studentId) return;

      async function fetchStudentFees() {
         try {
            setLoading(true);
            const res = await getStudentFeesDetails(
               instId,
               sessionId,
               classId,
               studentId
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
   }, [instId, sessionId, classId, studentId]);

   const handleManualAmountChange = (uiId, value) => {
      const numValue = Number(value) || 0;
      setPaymentSource("button"); // Row-level changes treat the Row as the source

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
      setPaymentSource("button");
      setFeePendingList((prev) =>
         prev.map((r) =>
            r.uiId === row.uiId
               ? { ...r, isAdded: true, paidAmount: r.amount }
               : r
         )
      );
   };

   const handleRemoveFee = (row) => {
      setPaymentSource("button"); // Reset source
      setFeePendingList((prev) =>
         prev.map((r) =>
            r.uiId === row.uiId ? { ...r, isAdded: false, paidAmount: 0 } : r
         )
      );
   };

   // 4. Simplify distributedFees (it's no longer distributing, just providing data)
   const tableData = React.useMemo(() => {
      return feePendingList;
   }, [feePendingList]);

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
  //  useEffect(() => {
  //     if (!autoAdjust) return;
  //     if (feePendingList.length === 0) return; // 🔒 guard

  //     let remaining = totalAmount;
  //     console.log("tot", totalAmount);

  //     setFeePendingList((prev) =>
  //        prev.map((row, index) => {
              
  //           if (remaining <= 0) {
  //              console.log("_________________________", index);

  //              return { ...row, paidAmount: 0, isAdded: false };
  //           }

  //           const canTake = Math.min(row.amount, remaining);
  //           remaining -= canTake;
  //           console.log(`Row ${index}`, {
  //              taken: canTake,
  //              remainingAfter: remaining,
  //              rowData: row,
  //           });
  //           return {
  //              ...row,
  //               paidAmount: canTake,
  //              isAdded: canTake > 0,
  //           };
  //        })
  //     );
  //  }, [totalAmount, autoAdjust, feePendingList.length]);

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
      if (feeJson === '{"FeesDetails":[]}') {
         alert("Please add at least one fee");
         return;
      }

      const payload = {
         instId: Number(instId),
         sessionId: String(sessionId),
         classId: String(classId),
         studentId: Number(studentId),

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

         paymentMode: "1",
         bankId: "0",

         feeJson, // ✅ already stringified
      };

      try {
         let res = await studentFeesInsert(payload);

         const raw = res?.Table?.[0]?.Column1 || "";
         const [code, message] = raw.split("|");

         if (code === "M101") {
            alert("Fees saved successfully");
            return;
         }

         if (code === "M200") {
            const rcRes = await getNewReceiptNumber();
            const newRcNo = rcRes?.Table1?.[0]?.MaxRcptno;

            if (!newRcNo) {
               alert("Failed to generate receipt number");
               return;
            }

            payload.receiptNo = newRcNo;

            const retryRes = await studentFeesInsert(payload);
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
      <div className="w-full h-full bg-white px-5 py-2 flex flex-col">
         <Heading style="mb-5" label="Pay School Fees" />

         {/* ---------------- BASIC INFO ---------------- */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-4  mb-4">
            <FormInput label="Name" value={student?.Name || ""} />
            <FormInput label="Sr. No." value={student?.OldSrno || ""} />
            <FormInput label="Father Name" value={student?.FatherName || ""} />
            <FormInput label="Mother Name" value={student?.MotherName || ""} />
            <FormInput label="Session" value={sessionName || ""} />
            <FormInput
               label="Receipt Number"
               value={receipt?.MaxRcptno || ""}
            />
            <FormInput label="Receipt Date" type="date" />

            <Options
               label="Fee Selection"
               optionMsg="Select Fee Type"
               options={feeTypes.map((i) => i.Name)}
            />
         </div>

         {/* ---------------- REMARKS ---------------- */}
         <div className="mb-5 space-y-2">
            <FormInput label="Remarks" />
            <CheckBox
               label="Receipt Print"
               checked={agree}
               onChange={(e) => setAgree(e.target.checked)}
            />
         </div>

         {/* ---------------- FEES TABLE ---------------- */}
         <div className="grid sm:grid-cols-1 gap-4 bg-[#fcf8e5] p-3 rounded-md mb-5 ">
            <Table
               columns={columns}
               data={feePendingList} // Use the direct list, not the distribution logic
               actions={feeActions}
               loading={loading}
            />

            <Table columns={columns2} data={feePaidHistory} loading={loading} />
         </div>

         {/* ---------------- PAYMENT SECTION ---------------- */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-4 mb-5">
            <FormInput
               label="Pending Amount"
               value={maxDueAmount}
               disabled={true}
            />
            <FormInput label="Deposit Amount" value={0} disabled={true} />

            <Options
               label="Payment Mode"
               optionMsg="Select Payment Mode"
               options={paymentModes.map((item) => item.Name)}
               onChange={(e) => setPaymentMode(e.target.value)}
            />

            {(paymentMode === "Cheque" ||
               paymentMode === "Online Payment" ||
               paymentMode === "Paytm") && (
               <Options
                  label="Deposit In Bank"
                  optionMsg="Select Bank"
                  options={bankList.map((item) => item.Name)}
               />
            )}

            {paymentMode === "Cheque" && (
               <>
                  <FormInput label="Cheque Number" />
                  <FormInput label="Cheque Date" type="date" />
               </>
            )}

            {(paymentMode === "Online Payment" || paymentMode === "Paytm") && (
               <>
                  <FormInput label="Transaction Number" />
                  <FormInput label="Transaction Date" type="date" />
               </>
            )}

            {(paymentMode === "Cheque" ||
               paymentMode === "Online Payment" ||
               paymentMode === "Paytm") && (
               <Options
                  label="Cheque Bank"
                  optionMsg="Select Bank"
                  options={bankList.map((item) => item.Name)}
               />
            )}

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

                  // FIX: When switching modes, reset source to prevent loop
                  setPaymentSource("button");

                  if (isChecked) {
                     // Optional: Clear rows when switching to Auto mode so user starts fresh
                     setTotalAmount(0);
                  }
               }}
            />

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

         <CheckBox
            label="Is SMS Send"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
         />

         <div className="flex justify-end space-x-6 mt-4 mb-10">
            <Buttons label="Cancel" />
            <Buttons label="Save" click={handleSave} />
         </div>
      </div>
   );
}

export default Fee_Receipt2;

