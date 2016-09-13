import React from 'react';
import { Link } from 'react-router';

import LoginForm from './login_form';

const Header = () => {
	return (
		<div>
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">About</Link></li>
		</ul>
		<LoginForm />
		</div>
	);
};

export default Header;