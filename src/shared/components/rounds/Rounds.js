import React from 'react';
import styled from 'styled-components';
import RoundRow from './RoundRow';

function Rounds({ className, rounds }) {
  return (
    <div className={`${className} rounds`}>
      { rounds.map((round, i) => <RoundRow round={round} index={i} delay_modifier={1*(i + 1)} />) }
    </div>
  )
}

export default styled(Rounds)`
  h3 {
    text-align: center;
    margin: 0;
    margin-bottom: 0.4rem;
  }

  .round {
    margin-bottom: 0.8rem;
  }
`