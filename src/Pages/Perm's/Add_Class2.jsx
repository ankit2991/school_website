// import React, { useState } from 'react'
// import Heading from '../../Components/Page_Forms/Heading'
// import FormInput from '../../Components/Page_Forms/FormInput'
// import Table from '../../Components/Page_Forms/Table'
// import CheckBox from '../../Components/Page_Forms/CheckBox'
// import Buttons from '../../Components/Page_Forms/Buttons'
// import { useNavigate } from 'react-router-dom'

// function Add_Class2() {
//     const navigate = useNavigate()
//     const [agree, setAgree] = useState(false)
//     const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close

//     return (
//         <div className="w-full h-full bg-white flex flex-col px-4 py-2">
//             <div className="flex justify-between items-center gap-x-4 mb-5">
//                 <Heading label={"Session Master"} style={"text-[22px] sm:text-3xl"} />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
//                 <FormInput label={"Class"} placeholder={"Enter Class"} />
//                 <FormInput label={"Order No."} placeholder={"Enter Order No."} />
//                 <FormInput label={"Promote Class"} placeholder={"Enter Promote Class"} />
//             </div>

//             <Table columns={columns} data={data} onRowSelect={() => {}} disableFloatingRow={false} 
//                 onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} actions={(row) => 
//                     !row.isFooter && (<CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
//                 )}
//             />

//             <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
//                 <Buttons label={"Cancel"}/>
//                 <Buttons label={"Save"}/>
//             </div>

//             {/* ✅ Dynamic div for spacing */}
//             {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}
//         </div>
//     )
// }

// export default Add_Class2

import React, { useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Table from "../../Components/Page_Forms/Table";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";

function Add_Class2() {
    const navigate = useNavigate();
    const [rowDetailOpen, setRowDetailOpen] = useState(false);
    
    // Table Columns
    const columns = [
        { header: "Subject", accessor: "subject" },
        { header: "Main Subject", accessor: "main" },
        { header: "Optional Subject", accessor: "optional" },
        { header: "Other Subject", accessor: "other" },
    ];

    // Subjects List
    const subjects = [
        "ENGLISH", "HINDI", "MATHS", "SCIENCE", "DRAWING", "G.K.", "SANSKRIT", "S.ST.",
        "COMPUTER", "ART", "G.K.,Moral Sci", "E.V.S.",
    ];

    // State to store checkbox selections
    const [subjectData, setSubjectData] = useState(
        subjects.map((s) => ({
            subject: s,
            main: false,
            optional: false,
            other: false,
        }))
    );

    // Handle checkbox toggle
    const handleCheckboxChange = (index, type) => {
        setSubjectData((prev) => prev.map((row, i) => i === index ? { ...row, [type]: !row[type] } : row ));
    };
    
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between items-center gap-x-4 mb-5">
                <Heading label={"Class Master"} style={"text-[22px] sm:text-3xl"} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <FormInput label={"Class"} placeholder={"Enter Class"} />
                <FormInput label={"Order No."} placeholder={"Enter Order No."} />
                <FormInput label={"Promote Class"} placeholder={"Enter Promote Class"} />
            </div>
            
            {/* Table Section */}
            <Table 
                columns={columns} data={subjectData.map((row, index) => ({...row, 
                    main: ( <CheckBox label="" name={`main-${index}`} checked={row.main} onChange={() => handleCheckboxChange(index, "main")} />),
                    optional: ( <CheckBox label="" name={`optional-${index}`} checked={row.optional} onChange={() => handleCheckboxChange(index, "optional")} />),
                    other: ( <CheckBox label="" name={`other-${index}`} checked={row.other} onChange={() => handleCheckboxChange(index, "other")} />),
                }))}
            
                disableFloatingRow={true}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
            />

            {/* Buttons */}
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Cancel"} />
                <Buttons label={"Save"} />
            </div>

            {/* Extra space for mobile overlay (if needed) */}
            {rowDetailOpen && window.innerWidth < 768 && <div className="h-40"></div>}
        </div>
    );
}

export default Add_Class2;
