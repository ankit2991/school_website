// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";
// import { getHeaderDetail } from "../../../services/api";

// /* ================= STYLES ================= */
// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 9,
//   },

//   title: {
//     fontSize: 12,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   subTitle: {
//     textAlign: "center",
//     marginBottom: 10,
//   },

//   /* OUTER TABLE BORDER (ONLY ONCE) */
//   table: {
//     borderTop: 1,
//     borderBottom: 1,
//     borderRight: 1,
//     borderColor: "#000",
//   },

//   row: {
//     flexDirection: "row",
//   },

//   /* HEADER CELLS */
//   headerCell: {
//     borderLeftWidth: 1,
//     padding: 4,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   /* NORMAL CELLS */
//   cell: {
//     borderLeftWidth: 1,
//     borderTopWidth: 1,
//     padding: 4,
//   },

//   right: {
//     textAlign: "right",
//   },

//   bold: {
//     fontWeight: "bold",
//   },
// });

// /* ===== SPLIT DATA INTO PAGES ===== */
// const chunkArray = (arr, size) =>
//   Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//     arr.slice(i * size, i * size + size)
//   );

// export default function Due_Fee_Summary_Print() {
//   const { state } = useLocation();
//   const data = state?.receipts || [];

//   const [header, setHeader] = useState(null);

//   const instId = localStorage.getItem("InstituteID");
//   const sessId = localStorage.getItem("SessionID");

//   /* ===== LOAD HEADER ===== */
//   useEffect(() => {
//     const loadHeader = async () => {
//       const res = await getHeaderDetail(instId, sessId);
//       if (res?.Table1?.length) {
//         setHeader(res.Table1[0]);
//       }
//     };
//     loadHeader();
//   }, [instId, sessId]);

//   if (!data.length) return <p>No data</p>;
//   if (!header) return <p>Loading...</p>;

//   /* ===== PAGINATION ===== */
//   const ROWS_PER_PAGE = 28;
//   const pages = chunkArray(data, ROWS_PER_PAGE);

//   /* ===== TOTALS ===== */
//   const totalFees = data.reduce((s, r) => s + Number(r.tot || 0), 0);
//   const deposit = data.reduce((s, r) => s + Number(r.dep || 0), 0);
//   const due = data.reduce((s, r) => s + Number(r.due || 0), 0);

//   return (
//     <PDFViewer width="100%" height="1000px">
//       <Document>

//         {pages.map((pageData, pageIndex) => {
//           const isLastPage = pageIndex === pages.length - 1;

//           return (
//             <Page size="A4" style={styles.page} key={pageIndex}>

//               {/* ===== HEADER ===== */}
//               <Text style={styles.title}>{header.HeaderInfo}</Text>
//               <Text style={styles.subTitle}>{header.Address}</Text>

//               {/* ===== TABLE ===== */}
//               <View style={styles.table}>

//                 {/* TABLE HEADER */}
//                 <View style={styles.row}>
//                   {[
//                     "SrNo",
//                     "Name",
//                     "Father Name",
//                     "Mobile No",
//                     "Class",
//                     "Total Fees",
//                     "Deposit",
//                     "Due Fee",
//                   ].map((h, i) => (
//                     <Text
//                       key={i}
//                       style={[
//                         styles.headerCell,
//                         {
//                           width: [
//                             "7%",
//                             "16%",
//                             "16%",
//                             "14%",
//                             "8%",
//                             "13%",
//                             "13%",
//                             "13%",
//                           ][i],
//                         },
//                       ]}
//                     >
//                       {h}
//                     </Text>
//                   ))}
//                 </View>

//                 {/* PAGE ROWS */}
//                 {pageData.map((r, i) => (
//                   <View style={styles.row} key={i}>
//                     <Text style={[styles.cell, { width: "7%" }]}>{r.srno}</Text>
//                     <Text style={[styles.cell, { width: "16%" }]}>{r.name}</Text>
//                     <Text style={[styles.cell, { width: "16%" }]}>{r.fname}</Text>
//                     <Text style={[styles.cell, { width: "14%" }]}>{r.fno}</Text>
//                     <Text style={[styles.cell, { width: "8%" }]}>{r.class}</Text>
//                     <Text style={[styles.cell, styles.right, { width: "13%" }]}>{r.tot}</Text>
//                     <Text style={[styles.cell, styles.right, { width: "13%" }]}>{r.dep}</Text>
//                     <Text style={[styles.cell, styles.right, { width: "13%" }]}>{r.due}</Text>
//                   </View>
//                 ))}

//                 {/* TOTAL ROW (LAST PAGE ONLY) */}
//                 {isLastPage && (
//                   <View style={styles.row}>
//                     <Text style={[styles.cell, styles.bold, { width: "61%" }]}>
//                       TOTAL
//                     </Text>
//                     <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
//                       {totalFees}
//                     </Text>
//                     <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
//                       {deposit}
//                     </Text>
//                     <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
//                       {due}
//                     </Text>
//                   </View>
//                 )}

