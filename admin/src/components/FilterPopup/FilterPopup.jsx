import React from "react";
import "./FilterPopup.scss";
import CheckBox from "../CheckBox/CheckBox";

const FilterPopup = ({ filterItem }) => {
  const listFilterOption = [
    {
      title: "Product Stock",
      options: [
        {
          id: 1,
          name: "Low Stock",
          value: "lowStock",
        },
        {
          id: 2,
          name: "Out of Stock",
          value: "outOfStock",
        },
      ],
    },
    {
      title: "Categories",
      options: [
        {
          id: 1,
          name: "Category 1",
          value: "category1",
        },
        {
          id: 2,
          name: "Category 2",
          value: "category2",
        },
        {
          id: 3,
          name: "Category 3",
          value: "category3",
        },
        {
          id: 4,
          name: "Category 3",
          value: "category3",
        },
        {
          id: 5,
          name: "Category 3",
          value: "category3",
        },
      ],
    },
  ];
  return (
    <div className="filter-popup" onClick={(e) => e.stopPropagation()}>
      <div className="filter-header">
        <div className="title">Filters</div>
        <button className="clear-filter-btn" type="button">
          Clear
        </button>
      </div>
      <div className="list-filter-option">
        {/* <div className="filter-box">
          <div className="filter-box__header">
            <p className="title">Product Stock</p>
            <button className="hidden-filter-box-btn">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 20 20"
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
                    fill="#5C5F62"
                    d="M13.098 8H6.902c-.751 0-1.172.754-.708 1.268L9.292 12.7c.36.399 1.055.399 1.416 0l3.098-3.433C14.27 8.754 13.849 8 13.098 8Z"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="filter-box__content">
            {listFilterOption.productStock.options.map((option) => (
              <label key={option.id} className="filer-option">

                <CheckBox name={option.value} />
                <p className="label" htmlFor={option.value}>
                  {option.name}
                </p>
              </label>
            ))}
          </div>
        </div> */}

        {listFilterOption.map((filter) => (
          <div className="filter-box">
            <div className="filter-box__header">
              <p className="title">{filter.title}</p>
              <button className="hidden-filter-box-btn">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 20 20"
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
                      fill="#5C5F62"
                      d="M13.098 8H6.902c-.751 0-1.172.754-.708 1.268L9.292 12.7c.36.399 1.055.399 1.416 0l3.098-3.433C14.27 8.754 13.849 8 13.098 8Z"
                    />
                  </g>
                </svg>
              </button>
            </div>
            <div className="filter-box__content">
              {filter.options.map((option) => (
                <label key={option.id} className="filer-option">
                  <CheckBox name={option.value} />
                  <p className="label" htmlFor={option.value}>
                    {option.name}
                  </p>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="filter__footer">
        <button type="button">Cancel</button>
        <button type="button" className="apply-filter-btn">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPopup;
