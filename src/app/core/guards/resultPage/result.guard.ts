import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../../../features/game/service/result/result.service';


export const resultGuard: CanActivateFn = (route, state) => {
  const resultService = inject(ResultService);
  const router = inject(Router);

  if (resultService.getResults().length > 0) {
    return true;
  } else {
    router.navigate(['/game']); 
    return false;
  }

};
