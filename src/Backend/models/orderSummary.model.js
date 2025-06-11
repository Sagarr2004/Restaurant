const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ name: String, price: Number, image: String }],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"], // Restrict values
    default: "pending", // Default status
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
