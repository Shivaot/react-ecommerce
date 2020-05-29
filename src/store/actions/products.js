import * as actionTypes from './actionTypes';
import axios from '../../axios';

const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    };
};

const fetchProductsSuccess = (products,images,prices) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products,
        images: images,
        prices: prices
    };
};

const fetchProductsFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    };
};


export const fetchProducts = (token,categoryId,sortBy) => {
    return dispatch => {
        dispatch(fetchProductsStart());
        const headers = {
			Authorization: "Bearer" + token,
        };
        let query = "";
        if (sortBy) {
            query = "?SortBy=name&order=" + sortBy; 
        }
        axios.get(`/product/customer/all/${categoryId}${query}`,{ headers: headers})
            .then(response => {
                console.log(response.data.products);
                console.log(response.data.images);
                console.log(response.data.prices);
                dispatch(fetchProductsSuccess(response.data.products,response.data.images,response.data.prices))
            })
            .catch(error => {
                console.log(error.response.data.message);
                dispatch(fetchProductsFail(error.response.data.message));
            })
    }
}