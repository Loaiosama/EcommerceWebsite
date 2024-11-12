import React from 'react';
import './index.css'

export default class Product extends React.Component {
  state = {
    selectedImageIndex: 0
  }

  handleImageChange = (index) => {
    this.setState({ selectedImageIndex: index });
  };

  handleNextImage = () => {
    const { gallery } = this.props;
    this.setState((prevState) => ({
      selectedImageIndex:
        prevState.selectedImageIndex === gallery.length - 1
          ? 0
          : prevState.selectedImageIndex + 1,
    }));
  };

  handlePreviousImage = () => {
    const { gallery } = this.props;
    this.setState((prevState) => ({
      selectedImageIndex:
        prevState.selectedImageIndex === 0
          ? gallery.length - 1
          : prevState.selectedImageIndex - 1,
    }));
  };

  render() {
    const { gallery } = this.props;
    const { selectedImageIndex } = this.state;

    return (
      <div className="product-gallery-container" data-testid="product-gallery">

        <div className="thumbnail-container">
          {gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
              onClick={() => this.handleImageChange(index)}
            />
          ))}
        </div>


        <div className="image-preview-container">
          <button className="arrow left-arrow" onClick={this.handlePreviousImage}>
            &#8249;
          </button>
          
          <img 
            src={gallery[selectedImageIndex]} 
            alt={`Main product ${selectedImageIndex}`} 
            className="main-image" 
          />
          
          <button className="arrow right-arrow" onClick={this.handleNextImage}>
            &#8250;
          </button>
        </div>

        
      </div>
    );
  }
}
