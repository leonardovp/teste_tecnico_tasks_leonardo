import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-rotas.module';
import { AppComponent } from './app.component';
import { ServicoInterceptadorHttp } from './services/interceptador-http.service';
import { ComponenteCadastro } from './components/cadastro/cadastro.component';
import { ComponenteLogin } from './components/login/login.component';
import { ComponenteTarefas } from './components/tarefas/tarefas.component';
import { ComponenteToast } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteCadastro,
    ComponenteLogin,
    ComponenteTarefas,
    ComponenteToast
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServicoInterceptadorHttp,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
