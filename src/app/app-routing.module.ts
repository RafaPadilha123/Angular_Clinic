import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveniosComponent } from './convenios/convenios.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { EditCadastroComponent } from './edit-cadastro/edit-cadastro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'convenios', component: ConveniosComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/:id', component: EditCadastroComponent  },
  { path: 'lista', component: ListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
