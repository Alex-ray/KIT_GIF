/* Libraries */

// Production
import http    from 'http';
import express from 'express';
import colors  from 'colors';

// Development
// import webpack from 'webpack';
// import devWebpackConfig from '../../webpack/webpack.config.dev';
// import chokidar from 'chokidar';

import {
  renderPage,
  // renderDevPage
} from './ssr.js';


const PROD = process.env.NODE_ENV === 'production';

const app = express();


// Production settings
if (PROD) {
  app.use('/static', express.static('build'));

  app.get('*', renderPage);
// Development settings
} else if (!PROD) {
  // TODO:
}

const server = http.createServer(app);

server.listen(3000, function() {
   const address = server.address();
   console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${'localhost::'.trap.magenta}${`${address.port}`.green}`);
 });
