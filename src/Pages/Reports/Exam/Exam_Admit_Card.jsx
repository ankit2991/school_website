import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'
import { getAdmitCardReport, getclass, getExamList } from '../../../services/api'
import Loader from '../../../Components/Page_Forms/Loader'

function Exam_Admit_Card() {

  const [agree, setAgree] = useState(false)
  const [rowDetailOpen, setRowDetailOpen] = useState(false)

  const [examlist, setExamList] = useState([])
  const [selectedExamId, setSelectedExamId] = useState("")
  const [classList, setClassList] = useState([])
  const [selectedClassId, setSelectedClassId] = useState("")
  const [marksData, setMarksData] = useState([])
  const [searched, setSearched] = useState(false)
  const [showTable, setShowTable] = useState(false);

  // ✅ SEARCH STATES
  const [searchBy, setSearchBy] = useState("")
  const [searchText, setSearchText] = useState("")

  const columns = [
    { header: "Roll No.", accessor: "RollNo" },
    { header: "Room No.", accessor: "RoomNo" },
    { header: "Name", accessor: "Name" },
    { header: "Father Name", accessor: "FatherName" },
    { header: "Mother Name", accessor: "MotherName" },
    { header: "Class", accessor: "ClassName" },
    { header: "D.O.B.", accessor: "DOB" },
    { header: "Addmission Date", accessor: "AdmissionDate" },
    { header: "Address", accessor: "Address" },
    { header: "Father No.", accessor: "FatherMobile" },
    { header: "Category", accessor: "Category" },
  ]

  // ✅ FETCH CLASSES
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID")
    if (!instId) return

    getclass(instId).then(res => {
      if (res?.Table?.[0]?.ResultCode === "R100") {
        setClassList(res.Table1 || [])
      }
    })
  }, [])

  // ✅ FETCH EXAMS
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID")
    if (!instId) return

    getExamList(instId).then(res => {
      setExamList(res?.Table || [])
    })
  }, [])

  // ✅ FILTER DATA BASED ON SEARCH TYPE
  const filteredData = marksData.filter(row => {
    if (!searchText) return true

    const value = searchText.toLowerCase()

    if (searchBy === "Name") {
      return row?.Name?.toLowerCase().includes(value)
    }

    if (searchBy === "Roll No.") {
      return row?.RollNo?.toString().includes(value)
    }

    return true
  })

  // ✅ SEARCH API
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID")
    const sessionId = localStorage.getItem("SessionID")

    if (!instId || !sessionId || !selectedClassId || !selectedExamId) {
      alert("Please select Class and Exam")
      return
    }

    try {
      setSearched(true); 
      setShowTable(false);
      const res = await getAdmitCardReport(
        instId,
        sessionId,
        selectedClassId,
        selectedExamId
      )
      setMarksData(res?.Table || [])
      setShowTable(true);
    } catch (error) {
    console.error("Error fetching student list:", error);
    setShowTable(false);
  } finally {
      setSearched(false)
    }
  }

  useEffect(() => {
    if (selectedExamId) {
      handleSearch();
    }
  }, [selectedClassId, selectedExamId]);

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />

      <Heading label={"Exam Admit Card"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">

        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={e => setSelectedClassId(e.target.value)}
        />

        <Options
          label="Exam"
          optionMsg="Select Exam"
          options={examlist}
          valueKey="Id"
          labelKey="Name"
          onChange={e => setSelectedExamId(e.target.value)}
        />

        <Options
          label="Search By"
          optionMsg="Select"
          options={["Name", "Roll No."]}
          value={searchBy}
          onChange={e => {
            setSearchBy(e.target.value)
            setSearchText("")
          }}
        />

        {/* ✅ CONDITIONAL INPUT */}
        {searchBy === "Name" && (
          <FormInput
            label="Search By Name"
            placeholder="Enter Name"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        )}

        {searchBy === "Roll No." && (
          <FormInput
            label="Search By Roll No"
            placeholder="Enter Roll No"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        )}

      </div>

      <div className="flex justify-end mb-5">
        <Buttons label={"Search"} click={handleSearch} />
      </div>

      {showTable && (
      <Table
        columns={columns}
        data={filteredData}
        disableFloatingRow={false}
        onOverlayToggle={setRowDetailOpen}
        actions={() => (
          <CheckBox checked={agree} onChange={e => setAgree(e.target.checked)} />
        )}
      />
      )}

      {rowDetailOpen && window.innerWidth < 768 && <div className="h-140"></div>}
    </div>
  )
}

export default Exam_Admit_Card
