const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
