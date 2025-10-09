import React, { useState } from 'react'
import Heading from '../../../Components/Page_Forms/Heading'
import FormInput from '../../../Components/Page_Forms/FormInput'
import Buttons from '../../../Components/Page_Forms/Buttons'
import Options from '../../../Components/Page_Forms/Options'
import Heading2 from '../../../Components/Page_Forms/Heading2'
import FaceUploader from '../../../Components/Page_Forms/FaceUploader'
import CheckBox from '../../../Components/Page_Forms/CheckBox'
import { useNavigate } from 'react-router-dom'
import Table from '../../../Components/Page_Forms/Table'


function Get_Machine() {
    const navigate = useNavigate()
    const columns = [
        { header: "Employee Code", shortHeader: "Employee Code", accessor: "code" },
        { header: "Name", shortHeader: "Name", accessor: "name" },
        { header: "Input Mode", shortHeader: "Input Mode", accessor: "mode" },
        { header: "Date Time", shortHeader: "Date Time", accessor: "date" },
    ]
    const data = [
        { id: 1, code:"01", name: "Morning", mode:"", date:"", },
        { id: 2, code:"02", name: "Evening", mode:"", date:"", },    
    ];

    return (
        <div className='w-full h-full flex flex-col px-4 py-2 bg-white'>
            <Heading label={"Receive Data From Attendance Machine"} style={"text-[22px] sm:text-3xl"}/>
            
            <div className="flex justify-center mt-5 mb-5">
                <FaceUploader />
            </div>

            <div className="flex justify-end">
                <Buttons click={() => navigate("/")} label={"Search"} />                    
            </div>
            
            <div className="mt-5">
                <Table columns={columns} data={data} />
            </div>

            <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
                <Buttons label={"Clear"}/>
                <Buttons label={"Save"}/>
            </div>
        </div>
    )
}

export default Get_Machine