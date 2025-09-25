import React from 'react'

function CheckBox({label, labelstyle,  name,
  checked = false,
  onChange,
  disabled = false,
  className = "",
  labelClass = "",}) {
  // return (
  //   <div className='w-full flex flex-col'>
  //       <h2 className={`cursor-default text-md font-medium mb-1 ${labelstyle} text-gray-700`}>{label}</h2>

  //        <input
  //       type="checkbox"
  //       name={name}
  //       checked={checked}
  //       onChange={onChange}
  //       disabled={disabled}
  //       className="w-4 h-4 accent-red-600 rounded border-gray-400 cursor-pointer disabled:cursor-not-allowed"
  //     />
  //     {label && <span className={`text-gray-700 text-sm ${labelClass}`}>{label}</span>}
  //   </div>
  // )

  return (
    <label
      className={`cursor-pointer text-md text-gray-700 font-medium mb-1 ${labelstyle} flex items-center gap-2 select-none ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 accent-red-600 rounded border-gray-400 cursor-pointer disabled:cursor-not-allowed"
      />
      {label && <span className={`text-gray-700 text-sm ${labelClass}`}>{label}</span>}
    </label>
  )
}

export default CheckBox