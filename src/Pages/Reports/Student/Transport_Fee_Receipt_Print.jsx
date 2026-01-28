// import React from "react";
// import { useLocation } from "react-router-dom";
// import { Document, Page, Text, View, StyleSheet, PDFViewer, } from "@react-pdf/renderer"; 

// const styles = StyleSheet.create({ 
//   page: { 
//     fontSize: 9, 
//     fontFamily: "Helvetica", 
//     padding: 18, 
//   }, 
  
//   /* ================= HEADER ================= */ 
//   title: { 
//     fontSize: 12, 
//     fontWeight: "bold", 
//     textAlign: "center", 
//   }, 
  
//   phone: { 
//     fontWeight: "bold", 
//     textAlign: "center", 
//     marginTop: 15, 
//   }, 
  
//   studentCopy: { 
//     fontSize: 8, 
//     fontWeight: "bold", 
//     position: "absolute", 
//     right: 18, 
//   }, 
  
//   hr: { 
//     borderBottomWidth: 1, 
//     marginVertical: 6, 
//   }, 
  
//   /* ================= INFO GRID ================= */ 
//   infoRow: { 
//     flexDirection: "row", 
//     marginBottom: 2, 
//   }, 
  
//   infoLeft: { width: "70%" }, 
//   infoRight: { width: "30%" }, 
  
//   /* ================= TABLE ================= */ 
//   table: { 
//     borderWidth: 1, 
//     marginTop: 6, 
//   }, 
  
//   tr: { flexDirection: "row" }, 
  
//   th: { 
//     fontWeight: "bold", 
//     borderRightWidth: 1, 
//     borderBottomWidth: 1, 
//     padding: 4, 
//   }, 
  
//   td: { 
//     borderRightWidth: 1, 
//     borderBottomWidth: 1, 
//     padding: 4, 
//   }, 
  
//   tdLast: { 
//     borderBottomWidth: 1, 
//     padding: 4, 
//     textAlign: "right", 
//   }, 
  
//   fee: { width: "30%" }, 
//   desc: { width: "45%" }, 
//   amt: { width: "25%" }, 
  
//   /* ================= LOWER ================= */ 
//   lower: { 
//     flexDirection: "row", 
//     minHeight: 70, 
//   }, 
  
//   remarks: { 
//     width: "65%", 
//     borderRightWidth: 1, 
//     padding: 4, 
//   }, 
  
//   dotted: { 
//     borderBottom: "1 dotted black", 
//     marginVertical: 6, 
//   }, 
  
//   totals: { 
//     width: "35%", 
//     padding: 4, 
//   }, 
  
//   totalRow: { 
//     flexDirection: "row", 
//     justifyContent: "space-between", 
//     marginBottom: 2, 
//   }, 
  
//   sign: { 
//     fontWeight: "bold", 
//     marginTop: 14, 
//   }, 
  
//   /* ================= CUT ================= */ 
//   cut: { 
//     fontSize: 8, 
//     marginVertical: 18, 
//     textAlign: "center", 
//     borderBottom: "1 dashed black", 
//   }, 
  
//   /* ================= OFFICE ================= */ 
//   officeBox: { 
//     borderWidth: 1, 
//   }, 
  
//   officeTitle: { 
//     fontSize: 11, 
//     fontWeight: "bold", 
//     textAlign: "center", 
//     marginBottom: 4, 
//   }, 
  
//   infoBlock: { 
//     width: "34%", 
//     flexDirection: "row", 
//   }, 
  
//   infoLabel: { 
//     width: "45%", 
//     fontWeight: "bold", 
//   }, 
  
//   infoValue: { width: "45%", }, 
// }); 

// export default function Transport_Fee_Receipt_Print() { 
//   const { state } = useLocation(); 
//   const receipts = state?.receipts || []; 
  
  
//   return ( 
//     <PDFViewer width="100%" height="1000"> 
//       <Document> 
//         {receipts.map((r, i) => ( 
//           <Page key={i} size="A4" style={[styles.page, {justifyContent: "space-between"}]}> 

//             {/* ============================= STUDENT COPY =============================== */} 
//             <View> 
//               <Text style={styles.studentCopy}>Student Copy</Text> 
            
//               <Text style={styles.title}>SYSTRANS PUBLIC SCHOOL</Text> 
            
