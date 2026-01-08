import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import Buttons from '../../../Components/Page_Forms/Buttons'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Options from '../../../Components/Page_Forms/Options'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Table from '../../../Components/Page_Forms/Table'
import { getclass, getClassWiseStudents } from '../../../services/api'

function Marksheet() {
    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false)
    const [classList, setClassList] = useState([])
    const [selectedClass, setSelectedClass] = useState("")
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        { header: "ID", shortHeader: "ID", accessor: "Id" },
        { header: "Name", shortHeader: "Name", accessor: "Name" },
        { header: "Enrollment No.", shortHeader: "Enrollment No.", accessor: "EnrollmentNo" },
        { header: "Status", shortHeader: "Status", accessor: "SStatus" }
    ]

    // ✅ FETCH CLASSES ON MOUNT
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
                console.log("Class API Error:", error)
                setClassList([])
            }
        }

        fetchClasses()
    }, [])

    // ✅ FETCH STUDENTS ON SHOW BUTTON
    const handleShowStudents = async () => {
        if (!selectedClass) {
            alert("Please select a class")
            return
        }

        const instId = localStorage.getItem("InstituteID")
        const sessionId = localStorage.getItem("SessionID")
        if (!instId || !sessionId) return

        try {
            setLoading(true)
            const res = await getClassWiseStudents(instId, sessionId, selectedClass)
            setStudents(res?.Table || [])
        } catch (error) {
            console.log("Student API Error:", error)
            setStudents([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Due Report"} />
                <Buttons click={() => setStudents([])} label={"Clear"} />
            </div>

            {/* Ledger + Dates */}
            <div className="flex flex-col gap-y-3 mb-5 w-full">
                <CheckBox 
                    label={"Exam"} 
                    labelClass='text-[20px]' 
                    name={""} 
                    checked={agree} 
                    onChange={(e) => setAgree(e.target.checked)} 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6"> 
                    <CheckBox label={"Formative Assignment I"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment II"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment III"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"HalfYearly"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Yearly"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Formative Assignment IV"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"Suppli. Exam"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <CheckBox label={"1st Semester"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                    <Options 
                        label={"Class"} 
                        optionMsg="Select Class" 
                        options={classList} 
                        valueKey="Id" 
                        labelKey="ClassName" 
                        onChange={(e) => setSelectedClass(e.target.value)} 
                    />
                    <div className="flex sm:mt-8">
                        <CheckBox label={"with Practical"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    </div>
                    <FormInput label={"Date"} type='date' />
                </div>
            </div>

            {/* SHOW BUTTON */}
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
                <Buttons click={handleShowStudents} label={loading ? "Loading..." : "Show"} />
                <Buttons click={() => {}} label={"Show Marks"} />
            </div>

            {/* STUDENTS TABLE */}
            <Table 
                columns={columns} 
                data={students} 
                onRowSelect={() => {}} 
                disableFloatingRow={false} 
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => (
                    !row.isFooter && <CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                )}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5">
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons 
          label="Print" 
          click={() => { window.open("/pdf/marksheet.pdf", "_blank"); }} 
         style="whitespace-nowrap h-10" />
                    <Buttons label={"Final Marks Sheet"} />
                </div>
                <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label={"Green Sheet Download"} />
                </div>
            </div>

            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
        </div>
    )
}

export default Marksheet
