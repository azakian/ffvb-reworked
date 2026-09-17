import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeamsRepository } from './teams.repository';
import { rxResource } from '@angular/core/rxjs-interop';
import { SkeletonComponent } from '../component/skeleton';

@Component({
  imports: [RouterLink, SkeletonComponent],
  selector: 'app-team-select',
  styleUrl: './teams-list.scss',
  templateUrl: './teams-list.html',
  providers: [TeamsRepository],
})
export class TeamsList {
  private readonly teamRepository = inject(TeamsRepository);

  public readonly teamsResource = rxResource({
    stream: () => this.teamRepository.getTeams(),
  });

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
