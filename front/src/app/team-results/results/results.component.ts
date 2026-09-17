import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TeamId } from '../shared/teamId';
import { ResultRepository } from './result.repository';
import { RouterLink } from '@angular/router';
import { SkeletonComponent } from '../component/skeleton';
import { FormsModule } from '@angular/forms';
import { SeasonFilter } from './component/filters/season-filter/season-filter';
import { TeamFilter } from './component/filters/team-filter/team-filter';
import { RankingComponent } from './component/ranking/ranking.component';
import { GamesComponent } from './component/games/games.component';
import { TeamPool } from './pool';

@Component({
  imports: [
    RouterLink,
    SkeletonComponent,
    FormsModule,
    SeasonFilter,
    TeamFilter,
    RankingComponent,
    GamesComponent,
  ],
  selector: 'app-results',
  styleUrl: './results.component.scss',
  templateUrl: './results.component.html',
  providers: [ResultRepository],
})
export class ResultsComponent {
  readonly teamId = input.required<TeamId>();
  readonly #resultRepository = inject(ResultRepository);

  readonly teamPoolsResource = rxResource({
    params: () => ({
      teamId: this.teamId(),
    }),
    stream: ({ params }) => this.#resultRepository.getTeamPools(params.teamId),
  });

  readonly filterSeason = linkedSignal<TeamPool | null>(() => {
    return (this.teamPoolsResource.value() ?? []).find((pool) => pool.isLatest) ?? null;
  });
  readonly filterTeam = signal<string>('Toutes');

  readonly teamToHighlight = computed(() => {
    const currentTeam = this.filterTeam();
    return currentTeam === 'Toutes'
      ? (this.teamResultResource.value()?.teamLabel ?? '')
      : currentTeam;
  });

  readonly teamResultResource = rxResource({
    params: () => {
      const teamId = this.teamId();
      const season = this.filterSeason();
      // If any required value is missing/nullish, return undefined to pause execution
      if (!teamId || !season?.year || season?.seasonPhase == null) {
        return undefined;
      }

      return {
        teamId,
        year: season.year,
        seasonPhase: season.seasonPhase,
      };
    },
    stream: ({ params }) =>
      this.#resultRepository.getTeamResult(params.teamId, params.year, params.seasonPhase),
  });

  constructor() {
    effect(() => {
      this.filterSeason();
      this.filterTeam.set('Toutes');
    });
  }

  readonly allTeams = computed(() => [
    'Toutes',
    ...Array.from(
      new Set((this.teamResultResource.value()?.rankings ?? []).map((s) => s.teamLabel)),
    ),
  ]);

  readonly allSeasons = computed(() => this.teamPoolsResource.value() ?? []);
}
