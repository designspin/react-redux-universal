import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

export class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			modalOpen: false
		}

		console.log(this.props.actions.loginUser);
	}

	onEmailChange(event) {
		this.setState({'email': event.target.value});
	}

	onPasswordChange(event) {
		this.setState({'password': event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.actions.loginUser(this.state.email, this.state.password);
	}

	render() {
		return (
			<div className="login-form">
				{(() => {
					if (this.props.isAuthenticated) {
						return (
							<a>Sign Out</a>
						) 
					} else {
						return (
							<div>
								<a>Sign In</a> | <a>Register</a>
							</div>
						)
					}
				})()}
				<div className="login-form-inner">
					<form>
						<input 
							placeholder="email"
							type="email"
							value={this.state.email}
							onChange={this.onEmailChange.bind(this)} />

						<input 
							placeholder="password"
							type="password"
							value={this.state.password} 
							onChange={this.onPasswordChange.bind(this)} />

							<button
								type="submit"
								onClick={this.onFormSubmit.bind(this)}>Submit</button>
					</form>
				</div>
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