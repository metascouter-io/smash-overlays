import {
  Settings,
  SetStats,
  MatchStats
} from '../types';

export default class Smash {
  baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api.metascouter.gg'
    //this.baseUrl = 'http://localhost:8000'
  }

  async getSettings(user: string): Promise<Settings> {
    const resp = await fetch(`${this.baseUrl}/ssbu/active/${user}/settings/`);
    if (resp.status == 500) {
      throw 'Unhandled server-side exception';
    }
    return await resp.json();
  }

  async getSetStats(game: string, user: string): Promise<SetStats> {
    const resp = await fetch(`${this.baseUrl}/${game}/active/${user}/set/`);
    if (resp.status == 500) {
      throw 'Unhandled server-side exception';
    }
    if (resp.status == 404) {
      throw 'Stream set is not assigned'
    }
    return await resp.json();
  }

  async getMatchStats(game: string, user: string): Promise<MatchStats> {
    const resp = await fetch(`${this.baseUrl}/${game}/active/${user}/match/`);
    if (resp.status == 500) {
      throw 'Unhandled server-side exception';
    }
    if (resp.status == 404) {
      throw 'Stream match is not assigned'
    }
    return await resp.json();
  }
}
