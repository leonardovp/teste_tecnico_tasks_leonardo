import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoAutenticacao } from '../../services/autenticacao.service';
import { ServicoToast } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class ComponenteLogin {
  formularioLogin: FormGroup;
  carregando = false;

  constructor(
    private construtorFormulario: FormBuilder,
    private servicoAutenticacao: ServicoAutenticacao,
    private roteador: Router,
    private servicoToast: ServicoToast
  ) {
    this.formularioLogin = this.construtorFormulario.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  aoEnviar(): void {
    if (this.formularioLogin.valid) {
      this.carregando = true;

      this.servicoAutenticacao.autenticar(this.formularioLogin.value).subscribe({
        next: (resposta) => {
          this.servicoToast.sucesso('Login realizado com sucesso!');
          this.roteador.navigate(['/tarefas']);
        },
        error: (erro) => {
          this.carregando = false;
          const mensagemErro = erro.error?.erro || 'Erro ao realizar login';
          this.servicoToast.erro(mensagemErro);
        }
      });
    }
  }

  get email() { return this.formularioLogin.get('email'); }
  get senha() { return this.formularioLogin.get('senha'); }
}
