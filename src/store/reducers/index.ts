import { combineReducers } from 'redux';

import { settings } from './settings'
import { set } from './set'
import { match } from './match'

export default combineReducers({
  settings,
  set,
  match
});
