import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './Pages/Login/Login'
import Selection from './Pages/Login/Selection'
import Home from './Pages/Home/Home'
import Enquiry from './Pages/Student_Master/Enquiry'
import Add_Enquiry from './Pages/Student_Master/Add_Enquiry'
import Create_Student from './Pages/Student_Master/Create_Student'
import Create_Student2 from './Pages/Student_Master/Create_Student2'
import Add_Sibling from './Pages/Student_Master/Add_Sibling'
import Add_Sibling2 from './Pages/Student_Master/Add_Sibling2'
import Student_Summary from './Pages/Student_Master/Student_Summary'
import Addmission_Fee_Receipt2 from './Pages/Account_Master/Addmission_Fee_Receipt2'
import Addmission_Fee_Receipt from './Pages/Account_Master/Addmission_Fee_Receipt'
import Fee_Receipt from './Pages/Account_Master/Fee_Receipt'
import Fee_Receipt2 from './Pages/Account_Master/Fee_Receipt2'
import Transport_Fee from './Pages/Account_Master/Transport_Fee'
import Transport_Fee2 from './Pages/Account_Master/Transport_Fee2'
import Sibling_Fees from './Pages/Account_Master/Sibling_Fees'
import Sibling_Fees2 from './Pages/Account_Master/Sibling_Fees2'
import Hostel_Fee from './Pages/Account_Master/Hostel_Fee'
import Hostel_Fee2 from './Pages/Account_Master/Hostel_Fee2'
import Expenditure from './Pages/Account_Master/Expenditure'
import Income from './Pages/Account_Master/Income'
import Adjustment from './Pages/Account_Master/Adjustment'
import Cash_In_Hand from './Pages/Account_Master/Cash_In_Hand'
import Year_End_Activity from './Pages/Account_Master/Year_End_Activity'
import Route_Master from './Pages/Transport_Master/Route_Master'
import Add_Stop from './Pages/Transport_Master/Add_Stop'
import Add_Stop2 from './Pages/Transport_Master/Add_Stop2'
import Vehicle_Type from './Pages/Transport_Master/Vehicle_Type'
import Vehicle_Provider from './Pages/Transport_Master/Vehicle_Provider'
import Vehicle_Provider2 from './Pages/Transport_Master/Vehicle_Provider2'
import Vehicle_Master from './Pages/Transport_Master/Vehicle_Master'
import Vehicle_Master2 from './Pages/Transport_Master/Vehicle_Master2'
import Assign_Vehicle from './Pages/Transport_Master/Assign_Vehicle'
import Assign_Vehicle2 from './Pages/Transport_Master/Assign_Vehicle2'
import Hostel_Provider from './Pages/Hostel_Master/Hostel_Provider'
import Hostel_Provider2 from './Pages/Hostel_Master/Hostel_Provider2'
import Assign_Hostel from './Pages/Hostel_Master/Assign_Hostel'
import Assign_Hostel2 from './Pages/Hostel_Master/Assign_Hostel2'
import Subject from './Pages/Manage_Exam/Subject/Subject'
import Subject2 from './Pages/Manage_Exam/Subject/Subject2'
import Grade from './Pages/Manage_Exam/Subject/Grade'
import Grade2 from './Pages/Manage_Exam/Subject/Grade2'
import Exam_Type from './Pages/Manage_Exam/Exam/Exam_Type'
import Exam_Type2 from './Pages/Manage_Exam/Exam/Exam_Type2'
import Exam from './Pages/Manage_Exam/Exam/Exam'
import Exam2 from './Pages/Manage_Exam/Exam/Exam2'
import Assign_Roll_No from './Pages/Manage_Exam/Exam/Assign_Roll_No'
import Exam_Schedule from './Pages/Manage_Exam/Exam/Exam_Schedule'
import Exam_Schedule2 from './Pages/Manage_Exam/Exam/Exam_Schedule2'
import Assign_Exam_Hole from './Pages/Manage_Exam/Exam/Assign_Exam_Hole'
import Student_Attendance from './Pages/Manage_Exam/Student_Attendance'


