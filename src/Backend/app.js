const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user.models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authenticateUser = require("./Auth/user.auth");
const Order = require("./models/orderSummary.model");
const menuRoutes = require("./routes/menuRoutes");
const ContactModel = require("./models/contact.models");

dotenv.config();
const app = express();

app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/signupData", {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post(
  "/api/signup",
  [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password too short"),
    body("firstName").trim().isLength({ min: 3 }),
    body("lastName").trim().isLength({ min: 3 }),
    body("phone").trim().isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid Data" });
    }

    try {
      const { firstName, lastName, email, phone, password } = req.body;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashPassword,
      });

      console.log("User Signup successfully");
      return res
        .status(201)
        .json({ message: "Signup successful", user: newUser });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.post("/api/orders", async (req, res) => {
  try {
    // console.log("/api/orders");
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items.length) {
      return res.status(400).json({ message: "Invalid order data." });
    }

    const order = new Order({ userId, items, totalAmount });
    await order.save();

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

//Admin
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().select(
      "userId items totalAmount orderDate status"
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/orders/pending/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("In Pending Orders UserId: ",userId);
    // Find orders where userId matches and status is 'pending'
    const pendingOrders = await Order.find({
      userId,
      status: { $in: ["pending", "processing"] },
    });

    res.json(pendingOrders);
  } catch (error) {
    console.error("Error while fetching pending orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/orders/completed/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("In Completed Orders UserId: ",userId);
    // Find orders where userId matches and status is 'pending'
    const CompletedOrders = await Order.find({ userId, status: "completed" });

    res.json(CompletedOrders);
  } catch (error) {
    console.error("Error while fetching Completed orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Admin
app.put("/update-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // console.log("Received Order ID:", orderId);
    // console.log("Received Status:", status);

    // Validate orderId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID format" });
    }

    if (!["pending", "processing", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // console.log("Updated Order:", updatedOrder);
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Error updating order status" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("UserId: ", userId);
    // Fetch orders from the database where user ID matches
    const orders = await Order.find({ user: userId });

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
});

app.post(
  "/api/login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid data",
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // console.log("JWT Token :", token);

    // Set cookie in response
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    // Send response
    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  }
);

app.post("/api/logout", (req, res) => {
  res.clearCookie("jwtToken", {
    httpOnly: true,
    secure: false, // Use `true` if using HTTPS
    sameSite: "strict",
  });

  res.clearCookie("authToken", {
    httpOnly: true,
    secure: false, // Use `true` if using HTTPS
    sameSite: "strict",
  });

  res.json({ success: true, message: "Logged out successfully" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const {
      userId,
      firstName,
      email,
      phone,
      subject,
      date,
      time,
      guests,
      message,
    } = req.body;

    const newContact = new ContactModel({
      userId,
      firstName,
      email,
      phone,
      subject,
      date,
      time,
      guests,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

app.get("/api/contact/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find reservation with the subject 'reservation'
    const reservation = await ContactModel.findOne({
      userId: userId,
      subject: "reservation",
      status:"Pending"
    });

    if (!reservation) {
      return res.status(404).json({ message: "No reservation found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Check Authentication Route
app.get("/api/auth/check", authenticateUser, (req, res) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});


// app.post("/api/update-reservation", authenticateUser, async (req, res) => {
//   // console.log("/api/update-reservation");
//   try {
//     // const userId = req.user.userId;
//     const { userId, firstName, phone, date, time, guests } = req.body;
//     console.log(req.body);
    
//     const user = await ContactModel.findByIdAndUpdate(
//       userId,
//       {firstName,
//       phone,
//       date,
//       time,
//       guests,},
//       { new: true } 
//     );

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }

//     res.json({ success: true, message: "Address updated successfully!", user });
//   } catch (err) {
//     console.error("Error updating Reservations:", err);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// });



app.post("/api/update-address", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in authenticateUser
    console.log("UserId:", userId);
    const { street, city, state, pincode } = req.body;

    // Validate input fields
    if (!street || !city || !state || !pincode) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Find and update user address
    const user = await userModel.findByIdAndUpdate(
      userId,
      { address: { street, city, state, pincode } },
      { new: true } // Return updated user object
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({ success: true, message: "Address updated successfully!", user });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.get("/api/profile", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in authenticateUser
    const user = await userModel.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching profile data" });
  }
});

app.use(
  "/api/menu",
  (req, res, next) => {
    // console.log("Request to /api/menu received:", req.method, req.url);
    next();
  },
  menuRoutes
);

app.get("/users/:userId", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .select("firstName lastName"); // Fetch only the required fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("User:",user);
    res.json({ name: `${user.firstName} ${user.lastName}` });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/reservations/update", async (req, res) => {
  const { createdAt, status } = req.body;
  try {
    await ContactModel.updateOne({ createdAt }, { status });
    res.status(200).json({ message: "Reservation updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating reservation status" });
  }
});


app.get("/reservations", async(req,res)=>{
    try{
      const reservations = await ContactModel.find({subject:'reservation',status:'Pending'});
      // console.log("Reser Details",reservations);

      res.json(reservations);
    }catch(err){
      console.error("Error fetching Reservations:", err);
      res.status(500).json({ message: "Internal server error" });
    }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
