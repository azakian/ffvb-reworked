import {
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  viewChildren,
} from '@angular/core';
import { WeekGames } from '../../../../shared/game';
import { Subject, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-week-navigation',
  styleUrl: './week-navigation.scss',
  templateUrl: './week-navigation.html',
})
export class WeekNavigation {
  readonly currentWeekIndex = model.required<number>();
  readonly allWeeks = input.required<WeekGames[]>();

  private readonly jButtons = viewChildren<ElementRef<HTMLButtonElement>>('jBtn');

  private readonly destroyRef = inject(DestroyRef);
  private readonly navClick$ = new Subject<'previous' | 'next'>();
  constructor() {
    effect(() => {
      const targetIndex = this.currentWeekIndex();
      const buttons = this.jButtons();

      if (buttons[targetIndex]) {
        buttons[targetIndex].nativeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    });

    this.navClick$
      .pipe(throttleTime(250), takeUntilDestroyed(this.destroyRef))
      .subscribe((delta) => {
        this.currentWeekIndex.update((j) =>
          delta === 'next' ? Math.min(this.allWeeks().length - 1, j + 1) : Math.max(0, j - 1),
        );
      });
  }

  public prevJournee(): void {
    this.navClick$.next('previous');
  }

  public nextJournee(): void {
    this.navClick$.next('next');
  }
}
