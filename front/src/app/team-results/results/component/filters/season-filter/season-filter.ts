import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamPool } from '../../../pool';

@Component({
  imports: [FormsModule],
  selector: 'app-season-filter',
  styleUrl: '../filters.scss',
  templateUrl: './season-filter.html',
})
export class SeasonFilter {
  readonly filterSeason = model.required<TeamPool | null>();
  readonly allSeasons = input.required<TeamPool[]>();
}
