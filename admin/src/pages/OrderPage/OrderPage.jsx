import React, { useRef, useEffect, useState } from "react";
import "./OrderPage.scss";

import FilterPopup from "../../components/FilterPopup/FilterPopup";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import formatCurrencyVN from "../../utils/formatCurrencyVN";
const OrderPage = () => {
  const listOrderRef = useRef(null);
  const [distanceListOrderToBottom, setDistanceListOrderToBottom] = useState(0);

  // State lưu trữ filter đang mở
  const [openFilter, setOpenFilter] = useState(false);

  // Hàm toggle filter
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };
  const listProductFilter = [
    {
      name: "Status",
      options: [
        { name: "Pending", selected: true },
        { name: "Confirmed", selected: false },
        { name: "Packaging", selected: false },
        { name: "Shipping", selected: false },
        { name: "Delivering", selected: false },
        { name: "Delivered", selected: false },
        { name: "Canceled", selected: false },
        { name: "Refunded", selected: false },
      ],
      active: true,
    },
    {
      name: "Payment",
      options: [
        { name: "Paypal", selected: false },
        { name: "Stripe", selected: false },
        { name: "Cash", selected: false },
        { name: "Credit Card", selected: false },
      ],
      active: true,
    },
    {
      name: "Shipping",
      options: [
        { name: "Fedex", selected: false },
        { name: "UPS", selected: false },
        { name: "DHL", selected: false },
        { name: "USPS", selected: false },
      ],
      active: true,
    },
    {
      name: "Category",
      options: [
        { name: "Electronics", selected: false },
        { name: "Clothing", selected: false },
        { name: "Shoes", selected: false },
        { name: "Accessories", selected: false },
      ],
      active: true,
    },

    {
      name: "Date",
      active: true,
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order",
      width: 70,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "customer",
      headerName: "Customer",
      // width: 150,
      flex: 1.5,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      // width: 130,
      flex: 1,
      justifyContent: "center",
      sortable: true,
      filterable: false,
      hidable: false,
      renderCell: (params) => (
        <Box width={"100%"} height={"100%"} display="flex" gap={1}>
          <div className="box-order-status-item">
            <span
              className={`order-status-item ${
                params.row.status === "Pending" ? "pending" : ""
              } ${params.row.status === "Packaged" ? "packaged" : ""} ${
                params.row.status === "Delivering" ? "delivering" : ""
              } ${params.row.status === "Delivered" ? "delivered" : ""} ${
                params.row.status === "Canceled" ? "canceled" : ""
              } `}
            >
              {params.row.status}
            </span>
          </div>
        </Box>
      ),
    },
    {
      field: "total",
      headerName: "Total Order",
      // width: 150,
      flex: 1.5,
      justifyContent: "center",
      sortable: true,
      filterable: false,
      typeof: "number",
      hidable: false,
      renderCell: (params) => (
        <Box width={"100%"} height={"100%"} display="flex" gap={1}>
          <span
            style={{
              color: "rgb(6, 178, 244)",
            }}
          >
            {formatCurrencyVN(params.row.total)}
          </span>
        </Box>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      // width: 130,
      flex: 1,
      hidable: false,
      filterable: false,
      valueFormatter: (params) => dayjs(params.value).format("MM/DD/YYYY"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      justifyContent: "center",
      sortable: false, // Không cần sắp xếp
      filterable: false, // Không cần lọc
      hidable: false,
      renderCell: (params) => (
        <Box width={"100%"} height={"100%"} display="flex" gap={1}>
          <Link
            to={`/orders/${params.row.id}`}
            className="action-detail-link"
            style={{
              color: "#733ab0",
              cursor: "pointer",
            }}
          >
            Details
          </Link>
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      customer: "Jon Snow",
      status: "Packaged",
      total: 1500000,
      date: "2024-02-01",
    },
    {
      id: 2,
      customer: "Cersei Lannister",
      status: "Delivered",
      total: 1500000,
      date: "2024-02-02",
    },
    {
      id: 3,
      customer: "Jaime Lannister",
      status: "Delivering",
      total: 1500000,
      date: "2024-02-03",
    },
    {
      id: 4,
      customer: "Arya Stark",
      status: "Delivered",
      total: 1500000,
      date: "2024-02-04",
    },
    {
      id: 5,
      customer: "Daenerys Targaryen",
      status: "Canceled",
      total: 1500000,
      date: "2024-02-05",
    },
    {
      id: 6,
      customer: "Melisandre",
      status: "Pending",
      total: 1500000,
      date: "2024-02-06",
    },
    {
      id: 7,
      customer: "Ferrara Clifford",
      status: "Canceled",
      total: 1500000,
      date: "2024-02-07",
    },
    {
      id: 8,
      customer: "Rossini Frances",
      status: "Delivering",
      total: 1500000,
      date: "2024-02-08",
    },
    {
      id: 9,
      customer: "Harvey Roxie",
      status: "Delivering",
      total: 1500000,
      date: "2024-02-09",
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const updatePosition = () => {
      if (listOrderRef.current) {
        console.log("updatePosition");
        const rect = listOrderRef.current.getBoundingClientRect();
        setDistanceListOrderToBottom(window.innerHeight - rect.top);
        console.log(window.innerHeight - rect.top);
      }
    };

    updatePosition(); // Gọi lần đầu khi component mount
    window.addEventListener("resize", updatePosition); // Cập nhật khi resize

    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div className="order-page">
      <div className="page-content">
        <div className="header">
          <h3 className="title">Orders</h3>
          <div className="actions">
            {/* <button className="btn btn-add">
              <svg
                width="10px"
                height="10px"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                    fill="#ffffff"
                  />{" "}
                </g>
              </svg>
              Add Order
            </button> */}
            <button className="btn btn-export">
              <svg
                width="10px"
                height="10px"
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
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z"
                    fill="#000000"
                  />{" "}
                </g>
              </svg>
              Export
            </button>
          </div>
        </div>
        {/* <div className="order-statistics">
          <div className="statistics-item">
            <div className="icon">
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
                    d="M21.9844 10C21.9473 8.68893 21.8226 7.85305 21.4026 7.13974C20.8052 6.12523 19.7294 5.56066 17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L6.42229 4.43152C4.27063 5.56066 3.19479 6.12523 2.5974 7.13974C2 8.15425 2 9.41667 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27063 18.4393 6.42229 19.5685L8.42229 20.618C10.1779 21.5393 11.0557 22 12 22C12.9443 22 13.8221 21.5393 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C21.8226 16.1469 21.9473 15.3111 21.9844 14"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />{" "}
                  <path
                    d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5"
                    stroke="#1C274C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />{" "}
                </g>
              </svg>
            </div>
            <div className="statistics-item__detail">
              <p className="title">Total orders</p>
              <span className="value">879</span>
            </div>
          </div>

          <div className="statistics-item">
            <div className="icon">
              <svg
                width="15px"
                height="15px"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
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
                  <g id="Layer_2" data-name="Layer 2">
                    {" "}
                    <g id="invisible_box" data-name="invisible box">
                      {" "}
                      <rect width="48" height="48" fill="none" />{" "}
                    </g>{" "}
                    <g id="Health_Icons" data-name="Health Icons">
                      {" "}
                      <g>
                        {" "}
                        <path d="M37.7,11.1A3,3,0,0,0,35.4,10H34.2l.3-1.7A3.1,3.1,0,0,0,33.9,6a3.2,3.2,0,0,0-2.2-1H7.8a2,2,0,0,0,0,4H30.3l-4,22.9a6.8,6.8,0,0,0-1,2.1H20.7A7,7,0,0,0,7.3,34H6.2l.5-2.9a2,2,0,0,0-1.6-2.3,2,2,0,0,0-2.3,1.6L2,34.7A2.8,2.8,0,0,0,2.7,37a2.8,2.8,0,0,0,2.1,1H7.3a7,7,0,0,0,13.4,0h4.6a7,7,0,0,0,13.4,0h2a3.2,3.2,0,0,0,3.1-2.7L46,22.5ZM14,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,14,39ZM33.5,14h1.3l5.9,8H32.1ZM32,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,32,39Zm8-5H38.7A7,7,0,0,0,32,29H30.9l.5-3.1h9.9Z" />{" "}
                        <path d="M4,15H14a2,2,0,0,0,0-4H4a2,2,0,0,0,0,4Z" />{" "}
                        <path d="M15,19a2,2,0,0,0-2-2H5a2,2,0,0,0,0,4h8A2,2,0,0,0,15,19Z" />{" "}
                        <path d="M6,23a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4Z" />{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="statistics-item__detail">
              <p className="title">Delivering</p>
              <span className="value">500</span>
            </div>
          </div>
          <div className="statistics-item">
            <div className="icon">
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                width="15px"
                height="15px"
                viewBox="0 0 612 612"
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
                    <path d="M580.592,135.703L497.33,98.681L234.478,222.254v79.353l-45.854-20.389v-79.353L451.477,78.293l-88.287-39.256 c-11.822-5.256-31.166-5.256-42.987,0l-217.401,96.666c-17.319,7.701-31.453,29.51-31.409,48.464l0.339,143.238 c13.628-4.385,28.128-6.806,43.195-6.806c77.949,0,141.373,63.424,141.373,141.382c0,20.36-4.413,39.682-12.196,57.188 l76.764,32.815c11.436,4.888,30.146,4.889,41.583,0.002l216.905-92.694c17.614-7.527,32.062-29.357,32.107-48.513L612,184.166 C612.044,165.212,597.911,143.403,580.592,135.703z M496.655,300.16l29.458-62.149c2.974-6.273,10.429-9.892,13.413-6.49 l30.229,34.461c3.019,3.441-0.812,11.277-6.869,14.087l-12.724,5.903l-0.257,89.528c-0.012,3.912-3.467,8.569-7.708,10.399 l-19.049,8.223c-4.176,1.803-7.554,0.132-7.556-3.729l-0.064-88.354l-12.325,5.718C497.407,310.446,493.778,306.23,496.655,300.16z M388.039,350.943l26.773-59.078c2.7-5.959,9.604-9.312,12.422-6.012l28.532,33.423c2.85,3.336-0.628,10.779-6.237,13.381 l-11.782,5.466l0.76,85.727c0.033,3.749-3.135,8.163-7.066,9.86l-17.664,7.625c-3.873,1.672-7.042,0.025-7.087-3.675l-1.035-84.647 l-11.429,5.302C388.852,360.808,385.422,356.718,388.039,350.943z M583.911,399.271c-0.014,1.967-1.781,4.298-3.946,5.208 l-201.751,84.757c-1.883,0.791-3.432-0.037-3.459-1.851l-0.155-9.861c-0.028-1.817,1.476-3.942,3.361-4.745l202.111-86.097 c2.17-0.924,3.92-0.075,3.908,1.896L583.911,399.271z M114.925,347.054C51.454,347.054,0,398.508,0,461.979 c0,63.472,51.454,114.926,114.925,114.926s114.925-51.454,114.925-114.926C229.851,398.508,178.396,347.054,114.925,347.054z M190.021,438.367l-70.724,79.563c-3.484,3.919-8.335,5.932-13.221,5.932c-3.881,0-7.783-1.27-11.038-3.877l-44.202-35.361 c-7.624-6.095-8.862-17.223-2.759-24.846c6.095-7.632,17.228-8.867,24.851-2.763l31.093,24.872l59.574-67.02 c6.479-7.295,17.659-7.959,24.958-1.468C195.853,419.893,196.509,431.063,190.021,438.367z" />{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="statistics-item__detail">
              <p className="title">Delivered</p>
              <span className="value">200</span>
            </div>
          </div>
          <div className="statistics-item">
            <div className="icon">
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
                  <path
                    d="M19.6 3H8.4A2.4 2.4 0 0 0 6 5.4v11.2A2.4 2.4 0 0 0 8.4 19h11.2a2.4 2.4 0 0 0 2.4-2.4V5.4A2.4 2.4 0 0 0 19.6 3Z"
                    fill="#000000"
                    fill-opacity=".16"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />

                  <path
                    d="M20 22H8.4C5.42 22 3 19.58 3 16.6V5M16.828 13.829l-5.656-5.657M16.828 8.172l-5.656 5.656"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
            </div>
            <div className="statistics-item__detail">
              <p className="title">Canceled</p>
              <span className="value">20</span>
            </div>
          </div>
          <div className="statistics-item">
            <div className="icon">
              <svg
                fill="#000000"
                width="15px"
                height="15px"
                viewBox="0 0 512 512"
                enable-background="new 0 0 512 512"
                version="1.1"
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
                  <g id="Layer_1" />{" "}
                  <g id="Layer_2">
                    {" "}
                    <g>
                      {" "}
                      <path d="M256.1,424.2c44.9,0,87.1-17.5,118.9-49.3c29.5-29.5,46.9-68.7,49-110.4c0.2-4.1-3-7.7-7.1-7.9c-4.1-0.2-7.7,3-7.9,7.1 c-1.9,37.9-17.8,73.6-44.7,100.5c-28.9,28.9-67.4,44.9-108.3,44.9s-79.4-15.9-108.3-44.9c-59.7-59.7-59.7-156.9,0-216.6 c50.9-50.9,130.1-59.4,190.3-21.1l-16.9,20.7l48.5-4.9l-4.9-48.5l-17.1,21c-66.3-43.2-154.2-34.1-210.5,22.2 c-65.6,65.6-65.6,172.2,0,237.8C169,406.7,211.2,424.2,256.1,424.2z" />{" "}
                      <path d="M335.4,221.4c0-0.1,0-0.2-0.1-0.2c0-0.2-0.1-0.3-0.1-0.5c0-0.1-0.1-0.3-0.1-0.4c0-0.1-0.1-0.2-0.1-0.3 c-0.2-0.5-0.4-0.9-0.7-1.3c0,0,0,0,0,0L302.5,172c-1.4-2.1-3.7-3.3-6.2-3.3h-80.6c-2.5,0-4.8,1.2-6.2,3.3l-31.8,46.6c0,0,0,0,0,0 c-0.3,0.4-0.5,0.9-0.7,1.3c0,0.1-0.1,0.2-0.1,0.3c-0.1,0.1-0.1,0.3-0.1,0.4c0,0.2-0.1,0.3-0.1,0.5c0,0.1,0,0.2-0.1,0.2 c-0.1,0.5-0.2,1-0.2,1.5c0,0,0,0,0,0v112.9c0,4.1,3.4,7.5,7.5,7.5H328c4.1,0,7.5-3.4,7.5-7.5V222.9c0,0,0,0,0,0 C335.5,222.3,335.5,221.8,335.4,221.4z M219.7,183.7h72.6l21.5,31.6H198.1L219.7,183.7z M320.5,328.3H191.5v-97.9h129.1V328.3z" />{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="statistics-item__detail">
              <p className="title">Returns</p>
              <span className="value">25</span>
            </div>
          </div>
        </div> */}
        <div className="quick-access-bar">
          {/* <div className="list-quick-filter-item">
            <div className="quick-filter-item active">
              <p className="quicl-filter-item__name">All</p>
              <span className="quicl-filter-item__value">40</span>
            </div>

            <div className="quick-filter-item">
              <p className="quicl-filter-item__name">Packaged</p>
              <span className="quicl-filter-item__value">40</span>
            </div>
            <div className="quick-filter-item">
              <p className="quicl-filter-item__name">Delivering</p>
              <span className="quicl-filter-item__value">40</span>
            </div>
            <div className="quick-filter-item">
              <p className="quicl-filter-item__name">Delivered</p>
              <span className="quicl-filter-item__value">40</span>
            </div>
            <div className="quick-filter-item">
              <p className="quicl-filter-item__name">Cancel</p>
              <span className="quicl-filter-item__value">40</span>
            </div>
            <div className="quick-filter-item">
              <p className="quicl-filter-item__name">Return</p>
              <span className="quicl-filter-item__value">40</span>
            </div>
          </div> */}
          <div className="left-side">
            <div className="filter-order-by-status-bar">
              <button type="button" className="status-item active">
                All Status
              </button>
              <button type="button" className="status-item">
                Pending
              </button>
              <button type="button" className="status-item">
                Packaged
              </button>
              <button type="button" className="status-item">
                Delivering
              </button>
              <button type="button" className="status-item">
                Delivered
              </button>
              <button type="button" className="status-item">
                Cancelled
              </button>
            </div>
          </div>
          <div className="right-side">
            <div className="search-bar">
              <span className="wrapper-search-icon">
                <svg
                  width="20px"
                  height="20px"
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
                    <g clip-path="url(#clip0_15_152)">
                      {" "}
                      <rect width="24" height="24" fill="#f0f2f5" />{" "}
                      <circle
                        cx="10.5"
                        cy="10.5"
                        r="6.5"
                        stroke="#000000"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                        fill="#000000"
                      />{" "}
                    </g>{" "}
                    <defs>
                      {" "}
                      <clipPath id="clip0_15_152">
                        {" "}
                        <rect width="24" height="24" fill="white" />{" "}
                      </clipPath>{" "}
                    </defs>{" "}
                  </g>
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search orders ..."
                className="search-input"
              />
            </div>
            <div className="wrapper-filter-box wrapper-select-date-box">
              <button className="toggle-filter-popup-btn togle-select-date-box">
                <svg
                  width="20px"
                  height="20px"
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
                      d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M7 4V2.5"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M17 4V2.5"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M21.5 9H16.625H10.75M2 9H5.875"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z"
                      fill="#828282"
                    />{" "}
                    <path
                      d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z"
                      fill="#828282"
                    />{" "}
                    <path
                      d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
                      fill="#828282"
                    />{" "}
                    <path
                      d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
                      fill="#828282"
                    />{" "}
                    <path
                      d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z"
                      fill="#828282"
                    />{" "}
                    <path
                      d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z"
                      fill="#828282"
                    />{" "}
                  </g>
                </svg>
                Date
              </button>
            </div>
            <div className="wrapper-filter-box">
              <button
                className="toggle-filter-popup-btn"
                type="button"
                onClick={toggleFilter}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="matrix(1, 0, 0, -1, 0, 0)rotate(90)"
                  stroke="#f0f2f5"
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
                      d="M5 12L5 4"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M19 20L19 17"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M5 20L5 16"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M19 13L19 4"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M12 7L12 4"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <path
                      d="M12 20L12 11"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <circle
                      cx="5"
                      cy="14"
                      r="2"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <circle
                      cx="12"
                      cy="9"
                      r="2"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                    <circle
                      cx="19"
                      cy="15"
                      r="2"
                      stroke="#3d3d3d"
                      stroke-linecap="round"
                    />{" "}
                  </g>
                </svg>
                Filter
              </button>

              {openFilter && <FilterPopup />}
            </div>
          </div>
        </div>

        <div
          className="list-order"
          ref={listOrderRef}
          style={{ height: `${distanceListOrderToBottom}px` }}
        >
          <Paper sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              //   pageSizeOptions={[6, 10]}
              checkboxSelection
              sx={{
                border: 0,
                "--height": "45px",
                "& .MuiDataGrid-row": {
                  cursor: "pointer",
                  height: "45px !important",
                  minHeight: "45px !important",
                  maxHeight: "45px !important",
                },
                "& .MuiDataGrid-cell": {
                  height: "45px !important",
                },
              }}
              //   autoPageSize={false}
              //   pageSize={10}
            />
          </Paper>
        </div>
      </div>
      {/* <div className="statistics-side"></div> */}
    </div>
  );
};

export default OrderPage;
