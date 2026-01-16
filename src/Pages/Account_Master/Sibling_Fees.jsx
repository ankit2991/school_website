import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'
import { getbank, getclass } from '../../services/api';
import CheckBox from '../../Components/Page_Forms/CheckBox';
import Table from '../../Components/Page_Forms/Table';

function Sibling_Fees() {
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




    const  [agree, setAgree] = useState(false)
        const [paymentMode, setPaymentMode] = useState("");
        const columns = [
            { header: "Month Name",  shortHeader: "Month", accessor: "month" },
            { header: "Category Name", shortHeader: "Category", accessor: "category" },
            { header: "Amount", accessor: "amount" },
            { header: "Paid Amount", accessor: "paid" },
            
        ]
        const data = [
            { id: 1, month: "January", category: "Addmission Fee", amount: "1000", paid: "500" },
            { id: 2, month: "Febraruy", category: "Addmission Fee", amount: "1000", paid: "500" },
            { id: 3, month: "March", category: "Addmission Fee", amount: "1000", paid: "500" },
            { id: 4, month: "April", category: "Addmission Fee", amount: "1000", paid: "500" },
            { id: 5, month: "May", category: "Addmission Fee", amount: "1000", paid: "500" },
            { id: 6, month: "June", category: "Addmission Fee", amount: "1000", paid: "500" },
        ];
        
        const columns2 = [
            { header: "Date",  shortHeader: "Date", accessor: "date" },
            { header: "Category Name", shortHeader: "Category", accessor: "category" },
            { header: "Month Name",  shortHeader: "Month", accessor: "month" },
            { header: "Receipt No.",  shortHeader: "Receipt", accessor: "receipt" },
            { header: "Amount", accessor: "amount" },
            
        ]
        const data2 = [
            { id: 1, date: "11/03/2025", category: "Addmission Fee", month: "January", receipt: "001", amount: "1000", },
            { id: 2, date: "13/04/2025", category: "Addmission Fee", month: "Febraruy", receipt: "002", amount: "1000", },
            { id: 3, date: "20/04/2025", category: "Addmission Fee", month: "March", receipt: "003", amount: "1000", },
            { id: 4, date: "25/05/2025", category: "Addmission Fee", month: "April", receipt: "004", amount: "1000", },
            { id: 5, date: "29/05/2025", category: "Addmission Fee", month: "May", receipt: "005", amount: "1000", },
            { id: 6, date: "04/07/2025", category: "Addmission Fee", month: "June", receipt: "006", amount: "1000", },
        ];
    
        const[banklist, setBanklist] = useState([]);
        useEffect (() => {
            const instId = localStorage.getItem("InstituteID")
            if (!instId) return;
    
            async function fetchBank() {
                try{
                    const res = await getbank(instId);
                    if (res?.Table?.[0]?.ResultCode === "R100"){
                        setBanklist(res.Table1 || []);
                    } else {
                        setBanklist([]);
                    }
                }catch{
                    console.log("Bank API Error:", error);
                    setBanklist([]);
                }
            }
            
            fetchBank();
        }, [])

    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Sibling Fees"} />                                   
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
                <Options label={"Class"} name={""} optionMsg="Select Class" options={classList.map(item => item.ClassName)}/>
                <Options label={"Student Name"} name={""} optionMsg="Select Student Name" options={["Priya Iyer", "Arush Bhola", "Varun Yadav"]}/>
                <Options label={"Vehicle"} name={""} optionMsg="Select Vehicle" options={["Bus", "Taxi", "Van"]}/>
                <FormInput label={"Sr. No."} placeholder={"Enter Serial No. "} />
                <FormInput label={"Father Name"} placeholder={"Enter Father Name "} />
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name "} />
            </div>           

            <div className="flex justify-end mb-5">
                <Buttons click={() => navigate("/Sibling-Fee-Receipt")} label={"Search"} />                    
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                {/* <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Sr. No."} placeholder={" Enter Serial No."}/>
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"}/>
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"}/> */}
                <FormInput label={"Session"} placeholder={" Enter Session"}/>
                <FormInput label={"Receipt Number"} placeholder={" Enter Session"}/>
                <FormInput label={"Receipt Date"} type='date'/>
            </div>
            <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
                <FormInput label={"Remarks"} placeholder={" Enter Remarks"}/>
                <CheckBox label={"Receipt Print"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                    
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '>
                <div className="flex flex-col items-center">
                    <h2 className='cursor-default text-md font-semibold mb-2 text-gray-700'>Pending Fees</h2>
                    <Table columns={columns} data={data}/>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className='cursor-default text-md font-semibold mb-2 text-gray-700'>Paid Fees</h2>
                    <Table columns={columns2} data={data2}/>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Pending Amount"} placeholder={"Enter Pending Amount"}/>
                <FormInput label={"Deposit Amount"} placeholder={" Enter Deposit Amount"}/>
                <Options label="Payment Mode" name="paymentMode" optionMsg="Select Payment Mode" 
                    options={["Cash", "Cheque", "Online Payment", "Paytm"]} onChange={(e) => setPaymentMode(e.target.value)}
                />
                {(paymentMode === "Cheque" || paymentMode === "Online Payment" || paymentMode === "Paytm") && (
                    <Options label="Deposit In Bank" name="depositBank" optionMsg="Select Deposit In Bank" options={banklist.map(item => item.Name)}/>
                )}

                {/* If Cheque → show Cheque fields */}
                {paymentMode === "Cheque" && (
                    <>
                        <FormInput label="Cheque Number" placeholder="Enter Cheque Number" />
                        <FormInput label="Cheque Date" type="date" />
                    </>
                )}
                
                {/* If Online/Paytm → show Transaction fields */}
                {(paymentMode === "Online Payment" || paymentMode === "Paytm") && (
                    <>
                        <FormInput label="Transaction Number" placeholder="Enter Transaction Number" />
                        <FormInput label="Transaction Date" type="date" />
                    </>
                )}
                <FormInput label={"Total Amount"} placeholder={" Enter Total Amount"}/>
                <FormInput label={"Net Amount"} placeholder={" Enter Net Amount"}/>
            </div>
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
           
        </div>
    )
}

export default Sibling_Fees