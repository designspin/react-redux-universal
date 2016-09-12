import React from 'react';
import Header from '../header/header';

const App = (props) => {
	return (
		<div>
			<Header />
			<h1>Welcome to my app</h1>
			{props.children}
		</div>
	)
}

export default App;