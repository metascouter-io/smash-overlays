import React, { Component } from 'react';
import { ready, SourcePluginWindow, Source } from 'xjs-framework/dist/xjs-es2015';
import { defaultConfig } from '../shared/services/defaultConfig';
import ActiveResources from '../shared/services/api/smash';

class XsplitWrapper extends Component {
  fetchPlayersInterval = undefined;
  activeResources = new ActiveResources('ssbm');

  constructor(props) {
    super(props);
    
    this.state = {
       config: defaultConfig(),
       source: undefined,
       configLoaded: false,
       active_resources: false,
       stats: undefined
       }
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
  
  setIntervalForFetchingActiveResources() {
    if(this.fetchPlayersInterval === undefined) {
      this.fetchPlayersInterval = setInterval(this.fetchActiveResources, 2000)
    }
  }

  clearIntervalForFetchingActiveResources() {
    if(this.fetchPlayersInterval !== undefined) {
      clearInterval(this.fetchPlayersInterval);
      this.fetchPlayersInterval = undefined
    }
  }

  componentDidMount() {
    ready()
      .then(Source.getCurrentSource)
      .then((mySource) => {
        // Property setters are chainable, so they resolve with the same object!
        // This means you can continue setting any properties.
        return mySource.setKeepLoaded(true)
      }).then((source) => {
        this.setState({ source });

        const sourceWindow = SourcePluginWindow.getInstance();
        
        sourceWindow.on('save-config', (configObj) => {
          const newConfig = { ...this.state.config, ...configObj }
          this.saveConfig(newConfig);
          this.setState({ config: newConfig, configLoaded: true });

          if(newConfig.active_resources) {
            this.setIntervalForFetchingActiveResources();
            this.fetchActiveResources();
          } else {
            this.clearIntervalForFetchingActiveResources();
          }
        });

        return source.loadConfig();
      }).then((config) => {
        if(this.state.config.active_resources) {
          this.setIntervalForFetchingActiveResources();
          this.fetchActiveResources();
        } else {
          this.clearIntervalForFetchingActiveResources();
        }

        this.setState({ configLoaded: true })
      });
  }

  saveConfig = (config) => {
    this.state.source.saveConfig(config);
  }  

  render() {
    const { config, configLoaded, stats } = this.state;

    return (
      <div className="App" style={{ width: '1920px', height: '1080px', overflow: 'hidden' }}>
        { stats && configLoaded &&
          React.cloneElement(
            this.props.children,
            { stats, config }
          )
        }
      </div>
    );
  }
}

export default XsplitWrapper;
