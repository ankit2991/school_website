// ========================================== Without remove pages from backside Code ===================================================

// src/components/Breadcrumbs.jsx
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { menuTree } from "../config/menuTree";
// import { findPath } from "../utils/findPath";
// import Buttons from "./Page_Forms/Buttons"; 

// const Breadcrumbs = () => {
//    const { pathname } = useLocation();
//    const navigate = useNavigate();

//    const crumbs = findPath(menuTree, pathname);
//    const [openIndex, setOpenIndex] = useState(null);
//    const [dropdownPos, setDropdownPos] = useState(null);

//    const ref = useRef(null);
//    const dropdownRef = useRef(null); // ✅ added

   

//    // close dropdown on outside click
//    useEffect(() => {
//       const close = (e) => {
//          if (
//             ref.current &&
//             !ref.current.contains(e.target) &&
//             dropdownRef.current &&
//             !dropdownRef.current.contains(e.target)
//          ) {
//             setOpenIndex(null);
//          }
//       };

//       document.addEventListener("mousedown", close);
//       return () => document.removeEventListener("mousedown", close);
//    }, []);

//    if (!crumbs.length) return null;
// if (pathname === "/Home") return null;

// //Agar or page ko hide karna ho toh is line ko uncomment karein
// // if (["/Home", "/"].includes(pathname)) return null;

//    const getVisibleSubmenus = (submenus) =>
//   submenus?.filter((child) => !child.hidden);


//    return (
//       <>
//          <div
//             ref={ref}
//             className="bg-white px-4 py-2 rounded-lg shadow mb-4 overflow-visible"
//          >
//             <div className="flex justify-between items-center overflow-visible">
//                {/* BACK BUTTON */}
//                <Buttons 
//                   click={() => navigate(-1)} label={"Back"} 
//                />

//                {/* BREADCRUMB */}
//                <nav className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
//                   <Link
//                      to="/Home"
//                      className="text-[#cf361b] font-semibold hover:underline text-[14px] sm:text-[20px]"
//                   >
//                      Dashboard
//                   </Link>

//                   {crumbs.map((crumb, index) => (
//                      <div
//                         key={index}
//                         className="relative flex items-center overflow-visible"
//                      >
//                         {/* separator */}
//                         <button
//                            onClick={(e) => {
//                               const rect =
//                                  e.currentTarget.getBoundingClientRect();

//                               setDropdownPos({
//                                  top: rect.bottom + 6,
//                                  left: rect.left,
//                               });

//                               setOpenIndex(
//                                  openIndex === index ? null : index
//                               );
//                            }}
//                            className="mx-2 text-gray-400 font-black hover:text-black"
//                         >
//                            ›
//                         </button>
//                         {/* crumb label */}
// {crumb.submenus ? (
//    <button
//       onClick={(e) => {
//          const rect = e.currentTarget.getBoundingClientRect();

//          setDropdownPos({
//             top: rect.bottom + 6,
//             left: rect.left,
//          });

//          setOpenIndex(openIndex === index ? null : index);
//       }}
//       className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[15px]"
//    >
//       {crumb.name}
//    </button>
// ) : (
//    // <Link
//    //    to={crumb.path}
//    //    className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[15px]"
//    // >
//    //    {crumb.name}
//    // </Link>
//    <Link
//   to={crumb.path}
//   className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[15px]"
// >
//   {crumb.name}
// </Link>
// )}


//                         {/* dropdown */}
//                         {/* {openIndex === index &&
//                            crumb.submenus &&
//                            dropdownPos &&
//                            createPortal( */}
//                            {openIndex === index &&
//    crumb.submenus &&
//    getVisibleSubmenus(crumb.submenus).length > 0 &&
//    dropdownPos &&
//    createPortal(

