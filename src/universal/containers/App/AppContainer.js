import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import 'universal/styles/index.css';

import {
  fullHeight
} from 'universal/styles/layout.css';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <div>
        <Link to={{pathname: '/favorites'}}>Favorites</Link>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
