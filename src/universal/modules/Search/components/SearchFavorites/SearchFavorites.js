import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

// Components
import SearchItemList from 'universal/modules/Search/components/SearchItemList/SearchItemList.js';

class SearchFavorites extends Component {
  static propTypes = {
    source: PropTypes.array,
    query: PropTypes.string
  };

  getSourceList(source, query) {
    let list = [];

    for (var i = 0; i < source.length; i++) {
      let item = source[i];
      list.push(
        <li key={item.id}>
          <Link to={{pathname: `/${query}/${item.id}`}}>
            <img src={item.images.original.url} />
          </Link>
        </li>
      );
    }

    return list;
  }

  render () {
    const {
      source,
      query
    } = this.props;

    return (
      <aside>
        <h1>Favorites</h1>
        {<SearchItemList source={source} query={query}/>}
      </aside>
    );
  }
}


export default SearchFavorites;
