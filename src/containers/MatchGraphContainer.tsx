import React from 'react';

import { useParams } from 'react-router-dom';

import MatchStatsContainer from './MatchStatsContainer';
import MatchGraph from '../components/MatchGraph';

const MatchGraphContainer = () => {
  const params = useParams();

  return (
    <MatchStatsContainer username={params.username}>
      <MatchGraph />
    </MatchStatsContainer>
  )
}

export default MatchGraphContainer;
