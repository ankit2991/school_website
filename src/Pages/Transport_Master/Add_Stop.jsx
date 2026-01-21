// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';
// import { getStop, getStopDelete } from '../../services/api';
// import Loader from '../../Components/Page_Forms/Loader';

// function Add_Stop() { 
//     const navigate = useNavigate();

//     const [searched, setSearched] = useState(false);
//     const [stopList, setStopList] = useState([]);
//     const [filteredList, setFilteredList] = useState([]);
//     const [destination, setDestination] = useState("");
//     const instId = localStorage.getItem("InstituteID");
//     const sessId = localStorage.getItem("SessionID");

//     const columns = [
//         { header: "Destination", shortHeader: "Destination", accessor: "Destination" },
//         { header: "Cost", shortHeader: "Cost", accessor: "Cost" },
//         { header: "Order", shortHeader: "Order", accessor: "OrderNo" },
//         { header: "Route Name", shortHeader: "Route", accessor: "RouteName" },
//     ];

//     // =================== LOAD DATA ======================
//     useEffect(() => { 
//         fetchStop();
//     }, []);

//     const fetchStop = async () => { 
//         try { 
//             setSearched(true);
//             const res = await getStop(instId, sessId);

//             if (res?.Table) {
//                 setStopList(res.Table);
//                 setFilteredList(res.Table); // 👈 default table data
//             }
//         } catch (error) { 
//             console.error("Stop API Error:", error);
//         } finally { 
//             setSearched(false);
//         }
//     };

//     // =================== FILTER ======================
//     useEffect(() => {
//         if (destination.trim() === "") {
//             setFilteredList(stopList); // 👈 show all by default
//         } else {
//             const filtered = stopList.filter(item =>
//                 item.Destination?.toLowerCase().includes(destination.toLowerCase())
//             );
//             setFilteredList(filtered);
//         }
//     }, [destination, stopList]);

//     // =================== DELETE ====================== 
//     const handleDelete = async (stopid) => {
//         if (!stopid) return;

//         try{ 
//             setSearched(true) 
//             const res = await getStopDelete(stopid) 
//             if (res?.Table?.length) { 
//                 const msg = res.Table[0].Column1 
//                 console.log(msg) 
                
//                 if (msg.startsWith("M103")) { 
//                     fetchStop()
//                     alert("Stop Deleted") 
//                 } 
                
//                 else if (msg.startsWith("M200")) { 
//                     alert("Record Exists.") 
//                 } 
                
//                 else { 
//                     alert("Something went wrong") 
//                 } 
//             } 
//         } catch (error) { 
//             console.error("Delete Stop Error:", error) 
//         } finally { 
//             setSearched(false) 
//         } 
//     }

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched} />

//             <div className="flex justify-between mb-5">
//                 <Heading label={"Stop Master"} />
//                 <Buttons click={() => navigate("/Add-Stop")} label={"Add"} />                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput
//                     label={"Destination"}
//                     placeholder={"Enter Destination"}
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                 />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons label={"Search"} />
//             </div>
            
//             <div className="mt-5">
//                 <Table
//                     columns={columns}
//                     data={filteredList}
//                     actions={(row) => (
//                         <>
//                             <Buttons
//                                 label={"Edit"}
//                                 click={() => navigate("/Add-Stop", { state: row.Id })}
//                                 style="hidden sm:inline"
//                             />
//                             <Buttons
//                                 label={"Delete"}
//                                 click={() => handleDelete(row.Id)}
//                                 style="hidden sm:inline"
//                             />
//                             {/* Mobile icons */}
//                             <button
//                                 className="sm:hidden text-lg pt-2.5"
//                                 onClick={() => navigate("/Add-Stop", { state: row.Id })}
//                             >
//                                 ✏️
//                             </button>
//                             <button
//                                 className="sm:hidden text-xl pt-2.5"
//                                 onClick={() => handleDelete(row.Id)}
//                             >
//                                 🗑️
//                             </button>
//                         </>
//                     )}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Add_Stop;



import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table';
import { getRoute, getStop, getStopDelete, getStopdetail, getStopInsertUpdate } from '../../services/api';
import Loader from '../../Components/Page_Forms/Loader';
import Dialog from '../../Components/Page_Forms/Dialog';
import Options from '../../Components/Page_Forms/Options';
import CheckBox from '../../Components/Page_Forms/CheckBox';

