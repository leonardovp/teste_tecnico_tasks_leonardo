import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ambiente } from '../../environments/environment';
import { RespostaAutenticacao, DadosLogin, DadosCadastro, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoAutenticacao {
  private readonly URL_API = ambiente.urlApi;
  private readonly CHAVE_TOKEN = 'token_autenticacao';
  private readonly CHAVE_USUARIO = 'usuario_atual';

  private usuarioAtualSubject = new BehaviorSubject<Usuario | null>(this.obterUsuarioDoArmazenamento());
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(
    private http: HttpClient,
    private roteador: Router
  ) {}

  cadastrar(dados: DadosCadastro): Observable<RespostaAutenticacao> {
    return this.http.post<RespostaAutenticacao>(`${this.URL_API}/autenticacao/cadastrar`, dados)
      .pipe(
        tap(resposta => this.tratarSucessoAutenticacao(resposta))
      );
  }

  autenticar(dados: DadosLogin): Observable<RespostaAutenticacao> {
    return this.http.post<RespostaAutenticacao>(`${this.URL_API}/autenticacao/autenticar`, dados)
      .pipe(
        tap(resposta => this.tratarSucessoAutenticacao(resposta))
      );
  }

  deslogar(): void {
    localStorage.removeItem(this.CHAVE_TOKEN);
    localStorage.removeItem(this.CHAVE_USUARIO);
    this.usuarioAtualSubject.next(null);
    this.roteador.navigate(['/login']);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.CHAVE_TOKEN);
  }

  estaAutenticado(): boolean {
    return !!this.obterToken();
  }

  obterUsuarioAtual(): Usuario | null {
    return this.usuarioAtualSubject.value;
  }

  private tratarSucessoAutenticacao(resposta: RespostaAutenticacao): void {
    localStorage.setItem(this.CHAVE_TOKEN, resposta.token);
    localStorage.setItem(this.CHAVE_USUARIO, JSON.stringify(resposta.usuario));
    this.usuarioAtualSubject.next(resposta.usuario);
  }

  private obterUsuarioDoArmazenamento(): Usuario | null {
    const usuarioStr = localStorage.getItem(this.CHAVE_USUARIO);
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }
}
