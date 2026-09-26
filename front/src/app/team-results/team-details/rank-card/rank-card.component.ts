import { Component, input } from '@angular/core';
import { Ranking } from '../../shared/ranking';
import { CardShellComponent } from '../card-shell/card-shell.component';

@Component({
  selector: 'app-rank-card',
  standalone: true,
  imports: [CardShellComponent],
  templateUrl: './rank-card.component.html',
  styleUrl: './rank-card.component.scss',
  host: {
    style: 'display: block; height: 100%;',
  },
})
export class RankCardComponent {
  ranking = input.required<Ranking>();
}
