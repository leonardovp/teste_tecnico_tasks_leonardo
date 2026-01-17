import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoAutenticacao } from '../../service/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class ComponenteCadastro {
  formularioCadastro: FormGroup;
  mensagemErro = '';
  carregando = false;

  constructor(
    private construtorFormulario: FormBuilder,
    private servicoAutenticacao: ServicoAutenticacao,
    private roteador: Router
  ) {
    this.formularioCadastro = this.construtorFormulario.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  aoEnviar(): void {
    if (this.formularioCadastro.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      this.servicoAutenticacao.cadastrar(this.formularioCadastro.value).subscribe({
        next: () => {
          this.roteador.navigate(['/tarefas']);
        },
        error: (erro) => {
          this.carregando = false;
          this.mensagemErro = erro.error?.erro || 'Erro ao cadastrar usuário';
        }
      });
    }
  }

  get nome() { return this.formularioCadastro.get('nome'); }
  get email() { return this.formularioCadastro.get('email'); }
  get senha() { return this.formularioCadastro.get('senha'); }
}
