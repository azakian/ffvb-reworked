import { inject, Service } from '@angular/core';
import { TeamId } from '../shared/teamId';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { SUPABASE_CLIENT } from '../../core/supabase';
import { convertToTeamDetails, ExternalTeamDetails, TeamDetails } from './team-details';

@Service()
export class TeamDetailsRepository {
  private readonly supabase = inject(SUPABASE_CLIENT);

  public getTeamDetails(teamId: TeamId): Observable<TeamDetails> {
    return from(
      this.supabase
        .rpc('get_team_details', { p_short_name: teamId })
        .overrideTypes<ExternalTeamDetails>(),
    ).pipe(
      switchMap(({ data, error }) => {
        if (error) {
          return throwError(() => error);
        }

        return of(data) as Observable<ExternalTeamDetails>;
      }),
      map((externalSummary) => convertToTeamDetails(externalSummary)),
    );
  }
}
