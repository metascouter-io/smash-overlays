import React from 'react';
import HeadToHead from './HeadToHead';
import PlayerFact from './PlayerFact';

export default function PlayerStatsRow({ type, data, style, theme, delay, config }) {
  switch(type) {
    case 'h2h':
      return(<HeadToHead config={config} theme={theme} data={data} style={style} delay={delay} />);
    case 'text':
      return(<PlayerFact config={config} data={data} style={style} />);
    default:
      return ''
  }
}
