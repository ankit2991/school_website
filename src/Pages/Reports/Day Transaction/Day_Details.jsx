import React, { useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import { useNavigate } from "react-router-dom";

import { getDayBookDetailReport } from "../../../services/api";

function Day_Details() {
    const navigate = useNavigate();

    const [agree, setAgree] = useState(false); // Tuition checkbox
    const [rowDetailOpen, setRowDetailOpen] = useState(false);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    // ===================== TABLE COLUMNS =====================

    const columns = [
        { header: "Receipt No.", accessor: "receipt" },
        { header: "SR.No", accessor: "serial" },
        { header: "Name", accessor: "name" },
        { header: "FatherName", accessor: "fname" },
        { header: "Class Name", accessor: "class" },
        { header: "Amount", accessor: "tot" },
        { header: "Pay Mode", accessor: "nar" },
        { header: "Voucher Type", accessor: "voucher" },
        { header: "Institute", accessor: "inst" },
        { header: "Create By", accessor: "cby" },
    ];

    // ===================== HELPERS =====================

    const formatDateForAPI = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const parseAmount = (val) =>
        parseFloat((val || "0").toString().replace(/,/g, "")) || 0;

    const groupByDate = (arr) =>
        arr.reduce((acc, item) => {
            if (!acc[item.rdate]) acc[item.rdate] = [];
            acc[item.rdate].push(item);
            return acc;
        }, {});

    // ===================== SEARCH =====================

    const handleSearch = async () => {
        const instId = localStorage.getItem("InstituteID");
        const sessionId = localStorage.getItem("SessionID");

        if (!instId || !sessionId || !fromDate || !toDate) return;

        setLoading(true);
        setTableData([]);

        try {
            const res = await getDayBookDetailReport(
                instId,
                sessionId,
                formatDateForAPI(fromDate),
                formatDateForAPI(toDate),
                agree ? 1 : 0
            );

            if (!res?.Table) return;

            // 🔹 API → UI mapping
            const formattedRows = res.Table.map((row) => ({
                receipt: row.Rcptno,
                rdate: row.ReceiptDate,
                serial: row.EnrollmentNo || "",
                name: row.Name,
                fname: row.FatherName || "",
                class: row.ClassName || "",
                tot: row.Amount,
                nar: row.PayMode,
                voucher: row.VoucherType,
                inst: row.Institute,
                cby: "",
            }));

            // ===================== GROUPING + TOTALS =====================

            const grouped = groupByDate(formattedRows);
            const finalData = [];
            let grandTotal = 0;

            Object.entries(grouped).forEach(([date, rows]) => {
                // Date header
                finalData.push({
                    isDateRow: true,
                    receipt: date,
                });

                rows.forEach((row) => {
                    finalData.push(row);
                    grandTotal += parseAmount(row.tot);
                });

                // Subtotal
                const subtotal = rows.reduce(
                    (sum, r) => sum + parseAmount(r.tot),
                    0
                );

                finalData.push({
                    isSubtotal: true,
                    receipt: "Subtotal",
                    tot: subtotal,
                });
            });

            // Grand Total
            finalData.push({
                isFooter: true,
                receipt: "Grand Total",
                tot: grandTotal,
            });

            setTableData(finalData);
        } finally {
            setLoading(false);
        }
    };

    // ===================== CLEAR =====================

    const handleClear = () => {
        setFromDate("");
        setToDate("");
        setAgree(false);
        setTableData([]);
    };

    // ===================== UI =====================

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Day Detail Report"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("")} label={"Print"} style="whitespace-nowrap h-10" />
            </div>

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
                <div className="flex gap-x-5 sm:gap-x-0 sm:justify-around lg:mt-8">
                    <CheckBox
                        label={"Tution Fees"}
                        labelClass="text-[20px]"
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
                disableFloatingRow={false}
                onRowSelect={() => {}}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
                actions={(row) =>
                    !row.isFooter && !row.isSubtotal && !row.isDateRow && (
                        <CheckBox label={""} checked={agree} />
                    )
                }
            />

            {rowDetailOpen && window.innerWidth < 768 && (
                <div className="h-140"></div>
            )}

            <div className="flex justify-center sm:justify-end mt-5">
                <Buttons label={"Clear"} click={handleClear} />
            </div>
        </div>
    );
}

export default Day_Details;

