import React, {Component, PropTypes} from 'react';

import classNames from 'classnames';

import {
  showbox,
  loader,
  circular,
  path,
  hidden
} from './loader.css';

class Loader extends Component {
  static propTypes = {
    hidden: PropTypes.bool
  };

  render () {
    const {
      show
    } = this.props;

    return (
      <div className={classNames(showbox, {
        [hidden]: !show
      })}>
        <div className={loader}>
          <svg className={circular} viewBox="25 25 50 50">
            <circle className={path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );
  }
}

Loader.defaultProps = {
  show: false
};

export default Loader;
