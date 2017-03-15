// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import SearchFavorites from 'universal/modules/Search/components/SearchFavorites/SearchFavorites.js';

@connect(mapStateToProps, mapDispatchToProps)
class SearchFavoritesContainer extends Component {
  static propTypes = {
    favorites: PropTypes.array,
    query: PropTypes.string
  };

  render ( ) {
    return (<SearchFavorites source={this.props.favorites} query={this.props.query}/>);
  }
}

function mapStateToProps (state) {
  let stateJS = state.get('search').toJS();


  let favorites = stateJS.favorites.map((id) => {
    return stateJS.items[id];
  });

  return {
    query: stateJS.query,
    favorites: favorites
  };
}

function mapDispatchToProps (dispatch) {
  return {};
}

export default SearchFavoritesContainer;
