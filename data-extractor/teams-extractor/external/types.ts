export interface ExternalTeamEntry {
  saison: string;
  codent: string;
  poolCode: string;
  poolName: string;
  poolUrl: string;
  teamName: string;
}

export interface ExternalPool {
  code: string;
  name: string;
  url: string;
}

export interface ExternalTeam {
  rank: number;
  name: string;
}

export type HTML = string;
