import { Component, OnInit } from '@angular/core';
import { CadastrosService } from '../cadastro.service.spec';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  convenios: any[] = [];

  constructor(private cadastrosService: CadastrosService, private router: Router) {}

  ngOnInit(): void {
    this.loadConvenios();
  }

  loadConvenios(): void {
    this.cadastrosService.getCadastros().pipe(
      tap(data => {
        this.convenios = data;
      }),
      catchError(error => {
        console.error('Erro ao carregar convênios:', error);
        throw error;
      })
    ).subscribe(); 
  }

  editConvenio(id: number): void {
    this.router.navigate(['/cadastro', id]);
  }

  deleteConvenio(id: number): void {
    this.cadastrosService.deleteCadastro(String(id)).subscribe({
      next: () => {
        this.loadConvenios();
      },
      error: error => {
        console.error('Erro ao excluir convênio:', error);
      }
    });
  }
  
  

  navigateToConvenios(): void {
    this.router.navigate(['/convenios']);
  }
}
