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

  placeOrder = ({clearCart}) => {
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
                <Link to="/clothes">
                  <h3
                    className={this.state.activeTab === "CLOTHES" ? "active" : ""}
                    onClick={() => this.handleTabClick("CLOTHES")}
                  >
                    CLOTHES
                  </h3>
                </Link>

                <Link to="/tech">
                  <h3
                    className={this.state.activeTab === "TECH" ? "active" : ""}
                    onClick={() => this.handleTabClick("TECH")}
                  >
                    TECH
                  </h3>
                </Link>
                <Link to="/all">
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
                    My Bag. {totalItems >= 0 && `${totalItems} items`} 
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
                              onClick={() => incQuantity(item.id)} 
                            >
                              +
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="arrow-button-bot"
                              onClick={() => decQuantity(item.id)} 
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
