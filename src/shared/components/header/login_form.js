import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actionCreators from '../../actions';
import { collectOrRender } from '../../utils/styleCollection';
import styles from './login-form.css';

export class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			register: false,
			modalOpen: false
		}
	}

	componentWillMount() {
		this.removeStyles = collectOrRender(styles);
	};

	componentWillUnmount() {
		this.removeStyles();
	};

	onEmailChange(event) {
		this.setState({'email': event.target.value});
	}

	onPasswordChange(event) {
		this.setState({'password': event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.actions.loginUser(this.state.email, this.state.password, this.state.register);
	}

	onSignInClick() {
		this.setState({ modalOpen: true });
		this.setState({ register: false });
	}

	onSignOutClick() {
		this.props.actions.logOutUser();
		this.setState({'email': ''});
		this.setState({'password': ''});
	}

	onCloseClick() {
		this.setState({'email': ''});
		this.setState({'password': ''});
		this.setState({ modalOpen: false });
		this.props.actions.clearErrors();
	}


	onRegisterClick() {
		this.setState({ modalOpen: true });
		this.setState({ register: true });
	}

	render() {
		return (
			<div className="login-form">

				{(() => {
					if (this.props.isAuthenticated) {
						return (
							<span className="form-actions">
							<a onClick={ this.onSignOutClick.bind(this) }>Sign Out</a>
							 | 
							<Link to="/admin">Admin</Link>
							</span>
						) 
					} else {
						if(!this.state.modalOpen) {
							return (
								<span className="form-actions">
									<a onClick={ this.onSignInClick.bind(this) }>Sign In</a> | <a onClick={ this.onRegisterClick.bind(this) }>Register</a>
								</span>
							)
						} else {
							return (
								<span className="form-actions">
									<a onClick={ this.onCloseClick.bind(this)}>Close [x]</a>
								</span>
							)
						}
					}
				})()}
				<div className={"login-form-inner" + ((this.state.modalOpen && !this.props.isAuthenticated) ? ' open' : '')}>
					{(this.props.statusText) ? <p className="error">{this.props.statusText}</p> : ''}
					<form>
					{(this.props.isAuthenticating) ? <div className="loading"></div> : ''}
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
								onClick={this.onFormSubmit.bind(this)}>{(!this.state.register) ? 'Sign In' : 'Register'}</button>
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