// import React, { useEffect, useState } from "react";
// import Heading from "../../Components/Page_Forms/Heading";
// import Buttons from "../../Components/Page_Forms/Buttons";
// import FormInput from "../../Components/Page_Forms/FormInput";
// import { useNavigate } from "react-router-dom";
// import Table from "../../Components/Page_Forms/Table";
// import Options from "../../Components/Page_Forms/Options";
// import Loader from "../../Components/Page_Forms/Loader";
// import { getEnquiry } from "../../services/api";
// import useClassList from "../../hooks/useClassList";

// function Enquiry() {
//   const { classList } = useClassList(); // 👈 only use classList
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [enquiryList, setEnquiryList] = useState([]);
//   const [filteredList, setFilteredList] = useState([]);
//   const [studentName, setStudentName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const navigate = useNavigate();
//   const columns = [
//     { header: "Enquiry No.", shortHeader: "Eq. No.", accessor: "enquiryNo" },
//     { header: "Name", shortHeader: "Name", accessor: "name" },
//     { header: "Class", shortHeader: "Class", accessor: "className" },
//   ];

//   // ======================= ENQUIRY ======================= 
//   const fetchEnquiry = async (classId) => {
//   const instId = localStorage.getItem("InstituteID");
//   const sesId = localStorage.getItem("SessionID");

//   if (!classId) return;

//   try {
//     setLoading(true);
//     setSearched(true);

//     const res = await getEnquiry(instId, sesId, classId);

//     if (res?.Table?.[0]?.ResultCode === "R100") {
//       const selectedClass = classList.find(
//         (c) => String(c.Id) === String(classId)
//       );

//       const mappedData = (res.Table1 || []).map((item) => ({
//         id: item.Id,
//         enquiryNo: item.EnquireNo,
//         name: item.Name,
//         className: selectedClass?.ClassName || "",
//       }));

//       setEnquiryList(mappedData);
//       setFilteredList(mappedData);
//     } else {
//       setEnquiryList([]);
//       setFilteredList([]);
//     }
//   } catch (error) {
//     console.log("Enquiry API Error:", error);
//     setEnquiryList([]);
//     setFilteredList([]);
//   } finally {
//     setLoading(false);
//   }
// };
// useEffect(() => {
//   if (selectedClassId) {
//     fetchEnquiry(selectedClassId);
//   }
// }, [selectedClassId]);


//   // ======================= SEARCH ENQUIRY =======================
//   // const handleSearch = async () => {
//   //   const instId = localStorage.getItem("InstituteID");
//   //   const sesId = localStorage.getItem("SessionID");

//   //   if (!selectedClassId) {
//   //     alert("Please select class");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     setSearched(true);
//   //     const res = await getEnquiry(instId, sesId, selectedClassId);

//   //     if (res?.Table?.[0]?.ResultCode === "R100") {
//   //       const selectedClass = classList.find(
//   //         (c) => String(c.Id) === String(selectedClassId)
//   //       );

//   //       const mappedData = (res.Table1 || []).map((item) => ({
//   //         id: item.Id,
//   //         enquiryNo: item.EnquireNo,
//   //         name: item.Name,
//   //         className: selectedClass?.ClassName || "",
//   //       }));

//   //       setEnquiryList(mappedData);
//   //       setFilteredList(mappedData);
//   //     } else {
//   //       setEnquiryList([]);
//   //       setFilteredList([]);
//   //     }
//   //   } catch (error) {
//   //     console.log("Enquiry API Error:", error);
//   //     setEnquiryList([]);
//   //     setFilteredList([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSearch = () => {
//   if (!selectedClassId) {
//     alert("Please select class");
//     return;
//   }
//   fetchEnquiry(selectedClassId);
// };


//   // ======================= NAME FILTER =======================
//   useEffect(() => {
//     const searchText = studentName?.toLowerCase() || "";

//     if (!searchText) {
//       setFilteredList(enquiryList);
//       return;
//     }

//     const filtered = enquiryList.filter((item) => {
//       const name = item?.name ? item.name.toLowerCase() : "";
//       return name.includes(searchText);
//     });

//     setFilteredList(filtered);
//   }, [studentName, enquiryList]);

//   return (
//     <div className="w-full h-full bg-white px-4 py-2">
//       {/* LOADER */}
//       <Loader show={loading} />

//       {/* HEADER */}
//       <div className="flex justify-between mb-5">
//         <Heading label="Enquiry Master" />
//         <Buttons click={() => navigate("/AddEnquiry")} label="Add" />
//       </div>

//       {/* FILTERS */}
//       <div className="grid sm:grid-cols-2 gap-6 mb-5">
//         {/* <Options
//           label="Class"
//           optionMsg="Select Class"
//           options={classList}
//           valueKey="Id"
//           labelKey="ClassName"
//           onChange={(e) => setSelectedClassId(e.target.value)}
//         /> */}

//         <Options
//   label="Class"
//   optionMsg="Select Class"
//   options={classList}
//   valueKey="Id"
//   labelKey="ClassName"
//   onChange={(e) => setSelectedClassId(e.target.value)}
// />


//         <FormInput
//           label="Student Name"
//           value={studentName}
//           onChange={(e) => setStudentName(e.target.value)}
//         />
//       </div>

//       {/* SEARCH BUTTON */}
//       <div className="flex justify-end">
//         <Buttons click={handleSearch} label="Search" />
//       </div>
      
