import { Component, input } from '@angular/core';

export type CardVariant = 'surface' | 'surface-2' | 'warning';

@Component({
  selector: 'app-card-shell',
  standalone: true,
  template: `<ng-content />`,
  styleUrl: './card-shell.component.scss',
  host: {
    '[class.variant-surface-2]': 'variant() === "surface-2"',
    '[class.variant-warning]': 'variant() === "warning"',
  },
})
export class CardShellComponent {
  variant = input<CardVariant>('surface');
}
