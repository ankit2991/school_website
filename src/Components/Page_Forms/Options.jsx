// import React from 'react'

// function Options({
//   label, optionMsg = "select ", labelstyle, name, bool = false,
//   style, options = [], onChange, value, valueKey = "Id", labelKey = "Name",
// }) 
// {
//   return (
//     <div className='flex flex-col w-full'>
//       {label && (
//         <h2 className={`text-lg font-medium mb-1 text-gray-700 ${labelstyle}`}>
//           {label}
//         </h2>
//       )}

//       <select
//         name={name}
//         disabled={bool}
//         onChange={onChange}
//         value={value}
//         className={`${style} w-full p-2 rounded-lg bg-gray-100 border border-gray-400 
//         ${bool ? "bg-gray-200 cursor-not-allowed" : ""}`}
//       >
//         <option value="" hidden>
//           {optionMsg}
//         </option>

//         {options.map((opt, i) => (
//           <option
//             key={i}
//             value={typeof opt === "object" ? opt[valueKey] : opt}
//           >
//             {typeof opt === "object" ? opt[labelKey] : opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// export default Options



function Options({
  label,
  optionMsg = "---Select---",
  labelstyle,
  name,
  bool = false,
  style = "",
  options = [],
  onChange,
  value,
  valueKey = "Id",
  labelKey = "Name",
  error, // ✅
}) {
  const hasData = Array.isArray(options) && options.length > 0;
  const isDisabled = bool || !hasData;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <h2 className={`text-md font-medium mb-1 text-gray-700 ${labelstyle}`}>
          {label}
        </h2>
      )}

      <select
        name={name}
        disabled={isDisabled}
        onChange={onChange}
        value={value}
        className={`
          w-full p-1 rounded-lg shadow-md
          border-2 ${error ? "border-red-500" : "border-gray-400"}
          ${isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"}
          focus:outline-none
          ${error ? "focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-blue-500"}
          ${style}
        `}
      >
        {!hasData ? (
          <option value="">No data available</option>
        ) : (
          <option value="" hidden>
            {optionMsg}
          </option>
        )}

        {hasData &&
          options.map((opt, i) => (
            <option
              key={i}
              value={typeof opt === "object" ? opt[valueKey] : opt}
            >
              {typeof opt === "object" ? opt[labelKey] : opt}
            </option>
          ))}
      </select>

      {/* 🔴 ERROR TEXT */}
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error}
        </span>
      )}
    </div>
  );
}

export default Options;




// import React from "react";

// function Options({
//   label,
//   optionMsg = "---Select---",
//   labelstyle,
//   name,
//   bool = false,
//   style,
//   options = [],
//   onChange,
//   value,
//   valueKey = "Id",
//   labelKey = "Name",
//   error,
// }) {
//   const hasData = Array.isArray(options) && options.length > 0;
//   const isDisabled = bool || !hasData;

//   return (
//     <div className="flex flex-col w-full">
//       {label && (
//         <h2 className={`text-md font-medium mb-1 text-gray-700 ${labelstyle}`}>
//           {label}
//         </h2>
//       )}

//       <select
//         name={name}
//         disabled={isDisabled}
//         onChange={onChange}
//         value={value}
//         className={`${style} w-full p-1 rounded-lg border border-gray-400
//           ${isDisabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100"}`}
//       >
//         {/* Default / Status option */}
//         {!hasData ? (
//           <option value="">
//             No data available
//           </option>
//         ) : (
//           <option value="" hidden>
//             {optionMsg}
//           </option>
//         )}

//         {/* Options */}
//         {hasData &&
//           options.map((opt, i) => (
//             <option
//               key={i}
//               value={typeof opt === "object" ? opt[valueKey] : opt}
//             >
//               {typeof opt === "object" ? opt[labelKey] : opt}
//             </option>
//           ))}
//       </select>
//       {/* ✅ ERROR MESSAGE */}
//       {error && (
//         <span className="text-red-500 text-xs mt-1">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// }

// export default Options;