//                               <div 
//                                  ref={dropdownRef} // ✅ added
//                                  style={{
//                                     position: "fixed",
//                                     top: dropdownPos.top,
//                                     left: dropdownPos.left,
//                                     zIndex: 99999,
//                                  }}
//                                  className="bg-white overflow-hidden border-2 border-[#c05441]  rounded-lg shadow-xl min-w-[220px]"
//                               >
//                                  {/* {crumb.submenus.map((child) => (
//                                     child.hidden!=="true"(<Link
//                                        key={child.path}
//                                        to={child.path}
//                                        onClick={() => setOpenIndex(null)}
//                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
//                                     >
//                                        {child.name}
//                                     </Link>)
//                                  ))} */}

// {getVisibleSubmenus(crumb.submenus).map((child) => (
//   <Link
//     key={child.path}
//     to={child.path}
//     onClick={() => setOpenIndex(null)}
//     className="block px-4 py-2 text-sm hover:bg-gray-200 hover:scale-105 transition-all "
//   >
//     {child.name}
//   </Link>
// ))}

//                                  {/* {crumb.submenus.map(
//   (child) =>
//     !child.hidden && (
//       <Link
//         key={child.path}
//         to={child.path}
//         onClick={() => setOpenIndex(null)}
//         className="block px-4 py-2 text-sm hover:bg-gray-100"
//       >
//         {child.name}
//       </Link>
//     )
// )} */}

//                               </div>,
//                               document.body
//                            )}
//                      </div>
//                   ))}
//                </nav>
//             </div>
//          </div>
//       </>
//    );
// };

// export default Breadcrumbs;


// ======================================= Without remove pages from backside Code End ==================================================



// ============================================== Remove pages from backside Code =======================================================

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import { menuTree } from "../config/menuTree";
// import { findPath } from "../utils/findPath";
// import Buttons from "./Page_Forms/Buttons"; 

// const Breadcrumbs = () => {
//    const { pathname } = useLocation();
//    const navigate = useNavigate();

//    const crumbs = findPath(menuTree, pathname);
//    const [openIndex, setOpenIndex] = useState(null);
//    const [dropdownPos, setDropdownPos] = useState(null);

//    const ref = useRef(null);
//    const dropdownRef = useRef(null); // ✅ added

   

//    // close dropdown on outside click
//    useEffect(() => {
//       const close = (e) => {
//          if (
//             ref.current &&
//             !ref.current.contains(e.target) &&
//             dropdownRef.current &&
//             !dropdownRef.current.contains(e.target)
//          ) {
//             setOpenIndex(null);
//          }
//       };

//       document.addEventListener("mousedown", close);
//       return () => document.removeEventListener("mousedown", close);
//    }, []);

//    if (!crumbs.length) return null;
// if (pathname === "/Home") return null;

// //Agar orr pages per breadcrumb ko hide karna ho toh is line ko uncomment karein
// // if (["/Home", "/"].includes(pathname)) return null;

//    const getVisibleSubmenus = (submenus) =>
//   submenus?.filter((child) => !child.hidden);


//    return (
//       <>
//          <div
//             ref={ref}
//             className="bg-white px-4 py-2 rounded-lg shadow mb-4 overflow-visible"
//          >
//             <div className="flex justify-between items-center overflow-visible">
//                {/* BACK BUTTON */}
//                <Buttons
//   click={() => {
//     // parent = one level up, not current
//     const parentCrumb =
//       crumbs.length > 1 ? crumbs[crumbs.length - 2] : null;

//     if (parentCrumb?.path) {
//       navigate(parentCrumb.path, { replace: true });
//     } else {
//       navigate("/Home", { replace: true });
//     }
//   }}
//   label={"Back"}
// />




//                {/* BREADCRUMB */}
//                <nav className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
//                   {/* <Link
//                      to="/Home"
//                      className="text-[#cf361b] font-semibold hover:underline text-[14px] sm:text-[20px]"
//                   >
//                      Dashboard
//                   </Link> */}
//                   <button
//   onClick={() => navigate("/Home", { replace: true })}
//   className="text-[#cf361b] font-semibold hover:underline text-[14px] sm:text-[20px]"
// >
//   Dashboard
// </button>

