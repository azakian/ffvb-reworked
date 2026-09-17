export interface ExternalTeamPool {
  id: number;
  label: string;
  years: string;
  season_phase: 1 | 2;
  team_id: number;
  is_latest: boolean;
}

export interface TeamPool {
  poolName: string;
  year: string;
  seasonPhase: 1 | 2;
  isLatest: boolean;
}

export const convertToTeamPools = (externalTeamPools: ExternalTeamPool[]): TeamPool[] =>
  externalTeamPools.map(convertToTeamPool);

const convertToTeamPool = (externalTeamPool: ExternalTeamPool): TeamPool => {
  return {
    poolName: externalTeamPool.label,
    year: externalTeamPool.years,
    seasonPhase: externalTeamPool.season_phase,
    isLatest: externalTeamPool.is_latest,
  };
};
