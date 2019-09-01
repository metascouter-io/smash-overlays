import React from 'react';
import styled from 'styled-components';

function HeadToHead({ className, data, style }) {
  return (
    <div className={`${className} stat`} style={style}>
      <div className="text"><span>{ data.text }</span></div>
    </div>
  )
}

export default styled(HeadToHead)`
  background-image: linear-gradient(to right, rgba(118, 0, 217, 0.0), rgba(118, 0, 217, 0.8), rgba(118, 0, 217, 0.8),rgba(118, 0, 217, 0.8), rgba(118, 0, 217, 0.8),  rgba(118, 0, 217, 0.8), rgba(118, 0, 217, 0.8), rgba(118, 0, 217, 0.0));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  
  .text {
    text-align: center;
    
    span {
      color: #fff;
      font-size: 1.6rem;
      padding: 0.4rem;
    }
  }
`
