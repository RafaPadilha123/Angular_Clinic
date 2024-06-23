import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  isValidEmail = true;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const matchResult = this.email.match(this.emailPattern);
    this.isValidEmail = matchResult!== null; 
    if (!this.isValidEmail) {
      alert('Por favor insira um email válido'); 
    } else if (this.password) {
      this.authService.login(this.email, this.password).subscribe(success => {
        if (success) {
          this.router.navigate(['/convenios']);
        } else {
          alert('Email ou senha incorretos'); 
        }
      });
    }
  }

  redirectTo(link: string) {
    window.location.href = link; 
  }

}  