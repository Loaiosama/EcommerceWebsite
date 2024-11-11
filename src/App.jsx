import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Women from "./pages/women";
import Men from "./pages/men";
import Kids from "./pages/kids";
import ProductPage from "./pages/productPage";
import MyContext from "./context/context.js";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
    };
  }

  // Function to add product to cart
  addToCart = (product) => {
    this.setState((prevState) => {
      const existingProduct = prevState.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cartItems: prevState.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...prevState.cartItems, { ...product, quantity: 1 }],
        };
      }
    });
  };

  // Function to increment quantity of an item
  incQuantity = (id) => {
    this.setState((prevState) => {
      return {
        cartItems: prevState.cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    });
  };

  // Function to decrement quantity of an item
  decQuantity = (id) => {
    this.setState((prevState) => {
      const updatedCart = prevState.cartItems
        .map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null; // Remove item if quantity is 1
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null); // Filter out null items

      return {
        cartItems: updatedCart,
      };
    });
  };

  clearCart = () => {
    this.setState({ cartItems: [] }); // Clears the cartItems array
  };

  render() {
    return (
      <MyContext.Provider value={{ addToCart: this.addToCart, clearCart: this.clearCart }}>
          <NavBar
            cartItems={this.state.cartItems}
            incQuantity={this.incQuantity}
            decQuantity={this.decQuantity}
          />
          <Switch>
            <Route
              path="/:category/:id"
              render={() => (
                (<ProductPage />)
              )}
            />
            <Route
              path="/women"
              render={() => <Women />}
            />
            <Route
              path="/men"
              render={() => <Men />}
            />
            <Route
              path="/kids"
              render={() => <Kids />}
            />
            <Route path="*">
              <Redirect to="/women" />
            </Route>
          </Switch>
      </MyContext.Provider>

    );
  }
}

export default App;
