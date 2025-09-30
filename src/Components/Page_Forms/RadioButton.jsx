import React from "react";

function RadioButton({ 
  label,        // Label shown next to the radio
  name,         // Group name for radio buttons
  value,        // Value of this radio button
  checked,      // Whether this radio is selected
  onChange,     // Callback when radio changes
  disabled = false, // Optional: disable this radio
  className = "" // Optional: extra classes
}) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 accent-red-500" // Tailwind for size & color
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

export default RadioButton;
