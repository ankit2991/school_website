import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useLocation } from "react-router-dom"; // ✅ import useLocation
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDF_Viewer = () => {
    const location = useLocation();

    // Get pdfUrl from navigation state, fallback to default if not provided
    const pdfUrl = location.state?.pdfUrl || "/models/pdf/2AddReportViewer.pdf";

    return (
        <div style={{ height: "750px" }}>
            <Worker>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default PDF_Viewer;
