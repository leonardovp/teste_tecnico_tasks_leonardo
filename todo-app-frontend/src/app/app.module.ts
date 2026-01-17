import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-rotas.module';
import { AppComponent } from './app.component';
import { ServicoInterceptadorHttp } from './service/interceptador-http.service';
import { ComponenteCadastro } from './components/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteCadastro
  ],
  imports: [
    BrowserModule,
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
