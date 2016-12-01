import express from 'express';
import session from 'express-session';
//import cookieParser from 'cookie-parser';
const MongoStore = require('connect-mongo')(session);
import config from './server/config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from './shared/routes';

import { renderStyles } from './shared/utils/styleCollection';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './shared/reducers';
import { loginUserSuccess } from './shared/actions';

import api from './server/routes/api';

import database from './server/db';

const mongostoredata = new MongoStore({mongooseConnection: database()});

const App = express();

//database();

App.use(express.static('public'));

App.use(session({secret: config.secret, resave: false, saveUninitialized: true, store: mongostoredata }));

App.use('/api', api);

App.use((req, res) => {
	const location = req.url;
	const store = createStore(reducer);

	match({ routes, location }, (err, redirectLocation, renderProps) => {
		if (err) {
			return res.status(500).end('Internal server error');
		}

		if (!renderProps) {
			return res.status(404).end('404 Not found.');
		}

		const InitialComponent = (
		<Provider store={store}>
			<RouterContext {...renderProps} />
		</Provider>
		);

		if(req.session.token) {
			store.dispatch(loginUserSuccess(req.session.token));
		}
		
		const initialState = store.getState();
		const componentHTML = renderToString(InitialComponent);

		const styles = renderStyles();

		const HTML = `
		<!DOCTYPE html>
		<html>
			<head>
				<title>React Redux</title>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<script type="application/javascript">
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<style id="server-styles">${styles}</style>
			</head>
			<body>
				<div id="app">${componentHTML}</div>
				<script type="application/javascript" src="vendor.bundle.js"></script>
				<script type="application/javascript" src="app.js"></script>
			</body>
		</html>
		`;

	res.end(HTML);
	});
});

// === Configure & start express ====

const SERVER_IP = process.env.APP_LOCAL_IP;
const SERVER_PORT = process.env.APP_LOCAL_PORT;

App.listen(3000, () => {
	console.log(`server : http://${SERVER_IP}:${SERVER_PORT}`);
});