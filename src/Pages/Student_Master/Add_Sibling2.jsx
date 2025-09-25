import React from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom'
import Options from '../../Components/Page_Forms/Options'

function Add_Sibling2() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-w-sm h-full px-4 py-2 bg-white flex flex-col ">
      <div className="flex justify-between mb-5">
        <Heading label={"Add Sibling"} />
        <Buttons click={() => navigate("/")} label={"Edit"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput label={"Enrollment Number" }placeholder={"Enter Enrollment No."} />
        <FormInput label={"Name"} placeholder={"Enter Student Name"} />
        <FormInput label={"Father Name"} placeholder={"Enter Father Name"} />
        <FormInput label={"Mother Name" }placeholder={"Enter Mother Name"} />
        <FormInput label={"Date Of Birth"} type="date" placeholder={"Select Date"} />
        <FormInput label={"Date Of Joining"} type="date" placeholder={"Select Date"} />
      </div>

      <div className="self-center p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md w-full lg:w-5xl">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-5 w-full">
          <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
          <Options label={"Student"} name={""} optionMsg="Select Student" options={["Kavya Nair", "Rohan Mehta", "Kunal Yadav", "Priya Iyer"]}/>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-md shadow-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-b from-[#962d1a] via-[#e4321b] to-[#f30202]">
              <tr>
                <th className="text-left p-2 text-white">S.no.</th>
                <th className="text-left p-2 text-white">Student</th>
                <th className="text-left p-2 text-white">Class</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-300 even:bg-amber-100 odd:bg-amber-50">
                <td className="p-2 font-medium">1</td>
                <td className="p-2 font-medium">Vikraman Uday Singh Rajpurohit</td>
                <td className="p-2 font-medium">Seventh</td>
              </tr>
              <tr className="border-b border-slate-300 even:bg-amber-100 odd:bg-amber-50">
                <td className="p-2 font-medium">2</td>
                <td className="p-2 font-medium">Another Student</td>
                <td className="p-2 font-medium">Eighth</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Buttons click={() => navigate("/")} label={"Add"} />            
        </div>
      </div>
      <div className='flex justify-between sm:justify-end py-5 space-x-10'>
        <Buttons click={() => navigate("/")} label={"Cancel"} />
        <Buttons click={() => navigate("/")} label={"Save"} />
      </div>
    </div>
  )
}

export default Add_Sibling2