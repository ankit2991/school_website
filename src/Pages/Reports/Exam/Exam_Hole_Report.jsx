import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'
import { getExamHallReport } from '../../../services/api'
import Loader from '../../../Components/Page_Forms/Loader'

function Exam_Hole_Report() {

  const [rowDetailOpen, setRowDetailOpen] = useState(false)
  const [data, setData] = useState([])
  const [searched, setSearched] = useState(false)

  const columns = [
    { header: "Room No.", shortHeader: "Room No.", accessor: "RoomNo" },
    { header: "Total Sheet", shortHeader: "Total Sheet", accessor: "TotalSheet" },
    { header: "Allocate Sheet", shortHeader: "Allocate Sheet", accessor: "Allocatesheet" },
    { header: "Pending", shortHeader: "Pending", accessor: "Pending" },
  ]
  

  // ✅ MOVED OUTSIDE useEffect
  const fetchReport = async () => {
    const instId = localStorage.getItem("InstituteID")
    const sessionId = localStorage.getItem("SessionID")

    if (!instId || !sessionId) return

    try {
      setSearched(true)
      const res = await getExamHallReport(instId, sessionId)
      console.log("Exam Hall Report:", res)

      setData(res?.Table || [])
    } catch (error) {
              console.log("Error:",error);

      setData([])
    } finally {
      setSearched(false)
    }
  }

  // ✅ CALL ON PAGE LOAD
  useEffect(() => {
    fetchReport()
  }, [])

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />

      <div className="flex justify-between items-center gap-x-4 mb-5">
        <Heading label={"Exam Hole Report"} />
      </div>

      <div className="flex justify-between items-center gap-x-4 mb-5">
        <Buttons click={() => setData([])} label={"Clear"} />
        <Buttons click={fetchReport} label={"Search"} />
        
      </div>

      <Table
        columns={columns}
        data={data}
        onRowSelect={() => {}}
        disableFloatingRow={false}
        onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
      />

      {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}

    </div>
  )
}

export default Exam_Hole_Report
