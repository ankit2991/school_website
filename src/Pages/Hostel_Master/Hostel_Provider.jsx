// import React, { useEffect, useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { useNavigate } from 'react-router-dom';
// import Table from '../../Components/Page_Forms/Table';
// import Options from '../../Components/Page_Forms/Options';
// import FormInput from '../../Components/Page_Forms/FormInput';
// import { getHostelProviderDelete, getHostelProviderList } from '../../services/api';
// import Loader from '../../Components/Page_Forms/Loader';

// function Hostel_Provider() {
//     const navigate = useNavigate()
//     const [searched, setSearched] = useState(false); 
//     const instId = localStorage.getItem("InstituteID"); 
//     const sessId = localStorage.getItem("SessionID"); 
//     const [providerList, setProviderList] = useState([]); 
//     const [searchText, setSearchText] = useState(""); 
//     const [filteredList, setFilteredList] = useState([]);
//     const columns = [
//         { header: "Provider Name", shortHeader: "Provider", accessor: "Name" },       
//     ]


//     // =================== VEHICLE PROVIDER LIST ====================== 
//         useEffect(() => { 
//             fetchVehicleProvider(); 
//         }, []); 
        
//         const fetchVehicleProvider = async () => { 
//             try { 
//                 setSearched(true); 
//                 const res = await getHostelProviderList(instId, sessId); 
                
//                 if (res?.Table) { 
//                     setProviderList(res.Table); 
//                     setFilteredList(res.Table); // 👈 default table data 
//                 } 
//             } catch (error) { 
//                 console.error("Stop API Error:", error); 
//             } finally { 
//                 setSearched(false); 
//             } 
//         };
//         // =================== FILTER ====================== 
//         const handleFilter = (text) => { 
//             const value = text.toLowerCase(); 
//             if (!value) { 
//                 setFilteredList(providerList); 
//                 return; 
//             } 
//             const filtered = providerList.filter(item => 
//                 item.Name?.toLowerCase().includes(value) 
//             ); 
            
//             setFilteredList(filtered); 
//         }; 
        
        
//         // =================== BUTTON FILTER ====================== 
//         const handleSearch = () => { 
//             setSearched(true); 
//             setTimeout(() => { 
//                 handleFilter(searchText); 
//                 setSearched(false); 
//             }, 300); 
//         };


//         // =================== DELETE ====================== 
//                 const handleDelete = async (hostelid) => {
//             if (!hostelid) return;
        
//             try {
//                 setSearched(true);
//                 const res = await getHostelProviderDelete(hostelid);
        
//                 if (res?.Table?.length) {
//                     const msg = res.Table[0].Column1;
        
//                     if (msg.startsWith("M103")) {
        
//                         // ✅ REMOVE ROW IMMEDIATELY (NO REFRESH REQUIRED)
//                         setProviderList(prev =>
//                             prev.filter(item => item.Id !== hostelid)
//                         );
        
//                         setFilteredList(prev =>
//                             prev.filter(item => item.Id !== hostelid)
//                         );
        
//                         alert("Hostel Provider Deleted");
//                     } 
//                     else if (msg.startsWith("M200")) {
//                         alert("Record Exists.");
//                     } 
//                     else {
//                         alert("Something went wrong");
//                     }
//                 }
//             } catch (error) {
//                 console.error("Delete Stop Error:", error);
//             } finally {
//                 setSearched(false);
//             }
//         };
    



    
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Loader show={searched}/>
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Provider Master"} style={"text-[22px] sm:text-3xl"} />
//                 <Buttons click={() => navigate("/Hostel-Provider")} label={"Add"} style='whitespace-nowrap h-10'/>                    
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-5 w-full">
//                 {/* <Options label={"Provider"} name={""} optionMsg="Select Provider" options={["Apna Ghar", "Radha Girls Hostel", "Baba Boys Hostel"]}/> */}
//                 {/* <FormInput label={"Provider"} placeholder={"Enter Provider"} /> */}
//                 <FormInput 
//                     label={"Provider"} placeholder={"Enter Provider"} value={searchText} 
//                     onChange={(e) => { 
//                         const val = e.target.value; 
//                         setSearchText(val); 
//                         handleFilter(val); 
//                     }} 
//                 /> 
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={handleSearch} label={"Search"} />                    
//             </div>
//              <div className='w-full flex justify-center'>

//             <div className="w-full sm:w-6xl mt-5">
//                 <Table columns={columns} data={filteredList} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => navigate("/Hostel-Provider", { state: row.Id }) } style="hidden sm:inline" />
//                         <Buttons label={"Delete"} click={() => handleDelete(row.Id)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => navigate("/Hostel-Provider", { state: row.Id })} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5"  onClick={() => handleDelete(row.Id)} >🗑️</button>
//                     </>
//                 )}/>
//             </div>
//              </div>
//         </div>
//     )
// }

// export default Hostel_Provider



import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import Table from '../../Components/Page_Forms/Table'
import Loader from '../../Components/Page_Forms/Loader'
import Dialog from '../../Components/Page_Forms/Dialog'
import {
    getHostelProviderList,
    getHostelProviderDelete,
    getHostelProviderDetail,
    getHostelProviderInsertUpdate
} from '../../services/api'

