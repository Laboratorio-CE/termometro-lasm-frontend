import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ConteudoDetalhe, ConteudoForm, ConteudoResumo } from '../models/conteudo';
import { Pagina } from '../models/pagina';

@Service()
export class Admin {
    private readonly http = inject(HttpClient);

    listarConteudos(status: string, categoria: string) {
        let params = new HttpParams();
        if (status) params = params.set('status', status);
        if (categoria) params = params.set('categoria', categoria);
        return this.http.get<ConteudoResumo[]>('/api/admin/conteudos', { params });
    }

    buscarConteudo(id: number) {
        return this.http.get<ConteudoDetalhe>(`/api/admin/conteudos/${id}`);
    }

    criarConteudo(form: ConteudoForm) {
        return this.http.post<ConteudoDetalhe>('/api/admin/conteudos', form);
    }

    atualizarConteudo(id: number, form: ConteudoForm) {
        return this.http.put<ConteudoDetalhe>(`/api/admin/conteudos/${id}`, form);
    }

    publicarConteudo(id: number) {
        return this.http.post<ConteudoDetalhe>(`/api/admin/conteudos/${id}/publicar`, null);
    }

    despublicarConteudo(id: number) {
        return this.http.post<ConteudoDetalhe>(`/api/admin/conteudos/${id}/despublicar`, null);
    }

    excluirConteudo(id: number) {
        return this.http.delete<void>(`/api/admin/conteudos/${id}`);
    }

    listarPaginas() {
        return this.http.get<Pagina[]>('/api/admin/paginas');
    }

    buscarPagina(chave: string) {
        return this.http.get<Pagina>(`/api/admin/paginas/${chave}`);
    }

    atualizarPagina(chave: string, titulo: string, corpo: string) {
        return this.http.put<Pagina>(`/api/admin/paginas/${chave}`, { titulo, corpo });
    }
}
