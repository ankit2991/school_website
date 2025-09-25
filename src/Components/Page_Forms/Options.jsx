import React from 'react'

function Options({label, optionMsg="select ", labelstyle, name, bool = false, style, options=[], onChange, value}) {
  return (
    <div className='flex flex-col w-full'>
        <h2 className={`text-lg font-medium mb-1 text-gray-700 ${labelstyle}`}>{label}</h2>

        <select name={name} disabled={bool} onChange={onChange} value={value} className={`${style} w-full p-2 rounded-lg bg-gray-100 border border-gray-400 
        ${bool ? "bg-gray-200 cursor-not-allowed" : ""} `}>
            <option hidden>{optionMsg} </option>
            {options.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>        
    </div>
  )
}

export default Options