import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteCadastro } from './components/cadastro/cadastro.component';
import { ComponenteLogin } from './components/login/login.component';
import { ComponenteTarefas } from './components/tarefas/tarefas.component';
import { GuardAutenticacao } from './guards/autenticacao.guard';

const rotas: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: ComponenteLogin },
  { path: 'cadastrar', component: ComponenteCadastro },
  { path: 'tarefas', component: ComponenteTarefas, canActivate: [GuardAutenticacao] }
];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
