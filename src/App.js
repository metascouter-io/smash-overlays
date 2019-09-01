import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

/** 
 * Component imports
 * Components need to consume a 'stats' and 'config' prop.
 */
import Matchup from './shared/components/matchup/Matchup';
import Analysis from './shared/components/analysis/Analysis';
import Config from './xsplit/pages/Config';

/** 
 * Wrapper imports
 * All wrappers need to do is pass down a 'stats' and 'config' prop to their children.
 */
import DefaultWrap from './default/DefaultWrap';
import XsplitWrap from './xsplit/XsplitWrap';
import ObsWrap from './obs/ObsWrap';

// Wrap files here with the appropiate wrapper
const DefaultMatchup  = () => <DefaultWrap><Matchup /></DefaultWrap>;
const DefaultAnalysis = () => <DefaultWrap><Analysis /></DefaultWrap>;
const XsplitMatchup   = () => <XsplitWrap><Matchup /></XsplitWrap>;
const XsplitAnalysis  = () => <XsplitWrap><Analysis /></XsplitWrap>;
const XsplitConfig    = () => <XsplitWrap><Config /></XsplitWrap>;
const ObsMatchup      = () => <ObsWrap><Matchup /></ObsWrap>;
const ObsAnalysis     = () => <ObsWrap><Analysis /></ObsWrap>;

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/matchup" component={DefaultMatchup} />
        <Route path="/analysis" component={DefaultAnalysis} />
        <Route path="/xsplit/matchup" component={XsplitMatchup} />
        <Route path="/xsplit/analysis" component={XsplitAnalysis} />
        <Route path="/xsplit/config" component={XsplitConfig} />
        <Route path="/obs/matchup" component={ObsMatchup} />
        <Route path="/obs/analysis" component={ObsAnalysis} />
      </Router>
    )
  }
}

export default App;