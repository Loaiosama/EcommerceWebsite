import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import MyContext from "../../context/context";
import logo from "../../assets/logo.png";
import cart from "../../assets/shopping-cart.png";

export default class NavBar extends React.Component {
  state = {
    activeTab: "CLOTHES",
    cartVisible: false,
  };

  previousTotalItems = 0;

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
    const { cartItems } = this.props;
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  componentDidUpdate() {
    const totalItems = this.getTotalItems();

    if (totalItems > this.previousTotalItems && !this.state.cartVisible) {
      this.setState({ cartVisible: true });
    }

    this.previousTotalItems = totalItems;
  }

  placeOrder = ({ clearCart }) => {
    const { cartItems } = this.props;

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

      fetch('http://localhost:8000/app/Graphql/graphql.php', {
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
            this.clearCartAndClose(clearCart);
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    });
  };

  clearCartAndClose = (clearCart) => {
    clearCart();
    this.setState({ cartVisible: false });
  };

  render() {
    const { cartItems, incQuantity, decQuantity } = this.props;
    const totalItems = this.getTotalItems();
    const totalPrice = this.calculateTotalPrice();

    return (
      <MyContext.Consumer>
        {context => (
          <>
            <nav className="navbar">
              <div className="navbar-left">
                <Link to="/clothes" data-testid={this.state.activeTab === "CLOTHES" ? "active-category-link" : "category-link"}>
                  <h3
                    className={this.state.activeTab === "CLOTHES" ? "active" : ""}
                    onClick={() => this.handleTabClick("CLOTHES")}
                  >
                    CLOTHES
                  </h3>
                </Link>

                <Link to="/tech" data-testid={this.state.activeTab === "TECH" ? "active-category-link" : "category-link"}>
                  <h3
                    className={this.state.activeTab === "TECH" ? "active" : ""}
                    onClick={() => this.handleTabClick("TECH")}
                  >
                    TECH
                  </h3>
                </Link>
                <Link to="/all" data-testid={this.state.activeTab === "ALL" ? "active-category-link" : "category-link"}>
                  <h3
                    className={this.state.activeTab === "ALL" ? "active" : ""}
                    onClick={() => this.handleTabClick("ALL")}
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
                    My Bag.
                    <span className="cart-total" data-testid="cart-total" >
                      {totalItems >= 0 && `${totalItems} items`}
                    </span>
                  </h4>
                  <ul className="cart-items">
                    {cartItems.map((item) => (
                      <li key={item.id} className="cart-item" >
                        <div className="cart-item-details">
                          <h3 className="product-name-cart">{item.name}</h3>
                          <p className="cart-item-price">${item.price}</p>
                          
                          {item.sizeOptions.length > 0 && (
                            <div className="size-cart">
                              <p>SIZE:</p>

                              {item.sizeOptions.map((sizeOption) => (
                                <span
                                  key={sizeOption.value}
                                  className={`item-size-cart ${item.size === sizeOption.value ? "selected" : ""}`}
                                >
                                  {sizeOption.value}
                                </span>
                              ))}

                            </div>
                          )}

                          {item.colorOptions.length > 0 && (
                            <div className="color-cart">
                              <p>COLOR:</p>
                              <div className="color-swatches">
                                {item.colorOptions.map((colorOption) => (
                                  <span
                                    key={colorOption.value}
                                    className={`color-swatch-cart ${item.color === colorOption.value ? "selected" : ""}`}
                                    style={{ backgroundColor: colorOption.display_value.toLowerCase() }}
                                  ></span>
                                ))}
                              </div>
                            </div>
                          )}


                          {item.capacityOptions.length > 0 && (
                            <div className="size-cart">
                              <p>CAPACITY:</p>
                              {item.capacityOptions.map((capacityOption) => (
                                <span
                                  key={capacityOption.value}
                                  className={`item-size-cart ${item.capacity === capacityOption.value ? "selected" : ""}`}
                                >
                                  {capacityOption.value}
                                </span>
                              ))}

                            </div>
                          )}
                        </div>

                        <div className="cart-image-container">
                          <div className="quantity-control">
                            <button
                              className="arrow-button-top"
                              onClick={() => incQuantity(item.id)}
                              data-testid="cart-item-amount-increase"
                            >
                              +
                            </button>
                            <span data-testid="cart-item-amount">{item.quantity}</span>
                            <button
                              className="arrow-button-bot"
                              onClick={() => decQuantity(item.id)}
                              data-testid="cart-item-amount-decrease"
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
                  <button className="place-order-btn" onClick={() => this.placeOrder(context)}>PLACE ORDER</button>
                </div>
              </div>
            )}
          </>
        )}</MyContext.Consumer>

    );
  }
}
