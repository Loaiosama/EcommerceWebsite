import React from "react";
import Card from "../../components/card";
import "./index.css";

export default class Women extends React.Component {
  state = {
    womenData: [],
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
          console.log("Fetched women products:", formattedData); 

          this.setState({ womenData: formattedData });
        }
      })
      .catch((error) => console.error("Error fetching women products:", error));
  }

  render() {
    const { womenData } = this.state;

    return (
      <>
        <h1 className="title">Tech</h1>
        <div className="items-container">
          {womenData.map((item) => (
            <Card key={item.id} {...item} category="women" />
          ))}
        </div>
      </>
    );
  }
}
