import React from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

interface NameScorePanelProps {
  playerNumber: 1 | 2;
  prefix: string;
  playerTag: string;
  wins: number;
}
const NameScorePanel = (props: NameScorePanelProps) => {

  return (
    <div className={`${props.className} font-bold flex flex-col items-center`} >
      { props.prefix ?
        <div className={`sponsor h-16 m-2 px-8 flex text-2xl justify-center items-center ${props.playerNumber == 2 ? 'self-end' : 'self-start'}`}>
          <div>
            { props.prefix }
          </div>
        </div>
        : null
      }
      <div className="playerTagContainer mx-4 flex flex-col justify-center items-center">
        <div className="playerTag h-16 px-3 text-3xl flex justify-center items-center text-center">
          { props.playerTag }
        </div>
        <div className="score px-4 text-6xl number">
          { props.wins }
        </div>
      </div>
    </div>
  )
}

const StyledNameScorePanel = styled(NameScorePanel)`
  color: ${props => props.theme.white};
  width: 640px;

  .sponsor {
    width: fit-content;
    position: relative;

    z-index: 2;
    background-color: ${props => props.theme.primaryColor};
  }
  .playerTagContainer {
    z-index: 1;
    position: relative;
    margin-top: -0.8rem;
    width: fit-content;
    min-width: 500px;
    .playerTag {
      width: 100%;
      background-color: ${props => props.theme.secondaryColor};
    }
    .score {
      z-index: 0;
      position: relative;
      background-color: ${props => props.theme.black};
    }
  }
`;

export default StyledNameScorePanel;
