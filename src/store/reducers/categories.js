import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: [],
    loading: false,
    error: null,
    currId: null
};

const fetchCategoriesStart = (state,action) => {
    return { ...state,loading: true,error: null}
}

const fetchCategoriesSuccess = (state,action) => {
    return { ...state, categories: action.categories ,loading: false,currId: action.currId }
}

const fetchCategoriesFail = (state,action) => {
    return { ...state, error: action.error, loading: false}
}

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES_START: return fetchCategoriesStart(state,action);
        case actionTypes.FETCH_CATEGORIES_SUCCESS: return fetchCategoriesSuccess(state,action);
        case actionTypes.FETCH_CATEGORIES_FAIL: return fetchCategoriesFail(state,action)
        default: return state;
    }
}

export default reducer;