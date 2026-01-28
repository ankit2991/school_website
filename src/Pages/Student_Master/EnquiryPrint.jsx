// import React from "react";
// import { useLocation } from "react-router-dom";
// import {Page, Text, View, Document, StyleSheet, PDFViewer, } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 20 },
//   header: { textAlign: "center", marginBottom: 15 },
//   title: { fontSize: 16, fontWeight: "bold" },
//   row: { flexDirection: "row", marginBottom: 6 },
//   label: { width: "40%", fontSize: 10, fontWeight: "bold" },
//   value: { width: "60%", fontSize: 10 },
// });

// function EnquiryPrint() {
//   const { state } = useLocation();

//   if (!state) return <p>No data found</p>;

//   const { student, instituteName, sessionName } = state;

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>
//         <Page size="A4" style={styles.page}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>{instituteName}</Text>
//             <Text>REGISTRATION FORM - {sessionName}</Text>
//           </View>

//           {/* Content */}
//           <View style={styles.row}>
//             <Text style={styles.label}>Student Name:</Text>
//             <Text style={styles.value}>{student.name}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Class:</Text>
//             <Text style={styles.value}>{student.className}</Text>
//           </View>

//           <View style={styles.row}>
//             <Text style={styles.label}>Enquiry No:</Text>
//             <Text style={styles.value}>{student.enquiryNo}</Text>
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// }

// export default EnquiryPrint;








import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { getcaste, getclass, getEnquiryDetail, getHeaderDetail } from "../../services/api";

/* ---------- DATE FORMATTER ---------- */
const formatDate = (dotNetDate) => {
  if (!dotNetDate) return "";
  const ts = Number(dotNetDate.match(/\d+/)[0]);
  return new Date(ts).toLocaleDateString("en-GB");
};

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 9 },
  innerPage: { border: "1.2 solid black", padding: 12, height: "100%" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingTop: 6,
  },
  logo: { width: 70, height: 70 },
  headerCenter: { flex: 1, textAlign: "center" },
  schoolName: { fontSize: 22, fontWeight: "bold" },
  subText: { fontSize: 11, marginVertical: 4, fontWeight: "semibold" },
  regNo: { fontSize: 10, fontWeight: "bold", textAlign: "right", marginBottom: 6 },

  greenBar: {
    backgroundColor: "#1f8f12",
    paddingVertical: 6,
    marginTop: 6,
    marginBottom: 8,
    border: "1.2 solid black",
  },
  greenBarText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },

  row: { flexDirection: "row", marginBottom: 18, alignItems: "center" },
  label: { width: "20%", fontWeight: "bold", color: "green" },
  value: {
    width: "25%",
    borderBottom: "1 dotted black",
    paddingBottom: 3,
    marginTop: 2,
  },
  fullRowLabel: { width: "20%", fontWeight: "bold", color: "green" },
  fullRowValue: {
    width: "80%",
    borderBottom: "1 dotted black",
    paddingBottom: 3,
    marginTop: 2,
  },

  table: { marginTop: 14, borderTop: "1 solid black", borderLeft: "1 solid black", borderRight: "1 solid black" },
  tableRow: { flexDirection: "row" },
  cell: {
    flex: 1,
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
    padding: 6,
    textAlign: "center",
  },
  lastCell: {
    flex: 1,
    borderBottom: "1 solid black",
    padding: 6,
    textAlign: "center",
  },

  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 70,
    paddingHorizontal: 20,
  },

  officeBox: {
    marginTop: 18,
    width: "45%",
    border: "1 solid black",
    padding: 6,
  },
});

