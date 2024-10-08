import React from "react";
import Card from "../../components/card";
import './index.css'

const womenData = [
  {
    image: "./default",
    name: "Running shorts",
    price: 50.00,
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
        
        <div className="items-container">
          <h1 className="title">Women</h1>
          {womenData.map((item, index)=> <Card key={index} {...item} />)}
        </div>
        
      </>
    );
  }
}
