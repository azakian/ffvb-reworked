export interface ExternalRanking {
  id: number;
  pool_id: number;
  team_ranking: number;
  team_name: string;
  points: number;
  played: number;
  won: number;
  lost: number;
  dnf: number;
  won3_0: number;
  won3_1: number;
  won3_2: number;
  lost0_3: number;
  lost1_3: number;
  lost2_3: number;
  won_sets: number;
  lost_sets: number;
  modified_at: string;
}
