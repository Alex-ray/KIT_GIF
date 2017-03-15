// Libraries
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

// Components
import GifCard from 'universal/components/GifCard/GifCard.js';

// Styles
import {
  list,
  listItem
} from './search-item-list.css';

class SearchItemList extends Component {
  static propTypes = {
    query: PropTypes.string,
    source: PropTypes.array
  };

  getSourceList(source, query) {
    let list = [];

    for (var i = 0; i < source.length; i++) {
      let item = source[i];
      list.push(
        <li key={item.id} className={listItem}>
          <Link to={{pathname: `/${query}/${item.id}`}}>
            <GifCard gifUrl={item.images.original.url} previewUrl={item.images.original_still.url}/>
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
      <ul className={list}>
        {this.getSourceList(source, query)}
      </ul>
    );
  }
}


export default SearchItemList;
