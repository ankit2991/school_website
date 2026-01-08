// import React, { useEffect, useState } from 'react'
// import Heading from '../../../Components/Page_Forms/Heading'
// import FormInput from '../../../Components/Page_Forms/FormInput'
// import CheckBox from '../../../Components/Page_Forms/CheckBox'
// import Options from '../../../Components/Page_Forms/Options'
// import Buttons from '../../../Components/Page_Forms/Buttons'
// import { useLocation } from 'react-router-dom'
// import { getExamDetail, getExamTypeDetail, getExamTypeInsertUpdate } from '../../../services/api'
// import Loader from '../../../Components/Page_Forms/Loader'

// function Exam2() {
//     const location = useLocation() 
//     const examid = location.state 
//     const instId = localStorage.getItem("InstituteID") 
//     const sessId = localStorage.getItem("SessionID") 
//     const userId = localStorage.getItem("UserId") 
//     const [searched, setSearched] = useState(false) 
//     const [agree, setAgree] = useState(false);
    
//     const [form, setForm] = useState({ 
//         name: "", alias: "", final: "", suppli: "",
//     }) 
    
    // // ================= FETCH EXAM TYPE DETAIL ================= 
    // useEffect(() => { 
    //     if (examtypeid) { 
    //         fetchExamDetail() 
    //     } 
    // }, [examtypeid]) 
    
    // const fetchExamDetail = async () => { 
    //     try { 
    //         setSearched(true) 
    //         const res = await getExamDetail(examid, instId, sessId,) 
            
    //         if (res?.Table?.length > 0) { 
    //             const data = res.Table[0] 
    //             setForm({ 
    //                 name: data.Name || "", 
    //                 alias: data.Alias || "", 
    //             }) 
    //         } 
    //     } catch (error) { 
    //         console.error("Exam Detail Error:", error) 
    //     } finally { 
    //         setSearched(false) 
    //     } 
    // } 

//     // =================== SAVE / UPDATE ====================== 
//     const handleSave = async () => { 
//         try { 
//             setSearched(true) 
//             const res = await getExamTypeInsertUpdate( 
//                 examtypeid || 0, form.name, form.alias, 
//                 userId, instId, sessId 
//             ) 

//             const msg = res?.Table?.[0]?.Column1 || ""  
//             const code = msg.split("|")[0] 
//             const text = msg.split("|")[1] 
            
//             if (code === "M101" || code === "M102") { 
//                 alert(text) 
//             } 
//             else if (code === "M200") { 
//                 alert(text) 
//             } 
//             else { 
//                 alert("Something went wrong") 
//             } 
//         } catch (error) { 
//             console.error("Save Error:", error) 
//             alert("Server error") 
//         } finally { 
//             setSearched(false) 
//         } 
//     }
    
    
//     return ( 
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2"> 
//             <Loader show={searched} /> 
//             <div className="flex justify-between mb-5"> 
//                 <Heading label={"Exam Type"} /> 
//             </div> 
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full"> 
//                 <FormInput  
//                     label={"Name"} placeholder={"Enter  Name "} value={form.name} 
//                     onChange={(e) => setForm({ ...form, name: e.target.value })} 
//                 /> 
//                 <FormInput 
//                     label={"Alias"} placeholder={"Enter Alias "} value={form.alias} 
//                     onChange={(e) => setForm({ ...form, alias: e.target.value })} 
//                 /> 
//                 <CheckBox label={"Final Exam"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/> 
//                 <CheckBox label={"Suppli. Exam"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/> 
//                 <Options 
//                     label="Hostel Provider" options={["a","b"]} 
//                 />
//             </div> 
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-y-6 mb-5"> 
//                 <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
//                     <Buttons label={"Cancel"} style='px-6 py-2'/> 
//                     <Buttons label={"Save"} style='px-6 py-2' click={handleSave} /> 
//                     <Buttons label={"Print"} style='px-6 py-2'/> 
//                 </div> 
//             </div> 
//         </div> 
//     ) 
// } 

// export default Exam2

import React, { useEffect, useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import { useLocation } from 'react-router-dom'
import {getExamDetail, getExamInsertUpdate, } from '../../../services/api'
import Loader from '../../../Components/Page_Forms/Loader'

function Exam2() {

    const location = useLocation()
    const examid = location.state
    const instId = localStorage.getItem("InstituteID")
    const sessId = localStorage.getItem("SessionID")
    const userId = localStorage.getItem("UserId")

    const [searched, setSearched] = useState(false)

    // ✅ BOOLEAN STATE
    const [form, setForm] = useState({
        name: "",
        alias: "",       
    })


    
    // ================= FETCH EXAM DETAIL ================= 
    useEffect(() => { 
        if (examid) { 
            fetchExamDetail() 
        } 
    }, [examid]) 
    
    const fetchExamDetail = async () => { 
        try { 
            setSearched(true) 
            const res = await getExamDetail(examid, instId, sessId,) 
            
            if (res?.Table?.length > 0) { 
                const data = res.Table[0] 
                setForm({ 
                    name: data.Name || "", 
                    alias: data.Alias || "", 
                }) 
            } 
        } catch (error) { 
            console.error("Exam Detail Error:", error) 
        } finally { 
            setSearched(false) 
        } 
    } 

    // ================= SAVE / UPDATE =================
    const handleSave = async () => {
        try {
            setSearched(true)

            const res = await getExamInsertUpdate(
                examid || 0,
                form.name,
                form.alias,
                userId,
                instId,
                sessId
            )

            const msg = res?.Table?.[0]?.Column1 || ""
            const [, text] = msg.split("|")
            alert(text || "Saved")

        } catch (error) {
            console.error("Save Error:", error)
            alert("Server error")
        } finally {
            setSearched(false)
        }
    }

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <Loader show={searched} />

            <Heading label={"Exam Master"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-5 w-full">

                <FormInput
                    label="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <FormInput
                    label="Alias"
                    value={form.alias}
                    onChange={(e) =>
                        setForm({ ...form, alias: e.target.value })
                    }
                />
            </div>

            <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2"> 
                    <Buttons label={"Cancel"} style='px-6 py-2'/> 
                    <Buttons label={"Save"} style='px-6 py-2' click={handleSave} /> 
                </div> 
        </div>
    )
}

export default Exam2
