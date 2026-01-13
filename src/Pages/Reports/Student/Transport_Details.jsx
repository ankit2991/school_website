import React, { useEffect, useState } from "react";
import Heading from "../../../Components/Page_Forms/Heading";
import Options from "../../../Components/Page_Forms/Options";
import FormInput from "../../../Components/Page_Forms/FormInput";
import Buttons from "../../../Components/Page_Forms/Buttons";
import Table from "../../../Components/Page_Forms/Table";
import { getFeesDetails, getTransportReportFee } from "../../../services/api";
import Loader from "../../../Components/Page_Forms/Loader";

function Transport_Details() {
  /* ---------------- STATE ---------------- */
  const [classList, setClassList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");

  const [searchBy, setSearchBy] = useState("");
  const [srNo, setSrNo] = useState("");
  const [name, setName] = useState("");

  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [rowDetailOpen, setRowDetailOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { header: "Sr No.", accessor: "serial" },
    { header: "Name", accessor: "name" },
    { header: "Father Name", accessor: "fname" },
    { header: "Mobile No.", accessor: "fno" },
    { header: "Class", accessor: "class" },
    { header: "Route Name", accessor: "route" },
    { header: "Vehicle Stop", accessor: "stop" },
    { header: "Amount", accessor: "amount" },
    { header: "Vehicle Type", accessor: "type" },
    { header: "Vehicle No.", accessor: "no" },
    { header: "Join Date", accessor: "jdate" },
  ];

  /* ---------------- DATE FORMAT (UI ONLY) ---------------- */
  const formatDotNetDate = (dotNetDate) => {
    if (!dotNetDate) return "-";
    const ts = Number(dotNetDate.match(/\d+/)?.[0]);
    return ts ? new Date(ts).toLocaleDateString("en-GB") : "-";
  };

  /* ---------------- FETCH CLASSES & VEHICLES ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    async function fetchData() {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res.Table || []);
        setVehicleList(res.Table3 || []);
      } catch {
        setClassList([]);
        setVehicleList([]);
      }
    }

    fetchData();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      setSearched(true);
      setTableData([]);
      setShowTable(false);

      const res = await getTransportReportFee(
        instId,
        sessionId,
        selectedClassId,
        selectedVehicleId,
        searchBy === "Sr. No." ? srNo : "",
        searchBy === "Name" ? name : ""
      );

      if (Array.isArray(res?.Table)) {
        setTableData(
          res.Table.map((r, index) => ({
            id: r.Id,
            serial: r.OldSrno || index + 1,
            name: r.Name,
            fname: r.FatherName,
            fno: r.FMobileNo,
            class: r.ClassName,
            route: r.RouteName,
            stop: r.VehicleStop,
            amount: r.Amount,
            type: r.VehicleType,
            no: r.VehicleNo,
            jdate: formatDotNetDate(r.JoinDate),
          }))
        );
        setShowTable(true);
      }
    } catch (err) {
      console.error("Transport API Error:", err);
      setTableData([]);
      setShowTable(false);
    } finally {
      setSearched(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />
      <Heading label="Transport Details" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <Options
          label="Vehicle"
          optionMsg="Select Vehicle"
          options={vehicleList}
          valueKey="Id"
          labelKey="VehicleNo"
          onChange={(e) => setSelectedVehicleId(e.target.value)}
        />

        <Options
          label="Search By"
          optionMsg="Select"
          options={["Name", "Sr. No."]}
          value={searchBy}
          onChange={(e) => {
            setSearchBy(e.target.value);
            setSrNo("");
            setName("");
          }}
        />

        {/* CONDITIONAL INPUT */}
        {searchBy === "Sr. No." && (
          <FormInput
            label="Sr No"
            value={srNo}
            onChange={(e) => setSrNo(e.target.value)}
          />
        )}

        {searchBy === "Name" && (
          <FormInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-end mb-5">
        <Buttons label="Search" click={handleSearch} />
      </div>

{showTable && (
      <Table
        columns={columns}
        data={tableData}
        loading={searched}
        onOverlayToggle={setRowDetailOpen}
      />
)}

      {rowDetailOpen && window.innerWidth < 768 && <div className="h-140" />}
    </div>
  );
}

export default Transport_Details;
