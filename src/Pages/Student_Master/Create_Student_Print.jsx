// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, } from "@react-pdf/renderer"; 
// import {  getHeaderDetail, getclass, getcaste, } from "../../services/api"; 

// /* ---------------- DATE FORMAT ---------------- */
// const formatDate = (dotNetDate) => {
//   if (!dotNetDate) return "";
//   const ts = Number(dotNetDate.match(/\d+/)[0]);
//   return new Date(ts).toLocaleDateString("en-GB");
// };

// /* ---------------- STYLES ---------------- */
// const styles = StyleSheet.create({
//   page: { padding: 15, fontSize: 9 },
//   borderBox: { border: "1 solid black", padding: 10, height: "100%" },

//   headerRow: { flexDirection: "row", alignItems: "center" },
//   logo: { width: 70, height: 70 },

//   schoolName: { fontSize: 18, fontWeight: "bold" },
//   centerText: { flex: 1, textAlign: "center" },

//   greenBar: {
//     backgroundColor: "#1f8f12",
//     padding: 5,
//     marginVertical: 8,
//   },
//   greenBarText: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   row: { flexDirection: "row", marginBottom: 6 },
//   label: { width: "22%", color: "green", fontWeight: "bold" },
//   value: {
//     width: "78%",
//     borderBottom: "1 dotted black",
//     paddingBottom: 2,
//   },

//   photo: {
//     width: 80,
//     height: 100,
//     border: "1 solid black",
//   },

//   officeBox: {
//     border: "1 solid black",
//     padding: 6,
//     width: "48%",
//   },

//   signatureRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 30,
//   },
// });

// /* ---------------- COMPONENT ---------------- */
// export default function Create_Student_Print() {
//   const [params] = useSearchParams();
//   const studId = params.get("studId");

//   const instId = localStorage.getItem("InstituteID");
//   const sesId = localStorage.getItem("SessionID");

//   const [student, setStudent] = useState(null);
//   const [header, setHeader] = useState(null);
//   const [classList, setClassList] = useState([]);
//   const [casteList, setCasteList] = useState([]);

//   useEffect(() => {
//     const loadAll = async () => {
//       const [studentRes, headerRes, classRes, casteRes] = await Promise.all([
//         getHeaderDetail(instId, sesId),
//         getclass(instId),
//         getcaste(),
//       ]);

//       if (studentRes?.Table1) setStudent(studentRes.Table1[0]);
//       if (headerRes?.Table1) setHeader(headerRes.Table1[0]);
//       if (classRes?.Table1) setClassList(classRes.Table1);
//       if (casteRes?.Table1) setCasteList(casteRes.Table1);
//     };

//     loadAll();
//   }, [studId, instId, sesId]);

//   const getClassName = (id) =>
//     classList.find((c) => Number(c.Id) === Number(id))?.ClassName || "";

//   const getCasteName = (id) =>
//     casteList.find((c) => Number(c.Id) === Number(id))?.Name || "";

//   if (!student || !header) return <p>Loading PDF...</p>;

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>

//         {/* ================= PAGE 1 ================= */}
//         <Page size="A4" style={styles.page}>
//           <View style={styles.borderBox}>

//             {/* HEADER */}
//             <View style={styles.headerRow}>
//               <Image src="/Logo.png" style={styles.logo} />
//               <View style={styles.centerText}>
//                 <Text style={styles.schoolName}>{header.HeaderInfo}</Text>
//                 <Text>Contact No : {header.MobileNo}</Text>
//                 <Text>{header.Address}</Text>
//               </View>
//               <Text>{header.RegNo}</Text>
//             </View>

//             {/* GREEN BAR */}
//             <View style={styles.greenBar}>
//               <Text style={styles.greenBarText}>ADMISSION FORM</Text>
//             </View>

//             {/* PHOTO + OFFICE USE */}
//             <View style={{ flexDirection: "row", marginBottom: 10 }}>
//               <Image
//                 src={student.Photo || "/default-photo.jpg"}
//                 style={styles.photo}
//               />

//               <View style={[styles.officeBox, { marginLeft: 10 }]}>
//                 <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//                   OFFICE USE
//                 </Text>
//                 <Text>Class : {getClassName(student.F_ClassMaster)}</Text>
//                 <Text>Scholar No : {student.ScholarNo}</Text>
//                 <Text>
//                   Date of Admission : {formatDate(student.AdmissionDate)}
//                 </Text>
//                 <Text style={{ marginTop: 20 }}>Signature</Text>
//               </View>
//             </View>

