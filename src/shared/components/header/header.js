import React, { Component } from 'react';
import { Link } from 'react-router';
import { collectOrRender } from '../../utils/styleCollection';
import styles from './header.css';

import LoginForm from './login_form';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			nav: false
		}
	}

	componentWillMount() {
		this.removeStyles = collectOrRender(styles);
	};

	componentWillUnmount() {
		this.removeStyles();
	};

	onNavOpen() {
		this.setState({ nav: true });
	}

	onNavClose() {
		this.setState({ nav: false });
	}

	render() {
		return (
			<div className="header">
				<div className="header-inner">
					<div className="row">
						<nav>
							<button onClick={this.onNavOpen.bind(this)} className="nav-open"></button>
							<div className={"nav-panel" + (this.state.nav ? ' open' : '')}>
								<button onClick={this.onNavClose.bind(this)} className="nav-close"></button>
								<ul>
									<li><Link to="/">Home</Link></li>
									<li><Link to="/about">About</Link></li>
								</ul>
							</div>
						</nav>
						<LoginForm />
					</div>
				</div>
			</div>
		);
	}
};

export default Header;