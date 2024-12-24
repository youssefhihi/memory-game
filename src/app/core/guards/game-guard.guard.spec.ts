import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gameGuardGuard } from './game-guard.guard';

describe('gameGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gameGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
