// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { menuTree } from "../config/menuTree";
// import { iconMap } from "../utils/iconMap";

// function Sidebar({ sidebarToggle, setSidebarToggle }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const location = useLocation();

//   /* ================= BODY SCROLL CONTROL ================= */
//   useEffect(() => {
//     document.body.style.overflow = sidebarToggle ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [sidebarToggle]);

//   const handletoggle = () => setSidebarToggle(false);

//   const toggleMenu = (i) => setOpenMenu(openMenu === i ? null : i);
//   const toggleSubMenu = (key) =>
//     setOpenSubMenu(openSubMenu === key ? null : key);

//   /* ================= ACTIVE PATH CHECK (ALL LEVELS) ================= */
//   const isPathActive = (item) => {
//     if (!item) return false;

//     if (item.path && item.path === location.pathname) return true;

//     return item.submenus?.some((child) => isPathActive(child));
//   };

//   /* ================= AUTO OPEN MENU ON ROUTE CHANGE ================= */
//   useEffect(() => {
//     menuTree.forEach((item, i) => {
//       if (isPathActive(item)) {
//         setOpenMenu(i);

//         item.submenus?.forEach((sub, j) => {
//           if (isPathActive(sub) && sub.submenus) {
//             setOpenSubMenu(`menu-${i}-${j}`);
//           }
//         });
//       }
//     });
//   }, [location.pathname]);

//   /* ================= HIDDEN FILTER ================= */
//   const getVisibleSubmenus = (submenus = []) =>
//     submenus.filter((item) => !item.hidden);

//   /* ================= RECURSIVE SUBMENU RENDER ================= */
//   const renderSubmenus = (submenus, parentKey = "") => {
//     const visible = getVisibleSubmenus(submenus);
//     if (!visible.length) return null;

//     return (
//       <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
//         {visible.map((sub, j) => {
//           const key = `${parentKey}-${j}`;
//           const isActive = isPathActive(sub);
//           const hasChildren = getVisibleSubmenus(sub.submenus).length > 0;

//           return (
//             <li key={key} onClick={!hasChildren ? handletoggle : undefined}>
//               {hasChildren ? (
//                 <>
//                   <button
//                     onClick={() => toggleSubMenu(key)}
//                     className={`flex justify-between w-full px-2 py-1 rounded transition ${
//                       isActive
//                         ? "bg-blue-400 text-white"
//                         : "hover:bg-blue-400 hover:text-white"
//                     }`}
//                   >
//                     {sub.name}
//                     <span>{openSubMenu === key ? "−" : "▼"}</span>
//                   </button>

//                   {openSubMenu === key &&
//                     renderSubmenus(sub.submenus, key)}
//                 </>
//               ) : (
//                 // <NavLink
//                 //   to={sub.path}
//                 //   className={({ isActive }) =>
//                 //     `block mb-2 rounded-md px-2 py-2 transition ${
//                 //       isActive
//                 //         ? "bg-blue-400 text-white"
//                 //         : "hover:bg-blue-400 hover:text-white"
//                 //     }`
//                 //   }
//                 // >
//                 //   {sub.name}
//                 // </NavLink>
//                 <NavLink
//   to={sub.path}
//   onClick={(e) => {
//     if (sub.replace) {
//       e.preventDefault();
//       navigate(sub.path, { replace: true });
//       handletoggle();
//     } else {
//       handletoggle();
//     }
//   }}
//   className={({ isActive }) =>
//     `block mb-2 rounded-md px-2 py-2 transition ${
//       isActive
//         ? "bg-blue-400 text-white"
//         : "hover:bg-blue-400 hover:text-white"
//     }`
//   }
// >
//   {sub.name}
// </NavLink>

//               )}
//             </li>
            
//           );
          
//         })}
        
//       </ul>
//     );
//   };

    
// /* ================= LOGOUT ================= */ 
//     const navigate = useNavigate();

// const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.clear();
//     navigate("/");
// }


