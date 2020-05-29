import * as actionTypes from './actionTypes';
import axios from '../../axios';

const fetchProductDetailStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_DETAILS_START
    }
}

const fetchProductDetailSuccess = (product,variations,images,price) => {
    return {
        type: actionTypes.FETCH_PRODUCT_DETAILS_SUCCESS,
        product: product,
        variations: variations,
        images: images,
        price: price,
    }
}

const fetchProductDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        error: error
    }
}

export const fetchProductDetail = (token,productId) => {
    console.log(token,productId);
    
    return dispatch => {
        dispatch(fetchProductDetailStart());
        const headers = {
			Authorization: 'Bearer' + token
        }
		axios.get('/product/customer/' + productId,{ headers: headers })
			.then(response => {
                console.log(response.data);
                dispatch(fetchProductDetailSuccess(response.data.product,response.data.productVarPlusImagesDTO.productVariation,response.data.productVarPlusImagesDTO.images,response.data.productVarPlusImagesDTO.productVariation[0].price));
			})
			.catch(error => {
                console.log(error.response.data.message);
                dispatch(fetchProductDetailFail(error.response.data.message))
			});
    }
}