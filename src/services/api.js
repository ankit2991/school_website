// ----------------------------This is public(network) ip address api function--------------------------------
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://newschoolprojectapi.schoolsoftwaresolution.in";
const API_URL = BASE_URL + "/MobApi.asmx/MobileApi";
const AUTH_KEY = "SYS101";
const scId = "scId";

export const getlogin = async (name, pass) => {
  // Step 1 — Get Public IP
  let publicIp = "";
  try {
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    publicIp = ipResponse.data.ip; // <-- Public IP here
  } catch (err) {
    console.error("IP Fetch Error:", err);
    publicIp = "0.0.0.0"; // fallback
  }

  const params = {
    ParmCriteria: JSON.stringify({
        UserName: String(name), Password: String(pass), DeviceName: "", DeviceIP: publicIp, 
        ApiAdd: "SoftwareLogin", CallBy: "MobileApi", AuthKey:"SYS101"
    }),
    ApiAdd: "SoftwareLogin",
  };
  console.log("id",publicIp);

  const response = await axios.get(API_URL, { params });
  return response.data;
};
// ----------------------------This is public(network) ip address api function end------------------------------



// ------------------------------------This is institute List api function --------------------------------------
export const getinstitute = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "InstituteList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "InstituteList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ----------------------------------This is institute List api function end--------------------------------------



// ------------------------------------This is Session List api function --------------------------------------
export const getsession = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "SessionList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SessionList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ----------------------------------This is Session List api function end--------------------------------------



// --------------------------------------This is DashboardReport api function -----------------------------------------
export const getDashboard = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid, 
            ApiAdd: "DashboardReport",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "DashboardReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is DashboardReport api function end----------------------------------------



