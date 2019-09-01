import React, { Component } from 'react';
import styled from 'styled-components';

class HeadToHead extends Component {
  render()
  {
    const { className, data, style, theme, delay, config } = this.props;

    return (
      <div className={className}>
        <div className={`verticalSep ${config.active && 'visible'}`} />
        <div className={`stat ${config.active && 'visible'}`} style={style}>
          <div className={`player_1 ${config.active && 'visible'}`}><span>{ data.leftText }</span></div>
          <div className={`name ${config.active && 'visible'}`}><span>{ data.centerText }</span></div>
          <div className={`player_2 ${config.active && 'visible'}`}><span>{ data.rightText }</span></div>
        </div>
      </div>
    )
  }
}

export default styled(HeadToHead)`
  .stat {
    display: flex;
    flex-flow: row;
    width: 90%;
    margin-left: 5%;
    padding: 5px;
    justify-content: space-around;

    opacity: 0;
    transform: translateY(-10px);
  }

  .stat.visible {
    opacity: 1;
    transform: translateY(0.0);
    transition: opacity .2s ease-in ${props => props.delay.seconds}, transform .2s ease-in ${props => props.delay.seconds};
  }

  .player_1, .player_2, .name {
    opacity: 0;
    transform: translateY(-10px);
    font-size: 2rem;
    padding: 5px;
  }

  .player_1.visible, .player_2.visible, .name.visible {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity .2s ease-in ${props => props.delay.seconds}, transform .2s ease-in ${props => props.delay.seconds};
  }

  .verticalSep {
     width: 90%;
     margin-left: 5%;
     height: 1px;
     background: ${props => props.theme.colorColor};

     opacity: 0;
  }

  .verticalSep.visible {
    opacity: 1;
    transition: opacity .2s ease-in ${props => props.delay.seconds};
  }
`
