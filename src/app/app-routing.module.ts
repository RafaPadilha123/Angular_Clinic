import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveniosComponent } from './convenios/convenios.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { EditCadastroComponent } from './edit-cadastro/edit-cadastro.component';
import { AuthGuard } from './auth.guard';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'convenios', component: ConveniosComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/:id', component: EditCadastroComponent, canActivate: [AuthGuard] },
  { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },
  { path: 'password', component: PasswordComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'reset-password', component: PasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
