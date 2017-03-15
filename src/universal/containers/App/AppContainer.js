// Libraries
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// Components
import Loader from 'universal/components/Loader/Loader.js';
import Breadcrumbs from 'react-breadcrumbs';

// Styles
import 'universal/styles/index.css';

import {
  fullHeight
} from 'universal/styles/layout.css';

@connect(mapStateToProps)
class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loading: PropTypes.bool,
  };

  render () {

    const {
      loading
    } = this.props;

    console.log('loading : ', loading);

    return (
      <div className={fullHeight}>
        <Link to={{pathname: '/favorites'}}>Favorites</Link>
        <Breadcrumbs  routes={this.props.routes} params={this.props.params}/>
        <Loader show={loading}/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps (state) {
  let searchState = state.get('search').toJS();
  return {
    loading: searchState.queryLoading
  };
}


export default AppContainer;
