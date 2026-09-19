import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-admin-shell',
  styleUrl: './admin-shell.css',
  templateUrl: './admin-shell.html',
})
export class AdminShell {
  protected readonly title = signal('LASM');
  protected readonly admintitle = signal('Painel Admin');
  protected readonly itens = [
    { rota: '/admin/indicadores', texto: 'Indicadores' },
    { rota: '/admin/conteudos', texto: 'Conteúdos' },
    { rota: '/admin/respostas', texto: 'Respostas' },
  ];
}
