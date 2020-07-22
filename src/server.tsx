import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import client from './graphql/client';

// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context: GenericObject = {};
    let initialState: NormalizedCacheObject = {};
    const markup = renderToString(
      <ApolloProvider client={client}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ApolloProvider>,
    );
    const pwa = req.query.pwa !== undefined;
    if (!pwa) {
      await getDataFromTree(markup);
      initialState = client.extract();
    }

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(buildHtml(markup, initialState));
    }
  });

function getAssetManifest() {
  return assets[''].json.find((asset: string) =>
    asset.includes('manifest.json'),
  );
}

function addServiceWorker() {
  if (process.env.NODE_ENV === 'production') {
    return `<script type="text/javascript">
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
    </script>
  `;
  }
  return '';
}

function buildHtml(markup, initialState) {
  return `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="manifest" href="${getAssetManifest()}">
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
  </head>
  <body>
    <div id="root">${markup}</div>
    <script>
    window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
      /</g,
      '\\u003c',
    )}
    </script>
    ${addServiceWorker()}
  </body>
</html>`;
}

export default server;
