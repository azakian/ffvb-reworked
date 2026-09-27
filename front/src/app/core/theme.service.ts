import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, PLATFORM_ID, Service } from '@angular/core';

export type Theme = 'light' | 'dark';

@Service()
export class ThemeService {
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  getCurrentTheme(): Theme {
    if (!this.isBrowser) return 'light';

    const current = this.document.documentElement.style.colorScheme;
    if (current && current !== 'light dark') {
      return current as Theme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  toggleTheme(): void {
    if (!this.isBrowser) return;

    const current = this.getCurrentTheme();
    const newTheme: Theme = current === 'dark' ? 'light' : 'dark';

    this.document.documentElement.style.colorScheme = newTheme;
    localStorage.setItem('theme', newTheme);
  }

  resetTheme(): void {
    if (!this.isBrowser) return;

    this.document.documentElement.style.colorScheme = 'light dark';
    localStorage.removeItem('theme');
  }
}
