// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 20 },
//   header: { textAlign: "center", marginBottom: 15 },
//   title: { fontSize: 16, fontWeight: "bold" },
//   row: { flexDirection: "row", marginBottom: 6 },
//   label: { width: "40%", fontSize: 10, fontWeight: "bold" },
//   value: { width: "60%", fontSize: 10 },
// });

// function EnquiryPDF({ data }) {
//   const { student, instituteName, sessionName } = data;

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>

//         <View style={styles.header}>
//           <Text style={styles.title}>{instituteName}</Text>
//           <Text>REGISTRATION FORM - {sessionName}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Student Name:</Text>
//           <Text style={styles.value}>{student.name}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Class:</Text>
//           <Text style={styles.value}>{student.className}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Enquiry No:</Text>
//           <Text style={styles.value}>{student.enquiryNo}</Text>
//         </View>

//       </Page>
//     </Document>
//   );
// }


// export default EnquiryPDF;
