import React, { useState } from 'react'
import Heading from '../../Components/Page_Forms/Heading';
import Options from '../../Components/Page_Forms/Options';
import FormInput from '../../Components/Page_Forms/FormInput';
import Table from '../../Components/Page_Forms/Table';
import CheckBox from '../../Components/Page_Forms/CheckBox';
import Buttons from '../../Components/Page_Forms/Buttons';
import Heading2 from '../../Components/Page_Forms/Heading2';

function User_Creation2() {
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const columns = [
    { header: "Title",  shortHeader: "Title", accessor: "title" },    
  ]
  const data = [
    { id: 1, title: "Enquiry Master", },
    { id: 2, title: "Create Student", },
    { id: 3, title: "Income", },
    { id: 4, title: "Add Stop", },
    { id: 5, title: "Vehicle Type", },
    { id: 6, title: "Sibling Master", },
  ];

  const columns2 = [
    { header: "Alias",  shortHeader: "Date", accessor: "alias" },
    { header: "Branch", shortHeader: "Branch", accessor: "branch" },
  ]
  const data2 = [
    { id: 1, alias: "KMMPS", branch: "Kesharam Memorial Manakchand Public School", },
    
  ];
    return (
        <div className='w-full h-full bg-white  px-4 py-2 flex flex-col'>
            <Heading style={"mb-5"} label={"User Master"}/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
                <Options label={"Branch"} name={""} optionMsg="Select Branch" options={["Admin", "Operator", "Super",]}/>
                <FormInput label={"User Name"} placeholder={"Enter USer Name"}/>
                <FormInput label={"User Pass"} placeholder={"Enter User Passward"}/>
            </div>

            <div className='w-full grid p-3 bg-[#fcf8e5] border-1 border-gray-400 shadow-lg rounded-md mb-5 '>
                <Heading2 label={"Select Rights"} style={"gap-x-4"}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-0 ">
                    <Table columns={columns} data={data} actions={(row) => (
                    <CheckBox label={""} name={""} checked={agree} onChange={(e) => setAgree(e.target.checked)}/>)}/>
                    <Table columns={columns2} data={data2} actions={(row) => (
                    <CheckBox label={""} name={""} checked={agree2} onChange={(e) => setAgree2(e.target.checked)}/>)}/>
                </div>
            </div>
            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10">
                <Buttons label={"Cancel"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default User_Creation2