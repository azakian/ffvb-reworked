import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton-pulse"
      [style.width]="width()"
      [style.height.px]="height()"
      [style.border-radius.px]="radius()"
    ></div>
  `,
  styles: [
    `
      .skeleton-pulse {
        background: var(--surface-3);
        animation: pulse 1.6s ease-in-out infinite;
      }
    `,
  ],
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<number>(16);
  radius = input<number>(8);
}
