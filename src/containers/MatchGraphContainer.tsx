import React from 'react';

import { useParams, useLocation } from 'react-router-dom';

import MatchStatsContainer from './MatchStatsContainer';
import MatchGraph from '../components/MatchGraph';

const MatchGraphContainer = () => {
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
    <MatchStatsContainer username={username}>
      <MatchGraph />
    </MatchStatsContainer>
  )
}

export default MatchGraphContainer;
