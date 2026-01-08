// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Table from "../../Components/Page_Forms/Table";
// import Options from "../../Components/Page_Forms/Options";
// import { getclass } from "../../services/api";

// function Add_Sibling() {
//   const navigate = useNavigate();
//   const columns = [
//     { header: "Enquiry No.", shortHeader: "En. No.", accessor: "enquiryNo" },
//     { header: "Name", accessor: "name" },
//     { header: "Class", accessor: "class" },
//   ];
//   const data = [
//     { id: 1, enquiryNo: "1", name: "Aarav Sharma", class: "First" },
//     { id: 2, enquiryNo: "2", name: "Ishita Kapoor", class: "Prep" },
//     { id: 3, enquiryNo: "3", name: "Rohan Mehta", class: "Fifth" },
//     { id: 4, enquiryNo: "4", name: "Vivaan Patel", class: "NUrsury" },
//     { id: 5, enquiryNo: "5", name: "Priya Iyer", class: "Seventh" },
//     { id: 6, enquiryNo: "6", name: "Kavya Nair", class: "K.G." },
//     { id: 7, enquiryNo: "7", name: "Rajesh Reddy", class: "L.K.G." },
//     { id: 8, enquiryNo: "8", name: "Sneha Das", class: "L.K.G." },
//     { id: 9, enquiryNo: "9", name: "Kunal Yadav", class: "L.K.G." },
//     { id: 10, enquiryNo: "10", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 11, enquiryNo: "11", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 12, enquiryNo: "12", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 13, enquiryNo: "13", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 14, enquiryNo: "14", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 15, enquiryNo: "15", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 16, enquiryNo: "16", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 17, enquiryNo: "17", name: "Meera Choudhary", class: "L.K.G." },
//     { id: 18, enquiryNo: "18", name: "Meera Choudhary", class: "L.K.G." },
//   ];

//   const [classList, setClassList] = useState([]);

//   useEffect(() => {
//   const instId = localStorage.getItem("InstituteID");
//   if (!instId) return;

//   async function fetchClasses() {
//     try {
//       const res = await getclass(instId);

//       // ✅ check API success
//       if (res?.Table?.[0]?.ResultCode === "R100") {
//         setClassList(res.Table1 || []);
//       } else {
//         setClassList([]);
//       }

//     } catch (error) {
//       console.log("Class API Error:", error);
//       setClassList([]);
//     }
//   }

//   fetchClasses();
// }, []);

//   return (
//     <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//       <div className="flex justify-between mb-5">
//         <Heading label={"Add Sibling"} />
//         <Buttons click={() => navigate("/AddSibling")} label={"Add"} />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//         <Options
//           label={"Class"}
//           name={""}
//           optionMsg="Select Class"
//           options={classList.map((item) => item.ClassName)}
//         />
//         <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
//         <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
//       </div>
//       <div className="flex justify-end">
//         <Buttons click={() => navigate("/")} label={"Search"} />
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
//                 label={"Print"}
//                 click={() => console.log("Print:", row)}
//                 style="hidden sm:inline"
//               />
//               {/* Mobile icons */}
//               <button
//                 className="sm:hidden text-lg pt-2.5"
//                 onClick={() => console.log("Edit:", row)}
//               >
//                 ✏️
//               </button>
//               <button
//                 className="sm:hidden text-xl pt-2.5"
//                 onClick={() => console.log("Print:", row)}
//               >
//                 🖨️
//               </button>
//             </>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// export default Add_Sibling;

import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Page_Forms/Table";
import Options from "../../Components/Page_Forms/Options";
import { getStudentList } from "../../services/api";
import useClassList from "../../hooks/useClassList";
import Loader from "../../Components/Page_Forms/Loader";

function Add_Sibling() {
  const { classList } = useClassList();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [srNo, setSrNo] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  const columns = [
    { header: "Serial No.", shortHeader: "Sr. No.", accessor: "SrNo" },
    { header: "Name", accessor: "Name" },
  ];

  /* ================= SEARCH ================= */
  const handleSearch = async () => {
    const instId = localStorage.getItem("InstituteID");
    const sessId = localStorage.getItem("SessionID");

    if (!selectedClassId) {
      alert("Please select class");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      const res = await getStudentList(instId, sessId, selectedClassId);

      if (Array.isArray(res?.Table)) {
        setStudentList(res.Table); // ✅ keep original keys
        setFilteredList(res.Table); // ✅ show immediately
      } else {
        setStudentList([]);
        setFilteredList([]);
      }
    } catch (err) {
      console.log("Student List Error:", err);
      setStudentList([]);
      setFilteredList([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTTER ================= */
  useEffect(() => {
    let result = studentList;
    if (studentName) {
      result = result.filter((item) =>
        item.Name?.toLowerCase().includes(studentName.toLowerCase())
      );
    }

    if (srNo) {
      result = result.filter((item) => item.SrNo?.toString().includes(srNo));
    }

    setFilteredList(result);
  }, [studentName, srNo, studentList]);

  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <Loader show={loading} />
      <div className="flex justify-between mb-5">
        <Heading label={"Add Sibling"} />
        <Buttons click={() => navigate("/AddSibling")} label={"Add"} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
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

      <div className="flex justify-end">
        <Buttons label={"Search"} click={handleSearch} />
      </div>

      {/* ===== Result Section ===== */}
{searched && !loading && filteredList.length === 0 && (
  <p className="text-center text-gray-500 mt-4">
    No records found
  </p>
)}

{searched && filteredList.length > 0 && (
  <div className="mt-5">
    <Table
      columns={columns}
      data={filteredList}
      actions={(row) => (
        <>
          <Buttons
            label="Edit"
            style="hidden sm:inline"
            click={() =>
              navigate("/AddSibling", {
                state: { studId: row.Id },
              })
            }
          />

          <Buttons
            label="Print"
            style="hidden sm:inline"
            click={() => console.log("Print:", row)}
          />

          {/* Mobile */}
          <button
            className="sm:hidden text-lg"
            onClick={() =>
              navigate("/AddSibling", {
                state: { studId: row.Id },
              })
            }
          >
            ✏️
          </button>

          <button
            className="sm:hidden text-xl pt-2.5"
            onClick={() => console.log("Print:", row)}
          >
            🖨️
          </button>
        </>
      )}
    />
  </div>
)}

    </div>
  );
}

export default Add_Sibling;
