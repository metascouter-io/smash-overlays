import React from 'react';
import styled from 'styled-components';
import ReactAnime from 'react-animejs';
const { Anime, stagger } = ReactAnime;

import { SetStats } from '../types';

import SetStatSection from './SetStatSection';
import MetascouterLogo from './MetascouterLogo';

interface SetStatsColumnProps {
  setStats: SetStats;
}
const SetStatsColumn = (props: SetStatsColumnProps) => {
  const players = {
    1: Object.values(props.setStats.players).find(p => p.player == 1),
    2: Object.values(props.setStats.players).find(p => p.player == 2),
  };
  const playerStats = {
    1: Object.values(props.setStats.stats).find(p => p.player_num == 1),
    2: Object.values(props.setStats.stats).find(p => p.player_num == 2),
  };

  const {
    initial
  } = useAnimation();
  

  return (
    <Anime initial={initial} className={`${props.className} statColumn`}>
      <div>
        <div className="h-16 mt-16 setName font-bold flex items-center justify-center text-5xl">
          { props.setStats.bracket_full }
        </div>
        <div className="h-16"></div>
        <SetStatSection statHeader="Stocks Taken"
                        statRows={[
                          {
                            left: <div>{ playerStats[1].first_stocks_taken }</div>,
                            center: <div>First Stocks</div>,
                            right: <div>{ playerStats[2].first_stocks_taken }</div>,
                            barRatio: playerStats[1].first_stocks_taken /
                                        (playerStats[1].first_stocks_taken + playerStats[2].first_stocks_taken)
                          },
                          {
                            left: <div>{ playerStats[1].stocks_taken }</div>,
                            center: <div>Total</div>,
                            right: <div>{ playerStats[2].stocks_taken }</div>,
                            barRatio: playerStats[1].stocks_taken /
                                        (playerStats[1].stocks_taken + playerStats[2].stocks_taken)
                          },
                        ]}/>
        <SetStatSection statHeader="Kill %"
                        statRows={[
                          {
                            left: <div>{ playerStats[1].highest_kill_percent }</div>,
                            center: <div>Max</div>,
                            right: <div>{ playerStats[2].highest_kill_percent }</div>,
                            barRatio: playerStats[1].highest_kill_percent /
                                        (playerStats[1].highest_kill_percent + playerStats[2].highest_kill_percent)
                          },
                          {
                            left: <div>{ playerStats[1].avg_kill_percent.toFixed(1) }</div>,
                            center: <div>Avg</div>,
                            right: <div>{ playerStats[2].avg_kill_percent.toFixed(1) }</div>,
                            barRatio: playerStats[1].avg_kill_percent /
                                        (playerStats[1].avg_kill_percent + playerStats[2].avg_kill_percent)
                          },
                          {
                            left: <div>{ playerStats[1].lowest_kill_percent }</div>,
                            center: <div>Min</div>,
                            right: <div>{ playerStats[2].lowest_kill_percent }</div>,
                            barRatio: playerStats[1].lowest_kill_percent /
                                        (playerStats[1].lowest_kill_percent + playerStats[2].lowest_kill_percent)
                          },
                        ]}/>
        <SetStatSection statHeader="DMG"
                        statRows={[
                          {
                            left: <div>{ playerStats[1].total_damage_dealt }</div>,
                            center: <div>Dealt</div>,
                            right: <div>{ playerStats[2].total_damage_dealt }</div>,
                            barRatio: playerStats[1].total_damage_dealt /
                                        (playerStats[1].total_damage_dealt + playerStats[2].total_damage_dealt)
                          },
                        ]}/>
        <MetascouterLogo/>
      </div>
    </Anime>
  );
}

const StyledSetStatsColumn = styled(SetStatsColumn)`
  width: 640px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${props => props.theme.white};

  .setName {
    background-color: ${props => props.theme.black};
  }
`;


const useAnimation = () => {
  return {
    initial: [
      {
        targets: ['.statColumn'],
        duration: 750,
        translateY: ['-100vh', '0'],
        easing: 'easeInOutQuad'
      },
      {
        targets: ['.statColumn'],
        duration: 500,
        opacity: ['0', '1'],
        scaleX: ['0', '1'],
        easing: 'easeInOutQuad'
      },
      {
        targets: ['.setStatSection', '.statRow'],
        duration: 500,
        opacity: ['0', '1'],
        translateY: ['-50px', '0'],
        easing: 'easeInOutQuad',
        delay: stagger(100)
      },
      {
        targets: ['.setStatSection .statRatio'],
        duration: 500,
        height: ['0', '0.5rem'],
        easing: 'easeInOutQuad',
        delay: stagger(400)
      }
    ]   
  }
}

export default StyledSetStatsColumn;
