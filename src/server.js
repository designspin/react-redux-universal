import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from './shared/routes';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './shared/reducers';

import api from './server/routes/api';

import database from './server/db';

require('dotenv').load();

const App = express();

database();

App.use(express.static('public'));

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

		const initialState = store.getState();

		const componentHTML = renderToString(InitialComponent);

		const HTML = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>React Redux</title>
				<script type="application/javascript">
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
			</head>
			<body>
				<div id="app">${componentHTML}</div>
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