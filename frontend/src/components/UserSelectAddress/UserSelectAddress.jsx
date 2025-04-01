import React, { useState, useEffect } from "react";
import "./UserSelectAddress.scss";
import SelectAddress from "../SelectAddress/SelectAddress";
import provincesService from "../../services/provincesService";

const UserSelectAddress = ({
  handleToggle,
  tempAddress,
  setTempAddress,
  handleConfirmAddress,
}) => {
  const [addressTypeSelected, setAddressTypeSelected] = useState({
    province: true,
    district: false,
    ward: false,
  });

  // const initTempAddress = {
  //   province: {
  //     name: "",
  //     code: "",
  //   },
  //   district: {
  //     name: "",
  //     code: "",
  //   },
  //   ward: {
  //     name: "",
  //     code: "",
  //   },
  //   specificAddress: "",
  // };
  // const [tempAddress, setTempAddress] = useState(initTempAddress);

  const [address, setAddress] = useState([]);
  const getProvinces = async () => {
    try {
      const response = await provincesService.getProvinces();
      setAddress(response);
    } catch (error) {
      console.error("Failed to fetch provinces: ", error);
    }
  };
  const getDistricts = async (provinceCode) => {
    try {
      const response = await provincesService.getDistricts(provinceCode);
      setAddress(response);
    } catch (error) {
      console.error("Failed to fetch districts: ", error);
    }
  };

  const getWards = async (districtCode) => {
    try {
      const response = await provincesService.getWards(districtCode);
      setAddress(response);
    } catch (error) {
      console.error("Failed to fetch wards: ", error);
    }
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const handleSelectAddressItem = (addressTypeSelected, code, name) => {
    if (addressTypeSelected.province) {
      setTempAddress({
        province: {
          name: name,
          code: code,
        },
        district: {
          name: "",
          code: "",
        },
        ward: {
          name: "",
          code: "",
        },
        specificAddress: "",
      });
      getDistricts(code);
      setAddressTypeSelected({
        province: false,
        district: true,
        ward: false,
      });
    } else if (addressTypeSelected.district) {
      setTempAddress({
        ...tempAddress,
        district: {
          name: name,
          code: code,
        },
        ward: {
          name: "",
          code: "",
        },
        specificAddress: "",
      });
      getWards(code);
      setAddressTypeSelected({
        province: false,
        district: false,
        ward: true,
      });
    } else if (addressTypeSelected.ward) {
      setTempAddress({
        ...tempAddress,
        ward: {
          name: name,
          code: code,
        },
        specificAddress: "",
      });
      setAddressTypeSelected({
        province: false,
        district: false,
        ward: false,
      });
      setAddress([]);
    }
  };

  return (
    <div className="user-select-address-modal">
      <div className="overlay"></div>
      <div className="select-address-modal-inner">
        {tempAddress.ward.code && (
          <div className="wrapper-confirm-address-btn">
            <button
              type="button"
              className="confirm-address-btn"
              disabled={tempAddress.specificAddress === ""}
              onClick={() => {
                handleConfirmAddress(tempAddress);
              }}
            >
              Xác Nhận
            </button>
          </div>
        )}
        <div className="select-address__title">
          <p>Vui lòng chọn địa chỉ nhận hàng</p>
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
        <div className="select-address__content">
          <p className="desciption">Khu vực được chọn</p>
          <button
            className={`address-input`}
            onClick={() => {
              setAddressTypeSelected({
                province: true,
                district: false,
                ward: false,
              });
            }}
          >
            {/* <input
              type="radio"
              name="address-input-radio"
              id="address-input-radio-1"
              checked={addressTypeSelected.province}
              onChange={() =>
                setAddressTypeSelected({
                  province: true,
                  district: false,
                  ward: false,
                })
              }
            />
            <label htmlFor="address-input-radio-1"></label> */}
            <svg
              version="1.0"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width="15px"
              height="15px"
              viewBox="0 0 64 64"
              enable-background="new 0 0 64 64"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#dc2626"
                    d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"
                  />{" "}
                  <path
                    fill="#dc2626"
                    d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"
                  />{" "}
                </g>{" "}
              </g>
            </svg>
            <p>{tempAddress.province.name || "Chọn tỉnh/thành phố"}</p>
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="dropdown-icon"
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#dc2626"
                />{" "}
              </g>
            </svg>
          </button>
          {tempAddress.province.code && (
            <button
              className={`address-input`}
              onClick={() => {
                setAddressTypeSelected({
                  province: false,
                  district: true,
                  ward: false,
                });
              }}
            >
              {/* <input
                type="radio"
                name="address-input-radio"
                id="address-input-radio-2"
                checked={addressTypeSelected.district}
                onChange={() =>
                  setAddressTypeSelected({
                    province: false,
                    district: true,
                    ward: false,
                  })
                }
              />
              <label htmlFor="address-input-radio-2"></label> */}
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      fill="#dc2626"
                      d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"
                    />{" "}
                    <path
                      fill="#dc2626"
                      d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"
                    />{" "}
                  </g>{" "}
                </g>
              </svg>
              <p>{tempAddress.district.name || "Chọn quận/huyện"}</p>
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dropdown-icon"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#dc2626"
                  />{" "}
                </g>
              </svg>
            </button>
          )}
          {tempAddress.district.code && (
            <button
              className={`address-input`}
              onClick={() => {
                setAddressTypeSelected({
                  province: false,
                  district: false,
                  ward: true,
                });
              }}
            >
              {/* <input
                type="radio"
                name="address-input-radio"
                id="address-input-radio-3"
                checked={addressTypeSelected.ward}
                onChange={(e) => {
                  setAddressTypeSelected({
                    province: false,
                    district: false,
                    ward: true,
                  });
                }}
              />
              <label htmlFor="address-input-radio-3"></label> */}
              <svg
                version="1.0"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                viewBox="0 0 64 64"
                enable-background="new 0 0 64 64"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      fill="#dc2626"
                      d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"
                    />{" "}
                    <path
                      fill="#dc2626"
                      d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"
                    />{" "}
                  </g>{" "}
                </g>
              </svg>
              <p>{tempAddress.ward.name || "Chọn Phường/xã"}</p>
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dropdown-icon"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                    fill="#dc2626"
                  />{" "}
                </g>
              </svg>
            </button>
          )}
          {!tempAddress.ward.code && (
            <div className="block-select-address">
              <SelectAddress
                addressType={addressTypeSelected}
                address={address}
                handleSelectAddress={handleSelectAddressItem}
              />
            </div>
          )}
          {tempAddress.ward.code && (
            <div className="specific-address">
              <label htmlFor="specific-address-input" className="heading">
                Địa chỉ cụ thể
              </label>
              <textarea
                name="specific-address-input"
                id="specific-address-input"
                className="specific-address-input"
                value={tempAddress.specificAddress}
                rows="5"
                onChange={(e) =>
                  setTempAddress({
                    ...tempAddress,
                    specificAddress: e.target.value,
                  })
                }
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSelectAddress;
