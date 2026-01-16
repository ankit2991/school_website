import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading';
import FormInput from '../../../Components/Page_Forms/FormInput';
import CheckBox from '../../../Components/Page_Forms/CheckBox';
import Buttons from '../../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Table from '../../../Components/Page_Forms/Table';
import Loader from '../../../Components/Page_Forms/Loader';
import { getPLReport } from '../../../services/api';

function Profit_And_Loss() {
    const navigate = useNavigate(); 
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const [date, setDate] = useState(""); 
    const [agree, setAgree] = useState(false); 
    const [tableData, setTableData] = useState([]); 
    const [searched, setSearched] = useState(false); 
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const [showTable, setShowTable] = useState(false); 
    const columns = [
        { header: "Debit", accessor: "dr" }, 
        { header: "Debit Amount", accessor: "dramt" },
        { header: "Credit", accessor: "cr" },
        { header: "Credit Amount", accessor: "cramt" },
    ]; 
    
    /* ================= TOTAL ================= */ 
    const parseAmount = (val) => parseFloat((val || "0").toString().replace(/,/g, "")) || 0; 
    
    const totals = tableData.reduce( 
        (acc, row) => { 
            acc.dramt += parseAmount(row.dramt); 
            acc.cramt += parseAmount(row.cramt); 
            return acc; 
        }, 
        { dramt: 0, cramt: 0 } 
    ); 
    
    const dataWithFooter = [ 
        ...tableData, 
        tableData.length > 0 && { 
            dr: "TOTAL", 
            dramt: totals.dramt.toLocaleString(), 
            cramt: totals.cramt.toLocaleString(), 
            isFooter: true, 
        }, 
    ].filter(Boolean); 
    
    /* ================= DATE FORMATTER ================= */ 
    // INPUT → API 
    const formatDateForApi = (dateStr) => { 
        if (!dateStr) return null; 
        const d = new Date(dateStr); 
        if (isNaN(d)) return null; 
        const day = d.getDate().toString().padStart(2, "0"); 
        const month = d.toLocaleString("en-GB", { month: "short" }); 
        const year = d.getFullYear(); 
        
        return `${day}/${month}/${year}`; // ✅ 07/Jan/2026 
    }; 
    
    /* ================= SEARCH ================= */ 
    const handleSearch = async () => { 
        const apiDate = formatDateForApi(date); 
        if (!apiDate) { 
            alert("Please select date"); 
            return; 
        } 
        
        try { 
            setSearched(true); 
            setShowTable(false); 
            const res = await getPLReport( instId, sessId, apiDate ); 
            const rows = res?.Table || []; 
            // map API keys → table keys 
            const mappedData = rows.map((row, index) => ({ 
                id: index + 1, 
                dr: row.Dr || "-", 
                dramt: row.DrAmount?.toLocaleString() || "0", 
                cr: row.Cr || "-", 
                cramt: row.CrAmount?.toLocaleString() || "0", 
            })); 
            
            setTableData(mappedData); 
            setShowTable(true);
        } catch (err) { 
            console.error(err); 
            alert("Failed to load report"); 
            setShowTable(false);
        } finally { 
            setSearched(false); 
        } 
    }; 
    
    useEffect(() => { 
        if (date) { 
            handleSearch(); // 👈 auto call on date select 
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [date]); 

    /* ================= DATE FORMATTER ================= */ 
    const handleClear = () => { 
        setDate(""); 
        setAgree(false); 
        setTableData([]); 
        setSearched(false); 
        setRowDetailOpen(false); 
        setShowTable(false);
    };


    
    return ( 
        <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
            <Loader show={searched} /> 
            <div className="flex justify-between items-center gap-x-4 mb-5"> 
                <Heading label={"Profit And Loss"}  /> 
            </div> 
            
            {/* Ledger + Dates */} 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full "> 
                <FormInput 
                    label="Date" type="date" value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                /> 
                {/* <CheckBox 
                    label="Consolidated" checked={agree} 
                    onChange={(e) => setAgree(e.target.checked)} 
                /> */} 
            </div> 
            
            <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5"> 
                <Buttons click={handleClear} label={"Clear"} /> 
                <Buttons click={handleSearch} label="Search" /> 
            </div> 
            
            {showTable && ( 
                <Table 
                    columns={columns} data={dataWithFooter} onRowSelect={() => {}} 
                    disableFloatingRow={false} onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
                /> 
            )} 
            
            {/* ✅ Dynamic div for spacing */} 
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>} 
        </div> 
    ) 
} 

export default Profit_And_Loss