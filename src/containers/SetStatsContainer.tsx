import React, { useEffect } from 'react';

import { useDispatcher } from '../store/index';
import { RootState } from '../store/types';
import { Settings, SetStats } from '../types';

import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { fetchSettings, fetchSetStats } from '../store/actions';
import { selectSettings, selectSetStats } from '../store/selectors';

interface SetStatsContainer extends React.Attributes {
  username: string;
}
const SetStatsContainer = (props: SetStatsContainer) => {
  const dispatcher = useDispatcher();
  const loading = useSelector<RootState>(state => {
    return state.settings.loading;
  })
  const settings = useSelector<RootState, Settings>(selectSettings);
  const setStats = useSelector<RootState, SetStats>(selectSetStats);

  const username = props.username;
  useEffect(() => {
    dispatcher(fetchSettings(username));
  }, [])

  useEffect(() => {
    if (settings != null) {
      dispatcher(fetchSetStats({ username, game: settings.game }));
    }
  }, [settings])

  if (setStats) {
    return (
      <ThemeProvider theme={settings.theme}>
        {
          React.cloneElement(
            props.children,
            { setStats, settings }
          )
        }
      </ThemeProvider>
    )
  } else {
    // Still loading stats
    return null;
  }
}

export default SetStatsContainer;