function Hostel_Provider() {

    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [searched, setSearched] = useState(false)
    const [providerList, setProviderList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [providerName, setProviderName] = useState("")

    const [open, setOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [editProviderId, setEditProviderId] = useState(0)

    const [form, setForm] = useState({
        name: "",
        contact: "",
        address: "",
        email: ""
    })

    const [errors, setErrors] = useState({})

    const columns = [
        { header: "Provider Name", shortHeader: "Provider", accessor: "Name" }
    ]

    // ================= LOAD LIST =================
    useEffect(() => {
        fetchProviders()
    }, [])

    const fetchProviders = async () => {
        try {
            setSearched(true)
            const res = await getHostelProviderList(instId, sessId)
            if (res?.Table) {
                setProviderList(res.Table)
                setFilteredList(res.Table)
            }
        } catch (error) {
            console.error("Hostel Provider List Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= FILTER =================
    useEffect(() => {
        if (!providerName.trim()) {
            setFilteredList(providerList)
        } else {
            const filtered = providerList.filter(item =>
                item.Name?.toLowerCase().includes(providerName.toLowerCase())
            )
            setFilteredList(filtered)
        }
    }, [providerName, providerList])

    // ================= VALIDATION =================
    const validateForm = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = "Required"
        if (!form.contact.trim()) newErrors.contact = "Required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // ================= EDIT =================
    const handleEdit = async (id) => {
        try {
            setSearched(true)
            const res = await getHostelProviderDetail(id, instId, sessId)
            if (res?.Table?.length) {
                const data = res.Table[0]
                setEditProviderId(id)
                setDialogTitle("Edit")
                setForm({
                    name: data.Name || "",
                    contact: data.ContactNo || "",
                    address: data.Address || "",
                    email: data.EmailId || ""
                })
            }
        } catch (error) {
            console.error("Hostel Provider Detail Error:", error)
        } finally {
            setSearched(false)
            setOpen(true)
        }
    }

    // ================= SAVE / UPDATE =================
    const handleSave = async () => {
        if (!validateForm()) return

        try {
            setSearched(true)
            const res = await getHostelProviderInsertUpdate(
                editProviderId,
                form.name,
                form.address,
                form.contact,
                form.email,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [code, text] = msg.split("|")

            if (code === "M101" || code === "M102") {
                alert(text)
                fetchProviders()
                clearForm()
                setOpen(false)
            } else if (code === "M200") {
                alert(text)
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.error("Save Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!id) return
        try {
            setSearched(true)
            const res = await getHostelProviderDelete(id)
            const msg = res?.Table?.[0]?.Column1 || ""
            if (msg.startsWith("M103")) {
                alert("Hostel Provider Deleted")
                fetchProviders()
            } else if (msg.startsWith("M200")) {
                alert("Record Exists.")
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.error("Delete Error:", error)
        } finally {
            setSearched(false)
        }
    }

    // ================= CLEAR =================
    const clearForm = () => {
        setForm({
            name: "",
            contact: "",
            address: "",
            email: ""
        })
        setErrors({})
        setEditProviderId(0)
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <div className="flex justify-between mb-5">
                <Heading label={"Hostel Provider Master"} />
                <Buttons
                    label={"Add"}
                    click={() => {
                        clearForm()
                        setDialogTitle("Add")
                        setOpen(true)
                    }}
                />
            </div>

            <Dialog
                open={open}
                title={dialogTitle}
                dialogstyle={"sm:w-5xl sm:h-[350px]"}
            >
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">

                        <FormInput
                            label="Name" placeholder={"Enter Name"} 
                            value={form.name} error={errors.name}
                            onChange={(e) => {
                                setForm(prev => ({ ...prev, name: e.target.value }))
                                if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                            }}
                        />

                        <FormInput
                            label="Contact Number" placeholder={"Enter Contact No."} 
                            value={form.contact} error={errors.contact} 
                            onChange={(e) => {
                                setForm(prev => ({ ...prev, contact: e.target.value }))
                                if (errors.contact) setErrors(prev => ({ ...prev, contact: "" }))
                            }}
                        />
                    </div>

                    <FormInput
                        label="Address" placeholder={"Enter Address"} value={form.address} 
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />

                    <FormInput
                        label="Email" placeholder={"Enter Email"} value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 mt-5">
                        <Buttons label="Cancel" click={() => { setOpen(false); clearForm() }} />
                        <Buttons label="Save" click={handleSave} />
                    </div>
                </>
            </Dialog>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                <FormInput
                    label="Provider"
                    placeholder="Enter Provider"
                    value={providerName}
                    onChange={(e) => setProviderName(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Buttons label="Search" />
            </div>

            <div className="mt-5">
                <Table
                    columns={columns}
                    data={filteredList}
                    actions={(row) => (
                        <>
                            <Buttons
                                label="Edit"
                                style="hidden sm:inline"
                                click={() => handleEdit(row.Id)}
                            />
                            <Buttons
                                label="Delete"
                                style="hidden sm:inline"
                                click={() => handleDelete(row.Id)}
                            />
                            <button className="sm:hidden text-lg pt-2.5" onClick={() => handleEdit(row.Id)}>✏️</button>
                            <button className="sm:hidden text-xl pt-2.5" onClick={() => handleDelete(row.Id)}>🗑️</button>
                        </>
                    )}
                />
            </div>
        </div>
    )
}

export default Hostel_Provider
