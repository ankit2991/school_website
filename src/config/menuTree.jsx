export const menuTree = [
  {
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
        icon: "student",
        submenus: [
          { name: "Student Details", path: "/Details" },
          { name: "Student Fee Details", path: "/Fee-Details" },
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
        ],
      },
    ],
  },
];
