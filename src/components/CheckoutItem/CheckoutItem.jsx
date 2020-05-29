import React from 'react';
import { connect } from 'react-redux';

import './CheckoutItem.styles.scss';
import * as actions from '../../store/actions/index';

const CheckoutItem = (props) => {
    const removeItemHandler = () => {
        props.onRemoveItem(props.id);   
        props.onRemoveFromCart(props.quantity);
    }
    const qtyIncHandler = () => {
        props.onIncQty(props.id);
        props.onCartIncrement(1);
    }
    const qtyDecHandler = () => {
        if (props.quantity === 1) {
            props.onRemoveItem(props.id);
            props.onRemoveFromCart(0);
        }
        props.onDecQty(props.id);
        props.onRemoveFromCart(1);
    }
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={"http://" + props.image} alt="item" />
            </div>
            <span className="name">{props.name}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => qtyIncHandler()}>&#8724;</div>
                <span className="value">{props.quantity}</span>
                <div className="arrow" onClick={() => qtyDecHandler()}>&#8722;</div>
            </span>
            <span className="price">{props.price}</span>
            <div className="remove-button" onClick={() => removeItemHandler()}>&#10005;</div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveItem: (id) => dispatch(actions.removeFromCart(id)),
        onRemoveFromCart: (qty) => dispatch(actions.cartDecrement(qty)),
        onIncQty: (id) => dispatch(actions.increaseQuantity(id)),
        onCartIncrement: (qty) => dispatch(actions.cartIncrement(qty)),
        onDecQty: (id) => dispatch(actions.decreaseQuantity(id)),
    }
}

export default connect(null,mapDispatchToProps)(CheckoutItem);