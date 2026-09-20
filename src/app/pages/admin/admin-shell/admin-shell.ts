import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/api/auth';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-shell',
  styleUrl: './admin-shell.css',
  templateUrl: './admin-shell.html',
})
export class AdminShell implements OnInit {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);
  protected readonly title = signal('LASM');
  protected readonly admintitle = signal('Painel Admin');
  protected readonly itens = [
    { rota: '/admin/indicadores', texto: 'Indicadores' },
    { rota: '/admin/conteudos', texto: 'Conteúdos' },
    { rota: '/admin/respostas', texto: 'Respostas' },
  ];

  ngOnInit() {
    this.auth.carregarSessao().subscribe();
  }

  deslogar() {
    this.auth.deslogar().subscribe(() => this.router.navigate(['/admin']));
  }
}
