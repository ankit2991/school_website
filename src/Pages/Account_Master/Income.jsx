import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../../Components/Page_Forms/Heading'
import Options from '../../Components/Page_Forms/Options'
import FormInput from '../../Components/Page_Forms/FormInput'
import Buttons from '../../Components/Page_Forms/Buttons'

function Income() {
    const navigate = useNavigate()
    const [paymentMode, setPaymentMode] = useState("");
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <div className="flex justify-between mb-5">
                <Heading label={"Income Master"} />
            </div>
            
            <div className="mb-5 w-full">
                <Options label={"Voucher Number"} name={""} optionMsg="Select Voucher Number" options={["2", "3", "7"]}/>
            </div>
            
            <div className="flex justify-between mb-5">
                <Buttons click={() => navigate("/")} label={"Add"} />
                <Buttons click={() => navigate("/")} label={"Search"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Date"} type='date'/>
                <FormInput label={"Income Ledger"} placeholder={"Enter DR Amount"}/>
                <Options label="Payment Mode" name="paymentMode" optionMsg="Select Payment Mode" 
                    options={["Cash", "Cheque", "Online Payment", "Paytm"]} onChange={(e) => setPaymentMode(e.target.value)}
                />
                {(paymentMode === "Cheque" || paymentMode === "Online Payment" || paymentMode === "Paytm") && (
                    <Options label="Bank Name" name="depositBank" optionMsg="Select Deposit In Bank" options={["Punjab National Bank", "Bank Of Baroda", "State Bank Of India"]}/>
                )}
                
                {/* If Cheque → show Cheque fields */}
                {paymentMode === "Cheque" && (
                    <>
                        <FormInput label="Cheque Number" placeholder="Enter Cheque Number" />
                    </>
                )}
                
                {/* If Online/Paytm → show Transaction fields */}
                {(paymentMode === "Online Payment" || paymentMode === "Paytm") && (
                    <>
                        <FormInput label="Transaction Number" placeholder="Enter Transaction Number" />
                    </>
                )}
                
                <FormInput label={"Amount"} placeholder={" Enter Amount"}/>
                <FormInput label={"Amount in Words"} placeholder={" Enter Amount in Words"}/>
                <FormInput label={"Narration"} placeholder={" Enter Narration"}/>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between gap-y-6 mb-5">
                <div className="flex justify-around sm::justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label={"Cancel"} style='px-6 py-2'/>
                    <Buttons label={"Save"} style='px-6 py-2'/>
                </div>
                <div className="flex justify-around sm:justify-end space-x-0 sm:space-x-10 pt-2">
                    <Buttons label={"Delete"} style='px-6 py-2'/>
                    <Buttons label={"Print"} style='px-6 py-2'/>
                </div>
            </div>
        </div>
    )
}

export default Income