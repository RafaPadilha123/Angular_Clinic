import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastrosService } from '../cadastro.service.spec';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  mensagem: string = '';

  constructor(
    private fb: FormBuilder,
    private cadastrosService: CadastrosService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      responsavel: ['', Validators.required],
      endereco: ['', Validators.required],
      contato: ['', Validators.required],
      remuneracao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
          console.error('Erro ao cadastrar:', error);
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
