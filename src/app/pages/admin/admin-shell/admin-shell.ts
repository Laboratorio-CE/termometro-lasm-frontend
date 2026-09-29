import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../core/api/auth';
import { Admin } from '../../../core/api/admin';
import { Pagina } from '../../../core/models/pagina';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-shell',
  styleUrl: './admin-shell.css',
  templateUrl: './admin-shell.html',
})
export class AdminShell implements OnInit {
  protected readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly admin = inject(Admin);
  protected readonly title = signal('LASM');
  protected readonly admintitle = signal('Painel Admin');
  protected readonly itens = [
    { rota: '/admin/indicadores', texto: 'Indicadores' },
    { rota: '/admin/conteudos', texto: 'Conteúdos' },
    { rota: '/admin/respostas', texto: 'Respostas' },
  ];
  protected readonly paginas = signal<Pagina[]>([]);
  protected readonly nomesPaginas: Record<string, string> = {
    inicio: 'Início',
    checkin: 'Check-in',
    conteudos: 'Conteúdos',
    ajuda: 'Preciso de ajuda',
    autocuidado: 'Autocuidado',
    lasm: 'A LASM',
    rodape: 'Rodapé',
  };

  ngOnInit() {
    this.auth.carregarSessao().subscribe();
    this.admin.listarPaginas().subscribe((paginas) => this.paginas.set(paginas));
  }

  deslogar() {
    this.auth.deslogar().subscribe(() => this.router.navigate(['/admin']));
  }
}
