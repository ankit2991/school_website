import React from 'react'

function Shortcut({ label, type = "text", placeholder, className = "w-xs" }) {
  return (
     <div className="flex flex-col gap-1">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={`${className} placeholder:text-gray-600 rounded-sm bg-gray-100 border-2 border-gray-400 shadow-2xl/40 p-2`}
      />
    </div>
  )
}

export default Shortcut