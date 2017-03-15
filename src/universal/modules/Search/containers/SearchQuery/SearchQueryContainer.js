import React, {Component, PropTypes} from 'react';

import SearchForm from 'universal/modules/Search/components/SearchForm/SearchForm.js';
import SearchResults from 'universal/modules/Search/components/SearchResults/SearchResults.js';

class SearchQueryContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
    source: PropTypes.array
  };

  render () {
    const {
      params: {
        query
      },
      source
    } = this.props;

    return (
      <section>
        <SearchForm value={query}/>
        <SearchResults />
      </section>
    );
  }
}

export default SearchQueryContainer;
