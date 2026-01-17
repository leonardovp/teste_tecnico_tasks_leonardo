import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'aviso' | 'info';
  duracao?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicoToast {
  private toastSubject = new Subject<Toast>();
  public toast$ = this.toastSubject.asObservable();

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' | 'aviso' | 'info' = 'info', duracao: number = 3000) {
    this.toastSubject.next({ mensagem, tipo, duracao });
  }

  sucesso(mensagem: string, duracao?: number) {
    this.mostrar(mensagem, 'sucesso', duracao);
  }

  erro(mensagem: string, duracao?: number) {
    this.mostrar(mensagem, 'erro', duracao);
  }

  aviso(mensagem: string, duracao?: number) {
    this.mostrar(mensagem, 'aviso', duracao);
  }

  info(mensagem: string, duracao?: number) {
    this.mostrar(mensagem, 'info', duracao);
  }
}
