import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client/react';

import App from '~/App';

import '~s/gistApp.scss';

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);
