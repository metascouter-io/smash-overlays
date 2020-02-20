import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

/**
 * Component imports
 * Components need to consume a 'stats' and 'config' prop.
 */
import Matchup from './containers/MatchupContainer';

import SetStatsContainer from './containers/SetStatsContainer';
import MatchStatsContainer from './containers/MatchStatsContainer';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/matchup/:username" component={Matchup}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
