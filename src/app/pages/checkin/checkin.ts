import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Checkin as CheckinApi } from '../../core/api/checkin';
import { Pagina } from '../../core/api/pagina';
import { CONTEXTOS } from '../../core/models/checkin';
import { EscalaHumor } from '../../shared/ui/escala-humor/escala-humor';

@Component({
  imports: [EscalaHumor],
  selector: 'app-checkin',
  styleUrl: './checkin.css',
  templateUrl: './checkin.html',
})
export class Checkin {
  private readonly api = inject(CheckinApi);

  protected readonly pagina = toSignal(inject(Pagina).buscar('checkin'));
  protected readonly opcoesContexto = CONTEXTOS;

  protected readonly nivel = signal<number | null>(null);
  protected readonly contextos = signal<string[]>([]);
  protected readonly comentario = signal('');
  protected readonly enviando = signal(false);
  protected readonly erro = signal('');
  protected readonly enviado = signal(false);

  protected alternarContexto(valor: string) {
    this.contextos.update((lista) =>
      lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor],
    );
  }

  protected registrar() {
    this.erro.set('');
    this.enviando.set(true);
    this.api
      .registrar({ nivel: this.nivel()!, contextos: this.contextos(), comentario: this.comentario() })
      .subscribe({
        next: () => {
          this.enviado.set(true);
          this.enviando.set(false);
        },
        error: () => {
          this.erro.set('Não foi possível registrar agora. Tente de novo em instantes.');
          this.enviando.set(false);
        },
      });
  }
}
