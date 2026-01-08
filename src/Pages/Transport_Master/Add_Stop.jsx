// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';
// import Options from '../../Components/Page_Forms/Options';
// import { getStop } from '../../services/api';
// import Loader from '../../Components/Page_Forms/Loader';


// function Add_Stop() { 
//     const[searched, setSearched] = useState(false)
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Destination", shortHeader: "Destination", accessor: "destination" },
//         { header: "Cost", shortHeader: "Cost", accessor: "Cost" },
//         { header: "Order", shortHeader: "Order", accessor: "Order" },
//         { header: "Route Name", shortHeader: "Route", accessor: "Route" },
//     ]
//     const data = [
//         { id: 1, destination: "Banad", Cost: "Aarav Sharma", Order: "11", Route: "Shastri Nagar" },
//         { id: 2, destination: "Kudi", Cost: "Ishita Kapoor", Order: "5", Route: "Jalori Gate" },
//         { id: 3, destination: "Sardarpura", Cost: "Rohan Mehta", Order: "2", Route: "Pratap Nagar" },
       
//     ];

//     useEffect(() => { 
//             fetchStop() 
//         }, []) 
    
//         // =================== STOP LIST ======================
//         const fetchStop = async () => { 
//             try { 
//                 setSearched(true) 
//                 const res = await getStop(instId, sessId) 
//                 if (res?.Table) { 
//                     setRouteList( 
//                         res.Table.filter(item => item.RouteName) // remove null routes 
//                     ) 
//                 } 
//             } catch (error) { 
//                 console.error("Route API Error:", error) 
//             } finally{ 
//                 setSearched(false) 
//             } 
//         }
    
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched} />
//             <div className="flex justify-between mb-5">
//                 <Heading label={"Stop Master"} />
//                 <Buttons click={() => navigate("/Add-Stop")} label={"Add"} />                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 {/* <Options label={"Destination"} name={""} optionMsg="Destination" options={["Shastri Nagar", "Jalori Gate", "Pratap Nagar"]}/> */}
//                 <FormInput label={"Destination"} placeholder={"Enter Destination"} />
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("/")} label={"Search"} />                    
//             </div>
            
//             <div className="mt-5">
//                 <Table columns={columns} data={data} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => navigate("/Add-Stop") } style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Add-Stop")} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => console.log("Print:", row)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//         </div>
//     )

// }

// export default Add_Stop


import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import { getStop, getStopDelete } from '../../services/api';
import Loader from '../../Components/Page_Forms/Loader';

function Add_Stop() { 
    const navigate = useNavigate();

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

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Stop Master"} />
                <Buttons click={() => navigate("/Add-Stop")} label={"Add"} />                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput
                    label={"Destination"}
                    placeholder={"Enter Destination"}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>
            
            <div className="flex justify-end">
                <Buttons label={"Search"} />
            </div>
            
            <div className="mt-5">
                <Table
                    columns={columns}
                    data={filteredList}
                    actions={(row) => (
                        <>
                            <Buttons
                                label={"Edit"}
                                click={() => navigate("/Add-Stop", { state: row.Id })}
                                style="hidden sm:inline"
                            />
                            <Buttons
                                label={"Delete"}
                                click={() => handleDelete(row.Id)}
                                style="hidden sm:inline"
                            />
                            {/* Mobile icons */}
                            <button
                                className="sm:hidden text-lg pt-2.5"
                                onClick={() => navigate("/Add-Stop", { state: row.Id })}
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

