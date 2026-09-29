import { Component, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-escala-humor',
  styleUrl: './escala-humor.css',
  templateUrl: './escala-humor.html',
})
export class EscalaHumor {
  readonly nivel = model<number | null>(null);

  // Selecionado usa borda e fundo suave da cor: texto branco sobre os tons 2 a 4 não passa no contraste AA
  protected readonly niveis = [
    { valor: 1, rotulo: 'Muito difícil', ponto: 'bg-humor-1', selecionado: 'border-humor-1 bg-humor-1/15' },
    { valor: 2, rotulo: 'Difícil', ponto: 'bg-humor-2', selecionado: 'border-humor-2 bg-humor-2/15' },
    { valor: 3, rotulo: 'Neutro', ponto: 'bg-humor-3', selecionado: 'border-humor-3 bg-humor-3/15' },
    { valor: 4, rotulo: 'Bem', ponto: 'bg-humor-4', selecionado: 'border-humor-4 bg-humor-4/15' },
    { valor: 5, rotulo: 'Muito bem', ponto: 'bg-humor-5', selecionado: 'border-humor-5 bg-humor-5/15' },
  ];
}
