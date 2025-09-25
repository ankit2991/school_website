
import React from 'react'

function Heading({style, label}) {
  return (
    <div className={`text-3xl text-[#CC3015] font-bold ${style}`}>{label}</div>
  )
}

export default Heading
