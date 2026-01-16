// import React from 'react'
// import { FaUser, FaUserTie, FaUsers, FaUserGraduate } from "react-icons/fa";
// import { MdSms, MdAccountBalance } from "react-icons/md";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// function Home() {
//     const data = [
//     { value: 53, label: "Total Students" },
//     { value: 37, label: "No. of Boys" },
//     { value: 16, label: "No. of Girls" },
//     { value: 0.0, label: "Today Collection" },
//     { value: 0.0, label: "SMS Balance" },
//     { value: 7, label: "Total Teacher" },
//     { value: 0.0, label: "Aadhaar Balance" },
//     { value: 0, label: "Student Present (Today)" },
//   ];
//   return (
//     <div className='w-full h-screen bg-amber-50 flex justify-center items-start'>
     
//           <div className="grid p-4 gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {data.map((item, i) => {
//           const isEven = i % 2 === 0; // even → red outer, yellow inner; odd → yellow outer, red inner
//           return (
//             <div key={i} className="relative  max-[22rem]:w-36 w-40 min-[33rem]:w-60 sm:w-75 md:w-70 h-30">
//               {/* Outer Box */}
//               <div
//                 className={`relative w-full h-full rounded-2xl shadow-2xl p-4 flex flex-col 
//                 ${isEven ? "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white" : "bg-amber-100 text-[#CC3015]"}`}
//               >
//                 {/* Inner Box */}
//                 <div
//                   className={`absolute bottom-0 left-0 w-full h-20 rounded-2xl p-4 flex flex-col
//                   ${isEven ? "bg-amber-100 text-[#CC3015]" : "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"}`}
//                 >
//                   <span className="text-2xl font-bold">{item.value}</span>
//                   <span className="text-sm">{item.label}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   ) 
// }
// 
// export default Home

import React, { useEffect, useState } from "react";
import { getDashboard } from "../../services/api";
import Chart_Card from "../../Components/Page_Forms/Chart_Card";
import Loader from "../../Components/Page_Forms/Loader";

function Home() {
  const [data, setData] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [searched, setSearched] = useState(false);

  const getValidSmsBalance = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.startsWith("http"))
  ) {
    return 0;
  }
  return value;
};


  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sesId = localStorage.getItem("SessionID");
    try {
      setSearched(true);
      const res = await getDashboard(instId, sesId); // InstId, SessionId

      setData([
        {
          value: res?.Table?.[0]?.NoOfStudent ?? 0,
          label: "Total Students",
        },
        {
          value: res?.Table1?.[0]?.NoOfBoys ?? 0,
          label: "No. of Boys",
        },
        {
          value: res?.Table2?.[0]?.NoOfGirls ?? 0,
          label: "No. of Girls",
        },
        {
          value: res?.Table3?.[0]?.TodayCollection ?? 0,
          label: "Today Collection",
        },
        { 
          value: getValidSmsBalance(res?.Table9?.[0]?.SMSBalanceApi), 
          label: "SMS Balance", 
        },
        {
          value: res?.Table5?.[0]?.NoOfTeacher ?? 0,
          label: "Total Teacher",
        },
        {
          value: res?.Table10?.[0]?.AadharBalance ?? 0,
          label: "Aadhaar Balance",
        },
        {
          value: res?.Table7?.[0]?.StudentPresent ?? 0,
          label: "Student Present (Today)",
        },
      ]);

      setFeeData(
        res?.Table4?.map((item) => ({
          month: item.FEEMONTH,
          amount: item.Amt,
        })) || []
      );
    } catch (error) {
      console.error("Dashboard API Error", error);
    } finally { 
      setSearched(false); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start">
      <Loader show={searched} />
      {/* ==== Top Boxes Section ==== */}
      <div className="grid p-4 gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className="relative max-[22rem]:w-36 w-40 min-[33rem]:w-60 sm:w-75 md:w-70 h-30"
            >
              <div
                className={`relative w-full h-full rounded-2xl shadow-2xl p-4 flex flex-col 
                ${
                  isEven
                    ? "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"
                    : "bg-amber-100 text-[#CC3015]"
                }`}
              >
                <div
                  className={`absolute bottom-0 left-0 w-full h-22 md:h-20 rounded-2xl p-2 sm:p-4 flex flex-col
                  ${
                    isEven
                      ? "bg-amber-100 text-[#CC3015]"
                      : "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"
                  }`}
                >
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==== Charts Section ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
        <Chart_Card
          title="Fee Collection Monthwise"
          color="#007bff"
          chartType="area"
          data={feeData}
          xKey="month"
          yKey="amount"
        />

        {/* You can later replace this with API attendance data */}
        <Chart_Card
          title="Class Attendance Chart"
          color="#22c55e"
          chartType="bar"
          data={[]}
          xKey="class"
          yKey="present"
        />
      </div>
    </div>
  );
}

export default Home;


// import React from "react";
// import { FaUser, FaUserTie, FaUsers, FaUserGraduate } from "react-icons/fa";
// import { MdSms, MdAccountBalance } from "react-icons/md";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import Chart_Card from "../../Components/Page_Forms/Chart_Card";

// function Home() {
//   const data = [
//     { value: 53, label: "Total Students" },
//     { value: 37, label: "No. of Boys" },
//     { value: 16, label: "No. of Girls" },
//     { value: 0.0, label: "Today Collection" },
//     { value: 0.0, label: "SMS Balance" },
//     { value: 7, label: "Total Teacher" },
//     { value: 0.0, label: "Aadhaar Balance" },
//     { value: 0, label: "Student Present (Today)" },
//   ];

//   const feeData = [
//     { month: "March", amount: 45000 },
//     { month: "May", amount: 1000 },
//     { month: "June", amount: 2000 },
//     { month: "July", amount: 15000 },
//     { month: "October", amount: 20000 },
//     { month: "December", amount: 60000 },
//   ];

//   const attendanceData = [
//     { class: "Nursery", present: 90 },
//     { class: "KG", present: 85 },
//     { class: "Prep", present: 80 },
//     { class: "1st", present: 88 },
//     { class: "2nd", present: 92 },
//     { class: "3rd", present: 75 },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start">
//       {/* ==== Top Boxes Section ==== */}
//       <div className="grid p-4 gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {data.map((item, i) => {
//           const isEven = i % 2 === 0;
//           return (
//             <div key={i} className="relative max-[22rem]:w-36 w-40 min-[33rem]:w-60 sm:w-75 md:w-70 h-30">
//               {/* Outer Box */}
//               <div
//                 className={`relative w-full h-full rounded-2xl shadow-2xl p-4 flex flex-col 
//                 ${
//                   isEven
//                     ? "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"
//                     : "bg-amber-100 text-[#CC3015]"
//                 }`}
//               >
//                 {/* Inner Box */}
//                 <div
//                   className={`absolute bottom-0 left-0 w-full h-20 rounded-2xl p-4 flex flex-col
//                   ${
//                     isEven
//                       ? "bg-amber-100 text-[#CC3015]"
//                       : "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"
//                   }`}
//                 >
//                   <span className="text-2xl font-bold">{item.value}</span>
//                   <span className="text-sm">{item.label}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ==== Charts Section ==== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full">
//         <Chart_Card
//           title="Fee Collection Monthwise"
//           color="#007bff"
//           chartType="area"
//           data={feeData}
//           xKey="month"
//           yKey="amount"
//         />

//         <Chart_Card
//           title="Class Attendance Chart"
//           color="#22c55e"
//           chartType="bar"
//           data={attendanceData}
//           xKey="class"
//           yKey="present"
//         />
//       </div>
//     </div>
//   );
// }

// export default Home;
