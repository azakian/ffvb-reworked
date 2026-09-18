import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { BreakpointObserver } from '../core/breakpoint-observer';

export const phoneDeviceResolver: ResolveFn<boolean> = () => {
  const breakpointObserver = inject(BreakpointObserver);
  return breakpointObserver.observeForPhone();
};
