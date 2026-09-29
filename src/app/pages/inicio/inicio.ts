import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Conteudo } from '../../core/api/conteudo';
import { Pagina } from '../../core/api/pagina';
import { CartaoConteudo } from '../../shared/ui/cartao-conteudo/cartao-conteudo';

@Component({
  imports: [RouterLink, CartaoConteudo],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {
  protected readonly pagina = toSignal(inject(Pagina).buscar('inicio'));
  // A lista já vem do mais recente para o mais antigo
  protected readonly destaque = toSignal(
    inject(Conteudo).listar().pipe(map((lista) => lista[0] ?? null), catchError(() => of(null))),
  );
}
