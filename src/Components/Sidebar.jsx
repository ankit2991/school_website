// import React, { useState, useEffect } from "react";
// import { FaUserGraduate, FaBus, FaBed, FaTools } from "react-icons/fa";
// import { MdAccountBalance, MdReport, MdPayments } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { menuTree } from "../config/menuTree";
// import { iconMap } from "../utils/iconMap";

// function Sidebar({ sidebarToggle, setSidebarToggle }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null);

//   useEffect(() => {
//     if (sidebarToggle) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [sidebarToggle]);

//   const menu = menuTree;

//   const handletoggle = () => {
//     setSidebarToggle(!sidebarToggle);
//   };

//   const toggleMenu = (i) => {
//     setOpenMenu(openMenu === i ? null : i);
//   };

//   const toggleSubMenu = (key) => {
//     setOpenSubMenu(openSubMenu === key ? null : key);
//   };
// const getVisibleSubmenus = (submenus = []) =>
//   submenus.filter(item => !item.hidden);

//  const renderSubmenus = (submenus, parentKey = "") => {
//   const visibleSubmenus = getVisibleSubmenus(submenus);

//   if (!visibleSubmenus.length) return null;

//   return (
//     <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
//       {visibleSubmenus.map((sub, j) => {
//         const key = `${parentKey}-${j}`;
//         const childVisible = getVisibleSubmenus(sub.submenus).length > 0;

//         return (
//           <li key={key} onClick={!childVisible ? handletoggle : undefined}>
//            {childVisible ? (
//   <>
//     <div className="flex justify-between items-center">
//       {/* LABEL → NAVIGATE */}
//       {sub.path ? (
//          <NavLink
//           to={sub.path}
//           onClick={handletoggle}
//           className="flex-1 px-2 py-1 hover:underline"
//         >
//           {sub.name}
//         </NavLink>
//       ) : (
//          <button
//         onClick={() => toggleSubMenu(key)}
//         className="px-2"
//       >

//         <span className="px-2 py-1">{sub.name}</span>
//       </button>
//       )}

//       {/* ARROW → TOGGLE */}
//         <button
//         onClick={() => toggleSubMenu(key)}
//         className="px-2"
//       >
//         {openSubMenu === key ? "−" : "▼"}
//       </button>
//     </div>

//     {openSubMenu === key && renderSubmenus(sub.submenus, key)}
//   </>
// ) : (


               
//               <NavLink
//                 to={sub.path}
//                 className={({ isActive }) =>
//                   `block mb-2 rounded-md px-2 py-2 transition ${
//                     isActive
//                       ? "bg-blue-400 text-white"
//                       : "hover:bg-blue-400 hover:text-white"
//                   }`
//                 }
//               >
//                 {sub.name}
//               </NavLink>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };



//   return (
//     <div
//       className={`${
//         sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
//       } w-64 block fixed right-0 bg-[#f7edcfda] shadow-2xl rounded-l-3xl 
//       transform transition-all duration-700 ease-in-out 
//       overflow-y-scroll no-scrollbar h-screen z-50`}
//     >
//       <ul className="pt-3 text-[#a7230b] font-bold mb-30 no-scrollbar bg-[#f7edcfda] px-4 py-2">
//         {menu.map((item, i) => (
//        <li key={i} className="mb-2">
//   {item.path && !item.submenus ? (
//     /* ✅ SIMPLE NAV ITEM (Dashboard, Logout etc.) */
//     <NavLink
//       to={item.path}
//       onClick={handletoggle}
//       className={({ isActive }) =>
//         `flex items-center gap-2 w-full px-3 py-2 rounded transition ${
//           isActive
//             ? "bg-blue-500 text-white shadow"
//             : "hover:bg-blue-500 hover:text-white"
//         }`
//       }
//     >
//       {item.icon && iconMap[item.icon]}
//       {item.name}
//     </NavLink>
//   ) : (
//     /* ✅ DROPDOWN MENU */
//     <>
//       <button
//         onClick={() => toggleMenu(i)}
//         className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
//           openMenu === i
//             ? "bg-blue-500 text-white shadow"
//             : "hover:bg-blue-500 hover:text-white"
//         }`}
//       >
//         <span className="flex items-center gap-2">
//           {item.icon && iconMap[item.icon]}
//           {item.name}
//         </span>
//         {/* <span>{openMenu === i ? "−" : "▼"}</span> */}
//       </button>

