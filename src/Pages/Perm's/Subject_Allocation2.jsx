import React, { useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import FormInput from "../../Components/Page_Forms/FormInput";
import Table from "../../Components/Page_Forms/Table";
import CheckBox from "../../Components/Page_Forms/CheckBox";
import Buttons from "../../Components/Page_Forms/Buttons";
import { useNavigate } from "react-router-dom";

function Subject_Allocation2() {
  const navigate = useNavigate();
  const [rowDetailOpen, setRowDetailOpen] = useState(false);

  // 🔹 Subject Table Columns
  const subjectColumns = [
    { header: "Id", accessor: "id" },
    { header: "Name", accessor: "subject" },
    { header: "Main Subject", accessor: "main" },
    { header: "Optional Subject", accessor: "optional" },
    { header: "Other Subject", accessor: "other" },
  ];

  // 🔹 Student Table Columns
  const studentColumns = [
    { header: "", accessor: "select" },
    { header: "Name", accessor: "name" },
    { header: "FatherName", accessor: "fatherName" },
  ];

  // 🔹 Subjects List
  const subjects = [
    { id: 1, subject: "ENGLISH" },
    { id: 2, subject: "HINDI" },
    { id: 3, subject: "MATHS" },
    { id: 46, subject: "SCIENCE" },
    { id: 50, subject: "DRAWING" },
    { id: 5, subject: "G.K." },
    { id: 47, subject: "SANSKRIT" },
    { id: 48, subject: "S.ST." },
    { id: 6, subject: "COMPUTER" },
    { id: 7, subject: "ART" },
    { id: 49, subject: "G.K.,Moral Sci" },
    { id: 4, subject: "E.V.S." },
  ];

  // 🔹 Students List
  const students = [
    { id: 1, name: "DEVIKA", fatherName: "DINESH" },
    { id: 2, name: "K A", fatherName: "N" },
    { id: 3, name: "K A", fatherName: "N" },
    { id: 4, name: "S", fatherName: "L" },
    { id: 5, name: "Varun", fatherName: "TEST" },
  ];

  // 🔹 State for subjects table
  const [subjectData, setSubjectData] = useState(
    subjects.map((s) => ({
      ...s,
      main: false,
      optional: false,
      other: false,
    }))
  );

  // 🔹 State for student checkboxes
  const [studentData, setStudentData] = useState(
    students.map((s) => ({ ...s, selected: false }))
  );

  // 🔹 Handle subject checkbox changes
  const handleSubjectCheck = (index, type) => {
    setSubjectData((prev) => prev.map((row, i) => i === index ? { ...row, [type]: !row[type] } : row ));
  };

  // 🔹 Handle student checkbox
  const handleStudentCheck = (index) => {
    setStudentData((prev) => prev.map((row, i) => i === index ? { ...row, selected: !row.selected } : row));
  };

  return (
    <div className="w-full h-full bg-transparent flex flex-col px-4 py-2">
      <div className="flex justify-between items-center gap-x-4 mb-4">
        <Heading label={"Student Subject Allocation"} style={"text-[20px] sm:text-2xl font-semibold"}/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5 w-full">
        <FormInput label={"Class"} placeholder={"Enter Class"} />
        <FormInput label={"Order No."} placeholder={"Enter Order No."} />
        <FormInput label={"Promote Class"} placeholder={"Enter Promote Class"} />
      </div>

      <div className="flex max-lg:flex-col gap-4 w-full ">
        <div className="lg:w-1/2">
          <Table columns={subjectColumns} 
            data={subjectData.map((row, index) => ({ ...row, 
              main: ( 
                <div className="flex justify-center"> 
                  <CheckBox label={""} name={`main-${index}`} checked={row.main} onChange={() => handleSubjectCheck(index, "main")} />
                </div>
              ), 
              optional: (
                <div className="flex justify-center"> 
                  <CheckBox label={""} name={`optional-${index}`} checked={row.optional} onChange={() => handleSubjectCheck(index, "optional")} />
                </div>
              ), 
              other: (
                <div className="flex justify-center">
                  <CheckBox label={""} name={`other-${index}`} checked={row.other} onChange={() => handleSubjectCheck(index, "other")} />
                </div>
              ),
            }))}
            disableFloatingRow={true}
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
          />
        </div> 
        <div className="lg:w-1/2">
          <Table columns={studentColumns} 
            data={studentData.map((row, index) => ({...row,
              select: (
                <div className="flex justify-center">
                  <CheckBox label={""} name={`student-${index}`} checked={row.selected} onChange={() => handleStudentCheck(index)} />
                </div>
              ),
            }))}
            disableFloatingRow={true}
            onOverlayToggle={(isOpen) => setRowDetailOpen(isOpen)}
          />
        </div>
      </div>

      <div className="flex justify-between sm:justify-end space-x-0 sm:space-x-10 pt-2 mt-5">
        <Buttons label={"Cancel"} />
        <Buttons label={"Save"} />
      </div>

      {/* 🔹 Space for mobile overlay */}
      {rowDetailOpen && window.innerWidth < 768 && <div className="h-40"></div>}
    </div>
  );
}

export default Subject_Allocation2;
