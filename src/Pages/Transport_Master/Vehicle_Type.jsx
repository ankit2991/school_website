// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import Options from '../../Components/Page_Forms/Options'
// import Table from '../../Components/Page_Forms/Table'
// import Dialog from '../../Components/Page_Forms/Dialog'
// import { getVehicleTypeList } from '../../services/api'

// function Vehicle_Type() {
//    const navigate = useNavigate
//     const [open, setOpen] = useState(false);
//     const [searched, setSearched] = useState(false);
//     const [dialogTitle, setDialogTitle] = useState("");
//     const instId = localStorage.getItem("InstituteID");
//     const sessId = localStorage.getItem("SessionID");
//     const [VechileList, setVehicleList] = useState([]);
//     const [searchvehicle, setSearchVehicle] = useState("") 
//     const columns = [
//         { header: "Route Name", shortHeader: "Route", accessor: "VehicleType" },
//     ]
//     const data = [
//         { id: 1, name: "Bus", },
//         { id: 2, name: "Van", },
//     ];

//     const fetchVehicleTypeList = async () => {
//         try {
//             setSearched(true)
//             const res = await getVehicleTypeList(instId, sessId)
//             if (res?.Table){
//                 setVehicleList(
//                     res.Table.filter(item => item.VehicleType)
//                 )
//             }
//         } catch (error) {
//             console.error("Route API Error:", error) 
//         } finally {
//             setSearched(false)
//         }
//     }

//     const filteredvehicle = VechileList.filter(vehicle => 
//         vehicle.VehicleType ?.toLowerCase().includes(searchvehicle.toLowerCase())
//     );

//     return (
//         <div className='w-full h-full bg-white flex flex-col px-4 py-2'>
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Vehicle Type Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => {setDialogTitle("Add"); setOpen(true)}} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
           
//             <Dialog open={open} title={dialogTitle} children={<>
//                 <FormInput label={"Vehicle"} placeholder={"Enter Vehicle"}/>
//                 <div className="flex justify-end gap-3 mt-5">
//                     <Buttons click={() => setOpen(false)} label={"Cancel"}/>
//                     <Buttons click={() => setOpen(false)} label={"Save"}/>
//                 </div>    
//               </>}/>

            
//             <div className='w-full md:w-4xl'>
//                 {/* <Options label={"Vechile Type"} name={""} optionMsg="Select Vechile Type" options={["Bus", "Van"]} style={"mb-5"}/> */}

//                 <FormInput 
//                     label={"Vechile Type"} placeholder={"Search Vechile Type"} value={searchvehicle} 
//                     onChange={(e) => setSearchVehicle(e.target.value)} 
//                 />
            
//             </div>
            
//             <div className="w-full md:w-4xl flex justify-end mb-5">
//                 <Buttons click={() => navigate("")} label={"Search"} />
//             </div>
            
//             <div className="w-full sm:w-4xl mt-5">
//                 <Table columns={columns} data={filteredvehicle} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => {setDialogTitle("Edit"); setOpen(true)}} style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => {setDialogTitle("Edit"); setOpen(true)}} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5" onClick={() => console.log("Print:", row)} >🗑️</button>
//                     </>
//                 )}/>
                
               
//             </div>
            
//         </div>
        
//     )
// }

// export default Vehicle_Type


import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import Table from '../../Components/Page_Forms/Table'
import Dialog from '../../Components/Page_Forms/Dialog'
import { getVehicleTypeDelete, getVehicleTypeDetail, getVehicleTypeInsertUpdate, getVehicleTypeList } from '../../services/api'
import Loader from '../../Components/Page_Forms/Loader'

