import React from "react";
import Card from "../../components/card";
import "./index.css";

export default class Tech extends React.Component {
  state = {
    techData: [],
  };

  componentDidMount() {
    const query = `
      query GetClothingProducts($category: String!) {
        products(category: $category) {
          id
          name
          inStock
          gallery
          price
        }
      }
    `;

    const variables = {
      category: "tech",
    };

    fetch("http://localhost:8000/app/Graphql/graphql.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
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
          console.log("Fetched tech products:", formattedData); 

          this.setState({ techData: formattedData });
        }
      })
      .catch((error) => console.error("Error fetching tech products:", error));
  }

  render() {
    const { techData } = this.state;

    return (
      <>
        <h1 className="title">Tech</h1>
        <div className="items-container">
          {techData.map((item) => (
            <Card key={item.id} {...item} category="tech" />
          ))}
        </div>
      </>
    );
  }
}
