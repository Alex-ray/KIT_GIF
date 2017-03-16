// Utils
import {
  errorLoading,
  loadRoute
} from 'universal/utils/routing.js';

export default (store) => {
  return {
    name: 'Home',
    path: '/',
    getComponent: (nextState, cb) => {
     System.import('universal/modules/Search/containers/SearchForm/SearchFormContainer.js')
           .then(loadRoute(cb))
           .catch(errorLoading)
    },
    childRoutes: [
      require('./search/query.js')(store)
    ]
  }
}
