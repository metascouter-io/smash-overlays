import React from 'react';
import styled from 'styled-components';

import MetascouterLogo from './MetascouterLogo';

import { MatchStats, Settings } from '../types';
import { stages, characters } from '../services/images';

import { Line } from 'react-chartjs-2';

import { useHealthGraph } from '../effects/useHealthGraph';

interface HealthGraphProps {
  matchStats: MatchStats;
  settings: Settings;
}
const HealthGraph = (props: HealthGraphProps) => {
  const stageUrl = stages[props.settings.game][props.matchStats.stage.internal_name];
  const players = {
    1: Object.values(props.matchStats.players).find(p => p.player == 1),
    2: Object.values(props.matchStats.players).find(p => p.player == 2),
  };

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
           style={{background: `url("${stageUrl}") center no-repeat`, backgroundSize: 'cover'}}>
      </div>
      <div className="graphContainer">
        <Line data={data}
              options={options}
              plugins={plugins} />
        <div className="h-24 text-5xl flex w-full justify-between items-center px-8 pb-8">
          <div className="flex flex-row-reverse items-center">
            <div className="p-8">
              { players[1].player_tag }
            </div>
            <div className="h-16"
                 style={{backgroundColor: '#fd5f5f'}}>
              <img src={ characters[props.settings.game][players[1].character.internal_name] }
                   className="h-full"/>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="p-8">
              { players[2].player_tag }
            </div>
            <div className="bg-blue-500 h-16"
                 style={{backgroundColor: '#3232ff'}}>
              <img src={ characters[props.settings.game][players[2].character.internal_name] }
                   className="h-full"/>
            </div>
          </div>
        </div>
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
    margin-left: -220px;
    canvas {
      margin: auto;
    }
  }
`


export default StyledHealthGraph;
