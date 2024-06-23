import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../cadastro.service.spec';
import { IbgeService } from '../ibge.service';
import { tap, catchError } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-cadastro',
  templateUrl: './edit-cadastro.component.html',
  styleUrls: ['./edit-cadastro.component.css']
})
export class EditCadastroComponent implements OnInit {
  editCadastroForm: FormGroup;
  mensagem: string = '';
  convenioId: string | null = null;
  cidades: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private cadastrosService: CadastrosService,
    private ibgeService: IbgeService, 
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.editCadastroForm = this.fb.group({
      nome: ['', Validators.required],
      responsavel: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      contato: ['', Validators.required],
      remuneracao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => {
        console.log('Parâmetros da rota:', params);
        if (params['id']) {
          this.convenioId = params['id'];
          this.loadConvenio();
        }
      })
    ).subscribe();

    this.carregarCidades(); 
  }

  carregarCidades() {
    this.ibgeService.getCidades().subscribe(cidades => {
      this.cidades = cidades;
    }, error => {
      console.error('Erro ao carregar cidades', error);
    });
  }

  loadConvenio(): void {
    if (this.convenioId !== null) {
      this.cadastrosService.getCadastro(this.convenioId).pipe(
        tap(data => {
          console.log('Dados carregados:', data);
          this.editCadastroForm.patchValue(data);
          this.cdr.detectChanges();
        }),
        catchError(error => {
          console.error('Erro ao carregar convênio:', error);
          return EMPTY;
        })
      ).subscribe();
    }
  }

  onSubmit() {
    if (this.editCadastroForm.valid) {
      this.cadastrosService.updateCadastro(this.convenioId!, this.editCadastroForm.value).pipe(
        tap(() => {
          this.mensagem = 'Cadastro atualizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/convenios']);
          }, 2000);
        }),
        catchError(error => {
          console.error('Erro ao atualizar:', error);
          this.mensagem = 'Erro ao atualizar. Por favor, tente novamente.';
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
