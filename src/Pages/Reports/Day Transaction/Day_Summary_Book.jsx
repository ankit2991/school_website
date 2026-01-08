import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Table from '../../../Components/Page_Forms/Table'

import { getDayBookSummaryReport } from '../../../services/api'

function Day_Summary_Book() {

    const [agree, setAgree] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false)

    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    // ===================== TABLE =====================

    const columns = [
        { header: "Receipt Date", accessor: "date" },
        { header: "Fee Type", accessor: "fee" },
        { header: "Amount", accessor: "amt" },
    ]

    // ===================== DATE FORMAT =====================
    // yyyy-mm-dd → 12/Dec/2026

    const formatDateForAPI = (dateStr) => {
        if (!dateStr) return ""
        const date = new Date(dateStr)

        const day = String(date.getDate()).padStart(2, '0')
        const month = date.toLocaleString('en-US', { month: 'short' })
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }

    // ===================== SEARCH =====================

    const handleSearch = async () => {
        const instId = localStorage.getItem("InstituteID")
        const sessionId = localStorage.getItem("SessionID")

        if (!instId || !sessionId || !fromDate || !toDate) return

        setLoading(true)
        setTableData([])

        try {
            const res = await getDayBookSummaryReport(
                instId,
                sessionId,
                formatDateForAPI(fromDate),
                formatDateForAPI(toDate)
            )

            if (!res?.Table) return

            const formatted = res.Table.map((row) => ({
                date: row.ReceiptDate,
                fee: row.FeeType,
                amt: row.Amount,
            }))

            setTableData(formatted)
        } finally {
            setLoading(false)
        }
    }

    // ===================== CLEAR =====================

    const handleClear = () => {
        setFromDate("")
        setToDate("")
        setAgree(false)
        setTableData([])
    }

    // ===================== UI =====================

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Day Summary Report"} />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput
                    label={"From"}
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <FormInput
                    label={"To"}
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />

                <div className="flex sm:mt-8 hidden">
                    <CheckBox
                        label={"Consolated"}
                        labelClass='text-[20px]'
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                   
                    />
                </div>
            </div>

            <div className="flex justify-end mb-5">
                <Buttons
                    click={handleSearch}
                    label={loading ? "Loading..." : "Search"}
                />
            </div>

            <Table
                columns={columns}
                data={tableData}
                onRowSelect={() => {}}
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
            />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"} click={handleClear} />
            </div>

            {rowDetailOpen && window.innerWidth < 768 && (
                <div className='h-140'></div>
            )}
        </div>
    )
}

export default Day_Summary_Book
