// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

// Ducks
import {
  setSearchQuery,
  fetchSearchQuery,
  favoriteItem,
  unfavoriteItem
} from 'universal/modules/Search/ducks/search.js';

@connect(mapStateToProps, mapDispatchToProps)
class SearchItemContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      query: PropTypes.string,
    }),
    loading: PropTypes.bool,
    item: PropTypes.object,
    favorite: PropTypes.bool,
    searchQuery: PropTypes.string,
    // Actions
    favoriteItem: PropTypes.func.isRequired,
    unfavoriteItem: PropTypes.func.isRequired,
    fetchSeachQuery: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired
  };

  toggleFavorite = () => {
    const {
      item: {
        id
      },
      favorite,
      favoriteItem,
      unfavoriteItem
    } = this.props;

    if (id) {
      let action = favorite ? unfavoriteItem : favoriteItem;
      action(id);
    }
  }

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
      item,
      favorite,
      loading,
      favoriteItem,
      unfavoriteItem
    } = this.props;

    let url = item.images ? item.images.original.url : '';

    return (
      <section>
        {loading && <h1>Loading...</h1>}
        <img src={url} />
        <ul>
          <li>Source: {item.source && item.source}</li>
          <li>Rating: {item.rating && item.rating}</li>
          <li>{item.import_datetime && moment(new Date(item.import_datetime)).fromNow()}</li>
          <li><i onClick={this.toggleFavorite} className='material-icons'>{favorite ? 'favorite' : 'favorite_border'}</i></li>
        </ul>
      </section>
    );
  }

}

function mapStateToProps(state, ownProps) {
  let stateJS = state.get('search').toJS();

  let id = ownProps.params.id;
  let items = stateJS.items || {};

  let loading  = !items[id];
  let favorite = !!(stateJS.favorites.indexOf(id) !== -1);

  return {
    searchQuery: stateJS['query'],
    params: ownProps.params,
    item: items[id] || {},
    loading: loading,
    favorite: favorite
  };
}

function mapDispatchToProps(dispatch) {
  return {
    favoriteItem: () => {console.log('TODO: favoriteItem')},
    unfavoriteItem: () => {console.log('TODO: unfavoriteItem')},
    fetchSeachQuery: fetchSearchQuery(dispatch),
    setSearchQuery: setSearchQuery(dispatch),
    favoriteItem: favoriteItem(dispatch),
    unfavoriteItem: unfavoriteItem(dispatch)

  };
}

export default SearchItemContainer;
