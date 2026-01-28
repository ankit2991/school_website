import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, PDFViewer, } from "@react-pdf/renderer"; 
import { getHeaderDetail } from "../../../services/api";

const styles = StyleSheet.create({ 
    page: { 
        padding: 20, 
        fontSize: 9, 
    }, 
    
    grid: { 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "space-between", 
    }, 
    
    box: { 
        width: "48%", 
        border: "1.7 dashed black", 
        padding: 10, 
        marginBottom: 12, 
    }, 
    
    title: { 
        fontSize: 10, 
        fontWeight: "bold", 
        textAlign: "center", 
        marginBottom: 15,
    }, 
    
    center: { 
        textAlign: "center", 
        marginBottom: 4, 
    }, 
    
    underline: { 
        textAlign: "center", 
        fontWeight: "bold", 
        textDecoration: "underline", 
        marginBottom: 6, 
    }, 
    
    row: { 
        flexDirection: "row", 
        marginBottom: 5, 
    }, 
    
    label: { width: "45%", }, 
    
    dotted: { 
        width: "55%", 
        borderBottom: "1 dotted black", 
    }, 
    
    amountRow: { 
        flexDirection: "row", 
        marginTop: 4, 
    }, 
    
    amountLabel: { width: "45%", }, 
    
    amountValue: { 
        width: "40%", 
        fontWeight: "bold", 
    }, 
    
    note: { marginTop: 5, }, 
}); 

// 🔹 split array into chunks of 4 
const chunk = (arr, size) => Array.from( 
    { length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size) 
); 

export default function Hostel_Due_Fee_Print() { 
    const { state } = useLocation(); 
    const receipts = state?.receipts || []; 

    const [header, setHeader] = useState(null); 
    const [loading, setLoading] = useState(true); 
    
    const instId = localStorage.getItem("InstituteID"); 
    const sessId = localStorage.getItem("SessionID");

    useEffect(() => { 
        const fetchHeader = async () => { 
            try { 
                const res = await getHeaderDetail(instId, sessId); 
                if (res?.Table1?.length) { 
                    setHeader(res.Table1[0]); // 👈 HeaderInfo, MobileNo etc 
                } 
            } catch (err) { 
                console.error("Header API error", err); 
            } finally { 
                setLoading(false); 
            } 
        }; 
        
        fetchHeader(); 
    }, [instId, sessId]);

    if (loading) return <p>Loading PDF...</p>; 
    if (!header) return <p>Header not found</p>; 
    
    if (!receipts.length) { 
        return <p>No data to print</p>; 
    } 
    
    const pages = chunk(receipts, 5); // 4 per page 

    return ( 
        <PDFViewer width="100%" height="1000px"> 
            <Document> 
                {pages.map((pageData, pageIndex) => ( 
                    <Page size="A4" style={styles.page} key={pageIndex}> 
                        <View style={styles.grid}> 
                            {pageData.map((r, index) => ( 
                                <View style={styles.box} key={index}> 
                                    <Text style={styles.title}>{header.HeaderInfo}</Text> 
                                    <Text style={styles.center}> Contact No : {header.MobileNo} </Text> 
                                    <Text style={styles.underline}>Hostel Due Reminder</Text> 
                                    <View style={styles.row}> 
                                        <Text style={styles.label}>Student's Name:-</Text> 
                                        <Text style={styles.dotted}>{r.name}</Text> 
                                    </View> 
                                    
                                    <View style={styles.row}> 
                                        <Text style={styles.label}>Father's Name:-</Text> 
                                        <Text style={styles.dotted}>{r.fname}</Text> 
                                    </View> 
                                    
                                    <View style={styles.row}> 
                                        <Text style={styles.label}>Class:-</Text> 
                                        <Text style={styles.dotted}>{r.class}</Text> 
                                    </View> 
                                    
                                    <View style={styles.amountRow}> 
                                        <Text style={styles.amountLabel}>Due Hostel Fee (up to ) : </Text> 
                                        <Text style={[styles.amountValue, styles.dotted]}> {r.due} </Text> 
                                    </View> 
                                    
                                    <Text style={styles.note}> 
                                        Please pay the required amount immediately. 
                                    </Text> 
                                </View> 
                            ))} 
                        </View> 
                    </Page> 
                ))} 
            </Document> 
        </PDFViewer>
    ); 
} 
