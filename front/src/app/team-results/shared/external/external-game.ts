export interface ExternalGame {
  id: number;
  created_at: string;
  week: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  team1_score: number | null;
  team2_score: number | null;
  set1: string | null;
  set2: string | null;
  set3: string | null;
  set4: string | null;
  set5: string | null;
  location: string | null;
  pool_id: number;
  modified_at: string;
}

export interface ExternalWeekGames {
  week: string;
  games: ExternalGame[];
}
