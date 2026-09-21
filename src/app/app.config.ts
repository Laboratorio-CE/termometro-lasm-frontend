import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { credenciaisInterceptor } from './core/interceptors/credenciais-interceptor';
import { erroInterceptor } from './core/interceptors/erro-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([credenciaisInterceptor, erroInterceptor])),
  ]
};
