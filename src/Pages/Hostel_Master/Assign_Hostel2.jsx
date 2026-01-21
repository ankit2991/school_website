import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Options from "../../Components/Page_Forms/Options";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Table from "../../Components/Page_Forms/Table";
import Buttons from "../../Components/Page_Forms/Buttons";
import {
    getAssignHostelDelete,
  getAssignHostelDetail,
  getAssignHostelInsertUpdate,
  getHostelProviderList,
  getRoomList,
} from "../../services/api";
import Loader from "../../Components/Page_Forms/Loader";
import { useLocation } from "react-router-dom";

function Assign_Hostel2() {
  const location = useLocation();
  const studid = location.state;
  const [agree, setAgree] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [searched, setSearched] = useState(false);
  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");
  const userId = localStorage.getItem("UserId") 
  const [errors, setErrors] = useState({});


  // =================== SET DATA ======================
  const [formData, setFormData] = useState({
    srno: "",
    name: "",
    fathername: "",
    add: "",
    class: "",
    jdate: "",
    roomno: "",
    hostel: "",
    sdate: "",
    due: "",
    dis: "",
    cost: "",
    isactive: true,
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =================== VALIDATION ====================== 
  const validateForm = () => { 
    const newErrors = {}; 
    
    if (!formData.class) newErrors.class = "Class is required"; 
    if (!formData.roomno) newErrors.roomno = "Room Number is required"; 
    if (!formData.hostel) newErrors.hostel = "Hostel Provider is required"; 
    if (!formData.cost || Number(formData.cost) <= 0) 
      newErrors.cost = "Valid cost is required"; 
    
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0; 
  };

  // =================== ASSIGN HOSTEL DETAIL ======================
const fetchStudentDetails = async () => {
  if (!studid || !instId || !sessId) return;

  try {
    setSearched(true);
    const res = await getAssignHostelDetail(studid, instId, sessId);

    const data = res?.Table?.[0];
    const data2 = res?.Table1?.[0];

    if (data) {
      setFormData(prev => ({
        ...prev,
        srno: data.OldSrno || "",
        name: data.Name || "",
        fathername: data.FatherName || "",
        add: data.Address1 || "",
        class: data.Class || "",
        jdate: apiDateToInput(data.JoinDate),
        cost: data.Cost || "0",
      }));
    }

    if (data2) {
      setFormData(prev => ({
        ...prev,
        roomno: data2.F_RoomMaster || "",
        hostel: data2.F_VehicleProviderMaster || "",
        sdate: apiDateToInput(data2.StopDate),
        due: data2.HostelPreviousDue || "0",
        dis: data2.HostelDiscount || "0",
        isactive: Boolean(data2.IsActive),
        remark: data2.Remark || "",
      }));

      setTableData([{
        Id: data2.Id,
        name: data2.Name || data?.Name || "",
        serial: data2.SRNo || "",
        room: data2.RoomNo || "",
        amount: data2.Amount ?? 0,
        join: apiDateToInput(data2.JoinDate),
        stop: apiDateToInput(data2.StopDate),
        active: data2.IsActive ? "True" : "False",
        provider: data2.HostelProvider || "",
      }]);
    } else {
      setTableData([]);
    }

  } catch (err) {
    console.error(err);
  } finally {
    setSearched(false);
  }
};

useEffect(() => {
  fetchStudentDetails();
}, [studid, instId, sessId]);



  // =================== ROOM LIST ======================
  useEffect(() => {
    async function fetchRoom() {
      try {
        setSearched(true);
        const res = await getRoomList();
        if (res?.Table) {
          setRoomList(res.Table || []);
        }
      } catch (error) {
        console.log("Class API Error:", error);
      } finally {
        setSearched(false);
      }
    }
    fetchRoom();
  }, []);

  // =================== VEHICLE PROVIDER LIST ======================
  useEffect(() => {
    async function fetchVehicleProvider() {
      try {
        setSearched(true);
        const res = await getHostelProviderList(instId, sessId);
        if (res?.Table) {
          setProviderList(res.Table || []);
        }
      } catch (error) {
        console.log("Provider List API Error:", error);
      } finally {
        setSearched(false);
      }
    }
    fetchVehicleProvider();
  }, []);

  /* ================= DATE FORMAT ================= */
  const apiDateToInput = (apiDate) => {
    if (!apiDate) return "";
    const timestamp = parseInt(apiDate.match(/\d+/)[0], 10);
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const inputDateToApi = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!validateForm()) return;
  try {
    setSearched(true);

    const res = await getAssignHostelInsertUpdate(
      tableData?.[0]?.Id || 0,
      studid,
      formData.roomno,
      formData.hostel,
      inputDateToApi(formData.jdate),
      inputDateToApi(formData.sdate),
      formData.isactive ? true : false,
      formData.dis || "0",
      formData.due || "0",
      formData.remark || "",
      userId,
      instId,
      sessId
    );

    const message = res?.Table?.[0]?.Column1;
    if (message) alert(message);

    // ✅ REFRESH UI AFTER SAVE
    await fetchStudentDetails();

  } catch (error) {
    console.error("Save Error:", error);
  } finally {
    setSearched(false);
  }
};

/* ================= Delete ================= */
const handleDelete = async (id) => {
  if (!id) return;

  if (!window.confirm("Are you sure you want to delete this record?")) return;

  try {
    setSearched(true);

    const res = await getAssignHostelDelete(id);

    const message = res?.Table?.[0]?.Column1;
    if (message) alert(message);

    // ✅ Refresh data after delete
    await fetchStudentDetails();

  } catch (error) {
    console.error("Delete Error:", error);
  } finally {
    setSearched(false);
  }
};


  const columns = [
    { header: "Name ", shortHeader: "Name", accessor: "name" },
    { header: "Serial Number", shortHeader: "Serial No.", accessor: "serial" },
    { header: "Room Number", shortHeader: "Room No.", accessor: "room" },
    { header: "Amount", shortHeader: "Amount", accessor: "amount" },
    { header: "Join Date", shortHeader: "Join Date", accessor: "join" },
    { header: "Stop Date", shortHeader: "Stop Date", accessor: "stop" },
    { header: "Is Active", shortHeader: "Is Active", accessor: "active" },
    {
      header: "Hostel Provider",
      shortHeader: "Hostel Provider",
      accessor: "provider",
    },
  ];

  return (
    <div className="w-full h-full bg-white  px-4 py-2 flex flex-col">
      <Loader show={searched} />
      <Heading style={"mb-5"} label={"Assign Hostel"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput
          label={"Sr. No."}
          // name="srno"
          value={formData.srno}
          onChange={handleChange}
        />
        <FormInput
          label={"Name"}
          // name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <FormInput
          label={"Class"}
          // name="class"
          value={formData.class}
          // onChange={handleChange}
          error={errors.class}
  onChange={(e) => {
    handleChange(e);
    if (errors.class) {
      setErrors((prev) => ({ ...prev, class: "" }));
    }
  }}
        />
        <FormInput
          label={"Father Name"}
          // name="fathername"
          value={formData.fathername}
          onChange={handleChange}
        />
        <FormInput
          type="date"
          label="Join Date"
          name="jdate"
          value={formData.jdate}
          onChange={handleChange}
        />
        <Options
          label="Room Number"
          name="roomno"
          value={formData.roomno}
          options={roomList}
          valueKey="Id"
          labelKey="Name"
          // onChange={handleChange}
          error={errors.roomno}
  onChange={(e) => {
    handleChange(e);
    if (errors.roomno) {
      setErrors((prev) => ({ ...prev, roomno: "" }));
    }
  }}
        />
        <Options
          label="Hostel Provider"
          name="hostel"
          value={formData.hostel}
          options={providerList}
          valueKey="Id"
          labelKey="Name"
          // onChange={handleChange}
          error={errors.hostel}
  onChange={(e) => {
    handleChange(e);
    if (errors.hostel) {
      setErrors((prev) => ({ ...prev, hostel: "" }));
    }
  }}
        />
        <FormInput
          type="date"
          label="Stop Date"
          name="sdate"
          value={formData.sdate}
          onChange={handleChange}
        />
        <FormInput
          label={"Previous Due"}
          name="due"
          value={formData.due}
          onChange={handleChange}
        />

        <FormInput
          label={"Discount"}
          name="dis"
          value={formData.dis}
          onChange={handleChange}
        />

        <FormInput
          label={"Cost"}
          // name="cost"
          value={formData.cost}
          // onChange={handleChange}
          error={errors.cost}
  onChange={(e) => {
    handleChange(e);
    if (errors.cost) {
      setErrors((prev) => ({ ...prev, cost: "" }));
    }
  }}
        />
      </div>
      <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
        {/* <CheckBox label={"Is Active"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>  */}
        <CheckBox
          label={"Is Active"}
          checked={formData.isactive}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isactive: e.target.checked,
            }))
          }
        />

        <FormInput
          label={"Remark"}
          name="remark"
          value={formData.remark}
          onChange={handleChange}
        />
      </div>
      <div className="w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 ">
        <Table columns={columns} data={tableData} 
        actions={(row) => (
                        <>
                            <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
                            <button className="sm:hidden text-xl pt-2.5" onClick={() => handleDelete(row.Id)}>🗑️</button>
                        </>
                    )}
        />
      </div>

      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
        <Buttons label={"Cancel"} />
        <Buttons label={"Save"} click={handleSave} />
      </div>
    </div>
  );
}

