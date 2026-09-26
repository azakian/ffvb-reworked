import { Component, input } from '@angular/core';
import { CardShellComponent } from '../card-shell/card-shell.component';

@Component({
  imports: [CardShellComponent],
  selector: 'app-game-result-card',
  styleUrl: './game-result-card.component.scss',
  templateUrl: './game-result-card.component.html',
})
export class GameResultCardComponent {
  readonly gameResult = input.required<{
    teamName: string;
    isHome: boolean;
    opponent: string;
    teamScore: number;
    opponentScore: number;
    isWin: boolean;
    validSets: string[];
    date: string;
    isPostponed: boolean;
  }>();
}
