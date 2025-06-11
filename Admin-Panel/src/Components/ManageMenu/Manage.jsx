import { useState, useEffect } from "react";
import axios from "axios";

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [newDish, setNewDish] = useState({
    image: null,
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/menu");
      setMenu(res.data);
    } catch (error) {
      console.error("Error fetching menu", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setNewDish({ ...newDish, image: e.target.files[0] });
    } else {
      setNewDish({ ...newDish, [e.target.name]: e.target.value });
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "AWESOME Retaurant"); 

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/degl0nx0c/image/upload",
        formData
      );
      console.log("Secure_url",response.data.secure_url);
      return response.data.secure_url; // Get the uploaded image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };


  const addOrUpdateDish = async () => {
    console.log("Add Dish Btn Clicked..!!");

    if (!newDish.name || !newDish.category || !newDish.price || !newDish.description) {
        console.error("All fields are required.");
        return;
    }

    let imageUrl = newDish.image;

    // Upload to Cloudinary only if the image is a file
    if (newDish.image instanceof File) {
        imageUrl = await uploadImage(newDish.image);
        if (!imageUrl) {
            console.error("Failed to upload image");
            return;
        }
    }

    try {
        // Send data with image URL
        await axios.post("http://localhost:3000/api/menu/add", {
            name: newDish.name,
            category: newDish.category,
            price: newDish.price,
            description: newDish.description,
            image: imageUrl,  // ✅ Send Cloudinary URL instead of a file
        });

        setSuccessMessage("Dish added successfully!");
        setTimeout(() => setSuccessMessage(""), 2000);
        setNewDish({
            image: null,
            name: "",
            category: "",
            price: "",
            description: "",
        });
        fetchMenu();
    } catch (error) {
        console.error("Error while saving dish", error);
    }
};


  const deleteDish = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/menu/${id}`);
      fetchMenu();
    } catch (error) {
      console.error("Error deleting dish", error);
    }
  };

  const editDish = (dish) => {
    setNewDish(dish);
    setEditId(dish._id);
  };

  const sortedMenu = [...menu].sort((a, b) => {
    if (sortOption === "price-low-high") return a.price - b.price;
    if (sortOption === "price-high-low") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const filteredMenu = sortedMenu.filter((dish) =>
    dish.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5 text-xl">
      <h2 className="mb-4">Manage Menu</h2>
      {successMessage && (
        <p className="text-green-600 text-sm mb-2">{successMessage}</p>
      )}
      <div className="flex justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-1 text-sm border rounded w-1/2"
        />
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="p-1 text-sm border rounded w-70"
        >
          <option value="">Sort By</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-15 mb-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-1 text-sm border rounded"
        />
        {newDish.image && typeof newDish.image === "string" && (
          <img
            src={newDish.image}
            alt="Preview"
            className="w-12 h-12 mt-2 rounded"
          />
        )}

        <input
          type="text"
          name="name"
          value={newDish.name}
          onChange={handleChange}
          className="p-1 text-sm border rounded"
          placeholder="Dish Name"
        />
        <select
          name="category"
          value={newDish.category}
          onChange={handleChange}
          className="p-1 text-sm border rounded"
        >
          <option value="">Select Category</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Drinks">Drinks</option>
        </select>
        <input
          type="text"
          name="price"
          value={newDish.price}
          onChange={handleChange}
          className="p-1 text-sm border rounded"
          placeholder="Price"
        />
        <textarea
          name="description"
          value={newDish.description}
          onChange={handleChange}
          className="p-1 text-sm border rounded col-span-2"
          placeholder="Description"
          rows="2"
        />
      </div>
      <button
        onClick={addOrUpdateDish}
        className="bg-blue-500 text-white p-1 text-sm rounded"
      >
        {editId ? "Update Dish" : "Add Dish"}
      </button>
      <ul className="mt-4">
        {filteredMenu.length === 0 ? (
          <p className="text-gray-600">No dishes found</p>
        ) : (
          filteredMenu.map((dish) => (
            <li
              key={dish._id}
              className="flex items-center justify-between p-2 border-b text-sm"
            >
              <div className="flex items-center gap-2">
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="font-bold">
                    {dish.name} - ₹{dish.price}
                  </h3>
                  <p className="text-gray-600">{dish.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editDish(dish)}
                  className="bg-yellow-500 text-white p-1 text-xs rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDish(dish._id)}
                  className="bg-red-500 text-white p-1 text-xs rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManageMenu;
