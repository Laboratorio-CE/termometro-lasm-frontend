import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../api/auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);


  return next(req)
    .pipe(
      catchError((erro: HttpErrorResponse) => {
        if (erro.status === 401 && !req.url.startsWith('/api/auth/')) {
          auth.usuario.set(null);
          router.navigate(['/admin']);
        }
        return throwError(() => erro);
      })
    );
};
