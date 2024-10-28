import React from "react";
import Card from "../../components/card";
import RainCoat from "../../assets/Rain coat.png"
import RunningShoes from "../../assets/Running shoes.jpg"
import RunningShorts from "../../assets/Running shorts.webp"
import sweater from "../../assets/sweater1.png"

import "./index.css";

const womenData = [
  {
    id: 1,
    image: sweater,
    name: "Sweater",
    price: 50.0,
    inStock: true,
  },
  {
    id: 2,
    image: RunningShorts,
    name: "Running shorts",
    price: 50.0,
    inStock: false,
  },
  {
    id: 3,
    image: RainCoat,
    name: "Rain coat",
    price: 50.0,
    inStock: false,
  },
  {
    id: 4,
    image: RunningShoes,
    name: "Running Shoes",
    price: 50.0,
    inStock: true,
  },
];

export default class Men extends React.Component {
  render() {
    return (
      <>
        <h1 className="title">Men</h1>
        <div className="items-container">
          {womenData.map((item, index) => (
            <Card key={index} {...item} category = "women" />
          ))}
        </div>
      </>
    );
  }
}
