// Utils
import {
  errorLoading,
  loadRoute
} from 'universal/utils/routing.js';

export default (store) => {
  return {
    path: '/favorites',
    getComponent: (nextState, cb) => {
     System.import('universal/modules/Search/containers/SearchFavorites/SearchFavoritesContainer.js')
           .then(loadRoute(cb))
           .catch(errorLoading)
    }
  }
}
