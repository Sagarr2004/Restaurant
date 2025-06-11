const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, enum: ["feedback", "reservation"], required: true },
  date: { type: Date },
  time: { type: String },
  guests: { type: Number, min: 1, max: 50 },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = ContactModel;
