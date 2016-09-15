import React, { Component } from 'react';
import Header from '../header/header';
import { collectOrRender } from '../../utils/styleCollection';
import styles from './app.css';

export default class App extends Component {
	componentWillMount() {
		this.removeStyles = collectOrRender(styles);
	};

	componentWillUnmount() {
		this.removeStyles();
	};

	render () {
		return (
			<div>
				<Header />
				<h1>Welcome to my universal</h1>
				{this.props.children}
			</div>
		)
	}
}

