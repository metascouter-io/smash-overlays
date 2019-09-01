import React, { Component } from 'react';

import Matchup from '../components/matchup/Matchup';

class MatchupPage extends Component {

  render() {
    return (
      <Matchup theme={this.props.theme} config={this.props.config} stats={this.props.stats} />
    );
  }
}

export default MatchupPage;
