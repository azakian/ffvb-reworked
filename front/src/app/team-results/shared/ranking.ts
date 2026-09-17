import { ExternalRanking } from './external';

export interface Ranking {
  teamRanking: number;
  teamLabel: string;
  points: number;
  played: number;
  won: number;
  lost: number;
  dnf: number;
  win3_0: number;
  win3_1: number;
  win3_2: number;
  lost0_3: number;
  lost1_3: number;
  lost2_3: number;
  wonSets: number;
  lostSets: number;
}

export const convertToRankings = (externalRankings: ExternalRanking[]): Ranking[] =>
  externalRankings.map(convertToRanking);

export const convertToRanking = (externalRanking: ExternalRanking): Ranking => {
  return {
    teamRanking: externalRanking.team_ranking,
    teamLabel: externalRanking.team_name,
    points: externalRanking.points,
    played: externalRanking.played,
    won: externalRanking.won,
    lost: externalRanking.lost,
    dnf: externalRanking.dnf,
    win3_0: externalRanking.won3_0,
    win3_1: externalRanking.won3_1,
    win3_2: externalRanking.won3_2,
    lost0_3: externalRanking.lost0_3,
    lost1_3: externalRanking.lost1_3,
    lost2_3: externalRanking.lost2_3,
    lostSets: externalRanking.lost_sets,
    wonSets: externalRanking.won_sets,
  };
};
