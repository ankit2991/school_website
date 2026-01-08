import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';
import Loader from '../../Components/Page_Forms/Loader';
import { getVehicleProviderDelete, getVehicleProviderList } from '../../services/api';

function Vehicle_Provider() {
    const navigate = useNavigate()
    const [searched, setSearched] = useState(false); 
    const instId = localStorage.getItem("InstituteID");
    const sessId = localStorage.getItem("SessionID");
    const [providerList, setProviderList] = useState([]);
    const [searchText, setSearchText] = useState(""); 
    const [filteredList, setFilteredList] = useState([]);
    const columns = [
        { header: "Provider Name", shortHeader: "Provider", accessor: "Name" },       
    ]
    

    // =================== VEHICLE PROVIDER LIST ====================== 
    useEffect(() => { 
        fetchVehicleProvider(); 
    }, []); 
    
    const fetchVehicleProvider = async () => { 
        try { 
            setSearched(true); 
            const res = await getVehicleProviderList(instId, sessId); 
            
            if (res?.Table) { 
                setProviderList(res.Table); 
                setFilteredList(res.Table); // 👈 default table data 
            } 
        } catch (error) { 
            console.error("Stop API Error:", error); 
        } finally { 
            setSearched(false); 
        } 
    };
    // =================== FILTER ====================== 
    const handleFilter = (text) => { 
        const value = text.toLowerCase(); 
        if (!value) { 
            setFilteredList(providerList); 
            return; 
        } 
        const filtered = providerList.filter(item => 
            item.Name?.toLowerCase().includes(value) 
        ); 
        
        setFilteredList(filtered); 
    }; 
    
    
    // =================== BUTTON FILTER ====================== 
    const handleSearch = () => { 
        setSearched(true); 
        setTimeout(() => { 
            handleFilter(searchText); 
            setSearched(false); 
        }, 300); 
    };

    // =================== DELETE ====================== 
        // const handleDelete = async (vehId) => {
        //     if (!vehId) return;
    
        //     try{ 
        //         setSearched(true) 
        //         const res = await getVehicleProviderDelete(vehId) 
        //         if (res?.Table?.length) { 
        //             const msg = res.Table[0].Column1 
        //             console.log(msg) 
                    
        //             if (msg.startsWith("M103")) { 
        //                 fetchVehicleProvider()
        //                 alert("Vehicle Provider Deleted") 
        //             } 
                    
        //             else if (msg.startsWith("M200")) { 
        //                 alert("Record Exists.") 
        //             } 
                    
        //             else { 
        //                 alert("Something went wrong") 
        //             } 
        //         } 
        //     } catch (error) { 
        //         console.error("Delete Stop Error:", error) 
        //     } finally { 
        //         setSearched(false) 
        //     } 
        // }

        const handleDelete = async (vehId) => {
    if (!vehId) return;

    try {
        setSearched(true);
        const res = await getVehicleProviderDelete(vehId);

        if (res?.Table?.length) {
            const msg = res.Table[0].Column1;

            if (msg.startsWith("M103")) {

                // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED)
                setProviderList(prev =>
                    prev.filter(item => item.Id !== vehId)
                );

                setFilteredList(prev =>
                    prev.filter(item => item.Id !== vehId)
                );

                alert("Vehicle Provider Deleted");
            } 
            else if (msg.startsWith("M200")) {
                alert("Record Exists.");
            } 
            else {
                alert("Something went wrong");
            }
        }
    } catch (error) {
        console.error("Delete Stop Error:", error);
    } finally {
        setSearched(false);
    }
}; 
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched}/>
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Provider Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/Vehicle-Provider")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                <FormInput 
                    label={"Provider"} placeholder={"Enter Provider"} value={searchText} 
                    onChange={(e) => { 
                        const val = e.target.value; 
                        setSearchText(val); 
                        handleFilter(val); 
                    }} 
                /> 
            </div>
            
            <div className="flex justify-end">
                <Buttons click={handleSearch} label={"Search"} />                    
            </div>
            
             <div className='w-full flex justify-center'>

            <div className="w-full sm:w-6xl mt-5">
                <Table columns={columns} data={filteredList} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => navigate("/Vehicle-Provider", { state: row.Id }) } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Vehicle-Provider", { state: row.Id })} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
                    </>
                )}/>
            </div>
             </div>
        </div>
    )
}

export default Vehicle_Provider