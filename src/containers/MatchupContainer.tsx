import React from 'react';

import { useParams } from 'react-router-dom';

import SetStatsContainer from './SetStatsContainer';
import Matchup from '../components/Matchup';

const MatchupContainer = () => {
  const params = useParams();

  return (
    <SetStatsContainer username={params.username}>
      <Matchup />
    </SetStatsContainer>
  )
}

export default MatchupContainer;
