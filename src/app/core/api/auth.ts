import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Usuario } from '../models/usuario';
import { catchError, of, tap } from 'rxjs';

@Service()
export class Auth {
    private readonly http = inject(HttpClient);

    readonly usuario = signal<Usuario | null>(null);

    logar(email: string, senha: string) {
        const credenciais = new HttpParams().set('username', email).set('password', senha);
        return this.http.post('/api/auth/login', credenciais);
    }

    deslogar() {
        return this.http.post('/api/auth/logout', null).pipe(tap(() => this.usuario.set(null)));
    }

    carregarSessao() {
        return this.http.get<Usuario>('/api/auth/eu').pipe(
            tap((usuario) => this.usuario.set(usuario)),
            catchError(() => {
                this.usuario.set(null);
                return of(null);
            })
        )
    }
}
