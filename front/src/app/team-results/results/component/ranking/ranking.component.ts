import { Component, input, signal } from '@angular/core';
import { Ranking } from '../../../shared/ranking';
import { TeamPool } from '../../pool';
import { checkTeamName } from '../../team.utils';

@Component({
  imports: [],
  selector: 'app-ranking',
  styleUrl: './ranking.component.scss',
  templateUrl: './ranking.component.html',
})
export class RankingComponent {
  readonly teamToHighlight = input.required<string>();
  readonly pool = input.required<TeamPool | null>();
  readonly rankings = input.required<Ranking[]>();
  readonly expandedRow = signal<number | null>(null);

  public toggleRow(rank: number): void {
    this.expandedRow.update((curr) => (curr === rank ? null : rank));
  }
  public getRatio(setsW: number, setsL: number): string {
    return setsL === 0 ? '0' : (setsW / setsL).toFixed(2);
  }

  protected readonly checkTeamName = checkTeamName;
}
