import React, { useState } from "react";
import { FaUserGraduate, FaBus, FaBed, FaTools } from "react-icons/fa";
import { MdAccountBalance, MdReport, MdPayments } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarToggle, setSidebarToggle }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null); // 👈 new state
  
  const menu = [
    {
      name: "Student Master",
      icon: <FaUserGraduate className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Enquiry Form", path: "/Enquiry" },
        { name: "Create Student", path: "/Create" },
        { name: "Add Sibling", path: "/Sibling" },
        { name: "Student Summary", path: "/Summary" },
      ],
    },
    {
      name: "Account Master",
      icon: <MdAccountBalance className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Addmission Fee Receipt", path: "/Addmission" },
        { name: "Fee Receipt", path: "/Fees" },
        { name: "Transport Fee", path: "/Transport" },
        { name: "Sibling Fee", path: "/Sibling-Fee" },
        { name: "Hostel Fee", path: "/Hostel" },
        { name: "Expenditure", path: "/Expenditure" },
        { name: "Income", path: "/Income" },
        { name: "Adjustment", path: "/Adjustment" },
        { name: "Cash In Hand", path: "/Cash-In-Hand" },
        { name: "Year End Activity", path: "/Year-End-Activity" },
      ],
    },
    {
      name: "Transport Master",
      icon: <FaBus className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Route Master", path: "/Route-Master" },
        { name: "Add Stop", path: "/Add" },
        { name: "Vehicle Type", path: "/Vehicle-Type" },
        { name: "Vehicle Provider", path: "/Vehicle" },
        { name: "Vehicle Master", path: "/Master" },
        { name: "Assign Vehicle", path: "/Assign" },
      ],
    },
    {
      name: "Hostel Master",
      icon: <FaBed className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Hostel Provider", path: "/Hostel-Provide" },
        { name: "Assign Hostel", path: "/Assign-Hostels" },
      ],
    },
    {
      name: "Manage Exam",
      icon: <FaBed className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        {name: "Subject", 
          submenus: [
            { name: "Subject", path: "/Subject" },
            { name: "Grade", path: "/Grade" },
          ],
        },
        {name: "Exam", 
          submenus: [
            { name: "Exam Type", path: "/Exam-Type" },
            { name: "Exam", path: "/Exam" },
            { name: "Assign Roll No.", path: "/Assign-Roll" },
            { name: "Exam Schedule", path: "/Schedule" },
            { name: "Exam Details", path: "/Student-details" },
          ],
        },
        { name: "Student Attendance", path: "/Student-Attendance" },

      ],
    },
    {
      name: "Transfer Certificate",
      icon: <MdReport className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Transfer Certificate (T.C.)", path: "/TC" },
      ],
    },
    {
      name: "Utility",
      icon: <MdReport className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Event SMS", path: "/SMS" },
        { name: "User Creation", path: "/Creation" },
        { name: "User SMS", path: "/User-SMS" },
      ],
    },
    {
      name: "Reports",
      icon: <MdReport className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        {name: "Student", 
          submenus: [
            { name: "Student Details", path: "/Details" },
            { name: "Student Sibling Details", path: "/Sibling-Details" },
            { name: "Student Fee Details", path: "/Fee-Details" },
            { name: "Student Transport Details", path: "/Transport-Details" },
            { name: "Transport Fee Details", path: "/Transport-Fee-Details" },
            { name: "Hostel Student Details", path: "/Hostel-Stud-Details" },
            { name: "Hostel Fee Details", path: "/Hostel-Fee-Details" },
            { name: "Student TC Details", path: "/Student-TC-Details" },
            { name: "Enquiry Details", path: "/Enquiry-Details" },
            { name: "Caste Wise Report", path: "/Caste-Wise-Report" },
            { name: "Student Age Wise", path: "/Student-Age-Wise" },
            { name: "Student Attendance Report", path: "/Student-Attend-Report" },
            { name: "Student Fee Detail Ledger Wise", path: "/Student-Fee-Detail-Ledger-Wise" },
          ],
        },

        {name: "Day Transaction", 
          submenus: [
            { name: "Day Details", path: "/Day-Details" },
            { name: "Day Book", path: "/Day-Book" },
            { name: "Day Summary Book", path: "/Day-Summary-Book" },
          ],
        },
      ],
    },
    {
      name: "Tools",
      icon: <FaTools className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Backup Data", path: "/Backup" },
        { name: "Restore Data", path: "/Restore" },
      ],
    },
    {
      name: "PayRoll",
      icon: <MdPayments className="inline-block w-5 h-5 mr-2 -mt-1" />,
      submenus: [
        { name: "Salary Slip", path: "/SalarySlip" },
        { name: "Attendance", path: "/StaffAttendance" },
      ],
    },    
  ];
  const handletoggle = () => {setSidebarToggle(!sidebarToggle);};

  const toggleMenu = (i) => {setOpenMenu(openMenu === i ? null : i);};

  const toggleSubMenu = (key) => {setOpenSubMenu(openSubMenu === key ? null : key);};

  // Recursive renderer
  const renderSubmenus = (submenus, parentKey = "") => {
    if (!Array.isArray(submenus)) return null;
    return (
      <ul className="ml-6 mt-2 text-sm font-semibold text-[#5a1c0a]">
        {submenus.map((sub, j) => {
          const key = `${parentKey}-${j}`;
          return (
          <li key={key} onClick={!sub.submenus ? handletoggle : undefined}>
              {sub.submenus ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(key)}
                    className={`flex justify-between w-full px-2 py-1 rounded ${
                      openSubMenu === key? "bg-blue-400 text-white" : "hover:bg-blue-400 hover:text-white"
                    }`}
                  >
                    {sub.name}
                    <span>{openSubMenu === key ? "−" : "▼"}</span>
                  </button>
                  {openSubMenu === key && renderSubmenus(sub.submenus, key)}
                </>
                ) : (
                <NavLink
                  to={sub.path}
                  className={({ isActive }) =>
                    `block mb-2 rounded-md px-2 py-2 transition cursor-pointer ${
                      isActive? "bg-blue-400 text-white" : "hover:bg-blue-400 hover:text-white"
                    }`
                  }
                >
                  {sub.name}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={`${
        sidebarToggle ? "translate-x-0" : "translate-x-full shadow-none"
      } w-64 block h-full fixed right-0 bg-[#f7edcfda] shadow-2xl rounded-l-3xl transform transition-all duration-700 ease-in-out px-4 py-2 overflow-y-auto no-scrollbar`}
    >
      <ul className="mt-3 text-[#a7230b] font-bold">
        {menu.map((item, i) => (
          <li key={i} className="mb-2">
            <button
              onClick={() => toggleMenu(i)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded transition ${
                openMenu === i ? "bg-blue-500 text-white shadow" : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="flex items-center">
                {item.icon}
                {item.name}
              </span>
              {/* <span>{openMenu === i ? "−" : "+"}</span> */}
            </button>

            {openMenu === i && renderSubmenus(item.submenus, `menu-${i}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;