//               <Text style={styles.phone}>8504035000</Text> 
            
//               <View style={styles.hr} /> 
            
//               <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
//                 <View style={[styles.infoBlock, {width: "68.5%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "22%",}]}>Receipt No:</Text>                 
//                   <Text style={styles.infoValue}>{r.receipt}</Text>                 
//                 </View> 
              
//                 <View style={[styles.infoBlock, {width: "32%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "48%",}]}>Date:</Text> 
//                   <Text style={styles.infoValue}>{r.rdate}</Text> 
//                 </View> 
//               </View> 
            
//               <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
//                 <View style={[styles.infoBlock, {width: "68.5%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "22%",}]}>Student Name:</Text> 
//                   <Text style={styles.infoValue}>{r.name}</Text> 
//                 </View> 
              
//                 <View style={[styles.infoBlock, {width: "32%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "48%",}]}>Class:</Text> 
//                   <Text style={styles.infoValue}>{r.class}</Text> 
//                 </View> 
//               </View> 
            
//               <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
//                 <View style={[styles.infoBlock, {width: "68.5%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "22%",}]}>Father Name:</Text> 
//                   <Text style={styles.infoValue}>{r.fname}</Text> 
//                 </View> 
              
//                 <View style={[styles.infoBlock, {width: "32%",}]}> 
//                   <Text style={[styles.infoLabel, {width: "48%",}]}>Enrollment No:</Text> 
//                   <Text style={styles.infoValue}>{r.serial}</Text> 
//                 </View> 
//               </View> 
            
//               {/* TABLE */} 
//               <View style={styles.table}> 
//                 <View style={styles.tr}> 
//                   <Text style={[styles.th, styles.fee]}>FeeType</Text> 
//                   <Text style={[styles.th, styles.desc]}>Description</Text> 
//                   <Text style={[styles.tdLast, {fontWeight: "bold"}, styles.amt]}>Amount</Text> 
//                 </View> 
              
//                 <View style={styles.tr}> 
//                   <Text style={[styles.td, styles.fee]}>BUS FEE</Text> 
//                   <Text style={[styles.td, styles.desc]}>{r.nar}</Text> 
//                   <Text style={[styles.tdLast, styles.amt]}>{r.tot}</Text> 
//                 </View> 
              
//                 <View style={styles.lower}> 
//                   <View style={styles.remarks}> 
//                     <Text>Remarks (If Any)</Text> 
//                     <View style={styles.dotted} /> 
//                     <View style={styles.dotted} /> 
//                     <Text style={styles.sign}>Authorised Signatory</Text> 
//                   </View> 
                
//                   <View style={styles.totals}> 
//                     <View style={styles.totalRow}> 
//                       <Text style={{fontWeight: "bold",}}>Total Amount:</Text> 
//                       <Text>{r.tot}</Text> 
//                     </View> 
                  
//                     <View style={styles.totalRow}> 
//                       <Text style={{fontWeight: "bold",}}>Add:</Text> 
//                       <Text>0.00</Text> 
//                     </View> 
                  
//                     <View style={styles.totalRow}> 
//                       <Text style={{fontWeight: "bold",}}>Less:</Text> 
//                       <Text>{r.dis}</Text> 
//                     </View> 
                  
//                     <View style={styles.totalRow}> 
//                       <Text style={{ fontWeight: "bold" }}>Net Amount:</Text> 
//                       <Text style={{ fontWeight: "bold" }}>{r.net}</Text> 
//                     </View> 
//                   </View> 
//                 </View> 
//               </View> 
//             </View> 
          



//             <View> 
//               {/* CUT */} 
//               <Text style={{textAlign: "center", marginVertical: 20,}}> 
//                 ------------------------------------------------ Cut Here ------------------------------------------------ 
//               </Text> 

            
//               {/* ================= OFFICE COPY ================= */} 
//               <View style={styles.officeBox}> 
//                 {/* TOP LABEL */} 
//                 <View style={{ flexDirection: "row", padding: "8 8 4 8"  }}> 
//                   <Text style={{ fontWeight: "bold", fontSize: 8 }}>Office Copy</Text> 
//                   <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}> 
//                     SYSTRANS PUBLIC SCHOOL 
//                   </Text> 
//                 </View> 
              
//                 <Text style={{ borderBottom: "1.2 solid black" }}></Text> 
              
