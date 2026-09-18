import { Routes } from '@angular/router';
import { phoneDeviceGuard } from './team-results/phone-device-guard';
import { phoneDeviceResolver } from './team-results/phone-device-resolver';

export const routes: Routes = [
  {
    path: 'teams',
    canMatch: [phoneDeviceGuard],
    loadComponent: () =>
      import('./team-results/teams-list/teams-list-phone/teams-list-phone-shell.component').then(
        (m) => m.TeamsListPhoneShell,
      ),
  },
  {
    path: 'teams',
    resolve: { isPhoneDevice: phoneDeviceResolver },
    loadComponent: () => import('./team-results/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'teams/:teamId',
    pathMatch: 'full',
    canMatch: [phoneDeviceGuard],
    loadComponent: () =>
      import('./team-results/team-details/team-details.component').then(
        (m) => m.TeamDetailsComponent,
      ),
  },
  {
    path: 'teams/:teamId/results',
    pathMatch: 'full',
    canMatch: [phoneDeviceGuard],
    resolve: { isPhoneDevice: phoneDeviceResolver },
    loadComponent: () =>
      import('./team-results/results/results.component').then((m) => m.ResultsComponent),
  },
  { path: '**', redirectTo: 'teams' },
];