//               </View>
//             </Page>
//           );
//         })}

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
} from "@react-pdf/renderer";
import { getHeaderDetail, getDueReport } from "../../../services/api";

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 9 },

  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  subTitle: { textAlign: "center", marginBottom: 10 },

  table: {
    borderTop: 1,
    borderBottom: 1,
    borderRight: 1,
    borderColor: "#000",
  },

  row: { flexDirection: "row" },

  headerCell: {
    borderLeftWidth: 1,
    padding: 4,
    fontWeight: "bold",
    textAlign: "center",
  },

  cell: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    padding: 4,
  },

  right: { textAlign: "right" },
  bold: { fontWeight: "bold" },
});

/* ===== COLUMN CONFIG (DYNAMIC WIDTH) ===== */
const columns = [
  { label: "SrNo", key: "srno", width: "7%" },
  { label: "Name", key: "name", width: "16%" },
  { label: "Father Name", key: "fname", width: "16%" },
  { label: "Mobile No", key: "fno", width: "14%" },
  { label: "Class", key: "class", width: "8%" },
  { label: "Total Fees", key: "tot", width: "13%", right: true },
  { label: "Deposit", key: "dep", width: "13%", right: true },
  { label: "Due Fee", key: "due", width: "13%", right: true },
];

/* ===== SPLIT DATA INTO PAGES ===== */
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export default function Due_Fee_Summary_Print() {
  const { state } = useLocation();

  /* filters coming from Due_Report page */
  const {
    classId = "0",
    monthId = "",
    ledgerId = "",
    lastBalance = 0,
  } = state || {};

  const instId = localStorage.getItem("InstituteID");
  const sessId = localStorage.getItem("SessionID");

  const [header, setHeader] = useState(null);
  const [data, setData] = useState([]);

  /* ===== LOAD HEADER ===== */
  useEffect(() => {
    getHeaderDetail(instId, sessId).then(res => {
      if (res?.Table1?.length) setHeader(res.Table1[0]);
    });
  }, [instId, sessId]);

  /* ===== LOAD DUE REPORT ===== */
  useEffect(() => {
    const loadData = async () => {
      const res = await getDueReport(
        instId,
        sessId,
        classId,
        lastBalance,
        monthId,
        ledgerId,
        0
      );

      if (res?.Table) {
        const mapped = res.Table.map(r => ({
          srno: r.SrNo,
          name: r.Name,
          fname: r.FatherName,
          fno: r.FatherPhone,
          class: r.Class,
          tot: r.TotalFess.toLocaleString(),
          dep: r.DepositFess.toLocaleString(),
          due: r.DueFee.toLocaleString(),
        }));
        setData(mapped);
      }
    };
    loadData();
  }, [instId, sessId, classId, monthId, ledgerId, lastBalance]);

  if (!header || !data.length) return null;

  const ROWS_PER_PAGE = 28;
  const pages = chunkArray(data, ROWS_PER_PAGE);

  /* ===== TOTALS ===== */
  const totalFees = data.reduce((s, r) => s + Number(r.tot.replace(/,/g, "")), 0);
  const deposit = data.reduce((s, r) => s + Number(r.dep.replace(/,/g, "")), 0);
  const due = data.reduce((s, r) => s + Number(r.due.replace(/,/g, "")), 0);

  return (
    <PDFViewer width="100%" height="1000px">
      <Document>
        {pages.map((pageData, pageIndex) => {
          const isLastPage = pageIndex === pages.length - 1;

          return (
            <Page size="A4" style={styles.page} key={pageIndex}>
              <Text style={styles.title}>{header.HeaderInfo}</Text>
              <Text style={styles.subTitle}>{header.Address}</Text>

              <View style={styles.table}>
                {/* HEADER */}
                <View style={styles.row}>
                  {columns.map(col => (
                    <Text
                      key={col.key}
                      style={[styles.headerCell, { width: col.width }]}
                    >
                      {col.label}
                    </Text>
                  ))}
                </View>

                {/* ROWS */}
                {pageData.map((row, i) => (
                  <View style={styles.row} key={i}>
                    {columns.map(col => (
                      <Text
                        key={col.key}
                        style={[
                          styles.cell,
                          col.right && styles.right,
                          { width: col.width },
                        ]}
                      >
                        {row[col.key]}
                      </Text>
                    ))}
                  </View>
                ))}

                {/* TOTAL */}
                {isLastPage && (
                  <View style={styles.row}>
                    <Text style={[styles.cell, styles.bold, { width: "61%" }]}>
                      TOTAL
                    </Text>
                    <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
                      {totalFees.toLocaleString()}
                    </Text>
                    <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
                      {deposit.toLocaleString()}
                    </Text>
                    <Text style={[styles.cell, styles.right, styles.bold, { width: "13%" }]}>
                      {due.toLocaleString()}
                    </Text>
                  </View>
                )}
              </View>
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
}
