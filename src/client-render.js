import React from 'react';
import ReactDOM from 'react-dom';
import routes from './shared/routes';
import rootReducer from './shared/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

let initialState = window.__INITIAL_STATE_;

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

let styles = document.getElementById('server-styles');
styles.parentNode.removeChild(styles);

ReactDOM.render(
<Provider store={store}>
	{routes}
</Provider>, document.getElementById('app'));