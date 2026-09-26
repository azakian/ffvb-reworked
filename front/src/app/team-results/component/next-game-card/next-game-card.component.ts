import { Component, input } from '@angular/core';
import { Game } from '../../shared/game';

@Component({
  imports: [],
  selector: 'app-next-game-card',
  styleUrl: './next-game-card.component.scss',
  templateUrl: './next-game-card.component.html',
})
export class NextGameCardComponent {
  readonly nextGame = input.required<Game>();
  readonly compact = input<boolean>(false); // Active le mode réduis / aligné
}
