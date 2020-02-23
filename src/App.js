import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

/**
 * Component imports
 * Components need to consume a 'stats' and 'config' prop.
 */
import Matchup from './containers/MatchupContainer';
import MatchGraphContainer from './containers/MatchGraphContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/matchup/:username" component={Matchup}/>
          <Route path="/analysis/:username" component={MatchGraphContainer}/>
          <Route path="/matchgraph/:username" component={MatchGraphContainer}/>
        </Router>
      </Provider>
    );
  }
}

// Safe to use in production
// https://github.com/gaearon/react-hot-loader#what-about-production
import { hot } from 'react-hot-loader/root'

export default hot(App);
