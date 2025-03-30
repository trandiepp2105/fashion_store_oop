import React from "react";
import "./AcceptancePopup.scss";
const AcceptancePopup = ({
  handleClose,
  handleAccept,
  description = "Are you sure you want to delete this order?",
}) => {
  return (
    <div className="acceptance-popup">
      <div className="acceptance-popup-inner">
        <button type="button" className="close" onClick={handleClose}>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                opacity="0.4"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#292D32"
              />{" "}
              <path
                d="M13.0594 12.0001L15.3594 9.70011C15.6494 9.41011 15.6494 8.93011 15.3594 8.64011C15.0694 8.35011 14.5894 8.35011 14.2994 8.64011L11.9994 10.9401L9.69937 8.64011C9.40937 8.35011 8.92937 8.35011 8.63938 8.64011C8.34938 8.93011 8.34938 9.41011 8.63938 9.70011L10.9394 12.0001L8.63938 14.3001C8.34938 14.5901 8.34938 15.0701 8.63938 15.3601C8.78938 15.5101 8.97937 15.5801 9.16937 15.5801C9.35937 15.5801 9.54937 15.5101 9.69937 15.3601L11.9994 13.0601L14.2994 15.3601C14.4494 15.5101 14.6394 15.5801 14.8294 15.5801C15.0194 15.5801 15.2094 15.5101 15.3594 15.3601C15.6494 15.0701 15.6494 14.5901 15.3594 14.3001L13.0594 12.0001Z"
                fill="#292D32"
              />{" "}
            </g>
          </svg>
        </button>
        <div className="wrapper-assistant-logo">
          <img src="/assets/assistant-non-bg.png" alt="" />
        </div>
        <p className="description">{description}</p>
        <div className="group-login-btn">
          <button className="link-button close-button" onClick={handleClose}>
            Cancle
          </button>

          <button className="link-button accept-btn" onClick={handleAccept}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptancePopup;
