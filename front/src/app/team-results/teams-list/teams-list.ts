import { Component, computed, effect, inject, input, model } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { NextGameCardsComponent } from '../component/next-game-cards/next-game-cards.component';
import { GamesTable } from '../results/component/games/games-table/games-table';
import { checkTeamName } from '../results/team.utils';
import { Game } from '../shared/game';
import { TeamId } from '../shared/teamId';
import { TeamListSkeletonComponent } from './team-list-skeleton/team-list-skeleton.component';
import { TeamPresentationCardComponent } from './team-presentation-card/team-presentation-card.component';
import { TeamsRepository } from './teams.repository';

@Component({
  imports: [
    GamesTable,
    NextGameCardsComponent,
    TeamListSkeletonComponent,
    TeamPresentationCardComponent,
  ],
  selector: 'app-team-select',
  styleUrl: './teams-list.scss',
  templateUrl: './teams-list.html',
  providers: [TeamsRepository],
})
export class TeamsList {
  private readonly teamRepository = inject(TeamsRepository);
  readonly selectedTeam = model<TeamId | null>();
  readonly isPhoneDevice = input<boolean>(false);

  public readonly teamsResource = rxResource({
    stream: () => this.teamRepository.getTeams(),
  });

  constructor() {
    effect(() => {
      if (this.selectedTeam() !== undefined && this.selectedTeam() === null) {
        const defaultTeam = this.teamsResource.value()?.at(0) ?? null;
        this.selectedTeam.set(defaultTeam?.teamShortName ?? null);
      }
    });
  }

  public readonly teamsPresentation = computed(() => {
    const teamDescriptions = this.teamsResource.value();
    if (!teamDescriptions || !teamDescriptions.length) {
      return null;
    }

    const { poolYear, seasonPhase } = teamDescriptions[0].currentPool;

    return {
      poolYear,
      seasonPhase,
      teamDescriptions,
    };
  });

  public readonly lastGames = computed(() => {
    const teamDescriptions = this.teamsResource.value();
    if (!teamDescriptions || !teamDescriptions.length) {
      return [];
    }

    return teamDescriptions
      .map((teamDescription) => teamDescription.lastGame)
      .filter((game) => !!game)
      .map((game) => this.convertToGameWithDetail(this.teamNames(), game))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  public readonly nextGames = computed(() => {
    const teamDescriptions = this.teamsResource.value();
    if (!teamDescriptions || !teamDescriptions.length) {
      return [];
    }

    return teamDescriptions
      .map((teamDescription) => teamDescription.nextGame)
      .filter((game) => !!game)
      .map((game) => this.convertToGameWithDetail(this.teamNames(), game))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  private readonly teamNames = computed(() => {
    const teamDescriptions = this.teamsResource.value();
    if (!teamDescriptions || !teamDescriptions.length) {
      return [];
    }

    return teamDescriptions.map((teamDescription) => teamDescription.teamName);
  });

  private convertToGameWithDetail(teamsName: string[], game: Game) {
    const isPlayed = game.isPlayed;
    const isTeam1 = teamsName.some((teamName) => checkTeamName(teamName, game.team1Name));
    const isTeam2 = teamsName.some((teamName) => checkTeamName(teamName, game.team2Name));
    const isTeamGame = isTeam1 || isTeam2;

    const isWon =
      isTeamGame &&
      ((isPlayed && isTeam1 && (game.scores?.team1Score ?? 0) > (game.scores?.team2Score ?? 0)) ||
        (isTeam2 && (game.scores?.team2Score ?? 0) > (game.scores?.team1Score ?? 0)));
    const isLost = isPlayed && isTeamGame && !isWon;
    const highlight = false;

    return { ...game, gameDetail: { isTeam1, isTeam2, isWon, isLost, highlight } };
  }
}
