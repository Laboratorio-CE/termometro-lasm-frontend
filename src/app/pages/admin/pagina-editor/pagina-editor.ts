import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../../../core/api/admin';
import { Pagina } from '../../../core/models/pagina';

@Component({
  imports: [ReactiveFormsModule, DatePipe],
  selector: 'app-pagina-editor',
  templateUrl: './pagina-editor.html',
})
export class PaginaEditor {
  private readonly admin = inject(Admin);

  protected readonly pagina = signal<Pagina | null>(null);
  protected readonly carregando = signal(true);
  protected readonly enviando = signal(false);
  protected readonly erro = signal('');
  protected readonly salvo = signal(false);

  protected readonly form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true }),
    corpo: new FormControl('', { nonNullable: true }),
  });

  constructor() {
    // O componente é reaproveitado ao trocar de chave pela barra lateral
    inject(ActivatedRoute)
      .paramMap.pipe(takeUntilDestroyed())
      .subscribe((params) => this.carregar(params.get('chave')!));
  }

  private carregar(chave: string) {
    this.carregando.set(true);
    this.erro.set('');
    this.salvo.set(false);
    this.admin.buscarPagina(chave).subscribe({
      next: (p) => {
        this.aplicar(p);
        this.carregando.set(false);
      },
      error: () => {
        this.pagina.set(null);
        this.erro.set('Não foi possível carregar a página.');
        this.carregando.set(false);
      },
    });
  }

  protected salvar() {
    const { titulo, corpo } = this.form.getRawValue();
    this.erro.set('');
    this.salvo.set(false);
    this.enviando.set(true);
    this.admin.atualizarPagina(this.pagina()!.chave, titulo, corpo).subscribe({
      next: (p) => {
        this.aplicar(p);
        this.salvo.set(true);
        this.enviando.set(false);
      },
      error: (e) => {
        this.erro.set(e.error?.mensagem ?? 'Não foi possível salvar.');
        this.enviando.set(false);
      },
    });
  }

  podeSair() {
    return !this.form.dirty || confirm('Há alterações não salvas. Sair mesmo assim?');
  }

  private aplicar(p: Pagina) {
    this.pagina.set(p);
    this.form.reset({ titulo: p.titulo ?? '', corpo: p.corpo });
  }
}
