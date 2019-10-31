import React, { Component } from 'react';
import { ready, SourcePluginWindow, Source } from 'xjs-framework/dist/xjs-es2015';
import SharedWrapMixin from '../shared/SharedWrapMixin';

class XsplitWrapper extends SharedWrapMixin {

  constructor(props) {
    super(props);
    
    this.state = {
      ...this.state,
      source: undefined,
      configLoaded: false,
      active_resources: false,
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
    const { config, configLoaded, matchStats, setStats, theme } = this.state;

    return (
      <div className="App" style={{ width: '1920px', height: '1080px', overflow: 'hidden' }}>
        { !(this.props.shouldFetchMatch && !matchStats)
             && !(this.props.shouldFetchSet && !setStats)
             && config && theme &&
          React.cloneElement(
            this.props.children,
            { config, matchStats, setStats, theme }
          )
        }
      </div>
    );
  }
}

export default XsplitWrapper;
