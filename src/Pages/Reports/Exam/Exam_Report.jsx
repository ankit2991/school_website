import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Table from '../../../Components/Page_Forms/Table'
import { getclass, getExamList, getExamMarksReport } from '../../../services/api'

function Exam_Report() {

  const [agree, setAgree] = useState(false)
  const [examlist, setExamList] = useState([])
  const [selectedExamId, setSelectedExamId] = useState("")
  const [selectedClassId, setSelectedClassId] = useState("")
  const [loading, setLoading] = useState(false)
  const [marksData, setMarksData] = useState([])
  const [rowDetailOpen, setRowDetailOpen] = useState(false)

  const columns = [
    { header: "ID", shortHeader: "ID", accessor: "Id" },
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "SrNo" },
    { header: "Name", shortHeader: "Name", accessor: "Name" },
    { header: "English", shortHeader: "English", accessor: "ENGLISH" },
    { header: "Hindi", shortHeader: "Hindi", accessor: "HINDI" },
    { header: "Maths", shortHeader: "Maths", accessor: "MATHS" },
    { header: "Drawing", shortHeader: "Drawing", accessor: "DRAWING" },
    { header: "Total Marks", shortHeader: "Total Marks", accessor: "TotalMarks" },
    { header: "Maximum Marks", shortHeader: "Maximum Marks", accessor: "MaximumMarks" },
    { header: "Per Marks", shortHeader: "Per Marks", accessor: "PerMarks" },
    { header: "Grade", shortHeader: "Grade", accessor: "Grade" },
    { header: "Remarks", shortHeader: "Remarks", accessor: "Remarks" },
  ]

  const [classList, setClassList] = useState([])

  useEffect(() => {
    const instId = localStorage.getItem("InstituteID")
    if (!instId) return

    async function fetchClasses() {
      try {
        const res = await getclass(instId)
        if (res?.Table?.[0]?.ResultCode === "R100") {
          setClassList(res.Table1 || [])
        } else {
          setClassList([])
        }
      } catch (error) {
      console.log("Error:",error);
        setClassList([])
      }
    }

    fetchClasses()
  }, [])

  useEffect(() => {
    const instId = localStorage.getItem("InstituteID")
    if (!instId) return

    async function fetchExams() {
      try {
        const res = await getExamList(instId)
        setExamList(res?.Table || [])
      } catch {
        setExamList([])
      }
    }

    fetchExams()
  }, [])

  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID")
    const sessionId = localStorage.getItem("SessionID")

    if (!instId || !sessionId || !selectedClassId || !selectedExamId) {
      alert("Please select Class and Exam")
      return
    }

    try {
      setLoading(true)

      const res = await getExamMarksReport(
        instId,
        sessionId,
        selectedClassId,
        selectedExamId
      )

      console.log("Marks Report:", res)

      // ✅ FIXED HERE
      setMarksData(res?.Table || [])

    } catch (error) {
      setMarksData([])
      console.log("Error:",error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between items-center gap-x-4 mb-5">
        <Heading label={"Exam Report"} />
        <Buttons 
          label="Print" 
          click={() => { window.open("/pdf/1EnqReportViewer.pdf", "_blank"); }} 
         style="whitespace-nowrap h-10" /> 
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <Options
          label="Exam"
          optionMsg="Select Exam"
          options={examlist}
          valueKey="Id"
          labelKey="Name"
          onChange={(e) => setSelectedExamId(e.target.value)}
        />

        <div className="flex sm:mt-8">
          <CheckBox
            label={"with Practical"}
            labelClass='text-[20px]'
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
        </div>
      </div>

      <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
        <Buttons click={""} label={"Clear"} />
        <Buttons
          label={loading ? "Loading..." : "Search"}
          click={handleSearch}
        />
      </div>

      <Table
        columns={columns}
        data={marksData}
        onRowSelect={() => {}}
        disableFloatingRow={false}
        onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
      />


      {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
    </div>
  )
}

export default Exam_Report
