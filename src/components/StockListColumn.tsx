import React from 'react';
import styled from 'styled-components'

import MetascouterLogo from './MetascouterLogo';
import StockListItem from './StockListItem';

import { MatchStats, Settings, RichStock } from '../types';
import { stages } from '../services/images';


interface StockListColumnProps {
  matchStats: MatchStats;
  settings: Settings;
}

const toTS = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60).toFixed(0);
  return `${minutes}:${seconds}`;
}

const StockListColumn = (props: StockListColumnProps) => {
  const stageUrl = stages[props.settings.game][props.matchStats.stage.internal_name];
  const players = {
    1: Object.values(props.matchStats.players).find(p => p.player == 1),
    2: Object.values(props.matchStats.players).find(p => p.player == 2),
  };

  const stocks: RichStock[] =
    Object.values(props.matchStats.stats.event_data)
          .reduce((acc: RichStock[], val) => {
            const playerNumber = val.port;
            const stockConvert = (stock: number[], idx: number) => ({
              stockNumber: stock[1],
              time: stock[0],
              playerNumber,
              deathPercent: props.matchStats.stock_stats[String(playerNumber)][String(idx+1)].death_percent
            })
            if (acc.length == 0) {
              acc = val.stock_data.map(stockConvert);
            } else {
              acc = acc.concat(val.stock_data.map(stockConvert));
              acc.sort((a, b) => a.time - b.time);
            }
            return acc;
          }, [])

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
      <div className="w-full flex items-center justify-between p-5">
        <div className="p-3 text-3xl"
             style={{backgroundColor: '#fd5f5f'}}>
          { players[1].player_tag }
        </div>
        <div className="p-3 text-5xl font-black">
          Stocks
        </div>
        <div className="p-3 text-3xl"
             style={{backgroundColor: '#3232ff'}}>
          { players[2].player_tag }
        </div>
      </div>
      <div className="w-full grid grid-cols-5">
        <div className="col-span-2">
          {
            stocks.map((stock, key) => (
              <StockListItem key={key}
                             playerNumber={1}
                             character={players[1].character}
                             game={props.settings.game}
                             stock={stock} />
            ))
          }
        </div>
        <div className="col-span-1">
          {
            stocks.map((stock, key) => (
              <div key={key}
                   className="h-16 flex items-center justify-center text-2xl number">
                { toTS(stock.time) }
              </div>
            ))
          }
        </div>
        <div className="col-span-2">
          {
            stocks.map((stock, key) => (
              <StockListItem key={key}
                             playerNumber={2}
                             character={players[2].character}
                             game={props.settings.game}
                             stock={stock} />
            ))
          }
        </div>
      </div>
      <div className="h-10">
        <MetascouterLogo />
      </div>
    </div>
  )
}

const StyledStockListColumn = styled(StockListColumn)`
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
  }
`

export default StyledStockListColumn;
