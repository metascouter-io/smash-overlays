import React from 'react';

import { RichStock, Character } from '../types';
import { icons } from '../services/images';

interface StockListItemProps {
  stock: RichStock;
  character: Character;
  game: string;
  playerNumber: number;
}
const StockListItem = (props: StockListItemProps) => {
  if (props.stock.playerNumber != props.playerNumber) {
    return (
      <div className="w-full h-16"></div>
    )
  }
  return (
    <div className="w-full h-16"
         style={{
           backgroundColor: props.stock.playerNumber == 1 ? '#fd5f5f' : '#3232ff',
         }}>
      <img src={ icons[props.game][props.character.internal_name] } />
      @ { props.stock.deathPercent }%
    </div>
  )
}

export default StockListItem;
