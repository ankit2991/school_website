import { Link, useLocation, useNavigate } from "react-router-dom";
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

   const ref = useRef(null);
   const dropdownRef = useRef(null); // ✅ added

   // close dropdown on outside click
   useEffect(() => {
      const close = (e) => {
         if (
            ref.current &&
            !ref.current.contains(e.target) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target)
         ) {
            setOpenIndex(null);
         }
      };

      document.addEventListener("mousedown", close);
      return () => document.removeEventListener("mousedown", close);
   }, []);

   if (!crumbs.length) return null;


   const getVisibleSubmenus = (submenus) =>
  submenus?.filter((child) => !child.hidden);


   return (
      <>
         <div
            ref={ref}
            className="bg-white px-4 py-2 rounded-lg shadow mb-4 overflow-visible"
         >
            <div className="flex justify-between items-center overflow-visible">
               {/* BACK BUTTON */}
               <Buttons click={() => navigate(-1)} label={"Back"} />

               {/* BREADCRUMB */}
               <nav className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                  <Link
                     to="/Home"
                     className="text-[#cf361b] font-semibold hover:underline text-[20px]"
                  >
                     Dashboard
                  </Link>

                  {crumbs.map((crumb, index) => (
                     <div
                        key={index}
                        className="relative flex items-center overflow-visible"
                     >
                        {/* separator */}
                        <button
                           onClick={(e) => {
                              const rect =
                                 e.currentTarget.getBoundingClientRect();

                              setDropdownPos({
                                 top: rect.bottom + 6,
                                 left: rect.left,
                              });

                              setOpenIndex(
                                 openIndex === index ? null : index
                              );
                           }}
                           className="mx-2 text-gray-400 font-black hover:text-black"
                        >
                           ›
                        </button>

                        {/* crumb label */}
                        {/* <Link
                           to={crumb.path}
                           className="text-[#cf361b] font-semibold hover:underline text-[15px]"
                        >
                           {crumb.name}
                        </Link> */}
                        {/* crumb label */}
{crumb.submenus ? (
   <button
      onClick={(e) => {
         const rect = e.currentTarget.getBoundingClientRect();

         setDropdownPos({
            top: rect.bottom + 6,
            left: rect.left,
         });

         setOpenIndex(openIndex === index ? null : index);
      }}
      className="text-[#cf361b] font-semibold hover:underline text-[15px]"
   >
      {crumb.name}
   </button>
) : (
   <Link
      to={crumb.path}
      className="text-[#cf361b] font-semibold hover:underline text-[15px]"
   >
      {crumb.name}
   </Link>
)}


                        {/* dropdown */}
                        {/* {openIndex === index &&
                           crumb.submenus &&
                           dropdownPos &&
                           createPortal( */}
                           {openIndex === index &&
   crumb.submenus &&
   getVisibleSubmenus(crumb.submenus).length > 0 &&
   dropdownPos &&
   createPortal(

                              <div
                                 ref={dropdownRef} // ✅ added
                                 style={{
                                    position: "fixed",
                                    top: dropdownPos.top,
                                    left: dropdownPos.left,
                                    zIndex: 99999,
                                 }}
                                 className="bg-white border rounded-md shadow-xl min-w-[220px]"
                              >
                                 {/* {crumb.submenus.map((child) => (
                                    child.hidden!=="true"(<Link
                                       key={child.path}
                                       to={child.path}
                                       onClick={() => setOpenIndex(null)}
                                       className="block px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                       {child.name}
                                    </Link>)
                                 ))} */}

{getVisibleSubmenus(crumb.submenus).map((child) => (
  <Link
    key={child.path}
    to={child.path}
    onClick={() => setOpenIndex(null)}
    className="block px-4 py-2 text-sm hover:bg-gray-100"
  >
    {child.name}
  </Link>
))}

                                 {/* {crumb.submenus.map(
  (child) =>
    !child.hidden && (
      <Link
        key={child.path}
        to={child.path}
        onClick={() => setOpenIndex(null)}
        className="block px-4 py-2 text-sm hover:bg-gray-100"
      >
        {child.name}
      </Link>
    )
)} */}

                              </div>,
                              document.body
                           )}
                     </div>
                  ))}
               </nav>
            </div>
         </div>
      </>
   );
};

export default Breadcrumbs;



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

//    // close dropdown on outside click
//    useEffect(() => {
//       const close = (e) => {
//          if (ref.current && !ref.current.contains(e.target)) {
//             setOpenIndex(null);
//          }
//       };
//       document.addEventListener("mousedown", close);
//       return () => document.removeEventListener("mousedown", close);
//    }, []);

//    if (!crumbs.length) return null;

//    return (
//       <>
//          <div
//             ref={ref}
//             className="bg-white px-4 py-2 rounded-lg shadow mb-4 overflow-visible"
//          >
//             <div className="flex justify-between items-center overflow-visible">
//                {/* BACK BUTTON */}
//                <Buttons click={() => navigate(-1)} label={"Back"} />

//             {/* BREADCRUMB */}
//             <nav className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
//                <Link
//                   to="/Home"
//                   className="text-[#cf361b] font-semibold hover:underline text-[20px]"
//                >
//                   Dashboard
//                </Link>

//                   {crumbs.map((crumb, index) => (
//                      <div
//                         key={index}
//                         className="relative flex items-center overflow-visible"
//                      >
//                         {/* separator as dropdown trigger */}
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
//                         <Link
//                            to={crumb.path}
//                            className="text-[#cf361b] font-semibold hover:underline text-[15px]"
//                         >
//                            {crumb.name}
//                         </Link>

//                         {/* dropdown via portal */}
//                         {openIndex === index &&
//                            crumb.submenus &&
//                            dropdownPos &&
//                            createPortal(
//                               <div
//                                  style={{
//                                     position: "fixed",
//                                     top: dropdownPos.top,
//                                     left: dropdownPos.left,
//                                     zIndex: 99999,
//                                  }}
//                                  className="bg-white border rounded-md shadow-xl min-w-[220px]"
//                               >
//                                  {crumb.submenus.map((child) => (
//                                     <Link
//                                        key={child.path}
//                                        to={child.path}
//                                        onClick={() => setOpenIndex(null)}
//                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
//                                     >
//                                        {child.name}
//                                     </Link>
//                                  ))}
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
