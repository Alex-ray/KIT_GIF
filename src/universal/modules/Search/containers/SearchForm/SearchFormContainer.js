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
  quarterHeight,
  transitionHeight
} from 'universal/styles/layout.css'

@connect(mapStateToProps, mapDispatchToProps)
class SearchFormContainer extends Component {
  static propTypes = {
    queryLoading: PropTypes.bool,
    query: PropTypes.string,
    // Actions
    handleSearchQuery: PropTypes.func
  };

  handleSubmit = (event, value) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.handleSearchQuery(value);
  }

  render ( ) {
    const {
      location: {
        pathname
      },
      query
    } = this.props;

    let isHome = pathname === '/';

    return (
      <div>
        <div className={classNames(center, transitionHeight, {
          [fullHeight]: isHome,
          [quarterHeight]: !isHome
        })}>
          <SearchForm value={query} onSubmit={this.handleSubmit}/>
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
    query: searchState.query,
    queryLoading: searchState.queryLoading
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleSearchQuery: toSearchPage(dispatch)
  };
}

export default SearchFormContainer;