function Add_Stop() { 

    const [searched, setSearched] = useState(false);
    const [stopList, setStopList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [destination, setDestination] = useState("");
    const instId = localStorage.getItem("InstituteID");
    const sessId = localStorage.getItem("SessionID");

    const columns = [
        { header: "Destination", shortHeader: "Destination", accessor: "Destination" },
        { header: "Cost", shortHeader: "Cost", accessor: "Cost" },
        { header: "Order", shortHeader: "Order", accessor: "OrderNo" },
        { header: "Route Name", shortHeader: "Route", accessor: "RouteName" },
    ]; 
    const [open, setOpen] = useState(false) 
    const [dialogTitle, setDialogTitle] = useState("") 
    const [editStopId, setEditStopId] = useState(0) 
    const userId = localStorage.getItem("UserId") 
    const [routeList, setRouteList] = useState([])  
    const [form, setForm] = useState({ 
        destination: "", cost: "", routeId: "", 
        orderNo: "", isAllInstitute: false 
    })  
    const [errors, setErrors] = useState({}); 
    
    // =================== LOAD DATA ======================
    useEffect(() => { 
        fetchStop();
    }, []);

    const fetchStop = async () => { 
        try { 
            setSearched(true);
            const res = await getStop(instId, sessId);

            if (res?.Table) {
                setStopList(res.Table);
                setFilteredList(res.Table); // 👈 default table data
            }
        } catch (error) { 
            console.error("Stop API Error:", error);
        } finally { 
            setSearched(false);
        }
    };

    // =================== VALIDATION ====================== 
    const validateForm = () => { 
        const newErrors = {}; 
        
        if (!form.destination.trim()) newErrors.destination = "Required"; 
        if (!form.cost.trim()) newErrors.cost = "Required"; 
        if (!form.orderNo.trim()) newErrors.orderNo = "Required"; 
        if (!form.routeId) newErrors.routeId = "Required"; 
        
        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; 
    };

    // =================== FILTER ======================
    useEffect(() => {
        if (destination.trim() === "") {
            setFilteredList(stopList); // 👈 show all by default
        } else {
            const filtered = stopList.filter(item =>
                item.Destination?.toLowerCase().includes(destination.toLowerCase())
            );
            setFilteredList(filtered);
        }
    }, [destination, stopList]);

    // =================== DELETE ====================== 
    const handleDelete = async (stopid) => {
        if (!stopid) return;

        try{ 
            setSearched(true) 
            const res = await getStopDelete(stopid) 
            if (res?.Table?.length) { 
                const msg = res.Table[0].Column1 
                console.log(msg) 
                
                if (msg.startsWith("M103")) { 
                    fetchStop()
                    alert("Stop Deleted") 
                } 
                
                else if (msg.startsWith("M200")) { 
                    alert("Record Exists.") 
                } 
                
                else { 
                    alert("Something went wrong") 
                } 
            } 
        } catch (error) { 
            console.error("Delete Stop Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    }     
    
    // ================= FETCH STOP DETAIL ================= 
    const handleEdit = async (stopId) => { 
        try { 
            setSearched(true) 
            
            const res = await getStopdetail(stopId, instId, sessId) 
            if (res?.Table?.length > 0) { 
                const data = res.Table[0] 
                
                setEditStopId(stopId) 
                setDialogTitle("Edit") 
                setForm({ 
                    destination: data.Destination || "", 
                    cost: data.Cost || "", 
                    routeId: data.F_RouteMaster || "", 
                    orderNo: data.OrderNo || "", 
                    isAllInstitute: false 
                }) 
            }  
        } catch (error) {  
            console.error("Stop Detail Error:", error) 
        } finally {  
            setSearched(false) 
            setOpen(true) 
        }  
    } 

    // =================== ROUTE LIST ====================== 
    useEffect(() => { 
        fetchRoutes() 
    }, []) 
    
    const fetchRoutes = async () => { 
        try { 
            setSearched(true) 
            const res = await getRoute(instId, sessId) 
            if (res?.Table) { 
                setRouteList(res.Table) 
            } 
        } catch (error) { 
            console.error("Route API Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    }
    
    // =================== SAVE / UPDATE ====================== 
    const handleSave = async () => { 
        if (!validateForm()) { 
            window.scrollTo({ top: 0, behavior: "smooth" }); 
            return; 
        } 
        try {
            setSearched(true) 
            
            const res = await getStopInsertUpdate( 
                editStopId, form.routeId, form.destination, form.cost, 
                form.isAllInstitute ? 1 : 0, userId, instId, sessId 
            ) 
            
            const msg = res?.Table?.[0]?.Column1 || ""; 
            const [code, text] = msg.split("|"); 
            
            if (code === "M101" || code === "M102") { 
                alert(text) 
                await fetchStop(); 
                clearForm(); 
                setOpen(false); 
            } 
            
            else if (code === "M200") { 
                alert(text) 
            } else { 
                alert("Something went wrong") 
            } 
        } catch (error) { 
            console.error("Save Error:", error) 
            alert("Server error") 
        } finally { 
            setSearched(false) 
        } 
    } 
    
    // =================== CLEAR ====================== 
    const clearForm = () => { 
        setForm({ 
            destination: "", cost: "", routeId: "", 
            orderNo: "", isAllInstitute: false 
        }); 
    }; 


    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Stop Master"} />
                <Buttons 
                    label={"Add"} click={() => { 
                        clearForm(), setEditStopId(0), setDialogTitle("Add"), setOpen(true) 
                    }} 
                /> 
            </div>

            <Dialog 
                open={open} title={dialogTitle} 
                dialogstyle={"sm:w-5xl sm:h-[350px]"}
                children={ 
                    <> 
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full"> 
                            <FormInput 
                                label="Destination" value={form.destination} 
                                error={errors.destination} 
                                onChange={(e) => {
                                    setForm({ ...form, destination: e.target.value }); 
                                    if (errors.destination) { 
                                        setErrors((prev) => ({ 
                                            ...prev, destination: "", 
                                        })); 
                                    }
                                }} 
                            /> 
                            
                            <FormInput 
                                label="Cost" value={form.cost} error={errors.cost} 
                                onChange={(e) => { 
                                    setForm({ ...form, cost: e.target.value }); 
                                    if (errors.cost) { 
                                        setErrors((prev) => ({ 
                                            ...prev, cost: "", 
                                        })); 
                                    } 
                                }} 
                            /> 
                            
                            <Options 
                                label="Route" options={routeList} labelKey="RouteName" 
                                valueKey="Id" value={form.routeId} 
                                onChange={(e) => setForm({ ...form, routeId: e.target.value })} 
                            /> 
                            
                            <FormInput 
                                label="Route Order No." value={form.orderNo} error={errors.orderNo} 
                                onChange={(e) => { 
                                    setForm({ ...form, orderNo: e.target.value }); 
                                    if (errors.orderNo) { 
                                        setErrors((prev) => ({ 
                                            ...prev, orderNo: "", 
                                        })); 
                                    } 
                                }} 
                            /> 
                            
                            <CheckBox 
                                label="Is All Institute" checked={form.isAllInstitute} 
                                onChange={(e) => setForm({ ...form, isAllInstitute: e.target.checked })} 
                            /> 
                        </div>
                        
                        <div className="flex justify-end gap-3 mt-5"> 
                            <Buttons 
                                click={() => {setOpen(false), clearForm()}} label={"Cancel"} 
                            /> 
                            <Buttons 
                                click={handleSave} label={"Save"} 
                            /> 
                        </div> 
                    </> 
                } 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput
                    label={"Destination"} placeholder={"Enter Destination"} 
                    value={destination} onChange={(e) => setDestination(e.target.value)} 
                /> 
            </div> 
            
            <div className="flex justify-end"> 
                <Buttons label={"Search"} /> 
            </div> 
            
            <div className="mt-5"> 
                <Table 
                    columns={columns} data={filteredList} 
                    actions={(row) => ( 
                        <> 
                            <Buttons
                                label={"Edit"} click={() => handleEdit(row.Id)}
                                style="hidden sm:inline"
                            />
                            <Buttons
                                label={"Delete"} style="hidden sm:inline" 
                                click={() => handleDelete(row.Id)} 
                            /> 
                            {/* Mobile icons */} 
                            <button 
                                className="sm:hidden text-lg pt-2.5" 
                                onClick={() => handleEdit(row.Id)} 
                            > 
                                ✏️ 
                            </button> 
                            
                            <button 
                                className="sm:hidden text-xl pt-2.5" 
                                onClick={() => handleDelete(row.Id)} 
                            > 
                                🗑️ 
                            </button> 
                        </> 
                    )} 
                /> 
            </div> 
        </div> 
    ); 
} 

export default Add_Stop;

