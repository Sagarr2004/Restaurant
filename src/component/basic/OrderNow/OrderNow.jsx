import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./OrderCard.css";
import QRCode from "react-qr-code";
import { useLocation } from 'react-router-dom';
import { CartContext } from "../../CartProvider";

const OrderCard = () => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("Maharashtra, Raigad, Panvel, Vihighar");
  const [city, setCity] = useState("Mumbai");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("410206");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const {cartItems} = useContext(CartContext);
  const location = useLocation();


  const totalAmount = location.state?.totalAmount || 0;
  const amount = totalAmount && !isNaN(totalAmount) ? totalAmount : "1";
  console.log("Total Amt:",amount)

  useEffect(() => {
    if (!userData) fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true,
      });

      const user = response.data.user;
      setUserData(user);
      setName(user?.firstName || "");
      setAddress(user?.address || {});
      setPhone(user?.phone || "");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const orderData = {
        userId: userData?._id, 
        items:cartItems || [], // Send cart items
        totalAmount: totalAmount,
    };

    console.log("Order data Items:",orderData);

    try {
        await axios.post("http://localhost:3000/api/orders", orderData, { withCredentials: true });
        alert("Order placed successfully!");
    } catch (err) {
        console.error("Error placing order:", err);
        alert("Failed to place order.");
    }
    console.log("Order submitted:", {
      name,
      street,
      city,
      state,
      pincode,
      address,
      phone,
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
    });

    // Reset form fields
    setName("");
    setAddress("");
    setPhone("");
    setPaymentMethod("");
    setCardNumber("");
    setExpiryDate("");
    setCVV("");
  };

  return (
    <div className="OrderNow">
      <div className="checkout">
        <h1 className="order-tag">Delivery Details</h1>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <label className="saurabh">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </label>
          <label className="saurabh">
            Street:
            <input type="text" value={address?.street || "N/A"} readOnly />
          </label>
          <label className="saurabh">
            City:
            <input type="text" value={address?.city || "N/A"} readOnly />
          </label>
          <label className="saurabh">
            State:
            <input type="text" value={address?.state || "N/A"} readOnly />
          </label>
          <label className="saurabh">
            Pincode:
            <input type="text" value={address?.pincode || "N/A"} readOnly />
          </label>
          <label className="saurabh">
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Your phone number"
            />
          </label>
          <label className="payment-method">
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="creditCard">Credit Card</option>
              <option value="debitCard">Debit Card</option>
              <option value="scanPay">Scan and Pay</option>
            </select>
          </label>

          {/* Render only for Credit or Debit Card */}
          {(paymentMethod === "creditCard" ||
            paymentMethod === "debitCard") && (
            <div className="method">
              <label className="saurabh">
                Card Number:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  placeholder="Card number"
                />
              </label>
              <label className="saurabh">
                Expiry Date:
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  placeholder="Expiry date (MM/YY)"
                />
              </label>
              <label className="saurabh">
                CVV:
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  required
                  placeholder="CVV"
                />
              </label>
            </div>
          )}

          {/* Render only for Scan and Pay */}
          {paymentMethod === "scanPay" && (
            <div className="qr-code">
              <QRCode
                value={`upi://pay?pa=sagarchavan0061@okaxis&pn=Restaurant&am=${amount}&cu=INR`}
                size={200}
              />
              <h3>Scan this QR to Pay</h3>
            </div>
          )}
          <div className="button">
            <button type="submit">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderCard;
