import React, { useEffect } from 'react';

import { useDispatcher } from '../store/index';
import { RootState } from '../store/types';
import { Settings, MatchStats } from '../types';

import { useSelector } from 'react-redux';

import { fetchSettings, fetchMatchStats } from '../store/actions';
import { selectSettings, selectMatchStats } from '../store/selectors';

interface MatchStatsContainer {
  username: string;
}
const MatchStatsContainer = ({ username }) => {
  const dispatcher = useDispatcher();
  const loading = useSelector<RootState>(state => {
    return state.settings.loading;
  })
  const settings = useSelector<RootState, Settings>(selectSettings);
  const matchStats = useSelector<RootState, MatchStats>(selectMatchStats);

  useEffect(() => {
    dispatcher(fetchSettings(username));
  }, [])

  useEffect(() => {
    if (settings != null) {
      dispatcher(fetchMatchStats({ username, game: settings.game }));
    }
  }, [settings])

  return (
    <>

    </>
  )
}

export default MatchStatsContainer;