//                   {crumbs.map((crumb, index) => {
//   const isSection = !crumb.path && crumb.submenus; // dropdown only
//   const isPage = !!crumb.path;                     // navigate only

//   return (
//     <div
//       key={index}
//       className="relative flex items-center overflow-visible"
//     >
//       {/* separator */}
//       <span className="mx-2 text-gray-400 font-black">›</span>

//       {/* SECTION → open dropdown */}
//       {isSection && (
//         <button
//           onClick={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             setDropdownPos({
//               top: rect.bottom + 6,
//               left: rect.left,
//             });
//             setOpenIndex(openIndex === index ? null : index);
//           }}
//           className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[15px]"
//         >
//           {crumb.name}
//         </button>
//       )}

//       {/* PAGE → navigate */}
//       {isPage && (
//   <button
//     onClick={() => {
//       setOpenIndex(null);
//       navigate(crumb.path, { replace: true });
//     }}
//     className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[15px]"
//   >
//     {crumb.name}
//   </button>
// )}


//       {/* DROPDOWN → ONLY FOR SECTIONS */}
//       {isSection &&
//         openIndex === index &&
//         getVisibleSubmenus(crumb.submenus).length > 0 &&
//         dropdownPos &&
//         createPortal(
//           <div
//             ref={dropdownRef}
//             style={{
//               position: "fixed",
//               top: dropdownPos.top,
//               left: dropdownPos.left,
//               zIndex: 99999,
//             }}
//             className="bg-white overflow-hidden border-2 border-[#c05441] rounded-lg shadow-xl min-w-[220px]"
//           >
//             {getVisibleSubmenus(crumb.submenus).map((child) => (
//               <Link
//                 key={child.path}
//                 to={child.path}
//                 onClick={() => setOpenIndex(null)}
//                 className="block px-4 py-2 text-sm hover:bg-gray-200 hover:scale-105 transition-all"
//               >
//                 {child.name}
//               </Link>
//             ))}
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// })}

//                </nav>
//             </div>
//          </div>
//       </>
//    );
// };

// export default Breadcrumbs;

