// TerminalPresenter.ts

import { Displayer } from './displayer';
import { ExternalData, GameByWeek, Ranking } from '../external/types';

export class TerminalPresenter implements Displayer {
  public present(data: ExternalData): void {
    console.log(`\n=== POULE ${data.team.toUpperCase()} (${data.year}) ===\n`);

    this.printRanking(data.ranking);
    console.log('\n');
    this.printGames(data.games);
  }

  private printRanking(rankings: Ranking[]): void {
    console.log('--- CLASSEMENT ---');
    console.log(
      '#   Team                           Pts   P   W   L  DNF  3-0  3-1  3-2  0-3  1-3  2-3   WS   LS',
    );
    console.log('-'.repeat(97));

    rankings.forEach((r) => {
      const rank = `${r.teamRanking}`.padEnd(4, ' ');
      const team = r.teamName.padEnd(30, ' ');
      const pts = (r.points || '0').padStart(3, ' ');
      const p = (r.playedMatch || '0').padStart(3, ' ');
      const w = (r.wonMatch || '0').padStart(3, ' ');
      const l = (r.lostMatch || '0').padStart(3, ' ');
      const dnf = (r.dnf || '').padStart(4, ' ');
      const w30 = (r.win3_0 || '').padStart(4, ' ');
      const w31 = (r.win3_1 || '').padStart(4, ' ');
      const w32 = (r.win3_2 || '').padStart(4, ' ');
      const l03 = (r.loss0_3 || '').padStart(4, ' ');
      const l13 = (r.loss1_3 || '').padStart(4, ' ');
      const l23 = (r.loss2_3 || '').padStart(4, ' ');
      const ws = (r.wonSets || '0').padStart(4, ' ');
      const ls = (r.lostSets || '0').padStart(4, ' ');

      console.log(
        `${rank}${team} ${pts} ${p} ${w} ${l} ${dnf} ${w30} ${w31} ${w32} ${l03} ${l13} ${l23} ${ws} ${ls}`,
      );
    });
  }

  private printGames(gamesByWeek: GameByWeek[]): void {
    console.log('--- RENCONTRES ---');

    const header =
      'Journée    | Date     | Heure | Équipe 1             | Équipe 2             | Score 1 | Score 2 | Set 1 | Set 2 | Set 3 | Set 4 | Set 5 | Lieu';
    const separator =
      '-----------+----------+-------+----------------------+----------------------+---------+---------+-------+-------+-------+-------+-------+-----';

    console.log(header);
    console.log(separator);

    gamesByWeek.forEach((weekGroup) => {
      const weekName = weekGroup.week.padEnd(10, ' ');

      weekGroup.games.forEach((g) => {
        const date = (g.date || '').padEnd(8, ' ');
        const time = (g.time || '').padEnd(5, ' ');
        const team1 = g.team1.padEnd(20, ' ');
        const team2 = g.team2.padEnd(20, ' ');
        const score1 = (g.isPlayed ? g.team1Score : '-').padEnd(7, ' ');
        const score2 = (g.isPlayed ? g.team2Score : '-').padEnd(7, ' ');

        // Extraction et alignement des 5 sets
        const set1 = (g.setsScore[0] || '-').padEnd(5, ' ');
        const set2 = (g.setsScore[1] || '-').padEnd(5, ' ');
        const set3 = (g.setsScore[2] || '-').padEnd(5, ' ');
        const set4 = (g.setsScore[3] || '-').padEnd(5, ' ');
        const set5 = (g.setsScore[4] || '-').padEnd(5, ' ');
        const location = g.location || '';

        console.log(
          `${weekName} | ${date} | ${time} | ${team1} | ${team2} | ${score1} | ${score2} | ${set1} | ${set2} | ${set3} | ${set4} | ${set5} | ${location}`,
        );
      });
    });
  }
}
