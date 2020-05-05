import { RootState } from './types';

export const selectSettings = (state: RootState) => {
  return state.settings.settings;
};

export const selectSetStats = (state: RootState) => {
  return state.set.stats;
}

export const selectMatchStats = (state: RootState) => {
  return state.match.stats;
}
