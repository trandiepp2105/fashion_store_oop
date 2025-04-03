import React from "react";
import "./AccountInfoPopup.scss";
const AccountInfoPopup = ({ handleClose, column = 1 }) => {
  return (
    <div className="account-info-popup">
      <div className="info-container">
        <div className="title">
          <h4>Edit profile</h4>
        </div>
        <div className={`info-content ${column ? `column-${column}` : ""}`}>
          <div className="info-item">
            <div className="info-item__title">Name</div>
            <input type="text" placeholder="Enter your name..." />
          </div>
          <div className="info-item">
            <div className="info-item__title">Email</div>
            <input type="text" placeholder="Enter your email..." />
          </div>
          <div className="info-item">
            <div className="info-item__title">Phone number</div>
            <input type="text" placeholder="Enter your phone number..." />
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleClose}>
            CANCEL
          </button>
          <button className="btn create-btn">SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoPopup;
