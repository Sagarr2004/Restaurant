const express = require('express');
const upload = require("../middlewares/multer.js")
const Menu = require("../models/menu.models.js");
const cloudinary = require("../utils/cloudinary.js");
const router = express.Router();

// Add New Dish
// router.post("/add", upload.single("image"), async (req, res) => {
//   console.log("/Add API hit");

//   try {
//     const { name, category, price, description, image } = req.body;
//     console.log("Image: ", image);
//     const newDish = new Menu({ image , name, category, price, description });
//     await newDish.save();
//     res.status(201).json({ message: "Dish added successfully!", newDish });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.post("/add", async (req, res) => {
  console.log("/Add API hit");

  try {
      const { name, category, price, description, image } = req.body;

      // Ensure image URL is provided
      if (!image) {
          return res.status(400).json({ error: "Image URL is required" });
      }

      console.log("Received Image URL: ", image);

      const newDish = new Menu({
          image, // Storing image URL directly
          name,
          category,
          price,
          description
      });

      await newDish.save();
      res.status(201).json({ message: "Dish added successfully!", newDish });

  } catch (error) {
      console.error("Error adding dish:", error);
      res.status(500).json({ error: error.message });
  }
});



// Fetch All Menu Items
router.get("/", async (req, res) => {
  try {
    const Menus = await Menu.find();
    res.json(Menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Dish
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.json({ message: "Dish deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

