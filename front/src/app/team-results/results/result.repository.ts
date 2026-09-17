import { inject, Service } from '@angular/core';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { convertToResults, ExternalResults, Results } from './results';
import { SUPABASE_CLIENT } from '../../core/supabase';
import { convertToTeamPools, ExternalTeamPool, TeamPool } from './pool';

@Service()
export class ResultRepository {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public getTeamResult(teamId: string, years?: string, seasonPhase?: 1 | 2): Observable<Results> {
    return from(
      this.supabase
        .rpc('get_full_results', {
          p_short_name: teamId,
          p_year: years,
          p_season_phase: seasonPhase,
        })
        .overrideTypes<ExternalResults>(),
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          return throwError(() => error);
        }

        return of(data) as Observable<ExternalResults>;
      }),
      map((externalResult) => convertToResults(externalResult)),
    );
  }

  public getTeamPools(teamId: string): Observable<TeamPool[]> {
    return from(
      this.supabase
        .rpc('get_team_pools', { p_short_name: teamId })
        .overrideTypes<ExternalTeamPool[]>(),
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          return throwError(() => error);
        }

        return of(data) as Observable<ExternalTeamPool[]>;
      }),
      map((externalTeamPools) => convertToTeamPools(externalTeamPools)),
    );
  }
}
