import React, { useState } from "react";
import "./PopupEditOrderInfo.scss";

const PopupEditOrderInfo = ({
  handleToggle,
  orderInfor = {},
  orderInfoName = "customer info",
}) => {
  const [orderInforTemp, setOrderInforTemp] = useState(orderInfor);

  const handleChange = (e, key) => {
    setOrderInforTemp((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Order Info:", orderInforTemp);
  };

  return (
    <div className="create-category-popup">
      <div className="container">
        <form className="popup" onSubmit={handleSubmit}>
          <h3 className="title">Edit {orderInfoName}</h3>
          <div className="popup-content">
            {Object.entries(orderInforTemp)
              .filter(([key]) => key !== "id") // Loại bỏ key "id"
              .map(([key, value]) => (
                <div className="input-container" key={key}>
                  <p className="input-title">{key}</p>
                  <input
                    type="text"
                    className="input-text"
                    value={value}
                    onChange={(e) => handleChange(e, key)}
                  />
                </div>
              ))}
          </div>

          {/* Buttons */}
          <div className="popup-service">
            <button
              type="button"
              className="popup-btn cancel-btn"
              onClick={handleToggle}
            >
              Cancel
            </button>
            <button type="submit" className="popup-btn save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditOrderInfo;
