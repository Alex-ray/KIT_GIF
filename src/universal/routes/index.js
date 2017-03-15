import AppContainer from 'universal/containers/App/AppContainer.js';

export default (store) => {
  return {
    component: AppContainer,
    childRoutes: [
      require('./favorites.js')(store),
      require('./landing.js')(store)
    ]
  }
}
