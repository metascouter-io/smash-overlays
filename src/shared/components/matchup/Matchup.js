import React, { Component } from 'react';
import styled from 'styled-components';

import PlayerStatsRow from '../PlayerStatsRow/PlayerStatsRow';
import MetascouterLogo from '../MetascouterLogo';

class Matchup extends Component {
  render() {
    const { setStats, config, theme } = this.props;
    const stats = setStats;
    let { className } = this.props;

    if(config.transparent_bg) {
      className += ' withBackground';
    }

    const playerStats = stats.stats.reduce((acc, s) => {
      acc[s.player_num] = s;
      return acc;
    }, {});

    if (!stats.active) {
      return null;
    }

    const processPercent = (perc) => {
      if (perc == 'N/A') {
        return perc;
      } else {
        return Math.round(perc, 3) + '%';
      }
    };

    return (
        <div className={className}>
        { stats && stats.state == 'CP' &&
          <React.Fragment>
            <div className={`fade-in ${config.active && 'visible'}`}>
              <div className="statsView">
                <div className="headerRow">
                  <div className="spacer"></div>
                  <div className="headerContainer">
                    <div className={`playerName player1 ${config.active && 'visible'}`}>
                      <h1> {playerStats[1].wins} </h1>
                    </div>
                    <div className={`playerName ${config.active && 'visible'}`}>
                      <h2> {playerStats[1].player} </h2>
                      <div className="separator">
                        v.s.
                      </div>
                      <h2>{playerStats[2].player} </h2>
                    </div>
                    <div className={`playerName player2 ${config.active && 'visible'}`}>
                      <h1> {playerStats[2].wins} </h1> 
                    </div>
                  </div>
                  <div className="spacer"></div>
                </div>

                <PlayerStatsRow 
                  type={'h2h'} 
                  theme={theme}
                  config={config}
                  data={{
                    centerText: 'Damage dealt',
                    leftText: playerStats[1].total_damage_dealt,
                    rightText: playerStats[2].total_damage_dealt
                  }} 
                  style={{
                    background: this.props.theme.darkColor,
                    color: this.props.theme.darkText
                  }}
                  delay={{
                    seconds: ".6s"
                  }} />

                <PlayerStatsRow 
                  type={'h2h'} 
                  theme={theme}
                  config={config}
                  data={{
                    centerText: 'Lowest kill %',
                    leftText: processPercent(playerStats[1].lowest_death_percent),
                    rightText: processPercent(playerStats[2].lowest_death_percent)
                  }} 
                  style={{
                    background: this.props.theme.dimColor,
                    color: this.props.theme.dimText
                  }}
                  delay={{
                    seconds: ".7s"
                  }} />

                <PlayerStatsRow 
                  type={'h2h'} 
                  config={config}
                  theme={theme}
                  data={{
                    centerText: 'Avg. Death %',
                    leftText: processPercent(playerStats[1].avg_death_percent),
                    rightText: processPercent(playerStats[2].avg_death_percent)
                  }} 
                  style={{
                    background: this.props.theme.darkColor,
                    color: this.props.theme.darkText
                  }} 
                  delay={{
                    seconds: ".8s"
                  }} />

                <PlayerStatsRow 
                  type={'h2h'} 
                  config={config}
                  theme={theme}
                  data={{
                    centerText: 'First Stocks',
                    leftText: playerStats[1].first_stocks_taken,
                    rightText: playerStats[2].first_stocks_taken,
                  }} 
                  style={{
                    color: this.props.theme.dimText,
                    background: this.props.theme.dimColor
                  }}
                  delay={{
                    seconds: ".9s"
                  }} />

                <PlayerStatsRow 
                  type={'h2h'} 
                  config={config}
                  theme={theme}
                  data={{
                    centerText: 'Stocks taken',
                    leftText: playerStats[1].stocks_taken,
                    rightText: playerStats[2].stocks_taken
                  }} 
                  style={{
                    background: this.props.theme.darkColor,
                    color: this.props.theme.darkText
                  }}
                  delay={{
                    seconds: "1.0s"
                  }} />
                <div className="metascouterLogo">
                  <MetascouterLogo />
                </div>
              </div>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

const StyledMatchup = styled(Matchup)`
  .fade-in {
    opacity: 0;
    transform: ScaleX(0.0);

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-end;
  }

  .fade-in.visible {
    transition: opacity .5s ease-in, transform .4s ease-in;
    opacity: 1;
    transform: ScaleX(1.0);

    height: 100%;
    padding-top: 25%;
  }

  .statsView {
    width: 900px;
  }
  .metascouterLogo {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  .headerRow {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    background: ${props => props.theme.brightColor};

    .separator {
      font-size: 1.5rem;
      line-height: 100%;
      padding: 1rem;
    }
    .spacer {
      width: 8%;
    }
    .playerName
    {
      color: ${props => props.theme.brightText};
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      h2 {
        font-size: 2rem;
      }
    }

    .playerName.player1 {
      opacity: 0;
      transform: translateY(-10px);
    }

    .playerName.player2 {
      opacity: 0;
      transform: translateY(-10px);
      text-align: right;
    }

    .playerName.player1.visible, .playerName.player2.visible {
      opacity: 1;
      transform: translateY(0px);

      transition: opacity .2s ease-in .5s, transform .2s ease-in .5s;

      h2 {
        font-size: 2rem;
        padding: 1px;
        margin-top: 5px;
        margin-bottom: 0px;
      }

      h1 {
        padding-bottom: 5px;
        margin-top: 5px;
        margin-bottom: 0px;

        font-size: 64px;
      }
    }

    .logo {
      opacity: 0;
      position: absolute;
      float: center;

      left: 46%;
      filter: drop-shadow( 2px 2px 2px rgba(0, 0, 0, .5) );
      z-index: 100;
      img {
        margin-top: -15px;
        width: 50%;
      }
    }

    .logo.visible {
      opacity: 1;
      transition: opacity .2s ease-in .5s;
    }
 }
`;
export default StyledMatchup;
