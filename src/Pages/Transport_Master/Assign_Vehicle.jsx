// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Options from "../../Components/Page_Forms/Options";
// import Table from "../../Components/Page_Forms/Table";
// import useClassList from "../../hooks/useClassList"; 
// import { getClassWiseTransportStudentList } from "../../services/api";

// function Assign_Vehicle() {
//   const navigate = useNavigate();
//   const columns = [
//     { header: "Enrollment No.", shortHeader: "En. No.", accessor: "enquiryNo" },
//     { header: "Name", shortHeader: "Name", accessor: "name" },
//     { header: "Status", shortHeader: "Status", accessor: "status" },
//   ];

//   const data = [
//     { id: 1, enquiryNo: "1", name: "Aarav Sharma", status: "Yes" },
//     { id: 2, enquiryNo: "2", name: "Ishita Kapoor", status: "No" },
//     { id: 3, enquiryNo: "3", name: "Rohan Mehta", status: "No" },
//     { id: 4, enquiryNo: "4", name: "Vivaan Patel", status: "Yes" },
//     { id: 5, enquiryNo: "5", name: "Priya Iyer", status: "No" },
//   ];

//   const { classList } = useClassList(); // 👈 only use classList

//   const [selectedClassId, setSelectedClassId] = useState(""); 

//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <div className="flex justify-between mb-5">
//         <Heading label={"Assign Vehicle"} />
//         <Buttons click={() => navigate("/Assign-Vehicle")} label={"Add"} />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//          <Options
//       label="Class"
//       optionMsg="Select Class"
//       options={classList}
//       valueKey="Id"          // 👈 keep as per your API
//       labelKey="ClassName"
//       onChange={(e) => setSelectedClassId(e.target.value)}
//     />
        
//         <FormInput label={"Student Name"} placeholder={"Enter Student Name "} />
//         <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
//       </div>
//       <div className="flex justify-end">
//         <Buttons click={() => navigate("")} label={"Search"} />
//       </div>
//       <div className="mt-5">
//         <Table
//           columns={columns}
//           data={data}
//           actions={(row) => (
//             <>
//               <Buttons
//                 label={"Edit"}
//                 click={() => console.log("Edit:", row)}
//                 style="hidden sm:inline"
//               />
//               <Buttons
//                 label={"Delete"}
//                 click={() => console.log("Print:", row)}
//                 style="hidden sm:inline"
//               />
//               {/* Mobile icons */}
//               <button
//                 className="sm:hidden text-lg pt-2.5"
//                 onClick={() => navigate("/Assign-Vehicle")}
//               >
//                 ✏️
//               </button>
//               <button
//                 className="sm:hidden text-xl pt-2.5"
//                 onClick={() => console.log("Print:", row)}
//               >
//                 🗑️
//               </button>
//             </>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// export default Assign_Vehicle;



import React, { useState, useMemo } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import Table from "../../Components/Page_Forms/Table";
import useClassList from "../../hooks/useClassList";
import { getAssignVehicleDelete, getClassWiseTransportStudentList } from "../../services/api";
import Loader from "../../Components/Page_Forms/Loader";

