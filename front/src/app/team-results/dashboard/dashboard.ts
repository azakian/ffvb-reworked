import { Component, inject, signal } from '@angular/core';
import { TeamsList } from '../teams-list/teams-list';
import { ResultsComponent } from '../results/results.component';
import { TeamsListPhoneShell } from '../teams-list/teams-list-phone/teams-list-phone-shell.component';
import { TeamId } from '../shared/teamId';
import { BreakpointObserver } from '../../core/breakpoint-observer';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [TeamsList, ResultsComponent, TeamsListPhoneShell],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  // inject to subscribe to event changes
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly isPhoneDevice = toSignal(this.breakpointObserver.observeForPhone(), {
    initialValue: false,
  });
  readonly selectedTeamId = signal<TeamId | null>(null);
}
