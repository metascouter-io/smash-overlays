import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

/**
 * Component imports
 * Components need to consume a 'stats' and 'config' prop.
 */
import Matchup from './shared/components/matchup/Matchup';

import SetStatsContainer from './shared/containers/SetStatsContainer';
import MatchStatsContainer from './shared/containers/MatchStatsContainer';

import NameScorePanel from './shared/components/NameScorePanel';


const ScoreCard = () => <SetStatsContainer><NameScorePanel/></SetStatsContainer>

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/namescore/:playerNumber" component={ScoreCard}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
