import { Reducer as IReducer } from 'redux';

import { ActionType } from '../types';

import {
  SetStats
} from '../../types';

interface SetStatsState {
  loading: boolean,
  stats?: SetStats;
  error?: string;
}
const initialState: SetStatsState = {
  loading: false,
  stats: null,
  error: null
}

export const set: IReducer<SetStatsState, ActionType> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_SET_STATS':
      return {
        ...state,
        loading: true
      };
    case 'FETCHED_SET_STATS':
      return {
        ...state,
        stats: action.payload,
        loading: false
      };
    case 'ERROR_SET_STATS':
      return {
        ...state,
        stats: null,
        loading: false,
        error: action.payload
      }
  }
  return state;
}
