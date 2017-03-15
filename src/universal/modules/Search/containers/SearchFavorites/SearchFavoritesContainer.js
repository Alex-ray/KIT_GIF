// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import SearchFavorites from 'universal/modules/Search/components/SearchFavorites/SearchFavorites.js';

@connect(mapStateToProps)
class SearchFavoritesContainer extends Component {
  static propTypes = {
    favorites: PropTypes.array,
    query: PropTypes.string
  };

  render ( ) {
    return (
      <SearchFavorites source={this.props.favorites} query={this.props.query}/>
    );
  }
}

function mapStateToProps (state) {
  let searchState = state.get('search').toJS();

  // TODO: It is ineffecient to loop over the favorites every time this function is called,
  // Move this out of the map state to props and into the reducers.
  let favorites = searchState.favorites.map((id) => {
    return searchState.items[id];
  });

  return {
    query: searchState.query,
    favorites: favorites
  };
}

export default SearchFavoritesContainer;
