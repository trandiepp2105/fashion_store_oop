import React, { useState, useEffect } from "react";
import "./ChooseShop.scss";
const ChooseShop = ({
  stores,
  setStores,
  setDeliveryInfo,
  handleToggle,
  handleConfirm,
}) => {
  // const [showCitySlect, setShowCitySelect] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const selectStore = (store) => {
    setStores(
      stores.map((item) =>
        item.id === store.id
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    );
    setSelectedStore(store);
    // setDeliveryInfo((prev) => ({
    //   ...prev,
    //   storeId: store.id,
    // }));
  };
  return (
    <div className="choose-shop-modal">
      <div className="overlay"></div>
      <div className="choose-shop-modal-inner">
        <div className="wrapper-confirm-btn">
          <button
            className="confirm-btn"
            onClick={() => {
              handleConfirm(selectedStore.id);
              // handleToggle();
            }}
          >
            Xác nhận
          </button>
        </div>
        <div className="choose-shop__title">
          <p>Chọn cửa hàng đang có hàng</p>
          <button
            className="close-btn"
            onClick={(event) => {
              event.stopPropagation();
              // setShowDiscountModal(false);
              handleToggle();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="#090d14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.2097 6.3871L6.29289 6.29289C6.65338 5.93241 7.22061 5.90468 7.6129 6.2097L7.70711 6.29289L14 12.585L20.2929 6.29289C20.6834 5.90237 21.3166 5.90237 21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L15.415 14L21.7071 20.2929C22.0676 20.6534 22.0953 21.2206 21.7903 21.6129L21.7071 21.7071C21.3466 22.0676 20.7794 22.0953 20.3871 21.7903L20.2929 21.7071L14 15.415L7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071C5.90237 21.3166 5.90237 20.6834 6.29289 20.2929L12.585 14L6.29289 7.70711C5.93241 7.34662 5.90468 6.77939 6.2097 6.3871L6.29289 6.29289L6.2097 6.3871Z"></path>
            </svg>
          </button>
        </div>
        <div className="choose-shop__content">
          {/* <div className="select-shop">
            <div className="select-shop-item select-city">
              <input
                type="text"
                placeholder="Tỉnh/Thành phố"
                onFocus={(event) => {
                  event.preventDefault();
                  setShowCitySelect(true);
                }}
                onBlur={(event) => {
                  event.preventDefault();
                  setShowCitySelect(false);
                }}
                onChange={(event) => {
                  event.preventDefault();
                }}
              />
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--iconOnWhiteSecondary)"
                className="dropdown-icon"
              >
                <path
                  d="M3.20041 6.40641C3.48226 6.10288 3.95681 6.0853 4.26034 6.36716L8 9.89327L11.7397 6.36716C12.0432 6.0853 12.5177 6.10288 12.7996 6.40641C13.0815 6.70995 13.0639 7.18449 12.7603 7.46635L8.51034 11.4663C8.22258 11.7336 7.77743 11.7336 7.48967 11.4663L3.23966 7.46635C2.93613 7.18449 2.91856 6.70995 3.20041 6.40641Z"
                  fill="inherit"
                ></path>
              </svg>
              {showCitySlect && (
                <ul className="list-city">
                  <li className="city-item">Hồ Chí Minh</li>
                  <li className="city-item">Hà Nội</li>
                  <li className="city-item">Đà Nẵng</li>
                  <li className="city-item">Cần Thơ</li>
                  <li className="city-item">Lâm Đồng</li>
                </ul>
              )}
            </div>
            <div className="select-shop-item select-district">
              <input type="text" placeholder="Quận/Huyện" />
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--iconOnWhiteSecondary)"
                className="dropdown-icon"
              >
                <path
                  d="M3.20041 6.40641C3.48226 6.10288 3.95681 6.0853 4.26034 6.36716L8 9.89327L11.7397 6.36716C12.0432 6.0853 12.5177 6.10288 12.7996 6.40641C13.0815 6.70995 13.0639 7.18449 12.7603 7.46635L8.51034 11.4663C8.22258 11.7336 7.77743 11.7336 7.48967 11.4663L3.23966 7.46635C2.93613 7.18449 2.91856 6.70995 3.20041 6.40641Z"
                  fill="inherit"
                ></path>
              </svg>
            </div>
          </div> */}
          <div className="list-store">
            {stores?.map((store, index) => (
              <div
                className={`store-item ${
                  store.selected ? "store-item--active" : ""
                }`}
                key={index}
                onClick={() => selectStore(store)}
              >
                <div className="store-item__header">
                  <p className="store-item__name">{store.name}</p>
                  <div className="select-store-radio">
                    <input
                      type="radio"
                      name="select-store"
                      id={`select-store-${store.id}`}
                      checked={store.selected}
                      onChange={() => selectStore(store)}
                    />
                    <label htmlFor={`select-store-${store.id}`}></label>
                  </div>
                </div>
                <p className="store-address">{store.full_address}</p>
                <div className="store-item__footer">
                  <button className="go-to-map-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M11.7616 3.07403C10.7853 2.09772 9.20237 2.09772 8.22606 3.07403L3.0545 8.2456C2.07819 9.22191 2.07819 10.8048 3.0545 11.7811L8.22607 16.9527C9.20238 17.929 10.7853 17.929 11.7616 16.9527L16.9332 11.7811C17.9095 10.8048 17.9095 9.22191 16.9332 8.2456L11.7616 3.07403ZM10.6403 6.15986C10.8355 5.9646 11.1521 5.9646 11.3474 6.15986L12.8474 7.65989C13.0427 7.85515 13.0427 8.17174 12.8474 8.367L11.3474 9.86703C11.1521 10.0623 10.8355 10.0623 10.6403 9.86703C10.445 9.67177 10.445 9.35519 10.6403 9.15992L11.2867 8.51346H10.4938C9.66541 8.51346 8.99383 9.18504 8.99383 10.0135V12.5135C8.99383 12.7896 8.76997 13.0135 8.49383 13.0135C8.21769 13.0135 7.99383 12.7896 7.99383 12.5135V10.0135C7.99383 8.63275 9.11312 7.51346 10.4938 7.51346H11.2868L10.6403 6.86697C10.445 6.67171 10.445 6.35512 10.6403 6.15986Z"
                        fill="white"
                      ></path>
                    </svg>
                    Xem trên bản đồ
                  </button>

                  <div className="time-delivery">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_6666_363764)">
                        <path
                          d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM14.3748 10C14.72 10 14.9998 9.72018 14.9998 9.375V6.875C14.9998 6.52982 14.72 6.25 14.3748 6.25C14.0297 6.25 13.7498 6.52982 13.7498 6.875V7.74521C12.9846 6.47519 11.5922 5.625 10.0001 5.625C8.70428 5.625 7.53942 6.18913 6.73922 7.08318C6.50902 7.34038 6.53091 7.73551 6.78811 7.96571C7.04531 8.19591 7.44044 8.17403 7.67064 7.91682C8.24374 7.2765 9.0746 6.875 10.0001 6.875C11.2807 6.875 12.3827 7.6456 12.8652 8.75H11.8748C11.5297 8.75 11.2498 9.02982 11.2498 9.375C11.2498 9.72018 11.5297 10 11.8748 10H14.3748ZM5.00015 10.625V13.125C5.00015 13.4702 5.27997 13.75 5.62515 13.75C5.97033 13.75 6.25015 13.4702 6.25015 13.125V12.2546C7.01539 13.5247 8.40787 14.375 10.0001 14.375C11.2959 14.375 12.4607 13.8109 13.2609 12.9168C13.4911 12.6596 13.4692 12.2645 13.212 12.0343C12.9548 11.8041 12.5597 11.826 12.3295 12.0832C11.7564 12.7235 10.9255 13.125 10.0001 13.125C8.71946 13.125 7.61742 12.3544 7.13491 11.25H8.12515C8.47033 11.25 8.75015 10.9702 8.75015 10.625C8.75015 10.2798 8.47033 10 8.12515 10H5.62515C5.27997 10 5.00015 10.2798 5.00015 10.625Z"
                          fill="#D97706"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_6666_363764">
                          <rect width="20" height="20" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Lấy hàng sau 3 - 5 ngày</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseShop;
