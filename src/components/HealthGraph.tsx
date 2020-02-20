import React from 'react';
import styled from 'styled-components';

import { MatchStats, Settings } from '../types';
import { stages } from '../services/images';

interface HealthGraphProps {
  matchStats: MatchStats;
  settings: Settings;
}
const HealthGraph = (props: HealthGraphProps) => {
  const stageUrl = stages[props.settings.game][props.matchStats.stage.internal_name];
  return (
    <div className={`${props.className}`}>
      <div className="h-16 mt-16 setName font-bold flex items-center justify-center text-5xl">
        { props.matchStats.set.bracket_full }
      </div>
      <div className="h-16"></div>
      <div className="h-16 mt-5 gameNumber font-bold flex items-center justify-center text-5xl uppercase">
        Game { props.matchStats.index_in_set }
      </div>
      <div className="h-32 font-bold flex items-center justify-center text-5xl uppercase"
           style={{background: `url("${stageUrl}") center`}}>
      </div>

      <div>
      </div>
    </div>
  )
}

const StyledHealthGraph = styled(HealthGraph)`
  width: 1440px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${props => props.theme.white};

  .setName {
    background-color: ${props => props.theme.black};
  }
  .gameNumber {
    background-color: ${props => props.theme.black};
  }
`


export default StyledHealthGraph;
