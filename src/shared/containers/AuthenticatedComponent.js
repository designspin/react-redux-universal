import React from 'react';
import { connect } from 'react-redux';

export function requireAuthentication( Component, FailingComponent ) {
	class AuthenticatedComponent extends React.Component {

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true 
						? <Component {...this.props}/>
						: (FailingComponent) ? <FailingComponent /> : <p>Please log in to view this content</p>
					}
				</div>
			);
		}
	}

	const mapStateToProps = ( state ) => ({
		token: state.auth.token,
		isAuthenticated: state.auth.isAuthenticated
	}); 

	return connect(mapStateToProps)(AuthenticatedComponent);
}