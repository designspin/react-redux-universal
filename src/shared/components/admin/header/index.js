import React, { Component } from 'react';
import { Link } from 'react-router';
import { Toolbar, NavItem, Space } from 'rebass';

export default class Header extends Component {
	render() {
		return (
			<Toolbar>
				<NavItem is="a">Posts</NavItem>
				<NavItem is="a">Pages</NavItem>
				<Space auto x={1}/>
				<NavItem is="a"><Link to="/">Home</Link></NavItem>
			</Toolbar>
		)
	}
}