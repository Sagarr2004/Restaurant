const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  image: { type: String, default: null }, // Cloudinary image URL
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
