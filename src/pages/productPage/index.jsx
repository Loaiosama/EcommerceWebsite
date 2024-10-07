import React from 'react';
import './index.css';
import Product from "../../components/product";
// import jupiter from '../../assets/jupiter.png';
// import bashar from '../../assets/3bashar.jpg';
// import dad from '../../assets/3dad.png';
// import fisha from '../../assets/fisha.jpg';
// import person from '../../assets/person.jpg';
import sweater from '../../assets/sweater1.png'

const productData = {
    gallery: [sweater, sweater, sweater, sweater, sweater],
    name: "Running shorts",
    price: 50.00,
    sizes: ['XS', 'S', 'M', 'L'], // Split sizes into individual elements
    colors: ['Red', 'Blue', 'Green'], // Add color options
    description: "Cozy and warm knit garment designed to keep you comfortable during cold weather. "
}

export default class ProductPage extends React.Component {
    state = {
        sizeChosen: productData.sizes[0],
        colorChosen: productData.colors[0] // Add color state
    }

    changeSize = (newSize) => {
        this.setState({ sizeChosen: newSize });
    }

    changeColor = (newColor) => {
        this.setState({ colorChosen: newColor });
    }

    render() {
        return (
            <div className="product-container">

                <Product gallery={productData.gallery} />
                
                <div className="product-info">
                    <h2>{productData.name}</h2>
                    
                    <div className='size'>
                        <p>SIZE:</p>
                        <div className="size-options">
                            {productData.sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-button ${this.state.sizeChosen === size ? 'selected' : ''}`}
                                    onClick={() => this.changeSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className='color'>
                        <p>COLOR:</p>
                        <div className="color-options">
                            {productData.colors.map((color, index) => (
                                <button
                                    key={index}
                                    className={`color-button ${this.state.colorChosen === color ? 'selected' : ''}`}
                                    onClick={() => this.changeColor(color)}
                                    style={{ backgroundColor: color.toLowerCase() }} // Set background to color
                                >
                                    {/* Remove the color name display */}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="price">
                        <p className="price-label">PRICE:</p>
                        <p className="price-value">${productData.price.toFixed(2)}</p>
                    </div>
                    
                    <button className='addToCart'>
                        ADD TO CART
                    </button>

                    <div className='description'>
                        {productData.description}
                    </div>

                </div>
            </div>
        )
    }
}