//             {/* DETAILS */}
//             <View style={styles.row}>
//               <Text style={styles.label}>Student's Name</Text>
//               <Text style={styles.value}>{student.Name}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Father's Name</Text>
//               <Text style={styles.value}>{student.FatherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Mother's Name</Text>
//               <Text style={styles.value}>{student.MotherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Date of Birth</Text>
//               <Text style={styles.value}>{formatDate(student.DOB)}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Category</Text>
//               <Text style={styles.value}>
//                 {getCasteName(student.F_CastMaster)}
//               </Text>
//             </View>
//             <View style={styles.row}>
//                           <Text style={styles.label}>Category:</Text>
//                           <Text style={[styles.value, { marginRight: 20 }]}>
//                             {student.FMobileNo}
//                           </Text>
//                           <Text style={styles.label}>Caste:</Text>
//                           <Text style={[styles.value, { width: "21.5%" }]}>
//                             {student.MMobileNo}
//                           </Text>
//                         </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Address</Text>
//               <Text style={styles.value}>{student.Address1}</Text>
//             </View>

//             {/* SIGNATURE */}
//             <View style={styles.signatureRow}>
//               <Text>Student Signature</Text>
//               <Text>Parent Signature</Text>
//             </View>
//           </View>
//         </Page>

//         {/* ================= PAGE 2 ================= */}
//         <Page size="A4" style={styles.page}>
//           <View style={styles.borderBox}>
//             <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//               DECLARATION
//             </Text>

//             <Text style={{ marginTop: 10 }}>
//               I certify that the above mentioned details shall bear the full
//               responsibility of correctness.
//             </Text>

//             <Text>1. Student name is {student.Name}</Text>
//             <Text>2. All details are correct</Text>
//             <Text>3. Student will follow school rules</Text>
//             <Text>4. School rules are binding</Text>

//             <View style={{ marginTop: 50, textAlign: "right" }}>
//               <Text>Parent Signature</Text>
//             </View>

//             <View style={{ marginTop: 40 }}>
//               <Text style={{ fontWeight: "bold" }}>Attachment Required</Text>
//               <Text>T.C (Original)</Text>
//               <Text>Marksheet (Photocopy)</Text>
//               <Text>Aadhar (Photocopy)</Text>
//             </View>

//             <View style={{ marginTop: 40, textAlign: "right" }}>
//               <Text>Principal Signature</Text>
//             </View>
//           </View>
//         </Page>

//       </Document>
//     </PDFViewer>
//   );
// }







import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import {
  getHeaderDetail,
  getclass,
  getcaste,
  getStudentDetails,
} from "../../services/api";

/* ---------------- DATE FORMAT ---------------- */
const formatDate = (dotNetDate) => {
  if (!dotNetDate) return "";
  const ts = Number(dotNetDate.match(/\d+/)?.[0]);
  return ts ? new Date(ts).toLocaleDateString("en-GB") : "";
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  page: {
    padding: 12,
    fontSize: 9,
    fontFamily: "Helvetica",
  },

  outerBox: {
    border: "1 solid black",
    padding: 10,
    height: "100%",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 65,
    height: 65,
  },

  headerCenter: {
    flex: 1,
    textAlign: "center",
  },

  schoolName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: { 
    fontSize: 11, 
    marginVertical: 4, 
    fontWeight: "semibold" 
  },
  AffNo: { 
    fontSize: 9, 
    fontWeight: "bold",
    textAlign: "right", 
    marginBottom: 6, },

  greenBar: {
    backgroundColor: "#1f8f12",
    paddingVertical: 4,
    marginVertical: 8,
    border: "1 solid black",
  },

  greenText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },

  label: {
    width: "22%",
    color: "green",
    fontWeight: "bold",
  },

  value: {
    width: "78%",
    borderBottom: "1 dotted black",
    paddingBottom: 2,
    marginTop: 2,
  },

  valueHalf: {
    width: "30%",
    borderBottom: "1 dotted black",
    paddingBottom: 3,
    marginTop: 2,
  },

  photo: {
    width: 100,
    height: 115,
    border: "1 solid black",
  },

  officeBox: {
    border: "1 solid black",
    padding: 6,
    width: "40%",
    marginLeft: 10,
  },
  officeheading: {
    fontSize:12, fontWeight: "bold", textAlign: "center", marginBottom: 5  
  },
  officetext: {
    width: "50%",
    fontSize: 10,
    fontWeight: "bold",  
  },
  topRow: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginVertical: 8,
},

formBarBox: {
  flex: 1,
  marginHorizontal: 10,
  border: "1 solid black",
  backgroundColor: "#1f8f12",
  justifyContent: "center",
  height: 35,
},

officeRow: {
  flexDirection: "row",
  marginBottom: 6,
},

officeValue: {
  width: "55%",
  borderBottom: "1 dotted black",
  fontSize: 10,
  paddingBottom: 2,
},

officeSign: {
  fontSize: 10,
  textAlign: "right",
  marginTop: 18,
},


  sectionTitle: {
    fontWeight: "bold",
    marginTop: 8,
  },

  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },

  subjectCol: {
    width: "33%",
    paddingLeft: 6,
    fontWeight: "bold"
  },

  subjectRow: {
    marginLeft:'10', 
    lineHeight: 0.8
  },

  declarationText: {
    lineHeight: 1.4,
  },
});

