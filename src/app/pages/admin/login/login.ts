import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly rotaAtual = inject(ActivatedRoute);

  readonly erro = signal('');
  readonly enviando = signal(false);

  private destino() {
    return this.rotaAtual.snapshot.queryParamMap.get('retorno') ?? '/admin/indicadores';
  }  

  ngOnInit() {
    this.auth.carregarSessao().subscribe((usuario) => {
      if (usuario) {
        this.router.navigateByUrl(this.destino());
      }
    });
  }
  logar(email: string, senha: string) {
    this.erro.set('');
    this.enviando.set(true);

    this.auth.logar(email, senha).subscribe({
      next: () => 
        this.auth.carregarSessao().subscribe(() => this.router.navigateByUrl(this.destino())),
        error: (erro) => {
          this.erro.set(
            erro.status === 429
            ? 'Muitas tentativas de login. Tente novamente mais tarde.'
            : 'Email ou senha inválidos.'
          );
          this.enviando.set(false);
        },
    });
  }
}
