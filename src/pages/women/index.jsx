import React from "react";
import Card from "../../components/card";
import "./index.css";

const womenData = [
  {
    id: 1,
    image: "./default",
    name: "Running shorts",
    price: 50.0,
    inStock: true,
  },
  {
    id: 2,
    image: "./default",
    name: "Running Shoes",
    price: 50.0,
    inStock: false,
  },
  {
    id: 3,
    image: "./default",
    name: "Rain coat",
    price: 50.0,
    inStock: false,
  },
  {
    id: 4,
    image: "./default",
    name: "Belt",
    price: 50.0,
    inStock: true,
  },
];

export default class Women extends React.Component {
  render() {
    return (
      <>
        <h1 className="title">Women</h1>
        <div className="items-container">
          {womenData.map((item, index) => (
            <Card key={index} {...item} category = "women" />
          ))}
        </div>
      </>
    );
  }
}
