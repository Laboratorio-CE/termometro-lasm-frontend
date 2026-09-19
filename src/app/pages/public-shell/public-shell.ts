import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-public-shell',
  styleUrl: './public-shell.css',
  templateUrl: './public-shell.html',
})
export class PublicShell {
  protected readonly title = signal('LASM');
  protected readonly abas = [
    { rota: '/inicio', texto: 'Início' },
    { rota: '/checkin', texto: 'Check-in' },
    { rota: '/conteudos', texto: 'Conteúdos' },
    { rota: '/ajuda', texto: 'Preciso de ajuda' },
  ];
}
