import React from 'react';
import jupiter from '../../assets/jupiter.png';
import cart from '../../assets/shopping_cart.png';
import './index.css';
import { Link } from "react-router-dom";

export default class Card extends React.Component {
    render() {
        const cardClass = this.props.inStock ? 'card-container' : 'card-container out-of-stock';
        
        return (
            <div className={cardClass}>
                {this.props.inStock ? (
                    // Wrap the image and cart icon inside the Link
                    <Link to={`/${this.props.category}/${this.props.id}`} className="card-link">
                        <div className="img-container">
                            <img src={this.props.image} alt="Women Clothing" />
                            <img src={cart} className="cart-icon" alt="cart icon" />
                        </div>
                    </Link>
                ) : (
                    <Link to={`/${this.props.category}/${this.props.id}`} className="card-link">
                        <div className="img-container">
                            <img src={this.props.image} alt="Women Clothing" />
                            <div className="overlay">OUT OF STOCK</div>
                        </div>
                    </Link>
                )}

                <div className="text-container">
                    <p className="item-name">{this.props.name}</p>
                    <p className="item-price">${this.props.price}</p>
                </div>
            </div>
        );
    }
}
