import * as actionTypes from "./actionTypes";

export const cartIncrement = (qty) => {
	return {
        type: actionTypes.CART_INCREMENT,
        qty: qty
	};
};

export const cartDecrement = (qty) => {
	return {
		type: actionTypes.CART_DECREMENT,
		qty: qty,
	};
};

export const addToCart = (name, price, image, id, qty) => {
	return {
		type: actionTypes.ADD_TO_CART,
		name: name,
		price: price,
		image: image,
		id: id,
		qty: qty,
	};
};

export const removeFromCart = (id) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		id: id,
	};
};

export const increaseQuantity = (id) => {
	return {
		type: actionTypes.INCREASE_QUANTITY,
		id: id,
	};
};

export const decreaseQuantity = (id) => {
	return {
		type: actionTypes.DECREASE_QUANTITY,
		id: id,
	};
};
