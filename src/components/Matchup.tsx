import React from 'react';

import { SetStatsComponentProps } from '../types';

import NameScorePanel from './NameScorePanel';
import SetStatsColumn from './SetStatsColumn';

const Matchup = (props: SetStatsComponentProps) => {
  const players = {
    1: Object.values(props.setStats.players).find(p => p.player == 1),
    2: Object.values(props.setStats.players).find(p => p.player == 2),
  };
  const playerStats = {
    1: Object.values(props.setStats.stats).find(p => p.player_num == 1),
    2: Object.values(props.setStats.stats).find(p => p.player_num == 2),
  };

  return (
    <>
      <div className="flex justify-between">
        <NameScorePanel playerNumber={1}
                        prefix={players[1].prefix}
                        playerTag={players[1].player_tag}
                        wins={playerStats[1].wins}/>
        <SetStatsColumn setStats={props.setStats} />
        <NameScorePanel playerNumber={2}
                        prefix={players[2].prefix}
                        playerTag={players[2].player_tag}
                        wins={playerStats[2].wins}/>
      </div>
    </>
  )
}

export default Matchup;
