import React from 'react'

function Buttons({style="", type='button', click, label}) {
  return (
    <button className={`${style} bg-[#CC3015] text-white font-medium px-4 py-1 rounded-md`} type={type} onClick={click}>
        {/* {Icon && <Icon className="text-black font-bold" />} */}
        {label}
    </button>
  )
}

export default Buttons