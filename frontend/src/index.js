import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './main/App';
import store from './main/store';

import './assets/custom.css';
import './assets/bootstrap.min.css';

ReactDOM.render(
  <Provider store={createStore(store, applyMiddleware(thunk))}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
