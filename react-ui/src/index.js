import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import reducer from './reducers';
import Routes from './routes';
import { CookiesProvider } from 'react-cookie'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const middleware = [thunk]
if(process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
)

ReactDOM.render(
  <CookiesProvider>
    <Routes store={store} />
  </CookiesProvider>,
  document.getElementById('root')
);
