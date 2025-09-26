import React from "react";

function Dialog({ open, title, children, dialogstyle}) {
  if (!open) return null; // don't render if closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Dialog Box */}
      <div className={`overflow-y-auto no-scrollbar w-full p-6 m-2 sm:m-0 bg-white rounded-lg shadow-lg ${
          dialogstyle || "sm:w-xl sm:h-[220px]" // fallback if none passed
        }`}>
        {/* Title */}
        <h1 className="cursor-default text-2xl font-bold text-[#CC3015] mb-2">{title}</h1>

        {/* Content */}
        <div className="mb-6">{children}</div>
       
      </div>
    </div>
  );
}

export default Dialog;
