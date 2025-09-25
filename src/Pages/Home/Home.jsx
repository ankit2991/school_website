import React from 'react'
import { FaUser, FaUserTie, FaUsers, FaUserGraduate } from "react-icons/fa";
import { MdSms, MdAccountBalance } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

function Home() {
    const data = [
    { value: 53, label: "Total Students" },
    { value: 37, label: "No. of Boys" },
    { value: 16, label: "No. of Girls" },
    { value: 0.0, label: "Today Collection" },
    { value: 0.0, label: "SMS Balance" },
    { value: 7, label: "Total Teacher" },
    { value: 0.0, label: "Aadhaar Balance" },
    { value: 0, label: "Student Present (Today)" },
  ];
  return (
    <div className='w-full h-screen bg-amber-50 flex justify-center items-start'>
     
          <div className="grid p-4 gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, i) => {
          const isEven = i % 2 === 0; // even → red outer, yellow inner; odd → yellow outer, red inner
          return (
            <div key={i} className="relative  max-[22rem]:w-36 w-40 min-[33rem]:w-60 sm:w-75 md:w-70 h-30">
              {/* Outer Box */}
              <div
                className={`relative w-full h-full rounded-2xl shadow-2xl p-4 flex flex-col 
                ${isEven ? "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white" : "bg-amber-100 text-[#CC3015]"}`}
              >
                {/* Inner Box */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-20 rounded-2xl p-4 flex flex-col
                  ${isEven ? "bg-amber-100 text-[#CC3015]" : "bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white"}`}
                >
                  <span className="text-2xl font-bold">{item.value}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )

  //  const cards = [
  //   { id: 1, value: "53", label: "Total Students", icon: <FaUsers size={28} /> w-75  md:w-90 lg:w-105},
  //   { id: 2, value: "37", label: "No. Of Boys", icon: <FaUser size={28} /> },
  //   { id: 3, value: "16", label: "No. Of Girls", icon: <FaUserGraduate size={28} /> },
  //   { id: 4, value: "0.00", label: "Today Collection", icon: <RiMoneyRupeeCircleFill size={28} /> },
  //   { id: 5, value: "0.00", label: "SMS Balance", icon: <MdSms size={28} /> },
  //   { id: 6, value: "07", label: "Total Teacher", icon: <FaUserTie size={28} /> },
  //   { id: 7, value: "0.00", label: "Aadhaar Balance", icon: <MdAccountBalance size={28} /> },
  //   { id: 8, value: "0", label: "Student Present (Today)", icon: <FaUsers size={28} /> },
  // ];

  // return (
  //   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
  //     {cards.map((card) => (
  //       <div
  //         key={card.id}
  //         className="relative bg-gradient-to-b from-red-600 to-red-800 rounded-md shadow-md p-4 flex justify-between items-center text-white"
  //       >

  //         {/* Icon */}
  //         <div className="absolute right-2 bottom-2 text-yellow-200 opacity-60">
  //           {card.icon}
  //         </div>

  //         {/* Value and Label */}
  //         <div>
  //           <h2 className="text-2xl font-bold">{card.value}</h2>
  //           <p className="text-sm">{card.label}</p>
  //         </div>

          
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default Home