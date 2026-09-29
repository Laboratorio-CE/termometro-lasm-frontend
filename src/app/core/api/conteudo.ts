import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ConteudoPublico } from '../models/conteudo';

@Service()
export class Conteudo {
    private readonly http = inject(HttpClient);

    listar() {
        return this.http.get<ConteudoPublico[]>('/api/conteudos');
    }

    buscar(slug: string) {
        return this.http.get<ConteudoPublico>(`/api/conteudos/${slug}`);
    }
}
