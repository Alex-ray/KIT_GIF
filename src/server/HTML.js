import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {RouterContext} from 'react-router';
import {renderToString} from 'react-dom-stream/server';

class HTML extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    assets: PropTypes.object,
    renderProps: PropTypes.object
  }

  render () {
    const PROD = process.env.NODE_ENV === 'production';

    const {
      title,
      store,
      assets,
      renderProps
    } = this.props;

    const {
      manifest,
      app,
      vendor
    } = assets || {};

    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`;

    /**
     * Provider: Makes the Redux store available to the connect() calls in the component hierarchy below.
     * Normally, you can’t use connect() without wrapping the root component in <Provider>.
     * see https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store
     *
     * RouterContext: A <RouterContext> renders the component tree for a given router state.
     * Its used by <Router> but also useful for server rendering and integrating in brownfield development.
     * see https://github.com/reactjs/react-router/blob/master/docs/API.md#routercontext
     **/
    const root = PROD && renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps}/>
      </Provider>
    );

    const noFOUC = `(
      function (doc) {
        if (doc) {
          console.log(doc);
          doc.documentElement.className=doc.documentElement.className.replace(/no-js/,'js');
          doc.addEventListener('DOMContentLoaded', function () {
            doc.getElementById('root').style.display = 'block';
          });
        }
      }
    )(document)`;

    return (
     <html className='no-js' >
       <head>

        <script dangerouslySetInnerHTML={{__html: noFOUC}} />

         <meta charSet="utf-8"/>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto|Material+Icons" rel="stylesheet" />

         <title>{title}</title>

         <style type='text/css'>
           {
             `
              .no-js #root {
                display: none;
              }

             .opacity-loader {
               position: fixed;
               top: 0;
               bottom: 0;
               right: 0;
               left: 0;
               z-index: 300;
               background: white;

               transition: opacity 350ms ease-in-out, max-width 0ms linear 350ms, max-height 0ms linear 350ms;
               --webkit-transition: opacity 350ms ease-in-out, max-width 0ms linear 350ms, max-height 0ms linear 350ms;

               opacity: 1;
             }

             .js .opacity-loader {
               opacity: 0;
               max-width: 0;
               max-height: 0;
             }

             `
           }
         </style>
       </head>
       <body>
         <div className='opacity-loader'></div>
         <script dangerouslySetInnerHTML={{__html: initialState}} />
         
         {PROD ? <div id="root" style={{display: 'none'}} dangerouslySetInnerHTML={{__html: root}}></div> : <div id="root"></div>}
         {PROD && <script dangerouslySetInnerHTML={{__html: manifest.text}}/>}
         <script src={PROD ? app.js : '/static/app.js'} />
       </body>
     </html>
    );
  }

}

export default HTML;
