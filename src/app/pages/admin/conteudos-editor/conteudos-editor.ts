import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from '../../../core/api/admin';
import { CATEGORIAS, ConteudoDetalhe } from '../../../core/models/conteudo';

@Component({
  imports: [ReactiveFormsModule, RouterLink, DatePipe],
  selector: 'app-conteudos-editor',
  styleUrl: './conteudos-editor.css',
  templateUrl: './conteudos-editor.html',
})
export class ConteudosEditor implements OnInit {
  private readonly admin = inject(Admin);
  private readonly router = inject(Router);
  private readonly rotaAtual = inject(ActivatedRoute);
  protected readonly categorias = CATEGORIAS;

  protected readonly conteudo = signal<ConteudoDetalhe | null>(null);
  protected readonly carregando = signal(false);
  protected readonly falhaAoCarregar = signal(false);
  protected readonly enviando = signal(false);
  protected readonly erro = signal('');

  protected readonly form = new FormGroup({
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    slug: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(160), Validators.pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/)],
    }),
    categoria: new FormControl('', { nonNullable: true, validators: Validators.required }),
    resumo: new FormControl('', { nonNullable: true, validators: Validators.maxLength(300) }),
    corpo: new FormControl('', { nonNullable: true, validators: Validators.required }),
    minutos: new FormControl<number | null>(null, Validators.min(1)),
  });

  constructor() {
    // Slug acompanha o título enquanto o conteúdo é novo e o slug não foi editado à mão
    this.form.controls.titulo.valueChanges.pipe(takeUntilDestroyed()).subscribe((titulo) => {
      if (!this.conteudo() && !this.form.controls.slug.dirty) {
        this.form.controls.slug.setValue(gerarSlug(titulo));
      }
    });
  }

  ngOnInit() {
    const id = this.rotaAtual.snapshot.paramMap.get('id');
    if (id !== 'novo') {
      this.carregando.set(true);
      this.admin.buscarConteudo(Number(id)).subscribe({
        next: (c) => {
          this.aplicar(c);
          this.carregando.set(false);
        },
        error: () => {
          this.falhaAoCarregar.set(true);
          this.carregando.set(false);
        },
      });
    }
  }

  protected publicado() {
    return this.conteudo()?.status === 'PUBLICADO';
  }

  protected salvar() {
    const c = this.conteudo();
    const form = this.form.getRawValue();
    this.executar(c ? this.admin.atualizarConteudo(c.id, form) : this.admin.criarConteudo(form), (salvo) => {
      if (!c) this.router.navigate(['/admin/conteudos', salvo.id], { replaceUrl: true });
    });
  }

  protected publicar() {
    this.executar(this.admin.publicarConteudo(this.conteudo()!.id));
  }

  protected despublicar() {
    this.executar(this.admin.despublicarConteudo(this.conteudo()!.id));
  }

  protected excluir() {
    if (!confirm('Excluir este conteúdo? Essa ação não pode ser desfeita.')) return;
    this.enviando.set(true);
    this.admin.excluirConteudo(this.conteudo()!.id).subscribe({
      next: () => {
        this.form.markAsPristine();
        this.router.navigate(['/admin/conteudos']);
      },
      error: (e) => this.falhar(e),
    });
  }

  podeSair() {
    return !this.form.dirty || confirm('Há alterações não salvas. Sair mesmo assim?');
  }

  private executar(acao: Observable<ConteudoDetalhe>, depois?: (c: ConteudoDetalhe) => void) {
    this.erro.set('');
    this.enviando.set(true);
    acao.subscribe({
      next: (c) => {
        this.aplicar(c);
        this.enviando.set(false);
        depois?.(c);
      },
      error: (e) => this.falhar(e),
    });
  }

  private aplicar(c: ConteudoDetalhe) {
    this.conteudo.set(c);
    this.form.reset({
      titulo: c.titulo,
      slug: c.slug,
      categoria: c.categoria,
      resumo: c.resumo ?? '',
      corpo: c.corpo,
      minutos: c.minutos,
    });
    if (c.status === 'PUBLICADO') this.form.disable();
    else this.form.enable();
  }

  private falhar(e: HttpErrorResponse) {
    this.erro.set(e.error?.mensagem ?? 'Não foi possível concluir a ação.');
    this.enviando.set(false);
  }
}

function gerarSlug(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
