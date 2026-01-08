// import React from 'react'
// import Heading from '../../Components/Page_Forms/Heading';
// import Buttons from '../../Components/Page_Forms/Buttons';
// import { useNavigate } from 'react-router-dom';
// import Options from '../../Components/Page_Forms/Options';
// import FormInput from '../../Components/Page_Forms/FormInput';
// import Table from '../../Components/Page_Forms/Table';

// function User_Creation() {
//     const navigate = useNavigate()
//     const columns = [
//         { header: "Enrollment Number",  shortHeader: "Enrollment No.", accessor: "enroll" },
//         { header: "Name",  shortHeader: "Name", accessor: "name" },
//     ]
//     const data = [
//         { id: 1, enroll:"123", name:"Akash Singh Chopra", },
//         { id: 2, enroll:"1234", name:"Rahul Citra", },
//         { id: 3, enroll:"123456", name:"Amar Singh", },
//         { id: 4, enroll:"123456789", name:"Devender tripathi", },
//         { id: 5, enroll:"554", name:"Devandu upadhya", },
//     ];

//     return (
//         <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
//             <div className="flex justify-between mb-5">
//                 <Heading label={"User Master"} />
//                 <Buttons click={() => navigate("/User-Creation")} label={"Add"} />                    
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
//                 <Options label={"Branch"} name={""} optionMsg="Select Branch" options={["Kesharam Memorial Manakchand Public School Kesharam Memorial Manakchand Public School", "KMMPS",]}/>
//                 <FormInput label={"Name"} placeholder={"Enter Name"}/>
//             </div>
            
//             <div className="flex justify-end">
//                 <Buttons click={() => navigate("")} label={"Search"} />                    
//             </div>

//             <div className="mt-5">
//                 <Table columns={columns} data={data} actions={(row) => (
//                     <>
//                         <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
//                         <Buttons label={"Print"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
//                         {/* Mobile icons */}
//                         <button className="sm:hidden text-lg pt-2.5" onClick={() => console.log("Edit:", row)} >✏️</button>
//                         <button className="sm:hidden text-xl pt-2.5" onClick={() => console.log("Print:", row)} >🖨️</button>
//                     </>
//                 )}/>
//             </div>

//         </div>
//     )
// }

// export default User_Creation


import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading';
import Buttons from '../../Components/Page_Forms/Buttons';
import { useNavigate } from 'react-router-dom';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';
import Table from '../../Components/Page_Forms/Table';
import { getinstitute, getUserList } from '../../services/api';
import Loader from '../../Components/Page_Forms/Loader';

function User_Creation() {
    const navigate = useNavigate()
    const [instituteList, setInstituteList] = useState([]);
const [selectedInstituteId, setSelectedInstituteId] = useState("");
const [userList, setUserList] = useState([]);
const [searched, setSearched] = useState(false);
    const columns = [
    { header: "User Name", shortHeader: "User", accessor: "UserName" },
];
   

    useEffect(() => {
    fetchInstitutes();
}, []);

const fetchInstitutes = async () => {
    try {
        const res = await getinstitute();

        // API response structure
        // res.Table1 → [{ Id, Name }]
        if (res?.Table1) {
            setInstituteList(res.Table1);
        }
    } catch (error) {
        console.error("Institute API Error:", error);
    }
};

const handleSearch = async () => {
    if (!selectedInstituteId) {
        alert("Please select Branch");
        return;
    }

    try {
        setSearched(true);
        const res = await getUserList(selectedInstituteId);

        // API response → res.Table
        if (res?.Table) {
            setUserList(res.Table);
        } else {
            setUserList([]);
        }
    } catch (error) {
        console.error("User List API Error:", error);
        setUserList([]);
    } finally {
        setSearched(false);
    }
};



    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Loader show={searched}/>
            <div className="flex justify-between mb-5">
                <Heading label={"User Master"} />
                <Buttons click={() => navigate("/User-Creation")} label={"Add"} />                    
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 w-full">
                <Options
    label="Branch"
    optionMsg="Select Branch"
    options={instituteList}
    valueKey="Id"          // 👈 API Id
    labelKey="Name"        // 👈 API Name
    value={selectedInstituteId}
    onChange={(e) => setSelectedInstituteId(e.target.value)}
/>
                <FormInput label={"Name"} placeholder={"Enter Name"}/>
            </div>
            
            <div className="flex justify-end">
                <Buttons click={handleSearch} label={"Search"} />                   
            </div>

            <div className="mt-5">
                <Table columns={columns} data={userList} actions={(row) => (
                    <>
                        <Buttons label={"Edit"} click={() => console.log("Edit:", row)} style="hidden sm:inline" />
                        <Buttons label={"Delete"} click={() => console.log("Print:", row)} style="hidden sm:inline" />
                        {/* Mobile icons */}
                        <button className="sm:hidden text-lg pt-2.5" onClick={() => console.log("Edit:", row)} >✏️</button>
                        <button className="sm:hidden text-xl pt-2.5" onClick={() => console.log("Print:", row)} >🖨️</button>
                    </>
                )}/>
            </div>

        </div>
    )
}

export default User_Creation


