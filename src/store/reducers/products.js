import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    images: [],
    prices: [],
    loading: false,
    error: null
}

const fetchProductsStart = (state,action) => {
    return { ...state, loading: true}  
}

const fetchProductsSuccess = (state,action) => {
    return { ...state, products: action.products, images: action.images, prices: action.prices ,loading: false }
}

const fetchProductsFail = (state,action) => {
    return { ...state, loading: false, error: action.error , products: [] }
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state,action);
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state,action);
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail(state,action);
        default: return state;
    }
}

export default reducer;