import React from "react";
import Card from "../../components/card";

const womenData = [
  {
    image: "./default",
    name: "Running shorts",
    price: 50.0,
    inStock: true,
  },
  {
    image: "./default",
    name: "Running Shoes",
    price: 50.0,
    inStock: false,
  },
  {
    image: "./default",
    name: "Rain coat",
    price: 50.0,
    inStock: false,
  },
  {
    image: "./default",
    name: "Belt",
    price: 50.0,
    inStock: true,
  }
];

export default class Women extends React.Component {
  render() {
    return (
      <>
        <h2>Women</h2>
        {womenData.map((item, index)=> <Card key={index} {...item} />)}
      </>
    );
  }
}
