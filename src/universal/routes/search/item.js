// Utils
import {
  errorLoading,
  loadRoute
} from 'universal/utils/routing.js';

export default (store) => {
  return {
    path: '/:query/:id',
    getComponent: (nextState, cb) => {
     System.import('universal/modules/Search/containers/SearchItem/SearchItemContainer.js')
           .then(loadRoute(cb))
           .catch(errorLoading)
    }
  }
}
