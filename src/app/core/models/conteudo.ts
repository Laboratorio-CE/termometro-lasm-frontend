export const CATEGORIAS = ['Ansiedade', 'Sono', 'Rotina', 'Relações', 'Autocuidado', 'Quando buscar ajuda'];

export type StatusConteudo = 'RASCUNHO' | 'PUBLICADO';

export interface ConteudoResumo {
    id: number;
    slug: string;
    titulo: string;
    categoria: string;
    status: StatusConteudo;
    publicadoEm: string | null;
    atualizadoEm: string;
    revisor: string | null;
}

export interface ConteudoDetalhe extends ConteudoResumo {
    resumo: string | null;
    corpo: string;
    minutos: number | null;
}

export interface ConteudoForm {
    titulo: string;
    slug: string;
    categoria: string;
    resumo: string;
    corpo: string;
    minutos: number | null;
}
