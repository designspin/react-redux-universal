import mongoose from 'mongoose';
require('dotenv').load();

const CONNECTION = process.env.DB_CONNECTION_STRING;
const NAME = process.env.DB_NAME;

export default () => {
	mongoose.Promise = require('bluebird');
	mongoose.connect(`${CONNECTION}:${NAME}/${NAME}`);

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("Database connected.");
	});
	
	return db;
};