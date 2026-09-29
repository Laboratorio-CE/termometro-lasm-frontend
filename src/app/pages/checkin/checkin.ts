import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Pagina } from '../../core/api/pagina';

@Component({
  imports: [],
  selector: 'app-checkin',
  styleUrl: './checkin.css',
  templateUrl: './checkin.html',
})
export class Checkin {
  protected readonly pagina = toSignal(inject(Pagina).buscar('checkin'));
}
