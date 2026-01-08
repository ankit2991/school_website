// import React, { useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Options from '../../Components/Page_Forms/Options'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Buttons from '../../Components/Page_Forms/Buttons'

// function Add_Stop2() {
//     const [agree, setAgree] = useState(false)
//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <Heading label={"Stop Master"} style={"mb-5"} />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <FormInput label={"Destination"} placeholder={"Enter Destination"}/>
//                 <FormInput label={"Cost"} placeholder={" Enter Cost"}/>
//                 <Options label="Route" name="paymentMode" optionMsg="Select Route" options={["Shastri Nagar", "Jalori Gate", "Pratap Nagar"]}/>
//                 <div className="flex flex-col space-y-2">
//                     <FormInput label={"Route Order No."} placeholder={" Enter Route Order No."}/>
//                     <CheckBox label={"Is All Institute"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                        
//                 </div>
//             </div>
//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
//                 <Buttons label={"Cancel"}/>
//                 <Buttons label={"Save"}/>
//             </div>
//         </div>
//     )
// }

// export default Add_Stop2

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Buttons from '../../Components/Page_Forms/Buttons'
import Loader from '../../Components/Page_Forms/Loader'
import { getRoute, getStop, getStopdetail, getStopInsertUpdate } from '../../services/api'

function Add_Stop2() { 
    const navigate = useNavigate() 
    const location = useLocation() 
    const stopId = location.state 
    const instId = localStorage.getItem("InstituteID") 
    const sessId = localStorage.getItem("SessionID") 
    const userId = localStorage.getItem("UserId")
    const [routeList, setRouteList] = useState([]) 
    const [searched, setSearched] = useState(false) 
    
    const [form, setForm] = useState({
        destination: "", cost: "", routeId: "", orderNo: "", isAllInstitute: false 
    }) 
    
    // ================= FETCH STOP DETAIL ================= 
    useEffect(() => { 
        if (stopId) { 
            fetchStopDetail() 
        } 
    }, [stopId]) 
    
    const fetchStopDetail = async () => { 
        try { 
            setSearched(true) 
            const res = await getStopdetail(instId, sessId, stopId) 
            
            if (res?.Table?.length > 0) { 
                const data = res.Table[0] 
                
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
    try {
        setSearched(true)


        const res = await getStopInsertUpdate(
            stopId || 0,                 // StopId (0 = insert)
            form.destination,            // Dest
            form.cost,                   // Cost
            form.isAllInstitute ? 1 : 0, // IsInst
            form.routeId,                // RId
            userId,                      // UserId
            instId,                      // InstId
            sessId                       // SessionId
        )

        const msg = res?.Table?.[0]?.Column1 || ""
        const code = msg.split("|")[0]
        const text = msg.split("|")[1]

        if (code === "M101" || code === "M102") {
            alert(text)                  // Insert / Update success
            // navigate(-1)
        } 
        else if (code === "M200") {
            alert(text)                  // Duplicate
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
            <Loader show={searched} />

            <Heading label={"Stop Master"} style={"mb-5"} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <FormInput
                    label={"Destination"}
                    placeholder={"Enter Destination"}
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                />

                <FormInput
                    label={"Cost"}
                    placeholder={"Enter Cost"}
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                /> 
                
                <Options 
                    label="Route" name="route" optionMsg="Select Route" options={routeList} 
                    labelKey="RouteName" valueKey="Id" value={form.routeId} 
                    onChange={(e) => setForm({ ...form, routeId: e.target.value }) } 
                />


                <div className="flex flex-col space-y-2">
                    <FormInput
                        label={"Route Order No."}
                        placeholder={"Enter Route Order No."}
                        value={form.orderNo}
                        onChange={(e) => setForm({ ...form, orderNo: e.target.value })}
                    />

                    <CheckBox
                        label={"Is All Institute"}
                        checked={form.isAllInstitute}
                        onChange={(e) =>
                            setForm({ ...form, isAllInstitute: e.target.checked })
                        }
                    />
                </div>
            </div>

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"} click={() => navigate(-1)} />
                <Buttons label={"Save"} click={handleSave} />

            </div>
        </div>
    )
}

export default Add_Stop2