//   /* ================= MAIN RENDER ================= */
//   return (
//     <div
//       className={`${
//         sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
//       } w-64 fixed right-0 bg-[#f7edcfda] shadow-xl shadow-[#030303] rounded-l-3xl 
//       transform transition-all duration-700 ease-in-out 
//       overflow-y-scroll no-scrollbar h-screen z-50`}
//     >
//       <ul className="pt-3 text-[#a7230b] font-bold bg-[#f7edcfda] px-4 py-2 mb-35">
//         {menuTree.map((item, i) => (
//           <li key={i} className="mb-2">
//             {item.action === "logout" ? 
//               ( 
//                 <button 
//                   onClick={() => { 
//                     handleLogout(); 
//                     handletoggle(); 
//                   }} 
//                   className="flex items-center gap-2 w-full px-3 " 
//                 > 
//                   {item.icon && iconMap[item.icon]} 
//                   {item.name} 
//                 </button> 
//               ) : item.path && !item.submenus ? (
//               /* ===== SIMPLE LINK ===== */
//               <NavLink
//                 to={item.path}
//                 onClick={handletoggle}
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 w-full px-3 py-2 rounded transition ${
//                     isActive
//                       ? "bg-blue-500 text-white shadow"
//                       : "hover:bg-blue-500 hover:text-white"
//                   }`
//                 }
//               >
//                 {item.icon && iconMap[item.icon]}
//                 {item.name}
//               </NavLink>
//             ) : (
//               /* ===== DROPDOWN ===== */
//               <>
//                 <button
//                   onClick={() => toggleMenu(i)}
//                   className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
//                     openMenu === i
//                       ? "bg-blue-500 text-white shadow"
//                       : "hover:bg-blue-500 hover:text-white"
//                   }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     {item.icon && iconMap[item.icon]}
//                     {item.name}
//                   </span>
//                 </button>

//                 {openMenu === i &&
//                   renderSubmenus(item.submenus, `menu-${i}`)}
//               </>
//             )}
//           </li>
//         ))}

//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

//============================================this is the code when in menutree use replace: true=================================




// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { menuTree } from "../config/menuTree";
// import { iconMap } from "../utils/iconMap";

// function Sidebar({ sidebarToggle, setSidebarToggle }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const location = useLocation();

//   /* ================= BODY SCROLL CONTROL ================= */
//   useEffect(() => {
//     document.body.style.overflow = sidebarToggle ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [sidebarToggle]);

//   const handletoggle = () => setSidebarToggle(false);

//   const toggleMenu = (i) => setOpenMenu(openMenu === i ? null : i);
//   const toggleSubMenu = (key) =>
//     setOpenSubMenu(openSubMenu === key ? null : key);

//   /* ================= ACTIVE PATH CHECK (ALL LEVELS) ================= */
//   const isPathActive = (item) => {
//     if (!item) return false;

//     if (item.path && item.path === location.pathname) return true;

//     return item.submenus?.some((child) => isPathActive(child));
//   };

//   /* ================= AUTO OPEN MENU ON ROUTE CHANGE ================= */
//   useEffect(() => {
//     menuTree.forEach((item, i) => {
//       if (isPathActive(item)) {
//         setOpenMenu(i);

//         item.submenus?.forEach((sub, j) => {
//           if (isPathActive(sub) && sub.submenus) {
//             setOpenSubMenu(`menu-${i}-${j}`);
//           }
//         });
//       }
//     });
//   }, [location.pathname]);

//   /* ================= HIDDEN FILTER ================= */
//   const getVisibleSubmenus = (submenus = []) =>
//     submenus.filter((item) => !item.hidden);

//   /* ================= RECURSIVE SUBMENU RENDER ================= */
//   const renderSubmenus = (submenus, parentKey = "") => {
//     const visible = getVisibleSubmenus(submenus);
//     if (!visible.length) return null;

//     return (
//       <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
//         {visible.map((sub, j) => {
//           const key = `${parentKey}-${j}`;
//           const isActive = isPathActive(sub);
//           const hasChildren = getVisibleSubmenus(sub.submenus).length > 0;

//           return (
//             <li key={key} onClick={!hasChildren ? handletoggle : undefined}>
//               {hasChildren ? (
//                 <>
//                   <button
//                     onClick={() => toggleSubMenu(key)}
//                     className={`flex justify-between w-full px-2 py-1 rounded transition ${
//                       isActive
//                         ? "bg-blue-400 text-white"
//                         : "hover:bg-blue-400 hover:text-white"
//                     }`}
//                   >
//                     {sub.name}
//                     <span>{openSubMenu === key ? "−" : "▼"}</span>
//                   </button>

//                   {openSubMenu === key &&
//                     renderSubmenus(sub.submenus, key)}
//                 </>
//               ) : (
//                 <NavLink
//                   to={sub.path}
//                   className={({ isActive }) =>
//                     `block mb-2 rounded-md px-2 py-2 transition ${
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

    
// /* ================= LOGOUT ================= */ 
//     const navigate = useNavigate();

// const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.clear();
//     navigate("/");
// }


//   /* ================= MAIN RENDER ================= */
//   return (
//     <div
//       className={`${
//         sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
//       } w-64 fixed right-0 bg-[#f7edcfda] shadow-xl shadow-[#030303] rounded-l-3xl 
//       transform transition-all duration-700 ease-in-out 
//       overflow-y-scroll no-scrollbar h-screen z-50`}
//     >
//       <ul className="pt-3 text-[#a7230b] font-bold bg-[#f7edcfda] px-4 py-2 mb-35">
//         {menuTree.map((item, i) => (
//           <li key={i} className="mb-2">
//             {item.action === "logout" ? 
//               ( 
//                 <button 
//                   onClick={() => { 
//                     handleLogout(); 
//                     handletoggle(); 
//                   }} 
//                   className="flex items-center gap-2 w-full px-3 " 
//                 > 
//                   {item.icon && iconMap[item.icon]} 
//                   {item.name} 
//                 </button> 
//               ) : item.path && !item.submenus ? (
//               /* ===== SIMPLE LINK ===== */
//               <NavLink
//                 to={item.path}
//                 onClick={handletoggle}
//                 className={({ isActive }) =>
//                   `flex items-center gap-2 w-full px-3 py-2 rounded transition ${
//                     isActive
//                       ? "bg-blue-500 text-white shadow"
//                       : "hover:bg-blue-500 hover:text-white"
//                   }`
//                 }
//               >
//                 {item.icon && iconMap[item.icon]}
//                 {item.name}
//               </NavLink>
//             ) : (
//               /* ===== DROPDOWN ===== */
//               <>
//                 <button
//                   onClick={() => toggleMenu(i)}
//                   className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
//                     openMenu === i
//                       ? "bg-blue-500 text-white shadow"
//                       : "hover:bg-blue-500 hover:text-white"
//                   }`}
//                 >
//                   <span className="flex items-center gap-2">
//                     {item.icon && iconMap[item.icon]}
//                     {item.name}
//                   </span>
//                 </button>

//                 {openMenu === i &&
//                   renderSubmenus(item.submenus, `menu-${i}`)}
//               </>
//             )}
//           </li>
//         ))}

//       </ul>
//     </div>
//   );
// }

// export default Sidebar;


//=========================================================== this code is neutral ======================================================




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
                // <NavLink
                //   to={sub.path}
                //   className={({ isActive }) =>
                //     `block mb-2 rounded-md px-2 py-2 transition ${
                //       isActive
                //         ? "bg-blue-400 text-white"
                //         : "hover:bg-blue-400 hover:text-white"
                //     }`
                //   }
                // >
                //   {sub.name}
                // </NavLink>

                <NavLink
  to={sub.path}
  onClick={(e) => {
    if (sub.resetToHome) {
      e.preventDefault();

      // 🔥 Reset history
      navigate("/Home", { replace: true });
      navigate(sub.path, { replace: true });
    }

    handletoggle();
  }}
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


// const handleNavigation = (e, item) => {
//     if (item.resetToHome) {
//       e.preventDefault();

//       // 🔥 HARD RESET HISTORY
//       navigate("/Home", { replace: true });
//       navigate(item.path, { replace: true });
//     }
//   };


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