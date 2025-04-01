import React, { useRef, useState } from "react";
import style from "./MainMenu.module.scss";
import { Link } from "react-router-dom";

const LabelMenuItem = ({ toggleMenu, categoryItem, onHover }) => {
  return (
    <div
      className={style.labelMenuTree}
      onClick={toggleMenu}
      onMouseEnter={() => onHover(categoryItem)} // Trigger hover event
      // onMouseLeave={() => onHover(null)} //  Reset hover state
    >
      <div className={style.leftContent}>
        <img
          className={style.iconCategory}
          src={categoryItem.icon_url}
          alt="icon-cate"
        />
        <Link
          to={`/catalogsearch?cate=${encodeURIComponent(categoryItem.name)}`}
          className={style.linkCategory}
        >
          {categoryItem.name}
        </Link>
      </div>
      <button
        className={style.arrowRightIcon}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src="/assets/menuItems/arrow-right.svg" alt="" />
      </button>
    </div>
  );
};

const MainMenu = ({ toggleMenu, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const selectedCategoryRef = useRef(null); // Ref to track selected category

  const handleHover = (categoryItem) => {
    setSelectedCategory(categoryItem); // Update state
    selectedCategoryRef.current = categoryItem; // Update ref
  };

  const tempCategories = [
    {
      id: 1,
      name: "Men's Fashion",
      icon_url: "/assets/Icons/men-fashion.svg",
      description: "default description",
      subcategories: [
        {
          id: 10,
          name: "T-Shirts",
          icon_url: "/assets/Icons/t-shirts.svg",
          description: "default description",
        },
        {
          id: 20,
          name: "Jeans",
          icon_url: "/assets/Icons/jeans.svg",
          description: "default description",
        },
      ],
    },
    {
      id: 2,
      name: "Women's Fashion",
      icon_url: "/assets/Icons/women-fashion.svg",
      description: "default description",
    },
    {
      id: 3,
      name: "Kid's Fashion",
      icon_url: "/assets/Icons/kid-fashion.svg",
      description: "default description",
    },
    {
      id: 4,
      name: "Unisex's Fashion",
      icon_url: "/assets/Icons/unisex-fashion.svg",
      description: "default description",
    },
  ];

  return (
    <div
      className={style.mainMenu}
      onMouseLeave={() => setSelectedCategory(null)}
    >
      <div className={style.menuWrapper}>
        <div className={style.menuTree}>
          {tempCategories.map((categoryItem, index) => (
            <LabelMenuItem
              key={categoryItem.id}
              toggleMenu={toggleMenu}
              categoryItem={categoryItem}
              onHover={handleHover} // Pass hover handler
            />
          ))}
        </div>
      </div>
      {selectedCategory &&
        selectedCategory.subcategories &&
        selectedCategory.subcategories.length > 0 && (
          <div className={style.wrapperSubMenu}>
            <div className={style.subMenu}>
              <div className={style.menuTree}>
                {selectedCategory.subcategories.map((subcategory) => (
                  <LabelMenuItem
                    key={subcategory.id}
                    toggleMenu={toggleMenu}
                    categoryItem={subcategory}
                    onHover={() => {}} // No hover for subcategories
                  />
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MainMenu;
