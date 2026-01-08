// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import Options from '../../Components/Page_Forms/Options'
// import Table from '../../Components/Page_Forms/Table'
// import Dialog from '../../Components/Page_Forms/Dialog'

// function Route_Master() {
//     const navigate = useNavigate
//     const [open, setOpen] = useState(false);
//     const [dialogTitle, setDialogTitle] = useState("");
//     const columns = [
//         { header: "Route Name", shortHeader: "Route", accessor: "name" },
//     ]
//     const data = [
//         { id: 1, name: "Shastri Nagar", },
//         { id: 2, name: "Sardarpura", },
//     ];
//     return (
//         <div className='w-full h-full bg-white flex flex-col px-4 py-2'>
//             <div className="w-full sm:w-4xl flex justify-between mb-5">
//                 <Heading label={"Route Master"}/>
//                 <Buttons click={() => {setDialogTitle("Add"); setOpen(true)}} label={"Add"} />
//             </div>
//             <Dialog open={open} title={dialogTitle} children={<>
//                 <FormInput label={"Route"} placeholder={"Enter Route"}/>
//                 <div className="flex justify-end gap-3 mt-5">
//                     <Buttons click={() => setOpen(false)} label={"Cancel"}/>
//                     <Buttons click={() => setOpen(false)} label={"Save"}/>
//                 </div>    
//               </>}/>

            
//             <div className='w-full md:w-4xl'>
//                 <Options label={"Route"} name={""} optionMsg="Select Route" options={["Shastri Nagar", "Sardarpura"]} style={"mb-5"}/>
//             </div>
            
//             <div className="w-full md:w-4xl flex justify-end mb-5">
//                 <Buttons click={() => navigate("")} label={"Search"} />
//             </div>
            
//             <div className="w-full sm:w-4xl mt-5">
//                 <Table columns={columns} data={data} actions={(row) => (
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

// export default Route_Master



import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import Options from '../../Components/Page_Forms/Options'
import Table from '../../Components/Page_Forms/Table'
import Dialog from '../../Components/Page_Forms/Dialog'
import { getRoute, getRouteDelete, getRoutedetail, getRouteInsertUpdate } from '../../services/api'
import Loader from '../../Components/Page_Forms/Loader'

function Route_Master() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [routeList, setRouteList] = useState([])
    const [selectedRouteId, setSelectedRouteId] = useState("")
    const [searchRoute, setSearchRoute] = useState("") 
    const [routeName, setRouteName] = useState("")
    const [editRouteId, setEditRouteId] = useState(0)
    const [searched, setSearched] = useState(false);
    const columns = [ { header: "Route Name", shortHeader: "Route", accessor: "RouteName" }, ]
    const data = routeList
    const instId = localStorage.getItem("InstituteID");
    const sessId = localStorage.getItem("SessionID");
    const userId = localStorage.getItem("UserId")

    // =================== ROUTE LIST ======================
    useEffect(() => { 
        fetchRoutes() 
    }, []) 

    const fetchRoutes = async () => { 
        try { 
            setSearched(true) 
            const res = await getRoute(instId, sessId) 
            if (res?.Table) { 
                setRouteList( 
                    res.Table.filter(item => item.RouteName) // remove null routes 
                ) 
            } 
        } catch (error) { 
            console.error("Route API Error:", error) 
        } finally{ 
            setSearched(false) 
        } 
    }

    const filteredRoutes = routeList.filter(route => 
        route.RouteName ?.toLowerCase().includes(searchRoute.toLowerCase())
    );
    
    // =================== ROUTE DETAIL ====================== 
    const handleEdit = async (routeId) => {
        try { 
            setSearched(true) 
            const res = await getRoutedetail(instId, sessId, routeId) 
            if (res?.Table?.length) { 
                setEditRouteId(routeId) 
                setRouteName(res.Table[0].RouteName || "") 
                setDialogTitle("Edit") 
                setOpen(true) 
            } 
        } catch (error) { 
            console.error("Route Detail Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 
    
    // =================== ROUTE SAVE ====================== 
    const handleSave = async () => { 
        if (!routeName.trim()) return 
        
        try { 
            setSearched(true) 
            const res = await getRouteInsertUpdate( 
                instId, sessId, userId, editRouteId, routeName 
            ) 
            
            if (res?.Table?.length) { 
                const message = res.Table[0].Column1 
                console.log(message) 
            } 
            
            setOpen(false) 
            fetchRoutes() 
        } catch (error) { 
            console.error("Insert/Update Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 
    
    // =================== ROUTE DELETE ====================== 
    const handleDelete = async (routeId) => { 
        if (!routeId) return 
        
        const confirmDelete = window.confirm("Are you sure you want to delete this route?") 
        if (!confirmDelete) return 
        
        try { 
            setSearched(true) 
            const res = await getRouteDelete(routeId) 
            
            if (res?.Table?.length) { 
                const msg = res.Table[0].Column1 
                console.log(msg) 
                
                if (msg.startsWith("M103")) { 
                    fetchRoutes() 
                } 
            } 
        } catch (error) { 
            console.error("Delete Route Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 
    
    return ( 
        <div className='w-full h-full bg-white flex flex-col px-4 py-2'> 
            
            <Loader show={searched} />             
            <div className="w-full flex justify-between mb-5"> 
                <Heading label={"Route Master"} /> 
                <Buttons 
                    label={"Add"} click={() => { 
                        setRouteName(""), setEditRouteId(0), setDialogTitle("Add"), setOpen(true) 
                    }} 
                /> 
            </div> 
            
            <Dialog 
                open={open} title={dialogTitle} 
                children={ 
                    <> 
                        <FormInput 
                            label={"Route"} placeholder={"Enter Route"} value={routeName} 
                            onChange={(e) => setRouteName(e.target.value)} 
                        /> 
                        
                        <div className="flex justify-end gap-3 mt-5"> 
                            <Buttons 
                                click={() => setOpen(false)} label={"Cancel"} 
                            /> 
                            <Buttons 
                                click={handleSave} label={"Save"} 
                            /> 
                        </div> 
                    </> 
                } 
            /> 
            
            {/* ✅ ROUTE OPTIONS FROM API */} 
            <div className='w-full md:w-4xl'> 
                <FormInput 
                    label={"Route"} placeholder={"Search Route"} value={searchRoute} 
                    onChange={(e) => setSearchRoute(e.target.value)} 
                />
  
            </div> 
            
            <div className="w-full  gap-x-5 flex justify-end mt-4 "> 
                {/* <Buttons 
                    label={"Clear"} 
                    click={() => setSearchRoute("")} 
                /> */}
                <Buttons 
                    label={"Search"} click={() => 
                        { console.log("Selected Route ID:", selectedRouteId) }
                    } 
                /> 
            </div> 
            <div className='w-full flex justify-center'> 
                
          
            <div className="w-6xl mt-5"> 
                <Table 
                    columns={columns} data={filteredRoutes} 
                    actions={(row) => ( 
                        <> 
                            <Buttons 
                                label={"Edit"} click={() => handleEdit(row.Id)} 
                                style="hidden sm:inline" 
                            /> 
                            <Buttons 
                                label={"Delete"} click={() => handleDelete(row.Id)} 
                                style="hidden sm:inline" 
                            /> 
                            
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
            </div>   </div>
        </div> 
    ) 
} 

export default Route_Master
