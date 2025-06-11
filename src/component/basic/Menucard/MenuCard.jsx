import React, { useState, useContext } from "react";
import { CartContext } from "../../CartProvider";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './MenuCard.css';

const MenuCard = ({ menuData, filterItem }) => {
  // const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [name, setName] = useState("Item");
  const navigate = useNavigate();
  const { cartItems, setCartItems, login } = useContext(CartContext);

  const addToCart = (item) => {
    if (!login) {
      navigate("/signup");
    }
    setCartItems((prevItems) => [...prevItems, item]);
    console.log("Item added to cart:", item);
    setName(item.name);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  console.log(cartItems);

  return (
    <>
      <section>
        <div className="today_best" style={{ margin: 10 }}>
          <div className="today">
            <h3>Inspiration for your first order</h3>

            <div className="today-order">
              <div className="saurabh">
                <img
                  onClick={() => filterItem("Pizza")}
                  src="/images/2.jpg"
                  className="best"
                  alt="Cheese Veg"
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Pizza")}
                >
                  Pizza
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/3.jpg"
                  onClick={() => filterItem("Pizza")}
                  className="best"
                  alt="Veggie"
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Pizza")}
                >
                  Veggie
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/1a.jpg"
                  onClick={() => filterItem("Non-veg")}
                  className="best"
                  alt="Chicken Leg"
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Non-veg")}
                >
                  Chicken Leg
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/7.jpg"
                  className="best"
                  alt="Classical Dish"
                  onClick={() => filterItem("Pizza")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Pizza")}
                >
                  Classical
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/2q.jpg"
                  className="best"
                  alt="Drinks"
                  onClick={() => filterItem("Veg-Drinks")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Veg-Drinks")}
                >
                  Drinks
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/2w.webp"
                  className="best"
                  alt="Premium"
                  onClick={() => filterItem("Alcohol")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Alcohol")}
                >
                  Jack Daniels
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/3a.jpg"
                  className="best"
                  alt="Tandoori"
                  onClick={() => filterItem("Non-veg")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Non-veg")}
                >
                  Tandoori
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/4q.jpg"
                  className="best"
                  alt="Lemonade"
                  onClick={() => filterItem("Veg-Drinks")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Veg-Drinks")}
                >
                  Lemonade
                </button>
              </div>

              <div className="saurabh">
                <img
                  src="/images/3w.jpg"
                  className="best"
                  alt="Jack Daniels"
                  onClick={() => filterItem("Alcohol")}
                />
                <button
                  className="first-order"
                  style={{ marginTop: 5, fontWeight: 600 }}
                  onClick={() => filterItem("Alcohol")}
                >
                  Jack Daniels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr></hr>

      {showNotification && (
        <div
          id="item"
          style={{
            marginTop: "10px",
            height: "50px",
            textAlign: "center",
            fontSize: "20px",
            color: "green",
            fontWeight: "600",
          }}
          className="pop"
        >
          {name} Added into the Cart!!!
        </div>
      )}

      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
          const { id, name, image, price } = curElem;

          return (
            <div className="card-container" key={id}>
              <div className="card">
  <img src={image} alt={name} className="card-media" />
  <div className="title-star">
    <h5 className="card-title">{name}</h5>
    <ReactStars
      count={5}
      value={Math.floor(Math.random() * 3) + 3}
      size={24}
      activeColor="#ffd700"
      edit={false}
    />
  </div>
  <p className="food-description">
    {/* {curElem.description || "Delicious and freshly prepared."} */}
    {"Delicious and freshly prepared."}
  </p>
  <div className="price">&#8377;{price}</div>
  <button
    onClick={() => addToCart({ id, name, image, price })}
    className="add-to-cart card-tag subtle"
  >
    Add to Cart
  </button>
</div>

              {/* </div> */}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default MenuCard;
