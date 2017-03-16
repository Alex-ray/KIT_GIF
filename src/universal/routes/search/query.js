// Utils
import {
  errorLoading,
  loadRoute
} from 'universal/utils/routing.js';

export default (store) => {
  return {
    name: 'Search',
    path: '/:query',
    getComponent: (nextState, cb) => {
     System.import('universal/modules/Search/containers/SearchQuery/SearchQueryContainer.js')
           .then(loadRoute(cb))
           .catch(errorLoading)
    },
    childRoutes: [
      require('./item.js')(store)
    ]
  }
}
