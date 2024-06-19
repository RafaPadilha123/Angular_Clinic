import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastrosService } from '../cadastro.service.spec';
import { CidadeService } from '../cidades.service';
import { tap, catchError } from 'rxjs/operators';

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
    private cidadeService: CidadeService,
    private cadastrosService: CadastrosService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      responsavel: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: [''], 
      contato: ['', Validators.required],
      remuneracao: ['', Validators.required]
    });
  
    this.cidadeService.getCidades().subscribe((data: any[]) => {
      this.cidades = data.map(city => ({ label: city.nome, value: city.id }));
      const cidadeControl = this.cadastroForm.get('cidade');
      cidadeControl?.setValue(this.cidades[0]?.value, { emitEvent: false }); // Define a primeira cidade como padrão
    });
  }


  ngOnInit(): void {
    this.cidadeService.getCidades().subscribe((data: any[]) => {
      this.cidades = data.map(city => ({ label: city.nome, value: city.id }));
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
