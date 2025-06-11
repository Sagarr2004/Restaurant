import React, { useState } from "react";
import Menu from "../menuApi.jsx";
import MenuCard from "../Menucard/MenuCard.jsx";
import Navbar from '../Navbar/Navbar.jsx'


const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];

console.log(uniqueList);

const Resturant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList, setMenuList] = useState(uniqueList);

  const filterItem = (category) => {
    console.log(category);
    if (category === "All") {
      setMenuData(Menu);
      return;
    }

    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });
     
    setMenuData(updatedList);
  };

  return (
    <>
      <Navbar filterItem={filterItem} menuList={menuList} />
      <MenuCard menuData={menuData} filterItem={filterItem}/>
    </>
  );
};

export default Resturant;