function Assign_Vehicle() {
  const navigate = useNavigate();
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");

  const { classList } = useClassList();

  const [searched, setSearched] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [tableData, setTableData] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [srNo, setSrNo] = useState("");
  const [showTable, setShowTable] = useState(false);


  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { header: "Enrollment No.", shortHeader: "En. No.", accessor: "enquiryNo" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Status", shortHeader: "Status", accessor: "status" },
  ];

  /* ================= SEARCH HANDLER ================= */
  // const handleSearch = async () => {
  //   if (!selectedClassId) {
  //     alert("Please select class");
  //     return;
  //   }

  //   try {
  //     setSearched(true);

  //     const response = await getClassWiseTransportStudentList(instId, sessId, selectedClassId);

  //     const formattedData = (response?.Table || []).map((item) => ({
  //       id: item.Id,
  //       enquiryNo: item.EnrollmentNo,
  //       name: item.Name,
  //       status: item.SStatus || "No",
  //     }));

  //     setTableData(formattedData);
  //   } catch (error) {
  //     console.error("Error fetching student list:", error);
  //     setTableData([]);
  //   } finally {
  //     setSearched(false);
  //   }
  // };

  const handleSearch = async () => {
  if (!selectedClassId) {
    alert("Please select class");
    return;
  }

  try {
    setSearched(true);
    setShowTable(false); // 🔹 hide before new search

    const response = await getClassWiseTransportStudentList(
      instId,
      sessId,
      selectedClassId
    );

    const formattedData = (response?.Table || []).map((item) => ({
      id: item.Id,
      enquiryNo: item.EnrollmentNo,
      name: item.Name,
      status: item.SStatus || "No",
    }));

    setTableData(formattedData);

    // ✅ show table only if data exists
    if (formattedData.length > 0) {
      setShowTable(true);
    }
  } catch (error) {
    console.error("Error fetching student list:", error);
    setTableData([]);
    setShowTable(false);
  } finally {
    setSearched(false);
  }
};


  /* ================= CLIENT-SIDE FILTER ================= */
  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const matchName = studentName
        ? item.name.toLowerCase().includes(studentName.toLowerCase())
        : true;

      const matchSrNo = srNo
        ? item.enquiryNo?.toString().includes(srNo)
        : true;

      return matchName && matchSrNo;
    });
  }, [tableData, studentName, srNo]);

  /* ================= UI ================= */
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={searched} />

      {/* Header */}
      <div className="flex justify-between mb-5">
        <Heading label={"Assign Vehicle"} />
        <Buttons click={() => navigate("/Assign-Vehicle")} label={"Add"} />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <FormInput
          label={"Student Name"}
          placeholder={"Enter Student Name"}
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

        <FormInput
          label={"Sr. No."}
          placeholder={"Enter Serial No."}
          value={srNo}
          onChange={(e) => setSrNo(e.target.value)}
        />
      </div>

      {/* Search Button */}
      <div className="flex justify-end">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      {/* Table */}
      <div className="mt-5">
        {/* <Table
  columns={columns}
  data={filteredData}
  actions={(row) => {
    const isAssigned = row.status === "Yes";

    return (
      <> */}
        {/* Desktop Buttons */}
        {/* <Buttons
          label={"Add"}
          click={() => {
            if (!isAssigned) {
              navigate("/Assign-Vehicle", {
                state: { studentId: row.id },
              });
            }
          }}
          disabled={isAssigned}
          style={`hidden sm:inline ${isAssigned ? "opacity-50 cursor-not-allowed" : ""}`}
        />

        <Buttons
          label={"Edit"}
          click={() => {
            if (isAssigned) {
              navigate("/Assign-Vehicle", {
                state: { studentId: row.id },
              });
            }
          }}
          disabled={!isAssigned}
          style={`hidden sm:inline ${!isAssigned ? "opacity-50 cursor-not-allowed" : ""}`}
        /> */}

        {/* Mobile Icons */}
        {/* <button
          className={`sm:hidden text-xl pt-2.5 ${
            isAssigned ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isAssigned}
          onClick={() =>
            !isAssigned &&
            navigate("/Assign-Vehicle", {
              state: { studentId: row.id },
            })
          }
        >
          ➕
        </button>

        <button
          className={`sm:hidden text-lg pt-2.5 ${
            !isAssigned ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isAssigned}
          onClick={() =>
            isAssigned &&
            navigate("/Assign-Vehicle", {
              state: { studentId: row.id },
            })
          }
        >
          ✏️
        </button>
      </>
    );
  }}
/> */}
{/* Table (shown only after Search) */}
{showTable && (
  <div className="mt-5">
    <Table
      columns={columns}
      data={filteredData}
      actions={(row) => {
        const isAssigned = row.status === "Yes";

        return (
          <>
            {/* Desktop Buttons */}
            <Buttons
              label={"Add"}
              click={() => {
                if (!isAssigned) {
                  navigate("/Assign-Vehicle", {
                    state: { studentId: row.id },
                  });
                }
              }}
              disabled={isAssigned}
              style={`hidden sm:inline ${
                isAssigned ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />

            <Buttons
              label={"Edit"}
              click={() => {
                if (isAssigned) {
                  navigate("/Assign-Vehicle", {
                    state: { studentId: row.id },
                  });
                }
              }}
              disabled={!isAssigned}
              style={`hidden sm:inline ${
                !isAssigned ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />

            {/* Mobile Icons */}
            <button
              className={`sm:hidden text-xl pt-2.5 ${
                isAssigned ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isAssigned}
              onClick={() =>
                !isAssigned &&
                navigate("/Assign-Vehicle", {
                  state: { studentId: row.id },
                })
              }
            >
              ➕
            </button>

            <button
              className={`sm:hidden text-lg pt-2.5 ${
                !isAssigned ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isAssigned}
              onClick={() =>
                isAssigned &&
                navigate("/Assign-Vehicle", {
                  state: { studentId: row.id },
                })
              }
            >
              ✏️
            </button>
          </>
        );
      }}
    />
  </div>
)}

{showTable && filteredData.length === 0 && (
  <p className="text-center text-red-500 mt-8">
    No students found
  </p>
)}


      </div>
    </div>
  );
}

export default Assign_Vehicle;



// import React, { useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Options from "../../Components/Page_Forms/Options";
// import Table from "../../Components/Page_Forms/Table";
// import useClassList from "../../hooks/useClassList";
// import { getAssignVehicleDelete, getClassWiseTransportStudentList } from "../../services/api";
// import Loader from "../../Components/Page_Forms/Loader";

// function Assign_Vehicle() {
//   const navigate = useNavigate();
//   const instId = localStorage.getItem("InstituteID");
//   const sessId = localStorage.getItem("SessionID"); 
//   const [searched, setSearched] = useState(false); 
//   const { classList } = useClassList();
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [tableData, setTableData] = useState([]);

//   /* ================= TABLE COLUMNS ================= */
//   const columns = [ 
//     {header: "Enrollment No.", shortHeader: "En. No.", accessor: "enquiryNo", }, 
//     {header: "Name", shortHeader: "Name", accessor: "name", }, 
//     {header: "Status", shortHeader: "Status", accessor: "status", }, 
//   ]; 

//   /* ================= STATE ================= */

//   /* ================= SEARCH HANDLER ================= */
//   const handleSearch = async () => {
//     if (!selectedClassId) {
//       alert("Please select class");
//       return;
//     }

//     try { 
//       setSearched(true)
//       const response = await getClassWiseTransportStudentList( instId, sessId, selectedClassId);

//       const formattedData = (response?.Table || []).map((item) => ({
//         id: item.Id,
//         enquiryNo: item.EnrollmentNo,
//         name: item.Name,
//         status: item.SStatus || "No",
//       }));

//       setTableData(formattedData);
//     } catch (error) {
//       console.error("Error fetching student list:", error);
//       setTableData([]);
//     } finally{
//       setSearched(false)
//     }
//   };

   

//   /* ================= UI ================= */
//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <Loader show={searched}/>
//       {/* Header */}
//       <div className="flex justify-between mb-5">
//         <Heading label={"Assign Vehicle"} />
//         <Buttons click={() => navigate("/Assign-Vehicle")} label={"Add"} />
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
//         <Options
//           label="Class"
//           optionMsg="Select Class"
//           options={classList}
//           valueKey="Id"
//           labelKey="ClassName"
//           onChange={(e) => setSelectedClassId(e.target.value)}
//         />

//         <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
//         <FormInput label={"Sr. No."} placeholder={"Enter Serial No."} />
//       </div>

//       {/* Search Button */}
//       <div className="flex justify-end">
//         <Buttons click={handleSearch} label={"Search"} />
//       </div>

//       {/* Table */}
//       <div className="mt-5">
//         <Table
//           columns={columns}
//           data={tableData}
//           actions={(row) => (
//             <>
//               <Buttons
//                 label={"Edit"}
//                 click={() => navigate("/Assign-Vehicle", {state: { studentId: row.id },})}
//                 style="hidden sm:inline"
//               />
//               <Buttons
//                 label={"Delete"}
//                 click={() => handleDelete(row.Id)}
//                 style="hidden sm:inline"
//               />

//               {/* Mobile Icons */}
//               <button
//                 className="sm:hidden text-lg pt-2.5"
//                 onClick={() => navigate("/Assign-Vehicle", {state: { studentId: row.id },})}
//               >
//                 ✏️
//               </button>
//               <button
//                 className="sm:hidden text-xl pt-2.5"
//                 onClick={() => handleDelete(row.Id)}
//               >
//                 🗑️
//               </button>
//             </>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// export default Assign_Vehicle;
