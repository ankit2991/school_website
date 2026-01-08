import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table";
import { getDayBookReport, getinstitute } from "../../../services/api";

function Day_Book() {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  /* ---------- date format: 12/Dec/2026 ---------- */
  const formatDateForAPI = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${d.toLocaleString("en-US", {
      month: "short",
    })}/${d.getFullYear()}`;
  };

  /* ---------- table columns (match API keys) ---------- */
  const columns = [
    { header: "VNo", accessor: "VNo" },
    { header: "Cr Account", accessor: "CrAccount" },
    { header: "Cr Amount", accessor: "CrAmount", align: "right" },
    { header: "RNo", accessor: "RNo" },
    { header: "Dr Account", accessor: "DrAccount" },
    { header: "Dr Amount", accessor: "DrAmount", align: "right" },
    { header: "Voucher Type", accessor: "VoucherType" },
  ];

  /* ---------- load institutes ---------- */
  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const res = await getinstitute();
        setInstitutes(res?.Table1 || []);
      } catch (e) {
        console.log("Institute API error", e);
      }
    }
    fetchInstitutes();
  }, []);

  /* ---------- search ---------- */
  const handleSearch = async () => {
    const sessionId = localStorage.getItem("SessionID");
    if (!selectedInstituteId || !sessionId || !fromDate) return;

    setLoading(true);
    setTableData([]);

    try {
      const res = await getDayBookReport(
        selectedInstituteId,
        sessionId,
        formatDateForAPI(fromDate)
      );

      // ✅ use API data AS-IS
      setTableData(res?.Table || []);
    } catch (e) {
      console.log("DayBook API error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-white px-4 py-2">
      <Heading label="Day Book Report" />

      {/* ---------- Filters ---------- */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-5 w-full">
        <Options
        label="Institute"
          optionMsg="Select Institute"
          options={institutes.map((i) => i.Name)}
          onChange={(e) => {
            const obj = institutes.find(
              (i) => i.Name === e.target.value
            );
            setSelectedInstituteId(obj?.Id || "");
          }}
        />

        <FormInput
          label="Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        
      </div>
       <div className="flex justify-between sm:justify-end sm:gap-x-5 mb-5">
       
        <Buttons
          label={loading ? "Loading..." : "Search"}
          click={handleSearch}
        />
      </div>

      {/* ---------- SINGLE DAY BOOK TABLE ---------- */}
      <Table
        columns={columns}
        data={tableData}
        disableFloatingRow={false}
      />
    </div>
  );
}

export default Day_Book;