//                 {/* ROW 1 */} 
//                 <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
//                   <View style={[styles.infoBlock, {width: "44%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "41.2%"}]}>Receipt No.:</Text> 
//                     <Text style={styles.infoValue}>{r.receipt}</Text> 
//                   </View> 
//                   <View style={[styles.infoBlock, {width: "38%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "32%",}]}>S.R. No.:</Text> 
//                     <Text style={styles.infoValue}>{r.serial}</Text> 
//                   </View> 
                
//                   <View style={[styles.infoBlock, {width: "25.5%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "35%",}]}>Date:</Text> 
//                     <Text style={styles.infoValue}>{r.rdate}</Text> 
//                   </View> 
//                 </View> 
              
//                 {/* ROW 2 */} 
//                 <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
//                   <View style={[styles.infoBlock, {width: "76.5%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "22%",}]}>Student Name:</Text> 
//                     <Text style={styles.infoValue}>{r.name}</Text> 
//                   </View> 
                
//                   <View style={[styles.infoBlock, {width: "23.5%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "35%",}]}>Class:</Text> 
//                     <Text style={styles.infoValue}>{r.class}</Text> 
//                   </View> 
//                 </View> 
              
//                 {/* ROW 3 */} 
//                 <View style={[ styles.infoRow, { padding: "8 8 3 8" }]}> 
//                   <View style={[styles.infoBlock, {width: "100%",}]}> 
//                     <Text style={[styles.infoLabel, {width: "17%",}]}>Father Name:</Text> 
//                     <Text style={styles.infoValue}>{r.fname}</Text> 
//                   </View> 
//                 </View> 
              
//                 {/* REMARKS + TOTAL */} 
//                 <View style={{ flexDirection: "row", marginTop: 0, padding: "6 8 8 8" }}> 
//                   <Text style={{ width: "70%" }}> 
//                     Remarks (If Any) ...................................................... 
//                   </Text> 
//                   <Text style={{ width: "30%", textAlign: "right", fontWeight: "bold" }}> 
//                     GRAND TOTAL:- {r.net} 
//                   </Text> 
//                 </View> 
//               </View> 
            
//               {/* SIGNATURE OUTSIDE */} 
//               <Text style={{ marginTop: 30, fontWeight: "bold" }}> 
//                 Authorised Signatory 
//               </Text> 
//             </View> 
//           </Page> 
//         ))} 
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
import { getHeaderDetail, getReceipt,  } from "../../../services/api";

/* ================= STYLES (UNCHANGED) ================= */
const styles = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", padding: 18 },
  title: { fontSize: 12, fontWeight: "bold", textAlign: "center" },
  phone: { fontWeight: "bold", textAlign: "center", marginTop: 15 },
  studentCopy: { fontSize: 8, fontWeight: "bold", position: "absolute", right: 18 },
  hr: { borderBottomWidth: 1, marginVertical: 6 },

  infoRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  infoBlock: { flexDirection: "row", width: "48%" },
  infoLabel: { width: "45%", fontWeight: "bold" },

  table: { borderWidth: 1, marginTop: 6 },
  tr: { flexDirection: "row" },
  th: { borderRightWidth: 1, borderBottomWidth: 1, padding: 4, fontWeight: "bold" },
  td: { borderRightWidth: 1, borderBottomWidth: 1, padding: 4 },
  tdLast: { borderBottomWidth: 1, padding: 4, textAlign: "right" },

  fee: { width: "30%" },
  desc: { width: "45%" },
  amt: { width: "25%" },

  lower: { flexDirection: "row", minHeight: 70 },
  remarks: { width: "65%", borderRightWidth: 1, padding: 4 },
  dotted: { borderBottom: "1 dotted black", marginVertical: 6 },
   officeBox: { 
    borderWidth: 1, 
  },
  totals: { width: "35%", padding: 4 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  sign: { fontWeight: "bold", marginTop: 14 },
});

