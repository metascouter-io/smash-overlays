import React, { Component } from 'react';

import Analysis from '../components/analysis/Analysis';

class AnalysisPage extends Component {

  render() {
    return (
      <Analysis theme={this.props.theme} config={this.props.config} stats={this.props.stats} />
    );
  }
}

export default AnalysisPage;