export default Assign_Hostel2;


// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Options from '../../Components/Page_Forms/Options'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Table from '../../Components/Page_Forms/Table'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { getAssignHostelDetail, getHostelProviderList, getRoomList } from '../../services/api'
// import Loader from '../../Components/Page_Forms/Loader'
// import { useLocation } from 'react-router-dom'

// function Assign_Hostel2() {
//     const location = useLocation() 
//     const studid = location.state 
//     const  [agree, setAgree] = useState(false)
//     const [roomList, setRoomList] = useState([]); 
//     const [providerList, setProviderList] = useState([]); 
//     const [tableData, setTableData] = useState([]); 
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID");


    
//     // =================== SET DATA ====================== 
//     const [formData, setFormData] = useState({
//         srno: "", name: "", fathername: "", add: "", class: "", jdate: "", 
//         roomno: "", hostel: "", sdate: "", due: "", dis: "", cost: "", 
//         isactive: "true", remark: "",
//     }); 
    
//     const handleChange = (e) => { 
//         const { name, value } = e.target; 
//         setFormData((prev) => ({ 
//             ...prev, 
//             [name]: value, 
//         })); 
//     }; 
    
   
    
//     // =================== ASSIGN HOSTEL DETAIL  ====================== 
//     useEffect(() => {
//         if (!studid || !instId || !sessId ) return;
    
