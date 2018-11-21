// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import patient from './patient';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(
    combineReducers({ 
      patient, 
    })
  );
}
