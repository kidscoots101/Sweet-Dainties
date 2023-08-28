import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "../assets/sweet-dainties-logo.jpeg";
import cart from "../assets/cart.png";
import product1 from "../assets/walnut-fruit-cake.png";
import product2 from "../assets/chewy chocolate.png";
import product3 from "../assets/assorted-muffins.png";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const ProductShowcase = ({
  products,
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  return (
    <div className="product-showcase">
      {products.map((product, index) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;

        return (
          <div className="product-card" key={index}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <div className="cart-controls">
                <button
                  className={`cart-button ${
                    quantityInCart > 0 ? "added-to-cart" : ""
                  }`}
                  onClick={() => {
                    if (quantityInCart > 0) {
                      removeFromCart(product.id, true);
                    } else {
                      addToCart(product);
                    }
                  }}
                >
                  {quantityInCart > 0 ? "Remove from Cart" : "Add to Cart"}
                </button>
                {quantityInCart > 0 && (
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => removeFromCart(product.id, true)}
                    >
                      -
                    </button>
                    <div className="quantity">{quantityInCart}</div>
                    <button
                      className="quantity-button"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CartItem = ({
  item,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <div className="cart-item-controls">
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Walnut Fruit Cake",
      image: product1,
      price: "24.99",
    },
    {
      id: 2,
      name: "Big Chewy Chocolate Chip Cookie",
      image: product2,
      price: "7.99",
    },
    {
      id: 3,
      name: "Assorted Muffins",
      image: product3,
      price: "1.99",
    },
    { id: 1, name: "Walnut Fruit Cake", image: product1, price: "24.99" },
    {
      id: 2,
      name: "Big Chewy Chocolate Chip Cookie",
      image: product2,
      price: "7.99",
    },
    {
      id: 3,
      name: "Assorted Muffins",
      image: product3,
      price: "1.99",
    },
    { id: 1, name: "Walnut Fruit Cake", image: product1, price: "24.99" },
    {
      id: 2,
      name: "Big Chewy Chocolate Chip Cookie",
      image: product2,
      price: "7.99",
    },
    {
      id: 3,
      name: "Assorted Muffins",
      image: product3,
      price: "1.99",
    },
  ];
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    document.getElementById("cart-counter").textContent = cartCount.toString();
  }, [cartItems]);

  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, decreaseQuantity = false) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: decreaseQuantity ? item.quantity - 1 : item.quantity,
          }
        : item,
    );

    setCartItems(updatedCart.filter((item) => item.quantity > 0));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCartItems(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    setCartItems(updatedCart.filter((item) => item.quantity > 0));
  };
  const navigate = useNavigate(); 

  const handleCartClick = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate({
        pathname: "/cart",
        state: { cartItems } 
      });
  };
  const iconStyle = {
    fontSize: '24px',
    margin: '0 10px',
    color: '#333',
    transition: 'color 0.3s ease-in-out',
};

  return (
    <div className="home-container">
      <header className="header">
        <img className="logo" src={logo} alt="Product Logo" />
        <div className="cartwrapper">
          <img
            className="cart"
            src={cart}
            alt="cart"
            onClick={handleCartClick}
          />
          <div className="cart-counter" id="cart-counter">
            {cartItems.length}
          </div>
          {/* <text className='navcart'>Cart</text> */}
        </div>
      </header>
      <div className="product-section">
      <ProductShowcase
          products={products}
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
        
      <footer className="footer" style={{ textAlign: 'center' }}>
    &copy; 2023 Sweet Dainties <br />
         <div style={{ marginTop: '10px' }}>
                <a href="https://www.instagram.com/sweet.dainties/s" style={{ ...iconStyle, color: '#e4405f' }}>
                    <FaInstagram />
                </a>
                <a href="https://www.facebook.com" style={{ ...iconStyle, color: '#1877f2' }}>
                    <FaFacebook />
                </a>
            </div>
          <text style={{fontSize: 14}}>Done by Caleb Han</text>
</footer>

    </div>
  );
}
