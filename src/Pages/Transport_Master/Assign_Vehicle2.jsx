// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Options from '../../Components/Page_Forms/Options'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Table from '../../Components/Page_Forms/Table'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { getAssignVehicleDetail, getAssignVehicleInsertUpdate, getRoute, getStopRouteList, getVehicleList, getVehicleTypeList } from '../../services/api'
// import { useLocation } from 'react-router-dom'
// import useClassList from '../../hooks/useClassList'
// import Loader from '../../Components/Page_Forms/Loader'

// function Assign_Vehicle2() {
//     const  [agree, setAgree] = useState(false) 
//     const { classList } = useClassList(); 
//     const {setSelectedClassId} = useState(""); 
//     const [routeList, setRouteList] = useState([]) 
//     const [selectedRouteId, setSelectedRouteId] = useState(null) 
//     const [stopList, setStopList] = useState([]) 
//     const [selectedStopId, setSelectedStopId] = useState(null) 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const location = useLocation(); 
//     const studentId = location.state?.studentId; 
//     const [searched, setSearched] = useState(false); 
//     const [studentInfo, setStudentInfo] = useState({}); 
//     const [vehicleHistory, setVehicleHistory] = useState([]); 
//     const [vehicleTypeList, setVehicleTypeList] = useState([]); 
//     const [vehicleList, setVehicleList] = useState([]); 
//     const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState(""); 
//     const [selectedVehicleId, setSelectedVehicleId] = useState(""); 
    
//     useEffect(() => { 
//         if (!instId || !sessId) return; 
        
//         fetchRoutes(); fetchVehicleTypes(); fetchVehicles(); 
//     }, []); 
    
//     const fetchRoutes = async () => { 
//         try {
//             setSearched(true)
//             const res = await getRoute(instId, sessId)
//             if (res?.Table) {
//                 setRouteList(res.Table)
//             }
//         } catch (error) {
//             console.error("Route API Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     } 
    
//     useEffect(() => { 
//         if (selectedRouteId) { 
//             fetchStops(selectedRouteId) 
//         } else { 
//             setStopList([]) 
//             setSelectedStopId(null) 
//         } 
//     }, [selectedRouteId]) 
    
//     const fetchVehicleTypes = async () => { 
//         try { 
//             setSearched(true)
//             const res = await getVehicleTypeList(instId, sessId); 
//             if (res?.Table) { 
//                 setVehicleTypeList(res.Table); 
//             } 
//         } catch (err) { 
//             console.error("VehicleType API error", err); 
//         } finally {
//             setSearched(false)
//         }
//     }; 
    
//     const fetchVehicles = async () => { 
//         try { 
//             setSearched(true)
//             const res = await getVehicleList(instId, sessId); 
//             if (res?.Table) { 
//                 setVehicleList(res.Table); 
//             } 
//         } catch (err) { 
//             console.error("VehicleList API error", err); 
//         } finally {
//             setSearched(false)
//         }
//     }; 
    
//     const fetchStops = async (routeId) => { 
//         try { 
//             setSearched(true)
//             const res = await getStopRouteList(routeId, instId, sessId) 
//             if (res?.Table) { 
//                 setStopList(res.Table) 
//             } 
//         } catch (error) { 
//             console.error("Stop API Error:", error) 
//         } finally {
//             setSearched(false)
//         }
//     } 
    
//     const columns = [
//         { header: "Join Date",  shortHeader: "Join", accessor: "joinDateInput" },
//         { header: "Pickup Time", shortHeader: "Pickup", accessor: "pickup" },
//         { header: "Return Time", shortHeader: "Return", accessor: "return" },
//         { header: "Route Name", shortHeader: "Route", accessor: "route" },
//         { header: "Vehicle Stop", shortHeader: "Vehicle", accessor: "vehicle" },
//         { header: "Vechile Type", shortHeader: "Type", accessor: "type" },
//         { header: "Vechile Number", shortHeader: "Number", accessor: "no" },
//     ] 
//     useEffect(() => { 
//         if (studentId) { 
//             fetchAssignVehicleDetail(); 
//         } 
//     }, [studentId]); 
    
//     const fetchAssignVehicleDetail = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getAssignVehicleDetail(studentId, instId, sessId); 
//             /* ===== Student Info ===== */ 
//             if (res?.Table?.length) { 
//                 setStudentInfo(res.Table[0]); 
//             } 
            
