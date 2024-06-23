import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome';

  constructor(private http: HttpClient) { }

  getCidades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipios?orderBy=nome`);
  }
}
