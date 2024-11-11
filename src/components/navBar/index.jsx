import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import MyContext from "../../context/context";
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

  calculateTotalPrice() {
    const { cartItems } = this.props; // Assuming cartItems is passed as a prop
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  componentDidUpdate() {
    const totalItems = this.getTotalItems();

    // Check if totalItems increased and if cart is not already visible
    if (totalItems > this.previousTotalItems && !this.state.cartVisible) {
      this.setState({ cartVisible: true });
    }

    // Update previousTotalItems after comparison
    this.previousTotalItems = totalItems;
  }

  // Function to send GraphQL mutation using fetch
  placeOrder = ({clearCart}) => {
    const { cartItems } = this.props;

    // Iterate over cartItems and execute the mutation for each item
    cartItems.forEach((item) => {
      const mutation = `
        mutation {
          addOrder(
            product_id: "${item.id}",
            name: "${item.name}",
            price: ${item.price},
            size: "${item.size}",
            color: "${item.color}",
            capacity: "${item.capacity}",
            quantity: ${item.quantity}
          )
        }
      `;

      // Send the GraphQL request using fetch
      fetch('http://localhost:8000/app/Graphql/graphql.php', {  // Replace with your actual GraphQL endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            console.error("GraphQL Error:", data.errors);
          } else {
            console.log("Order placed successfully", data);
            // After placing the order, clear the cart and close it
            this.clearCartAndClose(clearCart);
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    });
  };

  // Function to clear the cart and close the modal
  clearCartAndClose = (clearCart) => {
    clearCart();  // Assuming clearCart is passed as a prop to clear cart in the parent component
    this.setState({ cartVisible: false });
  };

  render() {
    const { cartItems, incQuantity, decQuantity } = this.props;
    const totalItems = this.getTotalItems(); // Get total items count
    const totalPrice = this.calculateTotalPrice(); // Get the total price

    return (
      <MyContext.Consumer>
        {context => (
          <>
            <nav className="navbar">
              <div className="navbar-left">
                <Link to="/women">
                  <h3
                    className={this.state.activeTab === "WOMEN" ? "active" : ""}
                    onClick={() => this.handleTabClick("WOMEN")}
                  >
                    CLOTHES
                  </h3>
                </Link>

                <Link to="/men">
                  <h3
                    className={this.state.activeTab === "MEN" ? "active" : ""}
                    onClick={() => this.handleTabClick("MEN")}
                  >
                    TECH
                  </h3>
                </Link>
                <Link to="/kids">
                  <h3
                    className={this.state.activeTab === "KIDS" ? "active" : ""}
                    onClick={() => this.handleTabClick("KIDS")}
                  >
                    ALL
                  </h3>
                </Link>
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

                  <div className="cart-total-price">
                    <span className="total-label">Total:</span>
                    <span className="total-price">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="place-order-btn" onClick={() => this.placeOrder(context)}>PLACE ORDER</button> {/* Place Order button */}
                </div>
              </div>
            )}
          </>
        )}</MyContext.Consumer>

    );
  }
}
