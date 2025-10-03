import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Heading from '../../../Components/Page_Forms/Heading';
import Buttons from '../../../Components/Page_Forms/Buttons';
import Options from '../../../Components/Page_Forms/Options';
import FormInput from '../../../Components/Page_Forms/FormInput';
import Table from '../../../Components/Page_Forms/Table';
import CheckBox from '../../../Components/Page_Forms/CheckBox';

function Student_Age_Wise() {
    const navigate = useNavigate()
    const [agree, setAgree] = useState(false)
    const [agree2, setAgree2] = useState(false)
    const [rowDetailOpen, setRowDetailOpen] = useState(false); // ✅ track overlay open/close
    const columns = [
        { header: "Class", shortHeader: "Class", accessor: "class" },
        { header: "Age", shortHeader: "Age", accessor: "age" },
        { header: " Boy", shortHeader: " Boy", accessor: "boy" },
        { header: " Girl", shortHeader: " Girl", accessor: "girl" },
        { header: "Total", shortHeader: "Total", accessor: "tot" },
    ];
    const data = [
        { id: 1, class: "Nur", age:"5", boy:"5", girl:"2", tot:"7", },
    ];
    return (
        <div className="w-full h-full bg-white flex flex-col px-4 py-2">
            <div className="flex justify-between mb-5">
                <Heading label={"Student Age Wise Report"} />
            </div>            
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 w-full">
                <div className="sm:w-1/3 mb-5 sm:mb-0">
                    <Options label={"Class"} name={""} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
                </div>
                
                <div className="flex justify-end  items-center">
                    <Buttons click={""} label={"Search"} />                        
                </div>
            </div>
           

            <Table 
                columns={columns} 
                data={data} 
                onRowSelect={() => {}} 
                disableFloatingRow={false}
                onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)} 
            />

            <div className="flex justify-center sm:justify-end space-x-0 sm:space-x-10 mt-5">
                <Buttons label={"Clear"}/>
            </div>

            {/* ✅ Dynamic div for spacing */}
            {rowDetailOpen && window.innerWidth < 768 && <div className='h-140'></div>}


        </div>
    )
}

export default Student_Age_Wise