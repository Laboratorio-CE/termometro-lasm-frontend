import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/api/auth';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly erro = signal('');
  readonly enviando = signal(false);

  ngOnInit() {
    this.auth.carregarSessao().subscribe((usuario) => {
      if (usuario) {
        this.router.navigate(['/admin/indicadores']);
      }
    });
  }
  logar(email: string, senha: string) {
    this.erro.set('');
    this.enviando.set(true);

    this.auth.logar(email, senha).subscribe({
      next: () => 
        this.auth.carregarSessao().subscribe(() => this.router.navigate(['/admin/indicadores'])),
        error: () => {
          this.erro.set('Email ou senha inválidos');
          this.enviando.set(false);
        },
    });
  }
}
