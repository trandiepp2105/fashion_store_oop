import React, { useState, useEffect } from "react";
import "./SelectAddress.scss";
import provincesService from "../../services/provincesService";
const SelectAddress = ({ addressType, address, handleSelectAddress }) => {
  console.log("address", address);
  return (
    <div className="select-address">
      <div className="wrapper-search-input">
        <label className="search-input">
          <input type="text" name="search-input" id="search-input" />
          <button className="search-btn">
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
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>
            </svg>
          </button>
        </label>
      </div>
      <div className="block-address-option">
        {address.map((addressItem, index) => (
          <button
            className="address-option"
            key={index}
            onClick={() => {
              handleSelectAddress(
                addressType,
                addressItem.code,
                addressItem.name
              );
            }}
          >
            <div>{addressItem.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectAddress;
