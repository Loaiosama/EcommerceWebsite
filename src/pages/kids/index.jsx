import React from "react";
import Card from "../../components/card";
import "./index.css";

export default class Women extends React.Component {
  state = {
    womenData: [],
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
  
    fetch("http://localhost:8000/app/Graphql/graphql.php", {
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
  
          this.setState({ womenData: formattedData });
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
  

  render() {
    const { womenData } = this.state;

    return (
      <>
        <h1 className="title">All products</h1>
        <div className="items-container">
          {womenData.map((item) => (
            <Card key={item.id} {...item} category="women" />
          ))}
        </div>
      </>
    );
  }
}
