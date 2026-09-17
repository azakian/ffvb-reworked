import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'teams', loadComponent: () => import('./team-results/teams-list/teams-list') },
  {
    path: 'teams/:teamId',
    loadComponent: () => import('./team-results/team-details/team-details.component'),
  },
  {
    path: 'teams/:teamId/results',
    loadComponent: () => import('./team-results/results/results.component'),
  },
  { path: '**', redirectTo: 'teams' },
];
