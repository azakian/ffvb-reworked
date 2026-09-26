import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NextGameCardComponent } from '../component/next-game-card/next-game-card.component';
import { TopNavComponent } from '../component/top-nav/top-nav.component';
import { Game } from '../shared/game';
import { TeamId } from '../shared/teamId';
import { GameResultCardComponent } from './game-result-card/game-result-card.component';
import { RankCardComponent } from './rank-card/rank-card.component';
import { TeamDetailsSkeletonComponent } from './team-details-skeleton/team-details-skeleton.component';
import { TeamDetailsRepository } from './team-details.repository';

@Component({
  imports: [
    RouterLink,
    NextGameCardComponent,
    TopNavComponent,
    TeamDetailsSkeletonComponent,
    RankCardComponent,
    GameResultCardComponent,
  ],
  selector: 'app-team',
  styleUrl: './team-details.component.scss',
  templateUrl: './team-details.component.html',
  providers: [TeamDetailsRepository],
})
export class TeamDetailsComponent {
  readonly teamId = input.required<TeamId>();
  readonly #teamDetailsRepository = inject(TeamDetailsRepository);

  readonly teamSummaryResource = rxResource({
    params: () => ({ teamId: this.teamId() }),
    stream: ({ params }) => this.#teamDetailsRepository.getTeamDetails(params.teamId),
  });

  readonly lastGames = computed(() => {
    const details = this.teamSummaryResource.value();
    if (!details) {
      return [];
    }

    const name = details.teamName;
    return details.lastGames.map((game) => this.getResults(name, game));
  });

  private getResults(teamName: string, game: Game) {
    const isHome = teamName.localeCompare(game.team1Name, undefined, { sensitivity: 'base' }) === 0;
    const opponent = isHome ? game.team2Name : game.team1Name;
    if (game.isPostponed) {
      return {
        teamName,
        isHome,
        opponent,
        teamScore: 0,
        opponentScore: 0,
        isWin: false,
        validSets: [],
        date: game.date,
        isPostponed: game.isPostponed,
      };
    }

    const teamScore = isHome ? game.scores!.team1Score : game.scores!.team2Score;
    const opponentScore = isHome ? game.scores!.team2Score : game.scores!.team1Score;
    const isWin = teamScore > opponentScore;

    const validSets = [
      game.setsScore!.set1,
      game.setsScore!.set2,
      game.setsScore!.set3,
      game.setsScore!.set4,
      game.setsScore!.set5,
    ].filter((set): set is string => Boolean(set));
    return {
      teamName,
      isHome,
      opponent,
      teamScore,
      opponentScore,
      isWin,
      validSets,
      date: game.date,
      isPostponed: game.isPostponed,
    };
  }
}
