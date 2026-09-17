import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-team-filter',
  styleUrl: '../filters.scss',
  templateUrl: './team-filter.html',
})
export class TeamFilter {
  readonly filterTeam = model.required<string>();
  readonly allTeams = input.required<string[]>();
}
