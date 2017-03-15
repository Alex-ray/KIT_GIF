// Libraries
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

import {
  favoritesLink,
  breadcrumbsLink,
  breadcrumbsLinkContainer
} from './navigation.css';

class Navigation extends Component {
  static propTypes = {
    routes: PropTypes.object,
    params: PropTypes.object
  };
  render () {
    return (
      <nav>
        <Link className={favoritesLink} to={{pathname: '/favorites'}}>favorites</Link>
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
          separator={'    '}
          wrapperClass={breadcrumbsLinkContainer}
          itemClass={breadcrumbsLink}/>
      </nav>
    );
  }
};

export default Navigation;
