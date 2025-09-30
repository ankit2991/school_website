// import React, { useState } from "react";

// function Table({
//   columns = [],
//   data = [],
//   actions = null,
//   className = "",
//   style,
//   selectable = false,
//   selectedRow = null,
//   onRowSelect = () => {},
// }) {
//   const [expandedRow, setExpandedRow] = useState(null);

//   return (
//     <div
//       className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}
//     >
//       <div
//         className={`overflow-y-auto no-scrollbar ${
//           style || "max-h-[65vh] sm:max-h-[67vh]"
//         }`}
//       >
//         <table className="w-full table-auto border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#df7f6e] via-[#e4321b] to-[#f30202] text-white">
//           {/* <thead className="sticky top-0 z-10 bg-[#414141] text-white"> */}
//             <tr>
//               {columns.map((col, idx) => (
//                 <th key={idx} className="px-4 py-2 text-left truncate">
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
//                 <th className="px-4 py-2 text-center truncate w-32">Actions</th>
//               )}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {data.map((row, rowIndex) => {
//               const isSelected = selectable && selectedRow?.id === row.id;

//               return (
//                 <tr
//                   key={row.id || rowIndex}
//                   className={`
//                     border-b border-slate-300
//                     cursor-pointer
//                     ${isSelected ? "bg-blue-100" : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"}
//                   `}
//                   onClick={() => {
//                     if (selectable) {
//                       onRowSelect(row);
//                     } else {
//                       setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
//                     }
//                   }}
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className="px-3 py-2 text-sm max-[380px]:text-[14px] truncate"
//                     >
//                       {row[col.accessor]}
//                     </td>
//                   ))}

//                   {actions && (
//                     <td className="px-3 py-2 w-32">
//                       <div className="flex justify-center gap-3">{actions(row)}</div>
//                     </td>
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Row Overlay (mobile only if not selectable) */}
//       {!selectable && expandedRow !== null && (
//         <div className="absolute bottom-0 left-0 right-0 bg-white border border-slate-400 rounded-t-lg shadow-2xl z-20 p-3 animate-slide-up md:hidden">
//           <div className="flex justify-between items-center mb-2">
//             <span className="font-bold text-slate-800">Row Details</span>
//             <button
//               className="text-red-600 font-bold"
//               onClick={() => setExpandedRow(null)}
//             >
//               ✕
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//             {columns.map((col, idx) => (
//               <div key={idx} className="flex">
//                 <span className="font-medium">{col.shortHeader}:</span>
//                 <span className="ml-1">{data[expandedRow][col.accessor]}</span>
//               </div>
//             ))}
//           </div>

//           {actions && (
//             <div className="mt-3 flex justify-center gap-3">
//               {actions(data[expandedRow])}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Table;



// import React, { useState } from "react";

// function Table({
//   columns = [],
//   data = [],
//   actions = null,
//   className = "",
//   style,
//   selectable = false,
//   selectedRow = null,
//   onRowSelect = () => {},
// }) {
//   const [expandedRow, setExpandedRow] = useState(null);