// --------------------------------------This is class List api function -----------------------------------------
export const getclass = async (insid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ApiAdd: "ClassList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ClassList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is class List api function end----------------------------------------



// --------------------------------------This is Enquiry Report api function -----------------------------------------
export const getEnquiry = async (instid, sesid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instid,
            SessionId: sesid,
            ClassId: clid,
            ApiAdd: "EnquireStudentList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "EnquireStudentList",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Enquiry Report api function end----------------------------------------



// --------------------------------------This is Enquiry Insert api function -----------------------------------------
export const getEnquiryInsert = async (data) => {
  const params = {
    ParmCriteria: JSON.stringify({
        InstId: data.instId, SessionId: data.sessId, UserId: data.userId, EqId: data.eqid, ClassId: data.classId, 
        EqNo: data.eqno, EqDate: data.enqDate, FFees: data.ffees, Name: data.name, Gender: data.gender, Dob: data.dob, 
        CastId: data.casteId, FName: data.father, FOcc: data.fatherOcc, FMob: data.fatherMobile, MName: data.mother, 
        MOcc: data.motherOcc, MMob: data.motherMobile, GName: data.guardian, GOcc: data.guardianOcc, GMob: data.guardianMobile, 
        GRel: data.guardianRel, PhNo: data.phone, FInc: data.fatherInc, BPlace: data.birthplace, BGroup: data.bloodgroup, 
        BSing: data.bodysign, Add1: data.address, Add2: data.address2, AaNo: data. AadharNo, Rem: data.remark, 
        LastSch: data.lastschool, LClassId: data.lastclass, Per: data.percent, 
        ApiAdd: "EnquireInsertUpdate", 
        CallBy: "MobileApi",
        AuthKey: "SYS101", 
    }),
    ApiAdd: "EnquireInsertUpdate",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};
// ------------------------------------This is Enquiry Insert api function end----------------------------------------


// --------------------------------------This is Enquiry Details api function -----------------------------------------
export const getEnquiryDetail = async (eqid) => {
    const params = {
        ParmCriteria: JSON.stringify({ 
            EqId: eqid,
            ApiAdd: "EnquireDetails", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "EnquireDetails",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Enquiry Details api function end----------------------------------------



// --------------------------------------This is Caste List api function -----------------------------------------
export const getcaste = async () => {
    const params = {
        ParmCriteria: JSON.stringify({          
            ApiAdd: "CasteList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "CasteList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Caste List api function end----------------------------------------



// --------------------------------------This is Caste List api function -----------------------------------------
export const getEnquiryNo = async (insid) => {
    const params = {
        ParmCriteria: JSON.stringify({ 
            InstId: insid,
            ApiAdd: "GetEnquireNo", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GetEnquireNo",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Caste List api function end----------------------------------------



// --------------------------------------This is Student List api function -----------------------------------------
export const getStudentList = async (instid, sesid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instid,
            SessionId: sesid,
            ClassId: clid,
            ApiAdd: "StudentList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentList",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student List api function end----------------------------------------



// --------------------------------------This is Type List api function -----------------------------------------
export const getTypeList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "TypeList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "TypeList",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Type List api function end----------------------------------------



// --------------------------------------This is Serial No api function -----------------------------------------
export const getSerialNo = async (instid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instid,
            ApiAdd: "GetStudentMaxSrNo",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GetStudentMaxSrNo",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Serial No api function end----------------------------------------



// --------------------------------------This is Student Insert api function -----------------------------------------
export const getCreateStudent = async (data) => { 
    const params = { 
        ParmCriteria: JSON.stringify({ 
            InstId: data.instId, SessionId: data.sessId, EqNo: data.eqno, UserId: data.userId, StId: data.studId, OldSrNo: data.srno, 
            EnroNo: data.enroNo, Name: data.name, Gender: data.gen, Dob: data.dob, SType: data.studtype, CastId: data.casteId, 
            Caste: data.caste, AddDate: data.addDate, JDate: data.joinDate, FCalDate: data.feeCalDate, LastSch: data.lstSchl, 
            LClassId: data.lstclId, ClassId: data.clid, TcNo: data.tcNo, TcDate: data.tcDate, LPSess: data.lstsess, IsNew: data.isNew, 
            Nation: data.nation, FName: data.fName, FOcc: data.fOcc, FMob: data.fNum, MName: data.mNane, MOcc: data.mOcc, MMob: data.mNum, 
            FAaNo: data.fAadhar, MAaNo: data.mAadhar, JAaNo: data.jAadhar, GName: data.guardian, GOcc: data.guardianOcc, GMob: data.guardianNum, 
            GRel: data.guardianRel, PhNo: data.phone, FInc: data.fatherInc, BPlace: data.birthplace, BGroup: data.bloodgroup, 
            BSing: data.bodysign, Pen: data.panNum, AppId: data.ApparId, Add1: data.address, Add2: data.address2, Email: data.mail, 
            AaNo: data.aadharNo, LBala: data.lastBal, TLBala: data.translastbal, FDis: data.feeDis, AddFee: data.addFee, 
            QMoney: data.quesMoney, Rem: data.remark, Leave: data.left, NSODate: data.NsoDate, LReason: data.leaveRes, 
        
            ApiAdd: "StudentInsertUpdate", 
            CallBy: "MobileApi", 
            AuthKey: "SYS101", 
        }), 
        ApiAdd: "StudentInsertUpdate", 
    };
    
    const response = await axios.get(API_URL, { params });
    return response.data;
};

// ------------------------------------This is Student Insert api function end----------------------------------------



// --------------------------------------This is Serial No api function -----------------------------------------
export const getEnquiryNoDetails = async (eqno) => {
    const params = {
        ParmCriteria: JSON.stringify({
            EqNo: eqno,
            ApiAdd: "EnquireNoDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "EnquireNoDetails",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Serial No api function end----------------------------------------



// --------------------------------------This is Student Details api function -----------------------------------------
export const getStudentDetails = async (insid, studid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid, 
            StId: studid, 
            SessionId: sessid, 
            ClassId: clid, 
            ApiAdd: "StudentDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentDetails",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Details api function end----------------------------------------



// --------------------------------------This is Sibling Details api function -----------------------------------------
export const getSiblingDetails = async (insid, studid, sessid ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid, 
            StId: studid, 
            SessionId: sessid, 
            ApiAdd: "SiblingDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SiblingDetails",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Sibling Details api function end----------------------------------------



// --------------------------------------This is Sibling Insert api function -----------------------------------------
export const getSiblingInsert = async (studid, sibid, usrid ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StId: studid, 
            SStId: sibid, 
            UserId: usrid, 
            ApiAdd: "SiblingInsert",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SiblingInsert",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Sibling Insert api function end----------------------------------------



// --------------------------------------This is Sibling Delete api function -----------------------------------------
export const getSiblingDelete = async (sibid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            SStId: sibid, 
            ApiAdd: "SiblingDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SiblingDelete",
        
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Sibling Delete api function end----------------------------------------



// --------------------------------------This is Student Search api function -----------------------------------------
export const getStudentSearch = async ({ instId, sessionId, classId, searchType, search, }) => { 
    const params = { 
        ParmCriteria: JSON.stringify({ 
            InstId: Number(instId), 
            SessionId: String(sessionId), 
            ClassId: Number(classId || 0), 
            SearchType: String(searchType), 
            Search: search || "", 
            ApiAdd: "StudentSearch", 
            CallBy: "MobileApi", 
            AuthKey: AUTH_KEY, 
        }), 
        
        ApiAdd: "StudentSearch", 
    }; 
    
    const response = await axios.get(API_URL, { params }); 
    return response.data; 
};
// ------------------------------------This is Student Search api function end----------------------------------------



// --------------------------------------This is Student Summary api function -----------------------------------------
export const getStudentSummary = async ({ instId, sessionId, studId }) => { 
    const params = { 
        ParmCriteria: JSON.stringify({ 
            InstId: Number(instId), 
            SessionId: String(sessionId), 
            StId: Number(studId), 
            ApiAdd: "StudentSummary", 
            CallBy: "MobileApi", 
            AuthKey: AUTH_KEY, 
        }), 
        
        ApiAdd: "StudentSummary", 
    }; 
    
    const response = await axios.get(API_URL, { params }); 
    return response.data; 
};
// ------------------------------------This is Student Summary api function end----------------------------------------



// --------------------------------------This is Route List api function -----------------------------------------
export const getRoute = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "RouteList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "RouteList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Route List api function end----------------------------------------



// --------------------------------------This is Route Detail api function -----------------------------------------
export const getRoutedetail = async (insid, sessid, routeid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            RouteId: routeid,
            ApiAdd: "Routedetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "Routedetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Route Detail api function end----------------------------------------



// --------------------------------------This is Route Insert Update api function -----------------------------------------
export const getRouteInsertUpdate = async (insid, sessid, userid, routeid, route) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            UserId: userid,
            RId: routeid,
            RouteName: route,
            ApiAdd: "RouteInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "RouteInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Route Insert Update api function end----------------------------------------



// --------------------------------------This is Route Delete api function -----------------------------------------
export const getRouteDelete = async (routeid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            RId: routeid,
            ApiAdd: "RouteDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "RouteDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Route Delete api function end----------------------------------------



// --------------------------------------This is Stop List api function -----------------------------------------
export const getStop = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "StopList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StopList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Stop List api function end----------------------------------------



// --------------------------------------This is Stop Detail api function -----------------------------------------
export const getStopdetail = async (stopid,insid, sessid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StopId: stopid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "StopDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StopDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Stop Detail api function end----------------------------------------



// --------------------------------------This is Stop Insert Update api function -----------------------------------------
export const getStopInsertUpdate = async ( stopid, routeid, dest, cost, isinst, userid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StopId: stopid,
            RId: routeid,
            Dest: dest,
            Cost: cost,
            IsInst: isinst,
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "StopInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StopInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Stop Insert Update api function end----------------------------------------



// --------------------------------------This is Stop Delete api function -----------------------------------------
export const getStopDelete = async (stopid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StopId: stopid,
            ApiAdd: "StopDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StopDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Stop Delete api function end----------------------------------------



// --------------------------------------This is Vehicle Type List api function -----------------------------------------
export const getVehicleTypeList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleTypeList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleTypeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Type List api function end----------------------------------------



// --------------------------------------This is Vehicle Type Detail api function -----------------------------------------
export const getVehicleTypeDetail = async ( vehicleid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehicleId: vehicleid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleTypeDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleTypeDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Type Detail api function end----------------------------------------



// --------------------------------------This is Vehicle Type Insert Update api function -----------------------------------------
export const getVehicleTypeInsertUpdate = async (vehid, vehitype, userid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehiId: vehid,
            VehiType: vehitype,
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleTypeInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleTypeInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Type Insert Update api function end----------------------------------------



// --------------------------------------This is Vehicle Type Delete api function -----------------------------------------
export const getVehicleTypeDelete = async (stopid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StopId: stopid,
            ApiAdd: "VehicleTypeDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleTypeDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Type Delete api function end----------------------------------------



// --------------------------------------This is Vehicle Provider List api function -----------------------------------------
export const getVehicleProviderList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleProviderList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleProviderList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Provider List api function end----------------------------------------



// --------------------------------------This is Vehicle Provider Detail api function -----------------------------------------
export const getVehicleProviderDetail = async ( vehicleid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehicleId: vehicleid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleProviderDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleProviderDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Provider Detail api function end----------------------------------------



// --------------------------------------This is Vehicle Provider Insert Update api function -----------------------------------------
export const getVehicleProviderInsertUpdate = async (vehid, name, add, num, email, userid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehId: vehid,
            Name: name,
            Add1: add,
            ContactNo: num,
            Email: email,
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleProviderInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleProviderInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Provider Insert Update api function end----------------------------------------



// --------------------------------------This is Vehicle Provider Delete api function -----------------------------------------
export const getVehicleProviderDelete = async (vehid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehId: vehid,
            ApiAdd: "VehicleProviderDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleProviderDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Provider Delete api function end----------------------------------------



// --------------------------------------This is Vehicle List api function -----------------------------------------
export const getVehicleList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle List api function end----------------------------------------



// --------------------------------------This is Vehicle Detail api function -----------------------------------------
export const getVehicleDetail = async ( vehicleid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehicleId: vehicleid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Detail api function end----------------------------------------



// --------------------------------------This is Vehicle Insert Update api function -----------------------------------------
export const getVehicleInsertUpdate = async (
    vehid, vehtypeid, vehNo, vehProvider, routeid, numSeat, stren, pdate, idate, 
    iedate, dname, dlicenceno, dadd, contact, userid, insid, sessid, 
) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            VehId: vehid,
            VehiTId: vehtypeid, 
            VNo: vehNo, 
            VehiProv: vehProvider, 
            RId: routeid,
            NoSeat: numSeat, 
            Stren: stren,
            PDate: pdate,
            IDate: idate,
            IEDate: iedate, 
            DName: dname, 
            DLicNo: dlicenceno, 
            DAdd: dadd, 
            ContactNo: contact,             
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "VehicleInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Insert Update api function end----------------------------------------



// --------------------------------------This is Vehicle Delete api function -----------------------------------------
export const getVehicleDelete = async (vehid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            VehId: vehid,
            ApiAdd: "VehicleDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "VehicleDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Vehicle Delete api function end----------------------------------------



// --------------------------------------This is (Assign Vehicle) Class Wise Transport Student List api function -----------------------------------------
export const getClassWiseTransportStudentList = async (insid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "ClassWiseTransportStudentList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ClassWiseTransportStudentList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is (Assign Vehicle) Class Wise Transport Student List api function end----------------------------------------



// --------------------------------------This is (Assign Vehicle) Assign Vehicle Detail api function -----------------------------------------
export const getAssignVehicleDetail = async ( studid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StId: studid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "AssignVehicleDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignVehicleDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is (Assign Vehicle) Assign Vehicle Detail api function end----------------------------------------



// --------------------------------------This is (Assign Vehicle) Stop Route List api function -----------------------------------------
export const getStopRouteList = async (routeid, insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            RouteId: routeid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "StopRouteList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StopRouteList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is (Assign Vehicle) Stop Route List api function end----------------------------------------



// --------------------------------------This is (Assign Vehicle) Assign Vehicle Insert Update api function -----------------------------------------
export const getAssignVehicleInsertUpdate = async (
    assvehid, vehid, vehtypeid, stopid, studid, routeid, Ptime, 
    Rtime, jdate, sdate, active, userid, insid, sessid, 
) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            AssVehId: assvehid, 
            VehId: vehid,
            VehiType: vehtypeid, 
            StopId: stopid,
            StId: studid, 
            RId: routeid, 
            PTime: Ptime, 
            RTime: Rtime, 
            JDate: jdate, 
            SDate: sdate, 
            IsActive: active, 
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "AssignVehicleInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignVehicleInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is (Assign Vehicle) Assign Vehicle Insert Update api function end----------------------------------------



// --------------------------------------This is (Assign Vehicle) Assign Vehicle Delete api function -----------------------------------------
export const getAssignVehicleDelete = async (assvehid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            AssVehId: assvehid,
            ApiAdd: "AssignVehicleDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignVehicleDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is (Assign Vehicle) Assign Vehicle Delete api function end----------------------------------------



// --------------------------------------This is Hostel Provider List api function -----------------------------------------
export const getHostelProviderList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "HostelProviderList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "HostelProviderList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Hostel Provider List api function end----------------------------------------



// --------------------------------------This is Hostel Provider Detail api function -----------------------------------------
export const getHostelProviderDetail = async ( hostelid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            HostelId: hostelid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "HostelProviderDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "HostelProviderDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Hostel Provider Detail api function end----------------------------------------



// --------------------------------------This is Hostel Provider Insert Update api function -----------------------------------------
export const getHostelProviderInsertUpdate = async ( 
    hostelid, name, add, contact, 
    email, userid, insid, sessid, 
) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            HostelId: hostelid, 
            Name: name,
            Add1: add, 
            ContactNo: contact,
            Email: email, 
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "HostelProviderInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "HostelProviderInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Hostel Provider Insert Update api function end----------------------------------------



// --------------------------------------This is Hostel Provider Delete api function -----------------------------------------
export const getHostelProviderDelete = async (hostelid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            HostelId: hostelid,
            ApiAdd: "HostelProviderDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "HostelProviderDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Hostel Provider Delete api function end----------------------------------------



// --------------------------------------This is Student Hostel List api function -----------------------------------------
export const getStudentHostelList = async (insid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "StudentHostelList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentHostelList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Hostel List api function end----------------------------------------



// --------------------------------------This is Room List api function -----------------------------------------
export const getRoomList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "RoomList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "RoomList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Room List api function end----------------------------------------



// --------------------------------------This is Assign Hostel Detail api function -----------------------------------------
export const getAssignHostelDetail = async ( studid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            StId: studid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "AssignHostelDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignHostelDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Assign Hostel Detail api function end----------------------------------------



// --------------------------------------This is Assign Hostel Insert Update api function -----------------------------------------
export const getAssignHostelInsertUpdate = async ( 
    id, studid, roomid, hostelid, join, stop, 
    active, dis, due, remark, userid, insid, sessid, 
) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id, 
            StId: studid, 
            RoomId: roomid, 
            HoPreId: hostelid, 
            JDate: join, 
            SDate: stop, 
            IsActive: active, 
            HDis: dis, 
            HPDue: due,
            Remark: remark,           
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "AssignHostelInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignHostelInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Assign Hostel Insert Update api function end----------------------------------------



// --------------------------------------This is Assign Hostel Delete api function -----------------------------------------
export const getAssignHostelDelete = async (asshostelid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            AssHostId: asshostelid,
            ApiAdd: "AssignHostelDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "AssignHostelDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Assign Hostel Delete api function end----------------------------------------



// --------------------------------------This is Subject List api function -----------------------------------------
export const getSubjectList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "SubjectList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SubjectList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Subject List api function end----------------------------------------



// --------------------------------------This is Subject Detail api function -----------------------------------------
export const getSubjectDetail = async ( subid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: subid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "SubjectDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SubjectDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Subject Detail api function end----------------------------------------



// --------------------------------------This is Subject Insert Update api function -----------------------------------------
export const getSubjectInsertUpdate = async ( id, subname, alias, orderno, userid, insid, sessid, ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id, 
            Name: subname, 
            Alias: alias, 
            OrderNo: orderno, 
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "SubjectInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SubjectInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Subject Insert Update api function end----------------------------------------



// --------------------------------------This is Subject Delete api function -----------------------------------------
export const getSubjectDelete = async (subid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: subid,
            ApiAdd: "SubjectDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "SubjectDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Subjectl Delete api function end----------------------------------------



// --------------------------------------This is Grade List api function -----------------------------------------
export const getGradeList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "GradeList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GradeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade List api function end----------------------------------------



// --------------------------------------This is Grade Wise List api function -----------------------------------------
export const getGradeWiseList = async (gradeid, insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            GradeId: gradeid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "GradeWiseList",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GradeWiseList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade List api function end----------------------------------------



// --------------------------------------This is Grade Detail api function -----------------------------------------
export const getGradeDetail = async ( gradeid, insid, sessid, ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: gradeid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "GradeDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GradeDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade Detail api function end----------------------------------------



// --------------------------------------This is Grade Insert Update api function -----------------------------------------
export const getGradeInsertUpdate = async ( id, gradeid, name, alias, min, max, remark, userid, insid, sessid, ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id, 
            GradeId: gradeid, 
            Name: name, 
            Alias: alias, 
            MinNum: min,
            MaxNum: max,
            Remark: remark,
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "GradeInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GradeInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade Insert Update api function end----------------------------------------



// --------------------------------------This is Grade Delete api function -----------------------------------------
export const getGradeDelete = async (subgradeid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: subgradeid,
            ApiAdd: "GradeDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GradeDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade Delete api function end----------------------------------------



// --------------------------------------This is Exam Type List api function -----------------------------------------
export const getExamTypeList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamTypeList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "ExamTypeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Type List api function end----------------------------------------



// --------------------------------------This is Exam Type Detail api function -----------------------------------------
export const getExamTypeDetail = async (examtypeid, insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: examtypeid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamTypeDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamTypeDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Type Detail api function end----------------------------------------



// --------------------------------------This is Exam Type Insert Update api function -----------------------------------------
export const getExamTypeInsertUpdate = async ( id, name, alias, userid, insid, sessid, ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id, 
            Name: name, 
            Alias: alias, 
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamTypeInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamTypeInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Type Insert Update api function end----------------------------------------



// --------------------------------------This is Grade Delete api function -----------------------------------------
export const getExamTypeDelete = async (examtypeid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: examtypeid,
            ApiAdd: "ExamTypeDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamTypeDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Grade Delete api function end----------------------------------------



// --------------------------------------This is Exam List api function -----------------------------------------
export const getExamList = async (insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "ExamList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam List api function end----------------------------------------



// --------------------------------------This is Exam Detail api function -----------------------------------------
export const getExamDetail = async (examtypeid, insid, sessid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: examtypeid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Detail api function end----------------------------------------



// --------------------------------------This is Exam Insert Update api function -----------------------------------------
export const getExamInsertUpdate = async ( id, name, alias, userid, insid, sessid, ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id, 
            Name: name, 
            Alias: alias, 
            UserId: userid,
            InstId: insid,
            SessionId: sessid,
            ApiAdd: "ExamInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Insert Update api function end----------------------------------------



// --------------------------------------This is Exam Delete api function -----------------------------------------
export const getExamDelete = async (examid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: examid,
            ApiAdd: "ExamDelete",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Delete api function end----------------------------------------



// --------------------------------------This is Student Roll List api function -----------------------------------------
export const getStudentRollList = async (insid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "StudentRollList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentRollList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Roll List api function end----------------------------------------



// --------------------------------------This is Roll No Insert Update api function -----------------------------------------
export const getRollNoInsertUpdate = async ( id, studid, insid, sessid, clid, ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            RollNo: id, 
            StId: studid, 
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "RollNoInsertUpdate",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "RollNoInsertUpdate",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Roll No Insert Update api function end----------------------------------------



// --------------------------------------This is Exam Time Table List api function -----------------------------------------
export const getExamTimeTableList = async (insid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "ExamTimeTableList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "ExamTimeTableList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Time Table List api function end----------------------------------------



// --------------------------------------This is Exam Time Table Detail api function -----------------------------------------
export const getExamTimeTableDetail = async (listid, examid, insid, sessid, clid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: listid, 
            ExamId: examid,
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "ExamTimeTableDetail",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "ExamTimeTableDetail",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Time Table Detail api function end----------------------------------------



// --------------------------------------This is Exam Time Table Insert Update api function -----------------------------------------
export const getExamTimeTableInsertUpdate = async (id, examid, insid, sessid, clid, start, end, timeTableData, remark ) => { 
    const params = { 
        ParmCriteria: JSON.stringify({ 
            Id: id, 
            ExamId: examid, 
            InstId: insid, 
            SessionId: sessid, 
            ClassId: clid, 
            SDate: start, 
            EDate: end, 
            TimeTableJson: JSON.stringify({ ExamTimeTable: timeTableData, }), 
            Remark: remark, 
            ApiAdd: "ExamTimeTableInsertUpdate", 
            CallBy: "MobileApi", 
            AuthKey: AUTH_KEY, 
        }), 
        ApiAdd: "ExamTimeTableInsertUpdate", 
    }; 
    
    const response = await axios.get(API_URL, { params }); 
    return response.data; 
};
// ------------------------------------This is Exam Time Table Insert Update api function end----------------------------------------



// --------------------------------------This is Exam Assign Hole api function -----------------------------------------
export const getExamAssignHole = async (insid, studid, sessid, roomid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            StudentId: studid,
            SessionId: sessid,
            RoomId: roomid,
            ApiAdd: "ExamAssignHole", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "ExamAssignHole",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Assign Hole api function end----------------------------------------



// --------------------------------------This is Month List api function -----------------------------------------
export const getMonthList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "MonthList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "MonthList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Month List api function end----------------------------------------



// --------------------------------------This is Student Att List api function -----------------------------------------
export const getStudentAttList = async (monthid, sessid, clid, examid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            MonthId: monthid,
            SessionId: sessid,
            ClassId: clid,
            ExamId: examid,
            ApiAdd: "StudentAttList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentAttList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Att List api function end----------------------------------------



// --------------------------------------This is Student Att Insert Update api function -----------------------------------------
export const getStudentAttInsertUpdate = async (id, insid, sessid, clid, examid, studAttendDetails, userid ) => { 
    const params = { 
        ParmCriteria: JSON.stringify({ 
            MonthId: id, 
            InstId: insid, 
            SessionId: sessid, 
            ClassId: clid, 
            ExamId: examid, 
            StAttJson: JSON.stringify({ StAttDetails: studAttendDetails, }), 
            UserId: userid, 
            ApiAdd: "StudentAttInsertUpdate", 
            CallBy: "MobileApi", 
            AuthKey: AUTH_KEY, 
        }), 
        ApiAdd: "StudentAttInsertUpdate", 
    }; 
    
    const response = await axios.get(API_URL, { params }); 
    return response.data; 
};
// ------------------------------------This is Student Att Insert Update api function end----------------------------------------



// --------------------------------------This is Student Att List api function -----------------------------------------
export const getStudentMarksList = async (sessid, clid, examid, examtypeid, subid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            
            SessionId: sessid,
            ClassId: clid,
            ExamId: examid,
            ExamTypeId: examtypeid,
            SubjectId: subid,
            ApiAdd: "StudentMarksList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentMarksList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Att List api function end----------------------------------------



// ------------------------------------This is Student Marks Insert api function----------------------------------------
export async function insertMarks({marksModel, marksTrans, schId = "VSS",
}) {
  const url = "https://schoolappapi.schoolsoftwaresolution.in/MobApi.asmx/MarksInsert";

  const formData = new FormData();

  const payload = {
    MarksModel: marksModel,
    MarksTrans: marksTrans,
    ApiAdd: "MarksInsert",
    CallBy: "App",
    AuthKey: "AK101",
  };

  formData.append("ParmCriteria", JSON.stringify(payload));
  formData.append("SchID", schId);
  formData.append("ApiAdd", "MarksInsert");

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("MarksInsert API Error:", error);
    throw error;
  }
}
// ------------------------------------This is Student Student Marks Insert api function end----------------------------------------



// --------------------------------------This is Sms Balance api function -----------------------------------------
export const getSmsBalance = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "SmsBalance", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "SmsBalance",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Sms Balance api function end----------------------------------------



// --------------------------------------This is Student Event api function -----------------------------------------
export const getStudentEvent = async (insid, sessid, clid, empid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            IsEmployee: empid,
            ApiAdd: "StudentEvent", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentEvent",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Event api function end----------------------------------------



// --------------------------------------This is Student User Pass api function -----------------------------------------
export const getSmsTemplete = async (id,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            Id: id,           
            ApiAdd: "SmsTemplete", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "SmsTemplete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student User Pass api function end----------------------------------------



// --------------------------------------This is Student User Pass api function -----------------------------------------
export const getStudentUserPass = async (insid, sessid, clid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            ApiAdd: "StudentUserPass", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentUserPass",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student User Pass api function end----------------------------------------



// --------------------------------------This is User List api function -----------------------------------------
export const getUserList = async (insid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ApiAdd: "UserList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "UserList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is User List api function end----------------------------------------



// --------------------------------------This is User Type List api function -----------------------------------------
export const getUserTypeList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "UserTypeList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "UserTypeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is User Type List api function end----------------------------------------



// --------------------------------------This is Year List api function -----------------------------------------
export const getYearList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "YearList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "YearList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Year List api function end----------------------------------------



// --------------------------------------This is Student Att Report api function -----------------------------------------
export const getStudentAttReport = async (insid, sessid, clid, monthid, yearid, summaryid, date,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            MonthId: monthid,
            YearId: yearid,
            IsSummary: summaryid,
            TDate: date,
            ApiAdd: "StudentAttReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "StudentAttReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Student Att Report api function end----------------------------------------



// --------------------------------------This is Due Report api function -----------------------------------------
export const getDueReport = async (insid, sessid, clid, last, monthid, ledgerid, transportid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            IsLastBalance: last,
            MonthId: monthid,
            LedgerId: ledgerid,
            IsTransport: transportid,
            ApiAdd: "DueReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "DueReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Due Report api function end----------------------------------------



// --------------------------------------This is Fee Ledger List api function -----------------------------------------
export const getFeeLedgerList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "FeeLedgerList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "FeeLedgerList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Fee Ledger List api function end----------------------------------------



// --------------------------------------This is Hostel Due Report api function -----------------------------------------
export const getHostelDueReport = async (insid, sessid, clid, monthid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            MonthId: monthid,
            ApiAdd: "HostelDueReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "HostelDueReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Hostel Due Report api function end----------------------------------------



// --------------------------------------This is Other Due Report api function -----------------------------------------
export const getOtherDueReport = async (insid, sessid, clid, ledgerid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            LedgerId: ledgerid,
            ApiAdd: "OtherDueReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "OtherDueReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Other Due Report api function end----------------------------------------



// --------------------------------------This is Other Ledger List api function -----------------------------------------
export const getOtherLedgerList = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "OtherLedgerList", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "OtherLedgerList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Other Ledger List api function end----------------------------------------



// --------------------------------------This is PL Report api function -----------------------------------------
export const getPLReport = async (insid, sessid, date,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            TDate: date,
            ApiAdd: "PLReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "PLReport ",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is PL Report api function end----------------------------------------



// --------------------------------------This is Other Due Report api function -----------------------------------------
export const getTotalOutStandingReport = async (insid, sessid, clid, monthid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            SessionId: sessid,
            ClassId: clid,
            MonthId: monthid,
            ApiAdd: "TotalOutStandingReport", 
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY
        }),
        ApiAdd: "TotalOutStandingReport ",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Other Due Report api function end----------------------------------------



// --------------------------------------This is Old API  -----------------------------------------
// --------------------------------------This is not correct -----------------------------------------
// --------------------------------------This is Exam List api function -----------------------------------------
export const getexam = async (insid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ApiAdd: "ExamList", 
            CallBy: "MobileApi",
            AuthKey: "AK101"
        }),
        SchID: scId,
        ApiAdd: "ExamList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam List api function end----------------------------------------



// --------------------------------------This is Exam Type List api function -----------------------------------------
export const getsubexam = async (insid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ApiAdd: "ExamTypeList", 
            CallBy: "MobileApi",
            AuthKey: "AK101"
        }),
        SchID: scId,
        ApiAdd: "ExamTypeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Exam Type List api function end----------------------------------------



// --------------------------------------This is Sub Exam Subject List api function -----------------------------------------
export const getsubject = async (insid, clid, exmid, subexmid) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ClassId: clid, 
            ExamId: exmid,
            SubExamId: subexmid,
            ApiAdd: "SubExamSubjectList", 
            CallBy: "MobileApi",
            AuthKey: "AK101"
        }),
        SchID: scId,
        ApiAdd: "SubExamSubjectList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Sub Exam Subject List api function end----------------------------------------




// --------------------------------------This is Bank List api function -----------------------------------------
export const getbank = async (insid,) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: insid,
            ApiAdd: "BankList",
            CallBy:"MobileApi",
            "AuthKey": AUTH_KEY
        }),
        ApiAdd: "BankList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------
// ------------------------------------This is Bank List api function end----------------------------------------




// ------------------------------------ Fees Reciept --------------------------------------
// ------------------------------------ Fees Details API --------------------------------------

export const getFeesDetails = async (instId, sessionId = "3") => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: Number(instId),
      SessionId: String(sessionId),
      ApiAdd: "FeesDetails",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "FeesDetails",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};

// ------------------------------------ Fees Details API End ----------------------------------

// ------------------------------------ Class Wise Student List API --------------------------------------
export const getClassWiseStudents = async (instId, sessionId, classId) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: Number(instId),
      SessionId: String(sessionId),
      ClassId: String(classId),
      ApiAdd: "ClassWiseStudentList",
      CallBy: "MobileApi",
      AuthKey: "SYS101",
    }),
    ApiAdd: "ClassWiseStudentList",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};
// ------------------------------------ Class Wise Student List API End -------------------------------

// ------------------------------------ Student Fees Details API --------------------------------------
export const getStudentFeesDetails = async (instId, sessionId, classId, studentId, vhType = "11", rType = "1") => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: Number(instId),
            SessionId: String(sessionId),
            ClassId: String(classId),
            StId: Number(studentId),
            VhType: String(vhType),
            RType: String(rType),
            ApiAdd: "StudentFeesDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentFeesDetails",
    };

    const response = await axios.get(API_URL, { params });
    return response.data;
}




// ------------------------------------ new Receipt Number API  --------------------------------------
export const getNewReceiptNumber = async () => {
    const params = {
        ParmCriteria: JSON.stringify({
            VhType: 11,
            ApiAdd: "GetReceiptNo",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "GetReceiptNo",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};
// ------------------------------------ new Receipt Number API End --------------------------------------

// ------------------------------------ Student Fees Insert API --------------------------------------
// ------------------------------------ Student Fees Insert API --------------------------------------

export const studentFeesInsert = async (data) => {
    const parmCriteria = {
        InstId: Number(data.instId),
        SessionId: String(data.sessionId),
        ClassId: String(data.classId),
        StId: Number(data.studentId),
        
        VhType: "11",
        PMode: String(data.paymentMode || "1"),
        BankId: String(data.bankId || "0"),
        
        RcNo: String(data.receiptNo),
        RcDate: String(data.receiptDate),
        
        NAmt: String(data.netAmount),
        TAmt: String(data.totalAmount),
        DAmt: String(data.discountAmount || 0),
        FAmt: String(data.fineAmount || 0),
        
        ChqNo: "",
        ChqDate: "",
        ChqBankId: "",
        
        FeeJson: data.feeJson, // already stringified ✔️
        
        UserId: 1,
        ApiAdd: "StudentFeesInsert",
        CallBy: "MobileApi",
        AuthKey: "SYS101",
  };
  
  return axios.get(API_URL, {
      params: {
          ParmCriteria: JSON.stringify(parmCriteria),
          ApiAdd: "StudentFeesInsert",
        },
  }).then(res => res.data);
};










// ------------------------------------ FAIZAN --------------------------------------
// ------------------------------------ MAHOMAD FAIZAN KHAN --------------------------------------




export const getHostelStudents = async (instId, sessionId, classId) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: Number(instId),
      SessionId: String(sessionId),
      ClassId: String(classId),
      ApiAdd: "StudentHostelList",
      CallBy: "MobileApi",
      AuthKey: "SYS101",
    }),
    ApiAdd: "StudentHostelList",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};


// ------------------------------------ Class Wise Student List API End -------------------------------
// ------------------------------------ Vehicle Wise Student List API --------------------------------------
export const getVehicleWiseStudent = async (instId, sessionId, vehId) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: Number(instId),
      SessionId: String(sessionId),
      VehId: String(vehId),
      ApiAdd: "VehicleWiseStudentList",
      CallBy: "MobileApi",
      AuthKey: "SYS101",
    }),
    ApiAdd: "VehicleWiseStudentList",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};
// ------------------------------------ Vehicle Wise Student List API End -------------------------------


// ------------------------------------ Vehicle Fees Details API --------------------------------------
export const getTransportFeesDetails = async (instId, sessionId, classId, studentId, vhType = "13", rType = "1") => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: Number(instId),
            SessionId: String(sessionId),
            ClassId: String(classId),
            StId: Number(studentId),
            VhType: String(vhType),
            RType: String(rType),
            ApiAdd: "StudentFeesDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentFeesDetails",
    };

    const response = await axios.get(API_URL, { params });
    return response.data;
}

export const getHostelFeesDetails = async (instId, sessionId, classId, studentId, vhType = "14", rType = "1") => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: Number(instId),
            SessionId: String(sessionId),
            ClassId: String(classId),
            StId: Number(studentId),
            VhType: String(vhType),
            RType: String(rType),
            ApiAdd: "StudentHostelFeesDetails",
            CallBy: "MobileApi",
            AuthKey: AUTH_KEY,
        }),
        ApiAdd: "StudentHostelFeesDetails",
    };

    const response = await axios.get(API_URL, { params });
    return response.data;
}

export const transportFeesInsert = async (data) => {
  const parmCriteria = {
    InstId: Number(data.instId),
    SessionId: String(data.sessionId),
    ClassId: String(data.classId),
    StId: Number(data.studentId),
    VhType: "13",
 
    RcNo: String(data.receiptNo),
    RcDate: String(data.receiptDate),
    NAmt: String(data.netAmount),
    TAmt: String(data.totalAmount),
    DAmt: String(data.discountAmount || 0),
    FAmt: String(data.fineAmount || 0),
    PMode: Number(data.paymentMode || 0),
    BankId: Number(data.bankId || 0),
    ChqNo: data.ChqNo || "",
    ChqDate: data.ChqDate ? String(data.ChqDate) : "",
    ChqBankId: Number(data.ChqBankId || 0),

    FeeJson: data.feeJson, // json data of fee✔️

    UserId: 1,
    ApiAdd: "StudentFeesInsert",
    CallBy: "MobileApi",
    AuthKey: "SYS101",
  };

  return axios.get(API_URL, {
    params: {
      ParmCriteria: JSON.stringify(parmCriteria),
      ApiAdd: "StudentFeesInsert",
    },
  }).then(res => res.data);
};

export const hostelFeesInsert = async (data) => {
  const parmCriteria = {
    InstId: Number(data.instId),
    SessionId: String(data.sessionId),
    ClassId: String(data.classId),
    StId: Number(data.studentId),

    VhType:  Number(data.VhType),
 
    RcNo: String(data.receiptNo),
    RcDate: String(data.receiptDate),
    NAmt: String(data.netAmount),
    TAmt: String(data.totalAmount),
    DAmt: String(data.discountAmount || 0),
    FAmt: String(data.fineAmount || 0),
    PMode: Number(data.paymentMode || 0),
    BankId: Number(data.bankId || 0),
    ChqNo: data.ChqNo || "",
    ChqDate: data.ChqDate ? String(data.ChqDate) : "",
    ChqBankId: Number(data.ChqBankId || 0),

    FeeJson: data.feeJson, // json data of fee✔️

    UserId: 1,
    ApiAdd: "StudentFeesInsert",
    CallBy: "MobileApi",
    AuthKey: "SYS101",
  };

  return axios.get(API_URL, {
    params: {
      ParmCriteria: JSON.stringify(parmCriteria),
      ApiAdd: "StudentFeesInsert",
    },
  }).then(res => res.data);
};

export const deleteTransportReceipt = async (rcID) => {
    const params = {
        ParmCriteria: JSON.stringify({
            RcNo: Number(rcID),
            VhType: "13",
            ApiAdd: "ReceiptDelete",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "ReceiptDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};



export const deleteHostelReceipt = async (rcID) => {
    const params = {
        ParmCriteria: JSON.stringify({
            RcNo: Number(rcID),
            VhType: "14",
            ApiAdd: "ReceiptDelete",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "ReceiptDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};


export const deleteStudentReceipt = async (rcID) => {
    const params = {
        ParmCriteria: JSON.stringify({
            RcNo: Number(rcID),
            VhType: "11",
            ApiAdd: "ReceiptDelete",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "ReceiptDelete",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
};






//--------------------REPORT------------------------

export const getStudentReportDetail = async(instId, sessionId, classId,searchType,search ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            ClassId: classId || 0,
            SearchType:searchType || 2,
            Search: search,
            ApiAdd: "StudentReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentReport",
    };
    const response = await axios.get(API_URL, { params });  
    return response.data;

}

export const getStudentSiblingReport = async(instId, sessionId, studentId ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            StId: studentId,
            ApiAdd: "StudentSiblingReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentSiblingReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}




export const getStudentReportFee = async(instId, sessionId, classId, studentId, payId, rcNo, formDate, endDate ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            ClassId: classId || "",
            StId: studentId || "",
            PayId: payId || "",
            RcNo: rcNo || "",
            FormDate: formDate || "",
            EndDate: endDate || "",
            VhTypeId:   11,
            ApiAdd: "StudentFeeReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }), 
        ApiAdd: "StudentFeeReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;   
}

export const getTransportFeeReport = async(instId, sessionId, classId, studentId, payId, rcNo, formDate, endDate ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            ClassId: classId || "",
            StId: studentId || "",
            PayId: payId || "",
            RcNo: rcNo || "",
            FormDate: formDate || "",
            EndDate: endDate || "",
            VhTypeId:   13,
            ApiAdd: "StudentFeeReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }), 
        ApiAdd: "StudentFeeReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;   
}
export const getHostelFeeReport = async(instId, sessionId, classId, studentId, payId, rcNo, formDate, endDate ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            ClassId: classId || "",
            StId: studentId || "",
            PayId: payId || "",
            RcNo: rcNo || "",
            FormDate: formDate || "",
            EndDate: endDate || "",
            VhTypeId:   14,
            ApiAdd: "StudentFeeReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }), 
        ApiAdd: "StudentFeeReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;   
}


export const getTransportReportFee = async(instId, sessionId, classId, vhId, srNo, name ) => { 
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            ClassId: classId || "",
            VhId: vhId || "",
            SrNo: srNo || "",
            Name: name || "",
            
          
            ApiAdd: "StudentTransportReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }), 
        ApiAdd: "StudentTransportReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;   
}



export const getHostelReportDetail = async(InstId,SessionId,ClassId,SrNo,Name) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            ClassId: ClassId || "",
            SrNo: SrNo || "",
            Name: Name || "",
            ApiAdd: "StudentHostelReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentHostelReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}


export const getEnquiryReportDetail = async(instId, sessionId, classId, searchType, srNo, name ) => {
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: instId,
            SessionId: sessionId,
            SearchType: searchType || 3,
            ClassId: classId || "",
            SrNo: srNo || "",
            Name: name || "",
            ApiAdd: "StudentEnquireReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentEnquireReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}

export const getEnquiryTypeList = async()=>{
    const params = {
        ParmCriteria: JSON.stringify({
            ApiAdd: "EnquireTypeList",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "EnquireTypeList",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;

}

export const getStudentCasteWiseReport = async(InstId,SessionId,IsOnlyGirl) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            IsOnlyGirl: IsOnlyGirl || 0,
            ApiAdd: "StudentCastWiseReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentCastWiseReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}

export const getStudentAgeWiseReport = async(InstId,SessionId,ClassId) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            ClassId: ClassId ,
            ApiAdd: "StudentAgeWiseReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "StudentAgeWiseReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;   
}




//---------------------------------------DayTRANSACTION----------------

//date formate "12/Dec/2026"
export const getDayBookSummaryReport = async(InstId,SessionId,FromDate,ToDate) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            FromDate: FromDate ,
            ToDate: ToDate ,
            ApiAdd: "DayBookSummaryReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "DayBookSummaryReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}

//date formate "12/Dec/2026"
export const getDayBookDetailReport = async(InstId,SessionId,FromDate,ToDate,IsTuition) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            FromDate: FromDate ,
            ToDate: ToDate ,
            IsTuition: IsTuition || 0,
            ApiAdd: "DayBookDetailReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "DayBookDetailReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}


//date formate "12/Dec/2026"

export const getDayBookReport = async(InstId,SessionId,TDate) =>{
    const params = {
        ParmCriteria: JSON.stringify({
            InstId: InstId,
            SessionId: SessionId,
            TDate: TDate ,
            ApiAdd: "DayBookReport",
            CallBy: "MobileApi",
            AuthKey:AUTH_KEY,
        }),
        ApiAdd: "DayBookReport",
    };
    const response = await axios.get(API_URL, { params });
    return response.data;
}


export const getBankChallanReport = async (
  instId,
  sessionId,
  classId,
  monthId
) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: instId,
      SessionId: sessionId,
      ClassId: classId || "",
      MonthId: monthId || "",
      ApiAdd: "BankChallanReport",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "BankChallanReport",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};



export const getExamHallReport = async (instId, sessionId) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: instId,
      SessionId: sessionId,
      ApiAdd: "ExamHoleReport",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "ExamHoleReport",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};


export const getAdmitCardReport = async (
  instId,
  sessionId,
  classId,
  examId
) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: instId,
      SessionId: sessionId,
      ClassId: classId || "",
      ExamId: examId || "",
      ApiAdd: "AdmitCardReport",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "AdmitCardReport",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};


export const getExamMarksReport = async (
  instId,
  sessionId,
  classId,
  examId
) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: instId,
      SessionId: sessionId,
      ClassId: classId || "",
      ExamId: examId || "",
      ApiAdd: "ExamMarksReport",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "ExamMarksReport",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};



export const getMarksReport = async (
  instId,
  sessionId,
  classId,
  examId
) => {
  const params = {
    ParmCriteria: JSON.stringify({
      InstId: instId,
      SessionId: sessionId,
      ClassId: classId || "",
      ExamId: examId || "",
      ApiAdd: "MarksReport",
      CallBy: "MobileApi",
      AuthKey: AUTH_KEY,
    }),
    ApiAdd: "MarksReport",
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
};