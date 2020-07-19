import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import AccountQueries from '@queries/account-queries.gql';

const mocks: MockedResponse[] = [
  {
    request: {
      query: AccountQueries.Viewer,
    },
    result: {
      data: {
        viewer: {},
      },
    },
  },
];

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>,
      div,
    );
  });
});
