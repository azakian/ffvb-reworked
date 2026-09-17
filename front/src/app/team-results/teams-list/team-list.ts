import { TeamId } from '../shared/teamId';

export interface ExternalTeam {
  team_id: number;
  team_name: string;
  short_name: string;
  pool_label: string;
  season_phase: number;
  years: string;
  team_ranking: number;
  points: number;
}

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
}

export interface TeamDescription {
  teamName: TeamId;
  teamShortName: string;
  currentPool: { poolName: string; poolYear: string; seasonPhase: 1 | 2 };
  currentRanking: number;
  currentPoints: number;
  currentWon: number;
  currentLost: number;
}

export interface Team {
  teamId: number;
  teamName: string;
  teamShortName: string;
  currentPoolLabel: string;
  currentRanking: number;
}

export const convertToTeams = (externalTeams: ExternalTeam[]): Team[] =>
  externalTeams.map(convertToTeam);

const convertToTeam = (externalTeam: ExternalTeam): Team => {
  return {
    teamId: externalTeam.team_id,
    teamName: externalTeam.team_name,
    teamShortName: externalTeam.short_name,
    currentPoolLabel: externalTeam.pool_label,
    currentRanking: externalTeam.team_ranking,
  };
};

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
  };
};
