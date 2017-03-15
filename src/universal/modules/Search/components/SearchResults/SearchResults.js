import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

// Components
import SearchItemList from 'universal/modules/Search/components/SearchItemList/SearchItemList.js';
import Loader from 'universal/components/Loader/Loader.js';

// Styles
import {
  fullHeight,
  contentWidth
} from 'universal/styles/layout.css';

import {
  title
} from 'universal/styles/typography.css';

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
      <aside className={classNames(fullHeight, contentWidth)}>
        {<SearchItemList source={source} query={query}/>}
      </aside>
    );
  }
}


export default SearchResults;
