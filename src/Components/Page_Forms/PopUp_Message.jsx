import React, { useEffect } from "react";

function PopUp_Message({ show, message, type = "info", duration = 2000, onClose }) {
  // Automatically hide after `duration` ms
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose(); // call parent to hide
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  // Background color based on type
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    case "info":
    default:
      bgColor = "bg-blue-500";
  }

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white z-[9999] ${bgColor}`}
    >
      {message}
    </div>
  );
}

export default PopUp_Message;
