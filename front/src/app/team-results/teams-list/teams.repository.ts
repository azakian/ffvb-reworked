import { inject, Service } from '@angular/core';
import { SUPABASE_CLIENT } from '../../core/supabase';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { convertToTeamDescriptions, ExternalTeamDescription, TeamDescription } from './team-list';

@Service()
export class TeamsRepository {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public getTeams(): Observable<TeamDescription[]> {
    return from(
      this.supabase
        .rpc('get_teams_list')
        .overrideTypes<ExternalTeamDescription[], { merge: false }>(),
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          return throwError(() => error);
        }

        return of(data) as Observable<ExternalTeamDescription[]>;
      }),
      map((data) => convertToTeamDescriptions(data)),
    );
  }
}
