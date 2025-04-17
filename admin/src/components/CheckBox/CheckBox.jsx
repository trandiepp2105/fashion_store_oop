// Checkbox.jsx
import React from "react";
import "./CheckBox.scss";

const CheckBox = ({ name, checked, onChange, label }) => {
  const handleClick = (e) => {
    // Prevent default behavior and trigger onChange manually
    e.preventDefault();
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="custom-checkbox" onClick={handleClick}>
      <input
        name={name}
        type="radio"
        checked={checked}
        onChange={() => {}} // Prevent default onChange behavior
      />
      <span className="checkmark"></span>
    </div>
  );
};

export default CheckBox;
