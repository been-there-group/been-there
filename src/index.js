import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

const Router = HashRouter

ReactDOM.render(
  <Provider  store={store}>
    <React.StrictMode>
      <Router >
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

