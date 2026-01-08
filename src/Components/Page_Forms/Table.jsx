// import React, { useState, useEffect, useRef } from "react";

// function Table({
//   columns = [],
//   data = [],
//   actions = null,
//   className = "",
//   style,
//   selectable = false,
//   selectedRow = null,
//   onRowSelect = () => {},
//   disableFloatingRow = false,
//   onOverlayToggle = () => {},
//   loading = false,
// }) {
//   const [expandedRow, setExpandedRow] = useState(null);
//   const rowRefs = useRef([]);
//   const overlayRef = useRef(null);

//   // 🔹 Lock/unlock body scroll on mobile when overlay is open
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       document.body.style.overflow = expandedRow !== null ? "hidden" : "auto";
//       return () => {
//         document.body.style.overflow = "auto";
//       };
//     }
//   }, [expandedRow]);

//   // 🔹 Notify parent about overlay & scroll to expanded row
//   useEffect(() => {
//     onOverlayToggle(expandedRow !== null);

//     if (expandedRow !== null && data[expandedRow]) {
//       const timeout = setTimeout(() => {
//         const rowTop =
//           rowRefs.current[expandedRow]?.getBoundingClientRect().top +
//           window.scrollY;
//         const overlayHeight = overlayRef.current?.offsetHeight || 200;
//         window.scrollTo({
//           top: rowTop - overlayHeight - 20,
//           behavior: "smooth",
//         });
//       }, 50);

//       return () => clearTimeout(timeout);
//     }
//   }, [expandedRow, onOverlayToggle, data]);

//   return (
//     <div
//       className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}
//     >
//       <div
//         className={`overflow-y-auto no-scrollbar ${
//           style || "max-h-[35vh] sm:max-h-[35vh]"
//         }`}
//       >
//         <table className="w-full table-auto border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#df7f6e] via-[#e4321b] to-[#f30202] text-white">
//             <tr>
//               {columns.map((col, idx) => (
//                 <th key={idx} className="px-4 py-2 text-center truncate">
//                   {col.shortHeader ? (
//                     <>
//                       <span className="sm:hidden">{col.shortHeader}</span>
//                       <span className="hidden sm:inline">{col.header}</span>
//                     </>
//                   ) : (
//                     col.header
//                   )}
//                 </th>
//               ))}
//               {actions && (
//                 <th className="px-4 py-2 text-center truncate w-32">
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td
//                   colSpan={columns.length + (actions ? 1 : 0)}
//                   className="py-10 text-center"
//                 >
//                   <div className="flex flex-col items-center gap-3">
//                     <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e4321b] border-t-transparent" />
//                     <span className="text-sm text-slate-600">
//                       Loading fee details...
//                     </span>
//                   </div>
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length + (actions ? 1 : 0)}
//                   className="py-8 text-center text-slate-500"
//                 >
//                   No fee records found
//                 </td>
//               </tr>
//             ) : (
//               data.map((row, rowIndex) => {
//                 const isSelected = selectable && selectedRow?.id === row.id;
//                 if (!row) return null; // guard

//                 return (
//                   <tr
//                     key={row.id || rowIndex}
//                     ref={(el) => (rowRefs.current[rowIndex] = el)}
//                     className={`border-b border-slate-300 cursor-pointer ${
//                       window.innerWidth < 768 && expandedRow === rowIndex
//                         ? "bg-blue-200"
//                         : isSelected
//                         ? "bg-blue-100"
//                         : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"
//                     }`}
//                     onClick={() => {
//                       if (selectable) {
//                         onRowSelect(row);
//                       } else {
//                         if (!disableFloatingRow) {
//                           setExpandedRow(
//                             expandedRow === rowIndex ? null : rowIndex
//                           );
//                         } else {
//                           onRowSelect(row);
//                         }
//                       }
//                     }}
//                   >
//                     {columns.map((col, colIndex) => (
//                       <td
//                         key={colIndex}
//                         className="px-3 py-2 text-sm max-[380px]:text-[14px] align-top"
//                       >
//                         <div
//                           className={`w-full text-center ${
//                             col.cellStyle ? col.cellStyle : "truncate"
//                           }`}
//                         >
//                           {col.cell ? col.cell(row) : row[col.accessor]}
//                         </div>
//                       </td>
//                     ))}

//                     {actions && (
//                       <td className="px-3 py-2 w-32">
//                         <div className="flex justify-center gap-3">
//                           {actions(row)}
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Overlay */}
//       {!disableFloatingRow &&
//         !selectable &&
//         expandedRow !== null &&
//         data[expandedRow] && (
//           <div
//             ref={overlayRef}
//             className="fixed inset-x-0 bottom-0 z-50 flex items-end md:hidden"
//           >
//             <div
//               className="w-full bg-white border border-slate-400 rounded-t-lg shadow-2xl overflow-hidden mx-auto"
//               style={{ maxWidth: "100%", maxHeight: "40vh" }}
//             >
//               {/* Header */}
//               <div className="px-1 py-3 flex items-center justify-between border-b">
//                 <span className="font-bold text-slate-800">Row Details</span>
//                 <button
//                   className="text-red-600 font-bold"
//                   onClick={() => setExpandedRow(null)}
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Scrollable content */}
//               <div
//                 className="px-3 py-3 overflow-y-auto"
//                 style={{
//                   maxHeight: "calc(80vh - 56px)",
//                   WebkitOverflowScrolling: "touch",
//                 }}
//               >
//                 <div className="flex flex-col gap-y-2 text-sm">
//                   {columns.map((col, idx) => (
//                     <div key={idx} className="w-full flex items-start gap-2">
//                       <span className="font-medium shrink-0">{col.shortHeader}:</span>
//                       <span
//                         className={`block flex-1 ${
//                           col.cellStyle ? col.cellStyle : ""
//                         }`}
//                       >
//                         {data[expandedRow]
//                           ? col.cell
//                             ? col.cell(data[expandedRow])
//                             : data[expandedRow][col.accessor]
//                           : ""}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {actions && data[expandedRow] && (
//                   <div className="mt-3 flex justify-center gap-3">
//                     {actions(data[expandedRow])}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// }

