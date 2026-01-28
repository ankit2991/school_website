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
import { getHeaderDetail, getReceipt } from "../../../services/api";

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  page: { padding: 10, fontSize: 9 },

  rowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  receiptBox: {
    width: "48%",
    padding: 6,
    border: "1 solid black",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  logo: { width: 40, height: 40 },

  center: { flex: 1, textAlign: "center" },

  schoolName: { fontSize: 12, fontWeight: "bold" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },

  infoBlock: {
    flexDirection: "row",
    width: "48%",
  },

  infoLabel: {
    width: "55%",
    fontSize: 8,
    fontWeight: "bold",
  },

  infoValue: {
    width: "45%",
    fontSize: 8,
  },

  bold: { fontSize: 8, fontWeight: "bold" },

  table: { border: "1 solid black", marginTop: 6 },

  tableRow: { flexDirection: "row" },

  cell: {
    borderRight: "1 solid black",
    borderBottom: "1 solid black",
    padding: 4,
  },

  cellLast: {
    borderBottom: "1 solid black",
    padding: 4,
  },

  colFee: { width: "30%" },
  colDesc: { width: "40%" },
  colAmt: { width: "30%", textAlign: "right" },

  lowerRow: { flexDirection: "row" },

  remarksBox: {
    width: "50%",
    padding: 4,
    borderRight: "1 solid black",
  },

  totalsBox: { width: "50%", padding: 4 },

  remarksLine: {
    borderBottom: "1 dotted black",
    marginVertical: 6,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },

  netRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
});

