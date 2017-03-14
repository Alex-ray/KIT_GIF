import AppContainer from 'universal/containers/App/AppContainer.js';

export default (store) => {
  return {
    path: '/',
    component: AppContainer,
    childRoutes: [
      // require('./landing'),
      // require('./counter')
    ]
  }
}
