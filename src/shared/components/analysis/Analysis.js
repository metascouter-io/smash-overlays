import React, { Component } from 'react';
import styled from 'styled-components';

import PlayerPortrait from '../PlayerPortrait';
import MetascouterLogo from '../MetascouterLogo';
import MatchGraph from '../MatchGraph';

import '../../Animations.scss';

class Analysis extends Component {
  render() {
    const { matchStats, config } = this.props;
    const stats = matchStats;
    let { className } = this.props;

    const playerStats = Object.values(stats.players).reduce((acc, s) => {
      acc[s.player] = s;
      return acc;
    }, {})

    const playerCharacters = Object.values(stats.players).reduce((acc, s) => {
      acc[s.player] = s.character.internal_name;
      return acc;
    }, {})

    const classes = `${className} ${config.visible ? '' : 'display-none'} ${config.active ? 'visible' : ''} ${config.transparent_bg ? '' : 'withBackground'}`

    return (
      <div className={classes}>
        { stats &&
          <React.Fragment>
            <div className={`stats fade-in ${config.active ? 'visible' : ''}`}>
              <div className="title">
                <div className="text">
                  Graph of Match { stats.index_in_set }
                </div>
              </div>
              <div className="graph">
                <MatchGraph game={config.game}
                            playerCharacters={playerCharacters}
                            eventData={stats.stats.event_data} />
              </div>
              <div className="logo">
                <MetascouterLogo />
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

const StyledAnalysis = styled(Analysis)`
  display: flex;
  color: #fff;
  height: 1080px;

  &.withBackground {
    background: url('/images/cpt_background.png') no-repeat center;
    background-size: cover;
  }

  .player {
  }

  .stats {
    
    &.fade-in.visible {
      transition: opacity .5s ease-in, transform .4s ease-in;
      opacity: 1;
      transform: ScaleX(1.0);

      .title {
        transition: transform .2s ease-in 0.4s ;
        transform: ScaleX(1.0);
        .text {
          transition: opacity .2s ease-in 0.6s ;
          opacity: 1;
        }
      }
      .logo {
        transition: opacity .4s ease-in 1s ;
        opacity: 1;
      }
      .graph {
        transition: opacity .4s ease-in 1s ;
        opacity: 1;
      }
    }
    &.fade-in {
      opacity: 0;
      transform: ScaleX(0.0);
      
      .title {
        transform: ScaleX(0.0);
        .text {
          opacity: 0;
        }
      }
      .graph {
        opacity: 0;
      }
      .logo {
        opacity: 0;
      }
    }
    width: 35%;
    right: 50px;
    bottom: 150px;
    position: absolute;
    background: black;
    padding: 1rem;
    
    .title {
      width: 100%;
      margin-top: -1.5rem;
      margin-bottom: 2rem;
      height: 2rem;
      background-color: ${props => props.theme.brightColor};

      .text {
        height: 100%;
        color: ${props => props.theme.brightText};
        line-height: 2rem;
        text-align: center;
        font-size: 1.5rem;
      }
    }

    .graph {
    }


    .logo {
      height: 100px;
    }
    .metascouterLogo {
      height: 120px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 100% !important;
        width: auto !important;
      }
    }
  }
`;

export default StyledAnalysis;
