import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Options from "../../../Components/Page_Forms/Options";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import Table from "../../../Components/Page_Forms/Table";
import { getclass, getHostelDueReport, getMonthList } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Hostel_Due_Fees() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID"); 
  const sessId = localStorage.getItem("SessionID"); 
  const { classList } = useClassList(); 
  const [selectedClassId, setSelectedClassId] = useState(""); 
  const [monthList, setMonthList] = useState([]); 
  const [selectedMonthId, setSelectedMonthId] = useState(""); 
  const [searched, setSearched] = useState(false);
  const [selectAll, setSelectAll] = useState(false); 
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [tableData, setTableData] = useState([]); 
  const [showTable, setShowTable] = useState(false); 
  const [noData, setNoData] = useState(false); 



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
    { header: "Room No.", shortHeader: "Room No.", accessor: "no" },
    { header: "Total Fees", shortHeader: "Total Fees", accessor: "tot" },
    { header: "Deposit Fees", shortHeader: "Deposit Fees", accessor: "dep" },
    { header: "Due Fees", shortHeader: "Due Fees", accessor: "due" },
  ]; 

  // =================== CHECK BOX (ALL) ====================== 
  const handleSelectAll = (checked) => { 
    setSelectAll(checked); 
    if (checked) { 
      const allIds = tableData.map((item) => item.id); 
      setSelectedStudents(allIds); 
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
      ? prev.filter((item) => item !== id) : [...prev, id] 
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
  
  // =================== SEARCH ====================== 
  const HandleSearch = async () => { 
    if (!selectedMonthId) { 
      alert("Please select Month"); 
      return; 
    } 
    try { 
      setSearched(true); 
      setShowTable(false); 
      setNoData(false); 
      const res = await getHostelDueReport( instId, sessId, selectedClassId || "", selectedMonthId ); 
      if (res?.Table) { 
        const formatted = res.Table.map((item, index) => ({ 
          id: item.Id, serial: index + 1, name: item.Name, class: item.Class, fname: item.FatherName, 
          fno: item.FatherPhone, no: item.RoomNo, tot: item.TotalFess, dep: item.DepositFess, due: item.DueFee, 
        })); 
        
        setTableData(formatted); 
        setSelectedStudents([]); 
        setSelectAll(false); 
        setShowTable(true); 
        setNoData(false); 
      } else { 
        setTableData([]); 
        setNoData(true); 
        setShowTable(false); 
      }
    } catch (error) { 
      console.error("Hostel Due API Error", error); 
      setShowTable(false); 
      setNoData(true); 
    } finally { 
      setSearched(false); 
    } 
  }; 

  useEffect(() => {
  if (selectedMonthId) {
    HandleSearch();
  }
}, [selectedClassId, selectedMonthId]);


  /* ================= DATE FORMATTER ================= */ 
  const handleClear = () => { 
    setSelectedClassId(""); 
    setSelectedMonthId(""); 
    setTableData([]); 
    setSelectedStudents([]); 
    setSelectAll(false); 
  };
  
  return ( 
    <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
      <Loader show={searched}/> 
      <div className="flex justify-between items-center gap-x-4 mb-5"> 
        <Heading 
          label={"Hostel Due Report"} 
          style={"text-[22px] sm:text-3xl"} 
        /> 
        
        {showTable && ( 
          <Buttons 
            click={() => navigate("")} label={"Send SMS"} 
            style="whitespace-nowrap h-10" 
          /> 
        )} 
      </div> 
      
      {/* Ledger + Dates */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full "> 
        <Options  
          label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
          labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
        /> 
        
        <Options 
          label="Month" optionMsg="Select Month" options={monthList} valueKey="ID" 
          labelKey="MonthName" onChange={(e) => setSelectedMonthId(e.target.value)} 
        /> 
      </div>

      <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5"> 
        <Buttons 
          click={handleClear} label={"Clear"} 
        /> 
        
        <Buttons 
          click={HandleSearch} label={"Search"} 
        /> 
      </div> 
      
      {showTable && ( 
        <> 
          <Table 
            columns={columns} data={tableData} disableFloatingRow={false} 
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
          /> 
          
          <div className="flex justify-between sm:justify-end sm:gap-x-5 mt-5"> 
            <Buttons 
              label="Summary Print" click={() => { window.open("/pdf/5HostelReportViewer.pdf", "_blank"); }} 
            /> 
            <Buttons 
              label="Print" click={() => { window.open("/pdf/5HostelReportViewer.pdf", "_blank"); }} 
            /> 
          </div> 
        </> 
      )} 

      {noData && !searched && ( 
        <div className="w-full text-center py-10 text-gray-500 font-semibold"> 
          Data not available 
        </div> 
      )} 

      
      {/* ✅ Dynamic div for spacing */} 
      {rowDetailOpen && window.innerWidth < 768 && ( 
        <div className="h-140"></div> 
      )} 
    </div> 
  ); 
} 

export default Hostel_Due_Fees;
