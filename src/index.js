import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom';
const Router = HashRouter

ReactDOM.render(
  <React.StrictMode>
    <Router >
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

