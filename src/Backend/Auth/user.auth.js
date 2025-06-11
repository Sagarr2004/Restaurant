const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  // console.log("JWT Token:",token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret

    // Fetch user information based on decoded user ID
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
