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


// import React from "react";
// import { Link } from "react-router-dom";
// import "./index.css";
// import logo from "../../assets/logo.png"; // Example logo image
// import cart from "../../assets/shopping-cart.png"; // Cart icon
// import productImage1 from "../../assets/sweater1.png"; // Example product image
// import productImage2 from "../../assets/Running shorts.webp"; // Example product image
// import productImage3 from "../../assets/jupiter.png"; // Example product image

// export default class NavBar extends React.Component {
//   state = {
//     activeTab: "WOMEN", // Set the default active tab
//     cartVisible: false, // Manage cart visibility
//     cartItems: [
//       {
//         id: 1,
//         name: "Sweater",
//         price: 100.00,
//         availableSizes: ["S", "M", "L", "XL"], // Array of available sizes
//         chosenSize: "M", // Chosen size from the available ones
//         availableColors: ["Green", "Blue", "Red"], // Array of available colors
//         chosenColor: "Green", // Chosen color from the available ones
//         image: productImage1,
//         quantity: 1, // Initialize quantity for each item
//       },
//       {
//         id: 2,
//         name: "Running Shorts",
//         price: 50.00,
//         availableSizes: ["S", "M", "L", "XL"],
//         chosenSize: "L",
//         availableColors: ["Black", "Gray", "Navy"],
//         chosenColor: "Black",
//         image: productImage2,
//         quantity: 1,
//       },
//       {
//         id: 3,
//         name: "Jupiter Hoodie",
//         price: 19.99,
//         availableSizes: ["XS", "S", "M", "L"],
//         chosenSize: "S",
//         availableColors: ["Green", "Yellow", "Black"],
//         chosenColor: "Green",
//         image: productImage3,
//         quantity: 1,
//       },
  
//     ],
//   };

//   handleTabClick = (tab) => {
//     this.setState({ activeTab: tab });
//   };

//   toggleCartVisibility = () => {
//     this.setState((prevState) => ({
//       cartVisible: !prevState.cartVisible,
//     }));
//   };

//   incrementQuantity = (id) => {
//     this.setState((prevState) => ({
//       cartItems: prevState.cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       ),
//     }));
//   };

//   decrementQuantity = (id) => {
//     this.setState((prevState) => {
//       const item = prevState.cartItems.find((item) => item.id === id);
//       if (item && item.quantity > 1) {
//         return {
//           cartItems: prevState.cartItems.map((item) =>
//             item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//           ),
//         };
//       } else {
//         // Remove item from cart if quantity is 1 or less
//         return {
//           cartItems: prevState.cartItems.filter((item) => item.id !== id),
//         };
//       }
//     });
//   };

//   getTotalItems = () => {
//     return this.state.cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   render() {
//     const totalItems = this.getTotalItems(); // Get total items count

//     return (
//       <>
//         <nav className="navbar">
//           <div className="navbar-left">
//             <h3
//               className={this.state.activeTab === "WOMEN" ? "active" : ""}
//               onClick={() => this.handleTabClick("WOMEN")}
//             >
//               <Link to="/women">CLOTHES</Link>
//             </h3>
//             <h3
//               className={this.state.activeTab === "MEN" ? "active" : ""}
//               onClick={() => this.handleTabClick("MEN")}
//             >
//               <Link to="/men">TECH</Link>
//             </h3>
//             <h3
//               className={this.state.activeTab === "KIDS" ? "active" : ""}
//               onClick={() => this.handleTabClick("KIDS")}
//             >
//               <Link to="/kids">ALL</Link>
//             </h3>
//           </div>

//           <div className="navbar-logo">
//             <img src={logo} alt="Site Logo" />
//           </div>

//           <div className="navbar-right">
//             <img
//               src={cart}
//               className="cart-icon-nav"
//               alt="Cart Icon"
//               onClick={this.toggleCartVisibility} // Toggle cart visibility on click
//             />
//           </div>
//         </nav>

//         {this.state.cartVisible && (
//           <div className="modal" onClick={this.toggleCartVisibility}>
//             <div className="cart-window" onClick={(e) => e.stopPropagation()}>
//               <h4>
//                 My Bag. {totalItems > 0 && `${totalItems} items`} {/* Display total items */}
//               </h4>
//               <ul className="cart-items">
//                 {this.state.cartItems.map((item) => (
//                   <li key={item.id} className="cart-item">
//                     <div className="cart-item-details">
//                       <h3 className="product-name-cart">{item.name}</h3>
//                       <p className="cart-item-price">${item.price}</p>

//                       <div className="size-cart">
//                         <p>SIZE:</p>
//                         {item.availableSizes.map((size) => (
//                           <span
//                             key={size}
//                             className={`item-size-cart ${size === item.chosenSize ? 'selected' : ''}`}
//                           >
//                             {size}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="color-cart">
//                         <p>COLOR:</p>
//                         <div className="color-swatches">
//                           {item.availableColors.map((color) => (
//                             <span
//                               key={color}
//                               style={{ backgroundColor: color.toLowerCase() }}
//                               className={`color-swatch-cart ${color === item.chosenColor ? "selected" : ""}`}
//                             ></span>
//                           ))}
//                         </div>
//                       </div>


//                     </div>

//                     <div className="cart-image-container">
//                       <div className="quantity-control">
//                         <button
//                           className="arrow-button-top"
//                           onClick={() => this.incrementQuantity(item.id)}
//                         >
//                           +
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           className="arrow-button-bot"
//                           onClick={() => this.decrementQuantity(item.id)}
//                         >
//                           -
//                         </button>
//                       </div>
//                       <img src={item.image} alt={item.name} className="cart-item-image" />
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               <button onClick={this.toggleCartVisibility}>Close</button>
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
// }
