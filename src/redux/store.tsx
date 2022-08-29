import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import ReducerCheckout from './ReducerCheckout';
import Saga from '../redux-saga/Saga';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
const sagaMiddleware = createSagaMiddleware();

const rootReducer:any = combineReducers({
  ReducerCheckout

});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));
sagaMiddleware.run(Saga);
export default store;
