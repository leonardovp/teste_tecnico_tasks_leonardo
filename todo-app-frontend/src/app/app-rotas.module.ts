import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteCadastro } from './components/cadastro/cadastro.component';

const rotas: Routes = [
  { path: '', redirectTo: '/cadastrar', pathMatch: 'full' },
  { path: 'cadastrar', component: ComponenteCadastro }
];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
