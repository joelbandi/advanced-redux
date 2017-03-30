import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';


//middleware
import ReduxPromise from 'redux-promise';
import ReduxLogger from 'redux-logger';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise,ReduxLogger)(createStore);

ReactDOM.render(
  <ModuleProvider store={createStoreWithMiddleware(state => state,{})}>
    <App />
  </ModuleProvider>
  , document.querySelector('.container'));