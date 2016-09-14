import { checkHttpStatus, parseJSON } from '../utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from '../constants';

export function loginUserSuccess(token) {
	return {
		type: LOGIN_USER_SUCCESS,
		payload: {
			token
		}
	}
}

export function loginUserFailure(error) {
	console.log("LOGIN_USER_FAILURE");
	return {
		type: LOGIN_USER_FAILURE,
		payload: {
			status: error.response.status,
			statusText: error.response.statusText
		}
	}
}

export function loginUserRequest() {
	return {
		type: LOGIN_USER_REQUEST,
	}
}

export function logout() {
	return { 
		type: LOGOUT_USER,
	}
} 

export function loginUser(email, password) {
	email = 'admin@designspin.co.uk';
	password = 'hannah01abcd';

	return function(dispatch) {
		dispatch(loginUserRequest());
		return fetch('http://localhost:3000/api/signin', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
			body: JSON.stringify({ email: email, password: password })
		})
		.then(checkHttpStatus)
		.then(parseJSON)
		.then(response => {
			try {
				dispatch(loginUserSuccess(response.token))
			} catch (error) {
				dispatch(loginUserFailure({
					response: {
						status: 403,
						statusText: 'Invalid Token'
					}
				}));
			}
		})
		.catch(error => {
			dispatch(loginUserFailure(error));
		})
	}
}