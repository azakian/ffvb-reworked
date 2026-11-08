export interface ExternalTeamEntry {
  saison: string;
  codent: string;
  poolCode: string;
  poolName: string;
  teamName: string;
}

export interface ExternalPool {
  code: string;
  name: string;
}

export interface ExternalTeam {
  rank: number;
  name: string;
}

export type HTML = string;
