// Libraries
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// Components
import Loader from 'universal/components/Loader/Loader.js';
import Navigation from 'universal/components/Navigation/Navigation.js';

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
      loading,
      routes,
      params
    } = this.props;

    return (
      <div className={fullHeight}>
        <Navigation routes={routes} params={params} />
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
