// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

// Components
import SearchForm from 'universal/modules/Search/components/SearchForm/SearchForm.js';
import Loader from 'universal/components/Loader/Loader.js';

// Ducks
import {
  toSearchPage
} from 'universal/modules/Search/ducks/search.js';

// Styles
import {
  center,
  fullHeight,
  quarterHeight
} from 'universal/styles/layout.css'

@connect(mapStateToProps, mapDispatchToProps)
class SearchFormContainer extends Component {
  static propTypes = {
    queryLoading: PropTypes.bool,
    // Actions
    handleSearchQuery: PropTypes.func
  };

  handleSubmit = (event, value) => {
    this.props.handleSearchQuery(value);
  }

  render ( ) {

    let isHome = this.props.location.pathname === '/';

    return (
      <div>
        <div className={classNames(center, {
          [fullHeight]: isHome,
          [quarterHeight]: !isHome
        })}>
          <SearchForm onSubmit={this.handleSubmit}/>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let searchState  = state.get('search').toJS();
  return {
    queryLoading: searchState.queryLoading
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleSearchQuery: toSearchPage(dispatch)
  };
}

export default SearchFormContainer;
