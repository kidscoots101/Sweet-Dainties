import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css'
import logo from '../assets/sweet-dainties-logo.jpeg'
import home from '../assets/home.png'
import { FaWhatsapp } from "react-icons/fa";
import Modal from "react-modal";

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

  const createWhatsAppLink = () => {
    const itemDetails = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.name} - Price: $${item.price}, Quantity: ${item.quantity}`
    );
  
    const formattedItemDetails = itemDetails.join("\n");
  
    const message = `Hi Sweet Dainties,\nI would like to order the following.\nI have ${cartItems.length} item(s) in my cart:\n${formattedItemDetails}`;
  
    const totalPriceMessage = `\nTotal Price: $${calculateTotalPrice()}`;
  
    const encodedMessage = encodeURIComponent(message + totalPriceMessage);
  
    const phoneNumber = "6596906771";
    return `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            {/* <p className="total-price">Subtotal: ${calculateTotalPrice()}</p> */}
          </div>
        )}
       <div className="checkout">
  <p className="checkout-total">Total Price: ${calculateTotalPrice()}</p>
  {cartItems.length === 0 ? (
    <div>

     <a
     href="#"
     onClick={openModal}
     className="checkout-button"
   >
     Place Order via WhatsApp
   </a>
   
   <Modal
     isOpen={isModalOpen}
     onRequestClose={closeModal}
     contentLabel="Order via WhatsApp Modal"
     overlayClassName="overlay"
     className="modal"
   >
     <h2>Invalid Order</h2>
     <p>Please add something to cart to proceed.</p>
     <button onClick={closeModal}>Close Modal</button>
   </Modal>
   </div>
  ) : (
    <a
    href={createWhatsAppLink()}
    target="_blank"
    rel="noopener noreferrer"
    className="checkout-button"
  >
    <FaWhatsapp style={{marginRight: 10, alignSelf: 'center'}}/>
    Place Order via WhatsApp
  </a>
  )}
</div>
      </div>
    </div>
  );
};

export default Cart;
