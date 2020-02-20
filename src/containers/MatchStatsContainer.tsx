import React, { useEffect } from 'react';

import { useDispatcher } from '../store/index';
import { RootState } from '../store/types';
import { Settings, MatchStats } from '../types';

import { useSelector } from 'react-redux';

import { fetchSettings, fetchMatchStats } from '../store/actions';
import { selectSettings, selectMatchStats } from '../store/selectors';

const SetStatsContainer = () => {
  const dispatcher = useDispatcher();
  const loading = useSelector<RootState>(state => {
    return state.settings.loading;
  })
  const settings = useSelector<RootState, Settings>(selectSettings);
  const matchStats = useSelector<RootState, MatchStats>(selectMatchStats);

  const username = 'jack'
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

export default SetStatsContainer;
