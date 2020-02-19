
export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  black: string;
  white: string;
}

export type Game = 'ssbu' | 'ssbm';
export interface Settings {
  game: Game;
  theme?: Theme;
}


interface StockStats {
  [playerNumber: string]: {
    [stockNumber: string]: {
      duration: number;
      damage_dealt: number;
      stocks_taken: number;
    }
  }
}

type PlayerId = string;
export interface SetStats {
  id: number;
  state: 'CP' | 'IP' | 'NR';
  bracket_full: string;
  players: {
    [playerId: string /* PlayerId */]: {
      id: PlayerId;
      player_tag: string;
      player: 1 | 2;
      prefix?: string;
      picture_url?: string;
      full_name?: string;
    }
  },
  tournament: string;
  stats: [
    {
      player: string; // Readable name
      player_num: number;
      total_damage_taken: number;
      total_damage_dealt: number;
      avg_dps: number;
      stocks_taken: number;
      stocks_lost: number;
      first_stocks_taken: number;
      death_percents: number[];
      avg_death_percent: number;
      highest_death_percent: number;
      lowest_death_percent: number;
      avg_kill_percent: number;
      highest_kill_percent: number;
      lowest_kill_percent: number;
      wins: number;
    }
  ],
  matches: [
    {
      id: string;
      unrecoverable: boolean;
      winner: PlayerId;
      index_in_set: number;
      stage: {
        id: number;
        name: string;
        internal_name: string;
        form?: 'NO' | 'BA' | 'FD';
      },
      stats: {
        badge_data: never;
        ending_player_stocks: {
          [playerId: string /* PlayerId */]: number
        },
        duration: number;
      },
      stock_stats: StockStats,
      players: {
        [playerId: string /* PlayerId */]: {
          character: {
            id: number;
            name: string;
            internal_name: string;
          },
          id: PlayerId;
          player_tag: string;
          player: number;
          prefix?: string;
          picture_url?: string;
          full_name?: string;
        }
      }

      // Should not matter in stats calculation
      active: boolean;
      verified: boolean;
      is_fully_detailed: boolean;
      time: string;
    }
  ]
}


type PlayerStatMap<T> = {
  [playerId: string /* PlayerId */]: T
};

export interface MatchStats {
  id: string;
  unrecoverable: boolean;
  winner: PlayerId;
  stage: {
    id: number;
    name: string;
    internal_name: string;
    form?: 'NO' | 'BA' | 'FD';
  },
  stock_stats: StockStats:
  stats: {
    stats_data: {
      took_first_stock: PlayerStatMap<boolean>;
      // both the same numbers
      duration: PlayerStatMap<number>;
      stocks_lost: PlayerStatMap<number>;
      stocks_taken: PlayerStatMap<number>;
      damage_taken: PlayerStatMap<number>;
      death_percents: PlayerStatMap<number[]>;
      max_dps: PlayerStatMap<{ stock: number, dps: number }>;
      avg_dps: PlayerStatMap<number>;
    },
    ending_player_stocks: PlayerStatMap<number>;
    duration: number;
    event_data: [
      {
        name: string; // series name
        health_at_death_data: [
          [number, number]
        ];
        health_data: [
          [number, number]
        ];
        stock_data: [
          [number, number]
        ];
      }
    ];
  }
}


export interface SetStatsComponentProps {
  setStats: SetStats;
  settings: Settings;
}

export interface MatchStatsComponentProps {
  matchStats: MatchStats;
  settings: Settings;
}
