import { combineReducers } from 'redux';
import auth from './auth';
import nav from './nav';
import offline from './offline';

const mainApp = combineReducers({
  offline,
  auth,
  nav,
});

export default mainApp;
