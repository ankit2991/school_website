
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
import { getHeaderDetail, getHostelDueReport } from "../../../services/api";

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 9 },

  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  subTitle: { textAlign: "center", marginTop: 12, marginBottom: 4, },

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
    fontSize: 8,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    padding: 4,
  },
  
  totcell: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    padding: 4,
  },

  right: { textAlign: "right" },
  bold: { fontWeight: "bold" },
});

/* ===== COLUMN CONFIG (DYNAMIC WIDTH) ===== */
const columns = [
  { label: "SrNo", key: "srno", width: "10%" },
  { label: "Name", key: "name", width: "18%" },
  { label: "Father Name", key: "fname", width: "18%" },
  { label: "Mobile No", key: "fno", width: "11%" },
  { label: "Class", key: "class", width: "10%" },
  { label: "Fees", key: "tot", width: "11%", right: true },
  { label: "Deposit", key: "dep", width: "11%", right: true },
  { label: "Due Fee", key: "due", width: "11%", right: true },
];

/* ===== SPLIT DATA INTO PAGES ===== */
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

export default function Hostel_Due_Fee_Summary_Print() {
  const { state } = useLocation();

  /* filters coming from Due_Report page */
  const {
    classId = "0",
    monthId = "0",
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
      
      const res = await getHostelDueReport( instId, sessId, classId || "0", monthId || "0" );

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
  }, [instId, sessId, classId, monthId,]);

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
                    <Text style={[styles.totcell, styles.bold, { width: "67%" }]}>
                      TOTAL
                    </Text>
                    <Text style={[styles.totcell, styles.right, styles.bold, { width: "11%" }]}>
                      {totalFees.toLocaleString()}
                    </Text>
                    <Text style={[styles.totcell, styles.right, styles.bold, { width: "11%" }]}>
                      {deposit.toLocaleString()}
                    </Text>
                    <Text style={[styles.totcell, styles.right, styles.bold, { width: "11%" }]}>
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
