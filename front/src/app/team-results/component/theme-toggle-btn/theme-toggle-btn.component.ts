import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-theme-toggle-btn',
  template: `
    <button
      class="theme-toggle-btn"
      (click)="themeService.toggleTheme()"
      aria-label="Changer de thème"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon"
      >
        <!-- Rayons du soleil -->
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />

        <!-- Cercle extérieur du soleil -->
        <circle cx="12" cy="12" r="7" />

        <!-- Croissant de lune intérieur (rempli) -->
        <path
          d="M 12 6.5 A 5.5 5.5 0 0 0 12 17.5 A 4 4 0 0 1 12 6.5 Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </button>
  `,
  styles: [
    `
      .theme-toggle-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 0;
        border: 1px solid var(--color-border, #ccc);
        border-radius: 8px;
        background-color: var(--color-card-bg, transparent);
        color: var(--color-text, currentColor);
        cursor: pointer;
        transition:
          background-color 0.2s ease,
          opacity 0.2s ease;

        &:hover {
          opacity: 0.8;
        }
      }

      .icon {
        width: 20px;
        height: 20px;
      }
    `,
  ],
})
export class ThemeToggleBtnComponent {
  protected themeService = inject(ThemeService);
}
