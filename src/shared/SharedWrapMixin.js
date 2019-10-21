import React, { Component } from 'react';

import { defaultConfig } from './services/defaultConfig';
import theme from './services/theme';
import ActiveResources from './services/api/smash';

class SharedWrapMixin extends Component {
  /**
   * Fetches active resources and auto populates config
   * and data
   */

  activeResources = new ActiveResources('ssbm');

  constructor(props) {
    super(props);
    const config = { 
      ...defaultConfig(),
      active: false
    }

    this.activeResources = new ActiveResources(config.game);
    this.state = {
      config,
      theme,
      matchStats: undefined,
      setStats: undefined,
      fetchingSet: false,
      fetchingMatch: false
    }
  }
  
  fetchActiveResources = () => {
    const params = this.fetchUrlParams();
    const user = params.user ? params.user : this.state.config.user;
    this.activeResources.settings({ user })
      .then((results) => results.data)
      .then((results) => {
        const game = results.game ? results.game : 'ssbm';
        const theme = results.theme ? 
          {
            ...this.state.theme,
            ...results.theme
          } : this.state.theme;
        if (this.activeResources.gameName !== game) {
          this.activeResources.gameName = game;
        }

        this.setState({
          theme,
          config: {
            ...this.state.config,
            game
          }
        })
        // Dont fetch set if already fetching
        if (!this.state.fetchingSet) {
          this.setState({
            fetchingSet: true
          })
          this.activeResources.set({ user: this.state.config.user })
            .then((results) => results.data)
            .then((results) => {
              this.setState({
                setStats: results,
                setActive: results.active,
                fetchingSet: false,
              });
            })
            .catch((e) => {
              // The active resource is not set yet
              if (e.isAxiosError && (e.response.status == 404 ||
                                     e.response.status == 400)) {
                this.setState({
                  fetchingSet: false,
                  setActive: false,
                })
              }
            })
        }
        // Dont fetch set if already fetching
        if (!this.state.fetchingMatch) {
          this.setState({
            fetchingMatch: true
          })
          this.activeResources.match({ user: this.state.config.user })
            .then((results) => results.data)
            .then((results) => {
              this.setState({
                matchStats: results,
                matchActive: results.active,
                fetchingMatch: false,
              });
            })
            .catch((e) => {
              // The active resource is not set yet
              if (e.isAxiosError && (e.response.status == 404 ||
                                     e.response.status == 400)) {
                this.setState({
                  fetchingMatch: false,
                  matchActive: false,
                })
              }
            });
        }
      });
  }

  /**
   * Starts polling active resources
   */ 
  setIntervalForFetchingActiveResources() {
    if(this.fetchActiveResourcesInterval === undefined) {
      this.fetchActiveResourcesInterval = setInterval(this.fetchActiveResources, 5000)
    }
  }

  /**
   * Stops polling active resources
   */ 
  clearIntervalForFetchingPlayers() {
    if(this.fetchActiveResourcesInterval !== undefined) {
      clearInterval(this.fetchActiveResourcesInterval);
      this.fetchActiveResourcesInterval = undefined
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
}

export default SharedWrapMixin;
