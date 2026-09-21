import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { Auth } from '../api/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return auth 
    .carregarSessao()
    .pipe(
      map(
        (usuario) => 
          usuario !== null || 
          router.createUrlTree(['/admin'], { queryParams: { retorno: state.url }})
      )
    );
};
