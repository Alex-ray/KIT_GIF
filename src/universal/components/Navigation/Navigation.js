// Libraries
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

import {
  navigationContainer,
  favoritesLink,
  breadcrumbsLink,
  breadcrumbsLinkContainer
} from './navigation.css';

class Navigation extends Component {
  static propTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object
  };
  render () {
    let isOnFavoritePage = this.props.location.pathname === '/favorites';

    let actionLink = isOnFavoritePage ?
      <Link className={favoritesLink} to={{pathname: '/'}}>home</Link>:
      <Link className={favoritesLink} to={{pathname: '/favorites'}}>favorites</Link> ;

    return (
      <nav className={navigationContainer}>
        {actionLink}
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
          separator={''}
          wrapperClass={breadcrumbsLinkContainer}
          itemClass={breadcrumbsLink}/>
      </nav>
    );
  }
};

export default Navigation;
