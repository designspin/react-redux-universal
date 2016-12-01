import React from 'react';
import ReactDOM from 'react-dom';
import { match, browserHistory } from 'react-router';
import routes from './shared/routes';
import rootReducer from './shared/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { loginUserSuccess } from './shared/actions';

let initialState = window.__INITIAL_STATE__;

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

match({ routes, history: browserHistory}, function(error, redirectLocation, renderProps) {
	ReactDOM.render(
	<Provider store={store}>{routes}</Provider>, 
	document.getElementById('app')
	);
});

let styles = document.getElementById('server-styles');
styles.parentNode.removeChild(styles);