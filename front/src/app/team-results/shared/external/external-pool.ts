export interface ExternalPool {
  id: number;
  created_at: string;
  label: string;
  years: string;
  team_id: number;
  season_phase: 1 | 2;
}

export interface Pool {
  label: string;
  year: string;
  seasonPhase: 1 | 2;
}

export const convertToPool = (externalPool: ExternalPool): Pool => {
  return {
    label: externalPool.label,
    year: externalPool.years,
    seasonPhase: externalPool.season_phase,
  };
};
