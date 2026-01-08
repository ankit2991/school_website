import React, { useEffect, useState } from "react";
import Heading from "../../Components/Page_Forms/Heading";
import Buttons from "../../Components/Page_Forms/Buttons";
import FormInput from "../../Components/Page_Forms/FormInput";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import {
  getClassWiseStudents,
  getFeesDetails,
  getStudentDetails,
  getVehicleWiseStudent,
} from "../../services/api";

function Transport_Fee() {
  const navigate = useNavigate();

  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [student, setStudent] = useState(null);

  // ✅ Selected IDs
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  /* ---------------- FETCH CLASS & VEHICLE LIST ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");
    if (!instId) return;

    async function fetchData() {
      try {
        const res = await getFeesDetails(instId, sessionId);
        setClassList(res.Table || []);
        setVehicleList(res.Table3 || []);
      } catch (error) {
        console.log("FeesDetails API Error:", error);
        setClassList([]);
        setVehicleList([]);
      }
    }

    fetchData();
  }, []);

  /* ---------------- FETCH STUDENT DETAILS ---------------- */
  useEffect(() => {
    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    if (!instId || !selectedStudentId || !selectedClassId) {
      setStudent(null);
      return;
    }

    async function fetchStudent() {
      try {
        const res = await getStudentDetails(
          instId,
          selectedStudentId,
          sessionId,
          selectedClassId
        );
        setStudent(res?.Table?.[0] || null);
      } catch (error) {
        console.log("StudentDetails API Error:", error);
        setStudent(null);
      }
    }

    fetchStudent();
  }, [selectedClassId, selectedStudentId]);

  /* ---------------- CLASS CHANGE ---------------- */
  const handleClassChange = async (e) => {
    const classId = e.target.value;

    // 🔁 RESET VEHICLE & STUDENT
    setSelectedClassId(classId);
    setSelectedVehicleId("");
    setSelectedStudentId("");
    setStudentList([]);
    setStudent(null);

    if (!classId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getClassWiseStudents(instId, sessionId, classId);
      setStudentList(res.Table || []);
    } catch (error) {
      console.log("Student API Error:", error);
      setStudentList([]);
    }
  };

  /* ---------------- VEHICLE CHANGE ---------------- */
  const handleVehicleChange = async (e) => {
    const vehicleId = e.target.value;

    // 🔁 RESET CLASS & STUDENT
    setSelectedVehicleId(vehicleId);
    setSelectedClassId("");
    setSelectedStudentId("");
    setStudentList([]);
    setStudent(null);

    if (!vehicleId) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");

    try {
      const res = await getVehicleWiseStudent(instId, sessionId, vehicleId);
      setStudentList(res.Table || []);
    } catch (error) {
      console.log("Student API Error:", error);
      setStudentList([]);
    }
  };


  /* ---------------- SEARCH ---------------- */
  const handleSearch = () => {
    if (!selectedStudentId) {
      alert("Please select Student");
      return;
    }

    navigate("/Transport-Fee", {
      state: {
        classId: selectedClassId,
        studentId: selectedStudentId,
        vehicleId: selectedVehicleId,
      },
    });
  };

  
  return (
    <div className="w-full h-full bg-white flex flex-col px-4 py-2">
      <div className="flex justify-between mb-5">
        <Heading label="Pay Transport Fees" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 mb-5 w-full">
        {/* Class */}
        <Options
          label="Class"
          optionMsg="Select Class"
          options={classList}
          valueKey="Id"
          labelKey="ClassName"
          value={selectedClassId}
          onChange={handleClassChange}
        />

        {/* Student */}
        <Options
          label="Student Name"
          optionMsg="Select Student"
          options={studentList}
          valueKey="Id"
          labelKey="Name"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        />

        {/* Vehicle */}
        <Options
          label="Vehicle"
          optionMsg="Select Vehicle"
          options={vehicleList}
          valueKey="Id"
          labelKey="VehicleNo"
          value={selectedVehicleId}
          onChange={handleVehicleChange}
        />

        <FormInput label="Sr. No." value={student?.OldSrno || ""} />
        <FormInput label="Father Name" value={student?.FatherName || ""} />
        <FormInput label="Mother Name" value={student?.MotherName || ""} />
      </div>

      <div className="flex justify-end">
        <Buttons label="Search" click={handleSearch} />
      </div>
    </div>
  );
}

export default Transport_Fee;
