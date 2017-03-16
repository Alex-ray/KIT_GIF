# GIFFITI 🎉

## Architecture

The GIF application is being served from a Node.js server using the express
framework. The Node.js server is setup to server assets using Hot Module Reloading for development
and Server Side Rendering for production.

The Application also utilizes [code splitting](https://webpack.js.org/guides/code-splitting/)
which is defined at each route. This helps separate out common code bundles that wont change
often and can be cached on the client as well as making sure to only bundle code that the user
needs for that route. Webpack auto-magically optimizes for the best balance between
network requests and request load.

The App has three main folder sections
- `client`: JS code that is only run on the client
- `server`: JS code that is only run on the server
- `universal`: JS code that is run on both the client _and_ the server.

The UI is built using the following technologies.

- Webpack 2
- React
- React Router
- Redux
- Immutable
- cssnext


## Installation
Make sure you are running on
- Node v7 or higher, I recommend using [NVM](https://github.com/creationix/nvm)
- NPM v4 or higher
- Webpack v2 or higher

Next run `npm install` in the root directory of this project.

## Development
To run the developement environment run `npm run dev` and navigate to `http://localhost:3000`.

## Production
To build for production run `npm run build`.

To start production run `npm run prod` and navigate to `http://localhost:3000`.

To deploy all one needs to do is replace the `webpack.config.prod.js` files `output.publicPath` configuration to the CDN host
and upload all the build files to that CDN and run the application on a node server.

## TODO:

Gif Image Loading States - Ideally we want to show a loading state for the preview
image of gif when it is being downloaded to the clients browser cache. This becomes
apparent when shuffling new GIFS that have not been downloaded to the client.
