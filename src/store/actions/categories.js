import * as actionTypes from './actionTypes';
import axios from '../../axios';

const fetchCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START
    }
}

const fetchCategoriesSuccess = (categories,currId) => {
    
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories,
        currId: currId
    }
}

const fetchCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        error: error
    }
}

export const fetchCategories = (token,categoryId) => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        const headers = {
			Authorization: 'Bearer' + token
        }
        let query = '';
        if (categoryId) {
            query = `?categoryId=${categoryId}`
        }
		axios.get('customer/profile/categories' + query,{ headers: headers })
			.then(response => {
                // console.log(response.data);
                dispatch(fetchCategoriesSuccess(response.data,categoryId));
			})
			.catch(error => {
                console.log(error.response.data.error);
                dispatch(fetchCategoriesFail(error.response.data.error))
			});
    }
}