import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import Buttons from '../../Components/Page_Forms/Buttons'
import FormInput from '../../Components/Page_Forms/FormInput'
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import { getclass } from '../../services/api';

function Addmission_Fee_Receipt() {
    const navigate = useNavigate()
    const [classList, setClassList] = useState([]);

    // useEffect(() => {
    //     const instId = localStorage.getItem("InstituteID");  // ✅ Get dynamic ID
    //     if (!instId) return;
        
    //     async function fetchClasses() {
    //         try {
    //             const res = await getclass(instId);  // ✅ Pass selected Institute ID
    //             setClassList(res.Table || []);
    //         } catch (error) {
    //             console.log("Class API Error:", error);
    //         }
    //     }
        
    //     fetchClasses();
    // }, []);
    
    useEffect(() => {
        const instId = localStorage.getItem("InstituteID");
        if (!instId) return;
        
        async function fetchClasses() {
            try {
                const res = await getclass(instId);
                // ✅ check API success
                if (res?.Table?.[0]?.ResultCode === "R100") {
                    setClassList(res.Table1 || []);
                } else {
                    setClassList([]);
                }
            } catch (error) {
                console.log("Class API Error:", error);
                setClassList([]);
            }
        }
        
        fetchClasses();
    }, []);


    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Pay Fees"} />                                   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={classList.map(item => item.ClassName)}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
            </div>           

            <div className="flex justify-end">
                <Buttons click={() => navigate("/Addmission-Fees")} label={"Search"} />                    
            </div>
           
        </div>
    )
}

export default Addmission_Fee_Receipt