import React from 'react';
import styled from 'styled-components';

import MetascouterLogo from './MetascouterLogo';

import { MatchStats, Settings } from '../types';
import { stages } from '../services/images';

import { Line } from 'react-chartjs-2';

import { useHealthGraph } from '../effects/useHealthGraph';

interface HealthGraphProps {
  matchStats: MatchStats;
  settings: Settings;
}
const HealthGraph = (props: HealthGraphProps) => {
  const stageUrl = stages[props.settings.game][props.matchStats.stage.internal_name];

  const {
    data,
    options,
    plugins
  } = useHealthGraph();

  return (
    <div className={`${props.className}`}>
      <div className="h-16 mt-8 setName font-bold flex items-center justify-center text-5xl">
        { props.matchStats.set.bracket_full }
      </div>
      <div className="h-6"></div>
      <div className="h-16 mt-5 gameNumber font-bold flex items-center justify-center text-5xl uppercase">
        Game { props.matchStats.index_in_set }
      </div>
      <div className="h-24 font-bold flex items-center justify-center text-5xl uppercase"
           style={{background: `url("${stageUrl}") center`}}>
      </div>
      <div className="graphContainer pt-8 px-8">
        <Line data={data}
              options={options}
              plugins={plugins} />
      </div>
      <div className="h-10">
        <MetascouterLogo />
      </div>
    </div>
  )
}

const StyledHealthGraph = styled(HealthGraph)`
  width: 640px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${props => props.theme.white};

  .setName {
    background-color: ${props => props.theme.black};
  }
  .gameNumber {
    background-color: ${props => props.theme.black};
  }
  .graphContainer {
    background-color: ${props => props.theme.black};
    width: 1080px;
    height: 580px;
    margin-left: -220px;
  }
`


export default StyledHealthGraph;
