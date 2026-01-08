import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Table from "../../../Components/Page_Forms/Table"; // ✅ Import your Table component
import CheckBox from "../../../Components/Page_Forms/CheckBox"; // if needed
import { useNavigate } from "react-router-dom";
import { getclass } from "../../../services/api";

function Day_Book() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [rowDetailOpen, setRowDetailOpen] = useState(false);

  const columnsCash = [
    { header: "VNo", accessor: "vno" },
    { header: "CrAccount", accessor: "crAccount" },
    { header: "CrAmount", accessor: "crAmount", align: "right" },
    { header: "RNo", accessor: "rno" },
    { header: "DrAccount", accessor: "drAccount" },
    { header: "DrAmount", accessor: "drAmount", align: "right" },
  ];

  // --- Cash in Hand Data ---
  const cashData = [
    {
      vno: "434",
      crAccount: "TUITION FEE[ Jitender ]",
      crAmount: "800",
      rno: "439",
      drAccount: "PREVIOUS DAY BALANCE",
      drAmount: "210961",
    },
    {
      vno: "435",
      crAccount: "TUITION FEE[ JANAK ]",
      crAmount: "4500",
      rno: "439",
      drAccount: "DAY RECEIPT",
      drAmount: "5300",
    },
  ];

  const columnsJournal = [
    { header: "VNo", accessor: "vno" },
    { header: "CrAccount", accessor: "crAccount" },
    { header: "CrAmount", accessor: "crAmount", align: "right" },
    { header: "RNo", accessor: "rno" },
    { header: "DrAccount", accessor: "drAccount" },
    { header: "DrAmount", accessor: "drAmount", align: "right" },
  ];

  // --- Journal Data ---
  const journalData = [
    {
      vno: "439",
      crAccount: "TUITION FEE[ VIDYUT CHAUHAN ]",
      crAmount: "9500",
      rno: "439",
      drAccount: "Enquiry Form Fee[ VIDYUT CHAUHAN ]",
      drAmount: "9500",
    },
    {
      vno: "439",
      crAccount: "TUITION FEE[ VIDYUT CHAUHAN ]",
      crAmount: "9500",
      rno: "439",
      drAccount: "Enquiry Form Fee[ VIDYUT CHAUHAN ]",
      drAmount: "9500",
    },
    {
      vno: "441",
      crAccount: "TUITION FEE[ VIDYUT CHAUHAN ]",
      crAmount: "14800",
      rno: "441",
      drAccount: "Enquiry Form Fee[ VIDYUT CHAUHAN ]",
      drAmount: "14800",
    },
  ];

  // --- Table column definitions ---

  const [classList, setClassList] = useState([]);
  // useEffect(() => {
  //   const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
  //   if (!instId) return;

  //   async function fetchClasses() {
  //     try {
  //       const res = await getclass(instId);  // ✅ Pass selected Institute ID
  //       setClassList(res.Table || []);
  //     } catch (error) {
  //       console.log("Class API Error:", error);
  //     }
  //   }

  //   fetchClasses();
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
      {/* Heading */}
      <div className="flex justify-between mb-5">
        <Heading label={"Day Book Report"} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-x-6 mb-5 w-full">
        <div className="w-full sm:flex-1">
          <Options
            label={"Institute"}
            optionMsg="Select Option"
            options={["Kesharam Memorial Manakchand Public School", "KMMPS"]}
          />
        </div>
        <div className="w-full sm:w-60">
          <Options
            label={"Class"}
            optionMsg="Select Class"
            options={classList.map((item) => item.ClassName)}
          />
        </div>
      </div>

      <div className="flex justify-end mb-5">
        <Buttons click={""} label={"Search"} />
      </div>

      {/* --- Cash in Hand Section --- */}
      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">CASH IN HAND</h2>

        <Table
          columns={columnsCash}
          data={cashData}
          disableFloatingRow={false}
          onRowSelect={() => {}}
          onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
        />
      </div>

      {/* --- Journal Section --- */}
      <div>
        <h2 className="font-bold text-lg mb-2">JOURNAL</h2>
        <Table
          columns={columnsJournal}
          data={journalData}
          disableFloatingRow={false}
          onRowSelect={() => {}}
          onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
        />
      </div>
    </div>
  );
}

export default Day_Book;
