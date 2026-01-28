import { useRef } from "react";

function FormInput({
  label,
  labelStyle = "",
  type = "text",
  as = "input",
  name,
  placeholder,
  inputStyle = "",
  value,
  onChange,
  rows = 4,
  error,
}) {
  const inputRef = useRef(null);

  const openPicker = () => {
    if (
      (type === "date" || type === "time") &&
      inputRef.current?.showPicker
    ) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <h2 className={`text-md font-medium mb-1 text-gray-700 ${labelStyle}`}>
          {label}
        </h2>
      )}

      <div
        className="relative w-full"
        onClick={openPicker}   // ✅ click anywhere
      >
        {as === "textarea" ? (
          <textarea
            name={name}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`
              w-full p-1 rounded-lg shadow-md resize-y bg-gray-100
              border-2 ${error ? "border-red-500" : "border-gray-400"}
              focus:outline-none
              ${error ? "focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-blue-500"}
              ${inputStyle}
            `}
          />
        ) : (
          <input
            ref={inputRef}     // ✅ attach ref
            type={type}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={openPicker} // ✅ keyboard & focus support
            className={`
              w-full p-1 rounded-lg shadow-md bg-gray-100
              border-2 ${error ? "border-red-500" : "border-gray-400"}
              focus:outline-none
              ${error ? "focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-blue-500"}
              ${type === "date" || type === "time" ? "cursor-pointer" : ""}
              ${inputStyle}
            `}
          />
        )}

        {(type === "date" || type === "time") && (
          <span className="md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
            {type === "date" ? "📅" : "⏰"}
          </span>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
}

export default FormInput;






// function FormInput({
//   label,
//   labelStyle = "",
//   type = "text",
//   as = "input",
//   name,
//   placeholder,
//   inputStyle = "",
//   value,
//   onChange,
//   rows = 4,
//   error, // ✅
// }) {
//   return (
//     <div className="flex flex-col w-full">
//       {label && (
//         <h2 className={`text-md font-medium mb-1 text-gray-700 ${labelStyle}`}>
//           {label}
//         </h2>
//       )}

//       <div className="relative w-full">
//         {as === "textarea" ? (
//           <textarea
//             name={name}
//             value={value ?? ""}
//             onChange={onChange}
//             placeholder={placeholder}
//             rows={rows}
//             className={`
//               w-full p-1 rounded-lg shadow-md resize-y bg-gray-100
//               border-2 ${error ? "border-red-500" : "border-gray-400"}
//               focus:outline-none
//               ${error ? "focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-blue-500"}
//               ${inputStyle}
//             `}
//           />
//         ) : (
//           <input
//             type={type}
//             name={name}
//             value={value ?? ""}
//             onChange={onChange}
//             placeholder={placeholder}
//             className={`
//               w-full p-1 rounded-lg shadow-md bg-gray-100
//               border-2 ${error ? "border-red-500" : "border-gray-400"}
//               focus:outline-none
//               ${error ? "focus:ring-2 focus:ring-red-400" : "focus:ring-2 focus:ring-blue-500"}
//               ${type === "date" ? "pr-10" : ""}
//               ${inputStyle}
//             `}
//           />
//         )}

//         {type === "date" && (
//           <span className="md:hidden absolute inset-y-0 right-3 flex items-center text-gray-500 pointer-events-none">
//             📅
//           </span>
//         )}
//       </div>

//       {/* 🔴 ERROR TEXT */}
//       {error && (
//         <span className="text-red-500 text-xs mt-1">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// }

// export default FormInput;

