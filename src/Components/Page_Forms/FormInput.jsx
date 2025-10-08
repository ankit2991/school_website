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

//       <div className="relative w-full">
//         <input
//           type={type}
//           placeholder={placeholder}
//           name={name}
//           value={value}
//           onChange={onChange}
//           required
//           className={`w-full  bg-gray-100 border border-gray-400 p-2 rounded-lg shadow-md 
//             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
//             ${type === "date" ? "pr-10" : ""} ${inputStyle}`}
//         />

//         {/* Custom calendar icon only for small screens */}
//         {type === "date" && (
//           <span className=" md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
//             📅
//           </span>
//         )}
//       </div>

//       {/* Hide browser's default date icon only on small screens */}
//       <style jsx>{`
//         @media (max-width: 767px) {
//           input[type="date"]::-webkit-calendar-picker-indicator {
//             display: none;
//             -webkit-appearance: none;
//           }
//           input[type="date"]::-moz-calendar-picker-indicator {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default FormInput;


import React from "react";

function FormInput({
  label,
  labelStyle = "",
  type = "text",
  as = "input", // new prop — allows "input" or "textarea"
  name,
  placeholder,
  inputStyle = "",
  value,
  onChange,
  rows = 4, // for textarea height
}) {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <h2
          className={`cursor-default text-md font-medium mb-1 ${labelStyle} text-gray-700`}
        >
          {label}
        </h2>
      )}

      <div className="relative w-full">
        {as === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`w-full bg-gray-100 border border-gray-400 p-2 rounded-lg shadow-md resize-y
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-start align-top ${inputStyle}`}
          />
        ) : (
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
        )}

        {/* Custom calendar icon for date type (mobile only) */}
        {type === "date" && as === "input" && (
          <span className="md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
            📅
          </span>
        )}
      </div>

      {/* Hide browser default date icon on small screens */}
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

