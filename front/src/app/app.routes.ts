import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'teams',
    pathMatch: 'full',
    loadComponent: () => import('./team-results/teams-list/teams-list').then((m) => m.TeamsList),
  },
  {
    path: 'teams/:teamId',
    pathMatch: 'full',
    loadComponent: () =>
      import('./team-results/team-details/team-details.component').then(
        (m) => m.TeamDetailsComponent,
      ),
  },
  {
    path: 'teams/:teamId/results',
    pathMatch: 'full',
    loadComponent: () =>
      import('./team-results/results/results.component').then((m) => m.ResultsComponent),
  },
  { path: '**', redirectTo: 'teams' },
];
