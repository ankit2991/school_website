import {
  FaUserGraduate,
  FaBus,
  FaBed,
  FaTools,
  FaClipboardList,
} from "react-icons/fa";

import {
  MdAccountBalance,
  MdReport,
  MdPayments,
  MdSettings,
} from "react-icons/md";

export const iconMap = {
  student: <FaUserGraduate className="w-5 h-5" />,
  account: <MdAccountBalance className="w-5 h-5" />,
  transport: <FaBus className="w-5 h-5" />,
  hostel: <FaBed className="w-5 h-5" />,
  report: <MdReport className="w-5 h-5" />,
  exam: <FaClipboardList className="w-5 h-5" />,
  utility: <MdSettings className="w-5 h-5" />,
  perms: <FaUserGraduate className="w-5 h-5" />,
  tools: <FaTools className="w-5 h-5" />,
  payroll: <MdPayments className="w-5 h-5" />,
};
