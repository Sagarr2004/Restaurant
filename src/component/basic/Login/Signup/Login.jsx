import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../CartProvider";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import "./signup.css";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login, setLogin } = useContext(CartContext);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setLogin(true);
      navigate("/restaurant"); // Redirect if logged in
    }
  }, [setLogin, navigate]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", loginData, {
        withCredentials: true,
      });

      if (data?.message === "Login successful") {
        Cookies.set("authToken", data.token, { expires: 7 }); // Store token in cookies for persistence
        setLogin(true);
        navigate("/restaurant");
      } else {
        alert(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup">
      <div className="container mt-5">
        <div className="signup-form">
          <form className="register-form" onSubmit={handleSubmit}>
            <b>
              <h2 className="form-title">Login</h2>
            </b>

            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-account-box-mail"></i>
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="zmdi zmdi-lock"></i>
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Your password"
              />
            </div>

            <button type="submit" className="Login-form-submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <br />
            <NavLink to="/signup" className="Login-image-link">
              First Time on Awesome Restaurant?
            </NavLink>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
