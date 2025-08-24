import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '@core';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private router = inject(Router);
  private authService = inject(Auth);
  isLoading = false;

  loginData = {
    username: '',
    password: '',
  };

  onLogin() {
    const { username, password } = this.loginData;
    if (username && password) {
      this.isLoading = true;
      this.authService
        .login(username, password)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((res) => {
          if (res.isSuccess) {
            localStorage.setItem('userInfo', JSON.stringify(res.result));
            this.router.navigate(['/']);
          }
        });
    }
  }
}
