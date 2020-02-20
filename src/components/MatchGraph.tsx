import React from 'react';

import { MatchStatsComponentProps } from '../types';

import NameScorePanel from './NameScorePanel';
import HealthGraph from './HealthGraph';

const MatchGraph = (props: MatchStatsComponentProps) => {
  const players = {
    1: Object.values(props.matchStats.players).find(p => p.player == 1),
    2: Object.values(props.matchStats.players).find(p => p.player == 2),
  };

  return (
    <>
      <div className="flex justify-between">
        <NameScorePanel playerNumber={1}
                        prefix={players[1].prefix}
                        playerTag={players[1].player_tag}
                        wins={props.matchStats.set.wins[players[1].id]}/>
        <HealthGraph matchStats={props.matchStats}
                     settings={props.settings}/>
        <NameScorePanel playerNumber={2}
                        prefix={players[2].prefix}
                        playerTag={players[2].player_tag}
                        wins={props.matchStats.set.wins[players[2].id]}/>
      </div>
    </>
  )
}

export default MatchGraph;