//             /* ===== Vehicle Assignment (Table1) ===== */ 
//             if (res?.Table1?.length) { 
//                 const row = res.Table1[0]; 
//                 setAgree(!!row.IsActive); // ✅ FIXED 
//                 setSelectedRouteId(row.F_RouteMaster); 
//                 setSelectedStopId(row.F_StopMaster); 
//                 setSelectedVehicleTypeId(row.F_VehicleType); 
//                 setSelectedVehicleId(row.F_VehicleMaster); 
//                 setVehicleHistory([ 
//                     { 
//                         id: row.Id, 
//                         joinDateInput: apiDateToInput(row.JoinDate), 
//                         stopDateInput: apiDateToInput(row.StopDate), 
//                         pickup: formatTime(row.PickupTime), 
//                         return: formatTime(row.ReturnTime), 
//                         route: row.RouteName, 
//                         vehicle: row.StopName, 
//                         type: row.VehicleType, 
//                         no: row.VehicleNo, 
//                     }, 
//                 ]); 
//             } 
//         } catch (err) { 
//             console.error("AssignVehicleDetail API error", err); 
//         } finally { 
//             setSearched(false); 
//         } 
//     }; 
    
//     // INPUT → API (yyyy-mm-dd → dd/Mon/yyyy)  
//     const formatDateForApi = (dateStr) => { 
//         if (!dateStr) return null; 
//         const d = new Date(dateStr); 
//         if (isNaN(d)) return null; 
//         const day = d.getDate().toString().padStart(2, "0"); 
//         const month = d.toLocaleString("en-GB", { month: "short" }); 
//         const year = d.getFullYear(); 
//         return `${day}/${month}/${year}`; // 20/Feb/2025 
//     }; 
    
//     // API → INPUT (/Date(...)\/ → yyyy-mm-dd) 
//     const apiDateToInput = (apiDate) => { 
//         if (!apiDate) return ""; 
//         const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//         const d = new Date(timestamp); 
//         const year = d.getFullYear(); 
//         const month = String(d.getMonth() + 1).padStart(2, "0"); 
//         const day = String(d.getDate()).padStart(2, "0"); 
//         return `${year}-${month}-${day}`; // 2025-02-20 
//     }; 
    
//     const formatTime = (timeStr) => { 
//         if (!timeStr) return ""; 
//         return timeStr.substring(0, 5); // HH:mm 
//     }; 

//     const handleSave = async () => {
//     try {
//         setSearched(true);

//         const payload = {
//             assvehid: vehicleHistory[0]?.id || 0,          // 0 for insert
//             vehid: selectedVehicleId,
//             vehtypeid: selectedVehicleTypeId,
//             stopid: selectedStopId,
//             studid: studentId,
//             routeid: selectedRouteId,
//             Ptime: vehicleHistory[0]?.pickup,
//             Rtime: vehicleHistory[0]?.return,
//             jdate: formatDateForApi(vehicleHistory[0]?.joinDateInput),
//             sdate: formatDateForApi(vehicleHistory[0]?.stopDateInput),
//             active: agree ? 1 : 0,
//             userid: 1, // 🔴 replace with logged-in user id
//             insid: instId,
//             sessid: sessId,
//         };

//         const res = await getAssignVehicleInsertUpdate(
//             payload.assvehid,
//             payload.vehid,
//             payload.vehtypeid,
//             payload.stopid,
//             payload.studid,
//             payload.routeid,
//             payload.Ptime,
//             payload.Rtime,
//             payload.jdate,
//             payload.sdate,
//             payload.active,
//             payload.userid,
//             payload.insid,
//             payload.sessid
//         );

//         if (res?.Table?.length) {
//             alert(res.Table[0].Column1); // ✅ "Record update Successfully"
//             fetchAssignVehicleDetail(); // refresh data
//         }

//     } catch (error) {
//         console.error("Save Assign Vehicle Error", error);
//     } finally {
//         setSearched(false);
//     }
// };

// const updateVehicleHistory = (key, value) => {
//     setVehicleHistory(prev => {
//         const data = [...prev];
//         if (!data.length) data.push({});
//         data[0] = { ...data[0], [key]: value };
//         return data;
//     });
// };

    
//     return ( 
//         <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'> 
//             <Loader show={searched}/> 
//             <Heading style={"mb-5"} label={"Assign Vehicle"}/> 
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 
//                 <Options 
//                     label="Class" optionMsg="Select Class" options={classList} valueKey="Id" 
//                     labelKey="ClassName" onChange={(e) => setSelectedClassId(e.target.value)} 
//                 /> 
//                 <FormInput 
//                     label={"Name"} value={studentInfo?.Name || ""} 
//                 /> 
//                 <FormInput 
//                     label={"Sr. No."} value={studentInfo?.EnrollmentNo || ""} 
//                 /> 
//                 <FormInput 
//                     label={"Father Name"} value={studentInfo?.FatherName || ""} 
//                 /> 
//                 <FormInput 
//                     label="Join Date" type="date" 
//                     value={vehicleHistory[0]?.joinDateInput || ""} 
//                 /> 
//                 <Options 
//                     label="Route" optionMsg="Select Route" options={routeList} 
//                     valueKey="Id" labelKey="RouteName" value={selectedRouteId} 
//                     onChange={(e) => setSelectedRouteId(e.target.value)} 
//                 /> 
//                <FormInput 
//     label={"Pickup Time"} 
//     type="time" 
//     value={vehicleHistory[0]?.pickup || ""} 
//     onChange={(e) => updateVehicleHistory("pickup", e.target.value)}
// />

