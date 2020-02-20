import React from 'react';

import { useParams } from 'react-router-dom';

import MatchStatsContainer from './MatchStatsContainer';
import Matchup from '../components/Matchup';

const MatchupContainer = () => {
  const params = useParams();

  return (
    <MatchStatsContainer username={params.username}>
      test
    </MatchStatsContainer>
  )
}

export default MatchupContainer;