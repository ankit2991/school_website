import React, { useState } from "react";
import FormInput from "../../Components/Page_Forms/FormInput";
import Buttons from "../../Components/Page_Forms/Buttons";
import Options from "../../Components/Page_Forms/Options";
import Heading from "../../Components/Page_Forms/Heading";
import Table from "../../Components/Page_Forms/Table";
import Dialog from "../../Components/Page_Forms/Dialog"; // import your dialog
import Heading2 from "../../Components/Page_Forms/Heading2";
import FaceUploader from "../../Components/Page_Forms/FaceUploader";
import CheckBox from "../../Components/Page_Forms/CheckBox";

function Student_Attendance() {
     const  [agree, setAgree] = useState(false)
     const  [sure, setSure] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = [
      { header: "Student Name", shortHeader: "Student Name", accessor: "name" },
    { header: "Env. No.", shortHeader: "Env. No.", accessor: "env" },
    { header: "Roll No.", shortHeader: "Roll No.", accessor: "roll" },
    { header: "Total Attendance", shortHeader: "Total Attendance", accessor: "tot" },
    { header: "Attendance No.", shortHeader: "Attendance No.", accessor: "att" },
   
  ];

  const allData = [
    { id: 1, name: "Ajay", env: "11", roll: "11", tot: "50", att: "65" },
    { id: 2, name: "Ajay", env: "12", roll: "12", tot: "64", att: "0    5" },
    { id: 3, name: "Viren", env: "13", roll: "13", tot: "23", att: "10" },
    { id: 4, name: "anuj", env: "14", roll: "14",  tot: "65", att: "16" },
    { id: 5, name: "somya", env: "15", roll: "15", tot: "21", att: "12" },
  ];

  // initialize filteredData
  React.useEffect(() => setFilteredData(allData), []);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredData(allData);
      return;
    }

    const lower = searchText.toLowerCase();
    const results = allData.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(lower))
    );
    setFilteredData(results);
  };

  // Row click handler for dialog
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  return (
    <div className="w-full h-full px-4 py-2 bg-white flex flex-col">
      <Heading label={"Student Attendance"} style={"mb-5"} />

      {/* Filters */}
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
        <Options label={"Class"} optionMsg="Select Class" options={["Nur", "K.G.", "Prep"]} />
        <Options label={"Exam"} optionMsg="Select Room" options={["Unit Test", "Yearly Exam", "Annual Exam",]} />
        <Options label={"Month"} optionMsg="Select Option" options={["Jan", "Feb"]} />
      </div>

      {/* Search Button */}
      <div className="flex justify-end py-5">
        <Buttons click={handleSearch} label={"Search"} />
      </div>

      {/* Table */}
      {/* <Table columns={columns} data={filteredData} selectable={false} onRowSelect={handleRowClick} /> */}

      <Table columns={columns} data={filteredData} selectable={false} disableFloatingRow={true} onRowSelect={handleRowClick} />

        <CheckBox label={"Send SMS all Student"} labelClass='text-[20px] mt-5 ' checkstyle={"mt-5"} name={""} 
            checked={agree} onChange={(e) => setAgree(e.target.checked)}
        />
        <FormInput label={"Message"} placeholder={"Enter Message"} labelStyle="mt-2" />

        <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
            <Buttons label={"Cancel"}/>
            <Buttons label={"Save"}/>
        </div>

 

      {/* Dialog */}
      <Dialog open={openDialog} title="Student Attendance" dialogstyle={"sm:w-5xl h-[600px] sm:h-[330px] sm:mx-5"}>
        {selectedRow && (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
          <FormInput label={"Student Name"} placeholder={"Enter Student Name"} />
          <FormInput label={"Env. No."} placeholder={"Enter Env. No."} />
          <FormInput label={"Roll No."} placeholder={"Enter Roll No."} />
          <FormInput label={"Total Attendance"} placeholder={"Enter Total Attendance"} />
          <FormInput label={"Attendance Number"} placeholder={"Enter Attendance No."} />
          <CheckBox label={"Copy to all Student"} labelClass='text-[20px] md:mt-8' checkstyle={"md:mt-8"} name={""} 
            checked={sure} onChange={(e) => setSure(e.target.checked)}
        />
        </div>
       
        )}
        <div className="flex justify-end mt-4">
          <Buttons label="Close" click={() => setOpenDialog(false)} />
        </div>
      </Dialog>
    </div>
  );
}

export default Student_Attendance;