function Vehicle_Type() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [searched, setSearched] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");

    const instId = localStorage.getItem("InstituteID");
    const sessId = localStorage.getItem("SessionID");
    const userId = localStorage.getItem("UserId")

    const [VechileList, setVehicleList] = useState([]);
    const [searchvehicle, setSearchVehicle] = useState("");

    const [vehicleName, setVehicleName] = useState("");
    const [editvehicleTypeId, setEditVehicleTypeId] = useState(0);

    const columns = [
        { header: "Vehicle Type", shortHeader: "Vehicle", accessor: "VehicleType" },
    ];

    // ================= VEHICLE LIST ================= 
    const fetchVehicleTypeList = async () => {
        try {
            setSearched(true);
            const res = await getVehicleTypeList(instId, sessId);

            if (res?.Table) {
                setVehicleList(res.Table.filter(item => item.VehicleType));
            }
        } catch (error) {
            console.error("Vehicle API Error:", error);
        } finally {
            setSearched(false);
        }
    };

    useEffect(() => {
        fetchVehicleTypeList();
    }, []);

    // ================= FILTER ================= 
    const filteredvehicle = VechileList.filter(vehicle =>
        vehicle.VehicleType
            ?.toLowerCase()
            .includes(searchvehicle.trim().toLowerCase())
    );

    // ================= VEHICLE DETAIL ================= 
    const handleEdit = async (vehicleId) => {
        try {
            setSearched(true);

            const res = await getVehicleTypeDetail(vehicleId, instId, sessId);

            if (res?.Table?.length) {
                const vehicle = res.Table[0];

                setEditVehicleTypeId(vehicle.Id);
                setVehicleName(vehicle.VehicleType || "");
                setDialogTitle("Edit");
                setOpen(true);   // 🔑 open LAST
            }
        } catch (error) {
            console.error("Vehicle Detail Error:", error);
        } finally {
            setSearched(false);
        }
    };

    // =================== SAVE / UPDATE ====================== 
    const handleSave = async () => { 
        if (!vehicleName.trim()) return 
        
        try { 
            setSearched(true) 
            const res = await getVehicleTypeInsertUpdate( 
                editvehicleTypeId, vehicleName, userId, instId, sessId, 
            ) 
            
            const msg = res?.Table?.[0]?.Column1 || "" 
            const code = msg.split("|")[0] 
            const text = msg.split("|")[1] 
            if (code === "M101" || code === "M102") { 
                alert(text) 
            } 
            else if (code === "M200") { 
                alert(text) 
            } 
            else { 
                alert("Something went wrong") 
            } 
            
            setOpen(false) 
            fetchVehicleTypeList() 
        } catch (error) { 
            console.error("Insert/Update Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 

    // =================== ROUTE DELETE ====================== 
    const handleDelete = async (vehicleid) => { 
        if (!vehicleid) return 
        
        const confirmDelete = window.confirm("Are you sure you want to delete this Vehicle Type?") 
        if (!confirmDelete) return 
        
        try { 
            setSearched(true) 
            const res = await getVehicleTypeDelete(vehicleid) 
            if (res?.Table?.length) { 
                const msg = res.Table[0].Column1 
                console.log(msg) 
                
                if (msg.startsWith("M103")) { 
                    fetchRoutes() 
                    alert("Vehicle Type Deleted")  
                } 
            } 
        } catch (error) { 
            console.error("Delete Vehicle Delete Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    }





    return (
        <div className='w-full h-full bg-white flex flex-col px-4 py-2'>
            <Loader show={searched}/>

            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Vehicle Type Master"} style={"text-[22px] sm:text-3xl"} />

                <Buttons
                    click={() => {
                        setDialogTitle("Add");
                        setVehicleName("");
                        setEditVehicleTypeId(0);
                        setOpen(true);
                    }}
                    label={"Add"}
                    style="whitespace-nowrap h-10"
                />
            </div>

            {/* ================= DIALOG ================= */}
            <Dialog
                // key={editvehicleTypeId}   // 🔥 forces re-render
                open={open}
                title={dialogTitle}
            >
                <FormInput
                    label={"Vehicle"}
                    placeholder={"Enter Vehicle"}
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                />

                <div className="flex justify-end gap-3 mt-5">
                    <Buttons click={() => setOpen(false)} label={"Cancel"} />
                    <Buttons click={handleSave} label={"Save"} />
                </div>
            </Dialog>

            {/* ================= SEARCH ================= */}
            <div className='w-full md:w-4xl'>
                <FormInput
                    label={"Vehicle Type"}
                    placeholder={"Search Vehicle Type"}
                    value={searchvehicle}
                    onChange={(e) => setSearchVehicle(e.target.value)}
                />
            </div>

            <div className="w-full flex mt-5 justify-end mb-5">
                <Buttons click={fetchVehicleTypeList} label={"Search"} />
            </div>

            {/* ================= TABLE ================= */}
            <div className='w-full flex justify-center'>

            <div className="w-full sm:w-6xl mt-5">
                <Table
                    columns={columns}
                    data={filteredvehicle}
                    actions={(row) => (
                        <>
                            <Buttons
                                label={"Edit"}
                                click={() => handleEdit(row.Id)}  // ✅ matches API
                                style="hidden sm:inline"
                            />

                            <Buttons
                                label={"Delete"}
                                click={() => handleDelete(row.Id)}
                                style="hidden sm:inline"
                            />

                            {/* Mobile */}
                            <button
                                className="sm:hidden text-lg pt-2.5"
                                onClick={() => handleEdit(row.Id)}
                            >✏️</button>

                            <button
                                className="sm:hidden text-xl pt-2.5"
                                onClick={() => handleDelete(row.Id)}
                            >🗑️</button>
                        </>
                    )}
                />
            </div>
            </div>

        </div>
    );
}

export default Vehicle_Type;



// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import Options from '../../Components/Page_Forms/Options'
// import Table from '../../Components/Page_Forms/Table'
// import Dialog from '../../Components/Page_Forms/Dialog'
// import { getVehicleTypeDetail, getVehicleTypeList } from '../../services/api'

// function Vehicle_Type() {

//     const navigate = useNavigate(); // ✅ FIXED

//     const [open, setOpen] = useState(false);
//     const [searched, setSearched] = useState(false);
//     const [dialogTitle, setDialogTitle] = useState("");

//     const instId = localStorage.getItem("InstituteID");
//     const sessId = localStorage.getItem("SessionID");

//     const [VechileList, setVehicleList] = useState([]);
//     const [searchvehicle, setSearchVehicle] = useState(""); 
//     const [vehicleName, setVehicleName] = useState("")
//     const [editvehicleTypeId, setEditVehicleTypeId] = useState(0)
//     const columns = [
//         { header: "Vehicle Type", shortHeader: "Vehicle", accessor: "VehicleType" },
//     ];

//     // =================== VEHICLE LIST ======================
//     const fetchVehicleTypeList = async () => {
//         try {
//             setSearched(true);
//             const res = await getVehicleTypeList(instId, sessId);

//             if (res?.Table) {
//                 setVehicleList(
//                     res.Table.filter(item => item.VehicleType)
//                 );
//             }
//         } catch (error) {
//             console.error("Vehicle API Error:", error);
//         } finally {
//             setSearched(false);
//         }
//     };

//     // ✅ LOAD DATA ON PAGE LOAD
//     useEffect(() => {
//         fetchVehicleTypeList();
//     }, []);

//     // ✅ FILTER LOGIC (WORKS WITHOUT CLEAR BUTTON)
//     const filteredvehicle = VechileList.filter(vehicle =>
//         vehicle.VehicleType
//             ?.toLowerCase()
//             .includes(searchvehicle.trim().toLowerCase())
//     );

//     // =================== VEHICLE DETAIL ======================
//     const handleEdit = async (vehicleid) => {
//         try {
//             setSearched(true)
//             const res = await getVehicleTypeDetail(vehicleid, instId, sessId) 
//             if (res?.Table?.length) { 
//                 setEditVehicleTypeId(vehicleid) 
//                 setVehicleName(res.Table[0].VehicleType || "")
//                 setDialogTitle("Edit")
//                 setOpen(true)
//             }
//         } catch (error) {
//             console.error("Route Detail Error:", error) 
//         } finally { 
//             setSearched(false) 
//         } 
//     }

//     return (
//         <div className='w-full h-full bg-white flex flex-col px-4 py-2'>

//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Vehicle Type Master"} style={"text-[22px] sm:text-3xl"} />
//                 {/* <Buttons
//                     click={() => { setDialogTitle("Add"); setOpen(true) }}
//                     label={"Add"}
//                     style='whitespace-nowrap h-10'
//                 /> */}
//                 <Buttons
//     click={() => {
//         setDialogTitle("Add");
//         setVehicleName("");
//         setEditVehicleTypeId(0);
//         setOpen(true);
//     }}
//     label={"Add"}
// />

//             </div>

//             {/* Dialog */}
//             <Dialog
//                 open={open}
//                 title={dialogTitle}
//                 children={
//                     <>
//                         {/* <FormInput label={"Vehicle"} placeholder={"Enter Vehicle"} /> */}
//                         <FormInput 
//                             label={"Vehicle"} placeholder={"Enter Vehicle"} value={vehicleName} 
//                             onChange={(e) => setVehicleName(e.target.value)} 
//                         />
//                         <div className="flex justify-end gap-3 mt-5">
//                             <Buttons click={() => setOpen(false)} label={"Cancel"} />
//                             <Buttons click={() => setOpen(false)} label={"Save"} />
//                         </div>
//                     </>
//                 }
//             />

//             <div className='w-full md:w-4xl'>
//                 <FormInput
//                     label={"Vehicle Type"}
//                     placeholder={"Search Vehicle Type"}
//                     value={searchvehicle}
//                     onChange={(e) => setSearchVehicle(e.target.value)}
//                 />
//             </div>

//             <div className="w-full md:w-4xl flex mt-5 justify-end mb-5">
//                 {/* ✅ SEARCH TRIGGERS API (OPTIONAL) */}
//                 <Buttons click={fetchVehicleTypeList} label={"Search"} />
//             </div>

//             <div className="w-full sm:w-4xl mt-5">
//                 <Table
//                     columns={columns}
//                     data={filteredvehicle}
//                     actions={(row) => (
//                         <>
//                             <Buttons
//     label={"Edit"}
//     click={() => handleEdit(row.Id)}
//     style="hidden sm:inline"
// />

//                             <Buttons
//                                 label={"Delete"}
//                                 click={() => console.log("Delete:", row)}
//                                 style="hidden sm:inline"
//                             />

//                             {/* Mobile icons */}
//                             <button
//     className="sm:hidden text-lg pt-2.5"
//     onClick={() => handleEdit(row.Id)}
// >✏️</button>


//                             <button
//                                 className="sm:hidden text-xl pt-2.5"
//                                 onClick={() => console.log("Delete:", row)}
//                             >🗑️</button>
//                         </>
//                     )}
//                 />
//             </div>

//         </div>
//     );
// }

// export default Vehicle_Type;
