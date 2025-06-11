import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [orderSummary, setOrderSummary] = useState(null);
  const [completedOrderSummary, setCompletedOrderSummary] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reservationsDetails, setReservationsDetails] = useState(null);
  const [showReservationModel, setShowReservationModel] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true,
      });

      setUserData(response.data.user);
      setAddress(
        response.data.user.address || {
          street: "",
          city: "",
          state: "",
          pincode: "",
        }
      );
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const fetchUserAndOrders = async () => {
    try {
      // Fetch currently logged-in user
      const userResponse = await axios.get(
        "http://localhost:3000/api/profile",
        {
          withCredentials: true,
        }
      );

      const loggedInUser = userResponse.data.user;
      if (!loggedInUser?._id) {
        console.log("User is not logged in");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/orders/pending/${loggedInUser?._id}`
      );
      setOrderSummary(response.data);

      const CompletedOrders = await axios.get(
        `http://localhost:3000/orders/completed/${loggedInUser?._id}`
      );
      setCompletedOrderSummary(CompletedOrders.data);

      // const reservationsDetails = await axios.get(
      //   `http://localhost:3000/api/contact/${loggedInUser?._id}`
      // );
      // setReservationsDetails(reservationsDetails.data)
    } catch (err) {
      setError("Failed to fetch user or order summary.");
    }
  };

  const fetchReservationDetails = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:3000/api/profile",
        {
          withCredentials: true,
        }
      );

      const loggedInUser = userResponse.data.user;
      if (!loggedInUser?._id) {
        console.error("User ID is missing");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/contact/${loggedInUser._id}`
      );
      setReservationsDetails(response.data);
      console.log("Reservation Data:", response.data);
    } catch (error) {
      console.error(
        "Error fetching reservation:",
        error.response?.data || error
      );
    }
  };

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserData(null);
        alert("Sign-out successful");
        window.location.href = "/";
      } else {
        alert("Failed to sign out.");
      }
    } catch (err) {
      alert("Error signing out.");
    }
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleReservationChange = (e) => {
    setReservationsDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddressSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/update-address",
        address,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Address updated!");
        setUserData({ ...userData, address });
        setShowAddressModal(false);
      } else {
        alert("Failed to update address.");
      }
    } catch (err) {
      alert("Error updating address.");
    }
  };

  const handleReservationSubmit = async () => {
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
      ...reservationsDetails,
    };

    console.log("Updating Reserving Details: ", reservationData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/update-reservation",
        reservationData,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Reservation details updated!");
        // Update reservationsDetails if needed from response
        setReservationsDetails(
          response.data.updatedReservation || reservationData
        );
        setShowReservationModel(false);
      } else {
        alert("Failed to update reservation details.");
      }
    } catch (err) {
      alert("Error updating reservation details.");
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <h2>Profile</h2>
        <ul className="sidebar-menu">
          <li
            className={activeSection === "personalInfo" ? "active" : ""}
            onClick={() => setActiveSection("personalInfo")}
          >
            Personal Info
          </li>
          <li
            className={activeSection === "address" ? "active" : ""}
            onClick={() => setActiveSection("address")}
          >
            Address
          </li>
          <li
            className={activeSection === "myOrders" ? "active" : ""}
            onClick={() => {
              setActiveSection("myOrders");
              fetchUserAndOrders();
            }}
          >
            My Orders
          </li>
          <li
            className={activeSection === "Reservation-details" ? "active" : ""}
            onClick={() => {
              setActiveSection("Reservation-details");
              fetchReservationDetails();
            }}
          >
            Reservation Details
          </li>
          <li
            className={activeSection === "orderSummary" ? "active" : ""}
            onClick={() => {
              setActiveSection("orderSummary");
              fetchUserAndOrders();
            }}
          >
            Orders History
          </li>

          <li
            className="signout-option"
            onClick={() => setShowSignOutModal(true)}
          >
            Sign Out
          </li>
        </ul>
      </div>

      <div className="main-content">
        {error ? (
          <p className="error-message">{error}</p>
        ) : userData ? (
          <>
            {activeSection === "personalInfo" && (
              <div className="section">
                <h3>Personal Info</h3>
                <p>
                  <strong>First Name:</strong> {userData.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {userData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.phone}
                </p>
              </div>
            )}
            {activeSection === "address" && (
              <div className="section">
                <div className="upper">
                  <h3>Address</h3>
                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddressModal(true);
                    }}
                  >
                    Update Address
                  </button>
                </div>
                <p>
                  <strong>Street:</strong> {userData.address?.street || "N/A"}
                </p>
                <p>
                  <strong>City:</strong> {userData.address?.city || "N/A"}
                </p>
                <p>
                  <strong>State:</strong> {userData.address?.state || "N/A"}
                </p>
                <p>
                  <strong>Pincode:</strong> {userData.address?.pincode || "N/A"}
                </p>
              </div>
            )}

            {activeSection === "Reservation-details" && (
              <div className="section">
                <div className="upper">
                  <h3>Reservations Details</h3>
                </div>
                {reservationsDetails &&
                Object.keys(reservationsDetails).length > 0 ? (
                  <>
                    <p>
                      <strong>Name:</strong>{" "}
                      {reservationsDetails.firstName || "N/A"}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {reservationsDetails.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {reservationsDetails.date
                        ? new Date(
                            reservationsDetails.date
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Time:</strong> {reservationsDetails.time || "N/A"}
                    </p>
                    <p>
                      <strong>No. of Guests:</strong>{" "}
                      {reservationsDetails.guests || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {reservationsDetails.status || "N/A"}
                    </p>
                  </>
                ) : (
                  <h5 className="text-center">No Reservations Yet</h5>
                )}
              </div>
            )}

            {activeSection === "orderSummary" && (
              <div className="myOrders-container">
                <h3 className="order-summary-header">Order History</h3>
                {completedOrderSummary?.length > 0 ? (
                  <ul className="summary-list">
                    {completedOrderSummary.map((order, index) => (
                      <li
                        key={index}
                        className="summary-item"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div
                          className="s"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <p className="summary-details">
                            <strong>Order Total:</strong> ₹{order.totalAmount}
                          </p>
                          <p className="summary-details">
                            <strong>Status:</strong> {order.status}
                          </p>
                        </div>

                        <p className="summary-details">
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-orders">No orders found.</p>
                )}
              </div>
            )}

            {activeSection === "myOrders" && (
              <div className="myOrders-container">
                <h3 className="order-summary-header">Order Summary</h3>
                {orderSummary?.length > 0 ? (
                  <ul className="summary-list">
                    {orderSummary.map((order, index) => (
                      <li
                        key={index}
                        className="summary-item"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div
                          className="s"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <p className="summary-details">
                            <strong>Order Total:</strong> ₹{order.totalAmount}
                          </p>
                          <p className="summary-details">
                            <strong>Status:</strong> {order.status}
                          </p>
                        </div>

                        <p className="summary-details">
                          <strong>Order Date:</strong>{" "}
                          {new Date(order.orderDate).toLocaleString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-orders">No orders found.</p>
                )}
              </div>
            )}

            {selectedOrder && (
              <div
                className="popup-overlay"
                onClick={() => setSelectedOrder(null)}
              >
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3>Order Details</h3>
                  <p>
                    <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(selectedOrder.orderDate).toLocaleString()}
                  </p>
                  <ul className="order-items-list">
                    {selectedOrder.items.map((item, i) => (
                      <li key={i} className="order-item-row">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order-item-img"
                        />
                        <p className="order-details">
                          <strong>{item.name}</strong> - ₹{item.price}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="close-btn"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="modal" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Address</h3>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
            />
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
            />
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
            />
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
            />
            <div className="modal-buttons">
              <button className="yes-button" onClick={handleAddressSubmit}>
                Save
              </button>
              <button
                className="no-button"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* reservation Modal */}
      {showReservationModel && (
        <div className="modal" onClick={() => setShowReservationModel(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Rservation</h3>
            <label>Name:</label>
            <input
              type="text"
              name="firstName"
              value={reservationsDetails.firstName}
              onChange={handleReservationChange}
            />
            <label>Contact:</label>
            <input
              type="text"
              name="phone"
              value={reservationsDetails.phone}
              onChange={handleReservationChange}
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={reservationsDetails.date}
              onChange={handleReservationChange}
            />
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={reservationsDetails.time}
              onChange={handleReservationChange}
            />
            <div className="modal-buttons">
              <button className="yes-button" onClick={handleReservationSubmit}>
                Save
              </button>
              <button
                className="no-button"
                onClick={() => setShowReservationModel(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign-Out Modal */}
      {showSignOutModal && (
        <div className="modal" onClick={() => setShowSignOutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to sign out?</h3>
            <div className="modal-buttons">
              <button className="yes-button" onClick={handleSignOut}>
                Yes
              </button>
              <button
                className="no-button"
                onClick={() => setShowSignOutModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
