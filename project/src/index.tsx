import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/app';
import {store} from './store';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './services/browser-history';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <HistoryRouter history={browserHistory}>
      <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
