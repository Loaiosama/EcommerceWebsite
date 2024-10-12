import React from 'react'
import jupiter from '../../assets/jupiter.png'
import cart from '../../assets/shopping_cart.png'
import './index.css'
export default class Card extends React.Component{
    render(){

        const cardClass = this.props.inStock ? 'card-container' : 'card-container out-of-stock';
        return(
            <>
            <div className={cardClass}>

                <img src={jupiter} alt="Women Clothing"/>

                {!this.props.inStock && <div className="overlay">OUT OF STOCK</div>}
                {this.props.inStock && <img src= {cart} className="cart-icon" alt = "cart icon"/>}
                
                <div className='text-container'>
                    <p className='item-name'>
                        {this.props.name}
                    </p>
                    <p className='item-price'>
                        ${this.props.price.toFixed(2)}
                    </p>

                </div>
                
            </div>
            
            </>
            
        )
    }

}