// <FormInput 
//     label={"Return Time"} 
//     type="time" 
//     value={vehicleHistory[0]?.return || ""} 
//     onChange={(e) => updateVehicleHistory("return", e.target.value)}
// />
//                 <Options 
//                     label="Stop" optionMsg="Select Stop" options={stopList} 
//                     valueKey="Id" labelKey="Name" value={selectedStopId} 
//                     onChange={(e) => setSelectedStopId(e.target.value)} 
//                 /> 
//                 <Options 
//                     label="Vehicle Type" optionMsg="Select Vehicle Type" 
//                     options={vehicleTypeList} valueKey="Id" 
//                     labelKey="VehicleType" value={selectedVehicleTypeId} 
//                     onChange={(e) => setSelectedVehicleTypeId(e.target.value)} 
//                 /> 
//                 <Options 
//                     label="Vehicle Number" optionMsg="Select Vehicle No." 
//                     options={vehicleList} valueKey="Id" labelKey="VehicleNo" 
//                     value={selectedVehicleId} 
//                     onChange={(e) => setSelectedVehicleId(e.target.value)} 
//                 /> 
//                 <FormInput 
//                     label="Stop Date" type="date" 
//                     value={vehicleHistory[0]?.stopDateInput || ""} 
//                 /> 
//             </div> 
            
//             <div className="w-full gap-6 mb-5 grid grid-cols-1 "> 
//                 <CheckBox 
//                     label={"Is Active"} name={""} checked={agree} 
//                     onChange={(e) => setAgree(e.target.checked)} 
//                 /> 
//             </div> 
//             <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '> 
//                 <Table columns={columns} data={vehicleHistory}/> 
//             </div> 
//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
//                  <Buttons
//                 label={"Delete"}
               
//                 style="hidden sm:inline"
//               />
//                 <Buttons label={"Cancel"}/> 
//                 <Buttons label={"Save"} click={handleSave} /> 
//             </div> 
//         </div> 
//     ) 
// } 

// export default Assign_Vehicle2



import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'
import { getAssignVehicleDelete, getAssignVehicleDetail, getAssignVehicleInsertUpdate, getRoute, getStopRouteList, getVehicleList, getVehicleTypeList } from '../../services/api'
import { useLocation } from 'react-router-dom'
import Loader from '../../Components/Page_Forms/Loader'

