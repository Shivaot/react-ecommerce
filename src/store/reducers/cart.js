import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0,
    cartItems: []
}

const cartIncrement = (state,action) => {
    return { ...state,counter: state.counter + action.qty };
}

const cartDecrement = (state,action) => {
    return { ...state, counter: state.counter - action.qty }
}

const addToCart = (state,action) => {
    let item = state.cartItems.filter(e => e.id === action.id);    
    if (item.length > 0) {  return  increaseQuantity(state,action) };
    return { ...state, cartItems: state.cartItems.concat({ name: action.name, price: action.price, image: action.image , id: action.id, qty: action.qty}) };
}

const removeFromCart = (state,action) => {
    const updatedArray = state.cartItems.filter((item) => item.id !== action.id)
    return { ...state, cartItems: updatedArray}
}

const increaseQuantity = (state,action) => {
    const updatedArray = state.cartItems.map(p =>
        p.id === action.id
          ? { ...p, qty: p.qty + 1 }
          : p
      );
      return { ...state, cartItems: updatedArray }
}

const decreaseQuantity = (state,action) => {
    const updatedArray = state.cartItems.map(p =>
        p.id === action.id
          ? { ...p, qty: p.qty - 1 }
          : p
      );
      return { ...state, cartItems: updatedArray }
}


const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.CART_INCREMENT: return cartIncrement(state,action);
        case actionTypes.CART_DECREMENT: return cartDecrement(state,action);
        case actionTypes.ADD_TO_CART: return addToCart(state,action);
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state,action);
        case actionTypes.INCREASE_QUANTITY: return increaseQuantity(state,action);
        case actionTypes.DECREASE_QUANTITY: return decreaseQuantity(state,action);
        default: return state;
    }
}

export default reducer;