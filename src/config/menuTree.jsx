export const menuTree = [
  {
    name: "Dashboard",
    icon: "home",
    path: "/Home"
   }, {
    name: "Student Master",
    icon: "student",
    submenus: [
      { name: "Enquiry Master", path: "/Enquiry" , submenus: [
          {
            name: "Enquiry Form",
            path: "/AddEnquiry",
            hidden: true,
          }] },
      { name: "Create Student", path: "/Create", submenus: [
          {
            name: "Student Form",
            path: "/Create-Student",
            hidden: true,
          }] },
      { name: "Add Sibling", path: "/Sibling", submenus: [
          {
            name: "Sibling Form",
            path: "/AddSibling",
            hidden: true,
          }] },
      { name: "Student Summary", path: "/Summary" },
    ],
  },
//more pages
  {
    name: "Account Master",
    icon: "account",
    submenus: [
      { name: "Addmission Master", path: "/Addmission" , submenus: [
          {
            name: "Addmission Fee Receipt",
            path: "/Addmission-Fees",
            hidden: true,
          }]},
      { name: "School Fee", path: "/Fees"  , submenus: [
          {
            name: "School Fee Receipt",
            path: "/Fees-Receipt",
            hidden: true,
          }]},
      { name: "Transport Fee", path: "/Transport"  , submenus: [
          {
            name: "Transport Fee Receipt",
            path: "/Transport-Fee",
            hidden: true,
          }]},
      { name: "Sibling Fee", path: "/Sibling-Fee", submenus: [
          {
            name: "Sibling Fee Receipt",
            path: "/Sibling-Fee-Receipt",
            hidden: true,
          }]},
      { name: "Hostel Fee", path: "/Hostel"  , submenus: [
          {
            name: "Hostel Fee Receipt",
            path: "/Hostel-Fees",
            hidden: true,
          }]},
      { name: "Expenditure", path: "/Expenditure" },
      { name: "Income", path: "/Income" },
      { name: "Adjustment", path: "/Adjustment" },
      { name: "Cash In Hand", path: "/Cash-In-Hand" },
      { name: "Year End Activity", path: "/Year-End-Activity" },
    ],
  },

  {
    name: "Transport Master",
    icon: "transport",
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
    icon: "hostel",
    submenus: [
      { name: "Hostel Provider", path: "/Hostel-Provide" },
      { name: "Assign Hostel", path: "/Assign-Hostels" },
    ],
  },

  {
    name: "Manage Exam",
    icon: "exam",
    submenus: [
      {
        name: "Subject",
        submenus: [
          { name: "Subject", path: "/Subject" },
          { name: "Grade", path: "/Grade" },
        ],
      },
      {
        name: "Exam",
        submenus: [
          { name: "Exam Type", path: "/Exam-Type" },
          { name: "Exam", path: "/Exam" },
          { name: "Assign Roll No.", path: "/Assign-Roll" },
          { name: "Exam Schedule", path: "/Schedule" },
          { name: "Assign Exam Hole", path: "/Assign-Exam-Hole" },
        ],
      },
      { name: "Student Attendance", path: "/Student-Attendance" },
      { name: "Marks Entry", path: "/Marks-Entry" },
    ],
  },

  {
    name: "Utility",
    icon: "utility",
    submenus: [
      { name: "Event SMS", path: "/SMS" },
      { name: "User Creation", path: "/Creation" },
      { name: "User SMS", path: "/User-SMS" },
    ],
  },

  {
    name: "Reports",
    icon: "report",
   
    submenus: [
      {
        name: "Student",
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
          {
            name: "Student Attendance Report",
            path: "/Student-Attend-Report",
          },
          {
            name: "Student Fee Detail Ledger Wise",
            path: "/Student-Fee-Detail-Ledger-Wise",
          },
        ],
      },

      {
        name: "Day Transaction",
        submenus: [
          { name: "Day Details Report", path: "/Day-Details" },
          { name: "Day Book Report", path: "/Day-Book" },
          { name: "Day Summary Book Report", path: "/Day-Summary-Book" },
        ],
      },

      {
        name: "Transaction",
        submenus: [
          { name: "Due Report", path: "/Due-Report" },
          { name: "Transport Due Report", path: "/Transport-Due-Report" },
          { name: "Hostel Due Report", path: "/Hostel-Due-Report" },
          { name: "Other Fee Due Report", path: "/Other-Fee-Due-Report" },
          { name: "Student Ledger Details", path: "/Student-Ledger-Details" },
          { name: "Ledger Details", path: "/Ledger-Details" },
          { name: "Profit And Loss", path: "/Profit-And-Loss" },
          {
            name: "Total Outstanding Report",
            path: "/Total-Outstanding-Report",
          },
        ],
      },

      {
        name: "Exam",
        submenus: [
          { name: "Exam Report", path: "/Exam-Report" },
          { name: "Marksheet", path: "/Marksheet" },
          { name: "Exam Admit Card", path: "/Exam-Admit-Card" },
          { name: "Exam Hole Report", path: "/Exam-Hole-Report" },
        ],
      },

      {
        name: "MISC",
        submenus: [
          { name: "Id Card", path: "/Id-Card" },
          { name: "Certificate", path: "/Certificate" },
          { name: "Bank Challan", path: "/Bank-Challan" },
        ],
      },
    ],
  },
  {
    name: "Perm's",
    icon: "perms",
    submenus: [
      { name: "Add Institute", path: "/Add-Institute" },
      { name: "Add Session", path: "/Add-Session" },
      { name: "Add Class", path: "/Add-Class" },
      { name: "Subject Allocation", path: "/Subject-Allocation" },
      { name: "Add Bank", path: "/Add-Bank" },
      { name: "Add Room", path: "/Add-Room" },
      { name: "Assign Other Income", path: "/Assign-Other-Income" },
      { name: "Add Ledger", path: "/Add-Ledger" },
      { name: "Fee Parameter", path: "/Fee-Parameter" },
      { name: "SMS Templete", path: "/SMS-Templete" },
    ],
  },

  {
    name: "Tools",
    icon: "tools",
    submenus: [
      { name: "GlobalPerameters", path: "/Global-Perameters" },
      { name: "Promote Student", path: "/Promote-Student" },
      { name: "Delete Receipt", path: "/Delete-Receipt" },
    ],
  },

  {
    name: "PayRoll",
    icon: "payroll",
    submenus: [
      {
        name: "Master",
        submenus: [
          { name: "Department", path: "/Department" },
          { name: "Designation", path: "/Designation" },
          { name: "Allowance Deducation", path: "/Allowance-Deducation" },
          { name: "Event", path: "/Event" },
          { name: "Shift", path: "/Shift" },
          { name: "Allowance Parameter", path: "/Allowance-Parameter" },
        ],
      },
      {
        name: "Employee",
        submenus: [
          { name: "Employee", path: "/Employee" },
          { name: "Employee Salary", path: "/Employee-Salary" },
          { name: "Manage Attendance", path: "/Manage-Attendance" },
          { name: "Update Attendance", path: "/Update-Attendance" },
          { name: "Get Machine", path: "/Get-Machine" },
        ],
      },
      {
        name: "Transection",
        submenus: [{ name: "Salary Process", path: "/Salary-Process" }],
      },
      {
        name: "Report",
        submenus: [
          { name: "Employee Detail", path: "/Employee-Detail" },
          {
            name: "Employee Attendance Detail",
            path: "/Employee-Attendance-Detail",
          },
          { name: "Employee Salary Detail", path: "/Employee-Salary-Detail" },
          { name: "Due Report", path: "/Event-Detail" },
        ],
      },
    ],
  },
{
    name: "Logout",
    icon: "logout",
    path: "/"
   },
  
];
