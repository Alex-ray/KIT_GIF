import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

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
      <ul>
        {this.getSourceList(source, query)}
      </ul>
    );
  }
}


export default SearchItemList;
