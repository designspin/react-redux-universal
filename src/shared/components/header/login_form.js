import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

export class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}
		console.log(this.props);
	}

	render() {
		return (
			<div>
				Authenticated: {this.props.isAuthenticated}
			</div>
		)
	}

}

const mapStateToProps = (state) => ({
	isAuthenticating: state.auth.isAuthenticating,
	isAuthenticated: state.auth.isAuthenticated,
	statusText: state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);