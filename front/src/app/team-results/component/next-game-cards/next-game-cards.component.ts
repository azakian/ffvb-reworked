import { Component, input } from '@angular/core';
import { Game } from '../../shared/game';
import { NextGameCardComponent } from '../next-game-card/next-game-card.component';

@Component({
  imports: [NextGameCardComponent],
  selector: 'app-next-game-cards',
  styleUrl: './next-game-cards.component.scss',
  templateUrl: './next-game-cards.component.html',
})
export class NextGameCardsComponent {
  readonly nextGames = input.required<Game[]>();
}
