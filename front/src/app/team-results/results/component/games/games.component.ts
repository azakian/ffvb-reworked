import { Component, computed, input, linkedSignal } from '@angular/core';
import { Game, WeekGames } from '../../../shared/game';
import { WeekNavigation } from './week-navigation/week-navigation';
import { GamesTable } from './games-table/games-table';
import { checkTeamName } from '../../team.utils';

@Component({
  imports: [WeekNavigation, GamesTable],
  selector: 'app-games',
  styleUrl: './games.component.scss',
  templateUrl: './games.component.html',
})
export class GamesComponent {
  readonly vblTeamName = input.required<string>();
  readonly filterTeam = input.required<string>();
  readonly gamesByWeek = input.required<WeekGames[]>();
  readonly previousGame = input.required<Game | null>();

  readonly currentWeekIndex = linkedSignal<number>(() => {
    const previousGame = this.previousGame();
    if (!previousGame) {
      return 0;
    }

    const index = this.gamesByWeek().findIndex((week) =>
      week.games.some(
        (game) =>
          // Check object reference first, fallback to unique property matching
          game === previousGame ||
          (game.team1Name === previousGame.team1Name && game.team2Name === previousGame.team2Name),
      ),
    );

    return index !== -1 ? index : 0;
  });

  readonly viewMode = computed(() =>
    this.filterTeam() === 'Toutes' ? 'all-teams' : 'single-team',
  );

  readonly gamesByWeekWithDetails = computed(() => {
    return this.gamesByWeek().map((gameByWeek) => {
      const games = gameByWeek.games.map((game) =>
        this.convertToGameWithDetail(this.vblTeamName(), game, this.viewMode()),
      );
      return { week: gameByWeek.week, games };
    });
  });

  readonly filteredTeamGames = computed(() => {
    return this.gamesByWeek()
      .flatMap((weekGames) => weekGames.games)
      .filter((game) => this.isTeamGame(this.filterTeam(), game.team1Name, game.team2Name))
      .map((game) => this.convertToGameWithDetail(this.filterTeam(), game, this.viewMode()));
  });

  private convertToGameWithDetail(
    teamName: string,
    game: Game,
    viewMode: 'all-teams' | 'single-team',
  ) {
    const isPlayed = game.isPlayed;
    const isTeam1 = checkTeamName(teamName, game.team1Name);
    const isTeam2 = checkTeamName(teamName, game.team2Name);
    const isTeamGame = isTeam1 || isTeam2;

    const isWon =
      isTeamGame &&
      ((isPlayed && isTeam1 && (game.scores?.team1Score ?? 0) > (game.scores?.team2Score ?? 0)) ||
        (isTeam2 && (game.scores?.team2Score ?? 0) > (game.scores?.team1Score ?? 0)));
    const isLost = isPlayed && isTeamGame && !isWon;
    const highlight = !isPlayed && isTeamGame && viewMode === 'all-teams';

    return { ...game, gameDetail: { isTeam1, isTeam2, isWon, isLost, highlight } };
  }

  private isTeamGame(teamName: string, team1Name: string, team2Name: string): boolean {
    return checkTeamName(teamName, team1Name) || checkTeamName(teamName, team2Name);
  }
}
