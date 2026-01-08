import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Page_Forms/Table';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';
import { getVehicleDelete, getVehicleList } from '../../services/api';
import Loader from '../../Components/Page_Forms/Loader';

function Vehicle_Master() {
    const navigate = useNavigate() 
    const [searched, setSearched] = useState(false); 
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID"); 
    const [vehicleList, setVehicleList] = useState([]); 
    const [searchText, setSearchText] = useState(""); 
    const [filteredList, setFilteredList] = useState([]);
    const columns = [
        { header: "Vehicle Number", shortHeader: "Vehicle No.", accessor: "VehicleNo" },       
    ]

    // =================== VEHICLE PROVIDER LIST ====================== 
    useEffect(() => { 
        fetchVehicleList(); 
    }, []); 

    const fetchVehicleList = async () => { 
        try { 
            setSearched(true); 
            const res = await getVehicleList(instId, sessId); 
            if (res?.Table) { 
                setVehicleList(res.Table); 
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
            setFilteredList(vehicleList); 
            return; 
        } 
        const filtered = vehicleList.filter(item => 
            item.VehicleNo?.toLowerCase().includes(value) 
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
            const handleDelete = async (vehId) => {
        if (!vehId) return;
    
        try {
            setSearched(true);
            const res = await getVehicleDelete(vehId);
    
            if (res?.Table?.length) {
                const msg = res.Table[0].Column1;
    
                if (msg.startsWith("M103")) {
    
                    // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED)
                    setVehicleList(prev =>
                        prev.filter(item => item.Id !== vehId)
                    );
    
                    setFilteredList(prev =>
                        prev.filter(item => item.Id !== vehId)
                    );
    
                    alert("Vehicle Deleted");
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
                <Heading label={"Vehicle Master"} style={"text-[22px] sm:text-3xl"} />
                <Buttons click={() => navigate("/Vehicle-Master")} label={"Add"} style='whitespace-nowrap h-10'/>                    
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
                {/* <Options label={"Vehicle No."} name={""} optionMsg="Select Vehicle No." options={["RJ19 DF 1245", "RJ19 SE 7309", "RJ19 YD 6010"]}/> */}
                <FormInput 
                    label={"Vehicle No."} placeholder={"Enter Vehicle No."} value={searchText} 
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
                        <Buttons label={"Edit"} click={() => navigate("/Vehicle-Master", { state: row.Id }) } style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Vehicle-Master", { state: row.Id })} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
                    </>
                )}/>
            </div>
             </div>
        </div>
    )
}

export default Vehicle_Master