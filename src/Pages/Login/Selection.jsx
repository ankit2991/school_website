import React from "react";
import { useNavigate } from "react-router-dom";
import Options from "../../Components/Page_Forms/Options";

function Selection() {
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate("/Home");
  };
  const website = () => {
    window.open("https://systranstechnology.com/", "_blank");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-[url(/background_poster2.png)]">
        <div className=" w-full mx-3 md:w-1/2 rounded-4xl bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] p-8 flex flex-col justify-center">
            {/* Show Logo only on small screens */}
            <div className="flex items-center gap-3  mb-6 ">
              <img src="/Systrans_Logo.jpeg" alt="School Logo" className="h-15 w-15 object-cover rounded-full border-2 border-white flex-shrink-0" />
              <h1 className="cursor-default text-2xl font-[600] text-white">SysTrans</h1>
            </div>
            {/* Login Form */}
            <h2 className="text-4xl font-bold text-white mb-6 text-center md:text-left"> Set Session </h2>
            <div className="flex flex-col gap-4">
              <Options label={""} optionMsg="Select Institute" options={["Kesharam Memorial Manakchand Public School", "KMMPS"]} 
                className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
              />
              <Options label={""} optionMsg="Select Year" options={["2024", "2025"]} 
                className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
              />
              {/* <button onClick={handlelogin} 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-semibold py-2 rounded-md shadow-md hover:opacity-90 "
              > Set Session
              </button> */}
              <div className="flex justify-center">
                <button onClick={handlelogin} 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-lg font-semibold py-1 px-5 rounded-md shadow-md hover:opacity-90 transition-all duration-200"
                >
                  Set Session
                </button>
              </div>
            </div>
            {/* Footer */}
            <p className="cursor-default text-md text-yellow-400 mt-6 text-center">
              © Powered By{" "} <span onClick={website} className="cursor-pointer text-white">Systrans Technology Pvt. Ltd. </span>
            </p>
        </div>
    </div>
  );
}

export default Selection;
