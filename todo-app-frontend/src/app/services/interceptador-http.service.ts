import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicoAutenticacao } from './autenticacao.service';

@Injectable()
export class ServicoInterceptadorHttp implements HttpInterceptor {
  constructor(private servicoAutenticacao: ServicoAutenticacao) {}

  intercept(requisicao: HttpRequest<any>, proximo: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.servicoAutenticacao.obterToken();

    if (token) {
      const requisicaoClonada = requisicao.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return proximo.handle(requisicaoClonada);
    }

    return proximo.handle(requisicao);
  }
}
