import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Pagina as PaginaDTO } from '../models/pagina';

@Service()
export class Pagina {
    private readonly http = inject(HttpClient);

    // Texto de página é complemento da tela: se falhar, a tela segue sem ele (null)
    buscar(chave: string) {
        return this.http.get<PaginaDTO>(`/api/paginas/${chave}`).pipe(catchError(() => of(null)));
    }
}
