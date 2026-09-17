import { Component, computed, inject, input } from '@angular/core';
import { TeamId } from '../shared/teamId';
import { TeamDetailsRepository } from './team-details.repository';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkeletonComponent } from '../component/skeleton';
import { Game } from '../shared/game';
import { RouterLink } from '@angular/router';

@Component({
  imports: [SkeletonComponent, RouterLink],
  selector: 'app-team',
  styleUrl: './team-details.component.scss',
  templateUrl: './team-details.component.html',
  providers: [TeamDetailsRepository],
})
export default class TeamDetailsComponent {
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
    const _isTeam1 =
      teamName.localeCompare(game.team1Name, undefined, { sensitivity: 'base' }) === 0;
    const teamScore = _isTeam1 ? game.scores!.team1Score : game.scores!.team2Score;
    const opponent = _isTeam1 ? game.team2Name : game.team1Name;
    const opponentScore = _isTeam1 ? game.scores!.team2Score : game.scores!.team1Score;
    const isWin = teamScore > opponentScore;

    const _validSets = [
      game.setsScore!.set1,
      game.setsScore!.set2,
      game.setsScore!.set3,
      game.setsScore!.set4,
      game.setsScore!.set5,
    ].filter((set): set is string => Boolean(set));

    const teamSetScores = _validSets.map((set) => {
      const [score1, score2] = set.split('-').map(Number);
      return _isTeam1 ? score1 : score2;
    });

    const opponentSetScores = _validSets.map((set) => {
      const [score1, score2] = set.split('-').map(Number);
      return _isTeam1 ? score2 : score1;
    });

    return {
      opponent,
      teamScore,
      opponentScore,
      isWin,
      teamSetScores,
      opponentSetScores,
      date: game.date,
    };
  }
}
