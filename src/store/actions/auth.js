import * as actionTypes from "./actionTypes";
import axios from "../../axios";

const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

const authSuccess = (email, access_token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		userId: email,
		token: access_token,
	};
};

const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		var bodyFormData = new FormData();
		bodyFormData.append("grant_type", "password");
		bodyFormData.append("client_id", "live-test");
		bodyFormData.append("client_secret", "abcde");
		bodyFormData.append("username", email);
		bodyFormData.append("password", password);
		axios({
			method: "post",
			url: "/oauth/token",
			data: bodyFormData,
			config: { headers: { accept: "application/json" } },
		})
			.then((response) => {
                console.log(response.data.access_token, response.data.expires_in);
                const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                localStorage.setItem('userToken',response.data.access_token);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',email);
				dispatch(authSuccess(email, response.data.access_token));
				dispatch(checkAuthTimeout(response.data.expires_in));
			})
			.catch((error) => {
				console.log(error.response.data.error);
				console.log(error.response.data.error_description);
				let errorMessage = "";
				if (!error.response.data.error_description) {
					errorMessage = error.response.data.error;
				} else {
					errorMessage = error.response.data.error_description;
				}
				dispatch(authFail(errorMessage));
			});
	};
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            dispatch(logout());            
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                dispatch(authSuccess(localStorage.getItem('userId'),token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logout());
            }    
        }
    };
};
