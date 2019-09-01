import React, { Component } from 'react';
import { ready, Source, SourcePropsWindow } from 'xjs-framework/dist/xjs-es2015';

import { defaultConfig } from '../../shared/services/defaultConfig';

import Settings from '../components/config/Settings';

import './Config.css';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = { config : defaultConfig(), loaded: false, source: undefined };
  }

  componentDidMount() {
    ready()
    .then(Source.getCurrentSource)
    .then((mySource) => {
      this.setState({ source: mySource });
      return mySource.loadConfig();
    }).then((config) => {
      const existingConfig = this.state.config;
      const newConfig = { ...existingConfig, ...config }
      
      this.setState({ config: newConfig });

      const propsWindow = SourcePropsWindow.getInstance();
      propsWindow.useTabbedWindow({
        customTabs: ['Metascouter'],
        tabOrder: ['Metascouter', 'Layout', 'Transition']
      });

      this.setState({ loaded: true })
    });
  }

  saveConfig = () => {
    this.state.source.requestSaveConfig(this.state.config);
  }

  handleInputChange = (e) => {
    let existingConfig = this.state.config;
    if(e.target.type === 'checkbox') {
      existingConfig[e.target.name] = e.target.checked;
    } else {
      existingConfig[e.target.name] = e.target.value;
    }

    this.setState({ config: existingConfig });
  }
  render() {
    const { config, loaded } = this.state;

    return (
      <div className="config">
        { loaded && <Settings config={config} saveConfig={this.saveConfig} handleInputChange={this.handleInputChange} /> }
        { !loaded && <p>Loading</p> }
      </div>
    );
  }
}

export default Config;
