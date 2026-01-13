import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { getinstitute, getsession } from "../services/api";
import Dialog from "./Page_Forms/Dialog";
import Options from "./Page_Forms/Options";

function Header({ onToggleSidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [institutes, setInstitutes] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [selectedInstituteName, setSelectedInstituteName] = useState(
    localStorage.getItem("InstituteName") || ""
  );

  const [selectedSessionName, setSelectedSessionName] = useState(
    localStorage.getItem("SessionName") || ""
  );

  const [showPopup, setShowPopup] = useState(false);

  // ✅ store old values when popup opens
  const [prevInstituteId, setPrevInstituteId] = useState(null);
  const [prevSessionId, setPrevSessionId] = useState(null);

  // 🔹 Fetch institutes
  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const data = await getinstitute();
        setInstitutes(data.Table1 || []);
      } catch (error) {
        console.log("Institute API Error:", error);
      }
    }
    fetchInstitutes();
  }, []);

  // 🔹 Fetch sessions
  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getsession();
        setSessions(data.Table1 || []);
      } catch (error) {
        console.log("Session API Error:", error);
      }
    }
    fetchSessions();
  }, []);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
    onToggleSidebar && onToggleSidebar(!sidebarOpen);
  };

  // ✅ open popup and save current IDs
  const openPopup = () => {
    setPrevInstituteId(localStorage.getItem("InstituteID"));
    setPrevSessionId(localStorage.getItem("SessionID"));
    setShowPopup(true);
  };

  // 🔹 Institute change (NO reload here)
  const handleInstituteChange = (e) => {
    const selectedName = e.target.value;
    const selectedObj = institutes.find((ins) => ins.Name === selectedName);
    if (!selectedObj) return;

    setSelectedInstituteName(selectedObj.Name);
    localStorage.setItem("InstituteID", selectedObj.Id);
    localStorage.setItem("InstituteName", selectedObj.Name);
  };

  // 🔹 Session change (NO reload here)
  const handleSessionChange = (e) => {
    const selectedName = e.target.value;
    const selectedObj = sessions.find((s) => s.Session === selectedName);
    if (!selectedObj) return;

    setSelectedSessionName(selectedObj.Session);
    localStorage.setItem("SessionID", selectedObj.Id);
    localStorage.setItem("SessionName", selectedObj.Session);
  };

//   const handleClose = () => {
//   const newInstituteId = localStorage.getItem("InstituteID");
//   const newSessionId = localStorage.getItem("SessionID");

//   if (
//     newInstituteId !== prevInstituteId ||
//     newSessionId !== prevSessionId
//   ) {
//     window.location.replace(window.location.href);
//     return;
//   }

//   setShowPopup(false);
// };

const handleClose = () => {
  const newInstituteId = localStorage.getItem("InstituteID");
  const newSessionId = localStorage.getItem("SessionID");

  if (
    newInstituteId !== prevInstituteId ||
    newSessionId !== prevSessionId
  ) {
    window.location.reload(); // ✅ SAFE
    return;
  }

  setShowPopup(false);
};



  return (
    <>
      <header className="fixed top-0 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] text-white shadow-md py-3 px-4 flex items-center justify-between w-full z-40">
        {/* Left Side */}
        <div className="flex items-center space-x-3 min-w-0">
          <img
            src="/Systrans_Logo.jpeg"
            alt="School Logo"
            className="h-10 w-10 object-cover rounded-full border-2"
          />

          <div className="min-w-0">
            <h1
              onClick={openPopup}
              className="cursor-pointer text-md md:text-lg font-semibold truncate hover:underline"
            >
              {selectedInstituteName || "Select Institute"}
            </h1>

            <p
              onClick={openPopup}
              className="cursor-pointer text-xs md:text-sm opacity-80 truncate hover:underline"
            >
              {selectedSessionName
                ? `Current Session: ${selectedSessionName}`
                : "Select Session"}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <FaBars
          className="text-white text-xl md:text-2xl cursor-pointer"
          onClick={handleToggle}
        />
      </header>

      {/* 🔹 ONE POPUP ONLY */}
      <Dialog
        open={showPopup}
        title="Select Institute & Session"
        dialogstyle="sm:w-[380px]"
      >
        <Options
          optionMsg="Select Institute"
          options={institutes.map((item) => item.Name)}
          value={selectedInstituteName}
          onChange={handleInstituteChange}
        />

        <div className="h-4"></div>

        <Options
          optionMsg="Select Session"
          options={sessions.map((item) => item.Session)}
          value={selectedSessionName}
          onChange={handleSessionChange}
        />

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-1 rounded bg-gray-300 text-sm"
          >
            Close
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default Header;

