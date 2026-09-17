import { ExternalGame, ExternalPool, ExternalRanking, ExternalTeam } from '../shared/external';
import { convertToRanking, Ranking } from '../shared/ranking';
import { convertToGame, convertToGames, Game } from '../shared/game';

export interface ExternalTeamDetails {
  team: ExternalTeam;
  pool: ExternalPool;
  ranking: ExternalRanking;
  next_game: ExternalGame | null;
  last_results: ExternalGame[];
}

export interface TeamDetails {
  teamShortName: string;
  teamName: string;
  poolName: string;
  ranking: Ranking;
  nextGame: Game | null;
  lastGames: Game[];
}

export const convertToTeamDetails = (externalTeamDetails: ExternalTeamDetails): TeamDetails => {
  return {
    teamShortName: externalTeamDetails.team.short_name,
    teamName: externalTeamDetails.team.name,
    poolName: externalTeamDetails.pool.label,
    ranking: convertToRanking(externalTeamDetails.ranking),
    nextGame: convertToGame(externalTeamDetails.next_game),
    lastGames: convertToGames(externalTeamDetails.last_results),
  };
};