//         async function fetchStudentDetails() {
//           try {
//             setSearched(true);
//             const res = await getAssignHostelDetail(studid, instId, sessId,);
    
//             const data = res?.Table?.[0];
//             const data2 = res?.Table1?.[0];
//             if (!data && !data2) return;

//             console.log("data",)
//             setFormData({
//                 srno: data.OldSrno || "", 
//                 name: data.Name || "",
//                 fathername: data.FatherName || "",
//                 add: data.Address1 || "",
//                 class: data.Class || "",
//                 jdate: apiDateToInput(data.JoinDate),
//                 roomno: data2.F_RoomMaster || "",
//                 hostel: data2.F_VehicleProviderMaster || "",
//                 sdate: apiDateToInput(data2.StopDate),
//                 due: data2.HostelPreviousDue || "0",
//                 dis: data2.HostelDiscount || "0",
//                 cost: data.Cost || "0",
//                 isactive: Boolean(data2.IsActive),
//                 remark: data2.Remark || "",
//             }) 

//             const tableRow = {
//   name: data2?.Name || data?.Name || "",
//   serial: data2?.SRNo || "",
//   room: data2?.RoomNo || "",
//   amount: data2?.Amount ?? 0,
//   join: apiDateToInput(data2?.JoinDate),
//   stop: apiDateToInput(data2?.StopDate),
//   active: data2?.IsActive ? "True" : "False",
//   provider: data2?.HostelProvider || "",
// };

// setTableData([tableRow]);
            
//           } catch (err) {
//             console.error("Student Details Error:", err);
//           } finally {
//             setSearched(false);
//           }
//         }
    
//         fetchStudentDetails();
//       }, [studid, instId, sessId,]);

    

//     // =================== ROOM LIST ====================== 
//     useEffect(() => { 
//         async function fetchRoom() { 
//             try { 
//                 setSearched(true); 
//                 const res = await getRoomList(); 
//                 if (res?.Table) { 
//                     setRoomList(res.Table || []) 
//                 } 
//             } catch (error) { 
//                 console.log("Class API Error:", error); 
//             } finally { 
//                 setSearched(false); 
//             } 
//         } 
//         fetchRoom(); 
//     }, []);

//     // =================== VEHICLE PROVIDER LIST ====================== 
//     useEffect(() => { 
//         async function fetchVehicleProvider() { 
//             try { 
//                 setSearched(true); 
//                 const res = await getHostelProviderList(instId, sessId); 
//                 if (res?.Table) { 
//                     setProviderList(res.Table || []) 
//                 } 
//             } catch (error) { 
//                 console.log("Provider List API Error:", error); 
//             } finally { 
//                 setSearched(false); 
//             } 
//         } 
//         fetchVehicleProvider(); 
//     }, []);

//     /* ================= DATE FORMAT ================= */ 
//     const apiDateToInput = (apiDate) => { 
//         if (!apiDate) return ""; 
//         const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//         const d = new Date(timestamp); 
//         return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String( 
//             d.getDate() ).padStart(2, "0")}`;
//   };
  