/* ================= COMPONENT ================= */
export default function Transport_Fee_Receipt_Print() {
  const { state } = useLocation();
  const [header, setHeader] = useState(null);
  const [rows, setRows] = useState([]);
  const instId = localStorage.getItem("InstituteID"); 
  const sessionId = localStorage.getItem("SessionID");

  const receipts = state?.receipts || [];
  const rcNo = receipts[0].id; 

  useEffect(() => {
  async function loadHeader() {
    const res = await getHeaderDetail(instId, sessionId);
    setHeader(res?.Table1?.[0] || null);
  }
  loadHeader();
}, [instId, sessionId]);



  useEffect(() => {
    async function loadReceipt() {
      const res = await getReceipt(instId, rcNo, 13);
      setRows(res?.Table || []);
    }
    loadReceipt();
  }, [instId, rcNo]);

  if (!rows.length || !header) return null;

  const h = rows[0]; // header data

  return (
    <PDFViewer width="100%" height="1000">
      <Document>


        <Page size="A4" style={[styles.page, {justifyContent: "space-between"}]}> 

            {/* ============================= STUDENT COPY =============================== */} 
            <View> 
              <Text style={styles.studentCopy}>Student Copy</Text> 
            
              {/* <Text style={styles.title}>SYSTRANS PUBLIC SCHOOL</Text> 
            
              <Text style={styles.phone}>8504035000</Text>  */}

              <Text style={styles.title}>{header.HeaderInfo}</Text> 
              
              <Text style={styles.phone}>{header.MobileNo}</Text>

            
              <View style={styles.hr} /> 
            
              <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
                <View style={[styles.infoBlock, {width: "68.5%",}]}> 
                  <Text style={[styles.infoLabel, {width: "22%",}]}>Receipt No:</Text>                 
                  <Text style={styles.infoValue}>{h.RecieptNo}</Text>                 
                </View> 
              
                <View style={[styles.infoBlock, {width: "32%",}]}> 
                  <Text style={[styles.infoLabel, {width: "48%",}]}>Date:</Text> 
                  <Text style={styles.infoValue}>{h.Date}</Text> 
                </View> 
              </View> 
            
              <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
                <View style={[styles.infoBlock, {width: "68.5%",}]}> 
                  <Text style={[styles.infoLabel, {width: "22%",}]}>Student Name:</Text> 
                  <Text style={styles.infoValue}>{h.StudentName}</Text> 
                </View> 
              
                <View style={[styles.infoBlock, {width: "32%",}]}> 
                  <Text style={[styles.infoLabel, {width: "48%",}]}>Class:</Text> 
                  <Text style={styles.infoValue}>{h.Class}</Text> 
                </View> 
              </View> 
            
              <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
                <View style={[styles.infoBlock, {width: "68.5%",}]}> 
                  <Text style={[styles.infoLabel, {width: "22%",}]}>Father Name:</Text> 
                  <Text style={styles.infoValue}>{h.FatherName}</Text> 
                </View> 
              
                <View style={[styles.infoBlock, {width: "32%",}]}> 
                  <Text style={[styles.infoLabel, {width: "48%",}]}>Enrollment No:</Text> 
                  <Text style={styles.infoValue}>{h.EnrollmentNo}</Text> 
                </View> 
              </View> 

              {/* TABLE */} 
              <View style={styles.table}> 
                <View style={styles.tr}> 
                  <Text style={[styles.th, styles.fee]}>FeeType</Text> 
                  <Text style={[styles.th, styles.desc]}>Description</Text> 
                  <Text style={[styles.tdLast, {fontWeight: "bold"}, styles.amt]}>Amount</Text> 
                </View> 
              
                

                {rows.map((r, i) => (
              <View key={i} style={styles.tr}>
                <Text style={[styles.td, styles.fee]}>{r.FeeType}</Text>
                <Text style={[styles.td, styles.desc]}>{r.Month}</Text>
                <Text style={[styles.tdLast, styles.amt]}>
                  {r.Amount.toFixed(2)}
                </Text>
              </View>
            ))} 
              
                <View style={styles.lower}> 
                  <View style={styles.remarks}> 
                    <Text>Remarks (If Any)</Text> 
                    <View style={[styles.dotted, {margin: "15 0 10 0"}]} /> 
                    <View style={styles.dotted} /> 
                    <Text style={styles.sign}>Authorised Signatory</Text> 
                  </View> 
                
                  <View style={styles.totals}> 
                    <View style={styles.totalRow}> 
                      <Text style={{fontWeight: "bold", marginBottom: "9"}}>Total Amount:</Text> 
                      <Text>{h.TotalAmount.toFixed(2)}</Text> 
                    </View> 
                  
                    <View style={styles.totalRow}> 
                      <Text style={{fontWeight: "bold", marginBottom: "9"}}>Add:</Text> 
                      <Text>{h.FineAmount.toFixed(2)}</Text> 
                    </View> 
                  
                    <View style={styles.totalRow}> 
                      <Text style={{fontWeight: "bold", marginBottom: "9"}}>Less:</Text> 
                      <Text>{h.DiscountAmount.toFixed(2)}</Text> 
                    </View> 
                  
                    <View style={styles.totalRow}> 
                      <Text style={{ fontWeight: "bold" }}>Net Amount:</Text> 
                      <Text style={{ fontWeight: "bold" }}>{h.NetAmount.toFixed(2)}</Text> 
                    </View> 
                  </View> 
                </View> 
              </View> 
            </View> 
          



            <View> 
              {/* CUT */} 
              <Text style={{textAlign: "center", marginVertical: 20,}}> 
                ------------------------------------------------------------ Cut Here ------------------------------------------------------------ 
              </Text> 

            
              {/* ================= OFFICE COPY ================= */} 
              <View style={styles.officeBox}> 
                {/* TOP LABEL */} 
                <View style={{ flexDirection: "row", padding: "8 8 4 8"  }}> 
                  <Text style={{ fontWeight: "bold", fontSize: 8 }}>Office Copy</Text> 
                  <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}> 
                    {header.HeaderInfo} 
                  </Text> 
                </View> 
              
                <Text style={{ borderBottom: "1.2 solid black" }}></Text> 
              
                {/* ROW 1 */} 
                <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
                  <View style={[styles.infoBlock, {width: "44%",}]}> 
                    <Text style={[styles.infoLabel, {width: "41.2%"}]}>Receipt No.:</Text> 
                    <Text style={styles.infoValue}>{h.RecieptNo}</Text> 
                  </View> 
                  <View style={[styles.infoBlock, {width: "38%",}]}> 
                    <Text style={[styles.infoLabel, {width: "32%",}]}>S.R. No.:</Text> 
                    <Text style={styles.infoValue}>{h.EnrollmentNo}</Text> 
                  </View> 
                
                  <View style={[styles.infoBlock, {width: "25.5%",}]}> 
                    <Text style={[styles.infoLabel, {width: "35%",}]}>Date:</Text> 
                    <Text style={styles.infoValue}>{h.Date}</Text> 
                  </View> 
                </View> 
              
                {/* ROW 2 */} 
                <View style={[ styles.infoRow, {justifyContent: "space-between", padding: "8 8 3 8" }]}> 
                  <View style={[styles.infoBlock, {width: "76.5%",}]}> 
                    <Text style={[styles.infoLabel, {width: "22%",}]}>Student Name:</Text> 
                    <Text style={styles.infoValue}>{h.StudentName}</Text> 
                  </View> 
                
                  <View style={[styles.infoBlock, {width: "23.5%",}]}> 
                    <Text style={[styles.infoLabel, {width: "35%",}]}>Class:</Text> 
                    <Text style={styles.infoValue}>{h.Class}</Text> 
                  </View> 
                </View> 
              
                {/* ROW 3 */} 
                <View style={[ styles.infoRow, { padding: "8 8 3 8" }]}> 
                  <View style={[styles.infoBlock, {width: "100%",}]}> 
                    <Text style={[styles.infoLabel, {width: "17%",}]}>Father Name:</Text> 
                    <Text style={styles.infoValue}>{h.FatherName}</Text> 
                  </View> 
                </View> 
              
                {/* REMARKS + TOTAL */} 
                <View style={{ flexDirection: "row", marginTop: 0, padding: "6 8 8 8" }}> 
                  <Text style={{ width: "70%" }}> 
                    Remarks (If Any) ...................................................... 
                  </Text> 
                  <Text style={{ width: "30%", textAlign: "right", fontWeight: "bold" }}> 
                    GRAND TOTAL:- {h.TotalAmount} 
                  </Text> 
                </View> 
              </View> 
            
              {/* SIGNATURE OUTSIDE */} 
              <Text style={{ marginTop: 30, fontWeight: "bold" }}> 
                Authorised Signatory 
              </Text> 
            </View> 
          </Page>        
      </Document>
    </PDFViewer>
  );
}
