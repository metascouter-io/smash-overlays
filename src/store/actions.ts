
import { Game } from '../types';
import { ActionCreator } from './types';

import Smash from '../services/Smash';

const smashService = new Smash();

export const fetchSettings: ActionCreator<string> = (username) => async (commit) => {
  commit({
    type: 'FETCHING_SETTINGS'
  })
  const settings = await smashService.getSettings(username);
  commit({
    type: 'FETCHED_SETTINGS',
    payload: settings
  })
}

interface FetchSetStatsProps {
  username: string;
  game: Game;
}
export const fetchSetStats: ActionCreator<FetchSetStatsProps> = ({ username, game }) => async (commit) => {
  commit({
    type: 'FETCHING_SET_STATS'
  })
  try {
    const set= await smashService.getSetStats(game, username);
    commit({
      type: 'FETCHED_SET_STATS',
      payload: set
    })
  } catch (e) {
    commit({
      type: 'ERROR_SET_STATS',
      payload: e
    })
  }
}

interface FetchMatchStatsProps {
  username: string;
  game: Game;
}
export const fetchMatchStats: ActionCreator<FetchMatchStatsProps> = ({ username, game }) => async (commit) => {
  commit({
    type: 'FETCHING_MATCH_STATS'
  })
  try {
    const match = await smashService.getMatchStats(game, username);
    commit({
      type: 'FETCHED_MATCH_STATS',
      payload: match
    })
  } catch (e) {
    commit({
      type: 'ERROR_MATCH_STATS',
      payload: e
    })
  }
}
