import { createReducer } from '../utils';
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, CLEAR_STATUS_TEXT } from '../constants';

const initialState = {
	token: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null
};

export default createReducer(initialState, {
	[LOGIN_USER_REQUEST]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticating': true,
			'statusText': null
		});
	},
	[LOGIN_USER_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticating': false,
			'isAuthenticated': true,
			'token': payload.token,
			'statusText': 'You have been logged in.'
		});
	},
	[LOGIN_USER_FAILURE]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticating': false,
			'isAuthenticated': false,
			'token': null,
			'statusText': `Authentcation Error: ${payload.status} ${payload.statusText}`
		});
	},
	[LOGOUT_USER]: (state, payload) => {
		return Object.assign({}, state, {
			'isAuthenticated': false,
			'token': null,
			'statusText': 'You have logged out.'
		});
	},
	[CLEAR_STATUS_TEXT]: (state, payload) => {
		return Object.assign({}, state, {
			'statusText': null
		});
	}
});