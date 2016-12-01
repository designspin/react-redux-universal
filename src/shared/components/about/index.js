import React, { Component } from 'react';
import { requireAuthentication } from '../../containers/AuthenticatedComponent';

class About extends Component {
	render() {
		return (
			<div>Poo Page</div>
		);	
	}
};

const WrappedComponent = requireAuthentication(About);

module.exports = WrappedComponent;