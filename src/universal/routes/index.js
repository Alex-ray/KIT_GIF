import AppContainer from 'universal/containers/App/AppContainer.js';

export default (store) => {
  return {
    component: AppContainer,
    childRoutes: [
      require('./landing.js')(store),
      require('./favorites.js')(store),
      require('./search/query.js')(store),
      require('./search/item.js')(store)
    ]
  }
}
