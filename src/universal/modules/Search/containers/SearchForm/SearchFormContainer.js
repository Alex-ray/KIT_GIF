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
  fullHeight
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
    return (
      <div className={classNames(center, fullHeight)}>
        <Loader show={this.props.queryLoading}/>
        <SearchForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  let searchJS = state.get('search').toJS();
  return {
    queryLoading: searchJS.queryLoading
  };
}

function mapDispatchToProps (dispatch) {
  return {
    handleSearchQuery: toSearchPage(dispatch)
  };
}

export default SearchFormContainer;
