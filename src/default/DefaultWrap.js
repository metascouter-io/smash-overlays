import React, { Component } from 'react';
import { defaultConfig } from '../shared/services/defaultConfig';
import theme from '../shared/services/theme';
import ActiveResources from '../shared/services/api/smash';

class DefaultWrap extends Component {
  activeResources = new ActiveResources('ssbm');

  constructor(props) {
    super(props);
    
    const config = { 
      ...defaultConfig(),
      ...this.fetchUrlParams(),
      active: false
      }


    this.activeResources = new ActiveResources(config.game);
    this.state = {
      config,
      theme,
      matchStats: undefined,
      setStats: undefined,
      fetchingSet: false
    }
  }

  fetchUrlParams() {
    const urlParams = new URLSearchParams(document.location.search);

    let passedInParams = {};
    for(const pair of urlParams.entries()) {
      passedInParams[pair[0]] = pair[1];
    }
    return passedInParams;
  }

  fetchActiveResources = () => {
    this.activeResources.game({ user: this.state.config.user })
      .then((results) => results.data)
      .then((results) => {
        let game = null;
        if (results.game) {
          game = results.game;
        } else {
          game = 'ssbm';
        }
        if (this.activeResources.gameName !== game) {
          this.activeResources.gameName = game;
        }
        // Dont fetch set if already fetching
        if (!this.state.fetchingSet) {
          this.setState({
            fetchingSet: true
          })
          this.activeResources.set({ user: this.state.config.user })
            .then((results) => results.data)
            .then((results) => {
              this.setState({
                setStats: results,
                fetchingSet: false,
                config: {
                  ...this.state.config,
                  game
                }
              });
            }
          );
        }
        // Dont fetch set if already fetching
        if (!this.state.fetchingMatch) {
          this.setState({
            fetchingMatch: true
          })
          this.activeResources.match({ user: this.state.config.user })
            .then((results) => results.data)
            .then((results) => {
              this.setState({
                matchStats: results,
                fetchingMatch: false,
                config: {
                  ...this.state.config,
                  game
                }
              });
            }
          );
        }
      });
  }
  
  setIntervalForFetchingPlayers() {
    if(this.fetchPlayersInterval === undefined) {
      this.fetchPlayersInterval = setInterval(this.fetchActiveResources, 5000)
    }
  }

  clearIntervalForFetchingPlayers() {
    if(this.fetchPlayersInterval !== undefined) {
      clearInterval(this.fetchPlayersInterval);
      this.fetchPlayersInterval = undefined
    }
  }

  componentDidMount() {
    setTimeout(() => { 
      let config = this.state.config;
      config.active = true;
      console.log("MOUNTED");
      this.setState({ config: config });
      }, 0);

    this.setIntervalForFetchingPlayers();
    this.fetchActiveResources();
  }

  render() {
    const { config, matchStats, setStats, theme } = this.state;

    return (
      <div className="App" style={{ width: '1920px', height: '1080px', overflow: 'hidden' }}>
        { matchStats && setStats && config && theme &&
          React.cloneElement(
            this.props.children,
            { config, matchStats, setStats, theme }
          )
        }
      </div>
    );
  }
}

export default DefaultWrap;
