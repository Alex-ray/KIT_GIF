import React, {Component, PropTypes} from 'react';

import 'universal/styles/index.css';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (this.props.children);
  }
}

export default AppContainer;