//       {openMenu === i && renderSubmenus(item.submenus, `menu-${i}`)}
//     </>
//   )}
// </li>

//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;





import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { menuTree } from "../config/menuTree";
import { iconMap } from "../utils/iconMap";

function Sidebar({ sidebarToggle, setSidebarToggle }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  /* ================= BODY SCROLL CONTROL ================= */
  useEffect(() => {
    document.body.style.overflow = sidebarToggle ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [sidebarToggle]);

  const handletoggle = () => setSidebarToggle(false);

  const toggleMenu = (i) => setOpenMenu(openMenu === i ? null : i);
  const toggleSubMenu = (key) =>
    setOpenSubMenu(openSubMenu === key ? null : key);

  /* ================= ACTIVE PATH CHECK (ALL LEVELS) ================= */
  const isPathActive = (item) => {
    if (!item) return false;

    if (item.path && item.path === location.pathname) return true;

    return item.submenus?.some((child) => isPathActive(child));
  };

  /* ================= AUTO OPEN MENU ON ROUTE CHANGE ================= */
  useEffect(() => {
    menuTree.forEach((item, i) => {
      if (isPathActive(item)) {
        setOpenMenu(i);

        item.submenus?.forEach((sub, j) => {
          if (isPathActive(sub) && sub.submenus) {
            setOpenSubMenu(`menu-${i}-${j}`);
          }
        });
      }
    });
  }, [location.pathname]);

  /* ================= HIDDEN FILTER ================= */
  const getVisibleSubmenus = (submenus = []) =>
    submenus.filter((item) => !item.hidden);

  /* ================= RECURSIVE SUBMENU RENDER ================= */
  const renderSubmenus = (submenus, parentKey = "") => {
    const visible = getVisibleSubmenus(submenus);
    if (!visible.length) return null;

    return (
      <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
        {visible.map((sub, j) => {
          const key = `${parentKey}-${j}`;
          const isActive = isPathActive(sub);
          const hasChildren = getVisibleSubmenus(sub.submenus).length > 0;

          return (
            <li key={key} onClick={!hasChildren ? handletoggle : undefined}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(key)}
                    className={`flex justify-between w-full px-2 py-1 rounded transition ${
                      isActive
                        ? "bg-blue-400 text-white"
                        : "hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    {sub.name}
                    <span>{openSubMenu === key ? "−" : "▼"}</span>
                  </button>

                  {openSubMenu === key &&
                    renderSubmenus(sub.submenus, key)}
                </>
              ) : (
                <NavLink
                  to={sub.path}
                  className={({ isActive }) =>
                    `block mb-2 rounded-md px-2 py-2 transition ${
                      isActive
                        ? "bg-blue-400 text-white"
                        : "hover:bg-blue-400 hover:text-white"
                    }`
                  }
                >
                  {sub.name}
                </NavLink>
              )}
            </li>
            
          );
          
        })}
        
      </ul>
    );
  };

    
/* ================= LOGOUT ================= */ 
    const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();
    navigate("/");
}


  /* ================= MAIN RENDER ================= */
  return (
    <div
      className={`${
        sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
      } w-64 fixed right-0 bg-[#f7edcfda] shadow-xl shadow-[#030303] rounded-l-3xl 
      transform transition-all duration-700 ease-in-out 
      overflow-y-scroll no-scrollbar h-screen z-50`}
    >
      <ul className="pt-3 text-[#a7230b] font-bold bg-[#f7edcfda] px-4 py-2 mb-35">
        {menuTree.map((item, i) => (
          <li key={i} className="mb-2">
            {item.action === "logout" ? 
              ( 
                <button 
                  onClick={() => { 
                    handleLogout(); 
                    handletoggle(); 
                  }} 
                  className="flex items-center gap-2 w-full px-3 " 
                > 
                  {item.icon && iconMap[item.icon]} 
                  {item.name} 
                </button> 
              ) : item.path && !item.submenus ? (
              /* ===== SIMPLE LINK ===== */
              <NavLink
                to={item.path}
                onClick={handletoggle}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full px-3 py-2 rounded transition ${
                    isActive
                      ? "bg-blue-500 text-white shadow"
                      : "hover:bg-blue-500 hover:text-white"
                  }`
                }
              >
                {item.icon && iconMap[item.icon]}
                {item.name}
              </NavLink>
            ) : (
              /* ===== DROPDOWN ===== */
              <>
                <button
                  onClick={() => toggleMenu(i)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
                    openMenu === i
                      ? "bg-blue-500 text-white shadow"
                      : "hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && iconMap[item.icon]}
                    {item.name}
                  </span>
                </button>

                {openMenu === i &&
                  renderSubmenus(item.submenus, `menu-${i}`)}
              </>
            )}
          </li>
        ))}

      </ul>
    </div>
  );
}

export default Sidebar;



// import React, { useState, useEffect } from "react";
// import {
//   FaUserGraduate,
//   FaBus,
//   FaBed,
//   FaTools,
// } from "react-icons/fa";
// import {
//   MdAccountBalance,
//   MdReport,
//   MdPayments,
// } from "react-icons/md";
// import { NavLink, useLocation } from "react-router-dom";

// function Sidebar({ sidebarToggle, setSidebarToggle }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     document.body.style.overflow = sidebarToggle ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [sidebarToggle]);

//   const menu = [
//     {
//       name: "Student Master",
//       icon: <FaUserGraduate className="inline-block w-5 h-5 mr-2 -mt-1" />,
//       submenus: [
//         { name: "Enquiry Form", path: "/Enquiry" },
//         { name: "Create Student", path: "/Create" },
//         { name: "Add Sibling", path: "/Sibling" },
//         { name: "Student Summary", path: "/Summary" },
//       ],
//     },
//     {
//       name: "Account Master",
//       icon: <MdAccountBalance className="inline-block w-5 h-5 mr-2 -mt-1" />,
//       submenus: [
//         { name: "Addmission Fee Receipt", path: "/Addmission" },
//         { name: "Fee Receipt", path: "/Fees" },
//         { name: "Transport Fee", path: "/Transport" },
//         { name: "Sibling Fee", path: "/Sibling-Fee" },
//         { name: "Hostel Fee", path: "/Hostel" },
//         { name: "Expenditure", path: "/Expenditure" },
//         { name: "Income", path: "/Income" },
//         { name: "Adjustment", path: "/Adjustment" },
//         { name: "Cash In Hand", path: "/Cash-In-Hand" },
//         { name: "Year End Activity", path: "/Year-End-Activity" },
//       ],
//     },
//     {
//       name: "Transport Master",
//       icon: <FaBus className="inline-block w-5 h-5 mr-2 -mt-1" />,
//       submenus: [
//         { name: "Route Master", path: "/Route-Master" },
//         { name: "Add Stop", path: "/Add" },
//         { name: "Vehicle Type", path: "/Vehicle-Type" },
//         { name: "Vehicle Provider", path: "/Vehicle" },
//         { name: "Vehicle Master", path: "/Master" },
//         { name: "Assign Vehicle", path: "/Assign" },
//       ],
//     },
//     {
//       name: "Hostel Master",
//       icon: <FaBed className="inline-block w-5 h-5 mr-2 -mt-1" />,
//       submenus: [
//         { name: "Hostel Provider", path: "/Hostel-Provide" },
//         { name: "Assign Hostel", path: "/Assign-Hostels" },
//       ],
//     },
//     {
//       name: "Manage Exam",
//       icon: <FaBed className="inline-block w-5 h-5 mr-2 -mt-1" />,
//       submenus: [
//         {
//           name: "Subject",
//           submenus: [
//             { name: "Subject", path: "/Subject" },
//             { name: "Grade", path: "/Grade" },
//           ],
//         },
//         {
//           name: "Exam",
//           submenus: [
//             { name: "Exam Type", path: "/Exam-Type" },
//             { name: "Exam", path: "/Exam" },
//             { name: "Assign Roll No.", path: "/Assign-Roll" },
//             { name: "Exam Schedule", path: "/Schedule" },
//             { name: "Assign Exam Hole", path: "/Assign-Exam-Hole" },
//           ],
//         },
//         { name: "Student Attendance", path: "/Student-Attendance" },
//         { name: "Marks Entry", path: "/Marks-Entry" },
//       ],
//     },
//   ];

//   const handletoggle = () => setSidebarToggle(!sidebarToggle);
//   const toggleMenu = (i) => setOpenMenu(openMenu === i ? null : i);
//   const toggleSubMenu = (key) =>
//     setOpenSubMenu(openSubMenu === key ? null : key);

//   /* ✅ ACTIVE PATH CHECK (SELF + CHILD + GRAND CHILD) */
//   const isPathActive = (item) => {
//     if (!item) return false;

//     if (item.path && item.path === location.pathname) return true;

//     if (item.submenus) {
//       return item.submenus.some((child) => isPathActive(child));
//     }

//     return false;
//   };

//   /* ✅ AUTO OPEN MENU + SUBMENU ON ROUTE CHANGE */
//   useEffect(() => {
//     menu.forEach((item, i) => {
//       item.submenus?.forEach((sub, j) => {
//         if (isPathActive(sub)) {
//           setOpenMenu(i);
//           if (sub.submenus) {
//             setOpenSubMenu(`menu-${i}-${j}`);
//           }
//         }
//       });
//     });
//   }, [location.pathname]);

//   const renderSubmenus = (submenus, parentKey = "") => {
//     if (!Array.isArray(submenus)) return null;

//     return (
//       <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
//         {submenus.map((sub, j) => {
//           const key = `${parentKey}-${j}`;
//           const isActive = isPathActive(sub);

//           return (
//             <li key={key} onClick={!sub.submenus ? handletoggle : undefined}>
//               {sub.submenus ? (
//                 <>
//                  <button
//   onClick={() => toggleSubMenu(key)}
//   className={`flex justify-between w-full px-2 py-1 rounded transition ${
//     isActive
//       ? "bg-blue-400 !text-white"
//       : "hover:bg-blue-400 hover:text-white"
//   }`}
// >

//                     {sub.name}
//                     <span>{openSubMenu === key ? "−" : "▼"}</span>
//                   </button>

//                   {isActive && renderSubmenus(sub.submenus, key)}
//                 </>
//               ) : (
//                 <NavLink
//                   to={sub.path}
//                   className={({ isActive }) =>
//                     `block mb-2 rounded-md px-2 py-2 transition cursor-pointer ${
//                       isActive
//                         ? "bg-blue-400 text-white"
//                         : "hover:bg-blue-400 hover:text-white"
//                     }`
//                   }
//                 >
//                   {sub.name}
//                 </NavLink>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <div
//       className={`${
//         sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
//       } w-64 fixed right-0 bg-[#f7edcfda] shadow-2xl rounded-l-3xl 
//       transform transition-all duration-700 ease-in-out 
//       overflow-y-scroll no-scrollbar h-screen z-50`}
//     >
//       <ul className="pt-3 text-[#a7230b] font-bold bg-[#f7edcfda] px-4 py-2">
//         {menu.map((item, i) => (
//           <li key={i} className="mb-2">
//             <button
//               onClick={() => toggleMenu(i)}
//               className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
//                 openMenu === i
//                   ? "bg-blue-500 text-white shadow"
//                   : "hover:bg-blue-500 hover:text-white"
//               }`}
//             >
//               <span className="flex items-center">
//                 {item.icon}
//                 {item.name}
//               </span>
//             </button>

//             {openMenu === i && renderSubmenus(item.submenus, `menu-${i}`)}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;
