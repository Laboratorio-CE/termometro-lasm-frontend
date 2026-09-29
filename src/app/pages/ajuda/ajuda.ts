import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagina } from '../../core/api/pagina';
import { BlocoAjuda } from '../../shared/ui/bloco-ajuda/bloco-ajuda';

@Component({
  imports: [BlocoAjuda],
  selector: 'app-ajuda',
  styleUrl: './ajuda.css',
  templateUrl: './ajuda.html',
})
export class Ajuda {
  protected readonly pagina = toSignal(inject(Pagina).buscar('ajuda'));
}
