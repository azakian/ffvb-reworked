import { TeamId } from '../shared/teamId';
import { ExternalGame } from '../shared/external';
import { convertToGame, Game } from '../shared/game';

export interface ExternalTeamDescription {
  team_id: number;
  team_name: string;
  team_short_name: string;
  pool_label: string;
  pool_year: string;
  pool_season_phase: 1 | 2;
  team_ranking: number;
  points: number;
  won: number;
  lost: number;
  last_game: ExternalGame | null;
  next_game: ExternalGame | null;
}

export interface TeamDescription {
  teamName: TeamId;
  teamShortName: string;
  currentPool: { poolName: string; poolYear: string; seasonPhase: 1 | 2 };
  currentRanking: number;
  currentPoints: number;
  currentWon: number;
  currentLost: number;
  lastGame: Game | null;
  nextGame: Game | null;
}

export const convertToTeamDescriptions = (
  externalTeamDescription: ExternalTeamDescription[],
): TeamDescription[] => externalTeamDescription.map(convertToTeamDescription);

const convertToTeamDescription = (
  externalTeamDescription: ExternalTeamDescription,
): TeamDescription => {
  return {
    teamShortName: externalTeamDescription.team_short_name,
    teamName: externalTeamDescription.team_name,
    currentPool: {
      poolName: externalTeamDescription.pool_label,
      poolYear: externalTeamDescription.pool_year,
      seasonPhase: externalTeamDescription.pool_season_phase,
    },
    currentRanking: externalTeamDescription.team_ranking,
    currentPoints: externalTeamDescription.points,
    currentWon: externalTeamDescription.won,
    currentLost: externalTeamDescription.lost,
    lastGame: convertToGame(externalTeamDescription.last_game),
    nextGame: convertToGame(externalTeamDescription.next_game),
  };
};
