import React, { useEffect } from 'react';

import { useDispatcher } from '../../store/index';
import { RootState } from '../../store/types';
import { Settings, SetStats } from '../../types';

import { useSelector } from 'react-redux';

import { fetchSettings, fetchSetStats } from '../../store/actions';
import { selectSettings, selectSetStats } from '../../store/selectors';

const SetStatsContainer = (props) => {
  const dispatcher = useDispatcher();
  const loading = useSelector<RootState>(state => {
    return state.settings.loading;
  })
  const settings = useSelector<RootState, Settings>(selectSettings);
  const setStats = useSelector<RootState, SetStats>(selectSetStats);

  const username = 'jack'
  useEffect(() => {
    dispatcher(fetchSettings(username));
  }, [])

  useEffect(() => {
    if (settings != null) {
      dispatcher(fetchSetStats({ username, game: settings.game }));
    }
  }, [settings])

  if (setStats) {
    return React.cloneElement(
      props.children,
      { setStats, settings }
    )
  } else {
    // Still loading stats
    return null;
  }
}

export default SetStatsContainer;
