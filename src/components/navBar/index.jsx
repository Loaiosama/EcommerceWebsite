import React from 'react';
import './index.css';
import logo from '../../assets/logo.png'; // Example logo image
import cart from '../../assets/shopping-cart.png'; // Cart icon
import productImage1 from '../../assets/jupiter.png'; // Example product image
import productImage2 from '../../assets/jupiter.png'; // Example product image
import productImage3 from '../../assets/jupiter.png'; // Example product image

export default class NavBar extends React.Component {
    state = {
        activeTab: 'WOMEN',  // Set the default active tab
        cartVisible: false,   // Manage cart visibility
        cartItems: [
            { id: 1, name: 'Product 1', price: '$29.99', size: 'M', color: 'Red', image: productImage1 },
            { id: 2, name: 'Product 2', price: '$39.99', size: 'L', color: 'Blue', image: productImage2 },
            { id: 3, name: 'Product 3', price: '$19.99', size: 'S', color: 'Green', image: productImage3 },
        ],
    };

    handleTabClick = (tab) => {
        this.setState({ activeTab: tab });
    };

    toggleCartVisibility = () => {
        this.setState((prevState) => ({
            cartVisible: !prevState.cartVisible,
        }));
    };

    render() {
        return (
            <>
                <nav className="navbar">
                    <div className="navbar-left">
                        <h3
                            className={this.state.activeTab === 'WOMEN' ? 'active' : ''}
                            onClick={() => this.handleTabClick('WOMEN')}
                        >
                            WOMEN
                        </h3>
                        <h3
                            className={this.state.activeTab === 'MEN' ? 'active' : ''}
                            onClick={() => this.handleTabClick('MEN')}
                        >
                            MEN
                        </h3>
                        <h3
                            className={this.state.activeTab === 'KIDS' ? 'active' : ''}
                            onClick={() => this.handleTabClick('KIDS')}
                        >
                            KIDS
                        </h3>
                    </div>

                    <div className="navbar-logo">
                        <img src={logo} alt="Site Logo" />
                    </div>

                    <div className="navbar-right">
                        <img
                            src={cart}
                            className="cart-icon-nav"
                            alt="Cart Icon"
                            onClick={this.toggleCartVisibility} // Toggle cart visibility on click
                        />
                    </div>
                </nav>

                
                {this.state.cartVisible && (
                    <div className="modal" onClick={this.toggleCartVisibility}>
                        <div className="cart-window" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks on modal content from closing it */}
                            <h4>My Bag</h4>
                            <ul className="cart-items">
                                {this.state.cartItems.map(item => (
                                    <li key={item.id} className="cart-item">
                                        <div className="cart-item-details">
                                            <h5>{item.name}</h5>
                                            <p>{item.price}</p>
                                            <p>Size: {item.size}</p>
                                            <p>Color: {item.color}</p>
                                        </div>
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                    </li>
                                ))}
                            </ul>
                            <button onClick={this.toggleCartVisibility}>Close</button>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
