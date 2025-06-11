import React, { useContext,useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import {CartContext} from "../../CartProvider";
import Cookies from "js-cookie";

const Header = () => {

  const { login,setLogin } = useContext(CartContext);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("authToken");
      setLogin(!!token); // Convert token presence to boolean
    };

    checkAuth(); // Run on page load

    window.addEventListener("storage", checkAuth); // Listen for changes in storage

    return () => {
      window.removeEventListener("storage", checkAuth); // Cleanup on unmount
    };
  }, [setLogin]);
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <span>A</span>wesome
            <span>R</span>estaurant
          </h2>
        </div>
        <div className="menu-link">
          <ul>
            <li>
              <NavLink to="/" style={{ fontSize: 20 }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" style={{ fontSize: 20 }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" style={{ fontSize: 20 }}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" style={{ fontSize: 20 }}>
                Show Cart
              </NavLink>
            </li>

            {!login && (
              <li>
                <NavLink to="/signup" style={{ fontSize: 20 }}>
                  Login/SignUp
                </NavLink>
              </li>
            )}

            {login && (
              <>
                <li className="profile-container">
                  <NavLink to="/Profile" className="profile-link">
                    <img
                      src={"male.webp"}
                      alt="Avatar"
                      className="avatar"
                    />
                    <h3 className="profile-text">Profile</h3>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {/* {isSidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>} */}
    </>
  );
};

export default Header;


