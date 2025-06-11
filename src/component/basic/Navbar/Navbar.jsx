import React, { useState } from "react";
import './Navbar.css'

const Navbar = ({ filterItem, menuList }) => {
  const [activeIndex, setActiveIndex] = useState(4); // Default "All" button selected

  const handleClick = (curElem, index) => {
    setActiveIndex(index);
    filterItem(curElem);
  };

  return (
    <div className="navbar">
      <div className="btn-group">
        {menuList.map((curElem, idx) => (
          <button
            key={idx}
            className={`btn-group__item ${idx === activeIndex ? "btn-group__item--active" : ""}`}
            onClick={() => handleClick(curElem, idx)}
          >
            {curElem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