/* ---------------- COMPONENT ---------------- */
export default function Fee_Receipt_Print() {
  const { state } = useLocation();
  const receipts = state?.receipts || [];

  const [headerData, setHeaderData] = useState(null);
  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    if (!receipts.length) return;

    const instId = localStorage.getItem("InstituteID");
    const sessionId = localStorage.getItem("SessionID");
    const rcNo = receipts[0].id; // ✅ selected row ID

    async function fetchData() {
      try {
        const headerRes = await getHeaderDetail(instId, sessionId);
        if (headerRes?.Table1?.length) {
          setHeaderData(headerRes.Table1[0]);
        }

        const receiptRes = await getReceipt(instId, rcNo, 11);
        if (receiptRes?.Table?.length) {
          setReceiptData(receiptRes.Table); // ✅ KEEP ALL ROWS
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    }

    fetchData();
  }, [receipts]);

  if (!headerData || receiptData.length === 0) {
    return <p>Loading receipt...</p>;
  }

  const r = receiptData[0]; // header + totals

  const Receipt = () => (
    <>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Image src="/Logo.png" style={styles.logo} />
        <View style={styles.center}>
          <Text style={styles.schoolName}>{headerData.HeaderInfo}</Text>
          <Text>{headerData.Address}</Text>
          <Text>{headerData.MobileNo}</Text>
        </View>
      </View>

      <Text style={{ fontSize: "8", textAlign: "right", marginBottom: "7" }}>Registration No.: {r.EnrollmentNo}</Text>

      {/* INFO */}
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Receipt No:</Text>
          <Text style={styles.infoValue}>{r.RecieptNo}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>{r.Date}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Student Name:</Text>
          <Text style={styles.infoValue}>{r.StudentName}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Class:</Text>
          <Text style={styles.infoValue}>{r.Class}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Father Name:</Text>
          <Text style={styles.infoValue}>{r.FatherName}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoLabel}>Enrollment No:</Text>
          <Text style={styles.infoValue}>{r.EnrollmentNo}</Text>
        </View>
      </View>

      {/* TABLE */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.colFee, styles.bold]}>FeeType</Text>
          <Text style={[styles.cell, styles.colDesc, styles.bold]}>
            Description
          </Text>
          <Text style={[styles.cellLast, styles.colAmt, styles.bold]}>
            Amount
          </Text>
        </View>

        {receiptData.map((f, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={[styles.cell, styles.colFee]}>{f.FeeType}</Text>
            <Text style={[styles.cell, styles.colDesc]}>
              {f.Description || f.Month}
            </Text>
            <Text style={[styles.cellLast, styles.colAmt]}>
              {Number(f.Amount).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.lowerRow}>
          <View style={styles.remarksBox}>
            <Text style={[styles.bold, {marginBottom: "4"}]}>Remarks (If Any)</Text>
            <View style={styles.remarksLine} />
            <View style={styles.remarksLine} />
            <Text style={[styles.bold, { marginTop: 10 }]}>
              Authorised Signatory
            </Text>
          </View>

          <View style={styles.totalsBox}>
            <View style={styles.amountRow}>
              <Text style={styles.bold}>Total Amount :-</Text>
              <Text>{Number(r.TotalAmount).toFixed(2)}</Text>
            </View>
            <View style={[styles.amountRow, { marginTop: 3 }]}>
              <Text style={styles.bold}>Add :-</Text>
              <Text>{Number(r.FineAmount).toFixed(2)}</Text>
            </View>
            <View style={[styles.amountRow, { marginTop: 3 }]}>
              <Text style={styles.bold}>Less :-</Text>
              <Text>{Number(r.DiscountAmount).toFixed(2)}</Text>
            </View>
            <View style={[styles.netRow, { marginTop: 3 }]}>
              <Text style={styles.bold}>Net Amount :-</Text>
              <Text style={[styles.bold, { fontSize: "9" }]}>
                {Number(r.NetAmount).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <PDFViewer width="100%" height="1000px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.rowWrap}>
            <View style={styles.receiptBox}>
              <Receipt />
            </View>
            <View style={styles.receiptBox}>
              <Receipt />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}




// import React from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image,
// } from "@react-pdf/renderer";

// /* ---------------- STYLES ---------------- */
// const styles = StyleSheet.create({
//   page: {
//     padding: 10,
//     fontSize: 9,
//   },

//   /* ROW THAT HOLDS BOTH RECEIPTS */
//   rowWrap: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },

//   /* EACH RECEIPT (SEPARATE BORDER) */
//   receiptBox: {
//     width: "48%",            // ✅ space between receipts
//     padding: 6,
//     border: "1 solid black",
//   },

//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 6,
//   },

//   logo: {
//     width: 40,
//     height: 40,
//   },

//   center: {
//     flex: 1,
//     textAlign: "center",
//   },

//   schoolName: {
//     fontSize: 12,
//     fontWeight: "bold",
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 2,
//   },

//   bold: {
//     fontWeight: "bold",
//   },

//   /* TABLE */
//   table: {
//     border: "1 solid black",
//     marginTop: 6,
//   },

//   tableRow: {
//     flexDirection: "row",
//   },

//   cell: {
//     borderRight: "1 solid black",
//     borderBottom: "1 solid black",
//     padding: 4,
//   },

//   cellLast: {
//     borderBottom: "1 solid black",
//     padding: 4,
//   },

//   colFee: { width: "30%" },
//   colDesc: { width: "40%" },
//   colAmt: { width: "30%", textAlign: "right" },

//   /* LOWER SECTION */
//   lowerRow: {
//     flexDirection: "row",
//   },

//   remarksBox: {
//     width: "50%",
//     padding: 4,
//     borderRight: "1 solid black",    
//   },

//   totalsBox: {
//     width: "50%",
//     padding: 4,
//   },

//   dottedLine: {
//     borderBottom: "1 dotted black",
//     marginVertical: 6,
//   },
// });

// /* ---------------- COMPONENT ---------------- */
// export default function Fee_Receipt_Print() {
//   const { state } = useLocation();
//   const receipts = state?.receipts || [];
//   if (!receipts.length) return <p>No data</p>;

//   const r = receipts[0];

//   const Receipt = () => (
//     <>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <Image src="/Logo.png" style={styles.logo} />
//         <View style={styles.center}>
//           <Text style={styles.schoolName}>SYSTRANS PUBLIC SCHOOL</Text>
//           <Text>Jodhpur, Rajasthan, India</Text>
//           <Text>8504035000</Text>
//         </View>
//       </View>

//       <Text style={{textAlign: "right", }}>Registration No.: {r.rdate}</Text>

//       <View style={styles.row}>
//         <Text>Receipt No: {r.receipt}</Text>
//         <Text>Date: {r.rdate}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text>Student Name: {r.name}</Text>
//         <Text>Class: {r.class}</Text>
//       </View>

//       <View style={styles.row}>
//         <Text>Father Name: {r.fname}</Text>
//         <Text>Enrollment No: {r.serial}</Text>
//       </View>

//       {/* TABLE */}
//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <Text style={[styles.cell, styles.colFee, styles.bold]}>Fee Type</Text>
//           <Text style={[styles.cell, styles.colDesc, styles.bold]}>
//             Description
//           </Text>
//           <Text style={[styles.cellLast, styles.colAmt, styles.bold]}>
//             Amount
//           </Text>
//         </View>

//         <View style={styles.tableRow}>
//           <Text style={[styles.cell, styles.colFee]}>Tuition Fee</Text>
//           <Text style={[styles.cell, styles.colDesc]}>{r.nar}</Text>
//           <Text style={[styles.cellLast, styles.colAmt]}>{r.tot}</Text>
//         </View>

//         {/* LOWER SECTION */}
//         <View style={styles.lowerRow}>
//           <View style={styles.remarksBox}>
//             <Text style={styles.bold}>Remarks (If Any)</Text>
//             <View style={styles.dottedLine} />
//             <View style={styles.dottedLine} />
//             <Text style={styles.bold}>Authorised Signatory</Text>
//           </View>

//           <View style={styles.totalsBox}>
//             <View style={styles.row}>
//               <Text>Total Amount:</Text>
//               <Text>{r.tot}</Text>
//             </View>
//             <View style={styles.row}>
//               <Text>Add:</Text>
//               <Text>{r.dis}</Text>
//             </View>
//             <View style={styles.row}>
//               <Text>Less:</Text>
//               <Text>{r.dis}</Text>
//             </View>
//             <View style={styles.row}>
//               <Text style={styles.bold}>Net Amount:</Text>
//               <Text style={styles.bold}>{r.net}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </>
//   );

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.rowWrap}>
//             <View style={styles.receiptBox}>
//               <Receipt />
//             </View>

//             <View style={styles.receiptBox}>
//               <Receipt />
//             </View>
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// }
