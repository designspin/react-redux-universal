import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app/app';
import About from './components/about/about';
import Home from './components/home/home';

import Admin from './components/admin';

import { requireAuthentication } from './containers/AuthenticatedComponent';

export default (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/about" component={requireAuthentication(About)} />
		</Route>
		<Route path="/admin" component={requireAuthentication(Admin)}>
			<IndexRoute component={Home} />
		</Route>
	</Router>
);