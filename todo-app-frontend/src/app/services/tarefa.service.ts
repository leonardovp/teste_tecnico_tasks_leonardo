import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ambiente } from '../../environments/environment';
import { Tarefa, DadosCriacaoTarefa, RespostaTarefas } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoTarefa {
  private readonly URL_API = ambiente.urlApi;

  constructor(private http: HttpClient) {}

  criar(dados: DadosCriacaoTarefa): Observable<{ mensagem: string; tarefa: Tarefa }> {
    return this.http.post<{ mensagem: string; tarefa: Tarefa }>(`${this.URL_API}/tarefas`, dados);
  }

  obterPendentes(): Observable<RespostaTarefas> {
    return this.http.get<RespostaTarefas>(`${this.URL_API}/tarefas/pendentes`);
  }

  atualizarStatus(id: number, status: 'pendente' | 'concluida'): Observable<{ mensagem: string }> {
    return this.http.patch<{ mensagem: string }>(`${this.URL_API}/tarefas/${id}/status`, { status });
  }

  excluir(id: number): Observable<{ mensagem: string }> {
    return this.http.delete<{ mensagem: string }>(`${this.URL_API}/tarefas/${id}`);
  }
}