/* ---------------- COMPONENT ---------------- */
export default function Create_Student_Print() {
  const { state } = useLocation();
  const instId = localStorage.getItem("InstituteID");
  const sesId = localStorage.getItem("SessionID");

  const studId = state?.studId;
  console.log(studId);
  const classId = state?.classId;
  

  const [student, setStudent] = useState(null);
  const [header, setHeader] = useState(null);
  const [classList, setClassList] = useState([]);
  const [casteList, setCasteList] = useState([]);

  // ✅ guard AFTER hooks
  if (!studId) {
    return <p>No data found</p>;
  }

  useEffect(() => {
  const loadAll = async () => {
    try {
      const [
        studentRes,
        headerRes,
        classRes,
        casteRes
      ] = await Promise.all([
        getStudentDetails(instId, studId, sesId, classId),
        getHeaderDetail(instId, sesId),
        getclass(instId),
        getcaste(),
      ]);

      if (studentRes?.Table?.length) {
        setStudent(studentRes.Table[0]);
      }

      if (headerRes?.Table?.[0]?.ResultCode === "R100") {
        setHeader(headerRes.Table1[0]);
      }

      if (classRes?.Table?.[0]?.ResultCode === "R100") {
        setClassList(classRes.Table1 || []);
      }

      if (casteRes?.Table?.[0]?.ResultCode === "R100") {
        setCasteList(casteRes.Table1 || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadAll();
}, [studId, instId, sesId, classId]);

/* ---------------- LOADING GUARD ---------------- */
  if (!student || !header) {
    return <p>Loading PDF...</p>;
  }

  /* ---------------- HELPERS ---------------- */
  const getClassName = (id) =>
    classList.find((c) => Number(c.Id) === Number(id))?.ClassName || "";

  const getCasteName = (id) =>
    casteList.find((c) => Number(c.Id) === Number(id))?.Name || "";


  return (
    <PDFViewer width="100%" height="1000px">
      <Document>

        {/* ================= PAGE 1 : ADMISSION FORM ================= */}
        <Page size="A4" style={styles.page}>
          <View style={styles.outerBox}>

            {/* HEADER */}
            <View style={styles.headerRow}>
              <Image src="/Logo.png" style={styles.logo} /> 
              <View style={styles.headerCenter}> 
                <Text style={styles.schoolName}>{header.HeaderInfo}</Text> 
                <Text style={styles.subText}>Contact No : {header.MobileNo}</Text> 
                <Text style={styles.subText}>{header.Address}</Text> 
              </View> 
            </View> 
            <Text style={styles.AffNo}>AFF.No.: {header.RegNo}</Text>

            {/* GREEN BAR */}
            {/* <View style={styles.greenBar}>
              <Text style={styles.greenText}>ADMISSION FORM</Text>
            </View> */}

            {/* PHOTO + OFFICE USE */}
            {/* <View style={{ flexDirection: "row", marginBottom: 8 }}>
              <Image src="/default-photo.jpg" style={styles.photo} />

              <View style={styles.officeBox}>
                <Text style={styles.officeheading}>
                  OFFICE USE
                </Text>
                 <View style={styles.row}>
                <Text style={styles.officetext}>Class :</Text>
                <Text style={[styles.value, {width: "50%",}]}> {getClassName(student.F_ClassMaster)}</Text>
                </View>
                 <View style={styles.row}>
                <Text style={styles.officetext}>Scholar Number :</Text>
                <Text style={[styles.value, {width: "50%",}]}> 1173</Text>
                </View>
                 <View style={styles.row}>
                <Text style={styles.officetext}>Date of Admission :</Text>
                <Text style={[styles.value, {width: "50%",}]}> {formatDate(student.AdmissionDate)}</Text>
                </View>
                <Text style={{ fontSize: 10, marginTop: 15, textAlign: "right" }}>Signature</Text>
              </View>
            </View> */}
            {/* PHOTO + ADMISSION FORM + OFFICE USE */}
<View style={styles.topRow}>

  {/* PHOTO */}
  <Image src="/default-photo.jpg" style={styles.photo} />

  {/* ADMISSION FORM BAR */}
  <View style={styles.formBarBox}>
    <Text style={styles.greenText}>ADMISSION FORM</Text>
  </View>

  {/* OFFICE USE */}
  <View style={styles.officeBox}>
    <Text style={styles.officeheading}>OFFICE USE</Text>

    <View style={styles.officeRow}>
      <Text style={styles.officetext}>Class :</Text>
      <Text style={styles.officeValue}>
        {getClassName(student.F_ClassMaster)}
      </Text>
    </View>

    <View style={styles.officeRow}>
      <Text style={styles.officetext}>Scholar Number :</Text>
      <Text style={styles.officeValue}>{student.OldSrno}</Text>
    </View>

    <View style={styles.officeRow}>
      <Text style={styles.officetext}>Date of Admission :</Text>
      <Text style={styles.officeValue}>
        {formatDate(student.AdmissionDate)}
      </Text>
    </View>

    <Text style={styles.officeSign}>SIGNATURE</Text>
  </View>

</View>
<Text style={{width: "100%", borderBottom: "1 solid black", marginVertical: "10"}}></Text>


            {/* FORM FIELDS */}
            <View style={styles.row}>
              <Text style={styles.label}>Class</Text>
              <Text style={styles.value}>{getClassName(student.F_ClassMaster)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Student's Name</Text>
              <Text style={styles.value}> {student.Name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Father's Name</Text>
              <Text style={styles.value}> {student.FatherName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Mother's Name</Text>
              <Text style={styles.value}> {student.MotherName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date Of Birth</Text>
              <Text style={styles.value}>{formatDate(student.DOB)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Aadhar Card No</Text>
              <Text style={styles.value}>{student.STIdCardNo}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Category</Text>
              <Text style={[styles.valueHalf, { marginRight: 20 }]}>{getCasteName(student.F_CastMaster)}</Text>
              <Text style={[styles.label, { width: "14.5%", }]}>Caste</Text>
              <Text style={styles.valueHalf}> {student.Caste}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Guardian</Text>
              <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.GaurdianName}</Text>
              <Text style={[styles.label, { width: "14.5%",  }]}>Relation</Text>
              <Text style={styles.valueHalf}>{student.Grelation}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Father's Occupation</Text>
              <Text style={styles.value}>{student.Foccupation}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Mother's Occupation</Text>
              <Text style={styles.value}>{student.Moccupation}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>
                {student.Address1}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Permanent Address</Text>
              <Text style={styles.value}>
                {student.Address2}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Previous School</Text>
              <Text style={styles.value}>{student.LastSchool}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Father's (Mob)</Text>
              <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.FMobileNo}</Text>
              <Text style={[styles.label, { width: "14.5%" }]}>Mother's (Mob)</Text>
              <Text style={styles.valueHalf}>{student.MMobileNo}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>T.C. No.</Text>
              <Text style={styles.value}>{student.TcNo}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>T.C. Date</Text>
              <Text style={styles.value}>{formatDate(student.TcDate)}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Last Class</Text>
              <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.F_LastClass}</Text>
              <Text style={[styles.label, ]}>Third Language (Sanskrit)</Text>
            </View>

            {/* OPTIONAL SUBJECTS */}
            <Text style={styles.sectionTitle}>Optional Subject's Name</Text>

            <View style={{ flexDirection: "row", marginTop: 4 }}>
              <View style={styles.subjectCol}>
                <Text style={[styles.value, {marginTop: 5}]}>1.</Text>
                <Text style={{marginVertical: 5}}>(Arts)</Text>
                <Text style={styles.subjectRow}>1. History</Text>
                <Text style={styles.subjectRow}>2. Political Science</Text>
                <Text style={styles.subjectRow}>3. Sanskrit Literature</Text>
                <Text style={styles.subjectRow}>4. Hindi Literature</Text>
                <Text style={styles.subjectRow}>5. Geography</Text>
              </View>

              <View style={styles.subjectCol}>
                <Text style={[styles.value, {marginTop: 5}]}>2.</Text>
                <Text style={{marginVertical: 5}}>(Commerce)</Text>
                <Text style={styles.subjectRow}>1. Accountancy</Text>
                <Text style={styles.subjectRow}>2. Business Management</Text>
                <Text style={styles.subjectRow}>3. Banking</Text>
                <Text style={styles.subjectRow}>4. Hindi and English Type</Text>
                <Text style={styles.subjectRow}>5. Computer Science</Text>
              </View>

              <View style={styles.subjectCol}>
                <Text style={[styles.value, {marginTop: 5}]}>3.</Text>
                <Text style={{marginVertical: 5}}>(Science)</Text>
                <Text style={styles.subjectRow}>1. Physics</Text>
                <Text style={styles.subjectRow}>2. Chemistry</Text>
                <Text style={styles.subjectRow}>3. Biology</Text>
                <Text style={styles.subjectRow}>4. Maths</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>If Student get admission again in this school.then provide class and year when any left_ _ _ _ _ _</Text>
            <Text style={[styles.value, {width: "100%", marginTop: "15"}]}></Text>

            <View style={styles.signatureRow}>
              <Text style={styles.label}>Student Signature</Text>
              <Text style={styles.label}>Parent Signature</Text>
            </View>

          </View>
        </Page>

        {/* ================= PAGE 2 : DECLARATION ================= */}
        <Page size="A4" style={styles.page}>
          <View style={styles.outerBox}>
            <Text style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
              DECLARATION
            </Text>

            <Text style={styles.declarationText}>
              I certify that the above mentioned details shall bear the 
              full responsibility of the correct and the following
            </Text>

            <Text style={styles.declarationText}>
              1. I certify that the name of the student / student is {student.Name}.
            </Text>
            <Text style={styles.declarationText}>
              2. I certify that the full details filled in the admission 
              application form are absolutely correct
            </Text>
            <Text style={styles.declarationText}>
              3. The student date of birth in the application form is correct 
              and will not make any changes to it.
            </Text>
            <Text style={styles.declarationText}>
              4. The student / school will follow all the rules of the school.
            </Text>
            <Text style={styles.declarationText}>
              5. Students will be regularly visiting the school at the time. 
              If he / she will be on leave then send a leave.
            </Text>
            <Text style={styles.declarationText}>
              Application before time, otherwise the Principal will have 
              the right to separate his name.
            </Text>
            <Text style={styles.declarationText}>
              6. Students will participate in all activities in the school. 
              Such as sports, cultural events, scouting, guiding, S.U.P.W. Camp etc.
            </Text>
            <Text style={styles.declarationText}>
              7. Students will come to the Vidyalaya's regular dress every 
              day in school. In this absence, the name of the student is 
              separated from the school. Can go.
            </Text>
            <Text style={styles.declarationText}>
              8. Whenever school call me either me or my reprentative will 
              be here.Even my self will take progress report about student time to time.
            </Text>
            <Text style={styles.declarationText}>
              9. The student fee will be deposited in the school on time 
              according to the rules. In case of non-deposit, the name of 
              the student is separated from the school. The Principal will 
              be able to go and the full authority to reproduce or not.
            </Text>
            <Text style={styles.declarationText}>
              10. As per education department rules and regulations, if 
              student's attendance is less, he or she will be not apper 
              in school exam.
            </Text>
            <Text style={styles.declarationText}>
              Examination of the following subjects of the students / 
              students for admission to the class.
            </Text>

            <Text style={{width: "100%", marginTop: "5", borderBottom: "1 solid black",}}></Text>

            <View style={{ marginTop: 20, textAlign: "right" }}>
              <Text style={{color: "green", fontWeight: "bold",}}>Parent's Signature</Text>
            </View>

            <Text style={{ marginVertical: 30, color: "green", fontWeight: "bold" }}>
              Attachment Required
            </Text>
            <View style={[styles.row, {width: "96%", justifyContent: "space-between", alignItems: "center"}]}>
            <Text>T.C (Original)</Text>
            <Text>Mark Sheet (Photocopy)</Text>
            <Text>Aadhar (Photocopy)</Text>
            </View>
            <Text style={{width: "97%", marginTop: "5", borderBottom: "1 solid black",}}></Text>

            <View style={{ marginTop: 40 }}>
              {/* <Text style={{ width: "15%", padding: 5,  border: "1 solid black", fontWeight: "bold", textAlign: "center" }}>
                Office Order
              </Text> */}

              <Text
  style={{
    width: "15%",
    padding: 5,
    border: "1 solid black",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: "auto",
  }}
>
  Office Order
</Text>
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
                Based on entrance test / Previous class marksheet / TC,
                Student is eligible to enter in Class Nur
              </Text>
            </View>

            <View style={{ marginTop: 40, textAlign: "right" }}>
              <Text style={{color: "green", fontWeight: "bold",}}>Principal Signature</Text>
            </View>
          </View>
        </Page>

      </Document>
    </PDFViewer>
  );
}



// import React, { useEffect, useState } from "react";
// import { useLocation, useSearchParams } from "react-router-dom";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
// } from "@react-pdf/renderer";
// import { getHeaderDetail, getclass, getcaste, getStudentDetails } from "../../services/api";

// /* ---------------- DATE FORMAT ---------------- */
// const formatDate = (dotNetDate) => {
//   if (!dotNetDate) return "";
//   const ts = Number(dotNetDate.match(/\d+/)[0]);
//   return new Date(ts).toLocaleDateString("en-GB");
// };

// /* ---------------- STYLES ---------------- */
// const styles = StyleSheet.create({
//   page: {
//     padding: 12,
//     fontSize: 9,
//     fontFamily: "Helvetica",
//   },

//   outerBox: {
//     border: "1 solid black",
//     padding: 10,
//     height: "100%",
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   logo: {
//     width: 65,
//     height: 65,
//   },

//   headerCenter: {
//     flex: 1,
//     textAlign: "center",
//   },

//   schoolName: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   subText: { 
//     fontSize: 11, 
//     marginVertical: 4, 
//     fontWeight: "semibold" 
//   },
//   AffNo: { 
//     fontSize: 9, 
//     fontWeight: "bold",
//     textAlign: "right", 
//     marginBottom: 6, },

//   greenBar: {
//     backgroundColor: "#1f8f12",
//     paddingVertical: 4,
//     marginVertical: 8,
//     border: "1 solid black",
//   },

//   greenText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 14,
//   },

//   row: {
//     flexDirection: "row",
//     marginBottom: 6,
//     alignItems: "center",
//   },

//   label: {
//     width: "22%",
//     color: "green",
//     fontWeight: "bold",
//   },

//   value: {
//     width: "78%",
//     borderBottom: "1 dotted black",
//     paddingBottom: 2,
//   },

//   valueHalf: {
//     width: "30%",
//     borderBottom: "1 dotted black",
//     paddingBottom: 3,
//     marginTop: 2,
//   },

//   photo: {
//     width: 90,
//     height: 100,
//     border: "1 solid black",
//   },

//   officeBox: {
//     border: "1 solid black",
//     padding: 6,
//     width: "45%",
//     marginLeft: 10,
//   },

//   sectionTitle: {
//     fontWeight: "bold",
//     marginTop: 8,
//   },

//   signatureRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 40,
//   },

//   subjectCol: {
//     width: "33%",
//     paddingLeft: 6,
//     fontWeight: "bold"
//   },

//   subjectRow: {
//     marginLeft:'10', 
//     lineHeight: 0.8
//   },

//   declarationText: {
//     lineHeight: 1.4,
//   },
// });

// /* ---------------- COMPONENT ---------------- */
// export default function Create_Student_Print() {
//   const { state } = useLocation();
//   const studId = state?.eqId;   // 👈 correct studentId
//   // const classId = state?.classId; // optional if you pass it


//   const instId = localStorage.getItem("InstituteID");
//   const sesId = localStorage.getItem("SessionID");

//   const [student, setStudent] = useState({});
//   const [header, setHeader] = useState({});
//   const [classList, setClassList] = useState([]);
//   const [casteList, setCasteList] = useState([]);

//   // useEffect(() => {
//   //   const loadAll = async () => {
//   //     const [headerRes, classRes, casteRes] = await Promise.all([
//   //       getHeaderDetail(instId, sesId),
//   //       getclass(instId),
//   //       getcaste(),
//   //     ]);

//   //     if (headerRes?.Table1) {
//   //       setHeader(headerRes.Table1[0]);
//   //       setStudent(headerRes.Table1[0]); // demo mapping
//   //     }
//   //     if (classRes?.Table1) setClassList(classRes.Table1);
//   //     if (casteRes?.Table1) setCasteList(casteRes.Table1);
//   //   };

//   //   loadAll();
//   // }, [studId, instId, sesId]);

//   useEffect(() => {
//   if (!studId) return;

//   const loadAll = async () => {
//     try {
//       const [headerRes, classRes, casteRes, studentRes] =
//         await Promise.all([
//           getHeaderDetail(instId, sesId),
//           getclass(instId),
//           getcaste(),
//           // getStudentDetails(instId, studId, sesId, classId),
//           getStudentDetails(instId, studId, sesId, ),
//         ]);

//       if (headerRes?.Table1?.length) {
//         setHeader(headerRes.Table1[0]);
//       }

//       if (studentRes?.Table?.length) {
//         setStudent(studentRes.Table[0]); // ✅ REAL STUDENT DATA
//       }

//       if (classRes?.Table1) setClassList(classRes.Table1);
//       if (casteRes?.Table1) setCasteList(casteRes.Table1);

//     } catch (err) {
//       console.error("Student Print API error:", err);
//     }
//   };

//   loadAll();
// }, [studId, instId, sesId]);


//   const getClassName = (id) =>
//     classList.find((c) => Number(c.Id) === Number(id))?.ClassName || "";

//   const getCasteName = (id) =>
//     casteList.find((c) => Number(c.Id) === Number(id))?.Name || "";

//   if (!header) return <p>Loading PDF...</p>;

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>

//         {/* ================= PAGE 1 : ADMISSION FORM ================= */}
//         <Page size="A4" style={styles.page}>
//           <View style={styles.outerBox}>

//             {/* HEADER */}
//             <View style={styles.headerRow}>
//               <Image src="/Logo.png" style={styles.logo} />
//               {/* <View style={styles.headerCenter}>
//                 <Text style={styles.schoolName}>SYSTRANS PUBLIC SCHOOL</Text>
//                 <Text style={styles.subText}>Contact No : 8504035000</Text>
//                 <Text style={styles.subText}>Jodhpur, Rajasthan, India</Text>
//               </View> */}
//               <View style={styles.headerCenter}>
//                               <Text style={styles.schoolName}>{header.HeaderInfo}</Text>
//                               <Text style={styles.subText}>Contact No : {header.MobileNo}</Text>
//                               <Text style={styles.subText}>{header.Address}</Text>
//                             </View>
//                           </View>
//             </View>
//               <Text style={styles.AffNo}>AFF.No.: {header.RegNo}</Text>

//             {/* GREEN BAR */}
//             <View style={styles.greenBar}>
//               <Text style={styles.greenText}>ADMISSION FORM</Text>
//             </View>

//             {/* PHOTO + OFFICE USE */}
//             <View style={{ flexDirection: "row", marginBottom: 8 }}>
//               <Image src="/default-photo.jpg" style={styles.photo} />

//               <View style={styles.officeBox}>
//                 <Text style={{ fontWeight: "bold", textAlign: "center" }}>
//                   OFFICE USE
//                 </Text>
//                 <Text>Class : {getClassName(student.F_ClassMaster)}</Text>
//                 <Text>Scholar Number : 1173</Text>
//                 <Text>Date of Admission : {formatDate(student.AdmissionDate)}</Text>
//                 <Text style={{ marginTop: 20 }}>Signature</Text>
//               </View>
//             </View>

//             {/* FORM FIELDS */}
//             <View style={styles.row}>
//               <Text style={styles.label}>Class</Text>
//               <Text style={styles.value}>{getClassName(student.F_ClassMaster)}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Student's Name</Text>
//               <Text style={styles.value}> {student.Name}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Father's Name</Text>
//               <Text style={styles.value}> {student.FatherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Mother's Name</Text>
//               <Text style={styles.value}> {student.MotherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Date Of Birth</Text>
//               <Text style={styles.value}>{formatDate(student.DOB)}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Aadhar Card No</Text>
//               <Text style={styles.value}>{student.STIdCardNo}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Category</Text>
//               <Text style={[styles.valueHalf, { marginRight: 20 }]}>{getCasteName(student.F_CastMaster)}</Text>
//               <Text style={[styles.label, { width: "14.5%", }]}>Caste</Text>
//               <Text style={styles.valueHalf}> {student.Caste}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Guardian</Text>
//               <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.GaurdianName}</Text>
//               <Text style={[styles.label, { width: "14.5%",  }]}>Relation</Text>
//               <Text style={styles.valueHalf}>{student.Grelation}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Father's Occupation</Text>
//               <Text style={styles.value}>{student.Foccupation}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Mother's Occupation</Text>
//               <Text style={styles.value}>{student.Moccupation}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Address</Text>
//               <Text style={styles.value}>
//                 {student.Address1}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Permanent Address</Text>
//               <Text style={styles.value}>
//                 {student.Address2}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Previous School</Text>
//               <Text style={styles.value}>{student.LastSchool}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Father's (Mob)</Text>
//               <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.FMobileNo}</Text>
//               <Text style={[styles.label, { width: "14.5%" }]}>Mother's (Mob)</Text>
//               <Text style={styles.valueHalf}>{student.MMobileNo}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>T.C. No.</Text>
//               <Text style={styles.value}>{student.TcNo}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>T.C. Date</Text>
//               <Text style={styles.value}>{student.TcDate}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Last Class</Text>
//               <Text style={[styles.valueHalf, { marginRight: 20 }]}>{student.F_LastClass}</Text>
//               <Text style={[styles.label, ]}>Third Language (Sanskrit)</Text>
//             </View>

//             {/* OPTIONAL SUBJECTS */}
//             <Text style={styles.sectionTitle}>Optional Subject's Name</Text>

//             <View style={{ flexDirection: "row", marginTop: 4 }}>
//               <View style={styles.subjectCol}>
//                 <Text style={[styles.value, {marginTop: 5}]}>1.</Text>
//                 <Text style={{marginVertical: 5}}>(Arts)</Text>
//                 <Text style={styles.subjectRow}>1. History</Text>
//                 <Text style={styles.subjectRow}>2. Political Science</Text>
//                 <Text style={styles.subjectRow}>3. Sanskrit Literature</Text>
//                 <Text style={styles.subjectRow}>4. Hindi Literature</Text>
//                 <Text style={styles.subjectRow}>5. Geography</Text>
//               </View>

//               <View style={styles.subjectCol}>
//                 <Text style={[styles.value, {marginTop: 5}]}>2.</Text>
//                 <Text style={{marginVertical: 5}}>(Commerce)</Text>
//                 <Text style={styles.subjectRow}>1. Accountancy</Text>
//                 <Text style={styles.subjectRow}>2. Business Management</Text>
//                 <Text style={styles.subjectRow}>3. Banking</Text>
//                 <Text style={styles.subjectRow}>4. Hindi and English Type</Text>
//                 <Text style={styles.subjectRow}>5. Computer Science</Text>
//               </View>

//               <View style={styles.subjectCol}>
//                 <Text style={[styles.value, {marginTop: 5}]}>3.</Text>
//                 <Text style={{marginVertical: 5}}>(Science)</Text>
//                 <Text style={styles.subjectRow}>1. Physics</Text>
//                 <Text style={styles.subjectRow}>2. Chemistry</Text>
//                 <Text style={styles.subjectRow}>3. Biology</Text>
//                 <Text style={styles.subjectRow}>4. Maths</Text>
//               </View>
//             </View>

//             <Text style={styles.sectionTitle}>If Student get admission again in this school.then provide class and year when any left_ _ _ _ _ _</Text>
//             <Text style={[styles.value, {width: "100%", marginTop: "15"}]}></Text>

//             <View style={styles.signatureRow}>
//               <Text style={styles.label}>Student Signature</Text>
//               <Text style={styles.label}>Parent Signature</Text>
//             </View>

//           </View>
//         </Page>

//         {/* ================= PAGE 2 : DECLARATION ================= */}
//         <Page size="A4" style={styles.page}>
//           <View style={styles.outerBox}>
//             <Text style={{ color: "green", fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
//               DECLARATION
//             </Text>

//             <Text style={styles.declarationText}>
//               I certify that the above mentioned details shall bear the 
//               full responsibility of the correct and the following
//             </Text>

//             <Text style={styles.declarationText}>
//               1. I certify that the name of the student / student is {student.Name}.
//             </Text>
//             <Text style={styles.declarationText}>
//               2. I certify that the full details filled in the admission 
//               application form are absolutely correct
//             </Text>
//             <Text style={styles.declarationText}>
//               3. The student date of birth in the application form is correct 
//               and will not make any changes to it.
//             </Text>
//             <Text style={styles.declarationText}>
//               4. The student / school will follow all the rules of the school.
//             </Text>
//             <Text style={styles.declarationText}>
//               5. Students will be regularly visiting the school at the time. 
//               If he / she will be on leave then send a leave.
//             </Text>
//             <Text style={styles.declarationText}>
//               Application before time, otherwise the Principal will have 
//               the right to separate his name.
//             </Text>
//             <Text style={styles.declarationText}>
//               6. Students will participate in all activities in the school. 
//               Such as sports, cultural events, scouting, guiding, S.U.P.W. Camp etc.
//             </Text>
//             <Text style={styles.declarationText}>
//               7. Students will come to the Vidyalaya's regular dress every 
//               day in school. In this absence, the name of the student is 
//               separated from the school. Can go.
//             </Text>
//             <Text style={styles.declarationText}>
//               8. Whenever school call me either me or my reprentative will 
//               be here.Even my self will take progress report about student time to time.
//             </Text>
//             <Text style={styles.declarationText}>
//               9. The student fee will be deposited in the school on time 
//               according to the rules. In case of non-deposit, the name of 
//               the student is separated from the school. The Principal will 
//               be able to go and the full authority to reproduce or not.
//             </Text>
//             <Text style={styles.declarationText}>
//               10. As per education department rules and regulations, if 
//               student's attendance is less, he or she will be not apper 
//               in school exam.
//             </Text>
//             <Text style={styles.declarationText}>
//               Examination of the following subjects of the students / 
//               students for admission to the class.
//             </Text>

//             <Text style={{width: "100%", marginTop: "5", borderBottom: "1 solid black",}}></Text>

//             <View style={{ marginTop: 20, textAlign: "right" }}>
//               <Text style={{color: "green", fontWeight: "bold",}}>Parent's Signature</Text>
//             </View>

//             <Text style={{ marginVertical: 30, color: "green", fontWeight: "bold" }}>
//               Attachment Required
//             </Text>
//             <View style={[styles.row, {width: "96%", justifyContent: "space-between", alignItems: "center"}]}>
//             <Text>T.C (Original)</Text>
//             <Text>Mark Sheet (Photocopy)</Text>
//             <Text>Aadhar (Photocopy)</Text>
//             </View>
//             <Text style={{width: "97%", marginTop: "5", borderBottom: "1 solid black",}}></Text>

//             <View style={{ marginTop: 40 }}>
//               {/* <Text style={{ width: "15%", padding: 5,  border: "1 solid black", fontWeight: "bold", textAlign: "center" }}>
//                 Office Order
//               </Text> */}

//               <Text
//   style={{
//     width: "15%",
//     padding: 5,
//     border: "1 solid black",
//     fontWeight: "bold",
//     textAlign: "center",
//     marginHorizontal: "auto",
//   }}
// >
//   Office Order
// </Text>
//               <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
//                 Based on entrance test / Previous class marksheet / TC,
//                 Student is eligible to enter in Class Nur
//               </Text>
//             </View>

//             <View style={{ marginTop: 40, textAlign: "right" }}>
//               <Text style={{color: "green", fontWeight: "bold",}}>Principal Signature</Text>
//             </View>
//           </View>
//         </Page>

//       </Document>
//     </PDFViewer>
//   );
// }
