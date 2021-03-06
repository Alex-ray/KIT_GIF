import path from 'path';
import webpack from 'webpack';
import qs from 'querystring';

import AssetsPlugin from 'assets-webpack-plugin';

const root  = process.cwd();
const src   = path.join(root, 'src');
const build = path.join(root, 'build');

const client = path.join(src, 'client');
const universal = path.join(src, 'universal');

const clientInclude = [client, universal];

export default {
  context: src,
  entry: {
    app: ['babel-polyfill', 'client/client.js'],
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    path: build,
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js'],
    modules: [src, 'node_modules'],
    unsafeCache: true
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: [
   new webpack.NamedModulesPlugin(),
   new webpack.LoaderOptionsPlugin({
      options: {
          postcss: [
            require('postcss-import')({path: src}),
            require('postcss-cssnext')
          ]
      }
    }),
   new webpack.optimize.CommonsChunkPlugin({
     names: ['vendor', 'manifest'],
     minChunks: Infinity
   }),
   new webpack.optimize.AggressiveMergingPlugin(),
   new webpack.optimize.MinChunkSizePlugin({minChunkSize: 50000}),
   new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}, comments: /(?:)/}),
   new AssetsPlugin({path: build, filename: 'assets.json'}),
   new webpack.NoEmitOnErrorsPlugin(),
   new webpack.DefinePlugin({
     '__CLIENT__': true,
     '__PRODUCTION__': true,
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ],
 module: {
   rules: [
     {
       test: /\.css$/,
       include: clientInclude,
       use: [
         'style-loader',
         {
           loader: 'css-loader',
           options: {
             modules: true,
             importLoaders: 1,
             localIdentName: '[name]_[local]_[hash:base64:5]'
           }
         },
         'postcss-loader'
       ]
     },

     {
       test: /\.js$/,
       loader: 'babel-loader',
       include: clientInclude
     }
   ]
 }
}