// export default Table;



import React, { useState, useEffect, useRef } from "react";

function Table({
  columns = [],
  data = [],
  actions = null,
  className = "",
  style,
  colStyle,
  selectable = false,
  selectedRow = null,
  onRowSelect = () => {},
  onRowClick = null,                 // ✅ ADDED
  disableFloatingRow = false,
  onOverlayToggle = () => {},
  loading = false,
}) {
  const [expandedRow, setExpandedRow] = useState(null);
  const rowRefs = useRef([]);
  const overlayRef = useRef(null);

  // 🔹 Lock/unlock body scroll on mobile when overlay is open
  useEffect(() => {
    if (window.innerWidth < 768) {
      document.body.style.overflow = expandedRow !== null ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [expandedRow]);

  // 🔹 Notify parent about overlay & scroll to expanded row
  useEffect(() => {
    onOverlayToggle(expandedRow !== null);

    if (expandedRow !== null && data[expandedRow]) {
      const timeout = setTimeout(() => {
        const rowTop =
          rowRefs.current[expandedRow]?.getBoundingClientRect().top +
          window.scrollY;
        const overlayHeight = overlayRef.current?.offsetHeight || 200;
        window.scrollTo({
          top: rowTop - overlayHeight - 20,
          behavior: "smooth",
        });
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [expandedRow, onOverlayToggle, data]);

  return (
    <div
      className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}
    >
      <div
        className={`overflow-y-auto no-scrollbar ${
          style || "max-h-[35vh] sm:max-h-[35vh]"
        }`}
      >
        <table className="w-full table-auto border-collapse">
          {/* Header */}
          <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#df7f6e] via-[#e4321b] to-[#f30202] text-white">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-2 text-center truncate">
                  {col.shortHeader ? (
                    <>
                      <span className="sm:hidden">{col.shortHeader}</span>
                      <span className="hidden sm:inline">{col.header}</span>
                    </>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-2 text-center truncate w-32">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-10 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e4321b] border-t-transparent" />
                    <span className="text-sm text-slate-600">
                      Loading fee details...
                    </span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-8 text-center text-slate-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                if (!row) return null;

                const isSelected =
                  selectable && selectedRow?.id === row.id;

                return (
                  <tr
                    key={row.id || rowIndex}
                    ref={(el) => (rowRefs.current[rowIndex] = el)}
                    className={`border-b border-slate-300 ${
                      onRowClick
                        ? "cursor-pointer hover:bg-gray-100"
                        : "cursor-default"
                    } ${
                      window.innerWidth < 768 && expandedRow === rowIndex
                        ? "bg-blue-200"
                        : isSelected
                        ? "bg-blue-100"
                        : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"
                    }`}
                    onClick={() => {
                      // ✅ CUSTOM ROW CLICK (ONLY WHEN PASSED)
                      if (onRowClick) {
                        onRowClick(row);
                        return;
                      }

                      // 🔹 Existing behavior untouched
                      if (selectable) {
                        onRowSelect(row);
                      } else {
                        if (!disableFloatingRow) {
                          setExpandedRow(
                            expandedRow === rowIndex ? null : rowIndex
                          );
                        } else {
                          onRowSelect(row);
                        }
                      }
                    }}
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-3 py-2 text-sm max-[380px]:text-[14px] align-top"
                      >
                        <div
                          className={`w-full text-center ${colStyle} ${
                            col.cellStyle ? col.cellStyle : "truncate"
                          }`}
                        >
                          {col.cell ? col.cell(row) : row[col.accessor]}
                        </div>
                      </td>
                    ))}

                    {actions && (
                      <td className="px-3 py-2 w-32">
                        <div className="flex justify-center gap-3">
                          {actions(row)}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Overlay */}
      {!disableFloatingRow &&
        !selectable &&
        expandedRow !== null &&
        data[expandedRow] && (
          <div
            ref={overlayRef}
            className="fixed inset-x-0 bottom-0 z-50 flex items-end md:hidden"
          >
            <div
              className="w-full bg-white border border-slate-400 rounded-t-lg shadow-2xl overflow-hidden mx-auto"
              style={{ maxWidth: "100%", maxHeight: "40vh" }}
            >
              <div className="px-1 py-3 flex items-center justify-between border-b">
                <span className="font-bold text-slate-800">Row Details</span>
                <button
                  className="text-red-600 font-bold"
                  onClick={() => setExpandedRow(null)}
                >
                  ✕
                </button>
              </div>

              <div
                className="px-3 py-3 overflow-y-auto"
                style={{
                  maxHeight: "calc(80vh - 56px)",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex flex-col gap-y-2 text-sm">
                  {columns.map((col, idx) => (
                    <div key={idx} className="w-full flex items-start gap-2">
                      <span className="font-medium shrink-0">
                        {col.shortHeader}:
                      </span>
                      <span className="flex-1">
                        {col.cell
                          ? col.cell(data[expandedRow])
                          : data[expandedRow][col.accessor]}
                      </span>
                    </div>
                  ))}
                </div>

                {actions && (
                  <div className="mt-3 flex justify-center gap-3">
                    {actions(data[expandedRow])}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Table;
