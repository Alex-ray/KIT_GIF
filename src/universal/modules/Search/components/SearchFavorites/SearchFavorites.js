// Libraries
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

// Components
import SearchItemList from 'universal/modules/Search/components/SearchItemList/SearchItemList.js';

// Styles
import {
  fullHeight,
  contentWidth
} from 'universal/styles/layout.css';

import {
  title,
  description,
  link
} from 'universal/styles/typography.css';

class SearchFavorites extends Component {
  static propTypes = {
    source: PropTypes.array,
    query: PropTypes.string
  };

  render () {
    const {
      source,
      query
    } = this.props;

    let favoritesEmpty = source.length === 0 ;

    return (
      <aside className={classNames(fullHeight, contentWidth)}>
        <h1 className={title}>Favorites</h1>
        {!favoritesEmpty && <SearchItemList source={source} query={query}/>}
        {favoritesEmpty && (
          <p className={description}>No favorites yet! <small>( Hint: <Link className={link} to={{pathname: '/pizza'}}>Search Pizza</Link> )</small></p>
        )}
      </aside>
    );
  }
}


export default SearchFavorites;
