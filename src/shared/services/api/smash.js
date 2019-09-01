
import BaseApiCaller from './base_api_caller';

export default class ActiveResources extends BaseApiCaller {
    constructor(game) {
      super(`https://api.metascouter.gg/`)
      this.gameName = game;
    }

    /**
     * @param {string} options.user Metascouter account name
     */
    match({ user }) {
        return this.callRoute({
            method: 'GET',
            path: `${this.gameName}/active/${user}/match/`,
            params: {
                user: user
            }
        })
    }

    /**
     * @param {string} options.user Metascouter account name
     */
    set({ user }) {
        return this.callRoute({
            method: 'GET',
            path: `${this.gameName}/active/${user}/set/`,
            params: {
                user: user
            }
        })
    }

    game({ user }) {
        return this.callRoute({
            method: 'GET',
            path: `${this.gameName}/active/${user}/game/`,
            params: {
                user: user
            }
        })
    }
}
