// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

//
// import SearchForm from 'universal/modules/Search/components/SearchForm/SearchForm.js';
import SearchResults from 'universal/modules/Search/components/SearchResults/SearchResults.js';

// Ducks
import {
  setSearchQuery,
  fetchSearchQuery
} from 'universal/modules/Search/ducks/search.js';

@connect(mapStateToProps, mapDispatchToProps)
class SearchQueryContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
    searchQuery: PropTypes.string,
    currentItems: PropTypes.array,
    // Actions
    setSearchQuery: PropTypes.func,
    fetchSeachQuery: PropTypes.func
  };

  componentDidMount () {
    const {
      params
    } = this.props;

    if (params.query) {
      this.props.setSearchQuery(params.query);
    }
  }

  componentDidUpdate (prevProps) {
    const {
      params,
      searchQuery,
      fetchSeachQuery
    } = this.props;

    if (prevProps.searchQuery !== searchQuery) {
      // fetch query
      fetchSeachQuery(searchQuery);
    }

    if (prevProps.parmas && params && (prevProps.params.query !== params.query)) {
      this.props.setSearchQuery(params.query);
    }
  }

  render () {
    const {
      params: {
        query
      },
      searchQuery,
      currentItems
    } = this.props;

    return (
      <div>
        {this.props.children || <SearchResults query={searchQuery} source={currentItems}/>}
      </div>
    );
  }
}

SearchQueryContainer.defaultProps = {
  parmas: { }
}

function mapStateToProps (state, ownProps) {
  let searchState = state.get('search').toJS();

  let query = searchState['query'];

  return {
    params: ownProps.params,
    searchQuery: query,
    currentItems: searchState.currentItems
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSeachQuery: fetchSearchQuery(dispatch),
    setSearchQuery: setSearchQuery(dispatch)
  };
}

export default SearchQueryContainer;
