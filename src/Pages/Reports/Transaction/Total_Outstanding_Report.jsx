import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Options from "../../../Components/Page_Forms/Options";
import Table from "../../../Components/Page_Forms/Table";
import CheckBox from "../../../Components/Page_Forms/CheckBox";
import { getclass, getMonthList, getTotalOutStandingReport } from "../../../services/api";
import useClassList from "../../../hooks/useClassList";
import Loader from "../../../Components/Page_Forms/Loader";

function Total_Outstanding_Report() {
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
    { header: "Father Name", shortHeader: "Father Name", accessor: "fname" },
    { header: "Father No.", shortHeader: "Father No.", accessor: "fno" },
    { header: "School Fees", shortHeader: "School Fees", accessor: "tot" },
    { header: "Deposit Fees", shortHeader: "Deposit Fees", accessor: "dep" },
    { header: "Due Fees", shortHeader: "Due Fees", accessor: "due" },
    {
      header: "Transport Fees",
      shortHeader: "Transport Fees",
      accessor: "trans",
    },
    {
      header: "Deposit Transport",
      shortHeader: "Deposit Transport",
      accessor: "deptrans",
    },
    {
      header: "Transport Due",
      shortHeader: "Transport Due",
      accessor: "transdue",
    },
    { header: "Total Fees", shortHeader: "Total Fees", accessor: "totfee" },
    { header: "Total Due", shortHeader: "Total Due", accessor: "totdue" },
  ];
  const data = [
    {
      id: 1,
      serial: "01",
      name: "Ajay",
      fname: "Rman Thakur",
      fno: "1234567890",
      tot: "10,000",
      dep: "1000",
      due: "9000",
      trans: "1000",
      deptrans: "500",
      transdue: "500",
      totfee: "11,000",
      totdue: "9500",
    },
    {
      id: 2,
      serial: "02",
      name: "Ajay",
      fname: "Rman",
      fno: "1234567540",
      tot: "10,000",
      dep: "500",
      due: "9500",
      trans: "1000",
      deptrans: "500",
      transdue: "500",
      totfee: "11,000",
      totdue: "10,000",
    },
    {
      id: 3,
      serial: "03",
      name: "Viren",
      fname: "Devanh Bhalla",
      fno: "1234567890",
      tot: "10,000",
      dep: "600",
      due: "9400",
      trans: "1000",
      deptrans: "500",
      transdue: "500",
      totfee: "11,000",
      totdue: "10,100",
    },
    {
      id: 4,
      serial: "04",
      name: "anuj",
      fname: "aditya",
      fno: "1234567890",
      tot: "10,000",
      dep: "500",
      due: "9500",
      trans: "1000",
      deptrans: "500",
      transdue: "500",
      totfee: "11,000",
      totdue: "10,000",
    },
    {
      id: 5,
      serial: "05",
      name: "somya",
      fname: "Devanh",
      fno: "1234567867",
      tot: "10,000",
      dep: "500",
      due: "9500",
      trans: "1000",
      deptrans: "500",
      transdue: "500",
      totfee: "11,000",
      totdue: "10,000",
    },
  ];
  

  // =================== CHECK BOX (ALL) ====================== 
      const handleSelectAll = (checked) => {
  setSelectAll(checked);

  if (checked) {
    setSelectedStudents(tableData.map((row) => row.id));
  } else {
    setSelectedStudents([]);
  }
};

  
      useEffect(() => {
  if (tableData.length > 0 && selectedStudents.length === tableData.length) {
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
      const handleSearch = async () => {
  if (!selectedClassId || !selectedMonthId) {
    alert("Please select Class and Month");
    return;
  }

  try {
    setSearched(true);
    setShowTable(false);

    const res = await getTotalOutStandingReport(
      instId,
      sessId,
      selectedClassId,
      selectedMonthId
    );

    if (res?.Table) {
      const formattedData = res.Table.map((item, index) => ({
        id: item.Id,
        serial: index + 1,
        name: item.Name,
        fname: item.FatherName,
        fno: item.FatherPhone,
        tot: item.SchoolFees,
        dep: item.DepositFees,
        due: item.DueFee,
        trans: item.TransportFees,
        deptrans: item.DepositTransport,
        transdue: item.TransportDue,
        totfee: item.TotalFees,
        totdue: item.TotalDue,
      }));

      setTableData(formattedData);
      setSelectedStudents([]);
      setSelectAll(false); 
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  } catch (error) {
    console.error("Outstanding API Error:", error); 
    setShowTable(false); 
  } finally {
    setSearched(false);
  }
};

useEffect(() => {
  if (selectedClassId && selectedMonthId) {
    handleSearch(); // 👈 auto API call
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedClassId, selectedMonthId]);

// =================== CLEAR ====================== 
const handleClear = () => {
  setSelectedClassId("");
    setSelectedMonthId("");
    setTableData([]);
    setSelectedStudents([]);
    setSelectAll(false); 
    setShowTable(false);
};






  
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />
      <div className="flex justify-between items-center gap-x-4 mb-5">
        <Heading
          label={"Total Outstanding Report"}
          style={"text-[22px] sm:text-3xl"}
        />
        {showTable && ( 
          <Buttons 
            click={""} label={"Send SMS"} style="whitespace-nowrap h-10" 
          /> 
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
      </div>

      <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
        <Buttons click={handleClear} label={"Clear"} />

        <Buttons click={handleSearch} label={"Search"} />

      </div>

      {showTable && ( 
        <> 
          <Table 
            columns={columns} data={tableData} onRowSelect={() => {}} 
            disableFloatingRow={false} onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
          /> 
          
          <div className="flex justify-between sm:justify-end sm:gap-x-5 mt-5"> 
            <Buttons 
              click={() => { window.open("/pdf/feedue.pdf", "_blank"); }} label={"Summary Print"} 
            /> 
            
            <Buttons 
              label="Print" click={() => { window.open("/pdf/feedue.pdf", "_blank"); }} 
              style="whitespace-nowrap h-10" 
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

export default Total_Outstanding_Report;
