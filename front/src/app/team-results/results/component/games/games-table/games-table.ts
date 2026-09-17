import { Component, input } from '@angular/core';
import { Game } from '../../../../shared/game';

@Component({
  imports: [],
  selector: 'app-games-table',
  styleUrl: './games-table.scss',
  templateUrl: './games-table.html',
})
export class GamesTable {
  readonly games = input.required<
    (Game & {
      gameDetail: {
        isTeam1: boolean;
        isTeam2: boolean;
        isWon: boolean;
        isLost: boolean;
        highlight: boolean;
      };
    })[]
  >();
}
