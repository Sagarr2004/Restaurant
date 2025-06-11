import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    phone: "",
    subject: "feedback",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true,
      });
      setUserData((prev) => ({
        ...prev,
        firstName: response.data.user?.firstName || "",
        email: response.data.user?.email || "",
        phone: response.data.user?.phone || "",
      }));
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data"
      );
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setShowPopup(false);

    const userResponse = await axios.get("http://localhost:3000/api/profile", {
      withCredentials: true,
    });

    const loggedInUser = userResponse.data.user;
    if (!loggedInUser?._id) {
      console.error("User ID is missing");
      return;
    }

    const reservationData = {
      userId: loggedInUser?._id,
      ...userData,
    };

    console.log("Contact Details: ", reservationData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        reservationData,
        {
          withCredentials: true,
        }
      );

      setSuccess(response.data.message || "Message sent successfully!");
      setShowPopup(true); // Show the popup

      // Auto-hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      setUserData({
        firstName: "",
        email: "",
        phone: "",
        subject: "feedback",
        date: "",
        time: "",
        guests: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h1>
          Get in <span>Touch</span>
        </h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Enter Phone"
          required
        />

        <select name="subject" value={userData.subject} onChange={handleChange}>
          <option value="feedback">Feedback</option>
          <option value="reservation">Table Reservation</option>
        </select>

        <input
          type="date"
          name="date"
          value={userData.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={userData.time}
          onChange={handleChange}
        />
        <input
          type="number"
          name="guests"
          min={1}
          max={50}
          value={userData.guests}
          onChange={handleChange}
          placeholder="Number of Guests Arriving/Arrived"
        />

        <textarea
          name="message"
          cols="30"
          rows="5"
          value={userData.message}
          onChange={handleChange}
          placeholder="Type your message here..."
          required
        ></textarea>

        <button type="submit">Send</button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>
              Thanks for{" "}
              {userData.subject === "feedback"
                ? "your feedback!"
                : "reserving a table!"}
            </p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
