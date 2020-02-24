import React from 'react';

import { useParams, useLocation } from 'react-router-dom';

import SetStatsContainer from './SetStatsContainer';
import Matchup from '../components/Matchup';

const MatchupContainer = () => {
  const params = useParams();

  let username = params.username;
  // For back compat, check URL parameter for username too
  const location = useLocation();
  if (!username) {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('user')) {
      username = urlParams.get('user')
    }
  }

  return (
    <SetStatsContainer username={username}>
      <Matchup />
    </SetStatsContainer>
  )
}

export default MatchupContainer;
