// ------------------------------------------------------11/12/202025---------------------------------------------------

// import React, { useCallback, useRef, useState } from "react";
// import Cropper from "react-easy-crop";

// // Utility to create a cropped image blob from an image + crop area
// async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   // set canvas size to final crop size
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // draw the cropped area onto the canvas
//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return await new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       resolve(blob);
//     }, "image/jpeg", 0.92);
//   });
// }

// function createImage(url) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.addEventListener("load", () => resolve(img));
//     img.addEventListener("error", (err) => reject(err));
//     img.setAttribute("crossOrigin", "anonymous"); // needed for cross-origin images
//     img.src = url;
//   });
// }

// export default function ProfileImageCropper({
//   uploadUrl = "/upload", // backend endpoint that accepts multipart/form-data with field 'file'
//   aspect = 1, // square profile
//   size = 300, // preview/thumbnail size in px
// }) {
//   const inputRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [uploadedUrl, setUploadedUrl] = useState(null);

//   const onFileChange = async (e) => {
//     setError("");
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       setError("Please select an image file.");
//       return;
//     }
//     const reader = new FileReader();
//     reader.addEventListener("load", () => setImageSrc(reader.result));
//     reader.readAsDataURL(file);
//   };

//   const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
//     setCroppedAreaPixels(croppedAreaPx);
//   }, []);

//   const makeClientCropAndUpload = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
//       if (!blob) throw new Error("Crop failed.");

//       // optional: show preview URL
//       const previewUrl = URL.createObjectURL(blob);

//       // upload via fetch multipart/form-data
//       const form = new FormData();
//       form.append("file", blob, "profile.jpg");

//       const resp = await fetch(uploadUrl, {
//         method: "POST",
//         body: form,
//       });

//       if (!resp.ok) {
//         const txt = await resp.text();
//         throw new Error(`Upload failed: ${resp.status} ${txt}`);
//       }

//       const json = await resp.json().catch(() => null);
//       // Expect backend to return JSON with uploaded image URL, or fallback to preview
//       setUploadedUrl((json && json.url) || previewUrl);
//       setImageSrc(null); // close cropper
//     } catch (err) {
//       setError(err.message || String(err));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clear = () => {
//     setImageSrc(null);
//     setCroppedAreaPixels(null);
//     setZoom(1);
//     setCrop({ x: 0, y: 0 });
//     setError("");
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-4">
//       <div className="flex items-center gap-3">
//         <div
//           className="w-20 h-20 rounded-lg  overflow-hidden bg-gray-100 flex items-center justify-center border"
//           style={{ width: size, height: size }}
//         >
//           {uploadedUrl ? (
//             <img src={uploadedUrl} alt="profile" className="object-cover w-full h-full" />
//           ) : (
//             <div className="text-xs text-gray-500">No profile image</div>
//           )}
//         </div>

//         <div className="flex-1">
//           <button
//             className="px-3 py-2 bg-blue-600 text-white rounded mr-2"
//             onClick={() => inputRef.current && inputRef.current.click()}
//           >
//             Choose Image
//           </button>

//           {uploadedUrl && (
//             <button className="px-3 py-2 border rounded" onClick={() => setUploadedUrl(null)}>
//               Remove
//             </button>
//           )}
//         </div>
//       </div>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={onFileChange}
//       />

//       {imageSrc && (
//         <div className="mt-4 bg-white rounded shadow p-3">
//           <div className="relative" style={{ height: 360 }}>
//             <Cropper
//               image={imageSrc}
//               crop={crop}
//               zoom={zoom}
//               aspect={aspect}
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={onCropComplete}
//               cropShape="round"
//               showGrid={false}
//             />
//           </div>

//           <div className="flex items-center gap-3 mt-3">
//             <label className="flex-1">
//               <div className="text-sm text-gray-600 mb-1">Zoom</div>
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.01}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="w-full"
//               />
//             </label>

//             <div className="flex gap-2">
//               <button
//                 className="px-3 py-2 bg-green-600 text-white rounded"
//                 onClick={makeClientCropAndUpload}
//                 disabled={loading}
//               >
//                 {loading ? "Uploading..." : "Save"}
//               </button>

//               <button className="px-3 py-2 border rounded" onClick={clear} disabled={loading}>
//                 Cancel
//               </button>
//             </div>
//           </div>

//           {error && <div className="text-red-600 mt-2">{error}</div>}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import Dialog from '../../Components/Page_Forms/Dialog'

// Utility to create a cropped image blob from an image + crop area
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return await new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg", 0.92);
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}

export default function ProfileImageCropper({ aspect = 1, size = 300 }) {
  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const onFileChange = async (e) => {
    setError("");
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx);
  }, []);

  // ✔ NEW LOCAL SAVE FUNCTION — NO UPLOAD
  const makeClientCropAndUpload = async () => {
    try {
      setLoading(true);
      setError("");

      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!blob) throw new Error("Crop failed.");

      const previewUrl = URL.createObjectURL(blob);

      setUploadedUrl(previewUrl); // show cropped image locally
      setImageSrc(null); // close cropper
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setImageSrc(null);
    setCroppedAreaPixels(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-3">

          {/* Show cropped image only when saved */}
          {uploadedUrl && (
            <div
              className="relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border"
              style={{ width: size, height: size }}
            >
              <img
                src={uploadedUrl}
                alt="profile"
                className="object-cover w-full h-full"
              />
              
              {/* TOP RIGHT CANCEL BUTTON */}
              <button
                onClick={() => setUploadedUrl(null)}
                className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-gray-200"
              >
                ❌
              </button>
            </div>
          )}
          
          {/* Centered choose image button */}
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            Choose Image
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <Dialog 
        open={Boolean(imageSrc)}
        title="Crop Image"
        dialogstyle="sm:w-[600px] sm:h-auto"
      >
        
        {/* CROP UI INSIDE POPUP */}
        <div className="relative w-full" style={{ height: 360 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
          />
        </div>
        
        {/* CONTROLS */}
        <div className="flex items-center gap-3 mt-4">
          <label className="flex-1">
            <div className="text-sm text-gray-600 mb-1">Zoom</div>
            <input 
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </label>
          
          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-green-600 text-white rounded"
              onClick={makeClientCropAndUpload}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            
            <button
              className="px-3 py-2 border rounded"
              onClick={clear}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
        
        {error && <div className="text-red-600 mt-3">{error}</div>}
      </Dialog>
    </div>
  );
}



// ---------------------------------------------------------11/12/2025-------------------------------------------------
