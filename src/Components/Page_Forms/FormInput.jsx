// import React from 'react'

// function FormInput(lableStyel, label, type="text", name, placeholder ) {
//   return (
//    <div className="flex flex-col w-full">
//     <h2 className={`text-md font-medium mb-1 ${lableStyel}  text-gray-700`}>{label}</h2>
//     <input 
//       type={type}
//       placeholder={placeholder} 
//       name={name} 
//       className={` !bg-gray-100 border-2 shadow-2xl/40 w-full h-9  px-4 py-2 rounded-lg border-gray-300 ${style}`} 
//       // className={` w-50 placeholder:text-gray-600 rounded-sm bg-gray-100 border-2 border-gray-400 shadow-2xl/40 p-2`}
//     />      
//    </div>
//   )
// }

// export default FormInput

import React from "react";

function FormInput({
  label,
  labelStyle = "",
  type = "text",
  name,
  placeholder,
  inputStyle = "",
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      <h2
        className={`cursor-default text-md font-medium mb-1 ${labelStyle} text-gray-700`}
      >
        {label}
      </h2>

      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={`w-full bg-gray-100 border border-gray-400 p-2 rounded-lg shadow-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${type === "date" ? "pr-10" : ""} ${inputStyle}`}
        />

        {/* Custom calendar icon only for small screens */}
        {type === "date" && (
          <span className=" md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
            📅
          </span>
        )}
      </div>

      {/* Hide browser's default date icon only on small screens */}
      <style jsx>{`
        @media (max-width: 767px) {
          input[type="date"]::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
          }
          input[type="date"]::-moz-calendar-picker-indicator {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default FormInput;


// import React from "react";

// function FormInput({
//   label,
//   labelStyle = "",
//   type = "text",
//   name,
//   placeholder,
//   inputStyle = "",
//   value,
//   onChange,
// }) {
//   return (
//     <div className="flex flex-col w-full">
//       {/* Label */}
//       <h2
//         className={`cursor-default text-md font-medium mb-1 ${labelStyle} text-gray-700`}
//       >
//         {label}
//       </h2>

//       {/* input wrapper (relative so the icon can be absolute) */}
//       <div className="relative w-full">
//         <input
//           type={type}
//           placeholder={placeholder}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className={`w-full bg-gray-100 border border-gray-400 px-4 py-2 rounded-lg shadow-md 
//             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
//             ${type === "date" ? "pr-10" : ""} ${inputStyle}`}
//         />

//         {/* show custom calendar icon on SMALL screens, hide on md+ */}
//         {type === "date" && (
//           <span className="block md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
//             📅
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FormInput;





