// src/components/Breadcrumbs.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { menuTree } from "../config/menuTree";
import { findPath } from "../utils/findPath";
import Buttons from "./Page_Forms/Buttons";

const Breadcrumbs = () => {
   const { pathname } = useLocation();
   const navigate = useNavigate();

   const crumbs = findPath(menuTree, pathname);
   const [openIndex, setOpenIndex] = useState(null);
   const ref = useRef(null);

   // close dropdown on outside click
   useEffect(() => {
      const close = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
            setOpenIndex(null);
         }
      };
      document.addEventListener("mousedown", close);
      return () => document.removeEventListener("mousedown", close);
   }, []);

   if (!crumbs.length) return null;

   return (
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
                     {/* separator as dropdown trigger */}
                     <button
                        onClick={() =>
                           setOpenIndex(openIndex === index ? null : index)
                        }
                        className="mx-2 text-gray-400 font-black hover:text-black"
                     >
                        ›
                     </button>

                     {/* crumb label */}
                     <Link
                        to={crumb.path}
                        className="text-[#cf361b] font-semibold hover:underline text-[15px]"
                     >
                        {crumb.name}
                     </Link>

                     {/* dropdown menu */}
                     {openIndex === index && crumb.submenus && ( 
                        <div className="absolute top-full left-0 mt-1 z-[9999] bg-white border rounded-md shadow-xl min-w-[220px]">
                           {crumb.submenus.map((child) => (
                              <Link
                                 key={child.path}
                                 to={child.path}
                                 onClick={() => setOpenIndex(null)}
                                 className="block px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                 {child.name}
                              </Link>
                           ))}
                        </div>
                     )}
                  </div>
               ))}
            </nav>
         </div>
      </div>
   );
};

export default Breadcrumbs;
