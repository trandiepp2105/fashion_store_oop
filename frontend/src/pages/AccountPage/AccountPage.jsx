import React, { useState } from "react";
import "./AccountPage.scss";
import InfoPopup from "../../components/InfoPopup/InfoPopup";
import AccountInfoPopup from "../../components/AccountInfoPopup/AccountInfoPopup";
const AccountPage = () => {
  const [isOpenInfoPopup, setIsOpenInfoPopup] = useState(false);

  const handleToggleInfoPopup = () => {
    setIsOpenInfoPopup(!isOpenInfoPopup);
  };

  const [isOpenAccountInfoPopup, setIsOpenAccountInfoPopup] = useState(false);
  const handleToggleAccountInfoPopup = () => {
    setIsOpenAccountInfoPopup(!isOpenAccountInfoPopup);
  };
  return (
    <div className="page account-page">
      {isOpenInfoPopup && (
        <InfoPopup column={2} handleClose={handleToggleInfoPopup} />
      )}
      {isOpenAccountInfoPopup && (
        <AccountInfoPopup handleClose={handleToggleAccountInfoPopup} />
      )}
      <div className="container">
        <div className="title">
          <p>My Account</p>
        </div>
        <div className="page-content">
          <div className="user-info">
            <div className="user-info-item">
              <div className="user-info-item-title">
                <p>Persional Information</p>
                <button
                  className="edit-btn"
                  onClick={handleToggleAccountInfoPopup}
                >
                  Edit{" "}
                  <svg
                    width="15px"
                    height="15px"
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
                        d="M4 22H8M20 22H12"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />{" "}
                      <path
                        d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />{" "}
                    </g>
                  </svg>
                </button>
              </div>
              <div className="user-info-item-content">
                <div className="subinfo-item">
                  <p className="title">Name</p>
                  <p className="value">Tran Van A</p>
                </div>
                <div className="subinfo-item">
                  <p className="title">Email Address</p>
                  <p className="value">tranvana@gmail.com</p>
                </div>
                <div className="subinfo-item">
                  <p className="title">Phone Number</p>
                  <p className="value">0385320575</p>
                </div>
                <div className="subinfo-item">
                  <p className="title">Account status</p>
                  <p className="value">active</p>
                </div>
                <div className="subinfo-item">
                  <p className="title">Joining Date</p>
                  <p className="value">30/03/2025</p>
                </div>
                <div className="subinfo-item"></div>
              </div>
            </div>

            <div className="user-info-item">
              <div className="user-info-item-title">
                <p>Shipping Infomation</p>
                <button
                  className="add-new-shipping-info-btn"
                  onClick={handleToggleInfoPopup}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke-width="0" />
                    <g stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M7.5 11.25a.75.75 0 0 0 0 1.5zm5 1.5a.75.75 0 0 0 0-1.5zm0-1.5a.75.75 0 0 0 0 1.5zm5 1.5a.75.75 0 0 0 0-1.5zM13.25 12a.75.75 0 0 0-1.5 0zm-1.5 5a.75.75 0 0 0 1.5 0zm0-5a.75.75 0 0 0 1.5 0zm1.5-5a.75.75 0 0 0-1.5 0zM7.5 12.75h5v-1.5h-5zm5 0h5v-1.5h-5zm0-.75h-.75v5h1.5v-5zm.75 0V7h-1.5v5z"
                      fill="#fff"
                    />
                  </svg>
                  Add Shipping Address
                </button>
              </div>
              <div className="user-info-item-content list-shipping-info">
                <div className="shipping-info-item">
                  <button className="edit-btn disabled">
                    Edit{" "}
                    <svg
                      width="15px"
                      height="15px"
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
                          d="M4 22H8M20 22H12"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                        <path
                          d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                  <div className="subinfo-item">
                    <p className="title">Consignee</p>
                    <p className="value">Tran Van A</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Phone Number</p>
                    <p className="value">0385320575</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Default</p>
                    <p className="value">True</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Province / City</p>
                    <p className="value">Hồ Chí Minh</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">District</p>
                    <p className="value">Quận 5</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Dard / Commune</p>
                    <p className="value">Phường 5</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Specific Address</p>
                    <p className="value">số 5, đường abc</p>
                  </div>
                </div>
                <div className="shipping-info-item">
                  <button className="edit-btn disabled">
                    Edit{" "}
                    <svg
                      width="15px"
                      height="15px"
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
                          d="M4 22H8M20 22H12"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                        <path
                          d="M13.8881 3.66293L14.6296 2.92142C15.8581 1.69286 17.85 1.69286 19.0786 2.92142C20.3071 4.14999 20.3071 6.14188 19.0786 7.37044L18.3371 8.11195M13.8881 3.66293C13.8881 3.66293 13.9807 5.23862 15.3711 6.62894C16.7614 8.01926 18.3371 8.11195 18.3371 8.11195M13.8881 3.66293L7.07106 10.4799C6.60933 10.9416 6.37846 11.1725 6.17992 11.4271C5.94571 11.7273 5.74491 12.0522 5.58107 12.396C5.44219 12.6874 5.33894 12.9972 5.13245 13.6167L4.25745 16.2417M18.3371 8.11195L14.9286 11.5204M11.5201 14.9289C11.0584 15.3907 10.8275 15.6215 10.5729 15.8201C10.2727 16.0543 9.94775 16.2551 9.60398 16.4189C9.31256 16.5578 9.00282 16.6611 8.38334 16.8675L5.75834 17.7426M5.75834 17.7426L5.11667 17.9564C4.81182 18.0581 4.47573 17.9787 4.2485 17.7515C4.02128 17.5243 3.94194 17.1882 4.04356 16.8833L4.25745 16.2417M5.75834 17.7426L4.25745 16.2417"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />{" "}
                      </g>
                    </svg>
                  </button>
                  <div className="subinfo-item">
                    <p className="title">Consignee</p>
                    <p className="value">Tran Van A</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Phone Number</p>
                    <p className="value">0385320575</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Default</p>
                    <p className="value">True</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Province / City</p>
                    <p className="value">Hồ Chí Minh</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">District</p>
                    <p className="value">Quận 5</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Dard / Commune</p>
                    <p className="value">Phường 5</p>
                  </div>
                  <div className="subinfo-item">
                    <p className="title">Specific Address</p>
                    <p className="value">số 5, đường abc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
