import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {
  private apiUrl = 'http://localhost:3000/cadastros';

  constructor(private http: HttpClient) {}

  getCadastros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCadastro(id: string): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCadastro(cadastro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cadastro);
  }

  updateCadastro(id: string, cadastro: any): Observable<any> { 
    return this.http.put<any>(`${this.apiUrl}/${id}`, cadastro);
  }

  deleteCadastro(id: string): Observable<any> { 
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
