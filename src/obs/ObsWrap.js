import React, { Component } from 'react';
import SharedWrapMixin from '../shared/SharedWrapMixin';

class ObsWrap extends SharedWrapMixin {

  constructor(props) {
    super(props);

    this.obs = null;
    this.state.config = {
      ...this.state.config,
      active: true,
      ...this.fetchUrlParams(),
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
    this.setupActiveChange();
    this.setupVisibilityChange();
    this.setIntervalForFetchingActiveResources();
    this.fetchActiveResources();
  }

  setupVisibilityChange = () => {
    window.obsstudio.onVisibilityChange = (visiblity) => {
      console.error('visibility change')
      let config = this.state.config;
      config.visible = !visiblity;

      this.setState({ config: config });
    };
  }

  setupActiveChange = () => {
    window.obsstudio.onActiveChange = (active) => {
      console.error('active change')
      let config = this.state.config;

      if (active) {
        config.active = false;
        this.setState({ config: config });

        setTimeout(() => {
          config.active = active;
          this.setState({ config: config });
        }, 100)
      }
    };
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
