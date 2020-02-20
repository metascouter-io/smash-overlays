import React from 'react';
import styled, { keyframes } from 'styled-components';

import '../../Animations.scss';

function RoundRow({ className, round, index, delay_modifier }) {
  return (
    <React.Fragment>
      <h3>Round {index + 1}</h3>
      <div className={`${className} round`}>
        <div className="player_1">
          <div className="healthLost">{ round.player_1.health === 0 && <span className="roundKo">KO</span> }</div>
        </div>
        <div className="time"><span>{ round.time }</span></div>
        <div className="player_2">
          <div className="healthLost">{ round.player_2.health === 0 && <span className="roundKo">KO</span> }</div>
        </div>
      </div>
    </React.Fragment>
  )
}

const player_health_animation = (health) => keyframes`
  from {
    width: 0%;
  }

  to {
    width: ${100 - health}%;
  }
`;

export default styled(RoundRow)`
  display: flex;

  .player_1, .player_2 {
    display: flex;
    align_items: center;
    justify_content: center;
    flex: 0 0 47%;
    border-radius: 0.2rem;
    overflow: hidden;
    background: #e2df47;

    .healthLost {
      height: 1.6rem;
      padding-top: 0.1rem;
      background: #f00;
      color: #e2df47;
      text-align: center;
    }
  }

  .player_1 .healthLost {
    width: 0%;
    animation: ${props => player_health_animation(props.round.player_1.health)} 2s ${props => props.delay_modifier || 1}s forwards;
  }

  .player_2 {
    flex-direction: row-reverse;
    .healthLost {
      width: 0%;
      animation: ${props =>  player_health_animation(props.round.player_2.health)} 2s ${props => props.delay_modifier || 1}s forwards;
    }
  }
  
  .time {
    flex: 0 0 6%;
    font-size: 1.2rem;
    text-align: center;
    color: #000;
  }
`
