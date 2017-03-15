import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

// Components
import SearchItemList from 'universal/modules/Search/components/SearchItemList/SearchItemList.js';

class SearchResults extends Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.array
  };

  render () {
    const {
      source,
      query
    } = this.props;

    return (
      <aside>
        <h1>{query}</h1>
        {<SearchItemList source={source} query={query}/>}
      </aside>
    );
  }
}


export default SearchResults;
