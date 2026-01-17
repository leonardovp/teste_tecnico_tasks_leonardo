import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServicoAutenticacao } from '../services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutenticacao implements CanActivate {
  constructor(
    private servicoAutenticacao: ServicoAutenticacao,
    private roteador: Router
  ) {}

  canActivate(): boolean {
    if (this.servicoAutenticacao.estaAutenticado()) {
      return true;
    }

    this.roteador.navigate(['/login']);
    return false;
  }
}
