import * as actionTypes from "../actions/actionTypes";

const initialState = {
	product: {},
	variations: [],
    images: [],
    price: null,
	loading: false,
    error: null,
};

const fetchProductDetailStart = (state, action) => {
	return { ...state, loading: true };
};

const fetchProductDetailSuccess = (state, action) => {
	return {
		...state,
		product: action.product,
		variations: action.variations,
        images: action.images,
        price: action.price,
        loading: false,
 
	};
};

const fetchProductDetailFail = (state, action) => {
	return { ...state, loading: false, error: action.error };
};

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_DETAILS_START: return fetchProductDetailStart(state,action);
        case actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS: return fetchProductDetailSuccess(state,action);
        case actionTypes.FETCH_PRODUCT_DETAILS_FAIL: return fetchProductDetailFail(state,action);
        default: return state;
    }
}

export default reducer;