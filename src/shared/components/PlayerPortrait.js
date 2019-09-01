import React from 'react';
import styled from 'styled-components';
import CharacterInfo from './CharacterInfo';

function PlayerPortrait({
  className,
  tag,
  player_number,
  main,
  game
}) {
  return (
    <div className={`${className} ${player_number}`}>
      <div className="playerPortraitWrap">
        <div className="playerPortrait">
          <div className="playerDetails">
            <div className="playerName">
              <div className="playerTag">{ tag }</div>  
            </div>
          </div>
        </div>
      </div>
      <div className="cptInfoWrap">
        <CharacterInfo character={{
            short: main,
            full: main
          }} game={game} />
      </div>
    </div>
  )
}

export default styled(PlayerPortrait)`
  .playerPortraitWrap {
    width: 100%;
    .playerPortrait {
      height: 100px;
      width: 100%;
      background-size: cover;
      background-position: top center;
      position: relative;

      .playerDetails {
        height: 100px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(57, 47, 64, 0.9);

        .playerCountryFlag {
          flex: 0 0 23%;
          > span {
            width: 6rem !important;
            height: 6rem !important;
            background-size: cover !important;
            border-radius: 3rem;
          }
        }
        .playerName {
          flex: 0 0 77%;
          text-align: center;
          .playerTag {
            font-size: 3.3rem;
            padding-top: 0.1rem;
          }
          .sponsor {
            font-size: 2.2rem;
            color: #fdff00;
          }
          .playerRealName {
            font-size: 1.6rem;
            font-weight: 300;
          }
        }
      }  
    }
  }

  .favouriteCharacter {
    border: 6px solid rgb(6, 12, 104);
    border-top: none;
  }

  &.player_1 {
    .capcomProTourInfo {
      background: url('/images/characters/character-bg-100-flipped.jpg');
      flex-direction: row-reverse;
    }
    .playerDetails {
      .playerCountryFlag {
        padding-left: 2rem;
      }
    }
  }

  &.player_2 {
    .playerDetails {
      flex-direction: row-reverse;
      .playerCountryFlag {
        padding-right: 2rem;
      }
    }
  }
`
