import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './CheckoutPage.styles.scss';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';

const CartPage = (props) => {
    const [totalPrice,setTotalPrice] = useState(0);
    useEffect(() => {
        let sum = 0;
       props.cartItems.forEach(item => (
            sum += item.price * item.qty
       )) 
       setTotalPrice(sum);       
    },[props.cartItems])
    if (props.cartItems.length === 0) {
        return <div className="alert alert-danger" role="alert" style={{marginTop: "20%", width: "20%",marginLeft: "40%"}}>Cart is Empty</div>;
    }
    return (
        <div className="checkout-page">
            <div className="checkout-header" >
                <div className="header-block">
                    <span>Product To Purchase</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {props.cartItems.map(item => (
                <CheckoutItem key={item.id} id={item.id} image={item.image} name={item.name} quantity={item.qty} price={item.price}/>
            ))}
            <div className="total">
                <span>TOTAL : Rs {totalPrice}</span>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems
    }
}

export default connect(mapStateToProps)(CartPage);