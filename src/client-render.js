import React from 'react';
import ReactDOM from 'react-dom';
import routes from './shared/routes';
import reducer from './shared/reducers';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

let initialState = window.__INITIAL_STATE_;

const store = createStore(reducer, initialState);

ReactDOM.render(
<Provider store={store}>
	{routes}
</Provider>, document.getElementById('app'));