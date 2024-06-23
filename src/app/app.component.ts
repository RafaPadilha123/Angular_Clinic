import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  redirectToLink: any;
  forgotPassword() {
    console.log('Botão de redefinir senha clicado');
    const fakeApiCall = new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('https://temp-mail.org/pt/');
      }, 1000);
    });

    fakeApiCall.then((link: string) => {
      console.log('Link recebido:', link);
      this.redirectToLink.emit(link);
    });
  }
  redirectLink: string | null = null;

  handleRedirect(link: string) {
    console.log('Evento de redirecionamento recebido:', link);
    this.redirectLink = link;
  }

  title = 'Clinica-Angular';
}
