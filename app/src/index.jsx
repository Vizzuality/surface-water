'use strict';

import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import * as reducers from './reducers';
import AppContainer from './containers/app';
import '../styles/index.scss';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import Routes from './routes';

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const middlewareRouter = routerMiddleware(hashHistory)
const store = createStore(
  reducer,
  applyMiddleware(thunk),
  applyMiddleware(middlewareRouter)
);

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Routes history={history}/>
  </Provider>,
  document.getElementById('app')
);
