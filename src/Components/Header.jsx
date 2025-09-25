// import React, { useState } from 'react'
// import { FaUserCircle, FaHome, FaSignOutAlt, FaBars } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// function Header({ onToggleSidebar }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//     if (onToggleSidebar) {
//       console.log("clicked")
//       onToggleSidebar(!sidebarOpen);
//     }
//   };

//   return (
//     <header className="fixed top-0 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white shadow-md py-4 px-6 flex items-center justify-between w-full">
//       {/* Left Side - Logo and School Info */}
//       <div className="flex items-center space-x-4">
//         <img
//           src="/Systrans_Logo.jpeg"
//           alt="School Logo"
//           className="h-12 w-12 object-cover rounded-full border-2"
//         />
//         <div>
//           <h1 className="text-lg font-semibold">
//             Kesharam Memorial Manakchand Public School
//           </h1>
//           <p className="text-sm opacity-80">Current Session: 2024–2025</p>
//         </div>
//       </div>

//       {/* Right Side - Buttons */}
//       <div className="flex items-center space-x-4">
//         <FaBars className="text-white me-4 cursor-pointer"onClick={handleToggle}/>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

function Header({ onToggleSidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
    if (onToggleSidebar) {
      console.log("clicked")
      onToggleSidebar(!sidebarOpen);
    }
  };

  return (
    <header className="fixed top-0 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white shadow-md py-3 px-4 flex items-center justify-between w-full z-40">
      {/* Left Side - Logo and School Info */}
      <div className="flex items-center space-x-3 min-w-0">
        <img
          src="/Systrans_Logo.jpeg"
          alt="School Logo"
          className="h-10 w-10 object-cover rounded-full border-2 flex-shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-md md:text-lg font-semibold leading-tight truncate max-w-[250px]  md:max-w-[500px]">
            Kesharam Memorial Manakchand Public School
          </h1>
          <p className="text-xs md:text-sm opacity-80 truncate max-w-[200px] md:max-w-[300px]">
            Current Session: 2024–2025
          </p>
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-4">
        <FaBars
          className="text-white text-xl md:text-2xl cursor-pointer  "
          onClick={handleToggle} 
        />
      </div>
    </header>
  );
}

export default Header;