function EnquiryPrint() {
const { state } = useLocation();
  if (!state?.eqId) return <p>No data found</p>;

  const { eqId, sessionName } = state;
  const instId = localStorage.getItem("InstituteID");
  const sesId = localStorage.getItem("SessionID");

  const [student, setStudent] = useState(null);
  const [header, setHeader] = useState(null);
  const [classList, setClassList] = useState([]); 
  const [casteList, setCasteList] = useState([]);


  /* ---------- LOAD DATA ---------- */
//   useEffect(() => {
//     const loadAll = async () => {
//       const [enqRes, headerRes] = await Promise.all([
//         getEnquiryDetail(eqId),
//         getHeaderDetail(instId, sesId),
//       ]);

//       if (enqRes?.Table?.[0]?.ResultCode === "R100") {
//         setStudent(enqRes.Table1[0]);
//       }

//       if (headerRes?.Table?.[0]?.ResultCode === "R100") {
//         setHeader(headerRes.Table1[0]);
//       }
//     };

//     loadAll();
//   }, [eqId, instId, sesId]);

useEffect(() => {
  const loadAll = async () => {
    const [
      enqRes,
      headerRes,
      classRes,
      casteRes
    ] = await Promise.all([
      getEnquiryDetail(eqId),
      getHeaderDetail(instId, sesId),
      getclass(instId),
      getcaste(),
    ]);

    if (enqRes?.Table?.[0]?.ResultCode === "R100") {
      setStudent(enqRes.Table1[0]);
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
  };

  loadAll();
}, [eqId, instId, sesId]);

const getClassName = (id) => {
  return classList.find(c => Number(c.Id) === Number(id))?.ClassName || "";
};

const getCasteName = (id) => {
  return casteList.find(c => Number(c.Id) === Number(id))?.Name || "";
};



  if (!student || !header) return <p>Loading PDF...</p>;

  return (
    <PDFViewer width="100%" height="1000px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.innerPage}>
            {/* HEADER */}
            {/* <View style={styles.headerRow}>
              <Image src="/Logo.png" style={styles.logo} />
              <View style={styles.headerCenter}>
                <Text style={styles.schoolName}>{instituteName}</Text>
                <Text style={styles.subText}>Contact No : 8504035000</Text>
                <Text style={styles.subText}>Jodhpur, Rajasthan, India</Text>
              </View>
            </View>

            <Text style={[styles.regNo, { fontWeight: "bold" }]}>
              Registration No: PRY/UPS/14-15/46
            </Text>

            <View style={styles.greenBar}>
              <Text style={styles.greenBarText}>
                REGISTRATION FORM - {sessionName}
              </Text>
            </View> */}

            {/* HEADER */}
            <View style={styles.headerRow}>
              {/* <Image src={header.LogoName} style={styles.logo} /> */}
              <Image src="/Logo.png" style={styles.logo} />
              <View style={styles.headerCenter}>
                <Text style={styles.schoolName}>{header.HeaderInfo}</Text>
                <Text style={styles.subText}>Contact No : {header.MobileNo}</Text>
                <Text style={styles.subText}>{header.Address}</Text>
              </View>
            </View>

            <Text style={styles.regNo}>
              Registration No: {header.RegNo}
            </Text>

            {/* GREEN BAR */}
            <View style={styles.greenBar}>
              <Text style={styles.greenBarText}>
                REGISTRATION FORM - {sessionName}
              </Text>
            </View>

            <View style={{ borderTop: "1 solid black", marginBottom: 15, marginHorizontal:5 }} />

            {/* FORM */}
            <View style={styles.row}>
              <Text style={styles.label}>Form No:</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {student.EnquireNo}
              </Text>
              {/* <Text style={styles.label}>Class:</Text>
              <Text style={[styles.value, { width: "31.5%" }]}>
                {student.F_ClassMaster}
              </Text> */}

              <Text style={styles.label}>Class:</Text>
<Text style={[styles.value, { width: "31.5%" }]}>
  {getClassName(student.F_ClassMaster)}
</Text>

            </View>

            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Student’s Name:</Text>
              <Text style={styles.fullRowValue}>{student.Name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Father’s Name:</Text>
              <Text style={styles.fullRowValue}>{student.FatherName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Mother’s Name:</Text>
              <Text style={styles.fullRowValue}>{student.MotherName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date Of Birth:</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {formatDate(student.DOB)}
              </Text>
              {/* <Text style={styles.label}>Category</Text>
              <Text style={[styles.value, { width: "31.5%" }]}>
                {student.F_CastMaster}
              </Text> */}
              <Text style={styles.label}>Category:</Text>
<Text style={[styles.value, { width: "31.5%" }]}>
  {getCasteName(student.F_CastMaster)}
</Text>

            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Guardian:</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {student.GaurdianName}
              </Text>
              <Text style={styles.label}>Relation:</Text>
              <Text style={[styles.value, { width: "31.5%" }]}>
                {student.Grelation}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Father’s (Mob):</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {student.FMobileNo}
              </Text>
              <Text style={styles.label}>Mother’s (Mob):</Text>
              <Text style={[styles.value, { width: "31.5%" }]}>
                {student.MMobileNo}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Father’s Occupation:</Text>
              <Text style={[styles.value, { marginRight: 20 }]}>
                {student.Foccupation}
              </Text>
              <Text style={styles.label}>Mother’s Occupation:</Text>
              <Text style={[styles.value, { width: "31.5%" }]}>
                {student.Moccupation}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Address:</Text>
              <Text style={styles.fullRowValue}>
                {/* {student.Address1}, {student.Address2} */}
                {student.Address1}
              </Text>
            </View>
            
            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Permanent Address:</Text>
              <Text style={styles.fullRowValue}>
                {/* {student.Address1}, {student.Address2} */}
                {student.Address2}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.fullRowLabel}>Previous School:</Text>
              <Text style={styles.fullRowValue}>{student.LastSchool}</Text>
            </View>

            <View style={styles.row}>
              {/* <Text style={styles.label}>Last Class</Text>
              <Text style={[styles.value, { width: "18%", marginRight: 15 }]}>
                {student.F_LastClass}
              </Text> */}
              <Text style={styles.label}>Last Class:</Text>
<Text style={[styles.value, { width: "18%", marginRight: 15 }]}>
  {getClassName(student.F_LastClass)}
</Text>

              <Text style={styles.label}>Marks Obtain:</Text> 
              <Text style={[{ width: "14.8%", borderBottom: "1 solid black", marginLeft: -35, marginRight: 15, paddingBottom: 2, }]}>{student.motherMobile}</Text> 
              <Text style={styles.label}>Percentage:</Text>
              <Text style={[{ width: "14.8%", borderBottom: "1 solid black", marginLeft: -35,  paddingBottom: 2, }]}>
                {student.SPercentage}
              </Text>
            </View>

            {/* TABLE */} 
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <Text style={styles.cell}>TEST</Text> 
                    <Text style={styles.cell}>Hindi</Text> 
                    <Text style={styles.cell}>English</Text> 
                    <Text style={styles.cell}>Maths</Text> 
                    <Text style={styles.lastCell}>Science</Text> 
                </View> 
                
                <View style={styles.tableRow}> 
                    <Text style={styles.cell}>Marks</Text> 
                    <Text style={styles.cell}></Text> 
                    <Text style={styles.cell}></Text> 
                    <Text style={styles.cell}></Text> 
                    <Text style={styles.lastCell}></Text> 
                </View> 

            </View>

            {/* SIGNATURE */}
            <View style={styles.signatureRow}>
              <Text style={styles.fullRowLabel}>Parent Signature</Text>
              <Text style={styles.fullRowLabel}>Principal Signature</Text>
            </View>

            {/* OFFICE USE */}
            <View style={styles.officeBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
                OFFICE Use
              </Text>
              <View style={styles.row}>
                <Text style={{ width: "50%", fontWeight: "bold" }}>
                  Fee Deposited On
                </Text>
                <Text style={styles.fullRowValue}></Text>
              </View>
              <View style={styles.row}>
                <Text style={{ width: "50%", fontWeight: "bold" }}>
                  S.R. No.
                </Text>
                <Text style={styles.fullRowValue}></Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default EnquiryPrint;





// import React from "react";
// import { useLocation } from "react-router-dom";
// import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   /* PAGE */
//   page: {
//     padding: 20, // outside white margin (important)
//     fontSize: 9,
//   },

//   innerPage: {
//     border: "1.2 solid black",
//     padding: 12,
//     height: "100%",
//   },

//   /* HEADER */
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//     paddingTop: 6,
//   },
//   logo: {
//     width: 70,
//     height: 70,
//   },
//   headerCenter: {
//     flex: 1,
//     textAlign: "center",
//   },
//   schoolName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   subText: {
//     fontSize: 9,
//     marginTop: 2,
//   },
//   regNo: {
//     fontSize: 8,
//     textAlign: "right",
//     marginBottom: 6,
//   },

//   /* GREEN BAR */
//   greenBar: {
//     backgroundColor: "#1f8f12",
//     paddingVertical: 6,
//     marginTop: 6,
//     marginBottom: 8,
//     border: "1.2 solid black",
//   },
//   greenBarText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 10,
//   },

//   /* FORM ROWS */
//   row: {
//     flexDirection: "row",
//     marginBottom: 18,
//     alignItems: "center",
//   },
//   label: {
//     width: "20%",
//     fontWeight: "bold",
//     color: "green",
//   },
//   value: {
//     width: "25%",
//     borderBottom: "1 dotted black",
//     paddingBottom: 3,
//     marginTop: 2,
//   },

//   fullRowLabel: {
//     width: "20%",
//     fontWeight: "bold",
//     color: "green",
//   },
//   fullRowValue: {
//     width: "80%",
//     borderBottom: "1 dotted black",
//     paddingBottom: 3,
//     marginTop: 2,
//   },

//   /* TABLE */
//   table: {
//     marginTop: 14,
//     border: "1 solid black",
//   },
//   tableRow: {
//     flexDirection: "row",
//   },
//   cell: {
//     flex: 1,
//     borderRight: "1 solid black",
//     borderBottom: "1 solid black",
//     padding: 6,
//     textAlign: "center",
//   },
//   lastCell: {
//     flex: 1,
//     borderBottom: "1 solid black",
//     padding: 6,
//     textAlign: "center",
//   },

//   /* SIGNATURE */
//   signatureRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 70,
//     paddingHorizontal: 20,
//   },

//   /* OFFICE USE */
//   officeBox: {
//     marginTop: 18,
//     width: "45%",
//     border: "1 solid black",
//     padding: 6,
//   },
// });

// function EnquiryPrint() {
//   const { state } = useLocation();
//   if (!state) return <p>No data found</p>;

//   const { student, instituteName, sessionName } = state;

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.innerPage}>
//             {/* HEADER */}
//             <View style={styles.headerRow}>
//               <Image src="/Logo.png" style={styles.logo} />
//               <View style={styles.headerCenter}>
//                 <Text style={styles.schoolName}>{instituteName}</Text>
//                 <Text style={styles.subText}>Contact No : 8504035000</Text>
//                 <Text style={styles.subText}>Jodhpur, Rajasthan, India</Text>
//               </View>
//             </View>

//             <Text style={[styles.regNo, { fontWeight: "bold" }]}>
//               Registration No: PRY/UPS/14-15/46
//             </Text>

//             {/* GREEN BAR */}
//             <View style={styles.greenBar}>
//               <Text style={styles.greenBarText}>
//                 REGISTRATION FORM - {sessionName}
//               </Text>
//             </View>

//             <View style={{border: "1 solid black", marginBottom: 15, marginHorizontal: 5, }}></View>

//             {/* FORM DATA */}
//             <View style={styles.row}>
//               <Text style={styles.label}>Form No:</Text>
//               <Text style={[styles.value, { marginRight: 20 }]}>
//                 {student.formNo}
//               </Text>
//               <Text style={styles.label}>Class:</Text>
//               <Text style={[styles.value, { width: "31.5%" }]}>
//                 {student.className}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Student’s Name</Text>
//               <Text style={styles.fullRowValue}>{student.name}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Father’s Name</Text>
//               <Text style={styles.fullRowValue}>{student.fatherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Mother’s Name</Text>
//               <Text style={styles.fullRowValue}>{student.motherName}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Date Of Birth</Text>
//               <Text style={[styles.value, { marginRight: 20 }]}>
//                 {student.dob}
//               </Text>
//               <Text style={styles.label}>Category</Text>
//               <Text style={[styles.value, { width: "31.5%" }]}>
//                 {student.category}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Guardian</Text>
//               <Text style={[styles.value, { marginRight: 20 }]}>
//                 {student.guardian}
//               </Text>
//               <Text style={styles.label}>Relation</Text>
//               <Text style={[styles.value, { width: "31.5%" }]}>
//                 {student.relation}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.label}>Father’s (Mob)</Text>
//               <Text style={[styles.value, { marginRight: 20 }]}>
//                 {student.fatherMobile}
//               </Text>
//               <Text style={styles.label}>Mother’s (Mob)</Text>
//               <Text style={[styles.value, { width: "31.5%" }]}>
//                 {student.motherMobile}
//               </Text>
//             </View>

//             <View style={styles.row}> 
//                 <Text style={styles.label}>Father’s Occupation</Text> 
//                 <Text style={[styles.value, { marginRight: 20 }]}>{student.fatherMobile}</Text> 
//                 <Text style={styles.label}>Mother’s Occupation</Text> 
//                 <Text style={[styles.value, { width: "31.5%"}]}>{student.motherMobile}</Text> 
//             </View> 
            
//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Address</Text>
//               <Text style={styles.fullRowValue}>{student.address}</Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Permanent Address</Text>
//               <Text style={styles.fullRowValue}>
//                 {student.permanentAddress}
//               </Text>
//             </View>

//             <View style={styles.row}>
//               <Text style={styles.fullRowLabel}>Previous School</Text>
//               <Text style={styles.fullRowValue}>
//                 {student.previousSchool}
//               </Text>
//             </View>

//             <View style={styles.row}> 
//                 <Text style={styles.label}>Last Class</Text> 
//                 <Text style={[styles.value, { width: "18%", marginRight: 15 }]}>{student.fatherMobile}</Text> 
//                 <Text style={styles.label}>Marks Obtain</Text> 
//                 <Text style={[{ width: "14.6%", borderBottom: "1 solid black", marginLeft: -35, marginRight: 15, paddingBottom: 2, }]}>{student.motherMobile}</Text> 
//                 <Text style={styles.label}>Percentage</Text> 
//                 <Text style={[{ width: "14.6%", borderBottom: "1 solid black", marginLeft: -35, paddingBottom: 2, }]}>{student.motherMobile}</Text> 
//             </View> 
            
//             {/* TABLE */}
//             <View style={styles.table}>
//               <View style={styles.tableRow}>
//                 <Text style={styles.cell}>TEST</Text>
//                 <Text style={styles.cell}>Hindi</Text>
//                 <Text style={styles.cell}>English</Text>
//                 <Text style={styles.cell}>Maths</Text>
//                 <Text style={styles.lastCell}>Science</Text>
//               </View>
//               <View style={styles.tableRow}>
//                 <Text style={styles.cell}>Marks</Text>
//                 <Text style={styles.cell}></Text>
//                 <Text style={styles.cell}></Text>
//                 <Text style={styles.cell}></Text>
//                 <Text style={styles.lastCell}></Text>
//               </View>
//             </View>

//             {/* SIGNATURE */}
//             <View style={styles.signatureRow}>
//               <Text style={styles.fullRowLabel}>Parent Signature</Text>
//               <Text style={styles.fullRowLabel}>Principal Signature</Text>
//             </View>

//             {/* OFFICE USE */}
//             <View style={styles.officeBox}>
//               <Text style={{ fontWeight: "bold",  marginBottom: 15, }}>OFFICE Use</Text>
//               <View style={styles.row}>
//                 <Text style={{ width: "50%", fontWeight: "bold" }}>
//                   Fee Deposited On
//                 </Text>
//                 <Text style={styles.fullRowValue}></Text>
//               </View>
//               <View style={styles.row}>
//                 <Text style={{ width: "50%", fontWeight: "bold" }}>
//                   S.R. No.
//                 </Text>
//                 <Text style={styles.fullRowValue}></Text>
//               </View>
//             </View>
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// }

// export default EnquiryPrint;