// ============================================ Remove pages from backside Code End ===================================================
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { menuTree } from "../config/menuTree";
import { findPath } from "../utils/findPath";
import Buttons from "./Page_Forms/Buttons";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const crumbs = findPath(menuTree, pathname);

  const [openIndex, setOpenIndex] = useState(null);
  const [dropdownPos, setDropdownPos] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [secondPos, setSecondPos] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const ref = useRef(null);
  const dropdownRef = useRef(null);
  const secondDropdownRef = useRef(null); // ✅ IMPORTANT FIX

  // ✅ Detect touch device
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  // ✅ Detect small screen (300–600px)
  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      setIsSmallScreen(w >= 300 && w <= 600);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Outside click (FIXED for second dropdown)
  useEffect(() => {
    const close = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        secondDropdownRef.current &&
        !secondDropdownRef.current.contains(e.target)
      ) {
        setOpenIndex(null);
        setHoveredItem(null);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (!crumbs.length || pathname === "/Home") return null;

  const getVisibleSubmenus = (submenus) =>
    submenus?.filter((item) => !item.hidden);

  const hasRealPages = (menu) =>
    menu?.submenus?.some((item) => item.path && !item.hidden);

  // ✅ Open second dropdown
  const openSecondMenu = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredItem(item);
    setSecondPos({
      top: rect.top,
      left: rect.left,
      right: rect.right,
    });
  };

  return (
    <div ref={ref} className="bg-white px-2 sm:px-4 py-2 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center flex-wrap">
        {/* BACK BUTTON */}
        <Buttons
          click={() => {
            const parentCrumb =
              crumbs.length > 1 ? crumbs[crumbs.length - 2] : null;
            navigate(parentCrumb?.path || "/Home", { replace: true });
          }}
          label="Back"
        />

        {/* BREADCRUMB */}
        <nav className="flex items-center text-gray-600 overflow-x-auto whitespace-nowrap space-x-1 sm:space-x-2">
          <button
            onClick={() => navigate("/Home", { replace: true })}
            className="text-[#cf361b] font-semibold hover:underline text-[12px] sm:text-[14px] md:text-[16px]"
          >
            Dashboard
          </button>

          {crumbs.map((crumb, index) => {
            const isSection = !crumb.path && crumb.submenus;
            const isPage = !!crumb.path;

            return (
              <div key={index} className="relative flex items-center">
                <span className="mx-1 sm:mx-2 text-gray-400 font-black">›</span>

                {isSection && (
                  <button
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDropdownPos({
                        top: rect.bottom + 6,
                        left: rect.left,
                      });
                      setOpenIndex(openIndex === index ? null : index);
                      setHoveredItem(null);
                    }}
                    className="text-[#cf361b] font-semibold hover:underline text-[10px] sm:text-[12px] md:text-[14px]"
                  >
                    {crumb.name}
                  </button>
                )}

                {isPage && (
                  <button
                    onClick={() => {
                      setOpenIndex(null);
                      navigate(crumb.path, { replace: true });
                    }}
                    className="text-[#cf361b] font-semibold hover:underline text-[10px] sm:text-[12px] md:text-[14px]"
                  >
                    {crumb.name}
                  </button>
                )}

                {/* FIRST DROPDOWN */}
                {isSection &&
                  openIndex === index &&
                  dropdownPos &&
                  createPortal(
                    <div
                      ref={dropdownRef}
                      style={{
                        position: "fixed",
                        top: dropdownPos.top,
                        left: Math.max(
                          isSmallScreen
                            ? dropdownPos.left - 140
                            : dropdownPos.left - 90,
                          5
                        ),
                        zIndex: 99999,
                      }}
                      className="bg-white border-2 border-[#c05441] rounded-lg shadow-xl
                                 min-w-[180px] sm:min-w-[220px] overflow-hidden"
                    >
                      {getVisibleSubmenus(crumb.submenus).map((item) => (
                        <div
                          key={item.name}
                          onMouseEnter={
                            !isTouchDevice
                              ? (e) => openSecondMenu(e, item)
                              : undefined
                          }
                          onClick={(e) => {
                            if (isTouchDevice && hasRealPages(item)) {
                              openSecondMenu(e, item);
                            } else if (item.path && !hasRealPages(item)) {
                              // navigate(item.path);
                              navigate(item.path, { replace: true });
                              setOpenIndex(null);
                              setHoveredItem(null);
                            }
                          }}
                          className="px-3 sm:px-4 py-2 cursor-pointer
                                     hover:bg-gray-200 transition-transform duration-200
                                     hover:scale-105 transform-gpu origin-left
                                     text-[12px] sm:text-[14px]"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>,
                    document.body
                  )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* SECOND DROPDOWN */}
      {hoveredItem &&
        secondPos &&
        hasRealPages(hoveredItem) &&
        createPortal(
          <div
            ref={secondDropdownRef} // ✅ CRITICAL FIX
            style={{
              position: "fixed",
              top: secondPos.top,
              ...(isSmallScreen
                ? {
                    right: Math.max(
                      window.innerWidth - secondPos.right - 220,
                      5
                    ),
                  }
                : {
                    left: Math.max(secondPos.left - 247, 5),
                  }),
              zIndex: 100000,
            }}
            className="bg-white border-2 border-[#c05441] rounded-lg shadow-xl
                       min-w-[220px] sm:min-w-[260px] overflow-hidden"
          >
            {hoveredItem.submenus
              .filter((p) => p.path && !p.hidden)
              .map((child) => (
                <div
                  key={child.path}
                  onClick={() => {
                    // navigate(child.path);
                    navigate(child.path, { replace: true });
                    setOpenIndex(null);
                    setHoveredItem(null);
                  }}
                  className="px-3 sm:px-4 py-2 cursor-pointer
                             hover:bg-gray-200 transition-transform duration-200
                             hover:scale-105 transform-gpu origin-left
                             text-[12px] sm:text-[14px]"
                >
                  {child.name}
                </div>
              ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Breadcrumbs;
