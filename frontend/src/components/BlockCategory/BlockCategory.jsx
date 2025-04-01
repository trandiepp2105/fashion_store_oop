import React from "react";
import "./BlockCategory.scss";
const BlockCategory = ({
  listCategory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
}) => {
  return (
    <div className="list-category">
      {listCategory.map((item, index) => (
        <div
          className="category-item"
          key={index}
          style={{
            backgroundImage: `url("/assets/images/cate.png")`,
          }}
        >
          <span>Phụ kiện apple</span>
        </div>
      ))}
    </div>
  );
};

export default BlockCategory;
