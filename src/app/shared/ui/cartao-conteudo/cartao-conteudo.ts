import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConteudoPublico } from '../../../core/models/conteudo';

@Component({
  imports: [RouterLink],
  selector: 'app-cartao-conteudo',
  styleUrl: './cartao-conteudo.css',
  templateUrl: './cartao-conteudo.html',
})
export class CartaoConteudo {
  readonly conteudo = input.required<ConteudoPublico>();
}
