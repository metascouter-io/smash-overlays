import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import { SetStatsComponentProps } from '../../types';

const NameScorePanel = (props: SetStatsComponentProps) => {
  const params = useParams();
  const playerNumber: string = params.playerNumber;

  const player = Object.values(props.setStats.players).find(p => String(p.player) == playerNumber);
  const stats = Object.values(props.setStats.stats).find(s => String(s.player_num) == playerNumber);

  return (
    <div className={props.className}>
      { player.prefix ?
        <div className="sponsor h-10 m-2 px-3 flex text-2xl justify-center items-center">
          <div>
            { player.prefix }
          </div>
        </div>
        : null
      }
      <div className="playerTagContainer ml-4 flex flex-col justify-center items-center">
        <div className="playerTag h-12 px-3 text-3xl justify-center items-center text-center">
          { player.player_tag }
        </div>
        <div className="score px-4 text-6xl">
          { stats.wins }
        </div>
      </div>
    </div>
  )
}

const StyledNameScorePanel = styled(NameScorePanel)`
  color: ${(props: SetStatsComponentProps) => props.settings.theme.white};

  .sponsor {
    width: fit-content;
    position: relative;
    z-index: 2;
    background-color: ${(props: SetStatsComponentProps) => props.settings.theme.primaryColor};
  }
  .playerTagContainer {
    z-index: 1;
    position: relative;
    margin-top: -0.8rem;
    width: fit-content;
    min-width: 300px;
    .playerTag {
      width: 100%;
      background-color: ${(props: SetStatsComponentProps) => props.settings.theme.secondaryColor};
    }
    .score {
      z-index: 0;
      position: relative;
      background-color: ${(props: SetStatsComponentProps) => props.settings.theme.black};
    }
  }
`;

export default StyledNameScorePanel;
