// --- Helper pour décoder les entités HTML ---
import { GameByWeek, Ranking } from './types';

function unescapeHtml(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&ccedil;/g, 'ç');
}

// --- Classe principale DataExtractor ---

export class DataExtractor {
  private readonly htmlRankingTable: string;
  private readonly htmlMatchTable: string;

  public rankings: Ranking[];
  public gameByWeeks: GameByWeek[];

  constructor(htmlStr: string) {
    console.log('Extracting data from html...');
    this.htmlRankingTable = this.extractTableByIndex(htmlStr, 2);
    this.htmlMatchTable = this.extractTableByIndex(htmlStr, 3);

    this.rankings = this.extractRanking();
    this.gameByWeeks = this.extractGamesByWeek();
  }

  private extractRanking(): Ranking[] {
    const ranking: Ranking[] = [];
    const rows = this.extractRows(this.htmlRankingTable);

    // Discriminant Option 2 : Si la première ligne comporte moins de 15 colonnes, la saison n'a pas démarré
    const isUnstartedSeason = rows.length === 0 || this.extractCells(rows[0]).length < 15;

    if (isUnstartedSeason) {
      return this.extractRankingForUnstartedSeason(rows, ranking);
    }

    return this.extractRankingForStartedSeason(rows, ranking);
  }

  private extractRankingForStartedSeason(rows: string[], ranking: Ranking[]) {
    // Traitement pour une saison terminée/en cours avec tableau statistique complet
    rows.shift(); // Suppression de l'en-tête

    for (const row of rows) {
      const columns = this.extractCells(row);
      if (columns.length < 15) {
        continue;
      }

      const rankingData: Ranking = {
        teamRanking: columns[0],
        teamName: columns[1],
        points: columns[2],
        playedMatch: columns[3],
        wonMatch: columns[4],
        lostMatch: columns[5],
        dnf: columns[6],
        win3_0: columns[7],
        win3_1: columns[8],
        win3_2: columns[9],
        loss0_3: columns[10],
        loss1_3: columns[11],
        loss2_3: columns[12],
        wonSets: columns[13],
        lostSets: columns[14],
      };
      ranking.push(rankingData);
    }

    return ranking;
  }

  private extractRankingForUnstartedSeason(rows: string[], ranking: Ranking[]) {
    const teamNames: string[] = [];

    for (const row of rows) {
      const cells = this.extractCells(row);
      for (const cell of cells) {
        if (cell && !/^\d+$/.test(cell) && !cell.includes('Poule')) {
          teamNames.push(cell);
        }
      }
    }

    teamNames.forEach((teamName, idx) => {
      const rankingData: Ranking = {
        teamRanking: String(idx + 1),
        teamName,
        points: '0',
        playedMatch: '0',
        wonMatch: '0',
        lostMatch: ' 0',
        dnf: '0',
        win3_0: '0',
        win3_1: '0',
        win3_2: '0',
        loss0_3: '0',
        loss1_3: '0',
        loss2_3: '0',
        wonSets: '0',
        lostSets: '0',
      };
      ranking.push(rankingData);
    });

    return ranking;
  }

  private extractGamesByWeek(): GameByWeek[] {
    const gamesByWeek: GameByWeek[] = [];
    const rows = this.extractRows(this.htmlMatchTable);
    let currentWeek: GameByWeek | null = null;

    for (const row of rows) {
      const columns = this.extractCells(row);

      if (columns.length === 1) {
        const weekName = columns[0];
        if (!weekName) {
          continue;
        }
        currentWeek = { week: weekName, games: [] };
        gamesByWeek.push(currentWeek);
      } else if (currentWeek !== null && columns.length >= 6) {
        const date = columns[1];
        const time = columns[2];
        const team1 = columns[3];
        const team2 = columns[5];

        const score1Raw = columns.length > 6 ? columns[6].trim() : '';
        const score2Raw = columns.length > 7 ? columns[7].trim() : '';

        let team1Score: string;
        let team2Score: string;
        let setsScore: string[];
        let isPlayed: boolean;
        let location: string;

        // Détection de match joué (scores numériques) vs match non joué
        if (/^\d+$/.test(score1Raw) && /^\d+$/.test(score2Raw)) {
          team1Score = score1Raw;
          team2Score = score2Raw;
          const setsStr = columns.length > 8 ? columns[8] : '';
          setsScore = setsStr
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          isPlayed = true;
          location = '';
        } else {
          team1Score = '0';
          team2Score = '0';
          setsScore = [];
          isPlayed = false;
          location = columns.length > 7 ? columns[7] : '';
        }

        currentWeek.games.push({
          date,
          time,
          team1,
          team2,
          team1Score,
          team2Score,
          setsScore,
          isPlayed,
          location,
        });
      }
    }

    return gamesByWeek;
  }

  private extractTableByIndex(htmlStr: string, index: number): string {
    const tableStarts: number[] = [];
    const tableRegex = /<table\b/gi;
    let match: RegExpExecArray | null;

    while ((match = tableRegex.exec(htmlStr)) !== null) {
      tableStarts.push(match.index);
    }

    if (index >= tableStarts.length) {
      return '';
    }

    const start = tableStarts[index];
    let depth = 0;
    let end = start;

    const tagRegex = /<\/?table\b/gi;
    tagRegex.lastIndex = start;

    while ((match = tagRegex.exec(htmlStr)) !== null) {
      if (!match[0].startsWith('</')) {
        depth++;
      } else {
        depth--;
      }
      if (depth === 0) {
        end = match.index + match[0].length;
        break;
      }
    }

    return htmlStr.substring(start, end);
  }

  private extractRows(tableHtml: string): string[] {
    const matches = tableHtml.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi);
    return matches ? matches : [];
  }

  private cellText(cellHtml: string): string {
    const stripped = cellHtml.replace(/<[^>]+>/g, '');
    return unescapeHtml(stripped).trim();
  }

  private extractCells(rowHtml: string): string[] {
    const matches = Array.from(rowHtml.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi));
    return matches.map((m) => this.cellText(m[1]));
  }
}
