import React from 'react';
import Header from './header/';
import { requireAuthentication } from '../../containers/AuthenticatedComponent';

import { collectOrRender } from '../../utils/styleCollection';
import styles from './index.css';

class Admin extends React.Component {
	
	componentWillMount() {
		this.removeStyles = collectOrRender(styles);
	};

	componentWillUnmount() {
		this.removeStyles();
	};

  getChildContext () {
    return {
      rebass: {
        fontSizes: [ 64, 48, 24, 18, 16, 14, 12],
      }
    }
  }

  render () {
   return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
  }
}

Admin.childContextTypes = {
	rebass: React.PropTypes.object
};

const WrappedComponent = requireAuthentication(Admin);

module.exports = WrappedComponent;