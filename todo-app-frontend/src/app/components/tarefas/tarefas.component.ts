import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoTarefa } from '../../services/tarefa.service';
import { ServicoAutenticacao } from '../../services/autenticacao.service';
import { ServicoToast } from '../../services/toast.service';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class ComponenteTarefas implements OnInit {
  tarefas: Tarefa[] = [];
  formularioTarefa: FormGroup;
  carregando = false;
  tarefaEditando: Tarefa | null = null;

  constructor(
    private construtorFormulario: FormBuilder,
    private servicoTarefa: ServicoTarefa,
    private servicoAutenticacao: ServicoAutenticacao,
    private servicoToast: ServicoToast,
    private roteador: Router
  ) {
    this.formularioTarefa = this.construtorFormulario.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      prioridade: ['Média', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.carregando = true;
    this.servicoTarefa.obterPendentes().subscribe({
      next: (resposta) => {
        this.tarefas = resposta.tarefas;
        this.carregando = false;
      },
      error: (erro) => {
        this.carregando = false;
        this.servicoToast.erro('Erro ao carregar tarefas');
      }
    });
  }

  criarTarefa(): void {
    if (this.formularioTarefa.valid) {
      this.carregando = true;
      this.servicoTarefa.criar(this.formularioTarefa.value).subscribe({
        next: (resposta) => {
          this.servicoToast.sucesso('Tarefa criada com sucesso!');
          this.formularioTarefa.reset({ prioridade: 'Média' });
          this.carregarTarefas();
        },
        error: (erro) => {
          this.carregando = false;
          this.servicoToast.erro('Erro ao criar tarefa');
        }
      });
    }
  }

  concluirTarefa(tarefa: Tarefa): void {
    this.servicoTarefa.atualizarStatus(tarefa.id, 'concluida').subscribe({
      next: () => {
        this.servicoToast.sucesso('Tarefa concluída!');
        this.carregarTarefas();
      },
      error: () => {
        this.servicoToast.erro('Erro ao concluir tarefa');
      }
    });
  }

  reativarTarefa(tarefa: Tarefa): void {
    this.servicoTarefa.atualizarStatus(tarefa.id, 'pendente').subscribe({
      next: () => {
        this.servicoToast.info('Tarefa reativada!');
        this.carregarTarefas();
      },
      error: () => {
        this.servicoToast.erro('Erro ao reativar tarefa');
      }
    });
  }

  excluirTarefa(tarefa: Tarefa): void {
    if (confirm(`Deseja realmente excluir a tarefa "${tarefa.descricao}"?`)) {
      this.servicoTarefa.excluir(tarefa.id).subscribe({
        next: () => {
          this.servicoToast.sucesso('Tarefa excluída!');
          this.carregarTarefas();
        },
        error: () => {
          this.servicoToast.erro('Erro ao excluir tarefa');
        }
      });
    }
  }

  deslogar(): void {
    this.servicoAutenticacao.deslogar();
    this.servicoToast.info('Até logo!');
  }

  get descricao() { return this.formularioTarefa.get('descricao'); }
  get prioridade() { return this.formularioTarefa.get('prioridade'); }

  getCorPrioridade(prioridade: string): string {
    const cores: { [key: string]: string } = {
      'Alta': '#f44336',
      'Média': '#ff9800',
      'Baixa': '#4caf50'
    };
    return cores[prioridade] || '#999';
  }
}
