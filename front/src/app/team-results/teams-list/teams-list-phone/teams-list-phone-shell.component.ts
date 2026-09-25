import { Component, inject } from '@angular/core';
import { TeamsList } from '../teams-list';
import { Router } from '@angular/router';
import { TeamId } from '../../shared/teamId';

@Component({
  imports: [TeamsList],
  selector: 'app-teams-list-shell',
  template: `<app-team-select
    [isPhoneDevice]="true"
    (selectedTeamChange)="navigateToTeam($event)"
  /> `,
})
export class TeamsListPhoneShell {
  readonly router = inject(Router);
  navigateToTeam(teamId: TeamId | null | undefined) {
    if (!teamId) return;
    this.router.navigate(['teams', teamId]).then((r) => void 0);
  }
}
