import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Clothes from "./pages/clothes/index.jsx";
import Tech from "./pages/Tech/index.jsx";
import All from "./pages/All/index.jsx";
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

  addToCart = (product) => {
    this.setState((prevState) => {
      const existingProduct = prevState.cartItems.find(
        (item) => item.id === product.id && item.size === product.size && item.color === product.color && item.capacity === product.capacity
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

  decQuantity = (id) => {
    this.setState((prevState) => {
      const updatedCart = prevState.cartItems
        .map((item) => {
          if (item.id === id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null); 

      return {
        cartItems: updatedCart,
      };
    });
  };

  clearCart = () => {
    this.setState({ cartItems: [] }); 
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
              path="/clothes"
              render={() => <Clothes />}
            />
            <Route
              path="/tech"
              render={() => <Tech />}
            />
            <Route
              path="/all"
              render={() => <All />}
            />
            <Route path="*">
              <Redirect to="/clothes" />
            </Route>
          </Switch>
      </MyContext.Provider>

    );
  }
}

export default App;
