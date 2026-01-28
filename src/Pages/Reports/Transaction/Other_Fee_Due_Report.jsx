import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Options from "../../../Components/Page_Forms/Options";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Table from "../../../Components/Page_Forms/Table";
import { getclass, getFeeLedgerList, getOtherDueReport, getOtherLedgerList } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Other_Fee_Due_Report() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [ledgerList, setLedgerList] = useState([]); 
  const [selectedLedgerId, setSelectedLedgerId] = useState("");
  const [searched, setSearched] = useState(false); 
  const [selectAll, setSelectAll] = useState(false); 
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [tableData, setTableData] = useState([]);
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
    { header: "Serial No.", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Class", shortHeader: "Class", accessor: "class" },
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
    { header: "Mother No.", shortHeader: "Mother No.", accessor: "mno" },
    { header: "Total Fees", shortHeader: "Total Fees", accessor: "tot" },
    { header: "Deposit Fees", shortHeader: "Deposit Fees", accessor: "dep" },
    { header: "Due Fees", shortHeader: "Due Fees", accessor: "due" },
  ];


  // =================== CHECK BOX (ALL) ====================== 
      const handleSelectAll = (checked) => {
  setSelectAll(checked);

  if (checked) {
    setSelectedStudents(tableData.map((item) => item.id));
  } else {
    setSelectedStudents([]);
  }
};

      
      useEffect(() => {
  if (
    tableData.length > 0 &&
    selectedStudents.length === tableData.length
  ) {
    setSelectAll(true);
  } else {
    setSelectAll(false);
  }
}, [selectedStudents, tableData]);
      // =================== CHECK BOX (SELECTED) ====================== 
      const handleRowSelect = (id) => {
  setSelectedStudents((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

  
  // =================== OTHER LEDGER LIST ====================== 
    useEffect(() => { 
      fetchLedgerList(); 
    }, []); 
    
    const fetchLedgerList = async () => { 
      try { 
        const res = await getOtherLedgerList(); 
        if (res?.Table) { 
          setLedgerList(res.Table); 
        } 
      } catch (error) { 
        console.error("Ledger API Error", error); 
      } 
    };

    // =================== SEARCH ====================== 
    const handleSearch = async () => {
  try {
    setSearched(true); 
    setShowTable(false);
    const res = await getOtherDueReport(
      instId,
      sessId,
      selectedClassId || "",
      selectedLedgerId || 0
    );

    if (res?.Table) {
      const formatted = res.Table.map((item, index) => ({
        id: index + 1, // unique id for checkbox
        serial: item.SrNo,
        name: item.Name,
        class: item.Class,
        fname: item.FatherName,
        fno: item.FatherPhone,
        mno: item.MotherPhone || "-",
        tot: item.TotalFess,
        dep: item.DepositFess,
        due: item.DueFee,
      }));

      setTableData(formatted);
      setSelectedStudents([]);
      setSelectAll(false);
      setSearched(true);
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  } catch (error) {
    console.error("Other Due Report Error", error); 
    setShowTable(false);
  } finally {
    setSearched(false);
  }
};


useEffect(() => {
  if (selectedClassId) {
    handleSearch(true); // auto call
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClassId]);


// =================== CLEAR ====================== 
const handleClear = () => {
  setSelectedClassId("");
  setSelectedLedgerId("");
  setTableData([]);
  setSelectedStudents([]);
  setSelectAll(false);
  setSearched(false);
  setShowTable(false);
};



  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />
      <div className="flex justify-between mb-5">
        <Heading label={"Other Fee Due Report"} />
      </div>
      {/* Ledger + Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
        <Options 
          label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
          labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        
        <Options 
          label="Ledger" optionMsg="Select Ledger" options={ledgerList} valueKey="Id" 
          labelKey="Name" onChange={(e) => setSelectedLedgerId(e.target.value)} 
        /> 
      </div>

      <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
        <Buttons click={handleClear} label={"Clear"} />

        <Buttons click={handleSearch} label={"Search"} />

      </div>

      {showTable && ( 
        <> 
          <Table 
            columns={columns} data={tableData} disableFloatingRow={false} 
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
          /> 
          
          <div className="flex justify-between sm:justify-end sm:gap-x-5 mt-5"> 
            <Buttons click={""} label={"Clear"} /> 
            {/* <Buttons label="Summary Print" click={() => { window.open("/pdf/Summary.pdf", "_blank"); }}  />  */}
            <Buttons
  label="Summary Print"
  click={() => {
    navigate("/Other-Due-Summary-Print", {
  state: {
    classId: selectedClassId || "0",
    ledgerId: selectedLedgerId || 0,
  },
});

  }}
/>
          </div> 
        </> 
      )} 

      {/* ✅ Dynamic div for spacing */}
      {rowDetailOpen && window.innerWidth < 768 && (
        <div className="h-140"></div>
      )}
    </div>
  );
}

export default Other_Fee_Due_Report;
