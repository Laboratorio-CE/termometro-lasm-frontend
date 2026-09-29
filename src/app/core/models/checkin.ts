/** Valores aceitos pela API (sem acento) e o texto exibido na tela. */
export const CONTEXTOS = [
    { valor: 'sono', rotulo: 'sono' },
    { valor: 'estudo', rotulo: 'estudo' },
    { valor: 'trabalho', rotulo: 'trabalho' },
    { valor: 'relacoes', rotulo: 'relações' },
    { valor: 'saude', rotulo: 'saúde' },
    { valor: 'dinheiro', rotulo: 'dinheiro' },
];

export interface CheckinForm {
    nivel: number;
    contextos: string[];
    comentario: string;
}
