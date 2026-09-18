import { Component, computed, effect, inject, model } from '@angular/core';
import { TeamsRepository } from './teams.repository';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkeletonComponent } from '../component/skeleton';
import { TeamId } from '../shared/teamId';

@Component({
  imports: [SkeletonComponent],
  selector: 'app-team-select',
  styleUrl: './teams-list.scss',
  templateUrl: './teams-list.html',
  providers: [TeamsRepository],
})
export class TeamsList {
  private readonly teamRepository = inject(TeamsRepository);
  readonly selectedTeam = model<TeamId | null>();

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
}
