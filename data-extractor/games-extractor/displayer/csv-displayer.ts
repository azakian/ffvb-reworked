// CsvPresenter.ts
import { Displayer } from './displayer';
import { ExternalData } from '../external/types';
// @ts-ignore
import * as fs from 'fs';

export class CsvPresenter implements Displayer {
  private readonly rankingFile: string;
  private readonly gamesFile: string;

  constructor(rankingFile = 'ranking.csv', gamesFile = 'games.csv') {
    this.rankingFile = rankingFile;
    this.gamesFile = gamesFile;
  }

  present(data: ExternalData): void {
    this.exportRanking(data);
    this.exportGames(data);
  }

  private exportRanking(data: ExternalData) {
    const headers = [
      'teamRanking',
      'teamName',
      'points',
      'playedMatch',
      'wonMatch',
      'lostMatch',
      'dnf',
      'win3_0',
      'win3_1',
      'win3_2',
      'loss0_3',
      'loss1_3',
      'loss2_3',
      'wonSets',
      'lostSets',
    ];

    const rows = data.ranking.map((r) =>
      headers.map((header) => r[header as keyof typeof r]).join(','),
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    fs.writeFileSync(this.rankingFile, csvContent, 'utf8');
    console.log(`Fichier CSV généré: ${this.rankingFile}`);
  }

  private exportGames(data: ExternalData) {
    const headers = [
      'week',
      'date',
      'time',
      'team1',
      'team2',
      'team1Score',
      'team2Score',
      'Set 1',
      'Set 2',
      'Set 3',
      'Set 4',
      'Set 5',
      'location',
    ];

    const rows: string[] = [];
    data.games.forEach((week) => {
      week.games.forEach((game) => {
        // Extraction des sets depuis le tableau setsScore (gérer les sets manquants avec '-')
        const set1 = game.setsScore[0] || '-';
        const set2 = game.setsScore[1] || '-';
        const set3 = game.setsScore[2] || '-';
        const set4 = game.setsScore[3] || '-';
        const set5 = game.setsScore[4] || '-';

        rows.push(
          `${week.week},${game.date},${game.time},${game.team1},${game.team2},${game.team1Score},${game.team2Score},${set1},${set2},${set3},${set4},${set5},${game.location}`,
        );
      });
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    fs.writeFileSync(this.gamesFile, csvContent, 'utf8');
    console.log(`Fichier CSV généré: ${this.gamesFile}`);
  }
}
