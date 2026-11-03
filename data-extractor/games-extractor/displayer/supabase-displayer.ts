import { SupabaseClient } from '@supabase/supabase-js';
import { ExternalData } from '../external/types';
import { Displayer } from './displayer';

export class SupabasePresenter implements Displayer {
  constructor(private readonly supabase: SupabaseClient) {}

  async present(data: ExternalData): Promise<void> {
    await this.insertRankings(data);
    await this.insertGames(data);
  }

  private async insertRankings(data: ExternalData): Promise<void> {
    const rankingsToInsert = data.ranking.map((r) => ({
      team_name: r.teamName,
      team_ranking: parseInt(r.teamRanking, 10),
      points: parseInt(r.points || '0', 10),
      played: parseInt(r.playedMatch || '0', 10),
      won: parseInt(r.wonMatch || '0', 10),
      lost: parseInt(r.lostMatch || '0', 10),
      dnf: parseInt(r.dnf || '0', 10),
      won3_0: parseInt(r.win3_0 || '0', 10),
      won3_1: parseInt(r.win3_1 || '0', 10),
      won3_2: parseInt(r.win3_2 || '0', 10),
      lost0_3: parseInt(r.loss0_3 || '0', 10),
      lost1_3: parseInt(r.loss1_3 || '0', 10),
      lost2_3: parseInt(r.loss2_3 || '0', 10),
      won_sets: parseInt(r.wonSets || '0', 10),
      lost_sets: parseInt(r.lostSets || '0', 10),
    }));

    const payload = {
      p_team_short_name: data.team, // e.g. 'VBL1'
      p_years: data.year, // e.g. '2025-2026'
      p_season_phase: data.seasonPhase, // e.g. 1
      p_rankings_data: rankingsToInsert,
    };

    console.log('Ranking payload', payload);

    const { error } = await this.supabase.rpc('upsert_rankings', payload);
    if (error) throw new Error(`[Rankings] ${error.message}`);
  }

  private async insertGames(data: ExternalData): Promise<void> {
    const gamesToInsert = data.games.flatMap((weekData) =>
      weekData.games.map((g) => ({
        week: weekData.week,
        date: this.formatDate(g.date),
        time: g.time || null,
        team1: g.team1,
        team2: g.team2,
        team1_score: g.team1Score !== '' ? parseInt(g.team1Score, 10) : null,
        team2_score: g.team2Score !== '' ? parseInt(g.team2Score, 10) : null,
        set1: g.setsScore[0] || null,
        set2: g.setsScore[1] || null,
        set3: g.setsScore[2] || null,
        set4: g.setsScore[3] || null,
        set5: g.setsScore[4] || null,
        location: g.location || null,
      })),
    );

    const payload = {
      p_team_short_name: data.team,
      p_years: data.year,
      p_season_phase: data.seasonPhase,
      p_games_data: gamesToInsert,
    };

    console.log('Games payload', payload);

    const { error } = await this.supabase.rpc('upsert_games', payload);
    if (error) throw new Error(`[Games] ${error.message}`);
  }

  private formatDate(frenchDate: string): string | null {
    if (!frenchDate) return null;
    const parts = frenchDate.split('/');
    if (parts.length === 3) {
      const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
      return `${year}-${parts[1]}-${parts[0]}`;
    }
    return frenchDate;
  }
}
