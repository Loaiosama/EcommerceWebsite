import React from 'react';
import { request, gql } from 'graphql-request';
import cart from '../../assets/shopping_cart.png';
import './index.css';
import { Link } from "react-router-dom";
import MyContext from "../../context/context";

const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      price
      category
      gallery
      attributes {
        name
        items {
          display_value
          value
        }
      }
    }
  }
`;

export default class Card extends React.Component {
    addItemToCart = ({addToCart}) => {
        const { id } = this.props;

        request('https://php-backend-scandi-f01df9736f18.herokuapp.com/', PRODUCT_QUERY, { id })
            .then((data) => {
                const product = data.product;

                const size = product.attributes.find(attr => attr.name === "Size")?.items[0]?.value || null;
                const color = product.attributes.find(attr => attr.name === "Color")?.items[0]?.value || null;
                const capacity = product.attributes.find(attr => attr.name === "Capacity")?.items[0]?.value || null;
                
                const sizeOptions = product.category === "clothes"
                    ? product.attributes.find(attr => attr.name === "Size")?.items || []
                    : [];
                const colorOptions = product.attributes.find(attr => attr.name === "Color")?.items || [];
                const capacityOptions = product.category === "tech"
                    ? product.attributes.find(attr => attr.name === "Capacity")?.items || []
                    : [];

                const productToAdd = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    size,
                    color,
                    capacity,
                    sizeOptions,
                    colorOptions,
                    capacityOptions,
                    image: product.gallery[0]
                };

                addToCart(productToAdd);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    };

    render() {
        const cardClass = this.props.inStock ? 'card-container' : 'card-container out-of-stock';

        return (
            <MyContext.Consumer>
                {context => (
                    <div className={cardClass} data-testid={`product-${this.props.name.replaceAll(' ', '-')}`}>
                        {this.props.inStock ? (
                            <Link to={`/${this.props.category}/${this.props.id}`} className="card-link">
                                <div className="img-container">
                                    <img src={this.props.image} alt="Product" />
                                    <img
                                        src={cart}
                                        className="cart-icon"
                                        alt="cart icon"
                                        onClick={(e) =>{e.preventDefault(); this.addItemToCart(context)}} // Attach onClick handler here
                                    />
                                </div>
                            </Link>
                        ) : (
                            <Link to={`/${this.props.category}/${this.props.id}`} className="card-link">
                                <div className="img-container">
                                    <img src={this.props.image} alt="Product" />
                                    <div className="overlay">OUT OF STOCK</div>
                                </div>
                            </Link>
                        )}

                        <div className="text-container">
                            <p className="item-name">{this.props.name}</p>
                            <p className="item-price">${this.props.price}</p>
                        </div>
                    </div>
                )}
            </MyContext.Consumer>

        );
    }
}
