// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

// Components
import GifCard from 'universal/components/GifCard/GifCard.js';

// Ducks
import {
  setSearchQuery,
  fetchSearchQuery,
  favoriteItem,
  toSearchPageItem,
  unfavoriteItem,
  shuffle
} from 'universal/modules/Search/ducks/search.js';


// Styles
import {
  contentWidth
} from 'universal/styles/layout.css';

import {
  primaryButton
} from 'universal/styles/buttons.css';

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
    queryItems: PropTypes.object,
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

  shuffleGif = () => {
    const {
      item,
      searchQuery,
      queryItems
    } = this.props;

    let currentId   = item.id;
    let ids         = queryItems[searchQuery];
    let nextIdIndex = Math.floor(Math.random()*(ids.length-1));

    while (ids[nextIdIndex] === currentId && ids[nextIdIndex] !== -1) {
      nextIdIndex = Math.floor(Math.random()*(ids.length-1));
    }

    this.props.toSearchPageItem(searchQuery, ids[nextIdIndex]);
  }

  render () {
    const {
      item,
      favorite,
      loading,
      favoriteItem,
      unfavoriteItem,
      shuffle
    } = this.props;

    let url = item.images ? item.images.original.url : '';
    let previewUrl = item.images ? item.images.original_still.url : '';
    let source = item.source;
    let rating = item.rating;
    let date   = item.import_datetime;

    return (
      <section className={contentWidth}>
        <GifCard
          gifUrl={url}
          showInfo={true}
          loop={true}
          previewUrl={previewUrl}
          source={source}
          rating={rating}
          date={date}
          favorite={favorite}
          toggleFavorite={this.toggleFavorite}
        />
        <input className={primaryButton} type='button' value='Shuffle' onClick={this.shuffleGif}/>
      </section>
    );
  }

}

function mapStateToProps(state, ownProps) {
  let searchState = state.get('search').toJS();

  let id = ownProps.params.id;
  let items = searchState.items || {};

  let loading  = !items[id];
  let favorite = !!(searchState.favorites.indexOf(id) !== -1);

  return {
    searchQuery: searchState['query'],
    params: ownProps.params,
    queryItems: searchState.queryItems,
    item: items[id] || {},
    loading: loading,
    favorite: favorite
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSeachQuery: fetchSearchQuery(dispatch),
    setSearchQuery: setSearchQuery(dispatch),
    favoriteItem: favoriteItem(dispatch),
    unfavoriteItem: unfavoriteItem(dispatch),
    toSearchPageItem: toSearchPageItem(dispatch)
  };
}

export default SearchItemContainer;
