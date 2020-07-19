import React from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import { Global, css } from '@emotion/core';
import baseRoutes from '@routes/base-routes';
import { useQuery } from '@apollo/client';
import AccountQueries from '@queries/account-queries.gql';

const App = (): JSX.Element => {
  // Query example
  const { loading, data } = useQuery(AccountQueries.Viewer);
  console.log(loading, data);
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }
        `}
      />
      <Switch>
        {baseRoutes.map((route: RouteProps) => (
          <Route {...route} key={route.id} />
        ))}
      </Switch>
    </>
  );
};

export default App;
