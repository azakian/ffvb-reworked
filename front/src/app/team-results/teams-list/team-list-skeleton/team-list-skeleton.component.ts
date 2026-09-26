import { Component } from '@angular/core';
import { SkeletonComponent } from '../../component/skeleton';

@Component({
  imports: [SkeletonComponent],
  selector: 'app-team-list-skeleton',
  styleUrl: './team-list-skeleton.component.scss',
  templateUrl: './team-list-skeleton.component.html',
})
export class TeamListSkeletonComponent {}
