import React from 'react';
import ReactDOM from 'react-dom';
import { ModuleProvider } from 'redux-modules';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './components/app';

// Lets start working with sagas...
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
const ReduxSaga = createSagaMiddleware();





//middleware
// import ReduxPromise from 'redux-promise'; // we will use sagas to deal with this now
import ReduxLogger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const middleware = [ReduxSaga,ReduxThunk,ReduxLogger]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(state => state,{},composeEnhancers(
    applyMiddleware(...middleware)
));

// Let's run the ReduxSaga rootSaga Listener
ReduxSaga.run(rootSaga);
ReactDOM.render(
  <ModuleProvider store={store}>
    <App />
  </ModuleProvider>
  , document.querySelector('.container'));