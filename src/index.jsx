import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './client/components/App.jsx';
import store from './client/store/store';
import './client/styles/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
