import { Component, OnInit } from '@angular/core';
import { ServicoToast, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ComponenteToast implements OnInit {
  toasts: Toast[] = [];

  constructor(private servicoToast: ServicoToast) {}

  ngOnInit() {
    this.servicoToast.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => {
        this.removerToast(toast);
      }, toast.duracao || 3000);
    });
  }

  removerToast(toast: Toast) {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }
}
