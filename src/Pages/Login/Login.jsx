// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// function Login() {
//   const navigate = useNavigate()
//   const handlelogin = () => {
//     navigate("/Home")
//   }
//   const website = () => {
//     navigate("https://systranstechnology.com/")
//   }
//   return (
//   <>
//     <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-[url(/background_poster2.png)]">
//       <div className="w-[90%] max-w-6xl flex rounded-4xl overflow-hidden shadow-2xl/40 bg-white">
        
//         {/* Left Side */}
//         <div className="w-3/4  bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] flex flex-col justify-center">
//          <div className="p-6 flex flex-col justify-between bg-[url(/background.jpg)] bg-cover rounded-r-4xl">
//           {/* Logo */}
//           <div className='flex items-center gap-3'>
//             <img src="/systrans.png" alt="SysTrans Logo" className="h-22" />
//             <h1 className="cursor-default text-3xl text-center font-[600] text-[#CC3015] mb-4">SysTrans</h1>
//           </div>

//           {/* Main Illustration */}
//           <div className="flex justify-center my-4">
//             <img
//               src="/school management.png"
//               alt="School Management System"
//               className="max-h-[350px]"
//             />
//           </div>

//           {/* Footer */}
//           <div className="text-sm text-gray-600">
//             <p className="cursor-default text-2xl text-[#CC3015] font-semibold pb-2">Systrans SoftTech Solution</p>
//             <p className='cursor-default text-lg'>© Powered By{" "}
//               <span onClick={website} className="cursor-pointer text-blue-400">Systrans Technology Pvt. Ltd.</span>
//             </p>
//             <p className="cursor-default text-lg mt-1 text-[#CC3015] font-medium">+91 9414155589</p>
//           </div>
//         </div>
//         </div>


//         {/* Right Side */}
//         <div className="w-1/2 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] p-8 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold text-white mb-6">Login</h2>

//           <div className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Login Id"
//               className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
//             />
//             <button onClick={handlelogin} className=" bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-semibold py-2 rounded-md shadow-md hover:opacity-90">
//               Login
//             </button>
//           </div>

//           {/* Footer */}
//           <p className="cursor-default text-md text-yellow-400 mt-6 text-center">
//             © Powered By{" "}
//             <span onClick={website} className="cursor-pointer text-white">Systrans Technology Pvt. Ltd.</span>
//           </p>
//         </div>
//       </div>
//     </div></>
//   )
// }

// export default Login

import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate("/Home");
  };
  const website = () => {
    window.open("https://systranstechnology.com/", "_blank");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-[url(/background_poster2.png)]">
      <div className="w-[90%] max-w-6xl flex flex-col md:flex-row rounded-4xl overflow-hidden shadow-2xl bg-white">
        {/* Left Side (hidden below 700px / md breakpoint) */}
        <div className="hidden md:flex w-3/4 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] flex-col justify-center">
          <div className="p-6 flex flex-col justify-between bg-[url(/background.jpg)] bg-cover bg-center rounded-r-4xl">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/systrans.png" alt="SysTrans Logo" className="h-22" />
              <h1 className="cursor-default text-3xl font-[600] text-[#CC3015] mb-4">
                SysTrans
              </h1>
            </div>

            {/* Illustration */}
            <div className="flex justify-center my-4">
              <img
                src="/school management.png"
                alt="School Management System"
                className="max-h-[350px]"
              />
            </div>

            {/* Footer */}
            <div className="text-sm text-gray-600">
              <p className="cursor-default text-2xl text-[#CC3015] font-semibold pb-2">
                Systrans SoftTech Solution
              </p>
              <p className="cursor-default text-lg">
                © Powered By{" "}
                <span
                  onClick={website}
                  className="cursor-pointer text-blue-400"
                >
                  Systrans Technology Pvt. Ltd.
                </span>
              </p>
              <p className="cursor-default text-lg mt-1 text-[#CC3015] font-medium">
                +91 9414155589
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-[#E46343] via-[#CC3015] to-[#772109] p-8 flex flex-col justify-center">
          {/* Show Logo only on small screens */}
          <div className="flex items-center gap-3  mb-6 md:hidden">
             <img
          src="/Systrans_Logo.jpeg"
          alt="School Logo"
          className="h-15 w-15 object-cover rounded-full border-2 border-white flex-shrink-0"
        />
            <h1 className="cursor-default text-2xl font-[600] text-white">SysTrans</h1>
          </div>

          {/* Login Form */}
          <h2 className="text-4xl font-bold text-white mb-6 text-center md:text-left">
            Login
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Login Id"
              className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white p-3 rounded-md outline-none text-gray-700 placeholder:text-gray-400"
            />
            <button
              onClick={handlelogin}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-semibold py-2 rounded-md shadow-md hover:opacity-90"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-left md:hidden text-sm text-white">
            {/* Full footer (from left side) for small screens */}
            <p className="cursor-default text-xl font-semibold pb-2">
              Systrans SoftTech Solution
            </p>
            <p className="cursor-default text-md">
              © Powered By{" "}
              <span
                onClick={website}
                className="cursor-pointer text-yellow-300"
              >
                Systrans Technology Pvt. Ltd.
              </span>
            </p>
            <p className="cursor-default text-md mt-1 font-medium">
              +91 9414155589
            </p>
          </div>

          {/* Small © footer only for larger screens */}
          <p className="hidden md:block cursor-default text-md text-yellow-400 mt-6 text-center">
            © Powered By{" "}
            <span onClick={website} className="cursor-pointer text-white">
              Systrans Technology Pvt. Ltd.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
