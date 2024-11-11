import  { Component } from 'react';
import './index.css';
import Product from "../../components/product";
import { request, gql } from 'graphql-request';
import parse from 'html-react-parser';

const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      description
      category
      brand
      inStock
      gallery
      price
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

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: null,
      sizeChosen: null,
      colorChosen: null,
      capacityChosen: null,
    };
  }

  componentDidMount() {
    const productId  = this.props.match?.params?.id;

    request('http://localhost:8000/app/Graphql/graphql.php', PRODUCT_QUERY, { id: productId })
      .then((data) => {
        const product = data.product;
        this.setState({
          productData: product,
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }

  changeSize = (newSize) => {
    this.setState({ sizeChosen: newSize });
  };

  changeColor = (newColor) => {
    this.setState({ colorChosen: newColor });
  };

  changeCapacity = (newCapacity) => {
    this.setState({ capacityChosen: newCapacity });
  };

  canAddToCart = () => {
    const { productData,  sizeChosen, colorChosen, capacityChosen } = this.state;
    if (!productData) return false;
    if(!productData.inStock) return false;

    const sizeOptions = productData.category === "clothes"
      ? productData.attributes.find(attr => attr.name === "Size")?.items || []
      : [];
    const colorOptions = productData.attributes.find(attr => attr.name === "Color")?.items || [];
    const capacityOptions = productData.category === "tech"
      ? productData.attributes.find(attr => attr.name === "Capacity")?.items || []
      : [];

    if (productData.category === "clothes") {
      return sizeOptions.length === 0 || sizeChosen !== null;
    }
    else if (productData.category === "tech") {

      if (colorOptions.length > 0 && capacityOptions.length > 0) {

        return colorChosen !== null && capacityChosen !== null;
      }
      else if (capacityOptions.length > 0) {
        return capacityChosen !== null;
      }
      else if (capacityOptions.length === 0 && colorOptions.length === 0) {
        return true;
      }
    }
    return false;
  };

  handleAddToCart = () => {
    const { addToCart } = this.props; // Get addToCart from props
    const { productData, sizeChosen, colorChosen, capacityChosen } = this.state;
    const image = productData.gallery?.[0];
    // const sizeOptions = productData.category === "clothes"
    //   ? productData.attributes.find(attr => attr.name === "Size")?.items || []
    //   : [];
    // const colorOptions = productData.attributes.find(attr => attr.name === "Color")?.items || [];
    // const capacityOptions = productData.category === "tech"
    //   ? productData.attributes.find(attr => attr.name === "Capacity")?.items || []
    //   : [];

    // Create the product object with selected attributes
    const product = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      size: sizeChosen,
      color: colorChosen,
      capacity: capacityChosen,
      image: image
    };

    // Call the addToCart function passed from parent (App.jsx)
    addToCart(product);
  };

  render() {
    const { productData, sizeChosen, colorChosen, capacityChosen } = this.state;

    if (!productData) return <p>Loading...</p>;

    const { category, attributes } = productData;
    const sizeOptions = category === "clothes"
      ? attributes.find(attr => attr.name === "Size")?.items || []
      : [];
    const colorOptions = attributes.find(attr => attr.name === "Color")?.items || [];
    const capacityOptions = category === "tech"
      ? attributes.find(attr => attr.name === "Capacity")?.items || []
      : [];

    return (
      <div className="product-container">
        <Product gallery={productData.gallery} />

        <div className="product-info">
          <h2>{productData.name}</h2>

          {/* Render Size options if category is "clothes" */}
          {category === "clothes" && (
            <div className="size">
              <p>SIZE:</p>
              <div className="size-options">
                {sizeOptions.map((size, index) => (
                  <button
                    key={index}
                    className={`size-button ${sizeChosen === size.value ? 'selected' : ''}`}
                    onClick={() => this.changeSize(size.value)}
                  >
                    {size.display_value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Color options if available */}
          {colorOptions.length > 0 && (
            <div className="color">
              <p>COLOR:</p>
              <div className="color-options">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    className={`color-button ${colorChosen === color.value ? 'selected' : ''}`}
                    onClick={() => this.changeColor(color.value)}
                    style={{ backgroundColor: color.display_value.toLowerCase() }}
                  >
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Capacity options if category is "tech" */}
          {category === "tech" && capacityOptions.length > 0 && (
            <div className="size">
              <p>CAPACITY:</p>
              <div className="size-options">
                {capacityOptions.map((capacity, index) => (
                  <button
                    key={index}
                    className={`size-button ${capacityChosen === capacity.value ? 'selected' : ''}`}
                    onClick={() => this.changeCapacity(capacity.value)}
                  >
                    {capacity.display_value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="price">
            <p className="price-label">PRICE:</p>
            <p className="price-value">${productData.price.toFixed(2)}</p>
          </div>

          <button
            className={this.canAddToCart() ? "addToCart" : "addToCart disabled"}
            onClick={this.handleAddToCart}
            disabled={!this.canAddToCart()}
          >
            ADD TO CART
          </button>

          <div className="description">
            {parse(productData.description)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
