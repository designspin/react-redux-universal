import React, { Component } from 'react';
import { collectOrRender } from '../../utils/styleCollection';
import styles from './home.css';

class Home extends Component {
	
	componentWillMount() {
		this.removeStyles = collectOrRender(styles);
	};

	componentWillUnmount() {
		this.removeStyles();
	};

	render() {
		return (
			<div className="container">Home Page</div>
		);
	};
};

module.exports = Home;