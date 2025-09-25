import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading'
import FormInput from '../../Components/Page_Forms/FormInput'
import Options from '../../Components/Page_Forms/Options'
import CheckBox from '../../Components/Page_Forms/CheckBox'
import Table from '../../Components/Page_Forms/Table'
import Buttons from '../../Components/Page_Forms/Buttons'

function Fee_Receipt2() {
    const [agree, setAgree] = useState(false)
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
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"Pay School Fees"}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
                <FormInput label={"Sr. No."} placeholder={" Enter Serial No."}/>
                <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]}/>
                <FormInput label={"Father Name"} placeholder={"Enter Father Name"}/>
                <FormInput label={"Mother Name"} placeholder={"Enter Mother Name"}/>
                <FormInput label={"Session"} placeholder={" Enter Session"}/>
                <FormInput label={"Receipt Number"} placeholder={" Enter Session"}/>
                <FormInput label={"Receipt Date"} type='date'/>
                <Options label={"Fee Selection"} name={""} optionMsg="Select Fee Selection" options={["Tution Fee", "Other Fee"]}/>
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
                    <Options label="Deposit In Bank" name="depositBank" optionMsg="Select Deposit In Bank" options={["Punjab National Bank", "Bank Of Baroda", "State Bank Of India"]}/>
                )}
            
                {/* If Cheque → show Cheque fields */}
                {paymentMode === "Cheque" && (
                    <>
                        <FormInput label="Cheque Number" placeholder="Enter Cheque Number" />
                        <FormInput label="Cheque Date" type="date" />
                        <Options label={"Cheque Bank"} name={""} optionMsg="Select Cheque Bank" options={["Punjab National Bank", "Bank Of Baroda", "State Bank Of India"]}/>
                    </>
                )}
            
                {/* If Online/Paytm → show Transaction fields */}
                {(paymentMode === "Online Payment" || paymentMode === "Paytm") && (
                    <>
                        <FormInput label="Transaction Number" placeholder="Enter Transaction Number" />
                        <FormInput label="Transaction Date" type="date" />
                    </>
                )}
            
                <div className="flex flex-col space-y-2">
                    <FormInput label={"Total Amount"} placeholder={" Enter Total Amount"}/>
                    <CheckBox label={"Auto Adjust"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                </div>
                <FormInput label={"Net Amount"} placeholder={" Enter Net Amount"}/>
                <FormInput label={"Discount Amount"} placeholder={" Enter Discount Amount"}/>
                <FormInput label={"Fine"} placeholder={" Enter Fine"}/>
                
            </div>
            <div className="w-full gap-6 mb-5 grid grid-cols-1 ">
                <CheckBox label={"Is SMS Send"} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>                        
            </div>

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Fee_Receipt2