//   return (
//     <div
//       className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}
//     >
//       <div
//         className={`overflow-y-auto no-scrollbar ${
//           style || "max-h-[65vh] sm:max-h-[67vh]"
//         }`}
//       >
//         <table className="w-full table-auto border-collapse">
//           {/* Table Header */}
//           <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#df7f6e] via-[#e4321b] to-[#f30202] text-white">
//             <tr>
//               {columns.map((col, idx) => (
//                 <th key={idx} className="px-4 py-2 text-left truncate">
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
//                 <th className="px-4 py-2 text-center truncate w-32">Actions</th>
//               )}
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {data.map((row, rowIndex) => {
//               const isSelected = selectable && selectedRow?.id === row.id;

//               return (
//                 <tr
//                   key={row.id || rowIndex}
//                   className={`
//                     border-b border-slate-300
//                     cursor-pointer
//                     ${
//                       isSelected
//                         ? "bg-blue-100"
//                         : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"
//                     }
//                   `}
//                   onClick={() => {
//                     if (selectable) {
//                       onRowSelect(row);
//                     } else {
//                       setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
//                     }
//                   }}
//                 >
//                   {columns.map((col, colIndex) => (
//                     <td
//                       key={colIndex}
//                       className="px-3 py-2 text-sm max-[380px]:text-[14px] align-top"
//                     >
//                       {/* wrapper div: block + width needed for truncate to work */}
//                       <div
//                         className={`w-full ${col.cellStyle ? col.cellStyle : "truncate"}`}
//                       >
//                         {row[col.accessor]}
//                       </div>
//                     </td>
//                   ))}

//                   {actions && (
//                     <td className="px-3 py-2 w-32">
//                       <div className="flex justify-center gap-3">
//                         {actions(row)}
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Row Overlay (mobile only if not selectable) */}
//       {!selectable && expandedRow !== null && (
//         <div className="absolute bottom-0 left-0 right-0 bg-white border border-slate-400 rounded-t-lg shadow-2xl z-20 p-3 animate-slide-up md:hidden">
//           <div className="flex justify-between items-center mb-2">
//             <span className="font-bold text-slate-800">Row Details</span>
//             <button
//               className="text-red-600 font-bold"
//               onClick={() => setExpandedRow(null)}
//             >
//               ✕
//             </button>
//           </div>

//           {/* use column style here as well; label on left, value on right (value will truncate/wrap per col.cellStyle) */}
//           <div className="flex flex-col gap-y-2 text-sm">
//             {columns.map((col, idx) => (
//               <div key={idx} className="w-full flex items-start gap-2">
//                 <span className="font-medium shrink-0">{col.shortHeader}:</span>
//                 <span
//                   className={`block flex-1 ${
//                     col.cellStyle ? col.cellStyle : "truncate"
//                   }`}
//                 >
//                   {data[expandedRow][col.accessor]}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {actions && (
//             <div className="mt-3 flex justify-center gap-3">
//               {actions(data[expandedRow])}
//             </div>
//           )}
//         </div>
//       )}
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
  selectable = false,
  selectedRow = null,
  onRowSelect = () => {},
  disableFloatingRow = false, // new prop
  onOverlayToggle = () => {}, // callback for overlay open/close
}) {
  const [expandedRow, setExpandedRow] = useState(null);
  const rowRefs = useRef([]);
  const overlayRef = useRef(null);

  // 🔹 Lock/unlock body scroll when overlay is open
  // 🔹 Lock/unlock body scroll when overlay is open (only on small screens)
useEffect(() => {
  if (window.innerWidth < 768) { // mobile only
    document.body.style.overflow = expandedRow !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }
}, [expandedRow]);


  // ✅ Dynamic scroll & overlay toggle callback
  useEffect(() => {
    // Notify parent whether overlay is open
    onOverlayToggle(expandedRow !== null);

    if (expandedRow !== null) {
      const timeout = setTimeout(() => {
        const rowTop =
          rowRefs.current[expandedRow]?.getBoundingClientRect().top +
          window.scrollY;
        const overlayHeight = overlayRef.current?.offsetHeight || 200;
        window.scrollTo({
          top: rowTop - overlayHeight - 20, // 20px padding
          behavior: "smooth",
        });
      }, 50); // wait for overlay to render

      return () => clearTimeout(timeout);
    }
  }, [expandedRow, onOverlayToggle]);

  return (
    <div
      className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}
    >
      <div
        className={`overflow-y-auto no-scrollbar ${
          style || "max-h-[65vh] sm:max-h-[67vh]"
        }`}
      >
        <table className="w-full table-auto border-collapse">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#df7f6e] via-[#e4321b] to-[#f30202] text-white">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-2 text-left truncate">
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
                <th className="px-4 py-2 text-center truncate w-32">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const isSelected = selectable && selectedRow?.id === row.id;

              return (
                // <tr
                //   key={row.id || rowIndex}
                //   ref={(el) => (rowRefs.current[rowIndex] = el)}
                //   className={`border-b border-slate-300 cursor-pointer ${
                //     expandedRow === rowIndex
                //       ? "bg-blue-200"
                //       : isSelected
                //       ? "bg-blue-100"
                //       : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"
                //   }`}
                //   onClick={() => {
                //     if (selectable) {
                //       onRowSelect(row);
                //     } else {
                //       if (!disableFloatingRow) {
                //         setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
                //       } else {
                //         onRowSelect(row);
                //       }
                //     }
                //   }}
                // >
                //   {columns.map((col, colIndex) => (
                //     <td
                //       key={colIndex}
                //       className="px-3 py-2 text-sm max-[380px]:text-[14px] align-top"
                //     >
                //       <div
                //         className={`w-full ${
                //           col.cellStyle ? col.cellStyle : "truncate"
                //         }`}
                //       >
                //         {row[col.accessor]}
                //       </div>
                //     </td>
                //   ))}
                //   {actions && (
                //     <td className="px-3 py-2 w-32">
                //       <div className="flex justify-center gap-3">{actions(row)}</div>
                //     </td>
                //   )}
                // </tr>
                <tr
  key={row.id || rowIndex}
  ref={(el) => (rowRefs.current[rowIndex] = el)}
  className={`border-b border-slate-300 cursor-pointer ${
    // Apply highlight only if mobile screen
    window.innerWidth < 768 && expandedRow === rowIndex
      ? "bg-blue-200"
      : isSelected
      ? "bg-blue-100"
      : "even:bg-[#faefaf] odd:bg-[#fdf8d8]"
  }`}
  onClick={() => {
    if (selectable) {
      onRowSelect(row);
    } else {
      if (!disableFloatingRow) {
        setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
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
        className={`w-full ${col.cellStyle ? col.cellStyle : "truncate"}`}
      >
        {row[col.accessor]}
      </div>
    </td>
  ))}
  {actions && (
    <td className="px-3 py-2 w-32">
      <div className="flex justify-center gap-3">{actions(row)}</div>
    </td>
  )}
</tr>

              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 Floating Row Overlay */}
      {!disableFloatingRow && !selectable && expandedRow !== null && (
        <div
          ref={overlayRef}
          className="fixed inset-x-0 bottom-0 z-50 flex items-end md:hidden"
        >
          <div
            className="w-full bg-white border border-slate-400 rounded-t-lg shadow-2xl overflow-hidden mx-auto"
            style={{ maxWidth: "100%", maxHeight: "40vh" }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b">
              <span className="font-bold text-slate-800">Row Details</span>
              <button
                className="text-red-600 font-bold"
                onClick={() => setExpandedRow(null)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
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
                    <span className="font-medium shrink-0">{col.shortHeader}:</span>
                    <span className={`block flex-1 ${col.cellStyle ? col.cellStyle : ""}`}>
                      {data[expandedRow][col.accessor]}
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