function Assign_Vehicle2() {
    const [agree, setAgree] = useState(false) 
    const [routeList, setRouteList] = useState([]) 
    const [selectedRouteId, setSelectedRouteId] = useState(null) 
    const [stopList, setStopList] = useState([]) 
    const [selectedStopId, setSelectedStopId] = useState(null) 
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const userId = localStorage.getItem("UserId") 
    const location = useLocation(); 
    const studentId = location.state?.studentId; 
    const [searched, setSearched] = useState(false); 
    const [vehicleHistory, setVehicleHistory] = useState([]); 
    const [vehicleTypeList, setVehicleTypeList] = useState([]); 
    const [vehicleList, setVehicleList] = useState([]); 
    const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState(""); 
    const [selectedVehicleId, setSelectedVehicleId] = useState(""); 
    const [studentInfo, setStudentInfo] = useState({}); 
    const [errors, setErrors] = useState({}); 


    // ================= FETCH ROUTE, VEHICLETYPE, VEHICLE, STOPROUTE DETAIL ================= 
    useEffect(() => { 
        if (!instId || !sessId) return; 
        fetchRoutes(); 
        fetchVehicleTypes(); 
        fetchVehicles(); 
    }, []); 
    
    const fetchRoutes = async () => { 
        try {
            setSearched(true)
            const res = await getRoute(instId, sessId)
            if (res?.Table) setRouteList(res.Table)
        } catch (error) {
            console.error("Route API Error:", error)
        } finally {
            setSearched(false)
        }
    } 
    
    useEffect(() => { 
        if (selectedRouteId) fetchStops(selectedRouteId) 
        else { 
            setStopList([]) 
            setSelectedStopId(null) 
        } 
    }, [selectedRouteId]) 
    
    const fetchVehicleTypes = async () => { 
        try { 
            setSearched(true)
            const res = await getVehicleTypeList(instId, sessId); 
            if (res?.Table) setVehicleTypeList(res.Table); 
        } catch (err) { 
            console.error("VehicleType API error", err); 
        } finally { setSearched(false) }
    }; 
    
    const fetchVehicles = async () => { 
        try { 
            setSearched(true)
            const res = await getVehicleList(instId, sessId); 
            if (res?.Table) setVehicleList(res.Table); 
        } catch (err) { 
            console.error("VehicleList API error", err); 
        } finally { setSearched(false) }
    }; 
    
    const fetchStops = async (routeId) => { 
        try { 
            setSearched(true)
            const res = await getStopRouteList(routeId, instId, sessId) 
            if (res?.Table) setStopList(res.Table) 
        } catch (error) { 
            console.error("Stop API Error:", error) 
        } finally { setSearched(false) }
    } 
    
    const columns = [
        { header: "Join Date",  shortHeader: "Join", accessor: "joinDateInput" },
        { header: "Pickup Time", shortHeader: "Pickup", accessor: "pickup" },
        { header: "Return Time", shortHeader: "Return", accessor: "return" },
        { header: "Route Name", shortHeader: "Route", accessor: "route" },
        { header: "Vehicle Stop", shortHeader: "Vehicle", accessor: "vehicle" },
        { header: "Vechile Type", shortHeader: "Type", accessor: "type" },
        { header: "Vechile Number", shortHeader: "Number", accessor: "no" },
    ] 

    // ================= VALIDATION ================= 
    const validateForm = () => {
    const newErrors = {};

    if (!studentInfo?.Class) newErrors.class = "Required";
    if (!vehicleHistory[0]?.joinDateInput) newErrors.joinDate = "Required";
    if (!selectedStopId) newErrors.stop = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    // ================= ASSIGN VEHICLE DETAIL ================= 
    useEffect(() => { 
        if (studentId) fetchAssignVehicleDetail(); 
    }, [studentId]); 
    
    const fetchAssignVehicleDetail = async () => { 
        try { 
            setSearched(true); 
            const res = await getAssignVehicleDetail(studentId, instId, sessId); 
            if (res?.Table?.length) setStudentInfo(res.Table[0]); 
            if (res?.Table1?.length) {
                const row = res.Table1[0]; 
                setAgree(!!row.IsActive); 
                setSelectedRouteId(row.F_RouteMaster); 
                setSelectedStopId(row.F_StopMaster); 
                setSelectedVehicleTypeId(row.F_VehicleType); 
                setSelectedVehicleId(row.F_VehicleMaster); 
                setVehicleHistory([{
                    id: row.Id, 
                    joinDateInput: apiDateToInput(row.JoinDate), 
                    stopDateInput: apiDateToInput(row.StopDate), 
                    pickup: formatTime(row.PickupTime), 
                    return: formatTime(row.ReturnTime), 
                    route: row.RouteName, 
                    vehicle: row.StopName, 
                    type: row.VehicleType, 
                    no: row.VehicleNo,
                }]); 
            } 
        } catch (err) { console.error("AssignVehicleDetail API error", err); } 
        finally { setSearched(false); } 
    }; 
    
    const formatDateForApi = (dateStr) => { 
        if (!dateStr) return null; 
        const d = new Date(dateStr); 
        if (isNaN(d)) return null; 
        const day = d.getDate().toString().padStart(2, "0"); 
        const month = d.toLocaleString("en-GB", { month: "short" }); 
        const year = d.getFullYear(); 
        return `${day}/${month}/${year}`; 
    }; 
    
    const apiDateToInput = (apiDate) => { 
        if (!apiDate) return ""; 
        const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
        const d = new Date(timestamp); 
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; 
    }; 
    
    const formatTime = (timeStr) => timeStr ? timeStr.substring(0,5) : ""; 
    
    // ================= SAVE =================
    const handleSave = async () => {
        if (!validateForm()) return; 
        try {
            setSearched(true);
            const payload = {
                assvehid: vehicleHistory[0]?.id || 0,
                vehid: selectedVehicleId,
                vehtypeid: selectedVehicleTypeId,
                stopid: selectedStopId,
                studid: studentId,
                routeid: selectedRouteId,
                Ptime: vehicleHistory[0]?.pickup,
                Rtime: vehicleHistory[0]?.return,
                jdate: formatDateForApi(vehicleHistory[0]?.joinDateInput),
                sdate: formatDateForApi(vehicleHistory[0]?.stopDateInput),
                active: agree ? 1 : 0,
                userid: userId,
                insid: instId,
                sessid: sessId,
            };
            const res = await getAssignVehicleInsertUpdate(
                payload.assvehid, payload.vehid, payload.vehtypeid,
                payload.stopid, payload.studid, payload.routeid,
                payload.Ptime, payload.Rtime, payload.jdate,
                payload.sdate, payload.active, payload.userid,
                payload.insid, payload.sessid
            );
            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|");
            if (code === "M101" || code === "M102") alert(text)
            else alert("Something went wrong")
        } catch (error) {
            console.error("Save Assign Vehicle Error", error);
        } finally { setSearched(false); }
    };

    const updateVehicleHistory = (key, value) => {
        setVehicleHistory(prev => {
            const data = [...prev];
            if (!data.length) data.push({});
            data[0] = { ...data[0], [key]: value };
            return data;
        });
    };

    const handleDelete = async (rowId) => {
        try {
            if (!rowId) return alert("Please select a row to delete");
            if (!window.confirm("Are you sure you want to delete this record?")) return;

            setSearched(true);
            const res = await getAssignVehicleDelete(rowId);

            if (res?.Table?.length) {
                const message = res.Table[0].Column1;
                alert(message);

                if (message.startsWith("M103")) {
                    setVehicleHistory(prev => prev.filter(item => item.id !== rowId));
                    // Reset form only if deleted row was first row
                    if (vehicleHistory[0]?.id === rowId) {
                        setAgree(false);
                        setSelectedRouteId(null);
                        setSelectedStopId(null);
                        setSelectedVehicleTypeId("");
                        setSelectedVehicleId("");
                    }
                }
            }
        } catch (error) {
            console.error("Delete Assign Vehicle Error", error);
        } finally { setSearched(false); }
    };

    return (
        <div className='w-full h-full bg-white px-4 py-2 flex flex-col'>
            <Loader show={searched}/>
            <Heading style={"mb-5"} label={"Assign Vehicle"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Class"} value={studentInfo?.Class || ""} error={errors.class} />  
                <FormInput label={"Name"} value={studentInfo?.Name || ""} /> 
                <FormInput label={"Sr. No."} value={studentInfo?.EnrollmentNo || ""} /> 
                <FormInput label={"Father Name"} value={studentInfo?.FatherName || ""} /> 
                <FormInput 
                    label="Join Date" type="date" 
                    value={vehicleHistory[0]?.joinDateInput || ""} 
                    // onChange={(e) => updateVehicleHistory("joinDateInput", e.target.value)}
                    error={errors.joinDate}
    onChange={(e) => {
        updateVehicleHistory("joinDateInput", e.target.value);

        if (errors.joinDate) {
            setErrors((prev) => ({ ...prev, joinDate: "" }));
        }
    }}
                /> 
                <Options 
                    label="Route" optionMsg="Select Route" options={routeList} 
                    valueKey="Id" labelKey="RouteName" value={selectedRouteId} 
                    onChange={(e) => setSelectedRouteId(e.target.value)} 
                /> 
                <FormInput 
                    label={"Pickup Time"} type="time" 
                    value={vehicleHistory[0]?.pickup || ""} 
                    onChange={(e) => updateVehicleHistory("pickup", e.target.value)}
                />
                <FormInput 
                    label={"Return Time"} type="time" 
                    value={vehicleHistory[0]?.return || ""} 
                    onChange={(e) => updateVehicleHistory("return", e.target.value)}
                />
                <Options 
                    label="Stop" optionMsg="Select Stop" options={stopList} 
                    valueKey="Id" labelKey="Name" value={selectedStopId} 
                    // onChange={(e) => setSelectedStopId(e.target.value)} 
                    error={errors.stop}
    onChange={(e) => {
        setSelectedStopId(e.target.value);

        if (errors.stop) {
            setErrors((prev) => ({ ...prev, stop: "" }));
        }
    }}
                /> 
                <Options 
                    label="Vehicle Type" optionMsg="Select Vehicle Type" 
                    options={vehicleTypeList} valueKey="Id" 
                    labelKey="VehicleType" value={selectedVehicleTypeId} 
                    onChange={(e) => setSelectedVehicleTypeId(e.target.value)} 
                /> 
                <Options 
                    label="Vehicle Number" optionMsg="Select Vehicle No." 
                    options={vehicleList} valueKey="Id" labelKey="VehicleNo" 
                    value={selectedVehicleId} 
                    onChange={(e) => setSelectedVehicleId(e.target.value)} 
                /> 
                <FormInput 
                    label="Stop Date" type="date" 
                    value={vehicleHistory[0]?.stopDateInput || ""} 
                    onChange={(e) => updateVehicleHistory("stopDateInput", e.target.value)}
                /> 
            </div>

            <div className="w-full gap-6 mb-5 grid grid-cols-1"> 
                <CheckBox label={"Is Active"} checked={agree} 
                    onChange={(e) => setAgree(e.target.checked)} 
                /> 
            </div> 

            <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5'> 
                <Table
                    columns={columns}
                    data={vehicleHistory}
                    actions={(row) => (
                        <>
                            <Buttons label={"Delete"} click={() => handleDelete(row.id)} style="hidden sm:inline" />
                            <button className="sm:hidden text-xl pt-2.5" onClick={() => handleDelete(row.id)}>🗑️</button>
                        </>
                    )}
                />
            </div> 

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
                <Buttons label={"Cancel"}/> 
                <Buttons label={"Save"} click={handleSave} /> 
            </div> 
        </div> 
    ) 
} 

export default Assign_Vehicle2





// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Options from '../../Components/Page_Forms/Options'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Table from '../../Components/Page_Forms/Table'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { getAssignVehicleDelete, getAssignVehicleDetail, getAssignVehicleInsertUpdate, getRoute, getStopRouteList, getVehicleList, getVehicleTypeList } from '../../services/api'
// import { useLocation } from 'react-router-dom'
// import useClassList from '../../hooks/useClassList'
// import Loader from '../../Components/Page_Forms/Loader'

// function Assign_Vehicle2() {
//     const  [agree, setAgree] = useState(false) 
//     const [routeList, setRouteList] = useState([]) 
//     const [selectedRouteId, setSelectedRouteId] = useState(null) 
//     const [stopList, setStopList] = useState([]) 
//     const [selectedStopId, setSelectedStopId] = useState(null) 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const location = useLocation(); 
//     const studentId = location.state?.studentId; 
//     const [searched, setSearched] = useState(false); 
//     const [vehicleHistory, setVehicleHistory] = useState([]); 
//     const [vehicleTypeList, setVehicleTypeList] = useState([]); 
//     const [vehicleList, setVehicleList] = useState([]); 
//     const [selectedVehicleTypeId, setSelectedVehicleTypeId] = useState(""); 
//     const [selectedVehicleId, setSelectedVehicleId] = useState(""); 
//     const [studentInfo, setStudentInfo] = useState({});
//     const [selectedRowId, setSelectedRowId] = useState(null);

    
//     // ================= FETCH ROUTE, VEHICLETYPE, VEHICLE, STOPROUTE DETAIL ================= 
//     useEffect(() => { 
//         if (!instId || !sessId) return; 
        
//         fetchRoutes(); fetchVehicleTypes(); fetchVehicles(); 
//     }, []); 
    
//     const fetchRoutes = async () => { 
//         try {
//             setSearched(true)
//             const res = await getRoute(instId, sessId)
//             if (res?.Table) {
//                 setRouteList(res.Table)
//             }
//         } catch (error) {
//             console.error("Route API Error:", error)
//         } finally {
//             setSearched(false)
//         }
//     } 
    
//     useEffect(() => { 
//         if (selectedRouteId) { 
//             fetchStops(selectedRouteId) 
//         } else { 
//             setStopList([]) 
//             setSelectedStopId(null) 
//         } 
//     }, [selectedRouteId]) 
    
//     const fetchVehicleTypes = async () => { 
//         try { 
//             setSearched(true)
//             const res = await getVehicleTypeList(instId, sessId); 
//             if (res?.Table) { 
//                 setVehicleTypeList(res.Table); 
//             } 
//         } catch (err) { 
//             console.error("VehicleType API error", err); 
//         } finally {
//             setSearched(false)
//         }
//     }; 
    
//     const fetchVehicles = async () => { 
//         try { 
//             setSearched(true)
//             const res = await getVehicleList(instId, sessId); 
//             if (res?.Table) { 
//                 setVehicleList(res.Table); 
//             } 
//         } catch (err) { 
//             console.error("VehicleList API error", err); 
//         } finally {
//             setSearched(false)
//         }
//     }; 
    
//     const fetchStops = async (routeId) => { 
//         try { 
//             setSearched(true)
//             const res = await getStopRouteList(routeId, instId, sessId) 
//             if (res?.Table) { 
//                 setStopList(res.Table) 
//             } 
//         } catch (error) { 
//             console.error("Stop API Error:", error) 
//         } finally {
//             setSearched(false)
//         }
//     } 
    
//     const columns = [
//         { header: "Join Date",  shortHeader: "Join", accessor: "joinDateInput" },
//         { header: "Pickup Time", shortHeader: "Pickup", accessor: "pickup" },
//         { header: "Return Time", shortHeader: "Return", accessor: "return" },
//         { header: "Route Name", shortHeader: "Route", accessor: "route" },
//         { header: "Vehicle Stop", shortHeader: "Vehicle", accessor: "vehicle" },
//         { header: "Vechile Type", shortHeader: "Type", accessor: "type" },
//         { header: "Vechile Number", shortHeader: "Number", accessor: "no" },
//     ] 

//     // ================= ASSIGN VEHICLE DETAIL DETAIL ================= 
//     useEffect(() => { 
//         if (studentId) { 
//             fetchAssignVehicleDetail(); 
//         } 
//     }, [studentId]); 
    
//     const fetchAssignVehicleDetail = async () => { 
//         try { 
//             setSearched(true); 
//             const res = await getAssignVehicleDetail(studentId, instId, sessId); 
//             /* ===== Student Info ===== */ 
//             if (res?.Table?.length) { 
//                 setStudentInfo(res.Table[0]); 
//             } 
            
//             /* ===== Vehicle Assignment (Table1) ===== */ 
//             if (res?.Table1?.length) { 
//                 const row = res.Table1[0]; 
//                 setAgree(!!row.IsActive); // ✅ FIXED 
//                 setSelectedRouteId(row.F_RouteMaster); 
//                 setSelectedStopId(row.F_StopMaster); 
//                 setSelectedVehicleTypeId(row.F_VehicleType); 
//                 setSelectedVehicleId(row.F_VehicleMaster); 
//                 setVehicleHistory([ 
//                     { 
//                         id: row.Id, 
//                         joinDateInput: apiDateToInput(row.JoinDate), 
//                         stopDateInput: apiDateToInput(row.StopDate), 
//                         pickup: formatTime(row.PickupTime), 
//                         return: formatTime(row.ReturnTime), 
//                         route: row.RouteName, 
//                         vehicle: row.StopName, 
//                         type: row.VehicleType, 
//                         no: row.VehicleNo, 
//                     }, 
//                 ]); 
//             } 
//         } catch (err) { 
//             console.error("AssignVehicleDetail API error", err); 
//         } finally { 
//             setSearched(false); 
//         } 
//     }; 
    
//     // ================= DATE ================= 
//     // INPUT → API (yyyy-mm-dd → dd/Mon/yyyy)  
//     const formatDateForApi = (dateStr) => { 
//         if (!dateStr) return null; 
//         const d = new Date(dateStr); 
//         if (isNaN(d)) return null; 
//         const day = d.getDate().toString().padStart(2, "0"); 
//         const month = d.toLocaleString("en-GB", { month: "short" }); 
//         const year = d.getFullYear(); 
//         return `${day}/${month}/${year}`; // 20/Feb/2025 
//     }; 
    
//     // API → INPUT (/Date(...)\/ → yyyy-mm-dd) 
//     const apiDateToInput = (apiDate) => { 
//         if (!apiDate) return ""; 
//         const timestamp = parseInt(apiDate.match(/\d+/)[0], 10); 
//         const d = new Date(timestamp); 
//         const year = d.getFullYear(); 
//         const month = String(d.getMonth() + 1).padStart(2, "0"); 
//         const day = String(d.getDate()).padStart(2, "0"); 
//         return `${year}-${month}-${day}`; // 2025-02-20 
//     }; 
    
//     // ================= TIME ================= 
//     const formatTime = (timeStr) => { 
//         if (!timeStr) return ""; 
//         return timeStr.substring(0, 5); // HH:mm 
//     }; 
    

//     // ================= SAVE ================= 
//     const handleSave = async () => {
//     try {
//         setSearched(true);

//         const payload = {
//             assvehid: vehicleHistory[0]?.id || 0,          // 0 for insert
//             vehid: selectedVehicleId,
//             vehtypeid: selectedVehicleTypeId,
//             stopid: selectedStopId,
//             studid: studentId,
//             routeid: selectedRouteId,
//             Ptime: vehicleHistory[0]?.pickup,
//             Rtime: vehicleHistory[0]?.return,
//             jdate: formatDateForApi(vehicleHistory[0]?.joinDateInput),
//             sdate: formatDateForApi(vehicleHistory[0]?.stopDateInput),
//             active: agree ? 1 : 0,
//             userid: 1, // 🔴 replace with logged-in user id
//             insid: instId,
//             sessid: sessId,
//         };

//         const res = await getAssignVehicleInsertUpdate(
//             payload.assvehid,
//             payload.vehid,
//             payload.vehtypeid,
//             payload.stopid,
//             payload.studid,
//             payload.routeid,
//             payload.Ptime,
//             payload.Rtime,
//             payload.jdate,
//             payload.sdate,
//             payload.active,
//             payload.userid,
//             payload.insid,
//             payload.sessid
//         );

//         const msg = res?.Table?.[0]?.Column1 || ""
//             const code = msg.split("|")[0]
//             const text = msg.split("|")[1]
    
//             if (code === "M101" || code === "M102") {
//                 alert(text) 
//             } 
           
//             else {
//                 alert("Something went wrong")
//             }

//     } catch (error) {
//         console.error("Save Assign Vehicle Error", error);
//     } finally {
//         setSearched(false);
//     }
// };

// const updateVehicleHistory = (key, value) => {
//     setVehicleHistory(prev => {
//         const data = [...prev];
//         if (!data.length) data.push({});
//         data[0] = { ...data[0], [key]: value };
//         return data;
//     });
// };

// // ================= DELETE ================= 
// // const handleDelete = async () => {
// //     try {
// //         if (!vehicleHistory[0]?.id) {
// //             alert("No vehicle record found to delete");
// //             return;
// //         }

// //         if (!window.confirm("Are you sure you want to delete this record?")) {
// //             return;
// //         }

// //         setSearched(true);

// //         const res = await getAssignVehicleDelete(vehicleHistory[0].id);

// //         if (res?.Table?.length) {
// //             const message = res.Table[0].Column1;
// //             alert(message);

// //             // ✅ If delete successful
// //             if (message.startsWith("M103")) {
// //                 setVehicleHistory([]);
// //                 setAgree(false);
// //                 setSelectedRouteId(null);
// //                 setSelectedStopId(null);
// //                 setSelectedVehicleTypeId("");
// //                 setSelectedVehicleId("");
// //             }
// //         }
// //     } catch (error) {
// //         console.error("Delete Assign Vehicle Error", error);
// //     } finally {
// //         setSearched(false);
// //     }
// // };

// const handleDelete = async (rowId) => {
//   try {
//     if (!rowId) {
//       alert("Please select a row to delete");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this record?")) {
//       return;
//     }

//     setSearched(true);

//     const res = await getAssignVehicleDelete(rowId);

//     if (res?.Table?.length) {
//       const message = res.Table[0].Column1;
//       alert(message);

//       if (message.startsWith("M103")) {
//         // remove deleted row from table
//         setVehicleHistory(prev =>
//           prev.filter(item => item.id !== rowId)
//         );

//         // Reset form fields if the deleted row was the **first row**
//         if (vehicleHistory[0]?.id === rowId) {
//           setAgree(false);
//           setSelectedRouteId(null);
//           setSelectedStopId(null);
//           setSelectedVehicleTypeId("");
//           setSelectedVehicleId("");
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Delete Assign Vehicle Error", error);
//   } finally {
//     setSearched(false);
//   }
// };




    
//     return ( 
//         <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'> 
//             <Loader show={searched}/> 
//             <Heading style={"mb-5"} label={"Assign Vehicle"}/> 
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full"> 

//                 <FormInput 
//                     label={"Class"} value={studentInfo?.Name || ""} 
//                 />  
//                 <FormInput 
//                     label={"Name"} value={studentInfo?.Name || ""} 
//                 /> 
//                 <FormInput 
//                     label={"Sr. No."} value={studentInfo?.EnrollmentNo || ""} 
//                 /> 
//                 <FormInput 
//                     label={"Father Name"} value={studentInfo?.FatherName || ""} 
//                 /> 
//                 <FormInput 
//                     label="Join Date" type="date" 
//                     value={vehicleHistory[0]?.joinDateInput || ""} 
//                     onChange={(e) => updateVehicleHistory("joinDateInput", e.target.value)}
//                 /> 
//                 <Options 
//                     label="Route" optionMsg="Select Route" options={routeList} 
//                     valueKey="Id" labelKey="RouteName" value={selectedRouteId} 
//                     onChange={(e) => setSelectedRouteId(e.target.value)} 
//                 /> 
//                <FormInput 
//     label={"Pickup Time"} 
//     type="time" 
//     value={vehicleHistory[0]?.pickup || ""} 
//     onChange={(e) => updateVehicleHistory("pickup", e.target.value)}
// />

// <FormInput 
//     label={"Return Time"} 
//     type="time" 
//     value={vehicleHistory[0]?.return || ""} 
//     onChange={(e) => updateVehicleHistory("return", e.target.value)}
// />
//                 <Options 
//                     label="Stop" optionMsg="Select Stop" options={stopList} 
//                     valueKey="Id" labelKey="Name" value={selectedStopId} 
//                     onChange={(e) => setSelectedStopId(e.target.value)} 
                    
//                 /> 
//                 <Options 
//                     label="Vehicle Type" optionMsg="Select Vehicle Type" 
//                     options={vehicleTypeList} valueKey="Id" 
//                     labelKey="VehicleType" value={selectedVehicleTypeId} 
//                     onChange={(e) => setSelectedVehicleTypeId(e.target.value)} 
//                 /> 
//                 <Options 
//                     label="Vehicle Number" optionMsg="Select Vehicle No." 
//                     options={vehicleList} valueKey="Id" labelKey="VehicleNo" 
//                     value={selectedVehicleId} 
//                     onChange={(e) => setSelectedVehicleId(e.target.value)} 
//                 /> 
//                 <FormInput 
//                     label="Stop Date" type="date" 
//                     value={vehicleHistory[0]?.stopDateInput || ""} 
//                     onChange={(e) => updateVehicleHistory("stopDateInput", e.target.value)}
//                 /> 
//             </div> 
            
//             <div className="w-full gap-6 mb-5 grid grid-cols-1 "> 
//                 <CheckBox 
//                     label={"Is Active"} name={""} checked={agree} 
//                     onChange={(e) => setAgree(e.target.checked)} 
//                 /> 
//             </div> 
//             <div className='w-full grid grid-cols-1 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '> 
//                 {/* <Table columns={columns} data={vehicleHistory}/>  */}
//                 <Table
//   columns={columns}
//   data={vehicleHistory}
//   actions={(row) => (
//     <>
//       <Buttons 
//         label={"Delete"} 
//         click={() => handleDelete(row.id)} 
//         style="hidden sm:inline" 
//       />
//       {/* Mobile icons */}
//       <button 
//         className="sm:hidden text-xl pt-2.5"  
//         onClick={() => handleDelete(row.id)} 
//       >🗑️</button>
//     </>
//   )}
// />

//             </div> 
//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
//                 <Buttons label={"Cancel"}/> 
//                 <Buttons label={"Save"} click={handleSave} /> 
//             </div> 
//         </div> 
//     ) 
// } 

// export default Assign_Vehicle2

