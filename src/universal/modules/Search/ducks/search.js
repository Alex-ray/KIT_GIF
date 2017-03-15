import {fromJS, Map as iMap} from 'immutable';
import {push, replace} from 'react-router-redux';
import fetch from 'isomorphic-fetch';

export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY';
export const SEARCH_ADD_ITEM  = 'SEARCH_ADD_ITEM';

export const SEARCH_FAVORITE_ITEM = 'SEARCH_FAVORITE_ITEM';
export const SEARCH_UNFAVORITE_ITEM = 'SEARCH_UNFAVORITE_ITEM';

const initialState = iMap({
  query: '',
  queryItems: {},
  items: {},
  currentItems: [],
  favorites: []
});

export default function reducer(state = initialState, action = {}) {

  const stateJS = state.toJS();
  const favorites = stateJS.favorites || [];

  switch (action.type) {

    case SEARCH_SET_QUERY:
      return state.merge({
        query: action.query,
        page: 0
      });
    case SEARCH_FAVORITE_ITEM:
      if ( favorites.indexOf(action.id) === -1) {
        favorites.push(action.id);
      }

      return state.merge({
        favorites: favorites
      });
    case SEARCH_UNFAVORITE_ITEM:
      const index = favorites.indexOf(action.id);

      if (index !== -1) {
        favorites.splice(index, 1);
      }

      return state.merge({
        favorites: favorites
      });
    case SEARCH_ADD_ITEM:
      const items = stateJS.items;

      items[action.item.id] = action.item;

      state = mergeQueryItem(state, action.query, action.item.id);

      if ( stateJS.query === action.query )  {
        const queryItems = state.get('queryItems').toJS();
        const currentItems = queryItems[action.query].map((id) => {
          return items[id];
        });

        state = state.merge({
          currentItems: currentItems
        });
      }

      return state.merge({
        items: items
      });
    default:
      return state;
  }
}

function mergeQueryItem(state, query, itemId) {
  const src = state.toJS();

  const queryItems = src.queryItems;

  if (!queryItems[query]) {
    queryItems[query] = [itemId];
  } else if (queryItems[query].indexOf(itemId) === -1)  {
    queryItems[query].push(itemId);
  }

  return state.merge({
    queryItems: queryItems
  });
}

export function setSearchQuery(dispatch) {
  return (query) => {
    dispatch({
      type: SEARCH_SET_QUERY,
      query: query
    });
  };
}

export function fetchSearchQuery(dispatch) {
  return function (query) {
    const queryStr = query.toLowerCase().replace(' ', '+');
    const url = `http://api.giphy.com/v1/gifs/search?q=${queryStr}&limit=20&api_key=dc6zaTOxFJmzC`;

    fetch(url).then((response) => {
      if (response.status >= 400) {
         throw new Error("Bad response from server");
     }
     return response.json();
    }).then((res) => {

      for (var i = 0; i < res.data.length; i++) {
        dispatch({
          type: SEARCH_ADD_ITEM,
          query: query,
          item: res.data[i]
        });
      }
    })

  };
}

export function toSearchPage(dispatch) {
  return function (query) {
    dispatch(push({pathname: '/'+query}));
  };
}

export function favoriteItem(dispatch) {
  return function (id) {
    dispatch({
      type: SEARCH_FAVORITE_ITEM,
      id: id
    });
  }
}

export function unfavoriteItem(dispatch) {
  return function (id) {
    dispatch({
      type: SEARCH_UNFAVORITE_ITEM,
      id: id
    });
  }
}
