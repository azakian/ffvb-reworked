import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { BreakpointObserver } from '../core/breakpoint-observer';

export const phoneDeviceGuard: CanMatchFn = () => {
  const breakpointObserver = inject(BreakpointObserver);
  return breakpointObserver.observeForPhone();
};
