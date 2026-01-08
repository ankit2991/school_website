import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import Buttons from "../../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";
import Table from "../../../Components/Page_Forms/Table";
import { getclass } from "../../../services/api";

function Student_Ledger_Details() {
  const navigate = useNavigate();
  const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
  const columns = [
    { header: "Receipt Date", shortHeader: "Receipt Date", accessor: "rdate" },
    { header: "Receipt No.", shortHeader: "Receipt No.", accessor: "receipt" },
    {
      header: "Particular/Narration",
      shortHeader: "Narration",
      accessor: "nar",
    },
    { header: "Debit", shortHeader: "Debit", accessor: "tot" },
    { header: "Credit", shortHeader: "Credit", accessor: "dis" },
    { header: " Balance", shortHeader: "Balance", accessor: "net" },
  ];

  const data = [
    {
      id: 1,
      rdate: "26-may-2024",
      receipt: "221",
      nar: "Cash",
      tot: "40,000",
      dis: "5,000",
      net: "35,000",
    },
    {
      id: 2,
      rdate: "10-Dec-2023",
      receipt: "222",
      nar: "Cash",
      tot: "40,000",
      dis: "5,000",
      net: "35,000",
    },
    {
      id: 3,
      rdate: "03-feb-2024",
      receipt: "223",
      nar: "Cash",
      tot: "40,000",
      dis: "5,000",
      net: "35,000",
    },
    {
      id: 4,
      rdate: "10-Dec-2025",
      receipt: "224",
      nar: "Cash",
      tot: "40,000",
      dis: "5,000",
      net: "35,000",
    },
    {
      id: 5,
      rdate: "01-jan-2024",
      receipt: "225",
      nar: "Cash",
      tot: "40,000",
      dis: "5,000",
      net: "35,000",
    },
  ];

  // ✅ helper: remove commas before parsing
  const parseAmount = (val) =>
    parseFloat((val || "0").toString().replace(/,/g, "")) || 0;

  // 👉 Calculate totals here
  const totals = data.reduce(
    (acc, row) => {
      acc.tot += parseAmount(row.tot);
      acc.dis += parseAmount(row.dis);
      return acc;
    },
    { tot: 0, dis: 0 }
  );

  // 👉 Add a footer row
  const dataWithFooter = [
    ...data,
    {
      rdate: "TOTAL",
      tot: totals.tot.toLocaleString(),
      dis: totals.dis.toLocaleString(),
      isFooter: true,
    },
  ];

  const [classList, setClassList] = useState([]);
  // useEffect(() => {
  //     const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
  //     if (!instId) return;

  //     async function fetchClasses() {
  //         try {
  //             const res = await getclass(instId);  // ✅ Pass selected Institute ID
  //             setClassList(res.Table || []);
  //         } catch (error) {
  //             console.log("Class API Error:", error);
  //         }
  //     }

  //     fetchClasses();
  // }, []);

  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    if (!instId) return;
    async function fetchClasses() {
      try {
        const res = await getclass(instId);
        // ✅ check API success
        if (res?.Table?.[0]?.ResultCode === "R100") {
          setClassList(res.Table1 || []);
        } else {
          setClassList([]);
        }
      } catch (error) {
        console.log("Class API Error:", error);
        setClassList([]);
      }
    }

    fetchClasses();
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between mb-5">
        <Heading label={"Student Ledger Details"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">
        <Options
          label={"Class"}
          optionMsg="Select Class"
          options={classList.map((item) => item.ClassName)}
        />
        <Options
          label={"Name"}
          optionMsg="Select Name"
          options={["Devika", "Ajay", "Varun", "Digvijay"]}
        />
      </div>

      <div className="flex justify-end mb-5">
        <Buttons click={""} label={"Search"} />
      </div>

      <Table
        columns={columns}
        data={dataWithFooter}
        onRowSelect={() => {}}
        disableFloatingRow={false}
        onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
      />

      <div className="flex justify-center sm:justify-end mt-5">
        <Buttons click={""} label={"Clear"} />
      </div>

      {/* ✅ Dynamic div for spacing */}
      {rowDetailOpen && window.innerWidth < 768 && (
        <div className="h-140"></div>
      )}
    </div>
  );
}

export default Student_Ledger_Details;
