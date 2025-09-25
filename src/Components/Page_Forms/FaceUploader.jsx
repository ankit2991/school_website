import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

function FaceUploader() {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [base64String, setBase64String] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Load models on component mount
    useEffect(() => {
        const loadModels = async () => {
            try {
                console.log("Loading models...");
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
                    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                ]);
                console.log("✅ Models loaded");
            } catch (err) {
                console.error("❌ Error loading models:", err);
            }
        };
        loadModels();
    }, []);
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setLoading(true);
        console.log("📂 File selected:", file.name);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = URL.createObjectURL(file);
        
        img.onload = async () => {
            console.log("🖼️ Image loaded:", img.width, "x", img.height);
            try {
                const detection = await faceapi.detectSingleFace(img).withFaceLandmarks();
                console.log("🔍 Detection result:", detection);
                if (!detection) {
                    alert("No face detected!");
                    setLoading(false);
                    return;
                }
                
                const box = detection.detection.box;
                console.log("📦 Bounding box:", box);
                // Crop dynamically
                const topExtra = box.height * 0.5;
                const bottomExtra = box.height * 0.8;
                const sideExtra = box.width * 1.5;
                
                const x = Math.max(0, box.x - sideExtra);
                const y = Math.max(0, box.y - topExtra);
                const width = Math.min(img.width - x, box.width + 2 * sideExtra);
                const height = Math.min(img.height - y, box.height + topExtra + bottomExtra);
                
                console.log("✂️ Cropping area:", { x, y, width, height });
                
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
                
                const base64 = canvas.toDataURL("image/jpeg", 1.0);
                setPreview(base64);
                setBase64String(base64);
                console.log("✅ Cropping done, preview set");
            } catch (err) {
                console.error("❌ Detection error:", err);
            } finally {
                setLoading(false);
            }
        };
    }
    
    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-md">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
            
            {loading && <p>Loading...</p>}
            {preview && (
                <div className="border rounded-lg overflow-hidden shadow inline-block max-w-[300px]">
                    <img src={preview} alt="Cropped face" className="block w-full h-auto" />
                </div>
            )}
            {/* {base64String && (
                <textarea value={base64String} readOnly rows="6" className="w-full max-w-lg p-2 border rounded-lg bg-gray-50 text-xs" />
            )} */}
        </div>
    );
}

export default FaceUploader;