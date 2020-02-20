import React, { useEffect } from 'react';

import { useDispatcher } from '../store/index';
import { RootState } from '../store/types';
import { Settings, MatchStats } from '../types';

import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { fetchSettings, fetchMatchStats } from '../store/actions';
import { selectSettings, selectMatchStats } from '../store/selectors';

interface MatchStatsContainer {
  username: string;
}
const MatchStatsContainer = (props) => {
  const dispatcher = useDispatcher();
  const loading = useSelector<RootState>(state => {
    return state.settings.loading;
  })
  const settings = useSelector<RootState, Settings>(selectSettings);
  const matchStats = useSelector<RootState, MatchStats>(selectMatchStats);

  const username = props.username;

  useEffect(() => {
    dispatcher(fetchSettings(username));
  }, [])

  useEffect(() => {
    if (settings != null) {
      dispatcher(fetchMatchStats({ username, game: settings.game }));
    }
  }, [settings])

  if (matchStats) {
    return (
      <ThemeProvider theme={settings.theme}>
        {
          React.cloneElement(
            props.children,
            { matchStats, settings }
          )
        }
      </ThemeProvider>
    )
  } else {
    // Still loading stats
    return null;
  }
}

export default MatchStatsContainer;
