import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

//middleware
import ReduxPromise from 'redux-promise';
import ReduxLogger from 'redux-logger';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxLogger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));