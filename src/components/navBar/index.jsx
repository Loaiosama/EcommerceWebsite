import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "../../assets/logo.png"; // Example logo image
import cart from "../../assets/shopping-cart.png"; // Cart icon
import productImage1 from "../../assets/jupiter.png"; // Example product image
import productImage2 from "../../assets/jupiter.png"; // Example product image
import productImage3 from "../../assets/jupiter.png"; // Example product image

export default class NavBar extends React.Component {
  state = {
    activeTab: "WOMEN", // Set the default active tab
    cartVisible: false, // Manage cart visibility
    cartItems: [
      {
        id: 1,
        name: "Running shorts",
        price: 29.99,
        size: "M",
        color: "Red",
        image: productImage1,
        quantity: 1, // Initialize quantity for each item
      },
      {
        id: 2,
        name: "Product 2",
        price: 39.99,
        size: "L",
        color: "Blue",
        image: productImage2,
        quantity: 1,
      },
      {
        id: 3,
        name: "Product 3",
        price: 19.99,
        size: "S",
        color: "Green",
        image: productImage3,
        quantity: 1,
      },
    ],
  };

  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  toggleCartVisibility = () => {
    this.setState((prevState) => ({
      cartVisible: !prevState.cartVisible,
    }));
  };

  incrementQuantity = (id) => {
    this.setState((prevState) => ({
      cartItems: prevState.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  decrementQuantity = (id) => {
    this.setState((prevState) => {
      const item = prevState.cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        return {
          cartItems: prevState.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      } else {
        // Remove item from cart if quantity is 1 or less
        return {
          cartItems: prevState.cartItems.filter((item) => item.id !== id),
        };
      }
    });
  };

  getTotalItems = () => {
    return this.state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  render() {
    const totalItems = this.getTotalItems(); // Get total items count

    return (
      <>
        <nav className="navbar">
          <div className="navbar-left">
            <h3
              className={this.state.activeTab === "WOMEN" ? "active" : ""}
              onClick={() => this.handleTabClick("WOMEN")}
            >
              <Link to="/women">WOMEN</Link>
            </h3>
            <h3
              className={this.state.activeTab === "MEN" ? "active" : ""}
              onClick={() => this.handleTabClick("MEN")}
            >
              <Link to="/men">MEN</Link>
            </h3>
            <h3
              className={this.state.activeTab === "KIDS" ? "active" : ""}
              onClick={() => this.handleTabClick("KIDS")}
            >
              <Link to="/kids">KIDS</Link>
            </h3>
          </div>

          <div className="navbar-logo">
            <img src={logo} alt="Site Logo" />
          </div>

          <div className="navbar-right">
            <img
              src={cart}
              className="cart-icon-nav"
              alt="Cart Icon"
              onClick={this.toggleCartVisibility} // Toggle cart visibility on click
            />
          </div>
        </nav>

        {this.state.cartVisible && (
          <div className="modal" onClick={this.toggleCartVisibility}>
            <div className="cart-window" onClick={(e) => e.stopPropagation()}>
              <h4>
                My Bag. {totalItems > 0 && `${totalItems} items`} {/* Display total items */}
              </h4>
              <ul className="cart-items">
                {this.state.cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <h3 className="product-name-cart">{item.name}</h3>
                      <p className="cart-item-price">${item.price}</p>
                      <div className='size-cart'>
                        <p>SIZE:</p>
                        <span>{item.size}</span>
                      </div>
                      <div className='color-cart'>
                        <p>COLOR:</p>
                        <span style={{ backgroundColor: item.color.toLowerCase() }} className="color-swatch-cart"></span>
                      </div>
                    </div>
                    <div className="cart-image-container">
                      <div className="quantity-control">
                        <button
                          className="arrow-button"
                          onClick={() => this.incrementQuantity(item.id)}
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="arrow-button"
                          onClick={() => this.decrementQuantity(item.id)}
                        >
                          -
                        </button>
                      </div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={this.toggleCartVisibility}>Close</button>
            </div>
          </div>
        )}
      </>
    );
  }
}
