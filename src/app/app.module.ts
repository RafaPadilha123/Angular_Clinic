import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { EditCadastroComponent } from './edit-cadastro/edit-cadastro.component';
import { CidadesService } from './cidades.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConveniosComponent,
    HeaderComponent,
    CadastroComponent,
    ListaComponent,
    EditCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CidadesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
