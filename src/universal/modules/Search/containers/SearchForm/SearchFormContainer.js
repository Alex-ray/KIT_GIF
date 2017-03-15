// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import SearchForm from 'universal/modules/Search/components/SearchForm/SearchForm.js';

// Ducks
import {
  toSearchPage
} from 'universal/modules/Search/ducks/search.js';

@connect(mapStateToProps, mapDispatchToProps)
class SearchFormContainer extends Component {
  static propTypes = {
    handleSearchQuery: PropTypes.func
  };

  handleSubmit = (event, value) => {
    this.props.handleSearchQuery(value);
  }

  render ( ) {
    return (
      <div>
        <SearchForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

function mapStateToProps ( ) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    handleSearchQuery: toSearchPage(dispatch)
  };
}

export default SearchFormContainer;
