import { Component, input, output } from '@angular/core';
import { TeamId } from '../../shared/teamId';
import { TeamDescription } from '../team-list';

@Component({
  imports: [],
  selector: 'app-team-presentation-card',
  styleUrl: './team-presentation-card.component.scss',
  templateUrl: './team-presentation-card.component.html',
})
export class TeamPresentationCardComponent {
  readonly team = input.required<TeamDescription>();
  readonly highlight = input<boolean>(false);

  readonly selectTeam = output<TeamId>();
}
