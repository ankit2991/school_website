import React from 'react'

function Heading2({style, label}) {
  return (
    <div className={`cursor-default text-xl font-semibold mb-2 ${style}`}>{label}</div>
  )
}

export default Heading2