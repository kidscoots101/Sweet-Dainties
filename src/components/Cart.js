import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Cart.css'
import logo from '../assets/sweet-dainties-logo.jpeg'
import home from '../assets/home.png'


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  const handleCartClick = () => {
    navigate('/')
  };

  return (
    <div className="cart-container">
        <header className="header">
        <img className="logo" src={logo} alt="Product Logo" />
        <div className="cartwrapper">
          <img
            className="home"
            src={home}
            alt="home"
            onClick={handleCartClick}
          />
          <div className="cart-counter" id="cart-counter">
            Home
          </div>
        </div>
      </header>
      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-items-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">${item.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
