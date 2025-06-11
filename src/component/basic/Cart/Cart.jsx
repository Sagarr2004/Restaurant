import React, { useContext } from 'react';
import { CartContext } from '../../CartProvider';
import './cart.css';
import { NavLink } from 'react-router-dom';

function Cart() {
    const { cartItems } = useContext(CartContext);  

    const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);

    return (
        <div className="cart-container">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
                <p className="no-items">No items in cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <img src={item.image} alt={item.name} style={{ width: "50px" }} />
                            <span>{item.name} - &#8377;{item.price}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className="cart-footer">
                <span className="total-price">Total: &#8377;{totalAmount}</span>
                <NavLink to="/ordernow" state={{ totalAmount }} >
                    <button disabled={cartItems.length === 0} className="checkout-btn">Checkout</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Cart;
