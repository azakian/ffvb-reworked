import { inject, PLATFORM_ID, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class BreakpointObserver {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  observeForPhone(): Observable<boolean> {
    return this.observe(BREAKPOINTS.WebLandscape).pipe(map((match) => !match));
  }
  /**
   * Écoute une media query CSS et émet `true` ou `false` à chaque changement.
   * @param query Ex: '(min-width: 1024px)'
   */
  private observe(query: string): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      // Sécurité pour le SSR (Server-Side Rendering)
      if (!this.isBrowser) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      const mediaQueryList = window.matchMedia(query);

      // Émission de la valeur initiale
      subscriber.next(mediaQueryList.matches);

      // Callback lors du redimensionnement de l'écran
      const listener = (event: MediaQueryListEvent) => {
        subscriber.next(event.matches);
      };

      // Attachement de l'écouteur d'événement
      mediaQueryList.addEventListener('change', listener);

      // Nettoyage de la mémoire lors du unsubscribe / détruction du composant
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    });
  }
}

export const BREAKPOINTS = {
  /** Pour les très petits écrans (smartphones en mode portrait) */
  XSmall: '(max-width: 599.98px)',

  /** Pour les petits écrans (smartphones en mode paysage et petites tablettes) */
  Small: '(min-width: 600px) and (max-width: 959.98px)',

  /** Pour les écrans moyens (tablettes et petits ordinateurs portables) */
  Medium: '(min-width: 960px) and (max-width: 1279.98px)',

  /** Pour les grands écrans (ordinateurs de bureau standards) */
  Large: '(min-width: 1280px) and (max-width: 1919.98px)',

  /** Pour les très grands écrans (moniteurs haute résolution) */
  XLarge: '(min-width: 1920px)',

  /** Pour les appareils mobiles, quelle que soit l'orientation */
  Handset:
    '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
  PHONE:
    '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
  /** Pour les tablettes, en tenant compte de l'orientation */
  Tablet:
    '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',

  /** Pour les écrans d'ordinateur, quelle que soit l'orientation */
  Web: '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',

  /** Pour les appareils mobiles en mode portrait uniquement */
  HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',

  /** Pour les tablettes en mode portrait uniquement */
  TabletPortrait: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',

  /** Pour les écrans d'ordinateur en mode portrait */
  WebPortrait: '(min-width: 840px) and (orientation: portrait)',

  /** Pour les appareils mobiles en mode paysage uniquement */
  HandsetLandscape: '(max-width: 959.98px) and (orientation: landscape)',

  /** Pour les tablettes en mode paysage uniquement */
  TabletLandscape: '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',

  /** Pour les écrans d'ordinateur en mode paysage */
  WebLandscape: '(min-width: 1280px) and (orientation: landscape)',
  DESKTOP: '(min-width: 1280px) and (orientation: landscape)',
} as const;

// Types utilitaires
export type BreakpointKey = keyof typeof BREAKPOINTS;
export type BreakpointQuery = (typeof BREAKPOINTS)[BreakpointKey];
