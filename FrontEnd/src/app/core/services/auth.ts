import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse, IUser } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  login(username: string, password: string) {
    return this.httpClient.post<IResponse<IUser>>(`${this.apiBaseUrl}AppUser/Login`, {
      username,
      password,
    });
  }
}
