import { checkHttpStatus, parseJSON } from '../utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, CLEAR_STATUS_TEXT } from '../constants';
import axios from 'axios';

export function loginUserSuccess(token) {

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('token', token);
	}

	return {
		type: LOGIN_USER_SUCCESS,
		payload: {
			token
		}
	}
}

export function loginUserFailure(error) {
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('token');
	}

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
	
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('token');
	}

	return { 
		type: LOGOUT_USER,
	}
}

export function clearStatusText() {
	return {
		type: CLEAR_STATUS_TEXT,
	}
} 

export function clearErrors() {
	return(dispatch) => {
		dispatch(clearStatusText());
	}
}

export function loginUser(email, password, register) {
	let requestURL = '';

	if(!register) {
		requestURL = 'http://localhost:3000/api/signin'; // Needs to come from config
	} else {
		requestURL = 'http://localhost:3000/api/signup'; // Needs to come from config
	}

	return (dispatch) => {
		dispatch(loginUserRequest())
		return fetch(requestURL, {
			credentials: 'same-origin',
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

export function logOutUser() {

	let requestURL = 'http://localhost:3000/api/signout';

	return (dispatch) => fetch(requestURL, {
		credentials: 'same-origin',
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
	.then(checkHttpStatus)
	.then(response => {
		dispatch(logout());
	})
}