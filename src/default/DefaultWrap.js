import React, { Component } from 'react';

import SharedWrapMixin from '../shared/SharedWrapMixin';

class DefaultWrap extends SharedWrapMixin {

  constructor(props) {
    super(props);

    this.state.config = {
      ...this.state.config,
      ...this.fetchUrlParams(),
      active: false
    };
  }


  componentDidMount() {
    setTimeout(() => { 
      let config = this.state.config;
      config.active = true;
      console.log("MOUNTED");
      this.setState({ config: config });
      }, 0);

    this.setIntervalForFetchingActiveResources();
    this.fetchActiveResources();
  }

  render(props) {
    const { config, matchStats, setStats, theme } = this.state;

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

export default DefaultWrap;
