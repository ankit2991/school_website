import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";
import { getinstitute, getsession } from "../../services/api"; // ✅ added getsession
import Loader from "../../Components/Page_Forms/Loader";

function Selection() {
  const navigate = useNavigate();
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [searched, setSearched] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      try {
        setSearched(true);
        const data = await getinstitute();
        setInstitutes(data.Table1 || []);
      } catch (error) {
        console.log("Institute API Error:", error);
      } finally { 
      setSearched(false); 
    }
    }
    fetchData();
  }, []);

  // ✅ added (NO SchID used)
  useEffect(() => {
    async function fetchSessions() {
      try {
        setSearched(true);
        const data = await getsession();
        setSessions(data.Table1 || []);
      } catch (error) {
        console.log("Session API Error:", error);
      } finally { 
      setSearched(false); 
    }
    }
    fetchSessions();
  }, []);

  const handlelogin = (e) => {
    e.preventDefault();
    if (!selectedInstituteId || !selectedSessionId) {
      alert("Please select institute and session");
      return;
    }

    localStorage.setItem("InstituteID", selectedInstituteId);
    localStorage.setItem("SessionID", selectedSessionId);

    navigate("/Home");
  };

  const website = () => {
    window.open("https://systranstechnology.com/", "_blank");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-[url(/background_poster2.png)]">
      <Loader show={searched} />
      <div className="w-full mx-3 md:w-1/2 rounded-4xl bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] p-8 flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-white mb-6 text-center md:text-left">
          Set Session
        </h2>

       <form
  onSubmit={handlelogin}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlelogin(e);
    }
  }}
>
  <div className="flex flex-col gap-4">

    <Options
      label=""
      optionMsg="Select Institute"
      options={institutes.map((item) => item.Name)}
      onChange={(e) => {
        const selectedName = e.target.value;
        const selectedObj = institutes.find(
          (ins) => ins.Name === selectedName
        );

        setSelectedInstituteId(selectedObj?.Id || "");
        localStorage.setItem("InstituteName", selectedObj?.Name || "");
      }}
    />

    <Options
      label=""
      optionMsg="Select Year"
      options={sessions.map((item) => item.Session)}
      onChange={(e) => {
        const obj = sessions.find((s) => s.Session === e.target.value);
        setSelectedSessionId(obj?.Id || "");
        localStorage.setItem("SessionName", obj?.Session || "");
      }}
    />

    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-lg font-semibold py-1 px-5 rounded-md shadow-md"
      >
        Set Session
      </button>
    </div>
  </div>
</form>


        <p className="cursor-default text-md text-yellow-400 mt-6 text-center">
          © Powered By{" "}
          <span onClick={website} className="cursor-pointer text-white">
            Systrans Technology Pvt. Ltd.
          </span>
        </p>
      </div>
    </div>
  );
}

export default Selection;
