import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Admin } from '../../../core/api/admin';
import { CATEGORIAS, ConteudoResumo } from '../../../core/models/conteudo';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-conteudos-admin',
  styleUrl: './conteudos-admin.css',
  templateUrl: './conteudos-admin.html',
})
export class ConteudosAdmin implements OnInit {
  private readonly admin = inject(Admin);
  protected readonly categorias = CATEGORIAS;

  protected readonly status = signal('');
  protected readonly categoria = signal('');
  protected readonly conteudos = signal<ConteudoResumo[]>([]);
  protected readonly carregando = signal(true);
  protected readonly erro = signal(false);

  ngOnInit() {
    this.carregar();
  }

  protected filtrar(status: string, categoria: string) {
    this.status.set(status);
    this.categoria.set(categoria);
    this.carregar();
  }

  protected carregar() {
    this.carregando.set(true);
    this.erro.set(false);
    this.admin.listarConteudos(this.status(), this.categoria()).subscribe({
      next: (lista) => {
        this.conteudos.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set(true);
        this.carregando.set(false);
      },
    });
  }
}
