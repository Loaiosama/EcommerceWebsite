import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import logo from "../../assets/logo.png"; // Example logo image
import cart from "../../assets/shopping-cart.png"; // Cart icon

export default class NavBar extends React.Component {
  state = {
    activeTab: "WOMEN", // Set the default active tab
    cartVisible: false, // Manage cart visibility
  };

  previousTotalItems = 0; // To keep track of previous total items count


  handleTabClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  toggleCartVisibility = () => {
    this.setState((prevState) => ({
      cartVisible: !prevState.cartVisible,
    }));
  };

  getTotalItems = () => {
    return this.props.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  componentDidUpdate(prevProps) {
    const totalItems = this.getTotalItems();

    // Check if totalItems increased and if cart is not already visible
    if (totalItems > this.previousTotalItems && !this.state.cartVisible) {
      this.setState({ cartVisible: true });
    }

    // Update previousTotalItems after comparison
    this.previousTotalItems = totalItems;
  }

  render() {
    const { cartItems, incQuantity, decQuantity } = this.props;
    const totalItems = this.getTotalItems(); // Get total items count

    return (
      <>
        <nav className="navbar">
          <div className="navbar-left">
            <h3
              className={this.state.activeTab === "WOMEN" ? "active" : ""}
              onClick={() => this.handleTabClick("WOMEN")}
            >
              <Link to="/women">CLOTHES</Link>
            </h3>
            <h3
              className={this.state.activeTab === "MEN" ? "active" : ""}
              onClick={() => this.handleTabClick("MEN")}
            >
              <Link to="/men">TECH</Link>
            </h3>
            <h3
              className={this.state.activeTab === "KIDS" ? "active" : ""}
              onClick={() => this.handleTabClick("KIDS")}
            >
              <Link to="/kids">ALL</Link>
            </h3>
          </div>

          <div className="navbar-logo">
            <img src={logo} alt="Site Logo" />
          </div>

          <div className="navbar-right">
            <div className="cart-icon-container" onClick={this.toggleCartVisibility}>
              <img src={cart} className="cart-icon-nav" alt="Cart Icon" />
              {totalItems > 0 && (
                <div className="cart-notification">
                  {totalItems}
                </div>
              )}
            </div>
          </div>
        </nav>

        {this.state.cartVisible && (
          <div className="modal" onClick={this.toggleCartVisibility}>
            <div className="cart-window" onClick={(e) => e.stopPropagation()}>
              <h4>
                My Bag. {totalItems >= 0 && `${totalItems} items`} {/* Display total items */}
              </h4>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <h3 className="product-name-cart">{item.name}</h3>
                      <p className="cart-item-price">${item.price}</p>

                    {item.size && (
                      <div className="size-cart">
                        <p>SIZE:</p>
                        <span className="item-size-cart selected">{item.size}</span>
                      </div>
                    )}

                    {item.color && (
                      <div className="color-cart">
                        <p>COLOR:</p>
                        <span
                          className="color-swatch-cart selected"
                          style={{ backgroundColor: item.color.toLowerCase() }}
                        ></span>
                      </div>
                    )}

                    {item.capacity && (
                      <div className="size-cart">
                        <p>CAPACITY:</p>
                        <span className="item-size-cart selected">{item.capacity}</span>
                      </div>
                    )}
                      
                      
                    </div>

                    <div className="cart-image-container">
                      <div className="quantity-control">
                        <button
                          className="arrow-button-top"
                          onClick={() => incQuantity(item.id)} // Increment quantity
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="arrow-button-bot"
                          onClick={() => decQuantity(item.id)} // Decrement quantity
                        >
                          -
                        </button>
                      </div>
                      <img src={item.image} alt={item.name} className="cart-item-image" />
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
