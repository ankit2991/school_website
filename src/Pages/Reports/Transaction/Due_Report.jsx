import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Options from "../../../Components/Page_Forms/Options";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Table from "../../../Components/Page_Forms/Table";
import { getclass, getDueReport, getFeeLedgerList, getMonthList } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Due_Report() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [monthList, setMonthList] = useState([]); 
  const [selectedMonthId, setSelectedMonthId] = useState(""); 
  const [searched, setSearched] = useState(false);
  const [dueData, setDueData] = useState([]); 
  const [selectAll, setSelectAll] = useState(false); 
  const [selectedStudents, setSelectedStudents] = useState([]); 
  const [ledgerList, setLedgerList] = useState([]); 
  const [selectedLedgerId, setSelectedLedgerId] = useState("");
  const [showTable, setShowTable] = useState(false);

  const [agree, setAgree] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
  const columns = [
    { 
      header: ( 
        <CheckBox 
          checked={selectAll} 
          onChange={(e) => handleSelectAll(e.target.checked)} 
        /> 
      ), 
      accessor: "select", 
      cell: (row) => ( 
        <CheckBox 
          checked={selectedStudents.includes(row.id)} 
          onChange={() => handleRowSelect(row.id)} 
        /> 
      ), 
    },
    { header: "No.", accessor: "number" },
    { header: "Serial No.", accessor: "srno" },
    { header: "Name", accessor: "name" },
    { header: "Class", accessor: "class" },
    { header: "Father Name", accessor: "fname" },
    { header: "Father No.",  accessor: "fno" },
    // { header: "Mother No.", accessor: "mno" },
    { header: "Total Fees", accessor: "tot" },
    { header: "Deposit Fees", accessor: "dep" },
    { header: "Due Fees", accessor: "due" },
  ];

  // =================== CHECK BOX (ALL) ====================== 
  const handleSelectAll = (checked) => { 
    setSelectAll(checked); 
    
    if (checked) { 
      const allIds = dueData.map((item) => item.id); 
      setSelectedStudents(allIds); 
    } else { 
      setSelectedStudents([]); 
    } 
  }; 
  
  useEffect(() => { 
    if (dueData.length > 0 && selectedStudents.length === dueData.length) { 
      setSelectAll(true); 
    } else { 
      setSelectAll(false); 
    } 
  }, [selectedStudents, dueData]); 
  
  // =================== CHECK BOX (SELECTED) ====================== 
  const handleRowSelect = (id) => { 
    setSelectedStudents((prev) => prev.includes(id) ? 
      prev.filter((item) => item !== id) : [...prev, id] 
    ); 
  }; 

  // =================== MONTH LIST ====================== 
  useEffect(() => { 
    fetchMonthList(); 
  }, []); 
  
  const fetchMonthList = async () => { 
    try { 
      setSearched(true); 
      const res = await getMonthList(); 
      if (res?.Table) { 
        setMonthList(res.Table); 
      } 
    } catch (error) { 
      console.error("Stop API Error:", error); 
    } finally { 
      setSearched(false); 
    } 
  };
  
  // =================== LEDGER LIST ====================== 
  useEffect(() => { 
    fetchLedgerList(); 
  }, []); 
  
  const fetchLedgerList = async () => { 
    try { 
      const res = await getFeeLedgerList(); 
      if (res?.Table) { 
        setLedgerList(res.Table); 
      } 
    } catch (error) { 
      console.error("Ledger API Error", error); 
    } 
  };



  // =================== SEARCH ====================== 
  const handleSearch = async () => { 
    // if (!selectedClassId) { 
    //   alert("Please select class"); 
    //   return; 
    // } 
    
    try { 
      setSearched(true); 
      setShowTable(false); 
      const res = await getDueReport(
        instId, sessId, selectedClassId || "0", agree ? 1 : 0, selectedMonthId || "", selectedLedgerId || "", 0
      ); 
      if (res?.Table) { 
        const mappedData = res.Table.map((item, index) => ({ 
          id: item.Id, number: index + 1, srno: item.SrNo, name: item.Name, 
          class: item.Class, fname: item.FatherName, fno: item.FatherPhone, 
          mno: item.MotherPhone, tot: item.TotalFess?.toLocaleString(), 
          dep: item.DepositFess?.toLocaleString(), due: item.DueFee?.toLocaleString(), 
        })); 
        
        setDueData(mappedData); 
        setShowTable(true); 
      } else { 
        setDueData([]); 
        setShowTable(false); 
      } 
    } catch (error) { 
      console.error("Due Report API Error", error); 
      setShowTable(false); 
    } finally { 
      setSearched(false); 
    } 
  }; 
  useEffect(() => {
   handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClassId]);
  
  /* ================= CLEAR ================= */ 
  const handleClear = () => { 
    setSelectedClassId(""); 
    setSelectedMonthId(""); 
    setSelectedLedgerId(""); 
    setDueData([]); 
    setSelectedStudents([]); 
    setSelectAll(false); 
    setAgree(false); 
    setAgree2(false); 
    setSearched(false); 
    setShowTable(false); 
  };

  
  return ( 
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
      <Loader show={searched} /> 
      <div className="flex justify-between mb-5"> 
        <Heading label={"Due Report"} /> 
        {showTable && ( 
          <Buttons click={""} label={"Send SMS"} /> 
        )} 
      </div> 
      
      {/* Ledger + Dates */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full"> 
        <Options 
          label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
          labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        
        <Options 
          label="Month" optionMsg="Select Month" options={monthList} valueKey="ID" 
          labelKey="MonthName" onChange={(e) => setSelectedMonthId(e.target.value)} 
        /> 
        
        <Options 
          label="Ledger" optionMsg="Select Ledger" options={ledgerList} valueKey="Id" 
          labelKey="Name" onChange={(e) => setSelectedLedgerId(e.target.value)} 
        /> 
        
        <div className="flex sm:mt-8"> 
          <CheckBox 
            label={"Only Last Balance"} labelClass="text-[20px]" name={""} 
            checked={agree} onChange={(e) => setAgree(e.target.checked)} 
          /> 
        </div> 
      </div> 
      
      <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5"> 
        <Buttons 
          click={handleClear} label={"Clear"} 
        /> 
        <Buttons 
          click={handleSearch} label={"Search"} 
        /> 
      </div> 
      
      {showTable && ( 
        <> 
          <Table 
            columns={columns} data={dueData} onRowSelect={() => {}} 
            disableFloatingRow={false} onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
          /> 
          
          <div className="flex justify-between sm:justify-end sm:gap-x-5 mt-5"> 
            {/* <Buttons 
              click={() => { window.open("/pdf/feedue.pdf", "_blank"); }} label={"Summary Print"} 
            />  */}

            {/* <Buttons
  label="Summary Print"
  click={() => {
    navigate("/Due-Fee-Summary-Print", {
      state: { receipts: dueData }, // 👈 ALL rows
    });
  }}
/> */}
            <Buttons
  label="Summary Print"
  click={() => {
    navigate("/Due-Fee-Summary-Print", {
  state: {
    classId: selectedClassId || "0",
    monthId: selectedMonthId,
    ledgerId: selectedLedgerId,
    lastBalance: agree ? 1 : 0,
  },
});

  }}
/>



            
            {/* <Buttons 
              label="Print" click={() => { window.open("/pdf/feedue.pdf", "_blank"); }} 
              style="whitespace-nowrap h-10" 
            />  */}
            <Buttons
  label="Print"
  click={() => {
    const selected = dueData.filter(d =>
      selectedStudents.includes(d.id)
    );

    // ✅ if nothing selected → send ALL data
    const dataToPrint = selected.length ? selected : dueData;

    navigate("/Due-Fee-Print", {
      state: { receipts: dataToPrint },
    });
  }}
  style="whitespace-nowrap h-10"
/>



          </div> 
        </> 
      )} 
      
      {/* ✅ Dynamic div for spacing */} {rowDetailOpen && window.innerWidth < 768 && ( 
        <div className="h-140"></div> 
      )} 
    </div> 
  ); 
} 

export default Due_Report;
