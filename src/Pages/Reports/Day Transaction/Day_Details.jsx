import React, { useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table"; // ✅ use your table
import { useNavigate } from "react-router-dom";

function Day_Details() {
    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);
    const [rowDetailOpen, setRowDetailOpen] = useState(false);

    // Table columns
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

    const data = [
        { id: 1, receipt: "371", rdate: "16-Sep-2025", serial: "1182", name: "DAKSHITA MALI", fname: "MAHESH BAGARI", class: "First", tot: "950", nar: "Cash", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
        { id: 2, receipt: "370", rdate: "16-Sep-2025", serial: "1173", name: "DEVIKA", fname: "DINESH", class: "Nur", tot: "1000", nar: "Cash", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
        { id: 3, receipt: "373", rdate: "16-Sep-2025", serial: "1182", name: "JASMEEN", fname: "SAJID", class: "First", tot: "980", nar: "Online Payment", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
        { id: 4, receipt: "388", rdate: "17-Sep-2025", serial: "111113", name: "Aditya Shad", fname: "Ashutosh Shad", class: "First", tot: "40", nar: "School Fee", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
        { id: 5, receipt: "389", rdate: "17-Sep-2025", serial: "111113", name: "Aditya Shad", fname: "Ashutosh Shad", class: "First", tot: "40", nar: "School Fee", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
        { id: 6, receipt: "400", rdate: "17-Sep-2025", serial: "1182", name: "DAKSHITA MALI", fname: "MAHESH BAGARI", class: "First", tot: "580", nar: "Cash", voucher: "School Fee", inst: "Kesharam Memorial Manakchand Public School", cby: "" },
    ];

    // Helpers
    const parseAmount = (val) =>
        parseFloat((val || "0").toString().replace(/,/g, "")) || 0;

    const groupByDate = (arr) =>
        arr.reduce((acc, item) => {
            if (!acc[item.rdate]) acc[item.rdate] = [];
            acc[item.rdate].push(item);
            return acc;
        },
    {});
    
    const groupedData = groupByDate(data);

    // Flatten into Table-compatible data
    const dataWithFooter = [];
    let grandTotal = 0;

    Object.entries(groupedData).forEach(([date, rows]) => {
        // Date row
        dataWithFooter.push({
            isDateRow: true,
            receipt: date,
        });

        // Normal rows
        rows.forEach((row) => {
            dataWithFooter.push(row);
            grandTotal += parseAmount(row.tot);
        });

        // Subtotal row
        const subtotal = rows.reduce((sum, row) => sum + parseAmount(row.tot), 0);
        dataWithFooter.push({
            isSubtotal: true,
            receipt: "Subtotal",
            tot: subtotal,
        });
    });

    // Grand total row
    dataWithFooter.push({
        isFooter: true,
        receipt: "Grand Total",
        tot: grandTotal,
    });
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Day Book Report"} />
                <Buttons click={""} label={"Print"} />
            </div>
            {/* Ledger + Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <FormInput label={"From"} type="date" />
                <FormInput label={"To"} type="date" />
                <div className="flex gap-x-5 sm:gap-x-0 sm:justify-around lg:mt-8">
                    <CheckBox label={"Tution Fees"} labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                    <CheckBox label={"Consolated"}labelClass='text-[20px]' name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                </div>
            </div>
            
            <div className="flex justify-end mb-5">
                <Buttons click={""} label={"Search"} />
            </div>
            
            {/* ✅ Table component with grouped data */}
            <Table columns={columns} data={dataWithFooter} disableFloatingRow={false} onRowSelect={() => {}} onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                actions={(row) => !row.isFooter && !row.isSubtotal && !row.isDateRow && ( 
                    // hide checkbox on footer/subtotal/date rows
                    <CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                )}
            />
        </div>
    );
}

export default Day_Details;
