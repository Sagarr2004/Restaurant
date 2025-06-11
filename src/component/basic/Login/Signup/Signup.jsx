
import React, { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { CartContext } from "../../../CartProvider";
import axios from "axios";


const Signup = () => {
  const { setLogin } = useContext(CartContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.ConfirmPassword
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.ConfirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address.");
      setLoading(false);
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      setError("Invalid phone number. Must be 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);
      console.log("Signup successful:", response.data);
      alert("Signup successful! Please login.");
      navigate("/Login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      (
        <section className="signup">
          <div className="container">
            <div className="signup-form">
              <h2 className="form-title">SignUp</h2>
              <form method="post" className="register-form" id="registration-form">
                {error && <p style={{ color: "red" }}>{error}</p>}

                {[
                  { name: "firstName", placeholder: "First name" },
                  { name: "lastName", placeholder: "Last name" },
                  { name: "email", placeholder: "Your Email" },
                  { name: "phone", placeholder: "Your Phone" },
                ].map((field) => (
                  <div className="form-group" key={field.name}>
                    <label htmlFor={field.name}>
                      <i className="zmdi zmdi-account"></i>
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                {[
                  { name: "password", placeholder: "Your Password" },
                  { name: "ConfirmPassword", placeholder: "Confirm Password" },
                ].map((field) => (
                  <div className="form-group" key={field.name}>
                    <label htmlFor={field.name}>
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name={field.name}
                      id={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      autoComplete="off"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                <div id="clerk-captcha"></div>
                <div className="form-group-button">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
                <NavLink to="/Login" className="sign-image-link">
                  I am Already Registered
                </NavLink>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="/images/signup.png" className="best" alt="Signup" />
              </figure>
            </div>
          </div>
        </section>
      )
    </>
  );

};

export default Signup;


