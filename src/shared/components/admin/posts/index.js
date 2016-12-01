import React, { Component } from 'react';
import { Link } from 'react-router';
import { PageHeader, Container, Toolbar, NavItem } from 'rebass';

class Posts extends Component {
	render() {
		return (
			<div>
				<Container>
					<PageHeader
						description="all posts"
						heading="Posts"
					/>
					<Toolbar>
						<NavItem to="addPost" is={Link}>New Post</NavItem>
					</Toolbar>
				</Container>
			</div>
		)
	}
}

module.exports = Posts;