//   const inputDateToApi = (date) => {
//       if (!date) return "";
//       const d = new Date(date);
//       const day = String(d.getDate()).padStart(2, "0");
//       const month = d.toLocaleString("en-US", { month: "short" });
//       const year = d.getFullYear();
//       return `${day}/${month}/${year}`;
//     }

//     /* ================= SAVE ================= */ 
//     const handleSave = async () => {
//   try {
//     setSearched(true);

//     const res = await getAssignHostelInsertUpdate(
//       tableData?.[0]?.id || 0,        // Id (0 for insert)
//       studid,                         // Student Id
//       formData.roomno,                // RoomId
//       formData.hostel,                // Hostel Provider Id
//       inputDateToApi(formData.jdate), // Join Date
//       inputDateToApi(formData.sdate), // Stop Date
//       formData.isactive ? "1" : "0",  // IsActive
//       formData.dis || "0",            // Discount
//       formData.due || "0",            // Previous Due
//       formData.remark || "",          // Remark
//       localStorage.getItem("UserID"), // UserId
//       instId,                         // InstituteId
//       sessId                          // SessionId
//     );

//     const message = res?.Table?.[0]?.Column1;
//     if (message) {
//       alert(message); // ✅ "Record update Successfully.."
//     }

//   } catch (error) {
//     console.error("Save Error:", error);
//     alert("Something went wrong while saving!");
//   } finally {
//     setSearched(false);
//   }
// };

    


//     const columns = [
//         { header: "Name ",  shortHeader: "Name", accessor: "name" },
//         { header: "Serial Number", shortHeader: "Serial No.", accessor: "serial" },
//         { header: "Room Number", shortHeader: "Room No.", accessor: "room" },
//         { header: "Amount", shortHeader: "Amount", accessor: "amount" },
//         { header: "Join Date", shortHeader: "Join Date", accessor: "join" },
//         { header: "Stop Date", shortHeader: "Stop Date", accessor: "stop" },
//         { header: "Is Active", shortHeader: "Is Active", accessor: "active" },
//         { header: "Hostel Provider", shortHeader: "Hostel Provider", accessor: "provider" },
//     ]

    
    
//     return (
//         <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
//             <Loader show={searched} />
//             <Heading style={"mb-5"} label={"Assign Hostel"}/>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//                 <FormInput 
//                     label={"Sr. No."} name="srno" 
//                     value={formData.srno} onChange={handleChange} 
//                 />
//                 <FormInput 
//                     label={"Name"} name="name" 
//                     value={formData.name} onChange={handleChange} 
//                 />
//                 <FormInput 
//                     label={"Class"} name="class" 
//                     value={formData.class} onChange={handleChange} 
//                 />
//                 <FormInput 
//                     label={"Father Name"} name="fathername" 
//                     value={formData.fathername} onChange={handleChange} 
//                 />
//                 <FormInput type="date" label="Join Date" name="jdate" value={formData.jdate} onChange={handleChange} />
//                 <Options
//           label="Room Number"
//           name="roomno"
//           value={formData.roomno}
//           options={roomList}
//           valueKey="Id"
//           labelKey="Name"
//           onChange={handleChange}
//         />
//                 <Options
//           label="Hostel Provider"
//           name="hostel"
//           value={formData.hostel}
//           options={providerList}
//           valueKey="Id"
//           labelKey="Name"
//           onChange={handleChange}
//         />
//                 <FormInput type="date" label="Stop Date" name="sdate" value={formData.sdate} onChange={handleChange} />
//                 <FormInput
//   label={"Previous Due"}
//   name="due"
//   value={formData.due}
//   onChange={handleChange}
// />

// <FormInput
//   label={"Discount"}
//   name="dis"
//   value={formData.dis}
//   onChange={handleChange}
// />

// <FormInput
//   label={"Cost"}
//   name="cost"
//   value={formData.cost}
//   onChange={handleChange}
// />

//             </div>
//             <div className="w-full gap-6 mb-5 grid grid-cols-1 ">                
//                 {/* <CheckBox label={"Is Active"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>  */}
//                 <CheckBox
//   label={"Is Active"}
//   checked={formData.isactive}
//   onChange={(e) =>
//     setFormData((prev) => ({
//       ...prev,
//       isactive: e.target.checked,
//     }))
//   }
// />

//                 <FormInput 
//                     label={"Remark"} name="remark" 
//                     value={formData.remark} onChange={handleChange} 
//                 />
//             </div>
//             <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '>
//                 <Table columns={columns} data={tableData}/>               
//             </div>           
        
//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
//                 <Buttons label={"Cancel"}/>
//                 <Buttons label={"Save"} onClick={handleSave} />
//             </div>
//         </div>
//     )
// }

// export default Assign_Hostel2