//       {/* ===== Result Section ===== */}
//       {searched && !loading && filteredList.length === 0 && (
//   <p className="text-center text-gray-500 mt-4">
//     No records found
//   </p>
// )}

// {searched && filteredList.length > 0 && (
//   <div className="mt-5">
//     <Table
//       columns={columns}
//       data={filteredList}
//       actions={(row) => (
//         <>
//           {/* Desktop buttons */}
//           <Buttons
//             label="Edit"
//             style="hidden sm:inline"
//             click={() =>
//               navigate("/AddEnquiry", { state: { eqid: row.id } })
//             }
//           />

//           <Buttons
//             label="Print"
//             style="hidden sm:inline"
//             click={() => { window.open("/pdf/1EnqReportViewer.pdf", "_blank"); }}
//           />

//           {/* Mobile icons */}
//           <button
//             className="sm:hidden text-lg pt-2.5"
//             onClick={() =>
//               navigate("/AddEnquiry", { state: { eqid: row.id } })
//             }
//           >
//             ✏️
//           </button>

//           <button
//             className="sm:hidden text-xl pt-2.5"
//             onClick={() => { window.open("/pdf/1EnqReportViewer.pdf", "_blank"); }}
//           >
//             🖨️
//           </button>
//         </>
//       )}
//     />
//   </div>
// )}

//     </div>
//   );
// }

// export default Enquiry;




import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Page_Forms/Table";
import Options from "../../Components/Page_Forms/Options";
import Loader from "../../Components/Page_Forms/Loader";
import { getEnquiry } from "../../services/api";
import useClassList from "../../hooks/useClassList";

function Enquiry() {
  const { classList } = useClassList();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [enquiryList, setEnquiryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [restored, setRestored] = useState(false); // ✅ ADDED

  const navigate = useNavigate();

  const columns = [
    { header: "Enquiry No.", shortHeader: "Eq. No.", accessor: "enquiryNo" },
    { header: "Name", shortHeader: "Name", accessor: "name" },
    { header: "Class", shortHeader: "Class", accessor: "className" },
  ];

  // ======================= RESTORE STATE =======================
  useEffect(() => {
    const savedState = sessionStorage.getItem("enquiryState");
    if (savedState) {
      const data = JSON.parse(savedState);
      setSelectedClassId(data.selectedClassId || "");
      setStudentName(data.studentName || "");
      setEnquiryList(data.enquiryList || []);
      setFilteredList(data.filteredList || []);
      setSearched(data.searched || false);
    }
    setRestored(true); // ✅ ADDED
  }, []);

  // ======================= ENQUIRY =======================
  const fetchEnquiry = async (classId) => {
    const instId = localStorage.getItem("InstituteID");
    const sesId = localStorage.getItem("SessionID");

    if (!classId) return;

    try {
      setLoading(true);
      setSearched(true);

      const res = await getEnquiry(instId, sesId, classId);

      if (res?.Table?.[0]?.ResultCode === "R100") {
        const selectedClass = classList.find(
          (c) => String(c.Id) === String(classId)
        );

        const mappedData = (res.Table1 || []).map((item) => ({
          id: item.Id,
          enquiryNo: item.EnquireNo,
          name: item.Name,
          className: selectedClass?.ClassName || "",
        }));

        setEnquiryList(mappedData);
        setFilteredList(mappedData);
      } else {
        setEnquiryList([]);
        setFilteredList([]);
      }
    } catch (error) {
      console.log("Enquiry API Error:", error);
      setEnquiryList([]);
      setFilteredList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClassId && restored && enquiryList.length === 0) { // ✅ ADDED GUARD
      fetchEnquiry(selectedClassId);
    }
  }, [selectedClassId, restored]); // ✅ restored added

  const handleSearch = () => {
    if (!selectedClassId) {
      alert("Please select class");
      return;
    }
    fetchEnquiry(selectedClassId);
  };

  // ======================= NAME FILTER =======================
  useEffect(() => {
    const searchText = studentName?.toLowerCase() || "";

    if (!searchText) {
      setFilteredList(enquiryList);
      return;
    }

    const filtered = enquiryList.filter((item) =>
      item?.name?.toLowerCase().includes(searchText)
    );

    setFilteredList(filtered);
  }, [studentName, enquiryList]);

  // ======================= SAVE STATE =======================
  useEffect(() => {
    sessionStorage.setItem(
      "enquiryState",
      JSON.stringify({
        selectedClassId,
        studentName,
        enquiryList,
        filteredList,
        searched,
      })
    );
  }, [selectedClassId, studentName, enquiryList, filteredList, searched]);

  return (
    <div className="w-full h-full bg-white px-4 py-2">
      <Loader show={loading} />

      <div className="flex justify-between mb-5">
        <Heading label="Enquiry Master" />
        <Buttons click={() => navigate("/AddEnquiry")} label="Add" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-5">
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          value={selectedClassId}       // ✅ ADDED
          onChange={(e) => setSelectedClassId(e.target.value)}
        />

        <FormInput
          label="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Buttons click={handleSearch} label="Search" />
      </div>

      {searched && !loading && filteredList.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No records found</p>
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
                    navigate("/AddEnquiry", { state: { eqid: row.id } })
                  }
                />

                <Buttons
                  label="Print"
                  style="hidden sm:inline"
                  click={() =>
                    window.open("/pdf/1EnqReportViewer.pdf", "_blank")
                  }
                />
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Enquiry;
