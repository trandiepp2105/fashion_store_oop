import React, { useState } from "react";
import "./ProductDetailPage.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Options from "../../components/Options/Options";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import PopupVariant from "../../components/PopupVariant/PopupVariant";
import AcceptancePopup from "../../components/AcceptancePopup/AcceptancePopup";
const ProductDetailPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Supplier 1" },
    { id: 2, name: "Supplier 2" },
    { id: 3, name: "Supplier 3" },
    { id: 4, name: "Supplier 4" },
    { id: 5, name: "Supplier 5" },
    { id: 6, name: "Supplier 6" },
    { id: 7, name: "Supplier 7" },
    { id: 8, name: "Supplier 8" },
    { id: 9, name: "Supplier 9" },
    { id: 10, name: "Supplier 10" },
    { id: 11, name: "Supplier 11" },
    { id: 12, name: "Supplier 12" },
    { id: 13, name: "Supplier 13" },
    { id: 14, name: "Supplier 14" },
    { id: 15, name: "Supplier 15" },
    { id: 16, name: "Supplier 16" },
    { id: 17, name: "Supplier 17" },
    { id: 18, name: "Supplier 18" },
    { id: 19, name: "Supplier 19" },
    { id: 20, name: "Supplier 20" },
  ]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const handleSelectSupplier = (option) => {
    setSelectedSupplier(option);
  };
  const [isOpenSupplierOption, setIsOpenSupplierOption] = useState(false);

  const handleToggleSupplierOption = () => {
    setIsOpenSupplierOption(!isOpenSupplierOption);
  };

  const columns = [
    {
      field: "id",
      width: 0,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "size",
      headerName: "Size",
      // width: 150,
      flex: 1,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "color",
      headerName: "Color",
      // width: 150,
      flex: 1,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "stock",
      headerName: "Stock",
      // width: 150,
      flex: 1,
      sortable: false,
      hidable: false,
      filterable: false,
    },
    {
      field: "image_url",
      headerName: "Image",
      width: 80,
      // flex: 1,
      justifyContent: "center",
      sortable: true,
      filterable: false,
      hidable: false,
      renderCell: (params) => (
        <Box width={"100%"} height={"100%"} display="flex" gap={1}>
          <div className="wrapper-variant-image">
            <img src={params.row.image_url} alt="" />
          </div>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      //   flex: 0.75,
      justifyContent: "center",
      sortable: false, // Không cần sắp xếp
      filterable: false, // Không cần lọc
      renderCell: (params) => (
        <Box
          width={"100%"}
          height={"100%"}
          display="flex"
          alignItems={"center"}
          gap={2}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Show products");
              handleToggleEditVariant();
              setSelectedVariant(params.row);
            }}
            className="action-detail-link"
            style={{
              color: "#733ab0",
              cursor: "pointer",
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              outline: "none",
              //   width: "50%",
            }}
          >
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
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.186 2.09c.521.25 1.136.612 1.625 1.101.49.49.852 1.104 1.1 1.625.313.654.11 1.408-.401 1.92l-7.214 7.213c-.31.31-.688.541-1.105.675l-4.222 1.353a.75.75 0 0 1-.943-.944l1.353-4.221a2.75 2.75 0 0 1 .674-1.105l7.214-7.214c.512-.512 1.266-.714 1.92-.402zm.211 2.516a3.608 3.608 0 0 0-.828-.586l-6.994 6.994a1.002 1.002 0 0 0-.178.241L9.9 14.102l2.846-1.496c.09-.047.171-.107.242-.178l6.994-6.994a3.61 3.61 0 0 0-.586-.828zM4.999 5.5A.5.5 0 0 1 5.47 5l5.53.005a1 1 0 0 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.754.977.978.442.236.866.318 1.627.318h12.154c.76 0 1.185-.082 1.627-.318.42-.224.754-.559.978-.978.236-.442.318-.866.318-1.627V13a1 1 0 1 0-2 0v5.077c0 .459-.021.571-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5z"
                  fill="#585a59"
                />
              </g>
            </svg>
          </button>
          <button
            className="action-detail-link delete-variant-btn"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete variant");
              handleToggleDeleteVariantPopup();
              setSelectedVariant(params.row);
            }}
            style={{
              color: "#733ab0",
              border: "none",
              background: "none",
              outline: "none",
              cursor: "pointer",
            }}
          >
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
                  d="M10 12V17"
                  stroke="#fc1d1d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M14 12V17"
                  stroke="#fc1d1d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M4 7H20"
                  stroke="#fc1d1d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="#fc1d1d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#fc1d1d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />{" "}
              </g>
            </svg>
          </button>
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      size: "S",
      color: "Red",
      stock: 10,
      image_url:
        "https://product.hstatic.net/1000321269/product/kich_thuoc_web_to_bc9187ff6e7c44e78b28687c55c0a64b_master.jpg",
    },
    {
      id: 2,
      size: "M",
      color: "Red",
      stock: 10,
      image_url:
        "https://product.hstatic.net/1000321269/product/kich_thuoc_web_to_bc9187ff6e7c44e78b28687c55c0a64b_master.jpg",
    },
    {
      id: 3,
      size: "L",
      color: "Red",
      stock: 10,
      image_url:
        "https://product.hstatic.net/1000321269/product/kich_thuoc_web_to_bc9187ff6e7c44e78b28687c55c0a64b_master.jpg",
    },
    {
      id: 4,
      size: "XL",
      color: "Red",
      stock: 10,
      image_url:
        "https://product.hstatic.net/1000321269/product/kich_thuoc_web_to_bc9187ff6e7c44e78b28687c55c0a64b_master.jpg",
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const [mainCategories, setMainCategories] = useState([
    {
      id: 1,
      name: "Men fashion",
    },
    {
      id: 2,
      name: "Women fashion",
    },
    {
      id: 3,
      name: "Kid fashion",
    },
    {
      id: 4,
      name: "Unisex fashion",
    },
  ]);

  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const handleSelectMainCategory = (option) => {
    setSelectedMainCategory(option);
  };
  const [subCategories, setSubCategories] = useState([
    {
      id: 1,
      name: "Tops and Shirts",
    },
    {
      id: 2,
      name: "Pants & Bottoms",
    },
    {
      id: 3,
      name: "Accessories",
    },
  ]);

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const handleSelectSubCategory = (option) => {
    setSelectedSubCategory(option);
  };

  const [subCategoriesLevel2, setSubCategoriesLevel2] = useState([
    {
      id: 1,
      name: "T-Shirts",
    },
    {
      id: 2,
      name: "Outerwear Jackets",
    },
    {
      id: 3,
      name: "Polo Shirts",
    },
    {
      id: 4,
      name: "Hoodies & Sweatshirts",
    },
  ]);
  const [selectedSubCategoryLevel2, setSelectedSubCategoryLevel2] =
    useState(null);
  const handleSelectSubCategoryLevel2 = (option) => {
    setSelectedSubCategoryLevel2(option);
  };
  const [isOpenCreateVariant, setIsOpenCreateVariant] = useState(false);
  const handleToggleCreateVariant = () => {
    setIsOpenCreateVariant(!isOpenCreateVariant);
  };

  const [isOpenEditVariant, setIsOpenEditVariant] = useState(false);
  const handleToggleEditVariant = () => {
    setIsOpenEditVariant(!isOpenEditVariant);
  };

  const [selectedVariant, setSelectedVariant] = useState(null);

  const [isOpenDeleteProductPopup, setIsOpenDeleteProductPopup] =
    useState(false);
  const handleToggleDeleteProductPopup = () => {
    setIsOpenDeleteProductPopup(!isOpenDeleteProductPopup);
  };

  const [isOpenDeleteVariantPopup, setIsOpenDeleteVariantPopup] =
    useState(false);

  const handleToggleDeleteVariantPopup = () => {
    setIsOpenDeleteVariantPopup(!isOpenDeleteVariantPopup);
  };
  return (
    <div className="page product-detail-page">
      {isOpenCreateVariant && (
        <PopupVariant handleToggle={handleToggleCreateVariant} />
      )}

      {isOpenEditVariant && (
        <PopupVariant
          handleToggle={handleToggleEditVariant}
          action="EDIT"
          variantInfo={selectedVariant}
        />
      )}

      {isOpenDeleteProductPopup && (
        <AcceptancePopup
          description="Are you sure you want to delete this product?"
          handleClose={handleToggleDeleteProductPopup}
        />
      )}

      {isOpenDeleteVariantPopup && (
        <AcceptancePopup
          description="Are you sure you want to delete this variant?"
          handleClose={handleToggleDeleteVariantPopup}
        />
      )}
      <div className="page-content">
        <div className="header">
          <div className="left-side">
            <button className="back-btn">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 1024 1024"
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
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />

                  <path
                    fill="#000000"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  />
                </g>
              </svg>
            </button>
            <div className="title">
              <h5 className="back-description">Back to list</h5>
              <h2 className="product-name">{"Product Name"}</h2>
            </div>
          </div>
          <div className="right-side">
            <div className="list-quick-btn">
              <button
                className="btn quick-btn delete-product-btn"
                onClick={handleToggleDeleteProductPopup}
              >
                Deltete Product
              </button>
              <button className="btn quick-btn save-product-btn">Save</button>
            </div>
          </div>
        </div>
        <div className="wrapper-product-info">
          <div className="product-info">
            <div className="left-side">
              <div className="info-container category-container">
                <p className="title">Category</p>

                <div className="info-item">
                  <p className="info-title">Main Category</p>
                  <CustomSelect
                    options={mainCategories}
                    optionName="main category"
                    handleSelectOption={handleSelectMainCategory}
                    selectedOption={selectedMainCategory}
                  />
                </div>

                <div className="info-item">
                  <p className="info-title">Subcategory</p>
                  <CustomSelect
                    options={subCategories}
                    optionName="sub category"
                    handleSelectOption={handleSelectSubCategory}
                    selectedOption={selectedSubCategory}
                  />
                </div>
                <div className="info-item">
                  <p className="info-title">Subcategory level 2</p>
                  <CustomSelect
                    options={subCategoriesLevel2}
                    optionName="sub category"
                    handleSelectOption={handleSelectSubCategoryLevel2}
                    selectedOption={selectedSubCategoryLevel2}
                  />
                </div>
              </div>
              <div className="info-container">
                <p className="title">Product image</p>

                <div className="preview-image-section">
                  <div className="preview-image-list">
                    <div className="preview-image-item">
                      <img
                        src="https://product.hstatic.net/1000321269/product/kich_thuoc_web_to_bc9187ff6e7c44e78b28687c55c0a64b_master.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <button className="add-new-image-btn">
                    <svg
                      width="25px"
                      height="25px"
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
                          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                        <path
                          d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />{" "}
                      </g>
                    </svg>
                    Add Another Image
                  </button>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="info-container">
                <p className="title">General Information</p>
                <div className="wrapper-info-item">
                  <div className="info-item">
                    <p className="info-title">Product Name</p>
                    <div className="wrapper-info-input">
                      <input
                        type="text"
                        name="product_name"
                        id=""
                        className="info-input"
                        // disabled={true}
                        value="Puzzle Tee"
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper-info-item three-column">
                  <div className="info-item">
                    <p className="info-title">Original Price</p>
                    <div className="wrapper-info-input">
                      <span className="unit">VND</span>
                      <input
                        type="number"
                        name="orginal_price"
                        id=""
                        className="info-input"
                        // disabled={true}
                        value="100000"
                      />
                    </div>
                  </div>
                  <div className="info-item">
                    <p className="info-title">Selling Price</p>
                    <label
                      className="wrapper-info-input"
                      htmlFor="selling_price"
                    >
                      <span className="unit">VND</span>
                      <input
                        type="number"
                        name="selling_price"
                        id="selling_price"
                        className="info-input"
                        value="500000"
                      />
                    </label>
                  </div>
                  <div className="info-item">
                    <p className="info-title">Stock</p>
                    <div className="wrapper-info-input">
                      <input
                        type="number"
                        name="product_stock"
                        id=""
                        className="info-input"
                        disabled={true}
                        value="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper-info-item">
                  <div className="info-item">
                    <p className="info-title">Product description</p>
                    <div className="wrapper-info-input">
                      <input
                        type="text"
                        name="description"
                        id=""
                        className="info-input"
                        value="Something about the product"
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper-info-item two-column">
                  <div className="info-item">
                    <p className="info-title">Release day</p>
                    <div className="wrapper-info-input date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Chọn ngày"
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                          sx={{
                            width: "100%",
                            height: "100%",
                            "& .MuiFormControl-root": {
                              height: "100%",
                              width: "100%",
                            },
                            "& .MuiFormLabel-root": {
                              display: "none",
                            },
                            "& .MuiInputBase-root": {
                              // padding: "0",
                              paddingLeft: "10px",
                              height: "100%",
                              width: "100%",
                            },
                            "& .MuiInputBase-input": {
                              padding: "0",
                              height: "100%",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="info-item">
                    <p className="info-title">Supplier</p>
                    <div
                      className="wrapper-info-input"
                      onClick={handleToggleSupplierOption}
                    >
                      <div className="wrapper-options">
                        <div className="selected-value">
                          {selectedSupplier?.name || "Select supplier"}
                        </div>
                        <svg
                          width="25px"
                          height="25px"
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
                              fill="#878282"
                            />{" "}
                          </g>
                        </svg>
                      </div>
                      {isOpenSupplierOption && (
                        <Options
                          options={suppliers}
                          selectedOption={selectedSupplier}
                          handleSelect={handleSelectSupplier}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-container variant-container">
                <div className="title ">
                  <p>Manage Variant</p>
                  <button
                    className="add-new-variant-btn"
                    onClick={handleToggleCreateVariant}
                  >
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="Edit / Add_Plus">
                          {" "}
                          <path
                            id="Vector"
                            d="M6 12H12M12 12H18M12 12V18M12 12V6"
                            stroke="#5a5858"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    Add Variant
                  </button>
                </div>
                {/* <div className="wrapper-info-item">
                  <div className="info-item">
                    <p className="info-title">Stock Keeping Unit</p>
                    <div className="wrapper-info-input">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="info-input"
                        disabled={true}
                        value="SKC001HMK876"
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper-info-item two-column">
                  <div className="info-item">
                    <p className="info-title">Stock</p>
                    <div className="wrapper-info-input">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="info-input"
                        disabled={true}
                        value="2"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="list-variant">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
