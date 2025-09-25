import React, { useState } from "react";
import TabBar from "../../Components/Page_Forms/TabBar";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";


function Cash_In_Hand() {
    
    return (
    <div className="w-full h-full bg-white  px-4 py-2 flex flex-col">
         <div className="flex justify-between mb-5">
            <Heading label={"Cash In Hand"} />
            <Buttons label="Refresh" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
            <FormInput label="Date"type="date" />
            <Options label={"Branch"} name={""} optionMsg="Select Branch" options={["Institute1", "Institute2"]}/>
        </div>
        <TabBar
            style="mb-5"
            defaultTab={0}
            tabs={[
                {
                    label: "Cash in Hand",
                    content: (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                            <FormInput label="Previous Day Balance" name="prevBalance" />
                            <FormInput label="Day Receipt" name="dayReceipt" />
                            <FormInput label="Day Payment" name="dayPayment" />
                            <FormInput label="Day Total" name="dayTotal" />
                        </div>
                    ),
                },
                {
                    label: "Cash Denomination",
                    content: (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                            {[2000, 500, 200, 100, 50, 20, 10, 5, 2, 1].map((note) => (
                                <FormInput key={note} label={`${note} X`} name={`note${note}`} />
                            ))}
                            <FormInput label="Total" name="total" />
                        </div>
                    ),
                },
            ]}
        />
        
        <div className="w-full flex justify-between ">
            <Buttons label="Clear" />
            <Buttons label="Save" />
        </div>

    </div>  
  );
}

export default Cash_In_Hand;
