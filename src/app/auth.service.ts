import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`)
      .pipe(
        map(users => {
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            localStorage.setItem(this.currentUserKey, email);
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => of(false)) 
      );
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): { email: string } | null {
    const userEmail = localStorage.getItem(this.currentUserKey);
    return userEmail ? { email: userEmail } : null;
  }


  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
