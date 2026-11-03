export interface Ranking {
  teamRanking: string;
  teamName: string;
  points: string;
  playedMatch: string;
  wonMatch: string;
  lostMatch: string;
  dnf: string;
  win3_0: string;
  win3_1: string;
  win3_2: string;
  loss0_3: string;
  loss1_3: string;
  loss2_3: string;
  wonSets: string;
  lostSets: string;
}

export interface Game {
  date: string;
  time: string;
  team1: string;
  team2: string;
  team1Score: string;
  team2Score: string;
  setsScore: string[];
  isPlayed: boolean;
  location: string;
}

export interface GameByWeek {
  week: string;
  games: Game[];
}

export interface ExternalData {
  team: string;
  year: string;
  seasonPhase: 1 | 2;
  ranking: Ranking[];
  games: GameByWeek[];
}
