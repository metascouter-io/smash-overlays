import React, { Component } from 'react';
import { defaultConfig } from '../shared/services/defaultConfig';
import theme from '../shared/services/theme';
import ActiveResources from '../shared/services/api/smash';

class ObsWrap extends Component {
  activeResources = new ActiveResources('ssbm');

  constructor(props) {
    super(props);

    this.obs = null;
    const config = { ...defaultConfig(), ...this.fetchUrlParams() }

    this.activeResources = new ActiveResources(config.game);

    /*
    if(process.env.NODE_ENV === "development") {
      this.state.config = {
        player_1_name: 'Daigo Umehara',
        player_2_name: 'Go1',
        visible: false,
        active: false,
        activeScene: false
      }
    }
    else*/
    {
      this.state = {
        config,
        theme,
        matchStats: undefined,
        setStats: undefined,
        fetchingSet: false
      }
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

  componentDidMount() {
    // this.setupSceneChange();
    this.setupActiveChange();
    this.setupVisibilityChange();
    this.setIntervalForFetchingPlayers();
    this.fetchActiveResources();
  }

  setupSceneChange = () => {
    window.addEventListener('obsSceneChanged', (evt) => {
      console.error('scene change')
      let config = this.state.config;
      config.activeScene = evt.detail;

      this.setState({ config: config });
    });
  }

  setupVisibilityChange = () => {
    window.obsstudio.onVisibilityChange = (visiblity) => {
      console.error('visibility change')
      let config = this.state.config;
      config.visible = visiblity;

      this.setState({ config: config });
    };
  }

  setupActiveChange = () => {
    window.obsstudio.onActiveChange = (active) => {
      console.error('active change')
      let config = this.state.config;
      config.active = active;

      this.setState({ config: config });
    };
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

export default ObsWrap;
