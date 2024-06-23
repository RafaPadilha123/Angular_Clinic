import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastrosService } from '../cadastro.service.spec'; 
import { tap, catchError } from 'rxjs/operators';
import { IbgeService } from '../ibge.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  mensagem: string = '';
  cidades: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private cadastrosService: CadastrosService,
    private ibgeService: IbgeService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      responsavel: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      contato: ['', Validators.required],
      remuneracao: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.carregarCidades(); 
  }

  carregarCidades() {
    this.ibgeService.getCidades().subscribe(cidades => {
      this.cidades = cidades;
    }, error => {
      console.error('Erro ao carregar cidades', error);
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.cadastrosService.addCadastro(this.cadastroForm.value).pipe(
        tap(() => {
          this.mensagem = 'Cadastro realizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/convenios']);
          }, 2000);
        }),
        catchError(error => {
          this.mensagem = 'Erro ao cadastrar. Por favor, tente novamente.';
          throw error;
        })
      ).subscribe();
    } else {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  navigateToConvenios() {
    this.router.navigate(['/convenios']);
  }
}
