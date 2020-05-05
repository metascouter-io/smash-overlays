import { Reducer as IReducer } from 'redux';

import { ActionType } from '../types';

import {
  Settings
} from '../../types';

interface SettingsState {
  loading: boolean,
  settings?: Settings;
}
const initialState: SettingsState = {
  loading: false,
  settings: null
}

export const settings: IReducer<SettingsState, ActionType> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_SETTINGS':
      console.log('test')
      return {
        ...state,
        loading: true
      };
    case 'FETCHED_SETTINGS':
      return {
        ...state,
        settings: action.payload,
        loading: false
      };
  }
  return state;
}
