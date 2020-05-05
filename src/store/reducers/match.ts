import { Reducer as IReducer } from 'redux';

import { ActionType } from '../types';

import {
  MatchStats
} from '../../types';

interface MatchStatsState {
  loading: boolean,
  stats?: MatchStats;
  error?: string;
}
const initialState: MatchStatsState = {
  loading: false,
  stats: null,
  error: null
}

export const match: IReducer<MatchStatsState, ActionType> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING_MATCH_STATS':
      return {
        ...state,
        loading: true
      };
    case 'FETCHED_MATCH_STATS':
      return {
        ...state,
        stats: action.payload,
        loading: false
      };
    case 'ERROR_MATCH_STATS':
      return {
        ...state,
        stats: null,
        loading: false,
        error: action.payload
      }
  }
  return state;
}
