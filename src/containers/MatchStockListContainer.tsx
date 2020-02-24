import React from 'react';

import { useParams } from 'react-router-dom';

import MatchStatsContainer from './MatchStatsContainer';
import MatchStockList from '../components/MatchStockList';

const MatchGraphContainer = () => {
  const params = useParams();

  return (
    <MatchStatsContainer username={params.username}>
      <MatchStockList />
    </MatchStatsContainer>
  )
}

export default MatchGraphContainer;
