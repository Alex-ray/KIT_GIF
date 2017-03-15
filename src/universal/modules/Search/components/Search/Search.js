import React, {PropTypes, Component} from 'react';

// Components
import SearchForm from 'universal/modules/Search/components/SearchForm/SearchForm.js';
import SearchResults from 'universal/modules/Search/components/SearchResults/SearchResults.js';


class Search extends Component {
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
        <h1>Search</h1>
        <SearchForm value={query} />
        <SearchResults source={gifSource} />
      </section>
    );
  }
}


export default Search;