import Student_Summary2 from './Pages/Student_Master/Student_Summary2'
import TC from './Pages/TC/TC'
import TC2 from './Pages/TC/TC2'
import Event_SMS from './Pages/Utility/Event_SMS'
import User_Creation from './Pages/Utility/User_Creation'
import User_Creation2 from './Pages/Utility/User_Creation2'
import User_SMS from './Pages/Utility/User_SMS'
import Students_Details from './Pages/Reports/Student/Students_Details'
import Sibling_Details from './Pages/Reports/Student/Sibling_Details'
import Fee_Detail from './Pages/Reports/Student/Fee_Details'
import Fee_Details from './Pages/Reports/Student/Fee_Details'
import Transport_Fee_Details from './Pages/Reports/Student/Transport_Fee_Details'
import Transport_Details from './Pages/Reports/Student/Transport_Details'
import Hostel_Stud_Details from './Pages/Reports/Student/Hostel_Stud_Details'
import Hostel_fee_Details from './Pages/Reports/Student/Hostel_fee_Details'
import Student_TC_Details from './Pages/Reports/Student/Student_TC_Details'
import Enquiry_Details from './Pages/Reports/Student/Enquiry_Details'
import Caste_Wise_Report from './Pages/Reports/Student/Caste_Wise_Report'
import Student_Age_Wise from './Pages/Reports/Student/Student_Age_Wise'
import Student_Attend_Report from './Pages/Reports/Student/Student_Attend_Report'
import Student_Fee_Detail_Ledger_Wise from './Pages/Reports/Student/Student_Fee_Detail_Ledger_Wise'
import Day_Details from './Pages/Reports/Day Transaction/Day_Details'
import Day_Book from './Pages/Reports/Day Transaction/Day_Book'
import Day_Summary_Book from './Pages/Reports/Day Transaction/Day_Summary_Book'
import Due_Report from './Pages/Reports/Transaction/Due_Report'
import Transport_Due_Report from './Pages/Reports/Transaction/Transport_Due_Report'
import Hostel_Due_Fees from './Pages/Reports/Transaction/Hostel_Due_Fees'
import Other_Fee_Due_Report from './Pages/Reports/Transaction/Other_Fee_Due_Report'
import Student_Ledger_Details from './Pages/Reports/Transaction/Student_Ledger_Details'
import Ledger_Details from './Pages/Reports/Transaction/Ledger_Details'
import Profit_And_Loss from './Pages/Reports/Transaction/Profit_And_Loss'
import Total_Outstanding_Report from './Pages/Reports/Transaction/Total_Outstanding_Report'
import Exam_Report from './Pages/Reports/Exam/Exam_Report'
import Marksheet from './Pages/Reports/Exam/Marksheet'
import Exam_Admit_Card from './Pages/Reports/Exam/Exam_Admit_Card'
import Exam_Hole_Report from './Pages/Reports/Exam/Exam_Hole_Report'
import Id_Card from './Pages/Reports/Misc/Id_Card'
import Certificate from './Pages/Reports/Misc/Certificate'
import Bank_Challan from './Pages/Reports/Misc/Bank_Challan'
import Add_Institute from './Pages/Perm\'s/Add_Institute'
import Add_Institute2 from './Pages/Perm\'s/Add_Institute2'
import Add_Session from './Pages/Perm\'s/Add_Session'
import Add_Session2 from './Pages/Perm\'s/Add_Session2'
import Add_Class from './Pages/Perm\'s/Add_Class'
import Add_Class2 from './Pages/Perm\'s/Add_Class2'
import Subject_Allocation from './Pages/Perm\'s/Subject_Allocation'
import Subject_Allocation2 from './Pages/Perm\'s/Subject_Allocation2'
import Add_Bank from './Pages/Perm\'s/Add_Bank'
import Add_Bank2 from './Pages/Perm\'s/Add_Bank2'
import Add_Room from './Pages/Perm\'s/Add_Room'
import Add_Room2 from './Pages/Perm\'s/Add_Room2'
import Assign_Other_Income from './Pages/Perm\'s/Assign_Other_Income'
import Add_Ledger from './Pages/Perm\'s/Add_Ledger'
import Add_Ledger2 from './Pages/Perm\'s/Add_Ledger2'
import Fee_Parameter from './Pages/Perm\'s/Fee_Parameter'
import Sms_Templete from './Pages/Perm\'s/Sms_Templete'
import Sms_Templete2 from './Pages/Perm\'s/Sms_Templete2'
import Global_Perameters from './Pages/Tools/Global_Perameters'
import Promote_Student from './Pages/Tools/Promote_Student'
import Delete_Receipt from './Pages/Tools/Delete_Receipt'
import Depertment from './Pages/PayRoll/Master/Department'
import Depertment2 from './Pages/PayRoll/Master/Department2'
import Department from './Pages/PayRoll/Master/Department'
import Department2 from './Pages/PayRoll/Master/Department2'
import Designation from './Pages/PayRoll/Master/Designation'
import Designation2 from './Pages/PayRoll/Master/Designation2'
import Allowance_Deducation from './Pages/PayRoll/Master/Allowance_Deducation'
import Allowance_Deducation2 from './Pages/PayRoll/Master/Allowance_Deducation2'
import Event_Master from './Pages/PayRoll/Master/Event_Master'
import Event_Master2 from './Pages/PayRoll/Master/Event_Master2'
import Shift from './Pages/PayRoll/Master/Shift'
import Allowance_Parameter from './Pages/PayRoll/Master/Allowance_Parameter'
import Allowance_Parameter2 from './Pages/PayRoll/Master/Allowance_Parameter2'
import Shift2 from './Pages/PayRoll/Master/Shift2'
import Employee from './Pages/PayRoll/Employee/Employee'
import Employee2 from './Pages/PayRoll/Employee/Employee2'
import Employee_Salary from './Pages/PayRoll/Employee/Employee_Salary'
import Employee_Salary2 from './Pages/PayRoll/Employee/Employee_Salary2'
import Manage_Attendance from './Pages/PayRoll/Employee/Manage_Attendance'
import Update_Attendance from './Pages/PayRoll/Employee/Update_Attendance'
import Get_Machine from './Pages/PayRoll/Employee/Get_Machine'
import Salary_Process from './Pages/PayRoll/Transaction/Salary_Process'
import Employee_Detail from './Pages/PayRoll/Report/Employee_Detail'
import Employee_Attendance_Detail from './Pages/PayRoll/Report/Employee_Attendance_Detail'
import Month_Wise_Employee_Attendance_Detail from './Pages/PayRoll/Report/Month_Wise_Employee_Attendance_Detail'
import Employee_Salary_Detail from './Pages/PayRoll/Report/Employee_Salary_Detail'
import Event_Detail from './Pages/PayRoll/Report/Event_Detail'
import Marks_Entry from './Pages/Manage_Exam/Marks_Entry'
import Marks_entry2 from './Pages/Manage_Exam/Marks_entry2'
import PDF_Viewer from './Components/Page_Forms/PDF_Viewer'
import ProtectedRoutes from './Pages/ProtectedRoutes/ProtectedRoutes'
import EnquiryPrint from './Pages/Student_Master/EnquiryPrint'
import Create_Student_Print from './Pages/Student_Master/Create_Student_Print'
import Fee_Receipt_Print from './Pages/Reports/Student/Fee_Receipt_Print'
import Transport_Fee_Receipt_Print from './Pages/Reports/Student/Transport_Fee_Receipt_Print'
import Hostel_Receipt_Print from './Pages/Reports/Student/Hostel_Receipt_Print'
import Due_Fee_Print from './Pages/Reports/Transaction/Due_Fee_Print'
import Due_Fee_Summary_Print from './Pages/Reports/Transaction/Due_Fee_Summary_Print'
import Transport_Due_Fee_Summary_Print from './Pages/Reports/Transaction/Transport_Due_Fee_Summary_Print'
import Transport_Due_Fee_Print from './Pages/Reports/Transaction/Transport_Due_Fee_Print'
import Hostel_Due_Fee_Print from './Pages/Reports/Transaction/Hostel_Due_Fee_Print'
import Hostel_Due_Fee_Summary_Print from './Pages/Reports/Transaction/Hostel_Due_Fee_Summary_Print'
import Other_Due_Fee_Summary_Print from './Pages/Reports/Transaction/Other_Due_Fee_Summary_Print'
// import EnquiryPDF from './Pages/Student_Master/EnquiryPDF'


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path='/PDF-Viewer' element={<PDF_Viewer />} /> */}




          {/* Login */}
          < Route index element={<Login />}/>
          < Route path='/Selection' element={<Selection />}/>
          
          {/* {Student Master} */}
          <Route element={<ProtectedRoutes />}>
      <Route element={<Layout />}>
          <Route path='/Home' element={<Home />}/>
          <Route path='/Enquiry' element={<Enquiry />}/>
          <Route path='/Enquiry-print' element={<EnquiryPrint />}/>
          {/* <Route path='/Enquiry-pdf' element={<EnquiryPDF />}/> */}
          <Route path='/AddEnquiry' element={<Add_Enquiry />}/>
          <Route path='/Create' element={<Create_Student />}/>
          <Route path='/Create-Student' element={<Create_Student2 />}/>
          <Route path='/Create-Student-Print' element={<Create_Student_Print />}/>
          <Route path='/Sibling' element={<Add_Sibling />}/>
          <Route path='/AddSibling' element={<Add_Sibling2 />}/>
          <Route path='/Summary' element={<Student_Summary />}/>
          <Route path='/Student-Summary' element={<Student_Summary2 />}/>

          {/* {Account Master} */}
          <Route path='/Addmission' element={<Addmission_Fee_Receipt />}/>
          <Route path='/Addmission-Fees' element={<Addmission_Fee_Receipt2 />}/>
          <Route path='/Fees' element={<Fee_Receipt />}/>
          <Route path='/Fees-Receipt' element={<Fee_Receipt2 />}/>
          <Route path='/Transport' element={<Transport_Fee />}/>
          <Route path='/Transport-Fee' element={<Transport_Fee2 />}/>
          <Route path='/Sibling-Fee' element={<Sibling_Fees />}/>
          <Route path='/Sibling-Fee-Receipt' element={<Sibling_Fees2 />}/>
          <Route path='/Hostel' element={<Hostel_Fee />}/>
          <Route path='/Hostel-fee' element={<Hostel_Fee2 />}/>
          <Route path='/Expenditure' element={<Expenditure />}/>
          <Route path='/Income' element={<Income />}/>
          <Route path='/Adjustment' element={<Adjustment />}/>
          <Route path='/Cash-In-Hand' element={<Cash_In_Hand />}/>
          <Route path='/Year-End-Activity' element={<Year_End_Activity />}/>

          {/* {Transport Master} */}
          <Route path='/Route-Master' element={<Route_Master />}/>
          <Route path='/Add' element={<Add_Stop />}/>
          <Route path='/Add-Stop' element={<Add_Stop2 />}/>
          <Route path='/Vehicle-Type' element={<Vehicle_Type />}/>
          <Route path='/Vehicle' element={<Vehicle_Provider />}/>
          <Route path='/Vehicle-Provider' element={<Vehicle_Provider2 />}/>
          <Route path='/Master' element={<Vehicle_Master />}/>
          <Route path='/Vehicle-Master' element={<Vehicle_Master2 />}/>
          <Route path='/Assign' element={<Assign_Vehicle />}/>
          <Route path='/Assign-Vehicle' element={<Assign_Vehicle2 />}/>
          
          {/* {Hostel Master} */}
          <Route path='/Hostel-Provide' element={<Hostel_Provider />}/>
          <Route path='/Hostel-Provider' element={<Hostel_Provider2 />}/>
          <Route path='/Assign-Hostels' element={<Assign_Hostel />}/>
          <Route path='/Assign-Hostel' element={<Assign_Hostel2 />}/>

          {/* {Manage Exam} */}
          {/* Subject */}
            <Route path='/Subject' element={<Subject />}/>
            <Route path='/Subject2' element={<Subject2 />}/>
            <Route path='/Grade' element={<Grade />}/>
            <Route path='/Grade2' element={<Grade2 />}/>
          {/* Exam */}
            <Route path='/Exam-Type' element={<Exam_Type />}/>
            <Route path='/Exam-Type2' element={<Exam_Type2 />}/>
            <Route path='/Exam' element={<Exam />}/>
            <Route path='/Exam2' element={<Exam2 />}/>
            <Route path='/Assign-Roll' element={<Assign_Roll_No />}/>
            <Route path='/Schedule' element={<Exam_Schedule />}/>
            <Route path='/Exam-Schedule' element={<Exam_Schedule2 />}/>
            <Route path='/Assign-Exam-Hole' element={<Assign_Exam_Hole />}/>
          <Route path='/Student-Attendance' element={<Student_Attendance />}/>
          <Route path='/Marks-Entry' element={<Marks_Entry />}/>
          <Route path='/Marks-Entry2' element={<Marks_entry2 />}/>

          {/* TC */}
          <Route path='/TC' element={<TC />}/>
          <Route path='/TC2' element={<TC2 />}/>

          {/* Utility */}
          <Route path='/SMS' element={<Event_SMS />}/>
          <Route path='/Creation' element={<User_Creation />}/>
          <Route path='/User-Creation' element={<User_Creation2 />}/>
          <Route path='/User-SMS' element={<User_SMS />}/>
          
          {/* Reports */}
            {/* Student */}
            <Route path='/Details' element={<Students_Details />}/>
            <Route path='/Sibling-Details' element={<Sibling_Details />}/>
            <Route path='/Fee-Details' element={<Fee_Details />}/>
            <Route path='/Fee-Receipt-Print' element={<Fee_Receipt_Print />}/>
            <Route path='/Transport-Details' element={<Transport_Details />}/>
            <Route path='/Transport-Fee-Details' element={<Transport_Fee_Details />}/>
            <Route path='/Transport-Fee-Receipt-Print' element={<Transport_Fee_Receipt_Print />}/>
            <Route path='/Hostel-Stud-Details' element={<Hostel_Stud_Details />}/>
            <Route path='/Hostel-Fee-Details' element={<Hostel_fee_Details />}/>
            <Route path='/Hostel-Receipt-Print' element={<Hostel_Receipt_Print />}/>
            <Route path='/Student-TC-Details' element={<Student_TC_Details />}/>
            <Route path='/Enquiry-Details' element={<Enquiry_Details />}/>
            <Route path='/Caste-Wise-Report' element={<Caste_Wise_Report />}/>
            <Route path='/Student-Age-Wise' element={<Student_Age_Wise />}/>
            <Route path='/Student-Attend-Report' element={<Student_Attend_Report />}/>
            <Route path='/Student-Fee-Detail-Ledger-Wise' element={<Student_Fee_Detail_Ledger_Wise />}/>
            {/* Day Transaction */}
            <Route path='/Day-Details' element={<Day_Details />}/>
            <Route path='/Day-Book' element={<Day_Book />}/>
            <Route path='/Day-Summary-Book' element={<Day_Summary_Book />}/>
            {/* Transaction */}
            <Route path='/Due-Report' element={<Due_Report />}/>
            <Route path='/Due-Fee-Print' element={<Due_Fee_Print />}/>
            <Route path='/Due-Fee-Summary-Print' element={<Due_Fee_Summary_Print />}/>
            <Route path='/Transport-Due-Report' element={<Transport_Due_Report />}/>
            <Route path='/Transport-Due-Print' element={<Transport_Due_Fee_Print />}/>
            <Route path='/Transport-Due-Summary-Print' element={<Transport_Due_Fee_Summary_Print />}/>
            <Route path='/Hostel-Due-Report' element={<Hostel_Due_Fees />}/>
            <Route path='/Hostel-Due-Print' element={<Hostel_Due_Fee_Print />}/>
            <Route path='/Hostel-Due-Summary-Print' element={<Hostel_Due_Fee_Summary_Print />}/>
            <Route path='/Other-Fee-Due-Report' element={<Other_Fee_Due_Report />}/>
            <Route path='/Other-Due-Summary-Print' element={<Other_Due_Fee_Summary_Print />}/>
            <Route path='/Student-Ledger-Details' element={<Student_Ledger_Details />}/>
            <Route path='/Ledger-Details' element={<Ledger_Details />}/>
            <Route path='/Profit-And-Loss' element={<Profit_And_Loss />}/>
            <Route path='/Total-Outstanding-Report' element={<Total_Outstanding_Report />}/>
            {/* Exam */}
            <Route path='/Exam-Report' element={<Exam_Report />}/>
            <Route path='/Marksheet' element={<Marksheet />}/>
            <Route path='/Exam-Admit-Card' element={<Exam_Admit_Card />}/>
            <Route path='/Exam-Hole-Report' element={<Exam_Hole_Report />}/>
            {/* MISC */}
            <Route path='/Id-Card' element={<Id_Card />}/>
            <Route path='/Certificate' element={<Certificate />}/>
            <Route path='/Bank-Challan' element={<Bank_Challan />}/>
            
          {/* Perm's */}
          <Route path='/Add-Institute' element={<Add_Institute />}/>
          <Route path='/Add-Institute2' element={<Add_Institute2 />}/>
          <Route path='/Add-Session' element={<Add_Session />}/>
          <Route path='/Add-Session2' element={<Add_Session2 />}/>
          <Route path='/Add-Class' element={<Add_Class />}/>
          <Route path='/Add-Class2' element={<Add_Class2 />}/>
          <Route path='/Subject-Allocation' element={<Subject_Allocation />}/>
          <Route path='/Subject-Allocation2' element={<Subject_Allocation2 />}/>
          <Route path='/Add-Bank' element={<Add_Bank />}/>
          <Route path='/Add-Bank2' element={<Add_Bank2 />}/>
          <Route path='/Add-Room' element={<Add_Room />}/>
          <Route path='/Add-Room2' element={<Add_Room2 />}/>
          <Route path='/Assign-Other-Income' element={<Assign_Other_Income />}/>
          <Route path='/Add-Ledger' element={<Add_Ledger />}/>
          <Route path='/Add-Ledger2' element={<Add_Ledger2 />}/>
          <Route path='/Fee-Parameter' element={<Fee_Parameter />}/>
          <Route path='/SMS-Templete' element={<Sms_Templete />}/>
          <Route path='/SMS-Templete2' element={<Sms_Templete2 />}/>

          {/* Tools */}
          <Route path='/Global-Perameters' element={<Global_Perameters />}/>
          <Route path='/Promote-Student' element={<Promote_Student />}/>
          <Route path='/Delete-Receipt' element={<Delete_Receipt />}/>

          {/* PayRoll */}
            {/* Master */}
            <Route path='/Department' element={<Department />}/>
            <Route path='/Department2' element={<Department2 />}/>
            <Route path='/Designation' element={<Designation />}/>
            <Route path='/Designation2' element={<Designation2 />}/>
            <Route path='/Allowance-Deducation' element={<Allowance_Deducation />}/>
            <Route path='/Allowance-Deducation2' element={<Allowance_Deducation2 />}/>
            <Route path='/Event' element={<Event_Master />}/>
            <Route path='/Event2' element={<Event_Master2 />}/>
            <Route path='/Shift' element={<Shift />}/>
            <Route path='/Shift2' element={<Shift2 />}/>
            <Route path='/Allowance-Parameter' element={<Allowance_Parameter />}/>
            <Route path='/Allowance-Parameter2' element={<Allowance_Parameter2 />}/>
            {/* Employee */}
            <Route path='/Employee' element={<Employee />}/>
            <Route path='/Employee2' element={<Employee2 />}/>
            <Route path='/Employee-Salary' element={<Employee_Salary />}/>
            <Route path='/Employee-Salary2' element={<Employee_Salary2 />}/>
            <Route path='/Manage-Attendance' element={<Manage_Attendance />}/>
            <Route path='/Update-Attendance' element={<Update_Attendance />}/>
            <Route path='/Get-Machine' element={<Get_Machine />}/>
            {/* Transection */}
            <Route path='/Salary-Process' element={<Salary_Process />}/>
            {/* Report */}
            <Route path='/Employee-Detail' element={<Employee_Detail />}/>
            <Route path='/Employee-Attendance-Detail' element={<Employee_Attendance_Detail />}/>
            <Route path='/Month-Wise-Employee-Attendance-Detail' element={<Month_Wise_Employee_Attendance_Detail />}/>
            <Route path='/Employee-Salary-Detail' element={<Employee_Salary_Detail />}/>
            <Route path='/Event-Detail' element={<Event_Detail />}/>


        </Route>
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App