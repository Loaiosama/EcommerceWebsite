import React from "react";
import Card from "../../components/card";
import "./index.css";

export default class Clothes extends React.Component {
  state = {
    clothesData: [],
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
      category: "clothes",
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
          console.log("Fetched clothes products:", formattedData); 

          this.setState({ clothesData: formattedData });
        }
      })
      .catch((error) => console.error("Error fetching clothes products:", error));
  }

  render() {
    const { clothesData } = this.state;

    return (
      <>
        <h1 className="title">Clothes</h1>
        <div className="items-container">
          {clothesData.map((item) => (
            <Card data-testid={`product-${item.name.replaceAll(' ', '-')}`} key={item.id} {...item} category="clothes" />
          ))}
        </div>
      </>
    );
  }
}
