import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Login from './Pages/Login/Login'
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
import Subject from './Pages/Manage_Exam/Subject'
import Grade from './Pages/Manage_Exam/Grade'
import Exam_Type from './Pages/Manage_Exam/Exam_Type'
import Exam from './Pages/Manage_Exam/Exam'
import Assign_Roll_No from './Pages/Manage_Exam/Assign_Roll_No'
import Exam_Schedule from './Pages/Manage_Exam/Exam_Schedule'
import Exam_Schedule2 from './Pages/Manage_Exam/Exam_Schedule2'
import Student_Summary2 from './Pages/Student_Master/Student_Summary2'
import Student_Details from './Pages/Student_Master/Student_Details'
import Student_Attendance from './Pages/Student_Master/Student_Attendance'
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

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
      < Route index element={<Login/>}/>
          {/* {Student Master} */}
          <Route path='/' element={<Layout/>}>
          <Route path='/Home' element={<Home />}/>
          <Route path='/Enquiry' element={<Enquiry />}/>
          <Route path='/AddEnquiry' element={<Add_Enquiry />}/>
          <Route path='/Create' element={<Create_Student />}/>
          <Route path='/Create-Student' element={<Create_Student2 />}/>
          <Route path='/Sibling' element={<Add_Sibling />}/>
          <Route path='/AddSibling' element={<Add_Sibling2 />}/>
          <Route path='/Summary' element={<Student_Summary />}/>
          <Route path='/Student-Summary' element={<Student_Summary2 />}/>
          <Route path='/Student-details' element={<Student_Details />}/>

          {/* {Account Master} */}
          <Route path='/Addmission' element={<Addmission_Fee_Receipt />}/>
          <Route path='/Addmission-Fees' element={<Addmission_Fee_Receipt2 />}/>
          <Route path='/Fees' element={<Fee_Receipt />}/>
          <Route path='/Fees-Receipt' element={<Fee_Receipt2 />}/>
          <Route path='/Transport' element={<Transport_Fee />}/>
          <Route path='/Transport-Fee' element={<Transport_Fee2 />}/>
          <Route path='/Sibling-Fee' element={<Sibling_Fees />}/>
          <Route path='/Sibling-Fee2' element={<Sibling_Fees2 />}/>
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
          <Route path='/Subject' element={<Subject />}/>
          <Route path='/Grade' element={<Grade />}/>
          <Route path='/Exam-Type' element={<Exam_Type />}/>
          <Route path='/Exam' element={<Exam />}/>
          <Route path='/Assign-Roll' element={<Assign_Roll_No />}/>
          <Route path='/Schedule' element={<Exam_Schedule />}/>
          <Route path='/Exam-Schedule' element={<Exam_Schedule2 />}/>
          <Route path='/Student-Attendance' element={<Student_Attendance />}/>

          {/* TC */}
          <Route path='/TC' element={<TC />}/>
          <Route path='/TC2' element={<TC2 />}/>

          {/* Utility */}
          <Route path='/SMS' element={<Event_SMS />}/>
          <Route path='/Creation' element={<User_Creation />}/>
          <Route path='/User-Creation' element={<User_Creation2 />}/>
          <Route path='/User-SMS' element={<User_SMS />}/>
          
          {/* Reports */}
          <Route path='/Details' element={<Students_Details />}/>
          <Route path='/Sibling-Details' element={<Sibling_Details />}/>
          <Route path='/Fee-Details' element={<Fee_Details />}/>
          <Route path='/Transport-Details' element={<Transport_Details />}/>
          <Route path='/Transport-Fee-Details' element={<Transport_Fee_Details />}/>
          <Route path='/Hostel-Stud-Details' element={<Hostel_Stud_Details />}/>
          <Route path='/Hostel-Fee-Details' element={<Hostel_fee_Details />}/>
          <Route path='/Student-TC-Details' element={<Student_TC_Details />}/>
          <Route path='/Enquiry-Details' element={<Enquiry_Details />}/>
          <Route path='/Caste-Wise-Report' element={<Caste_Wise_Report />}/>
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
