import React from "react";
import Card from "../../components/card";
import "./index.css";

export default class All extends React.Component {
  state = {
    allData: [],
  };

  componentDidMount() {
    const query = `
      query GetAllProducts {
        products {
          id
          name
          inStock
          gallery
          price
        }
      }
    `;
  
    fetch('https://php-backend-scandi-f01df9736f18.herokuapp.com/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("before condition.");
        if (data.data && data.data.products) {
          const formattedData = data.data.products.map((product) => ({
            id: product.id,
            image: product.gallery[0], 
            name: product.name,
            price: product.price,
            inStock: product.inStock,
          }));
          console.log("Fetched all products:", formattedData); 
  
          this.setState({ allData: formattedData });
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  

  render() {
    const { allData } = this.state;

    return (
      <>
        <h1 className="title">All products</h1>
        <div className="items-container">
          {allData.map((item) => (
            <Card key={item.id} {...item} category="All" />
          ))}
        </div>
      </>
    );
  }
}
