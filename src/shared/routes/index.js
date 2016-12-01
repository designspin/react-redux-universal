import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/app/app';
import { requireAuthentication } from '../containers/AuthenticatedComponent';

export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute getComponent={(location, cb) => require('./home')(location, cb)} />
			<Route path="/about" getComponent={(location, cb) => require('./about')(location, cb)} />
		</Route>
		<Route path="/admin" getComponent={(location, cb) => require('./admin')(location, cb)} >
			<IndexRoute getComponent={(location, cb) => require('./admin/posts')(location, cb)} />
		</Route>
	</Router>
);
