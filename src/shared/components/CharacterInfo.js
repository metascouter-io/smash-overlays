import React from 'react';
import styled from 'styled-components';

import { characters } from '../services/images';

function CharacterInfo({ className, game, character, rank, points }) {
  return (
    <div className={`characterInfo ${className}`}>
      <div className="characterInfoWrap">
      </div>
      <div className="spacer"></div>
    </div>
  )
}

export const StyledCharacterInfo = styled(CharacterInfo)`
  height: 150px;
  width: 100%;
  background: url(${props => characters[props.game][props.character.short]}) rgba(43, 36, 47, .7) !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  padding: 0.6rem;
  position: relative;
  display: flex;

  .label, .figure {
    font-size: 1.3rem;
  }

  .characterInfoWrap {
    flex: 0 0 57%;
  }

  .spacer {
    flex: 1;
  }

  .rank {
    background-color: #fff;
    padding: 0.4rem 0.8rem;
    border-radius: 0.3rem;
    display: flex;
    margin-bottom: 0.2rem;
    .label {
      /*flex: 0 0 4.5rem */;
      color: rgb(6, 12, 104);
    }
    .figure {
      flex: 1;
      color: rgb(6, 12, 104);
      font-weight: 600;
      text-align: right;
    }
  }

  .points {
    padding: 0.4rem 1rem;
    display: flex;

    .label {
      /* flex: 0 0 4.5rem */;
    }
    .figure {
      flex: 1;
      font-weight: 600;
      text-align: right;
    }
  }

  &.character-ryu {
    background-position: right -2200px !important; }

  &.character-chun-li {
    background-position: right -2300px !important; }

  &.character-nash {
    background-position: right -2400px !important; }

  &.character-mbison {
    background-position: right -2500px !important; }

  &.character-cammy {
    background-position: right -2600px !important; }

  &.character-birdie {
    background-position: right -2700px !important; }

  &.character-ken {
    background-position: right -2800px !important; }

  &.character-necalli {
    background-position: right -2900px !important; }

  &.character-vega {
    background-position: right -3000px !important; }

  &.character-rmika {
    background-position: right -3100px !important; }

  &.character-rashid {
    background-position: right -3200px !important; }

  &.character-karin {
    background-position: right -3300px !important; }

  &.character-zangief {
    background-position: right -3400px !important; }

  &.character-laura {
    background-position: right -3500px !important; }

  &.character-dhalsim {
    background-position: right -3600px !important; }

  &.character-fang {
    background-position: right -3700px !important; }

  &.character-alex {
    background-position: right -3800px !important; }

  &.character-guile {
    background-position: right -3900px !important; }

  &.character-ibuki {
    background-position: right -4000px !important; }

  &.character-balrog {
    background-position: right -4100px !important; }

  &.character-juri {
    background-position: right -4200px !important; }

  &.character-urien {
    background-position: right -4300px !important; }

  &.character-akuma {
    background-position: right -4700px !important; }

  &.character-kolin {
    background-position: right -4900px !important; }

  &.character-ed {
    background-position: right -5100px !important; }

  &.character-abigail {
    background-position: right -5300px !important; }

  &.character-menat {
    background-position: right -5500px !important; }

  &.character-zeku {
    background-position: right -5700px !important; }

  &.character-sakura {
    background-position: right -5900px !important; }

  &.character-blanka {
    background-position: right -6100px !important; }

  &.character-falke {
    background-position: right -6300px !important; }

  &.character-cody {
    background-position: right -6500px !important; }

  &.character-g {
    background-position: right -6700px !important; }

  &.character-sagat {
    background-position: right -6900px !important; }

  &.character-kage {
    background-position: right -7100px !important; }
`;

export default StyledCharacterInfo;
