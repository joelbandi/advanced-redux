import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';


//middleware
import ReduxPromise from 'redux-promise';
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise,ReduxLogger)(createStore);

ReactDOM.render(
  <ModuleProvider store={createStoreWithMiddleware(state => state,{})}>
    <App />
  </ModuleProvider>
  , document.querySelector('.container'));