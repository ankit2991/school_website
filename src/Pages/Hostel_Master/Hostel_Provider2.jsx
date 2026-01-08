import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'
import { getHostelProviderDetail, getHostelProviderInsertUpdate } from '../../services/api'
import { useLocation } from 'react-router-dom'
import Loader from '../../Components/Page_Forms/Loader'

function Hostel_Provider2() { 
    const location = useLocation() 
    const hostelid = location.state 
    const instId = localStorage.getItem("InstituteID") 
    const sessId = localStorage.getItem("SessionID") 
    const userId = localStorage.getItem("UserId") 
    const [searched, setSearched] = useState(false) 

    const [form, setForm] = useState({ 
        name: "", address: "", contact: "", email: "", 
    }) 
    
    // ================= FETCH STOP DETAIL ================= 
    useEffect(() => { 
        if (hostelid) { 
            fetchProviderDetail() 
        } 
    }, [hostelid]) 
    
    const fetchProviderDetail = async () => { 
        try { 
            setSearched(true) 
            const res = await getHostelProviderDetail(hostelid, instId, sessId,) 
            
            if (res?.Table?.length > 0) { 
                const data = res.Table[0] 
                setForm({ 
                    name: data.Name || "", 
                    address: data.Address || "", 
                    contact: data.ContactNo || "", 
                    email: data.EmailId || "", 
                }) 
            } 
        } catch (error) { 
            console.error("Stop Detail Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 

    // =================== SAVE / UPDATE ====================== 
    const handleSave = async () => { 
        try { 
            setSearched(true) 
            const res = await getHostelProviderInsertUpdate( 
                hostelid || 0, form.name, form.address, form.contact, 
                form.email, userId, instId, sessId 
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
        
            } catch (error) {
                console.error("Save Error:", error)
                alert("Server error")
            } finally {
                setSearched(false)
            }
        }
    

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched}/>
            <Heading label={"Provider Master"} style={"mb-5"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput 
                    label={"Name"} placeholder={"Enter Name"} value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                />
                <FormInput 
                    label={"Contact Number"} placeholder={" Enter Contact No."} value={form.contact} 
                    onChange={(e) => setForm({ ...form, contact: e.target.value })} 
                />                
            </div>
            <FormInput 
                label={"Address"} placeholder={" Enter Address"} inputStyle='mb-5' value={form.address} 
                onChange={(e) => setForm({ ...form, address: e.target.value })} 
            />                
            <FormInput 
                label={"Email"} placeholder={" Enter Email"} inputStyle='mb-5' value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />                
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"} />
                <Buttons label={"Save"} click={handleSave} />
            </div>
        </div>
    )
}

export default Hostel_Provider2