

// import React from "react"

// function Table({
//     columns = [], // [{ header: "Enquiry No.", shortHeader: "En. No.", accessor: "enqNo" }, ...]
//     data = [], // [{ enqNo: 1, name: "Pradhum", class: "10th" }, ...]
//     actions = null, // optional callback
//     className = "",
//     style,
// }) {
//     return (
//         <div className={`rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}>
//             <div className={`max-h-[65vh] sm:max-h-[67vh] overflow-y-auto no-scrollbar ${style}`}>
//                 <table className="w-full table-fixed border-collapse">
//                     {/* Table Header */}
//                     <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#962d1a] via-[#e4321b] to-[#f30202] text-white">
//                         <tr>
//                             {columns.map((col, idx) => (
//                                 <th key={idx} className="px-4 py-2 text-left truncate" style={{ width: `${100 / (columns.length + (actions ? 1 : 0))}%` }}>
//                                     {col.shortHeader ? (
//                                         <>
//                                             <span className="sm:hidden">{col.shortHeader}</span>
//                                             <span className="hidden sm:inline">{col.header}</span>
//                                         </>
//                                     ) : (
//                                         col.header
//                                     )}
//                                 </th>
//                             ))}
//                             {actions && (
//                                 <th className="px-4 py-2 text-center truncate" style={{ width: `${100 / (columns.length + 1)}%` }}>Actions</th>
//                             )}
//                         </tr>
//                     </thead>
                    
//                     {/* Table Body */}
//                     <tbody>
//                         {data.map((row, rowIndex) => (
//                             <tr key={row.id || rowIndex} className="border-b border-slate-300 even:bg-amber-100 odd:bg-amber-50">
//                                 {columns.map((col, colIndex) => (
//                                     <td key={colIndex} className="px-3 py-2 text-sm max-[380px]:text-[14px] truncate" 
//                                         style={{ width: `${100 / (columns.length + (actions ? 1 : 0))}%` }}
//                                     >
//                                         {row[col.accessor]}
//                                     </td>
//                                 ))}
                                
//                                 {actions && (
//                                     <td className="px-3 py-2" style={{ width: `${100 / (columns.length + 1)}%` }}>
//                                         <div className="flex justify-center gap-3"> {actions(row)} </div>
//                                     </td>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default Table


import React, { useState } from "react";

function Table({
  columns = [],
  data = [],
  actions = null,
  className = "",
  style,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div className={`relative rounded-lg shadow-md border border-slate-300 overflow-hidden ${className} w-full`}>
      <div className={`overflow-y-auto no-scrollbar ${
      style || "max-h-[65vh] sm:max-h-[67vh]"
    }`}>
        {/* <table className="w-full table-fixed border-collapse"> */}
          {/* Table Header */}
          {/* <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#962d1a] via-[#e4321b] to-[#f30202] text-white"> */}
            {/* <tr> */}
              {/* {columns.map((col, idx) => ( */}
                {/* <th */}
                  {/* key={idx} */}
                  {/* className="px-4 py-2 text-left truncate" */}
                  {/* style={{ */}
                    {/* width: `${100 / (columns.length + (actions ? 1 : 0))}%`, */}
                  {/* }} */}
                {/* > */}
                  {/* {col.shortHeader ? ( */}
                    {/* <> */}
                      {/* <span className="sm:hidden">{col.shortHeader}</span> */}
                      {/* <span className="hidden sm:inline">{col.header}</span> */}
                    {/* </> */}
                  {/* ) : ( */}
                    {/* col.header */}
                  {/* )} */}
                {/* </th> */}
              {/* ))} */}
              {/* {actions && ( */}
                {/* <th */}
                  {/* className="px-4 py-2 text-center truncate" */}
                  {/* style={{ width: `${100 / (columns.length + 1)}%` }} */}
                {/* > */}
                  {/* Actions */}
                {/* </th> */}
              {/* )} */}
            {/* </tr> */}
          {/* </thead> */}

          {/* Table Body */}
          {/* <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="border-b border-slate-300 even:bg-amber-100 odd:bg-amber-50 cursor-pointer"
                onClick={() => setExpandedRow(expandedRow === rowIndex ? null : rowIndex)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 py-2 text-sm max-[380px]:text-[14px] truncate"
                    style={{
                      width: `${100 / (columns.length + (actions ? 1 : 0))}%`,
                    }}
                  >
                    {row[col.accessor]}
                  </td>
                ))}

                {actions && (
                  <td
                    className="px-3 py-2"
                    style={{ width: `${100 / (columns.length + 1)}%` }}
                  >
                    <div className="flex justify-center gap-3">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="w-full table-auto border-collapse">
  {/* Table Header */}
  <thead className="sticky top-0 z-10 bg-gradient-to-b from-[#962d1a] via-[#e4321b] to-[#f30202] text-white">
    <tr>
      {columns.map((col, idx) => (
        <th
          key={idx}
          className="px-4 py-2 text-left truncate"
        >
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

  {/* Table Body */}
  <tbody>
    {data.map((row, rowIndex) => (
      <tr
        key={row.id || rowIndex}
        className="border-b border-slate-300 even:bg-amber-100 odd:bg-amber-50 cursor-pointer"
        onClick={() =>
          setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
        }
      >
        {columns.map((col, colIndex) => (
          <td
            key={colIndex}
            className="px-3 py-2 text-sm max-[380px]:text-[14px] truncate"
          >
            {row[col.accessor]}
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
    ))}
  </tbody>
</table>
      </div>
      
      {/* Floating Row Overlay */}
      {expandedRow !== null && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border border-slate-400 rounded-t-lg shadow-2xl z-20 p-3 animate-slide-up md:hidden">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-slate-800">Row Details</span>
            <button className="text-red-600 font-bold" onClick={() => setExpandedRow(null)} > ✕ </button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {columns.map((col, idx) => (
              <div key={idx} className="flex">
                <span className="font-medium">{col.shortHeader}:</span>
                <span className="ml-1">{data[expandedRow][col.accessor]}</span>
              </div>
            ))}
          </div>
          
          {actions && (
            <div className="mt-3 flex justify-center gap-3">{actions(data[expandedRow])}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Table;
