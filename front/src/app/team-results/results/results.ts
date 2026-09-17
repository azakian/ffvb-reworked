import { convertToGame, convertToWeekGames, Game, WeekGames } from '../shared/game';
import { convertToRankings, Ranking } from '../shared/ranking';
import {
  convertToPool,
  ExternalGame,
  ExternalPool,
  ExternalRanking,
  ExternalTeam,
  ExternalWeekGames,
  Pool,
} from '../shared/external';
import { TeamId } from '../shared/teamId';

// Retour de la fonction get_full_pool_summary()
export interface ExternalResults {
  team: ExternalTeam;
  current_pool: ExternalPool;
  previous_game: ExternalGame | null;
  next_game: ExternalGame | null;
  rankings: ExternalRanking[];
  games_by_week: ExternalWeekGames[];
}

export interface Results {
  teamId: TeamId;
  teamLabel: string;
  pool: Pool;
  previousGame: Game | null;
  nextGame: Game | null;
  rankings: Ranking[];
  games: WeekGames[];
}

export const convertToResults = (externalResult: ExternalResults): Results => {
  const previousGame = convertToGame(externalResult.previous_game);
  const nextGame = convertToGame(externalResult.next_game);
  const rankings = convertToRankings(externalResult.rankings);
  const weekGames = convertToWeekGames(externalResult.games_by_week);
  const pool = convertToPool(externalResult.current_pool);

  return {
    teamId: externalResult.team.short_name,
    teamLabel: externalResult.team.name,
    pool,
    previousGame,
    nextGame,
    rankings,
    games: weekGames,
  };
};
